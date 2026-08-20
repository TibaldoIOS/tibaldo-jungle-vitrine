import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://jungle.tibaldo.fr";
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave1-inventory.generated.json", import.meta.url), "utf8"));
const status = JSON.parse(await readFile(new URL("../lib/i18n/wave1-editorial-status.generated.json", import.meta.url), "utf8"));
let worker;
async function render(pathname, hostname = "localhost") {
  if (!worker) { const workerUrl = new URL("../dist/server/index.js", import.meta.url); workerUrl.searchParams.set("wave1", `${process.pid}-${Date.now()}`); worker = (await import(workerUrl.href)).default; }
  return worker.fetch(new Request(`https://${hostname}${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}
const localized = (path, locale) => `/${locale}${path}`;

test("publishes 69 complete botanical triplets in the beta wave", async () => {
  assert.equal(inventory.paths.length, 69);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "hub").length, 1);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "group").length, 1);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "genre").length, 26);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "family").length, 3);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "identity").length, 38);
  assert.equal(Object.keys(status.pages).length, 69);
  for (const page of Object.values(status.pages)) for (const locale of ["en", "es"]) { assert.equal(page.translations[locale].status, "published"); assert.equal(page.translations[locale].parity, "validated"); assert.equal(page.translations[locale].translatedFromFingerprint, page.sourceFingerprint); }
});

test("serves every EN and ES botanical route with reciprocal SEO", async () => {
  for (const { path, kind } of inventory.paths) for (const locale of ["en", "es"]) {
    const route = localized(path, locale);
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), route);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+href=["']${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}["']`, "i"), route);
    for (const alternate of ["fr", "en", "es", "x-default"]) assert.match(html, new RegExp(`hreflang=["']${alternate}["']`, "i"), `${route} ${alternate}`);
    assert.match(html, /<title>[^<]{8,}<\/title>/i, `${route} title`);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/i, `${route} description`);
    assert.match(html, /application\/ld\+json/i, `${route} JSON-LD`);
    assert.match(html, /BreadcrumbList/, `${route} breadcrumb data`);
    assert.match(html, /<img[^>]+alt="[^"]+"/i, `${route} ALT`);
    if (kind === "identity") { assert.equal((html.match(/data-wave1-section=/g) ?? []).length, 9, `${route} sections`); assert.match(html, /FAQPage/, `${route} FAQ data`); }
    if (kind === "genre") assert.equal((html.match(/data-wave1-section=/g) ?? []).length, 9, `${route} sections`);
    if (kind === "family") assert.equal((html.match(/data-wave1-section=/g) ?? []).length, 2, `${route} sections`);
  }
});

test("keeps scientific identities and locale-neutral API contracts", async () => {
  const identityPaths = inventory.paths.filter(({ kind }) => kind === "identity").map(({ path }) => path);
  assert.equal(new Set(identityPaths).size, 38);
  for (const path of identityPaths) {
    const [, , genre, slug] = path.split("/");
    for (const locale of ["en", "es"]) {
      const html = await (await render(localized(path, locale))).text();
      assert.match(html, new RegExp(`\/plantes\/${genre}\/${slug}`), `${locale} ${path}`);
    }
  }
  const api = await render("/api/v2/encyclopedie/plantes");
  assert.equal(api.status, 200);
  const entries = await api.json();
  assert.equal(entries.length, 38);
  assert.equal(new Set(entries.map(({ encyclopediaSlug }) => encyclopediaSlug)).size, 38);
});

test("projects the complete multilingual beta sitemap without touching production sitemap", async () => {
  const beta = await render("/sitemap-beta-multilingue.xml");
  assert.equal(beta.status, 200);
  assert.equal(beta.headers.get("x-robots-tag"), "noindex");
  const xml = await beta.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 279);
  for (const { path } of inventory.paths) for (const locale of ["fr", "en", "es"]) {
    const route = locale === "fr" ? path : localized(path, locale);
    assert.match(xml, new RegExp(`<loc>${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}<\/loc>`), route);
  }
  const production = await render("/sitemap.xml");
  const productionXml = await production.text();
  assert.doesNotMatch(productionXml, /<loc>https:\/\/jungle\.tibaldo\.fr\/(?:en|es)\//);
});

test("fails closed outside the published multilingual perimeter", async () => {
  for (const route of ["/en/plantes/inconnu", "/es/plantes/famille/inconnue", "/en/substrats/inconnu", "/es/services"]) assert.equal((await render(route)).status, 404, route);
});

test("publishes the current Jungle Cycas source with complete EN and ES media parity", async () => {
  const expectedMedia = [
    "/images/cycas-revoluta/cycas-revoluta-terrasse-tibaldo.webp",
    "/images/cycas-revoluta/cycas-revoluta-port-couronne.webp",
    "/images/cycas-revoluta/cycas-revoluta-pot-noir-exterieur.webp",
    "/images/cycas-revoluta/cycas-revoluta-pot-bleu-frondes.webp",
  ];
  for (const locale of ["en", "es"]) {
    const html = await (await render(`/${locale}/plantes/cycas/revoluta`)).text();
    for (const media of expectedMedia) assert.match(html, new RegExp(media.replaceAll("/", "\\/")), `${locale} ${media}`);
    assert.match(html, /15[^<]{0,20}27\s?°C/i, `${locale} temperatures`);
    assert.match(html, locale === "en" ? /All parts are toxic; the seeds are particularly dangerous/i : /Todas las partes son tóxicas; las semillas son especialmente peligrosas/i);
    assert.equal((html.match(/<img[^>]+cycas-revoluta[^>]+alt="[^"]+"/gi) ?? []).length >= 4, true, `${locale} ALT`);
  }
});
