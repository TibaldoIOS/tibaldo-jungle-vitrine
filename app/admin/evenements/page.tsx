import { chatGPTSignOutPath, requireChatGPTUser } from "@/app/chatgpt-auth";
import { listAdminEvents } from "@/lib/events/repository";
import EventAdmin from "./EventAdmin";

export const dynamic = "force-dynamic";
const ALLOWED = new Set(["contact@tibaldo.fr", "jungle@tibaldo.fr", "rom.pruvost@me.com"]);

export default async function AdminEventsPage() {
  const user = await requireChatGPTUser("/admin/evenements");
  if (!ALLOWED.has(user.email.toLowerCase())) return <main className="event-admin-denied"><h1>Accès réservé</h1><p>Ce compte n’est pas autorisé à administrer les événements Tibaldo Jungle.</p><a href={chatGPTSignOutPath("/admin/evenements")}>Changer de compte</a></main>;
  const events = await listAdminEvents();
  return <><div className="event-admin-user">Connecté : {user.displayName} · <a href={chatGPTSignOutPath("/")}>Se déconnecter</a></div><EventAdmin initialEvents={events} /></>;
}
