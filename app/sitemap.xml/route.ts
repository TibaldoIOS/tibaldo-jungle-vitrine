import { eventFallbacks } from "@/lib/events/catalog";
import { listPublicEvents } from "@/lib/events/repository";
import { plants } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";

export const dynamic = "force-dynamic";

const origin = "https://jungle.tibaldo.fr";

type SitemapEntry = {
  path: string;
  modified: string;
  frequency: "weekly" | "monthly";
  priority: number;
};

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
}[character] ?? character));

export async function GET() {
  let publicEvents = eventFallbacks;
  try {
    publicEvents = await listPublicEvents();
  } catch {
    // The published fallback event keeps the sitemap available if D1 is temporarily unavailable.
  }

  const entries: SitemapEntry[] = [
    { path: "/", modified: "2026-08-07", frequency: "weekly", priority: 1 },
    ...["plantes", "fleurs", "substrats", "rempotage", "evenements", "services", "contact"].map((path, index) => ({
      path: `/${path}`,
      modified: "2026-08-07",
      frequency: "weekly" as const,
      priority: index === 1 ? 0.9 : 0.8,
    })),
    ...["boutique-plantes-lille", "rempotage-plantes-lille", "substrats-en-vrac-lille", "fleurs-sur-commande-lille"].map((path) => ({ path: `/${path}`, modified: "2026-08-12", frequency: "weekly" as const, priority: 0.9 })),
    ...Object.keys(familyGuides).map((genre) => ({ path: `/plantes/${genre}`, modified: "2026-08-06", frequency: "monthly" as const, priority: 0.8 })),
    ...Array.from(new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase()))).map((family) => ({ path: `/plantes/famille/${family}`, modified: "2026-08-07", frequency: "monthly" as const, priority: 0.75 })),
    ...plants.map((plant) => ({ path: `/plantes/${plant.genre}/${plant.slug}`, modified: plant.updatedAt, frequency: "monthly" as const, priority: 0.85 })),
    ...publicEvents.map((event) => ({ path: `/evenements/${event.slug}`, modified: event.updatedAt, frequency: "weekly" as const, priority: 0.9 })),
    { path: "/creation-boutique", modified: "2026-08-03", frequency: "weekly", priority: 0.75 },
  ];

  const urls = entries.map((entry) => `<url><loc>${escapeXml(`${origin}${entry.path}`)}</loc><lastmod>${escapeXml(new Date(entry.modified).toISOString())}</lastmod><changefreq>${entry.frequency}</changefreq><priority>${entry.priority.toFixed(2)}</priority></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
