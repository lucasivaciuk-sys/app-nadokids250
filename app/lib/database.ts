import { importPKCS8, SignJWT } from "jose";

export type Entitlements = {
  planComplete: boolean;
  smartSheets: boolean;
  assessmentPack: boolean;
  themedCalendar: boolean;
};

export type MemberProfile = Entitlements & {
  uid: string;
  email: string;
  name: string;
  createdAt: string;
  lastLoginAt: string;
};

type FirestoreValue = {
  stringValue?: string;
  booleanValue?: boolean;
  nullValue?: null;
  arrayValue?: { values?: FirestoreValue[] };
};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  updateTime?: string;
};

let tokenCache: { value: string; expiresAt: number } | null = null;

function env(name: string) {
  return process.env[name]?.trim();
}

function projectId() {
  const value = env("FIREBASE_PROJECT_ID");
  if (!value) throw new Error("FIREBASE_NOT_CONFIGURED");
  return value;
}

async function accessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;
  const email = env("FIREBASE_CLIENT_EMAIL");
  const rawKey = env("FIREBASE_PRIVATE_KEY");
  if (!email || !rawKey) throw new Error("FIREBASE_ADMIN_NOT_CONFIGURED");
  const privateKey = rawKey.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, "RS256");
  const assertion = await new SignJWT({
    scope: "https://www.googleapis.com/auth/datastore",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(email)
    .setSubject(email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!response.ok || !data.access_token) throw new Error("FIREBASE_ADMIN_AUTH_FAILED");
  tokenCache = { value: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 };
  return tokenCache.value;
}

function baseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents`;
}

async function firestore(path: string, init: RequestInit = {}) {
  return fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
}

function encode(value: unknown): FirestoreValue {
  if (typeof value === "boolean") return { booleanValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encode) } };
  if (value === null || value === undefined) return { nullValue: null };
  return { stringValue: String(value) };
}

function decode(value?: FirestoreValue): unknown {
  if (!value) return undefined;
  if ("booleanValue" in value) return value.booleanValue;
  if ("stringValue" in value) return value.stringValue;
  if ("arrayValue" in value) return (value.arrayValue?.values || []).map(decode);
  return null;
}

function fields(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, encode(value)]));
}

function data(document: FirestoreDocument) {
  return Object.fromEntries(Object.entries(document.fields || {}).map(([key, value]) => [key, decode(value)]));
}

async function getDocument(collection: string, id: string) {
  const response = await firestore(`/${collection}/${encodeURIComponent(id)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("DATABASE_ERROR");
  return (await response.json()) as FirestoreDocument;
}

async function putDocument(collection: string, id: string, value: Record<string, unknown>, mask?: string[]) {
  const query = mask?.length
    ? `?${mask.map((field) => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join("&")}`
    : "";
  const response = await firestore(`/${collection}/${encodeURIComponent(id)}${query}`, {
    method: "PATCH",
    body: JSON.stringify({ fields: fields(value) }),
  });
  if (!response.ok) throw new Error("DATABASE_ERROR");
  return (await response.json()) as FirestoreDocument;
}

function mapUser(document: FirestoreDocument | null): MemberProfile | null {
  if (!document) return null;
  const value = data(document);
  return {
    uid: String(value.uid || document.name.split("/").pop() || ""),
    email: String(value.email || ""),
    name: String(value.name || "Aluno"),
    planComplete: Boolean(value.planComplete),
    smartSheets: Boolean(value.smartSheets),
    assessmentPack: Boolean(value.assessmentPack),
    themedCalendar: Boolean(value.themedCalendar),
    createdAt: String(value.createdAt || ""),
    lastLoginAt: String(value.lastLoginAt || ""),
  };
}

export async function getUser(uid: string) {
  return mapUser(await getDocument("users", uid));
}

export async function syncUser(identity: { uid: string; email: string; name: string }) {
  if (await getDocument("blocked_users", identity.uid)) throw new Error("ACCOUNT_BLOCKED");
  const existing = await getUser(identity.uid);
  const now = new Date().toISOString();
  const user: MemberProfile = existing
    ? { ...existing, email: identity.email, name: identity.name, lastLoginAt: now }
    : {
        uid: identity.uid,
        email: identity.email,
        name: identity.name,
        planComplete: false,
        smartSheets: false,
        assessmentPack: false,
        themedCalendar: false,
        createdAt: now,
        lastLoginAt: now,
      };
  await putDocument("users", identity.uid, user);
  return user;
}

export async function listUsers() {
  const response = await firestore("/users?pageSize=500");
  if (!response.ok) throw new Error("DATABASE_ERROR");
  const result = (await response.json()) as { documents?: FirestoreDocument[] };
  return (result.documents || [])
    .map((document) => mapUser(document))
    .filter((user): user is MemberProfile => Boolean(user))
    .sort((a, b) => b.lastLoginAt.localeCompare(a.lastLoginAt));
}

export async function updateUserEntitlements(uid: string, entitlements: Entitlements) {
  await putDocument("users", uid, entitlements, Object.keys(entitlements));
  return getUser(uid);
}

export async function blockAndDeleteUser(uid: string) {
  const user = await getUser(uid);
  if (!user) return false;
  await putDocument("blocked_users", uid, {
    uid,
    email: user.email,
    blockedAt: new Date().toISOString(),
  });
  const response = await firestore(`/users/${encodeURIComponent(uid)}`, { method: "DELETE" });
  if (!response.ok && response.status !== 404) throw new Error("DATABASE_ERROR");
  return true;
}

export async function createAccessCode(hash: string, label: string, scopes: string[]) {
  await putDocument("access_codes", hash, {
    label,
    scopes,
    createdAt: new Date().toISOString(),
    redeemedBy: "",
    redeemedAt: "",
  });
}

export async function redeemAccessCode(hash: string, uid: string) {
  const document = await getDocument("access_codes", hash);
  if (!document) return null;
  const code = data(document);
  if (code.redeemedBy) return null;
  const scopes = Array.isArray(code.scopes) ? code.scopes.map(String) : [];
  const now = new Date().toISOString();
  await putDocument("access_codes", hash, { redeemedBy: uid, redeemedAt: now }, ["redeemedBy", "redeemedAt"]);
  const user = await getUser(uid);
  if (!user) throw new Error("USER_NOT_FOUND");
  const allowed = ["planComplete", "smartSheets", "assessmentPack", "themedCalendar"] as const;
  const changes: Partial<Entitlements> = {};
  for (const scope of scopes) {
    if (allowed.includes(scope as (typeof allowed)[number])) changes[scope as keyof Entitlements] = true;
  }
  await putDocument("users", uid, changes, Object.keys(changes));
  return { user: await getUser(uid), scopes: Object.keys(changes) };
}

export async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toUpperCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
