import { featuredFlowerSlugs } from "@/lib/flowers/catalog";
import { listPublicEvents } from "@/lib/events/repository";
import { eventFallbacks } from "@/lib/events/catalog";
import { plants } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { featuredSubstrateSlugs } from "@/app/substrats/data";
import { canonicalGuideSlugs, isFamilyIndexable, isGenreIndexable } from "@/lib/seo/indexability";
import { editorialLastModified, lastModifiedDefaults } from "@/lib/seo/last-modified";

export const dynamic = "force-dynamic";
const origin = "https://jungle.tibaldo.fr";
type Entry = { path: string; modified: string };
const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[character] ?? character));

export async function GET() {
  let publicEvents = eventFallbacks;
  try { publicEvents = await listPublicEvents(); } catch { /* Published fallbacks keep the sitemap available. */ }
  const entries: Entry[] = [
    ...Object.entries(editorialLastModified).map(([path, modified]) => ({ path, modified })),
    ...canonicalGuideSlugs.map((slug) => ({ path: `/conseils/${slug}`, modified: lastModifiedDefaults.guides })),
    ...featuredFlowerSlugs.map((slug) => ({ path: `/fleurs/${slug}`, modified: lastModifiedDefaults.flowers })),
    ...featuredSubstrateSlugs.map((slug) => ({ path: `/substrats/${slug}`, modified: lastModifiedDefaults.substrates })),
    ...Object.keys(familyGuides).filter(isGenreIndexable).map((genre) => ({ path: `/plantes/${genre}`, modified: lastModifiedDefaults.taxonomy })),
    ...Array.from(new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase()))).filter(isFamilyIndexable).map((family) => ({ path: `/plantes/famille/${family}`, modified: lastModifiedDefaults.taxonomy })),
    ...plants.map((plant) => ({ path: `/plantes/${plant.genre}/${plant.slug}`, modified: plant.updatedAt })),
    ...publicEvents.filter((event) => event.status === "published").map((event) => ({ path: `/evenements/${event.slug}`, modified: event.updatedAt })),
  ];
  const unique = Array.from(new Map(entries.map((entry) => [entry.path, entry])).values());
  const urls = unique.map((entry) => `<url><loc>${escapeXml(`${origin}${entry.path}`)}</loc><lastmod>${escapeXml(new Date(entry.modified).toISOString())}</lastmod></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
}
