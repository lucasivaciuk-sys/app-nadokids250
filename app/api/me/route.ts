import { getUser, syncUser } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

export async function GET(request: Request) {
  try {
    const identity = await requireFirebaseIdentity(request);
    const user = (await getUser(identity.uid)) || (await syncUser(identity));
    return Response.json({ user, isAdmin: identity.isAdmin });
  } catch (error) {
    return authError(error);
  }
}
