import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const page = read("app/coulisses/tibaldo-jungle-la-voix-du-nord/page.tsx");
const journal = read("app/coulisses/page.tsx");
const localLanding = read("app/boutique-plantes-lille/page.tsx");
const lastModified = read("lib/seo/last-modified.ts");
const provenance = JSON.parse(read("docs/media-provenance/photo-20260916-monstera-deliciosa-01.json"));
const shareProvenance = JSON.parse(read("docs/media-provenance/tibaldo-jungle-la-voix-du-nord-og-v1.json"));

const route = "/coulisses/tibaldo-jungle-la-voix-du-nord";
const pressUrl = "https://www.lavoixdunord.fr/1740697/article/2026-09-26/lille-tibaldo-jungle-un-studio-vegetal-ouvre-sur-le-square-de-l-arbonnoise";
const ownerImage = "/media/owner-media/monstera-deliciosa/monstera-deliciosa-jeune-feuille-fenestree.webp";

test("press page preserves the exact external source and original editorial framing", () => {
  assert.match(page, new RegExp(pressUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(page, /Christophe Tilmant \(CLP\)/);
  assert.match(page, /publié le 26 septembre 2026/);
  assert.match(page, /elle ne reproduit pas l’article/);
});

test("press page exposes indexable canonical metadata and an owned Article schema", () => {
  assert.match(page, /alternates: \{ canonical: canonicalPath \}/);
  assert.match(page, /robots: \{ index: true, follow: true \}/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /datePublished: "2026-09-27"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /citation: pressUrl/);
  assert.match(page, /mainEntityOfPage: canonicalUrl/);
});

test("press page uses only the approved Owner image and keeps its rights evidence", () => {
  assert.match(page, new RegExp(ownerImage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal(provenance.photos[0].provenance, "OWNER");
  assert.match(provenance.photos[0].rights, /Owner permanente/i);
  assert.equal(shareProvenance.provenance, "OWNER_DERIVATIVE");
  assert.deepEqual(shareProvenance.dimensions, [1200, 630]);
  assert.match(page, /tibaldo-jungle-la-voix-du-nord-og\.webp/);
  assert.doesNotMatch(page, /<Image[^>]+lavoixdunord/i);
});

test("press page is discoverable through current editorial and local paths", () => {
  assert.match(journal, new RegExp(route));
  assert.match(localLanding, new RegExp(route));
  assert.match(lastModified, new RegExp(`"${route}": "2026-10-07"`));
  for (const link of ["/boutique-plantes-lille", "/plantes", "/plantes/monstera", "/rempotage", "/contact"]) {
    assert.match(page, new RegExp(`href="${link}"`));
  }
});
