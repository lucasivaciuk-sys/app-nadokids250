import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";
import { syncUser } from "@/app/lib/database";

export async function POST(request: Request) {
  try {
    const identity = await requireFirebaseIdentity(request);
    const user = await syncUser(identity);
    return Response.json({ user, isAdmin: identity.isAdmin });
  } catch (error) {
    return authError(error);
  }
}
