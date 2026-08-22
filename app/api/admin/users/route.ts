import { blockAndDeleteUser, listUsers, updateUserEntitlements } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

async function requireAdmin(request: Request) {
  const identity = await requireFirebaseIdentity(request);
  if (!identity.isAdmin) throw new Error("FORBIDDEN");
  return identity;
}

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return Response.json({ users: await listUsers() });
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
    const user = await updateUserEntitlements(body.uid, {
      planComplete: Boolean(body.planComplete),
      smartSheets: Boolean(body.smartSheets),
      assessmentPack: Boolean(body.assessmentPack),
      themedCalendar: Boolean(body.themedCalendar),
    });
    return Response.json({ user });
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
    if (!(await blockAndDeleteUser(body.uid))) return Response.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    return Response.json({ deleted: true });
  } catch (error) {
    return authError(error);
  }
}
