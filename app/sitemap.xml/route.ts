import { featuredFlowerSlugs } from "@/lib/flowers/catalog";
import { listPublicEvents } from "@/lib/events/repository";
import { eventFallbacks } from "@/lib/events/catalog";
import { plants } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { featuredSubstrateSlugs } from "@/app/substrats/data";
import {
  canonicalGuideSlugs,
  isFamilyIndexable,
  isGenreIndexable,
} from "@/lib/seo/indexability";
import {
  editorialLastModified,
  lastModifiedDefaults,
} from "@/lib/seo/last-modified";
import { publicRedirectSourcePaths } from "@/lib/seo/public-redirects";
import {
  isPublicJungleDeployment,
  jungleOrigin,
} from "@/lib/deployment-mode";

export const dynamic = "force-dynamic";

type Entry = { path: string; modified: string };

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

export async function GET() {
  if (!isPublicJungleDeployment) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  let publicEvents = eventFallbacks;
  try {
    publicEvents = await listPublicEvents();
  } catch {
    // Published local fallbacks keep the sitemap available if D1 is unavailable.
  }

  const entries: Entry[] = [
    ...Object.entries(editorialLastModified).map(([path, modified]) => ({
      path,
      modified,
    })),
    { path: "/methodologie-sources", modified: "2026-09-02" },
    {
      path: "/plantes/bananiers",
      modified: lastModifiedDefaults.taxonomy,
    },
    ...canonicalGuideSlugs.map((slug) => ({
      path: `/conseils/${slug}`,
      modified: lastModifiedDefaults.guides,
    })),
    ...featuredFlowerSlugs.map((slug) => ({
      path: `/fleurs/${slug}`,
      modified: lastModifiedDefaults.flowers,
    })),
    ...featuredSubstrateSlugs.map((slug) => ({
      path: `/substrats/${slug}`,
      modified: lastModifiedDefaults.substrates,
    })),
    ...Object.keys(familyGuides)
      .filter(isGenreIndexable)
      .map((genre) => ({
        path: `/plantes/${genre}`,
        modified: lastModifiedDefaults.taxonomy,
      })),
    ...Array.from(
      new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase())),
    )
      .filter(isFamilyIndexable)
      .map((family) => ({
        path: `/plantes/famille/${family}`,
        modified: lastModifiedDefaults.taxonomy,
      })),
    ...plants.map((plant) => ({
      path: `/plantes/${plant.genre}/${plant.slug}`,
      modified: plant.updatedAt,
    })),
    ...publicEvents
      .filter((event) => event.status === "published")
      .map((event) => ({
        path: `/evenements/${event.slug}`,
        modified: event.updatedAt,
      })),
  ].filter((entry) => !publicRedirectSourcePaths.has(entry.path));

  const uniqueEntries = Array.from(
    new Map(entries.map((entry) => [entry.path, entry])).values(),
  );
  const urls = uniqueEntries
    .map(
      (entry) =>
        `<url><loc>${escapeXml(`${jungleOrigin}${entry.path}`)}</loc><lastmod>${escapeXml(new Date(entry.modified).toISOString())}</lastmod></url>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
