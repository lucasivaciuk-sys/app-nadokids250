export type Entitlements = {
  planComplete: boolean;
  smartSheets: boolean;
  assessmentPack: boolean;
  themedCalendar: boolean;
};

type UserRow = {
  uid: string;
  email: string;
  name: string;
  plan_complete: number;
  smart_sheets: number;
  assessment_pack: number;
  themed_calendar: number;
  created_at: string;
  last_login_at: string;
};

export function getD1() {
  const runtime = (globalThis as typeof globalThis & {
    __NADOKIDS_ENV__?: { DB?: D1Database };
  }).__NADOKIDS_ENV__;
  const db = runtime?.DB;
  if (!db) throw new Error("DATABASE_NOT_CONFIGURED");
  return db;
}

export async function ensureSchema(db = getD1()) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS users (
      uid TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT 'Aluno',
      plan_complete INTEGER NOT NULL DEFAULT 0,
      smart_sheets INTEGER NOT NULL DEFAULT 0,
      assessment_pack INTEGER NOT NULL DEFAULT 0,
      themed_calendar INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      last_login_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS access_codes (
      code_hash TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      scopes_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      redeemed_at TEXT,
      redeemed_by TEXT REFERENCES users(uid)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blocked_users (
      uid TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      blocked_at TEXT NOT NULL
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS users_email_idx ON users(email)"),
    db.prepare("CREATE INDEX IF NOT EXISTS codes_redeemed_idx ON access_codes(redeemed_by)"),
  ]);
}

export function mapUser(row: UserRow | null) {
  if (!row) return null;
  return {
    uid: row.uid,
    email: row.email,
    name: row.name,
    planComplete: Boolean(row.plan_complete),
    smartSheets: Boolean(row.smart_sheets),
    assessmentPack: Boolean(row.assessment_pack),
    themedCalendar: Boolean(row.themed_calendar),
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  };
}

export async function getUser(uid: string, db = getD1()) {
  const row = await db.prepare("SELECT * FROM users WHERE uid = ?").bind(uid).first<UserRow>();
  return mapUser(row);
}

export async function syncUser(identity: { uid: string; email: string; name: string }) {
  const db = getD1();
  await ensureSchema(db);
  const blocked = await db.prepare("SELECT uid FROM blocked_users WHERE uid = ?").bind(identity.uid).first();
  if (blocked) throw new Error("ACCOUNT_BLOCKED");
  const now = new Date().toISOString();
  await db
    .prepare(`INSERT INTO users (uid, email, name, created_at, last_login_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(uid) DO UPDATE SET email = excluded.email, name = excluded.name, last_login_at = excluded.last_login_at`)
    .bind(identity.uid, identity.email, identity.name, now, now)
    .run();
  return getUser(identity.uid, db);
}

export async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toUpperCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
