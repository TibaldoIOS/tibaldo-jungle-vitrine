import { getDb } from "@/db";
import { flowerQuoteRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

const clean = (value: unknown, limit = 500) => typeof value === "string" ? value.trim().slice(0, limit) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const firstName = clean(body.firstName, 80); const lastName = clean(body.lastName, 80); const email = clean(body.email, 180);
    const eventType = clean(body.eventType, 80); const city = clean(body.city, 120); const fulfillment = clean(body.fulfillment, 40); const message = clean(body.message, 2500);
    if (!firstName || !lastName || !email.includes("@") || !eventType || !city || !fulfillment || !message || body.consent !== true) return Response.json({ error: "Merci de compléter les champs obligatoires." }, { status: 400 });
    const now = new Date().toISOString();
    await (await getDb()).insert(flowerQuoteRequests).values({ id: crypto.randomUUID(), firstName, lastName, email, phone: clean(body.phone, 40) || null, eventType, eventDate: clean(body.eventDate, 20) || null, city, fulfillment, budget: clean(body.budget, 80) || null, colors: clean(body.colors, 300) || null, flowerSlugs: Array.isArray(body.flowerSlugs) ? body.flowerSlugs.map((item) => clean(item, 80)).filter(Boolean).slice(0, 40).join(",") : "", message, consentAt: now, createdAt: now });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "La demande n’a pas pu être enregistrée. Vous pouvez nous écrire à jungle@tibaldo.fr." }, { status: 500 }); }
}
