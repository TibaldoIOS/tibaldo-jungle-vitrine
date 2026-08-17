import { and, desc, eq, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { events } from "@/db/schema";
import { eventFallbacks, openingEvent } from "./catalog";
import type { JungleEvent } from "./types";

type EventRow = typeof events.$inferSelect;

const stringify = (value: unknown) => JSON.stringify(value);
const parse = <T,>(value: string, fallback: T): T => {
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

function toRow(event: JungleEvent): typeof events.$inferInsert {
  const { program, faq, gallery, seoKeywords, ...fields } = event;
  return {
    ...fields,
    programJson: stringify(program),
    faqJson: stringify(faq),
    galleryJson: stringify(gallery),
    seoKeywords: seoKeywords.join(", "),
  };
}

function fromRow(row: EventRow): JungleEvent {
  return {
    ...row,
    category: row.category as JungleEvent["category"],
    status: row.status as JungleEvent["status"],
    program: parse(row.programJson, []),
    faq: parse(row.faqJson, []),
    gallery: parse(row.galleryJson, []),
    seoKeywords: row.seoKeywords.split(",").map((item) => item.trim()).filter(Boolean),
  };
}

async function seedOpeningEvent() {
  const db = await getDb();
  const [existing] = await db.select().from(events).where(eq(events.id, openingEvent.id)).limit(1);
  if (!existing) {
    await db.insert(events).values(toRow(openingEvent));
  } else {
    if (existing.seoTitle === "Que faire à Lille ce week-end ? Ouverture Tibaldo Jungle") {
      await db.update(events).set({
        seoTitle: openingEvent.seoTitle,
        seoDescription: openingEvent.seoDescription,
        updatedAt: new Date().toISOString(),
      }).where(eq(events.id, openingEvent.id));
    } else if (new Date(existing.updatedAt).getTime() < new Date(openingEvent.updatedAt).getTime()) {
      await db.update(events).set(toRow(openingEvent)).where(eq(events.id, openingEvent.id));
    }
  }
}

export async function listPublicEvents(): Promise<JungleEvent[]> {
  try {
    await seedOpeningEvent();
    const rows = await (await getDb()).select().from(events).where(eq(events.status, "published")).orderBy(desc(events.startAt));
    return rows.map(fromRow);
  } catch {
    return eventFallbacks;
  }
}

export async function listAdminEvents(): Promise<JungleEvent[]> {
  await seedOpeningEvent();
  return (await (await getDb()).select().from(events).orderBy(desc(events.startAt))).map(fromRow);
}

export async function getPublicEvent(slug: string): Promise<JungleEvent | null> {
  try {
    await seedOpeningEvent();
    const [row] = await (await getDb()).select().from(events).where(and(eq(events.slug, slug), eq(events.status, "published"))).limit(1);
    return row ? fromRow(row) : null;
  } catch {
    return eventFallbacks.find((event) => event.slug === slug) ?? null;
  }
}

export async function getAdminEvent(id: string): Promise<JungleEvent | null> {
  await seedOpeningEvent();
  const [row] = await (await getDb()).select().from(events).where(eq(events.id, id)).limit(1);
  return row ? fromRow(row) : null;
}

export async function saveEvent(event: JungleEvent): Promise<JungleEvent> {
  const db = await getDb();
  const row = toRow(event);
  await db.insert(events).values(row).onConflictDoUpdate({ target: events.id, set: row });
  return event;
}

export async function deleteEvent(id: string) {
  await (await getDb()).delete(events).where(and(eq(events.id, id), ne(events.id, openingEvent.id)));
}

export async function archiveEvent(id: string) {
  const now = new Date().toISOString();
  await (await getDb()).update(events).set({ status: "archived", archivedAt: now, updatedAt: now }).where(eq(events.id, id));
}
