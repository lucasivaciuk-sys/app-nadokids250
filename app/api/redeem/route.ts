import { ensureSchema, getD1, getUser, sha256 } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

const allowedScopes = ["planComplete", "smartSheets", "assessmentPack", "themedCalendar"] as const;

export async function POST(request: Request) {
  try {
    const identity = await requireFirebaseIdentity(request);
    const body = (await request.json()) as { code?: string };
    if (!body.code || body.code.length < 8) {
      return Response.json({ error: "INVALID_CODE" }, { status: 400 });
    }

    const db = getD1();
    await ensureSchema(db);
    const hash = await sha256(body.code);
    const code = await db
      .prepare("SELECT scopes_json, redeemed_by FROM access_codes WHERE code_hash = ?")
      .bind(hash)
      .first<{ scopes_json: string; redeemed_by: string | null }>();

    if (!code || code.redeemed_by) {
      return Response.json({ error: "CODE_UNAVAILABLE" }, { status: 404 });
    }

    const scopes = (JSON.parse(code.scopes_json) as string[]).filter((scope) =>
      allowedScopes.includes(scope as (typeof allowedScopes)[number])
    );
    if (!scopes.length) return Response.json({ error: "EMPTY_CODE" }, { status: 400 });

    const columns: Record<(typeof allowedScopes)[number], string> = {
      planComplete: "plan_complete",
      smartSheets: "smart_sheets",
      assessmentPack: "assessment_pack",
      themedCalendar: "themed_calendar",
    };
    const setters = scopes.map((scope) => `${columns[scope as keyof typeof columns]} = 1`).join(", ");
    const now = new Date().toISOString();

    const results = await db.batch([
      db.prepare("UPDATE access_codes SET redeemed_by = ?, redeemed_at = ? WHERE code_hash = ? AND redeemed_by IS NULL")
        .bind(identity.uid, now, hash),
      db.prepare(`UPDATE users SET ${setters} WHERE uid = ? AND EXISTS (
        SELECT 1 FROM access_codes WHERE code_hash = ? AND redeemed_by = ? AND redeemed_at = ?
      )`).bind(identity.uid, hash, identity.uid, now),
    ]);

    if (!results[0].meta.changes) {
      return Response.json({ error: "CODE_UNAVAILABLE" }, { status: 409 });
    }

    return Response.json({ user: await getUser(identity.uid, db), unlocked: scopes });
  } catch (error) {
    return authError(error);
  }
}
