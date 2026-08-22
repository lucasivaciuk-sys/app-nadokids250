import { redeemAccessCode, sha256 } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

export async function POST(request: Request) {
  try {
    const identity = await requireFirebaseIdentity(request);
    const body = (await request.json()) as { code?: string };
    if (!body.code || body.code.length < 8) return Response.json({ error: "INVALID_CODE" }, { status: 400 });
    const result = await redeemAccessCode(await sha256(body.code), identity.uid);
    if (!result) return Response.json({ error: "CODE_UNAVAILABLE" }, { status: 404 });
    return Response.json({ user: result.user, unlocked: result.scopes });
  } catch (error) {
    return authError(error);
  }
}
