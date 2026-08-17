import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

test("renders the homepage SEO signals and editorial content", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Tibaldo Jungle — Studio Végétal à Lille<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*name=["']description["'])(?=[^>]*content=["'][^"']*Nouveauté à Lille[^"']*26 septembre 2026[^"']*["'])[^>]*>/i,
  );
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/?["'])[^>]*>/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /Plantes rares[\s\S]*&amp; tropicales[\s\S]*à Lille\./i);
  assert.match(html, /Plantes d’intérieur et d’extérieur, espèces exotiques, pépites rares et conseils passionnés\./i);
  assert.match(html, /class=["']hero-line["']/i);
  assert.match(html, /data-parallax=["']18["']/i);
  assert.match(html, /Trois univers/i);
  assert.match(html, /href=["']\/substrats["']/i);
  assert.match(html, /Conseiller sans sur-vendre/i);
  assert.match(html, /Grande ouverture · 26 septembre 2026 · Lille/i);
  assert.match(html, /Rempotage gratuit toute l’année/i);
  assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
  assert.doesNotMatch(html, /Lille · Nord · France/i);
  assert.match(html, /href=["'](?:https:\/\/jungle\.tibaldo\.fr)?\/favicon\.png["']/i);
});

test("renders the substrates collection with local SEO metadata", async () => {
  const response = await render("/substrats");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Substrats en vrac à Lille/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/substrats["']/i);
  assert.match(html, /CollectionPage/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /Terreau Signature by Romain/i);
  assert.match(html, /Écorce de pin/i);
  assert.match(html, /Sphaigne séchée/i);
  assert.match(html, /Zéolite/i);
  assert.match(html, /src=["']\/substrats\/terreau-signature-substrat-plantes-lille\.jpg["']/i);
  assert.match(html, /src=["']\/substrats\/sphaigne-sechee-substrat-plantes-lille-v2\.png["']/i);
});

test("serves a crawlable robots file and a populated XML sitemap", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.match(await robots.text(), /Sitemap: https:\/\/jungle\.tibaldo\.fr\/sitemap\.xml/i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /application\/xml/i);
  const xml = await sitemap.text();
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/i);
  assert.match(xml, /https:\/\/jungle\.tibaldo\.fr\/evenements\//i);
  assert.match(xml, /https:\/\/jungle\.tibaldo\.fr\/evenements\/ouverture-tibaldo-jungle-lille/i);
  assert.match(xml, /https:\/\/jungle\.tibaldo\.fr\/plantes\/alocasia\//i);
  for (const guide of ["lumiere-plantes-interieur", "choisir-plante-selon-piece", "engrais-plantes-interieur", "plantes-interieur-hiver", "humidite-plantes-tropicales", "nettoyer-feuilles-plantes", "araignees-rouges-plantes", "pot-perce-cache-pot-coupelle"]) {
    assert.match(xml, new RegExp(`https://jungle\\.tibaldo\\.fr/conseils/${guide}`));
  }
  for (const redirected of ["creation-boutique", "diagnostic-plante-lille", "traitement-thrips-lille", "rempotage-monstera-lille", "substrat-alocasia-lille", "livraison-fleurs-coupees-lille", "bouquets-fleurs-livraison-lille", "conseils/thrips-plantes-interieur-lille", "conseils/rempoter-plante-quand-comment"]) {
    assert.doesNotMatch(xml, new RegExp(`<loc>https://jungle\\.tibaldo\\.fr/${redirected}</loc>`));
  }
  assert.doesNotMatch(xml, /\/admin\//i);
});

test("links the opening event contextually from major editorial pages", async () => {
  for (const route of ["/plantes", "/substrats", "/services"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
    assert.match(html, /Nouvelle boutique de plantes à Lille/i);
  }
});

test("renders the opening event with complete crawlable SEO data", async () => {
  const response = await render("/evenements/ouverture-tibaldo-jungle-lille");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Ouverture du Studio Végétal à Lille — 26 septembre 2026<\/title>/i);
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/evenements\/ouverture-tibaldo-jungle-lille["'])[^>]*>/i);
  assert.match(html, /<h1>Ouverture du Studio Végétal – Tibaldo Jungle à Lille<\/h1>/i);
  assert.match(html, /"@type":"Event"/i);
  assert.match(html, /"isAccessibleForFree":true/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.match(html, /26 septembre 2026/i);
  assert.doesNotMatch(html, /Que faire à Lille ce week-end/i);
});

test("serves every retained SEO migration as one direct 301", async () => {
  const redirects = new Map([
    ["/creation-boutique", "/coulisses"],
    ["/diagnostic-plante-lille", "/sos-plantes"],
    ["/traitement-thrips-lille", "/sos-plantes"],
    ["/conseils/thrips-plantes-interieur-lille", "/conseils/thrips-plantes-interieur"],
    ["/conseils/rempoter-plante-quand-comment", "/rempotage"],
    ["/rempotage-monstera-lille", "/rempotage-plantes-lille"],
    ["/substrat-alocasia-lille", "/plantes/alocasia"],
    ["/livraison-fleurs-coupees-lille", "/fleurs-sur-commande-lille"],
    ["/bouquets-fleurs-livraison-lille", "/fleurs-sur-commande-lille"],
  ]);
  for (const [source, destination] of redirects) {
    const response = await render(source);
    assert.equal(response.status, 301, source);
    assert.equal(new URL(response.headers.get("location"), "https://jungle.tibaldo.fr").pathname.replace(/\/$/, ""), destination);
  }
});

test("conserves the existing plant encyclopedia API contract", async () => {
  const response = await render("/api/encyclopedie/plantes");
  assert.equal(response.status, 200);
  const entries = await response.json();
  assert.ok(entries.length > 0);
  const expectedFields = ["id", "genre", "genreLabel", "slug", "displayName", "botanicalName", "cultivar", "family", "imageUrl", "imageAlt", "encyclopediaSlug", "encyclopediaUrl", "publishedAt", "updatedAt"];
  for (const entry of entries) {
    assert.deepEqual(Object.keys(entry), expectedFields);
    assert.match(entry.encyclopediaSlug, /^plantes\/[a-z0-9-]+\/[a-z0-9-]+$/);
    assert.equal(entry.encyclopediaUrl, `https://jungle.tibaldo.fr/${entry.encyclopediaSlug}`);
    assert.match(entry.imageUrl, /^https:\/\/jungle\.tibaldo\.fr\//);
    assert.ok(entry.botanicalName);
  }
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => entry.encyclopediaSlug)).size, entries.length);
  assert.ok(entries.some((entry) => entry.encyclopediaSlug === "plantes/epiphyllum/anguliger"));
});

test("exposes an additive versioned plant encyclopedia V2", async () => {
  const response = await render("/api/v2/encyclopedie/plantes");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-tibaldo-contract-version"), "2.0");
  const entries = await response.json();
  assert.ok(entries.length > 0);
  assert.equal(new Set(entries.map((entry) => entry.botanicalName.toLowerCase())).size, entries.length);
  for (const entry of entries) {
    assert.equal(entry.contractVersion, "2.0");
    assert.ok(entry.navigationGenre);
    assert.ok(entry.taxonomy.genus);
    assert.equal(entry.taxonomyGenreDiffers, entry.taxonomy.genus.toLowerCase() !== entry.navigationGenre);
    assert.ok(entry.taxonomy.species);
    assert.ok(entry.primaryImage.url);
    assert.ok(entry.images.length > 0);
    assert.equal(entry.primaryImage.url, entry.imageUrl);
    for (const image of entry.images) {
      assert.match(image.path, /^\//);
      assert.equal(image.url, `https://jungle.tibaldo.fr${image.path}`);
      assert.ok(existsSync(new URL(`../public${image.path}`, import.meta.url)), `Média absent : ${image.path}`);
    }
  }
  const taxonKeys = entries.map((entry) => [entry.taxonomy.genus, entry.taxonomy.species, entry.taxonomy.cultivar ?? ""].join("|").toLowerCase());
  assert.equal(new Set(taxonKeys).size, entries.length);
});

test("returns 404 for an unknown encyclopedia plant page", async () => {
  const response = await render("/plantes/inconnu/plante-inconnue");
  assert.equal(response.status, 404);
});
