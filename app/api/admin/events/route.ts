import { archiveEvent, deleteEvent, listAdminEvents, saveEvent } from "@/lib/events/repository";
import { requireEventAdminApi } from "@/lib/events/admin";
import type { JungleEvent } from "@/lib/events/types";

export const dynamic = "force-dynamic";

const unauthorized = () => Response.json({ error: "Accès administrateur requis." }, { status: 401 });

export async function GET() {
  try {
    await requireEventAdminApi();
    return Response.json({ events: await listAdminEvents() });
  } catch { return unauthorized(); }
}

export async function POST(request: Request) {
  try {
    await requireEventAdminApi();
    const event = await request.json() as JungleEvent;
    const now = new Date().toISOString();
    event.id ||= crypto.randomUUID();
    event.createdAt ||= now;
    event.updatedAt = now;
    event.publishedAt = event.status === "published" ? event.publishedAt ?? now : null;
    return Response.json({ event: await saveEvent(event) });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return unauthorized();
    return Response.json({ error: "Impossible d’enregistrer cet événement." }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireEventAdminApi();
    const { id, action } = await request.json() as { id: string; action: "archive" };
    if (action === "archive") await archiveEvent(id);
    return Response.json({ ok: true });
  } catch { return unauthorized(); }
}

export async function DELETE(request: Request) {
  try {
    await requireEventAdminApi();
    const { id } = await request.json() as { id: string };
    await deleteEvent(id);
    return Response.json({ ok: true });
  } catch { return unauthorized(); }
}
