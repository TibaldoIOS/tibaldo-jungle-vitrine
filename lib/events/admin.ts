import { getChatGPTUser } from "@/app/chatgpt-auth";

const ADMIN_EMAILS = new Set(["contact@tibaldo.fr", "jungle@tibaldo.fr", "rom.pruvost@me.com"]);

export async function getEventAdmin() {
  const user = await getChatGPTUser();
  return user && ADMIN_EMAILS.has(user.email.toLowerCase()) ? user : null;
}

export async function requireEventAdminApi() {
  const user = await getEventAdmin();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}
