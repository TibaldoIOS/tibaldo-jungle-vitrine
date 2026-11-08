import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Christmas tree editorial hub has two distinct botanical profiles and no shop inventory", () => {
  const hub = read("app/sapins-noel-lille/page.tsx");
  const profile = read("app/sapins-noel-lille/[slug]/page.tsx");
  const data = read("app/sapins-noel-lille/data.ts");
  assert.match(data, /Abies nordmanniana/);
  assert.match(data, /Picea abies/);
  assert.match(data, /getChristmasTree/);
  assert.match(hub, /christmasTrees\.map/);
  assert.match(profile, /generateStaticParams/);
  assert.match(profile, /notFound/);
  assert.match(hub, /ItemList/);
  assert.match(profile, /Taxon/);
  assert.doesNotMatch(hub + profile, /"@type": "Product"|"availability": "InStock"/);
});

test("local Christmas-tree delivery is seasonal, not the default plant delivery", () => {
  const hub = read("app/sapins-noel-lille/page.tsx");
  const profile = read("app/sapins-noel-lille/[slug]/page.tsx");
  assert.match(hub, /livraison incluse/i);
  assert.match(hub, /Métropole Européenne de Lille/);
  assert.match(profile, /métropole lilloise/i);
  assert.match(hub, /\/livraison-plantes-lille/);
  assert.match(profile, /\/livraison-plantes-lille/);
  assert.match(hub, /sur demande/i);
  assert.match(read("app/livraison-plantes-lille/page.tsx"), /0,80 € par kilomètre/);
});

test("SEO/GEO canonical routes, sitemap and internal navigation remain coherent", () => {
  const hub = read("app/sapins-noel-lille/page.tsx");
  const detail = read("app/sapins-noel-lille/[slug]/page.tsx");
  const sitemapEntries = read("lib/seo/last-modified.ts");
  const contracts = read("scripts/public-sitemap-contract.mjs");
  const encyclopedia = read("app/plantes/page.tsx");
  const footer = read("app/SiteChrome.tsx");
  const localShop = read("app/boutique-plantes-lille/page.tsx");
  assert.match(hub, /alternates: \{ canonical: christmasTreeBase \}/);
  assert.match(detail, /alternates: \{ canonical \}/);
  for (const route of ["/sapins-noel-lille", "/sapins-noel-lille/nordmann", "/sapins-noel-lille/epicea"]) {
    assert.ok(sitemapEntries.includes(`"${route}": "2026-11-08"`), route);
  }
  assert.match(contracts, /certifiedPublicNonFamilyNonSpeciesUrlCount = 80/);
  assert.match(encyclopedia, /href="\/sapins-noel-lille"/);
  assert.match(footer, /href="\/sapins-noel-lille"/);
  assert.match(localShop, /href: "\/sapins-noel-lille"/);
  assert.match(hub + detail, /FAQPage/);
});

test("seasonal illustrations are labelled clearly, not claimed as genuine photographs", () => {
  for (const slug of ["nordmann", "epicea"]) {
    const svg = read(`public/sapins-noel-lille/${slug}.svg`);
    assert.match(svg, /<svg/);
    assert.match(svg, /ILLUSTRATION/);
    assert.match(svg, /<title/);
  }
});
