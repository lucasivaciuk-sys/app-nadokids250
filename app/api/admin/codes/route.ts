import { createAccessCode, sha256 } from "@/app/lib/database";
import { authError, requireFirebaseIdentity } from "@/app/lib/server-auth";

const validScopes = ["planComplete", "smartSheets", "assessmentPack", "themedCalendar"];

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const value = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `NK-${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)}-${value.slice(12)}`;
}

export async function POST(request: Request) {
  try {
    const identity = await requireFirebaseIdentity(request);
    if (!identity.isAdmin) throw new Error("FORBIDDEN");
    const body = (await request.json()) as { scopes?: string[]; label?: string };
    const scopes = Array.from(new Set(body.scopes || [])).filter((scope) => validScopes.includes(scope));
    if (!scopes.length) return Response.json({ error: "SELECT_SCOPE" }, { status: 400 });
    const code = makeCode();
    await createAccessCode(await sha256(code), body.label?.trim() || "Código de acesso", scopes);
    return Response.json({ code, scopes });
  } catch (error) {
    return authError(error);
  }
}
