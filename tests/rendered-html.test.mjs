import assert from "node:assert/strict";
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
  assert.match(html, /Plantes rares[\s\S]*&amp; exotiques[\s\S]*à Lille\./i);
  assert.match(html, /class=["']hero-line["']/i);
  assert.match(html, /data-parallax=["']18["']/i);
  assert.match(html, /Découvrir la sélection/i);
  assert.match(html, /href=["']\/substrats["']/i);
  assert.match(html, /Une passion cultivée/i);
  assert.match(html, /Grande ouverture · 26 septembre 2026 · Lille/i);
  assert.match(html, /Rempotage gratuit toute l’année/i);
  assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille\/["']/i);
  assert.doesNotMatch(html, /Lille · Nord · France/i);
  assert.match(html, /href=["'](?:https:\/\/jungle\.tibaldo\.fr)?\/favicon\.png["']/i);
});

test("renders the substrates collection with local SEO metadata", async () => {
  const response = await render("/substrats/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Substrats en vrac à Lille/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/substrats\/["']/i);
  assert.match(html, /CollectionPage/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /Terreau Signature by Romain/i);
  assert.match(html, /Écorce de pin/i);
  assert.match(html, /Sphaigne séchée/i);
  assert.match(html, /Pierre ponce/i);
  assert.match(html, /Zéolite/i);
  assert.match(html, /Photographie produit à venir/i);
});

test("serves a crawlable robots file and a populated XML sitemap", async () => {
  const robots = await render("/robots.txt/");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.match(await robots.text(), /Sitemap: https:\/\/jungle\.tibaldo\.fr\/sitemap\.xml\//i);

  const sitemap = await render("/sitemap.xml/");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /application\/xml/i);
  const xml = await sitemap.text();
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/i);
  assert.match(xml, /https:\/\/jungle\.tibaldo\.fr\/evenements\//i);
  assert.match(xml, /https:\/\/jungle\.tibaldo\.fr\/plantes\/alocasia\//i);
  assert.doesNotMatch(xml, /\/admin\//i);
});
