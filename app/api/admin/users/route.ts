import { ensureSchema, getD1, mapUser } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

async function requireAdmin(request: Request) {
  const identity = await requireFirebaseIdentity(request);
  if (!identity.isAdmin) throw new Error("FORBIDDEN");
  return identity;
}

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const db = getD1();
    await ensureSchema(db);
    const result = await db.prepare("SELECT * FROM users ORDER BY last_login_at DESC LIMIT 500").all();
    return Response.json({ users: (result.results as Parameters<typeof mapUser>[0][]).map(mapUser) });
  } catch (error) {
    return authError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const body = (await request.json()) as {
      uid?: string;
      planComplete?: boolean;
      smartSheets?: boolean;
      assessmentPack?: boolean;
      themedCalendar?: boolean;
    };
    if (!body.uid) return Response.json({ error: "MISSING_UID" }, { status: 400 });
    const db = getD1();
    await ensureSchema(db);
    await db.prepare(`UPDATE users SET plan_complete = ?, smart_sheets = ?, assessment_pack = ?, themed_calendar = ? WHERE uid = ?`)
      .bind(body.planComplete ? 1 : 0, body.smartSheets ? 1 : 0, body.assessmentPack ? 1 : 0, body.themedCalendar ? 1 : 0, body.uid)
      .run();
    const row = await db.prepare("SELECT * FROM users WHERE uid = ?").bind(body.uid).first();
    return Response.json({ user: mapUser(row as Parameters<typeof mapUser>[0]) });
  } catch (error) {
    return authError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdmin(request);
    const body = (await request.json()) as { uid?: string };
    if (!body.uid) return Response.json({ error: "MISSING_UID" }, { status: 400 });
    if (body.uid === admin.uid) return Response.json({ error: "CANNOT_DELETE_ADMIN" }, { status: 400 });
    const db = getD1();
    await ensureSchema(db);
    const existing = await db.prepare("SELECT uid, email FROM users WHERE uid = ?").bind(body.uid).first<{ uid: string; email: string }>();
    if (!existing) return Response.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    const now = new Date().toISOString();
    await db.batch([
      db.prepare("INSERT OR REPLACE INTO blocked_users (uid, email, blocked_at) VALUES (?, ?, ?)").bind(existing.uid, existing.email, now),
      db.prepare("UPDATE access_codes SET redeemed_by = NULL WHERE redeemed_by = ?").bind(existing.uid),
      db.prepare("DELETE FROM users WHERE uid = ?").bind(existing.uid),
    ]);
    return Response.json({ deleted: true });
  } catch (error) {
    return authError(error);
  }
}
