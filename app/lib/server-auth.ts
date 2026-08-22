import { createRemoteJWKSet, jwtVerify } from "jose";

const jwks = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

type FirebaseIdentity = {
  uid: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

function readEnv(name: string) {
  const runtime = (globalThis as typeof globalThis & {
    __NADOKIDS_ENV__?: Record<string, string | undefined>;
  }).__NADOKIDS_ENV__;
  return runtime?.[name] || process.env[name];
}

export async function requireFirebaseIdentity(request: Request): Promise<FirebaseIdentity> {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) throw new Error("UNAUTHENTICATED");

  const projectId = readEnv("FIREBASE_PROJECT_ID") || readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (!projectId) throw new Error("FIREBASE_NOT_CONFIGURED");

  const { payload } = await jwtVerify(token, jwks, {
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
  if (!payload.sub || !email) throw new Error("INVALID_IDENTITY");
  const adminEmail = (readEnv("ADMIN_EMAIL") || "").toLowerCase();

  return {
    uid: payload.sub,
    email,
    name: typeof payload.name === "string" && payload.name.trim() ? payload.name.trim() : email.split("@")[0],
    isAdmin: Boolean(adminEmail && email === adminEmail),
  };
}

export function authError(error: unknown) {
  const message = error instanceof Error ? error.message : "AUTH_ERROR";
  const status = message === "FIREBASE_NOT_CONFIGURED" ? 503 : message === "FORBIDDEN" || message === "ACCOUNT_BLOCKED" ? 403 : 401;
  return Response.json({ error: message }, { status });
}
