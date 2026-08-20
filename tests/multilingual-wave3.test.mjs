import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://jungle.tibaldo.fr";
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave3-inventory.generated.json", import.meta.url), "utf8"));
const status = JSON.parse(await readFile(new URL("../lib/i18n/wave3-editorial-status.generated.json", import.meta.url), "utf8"));
const translations = JSON.parse(await readFile(new URL("../lib/i18n/wave3-translations.generated.json", import.meta.url), "utf8"));
const glossary = JSON.parse(await readFile(new URL("../lib/i18n/horticultural-glossary.json", import.meta.url), "utf8"));
let worker;
async function render(pathname) {
  if (!worker) { const workerUrl = new URL("../dist/server/index.js", import.meta.url); workerUrl.searchParams.set("wave3", `${process.pid}-${Date.now()}`); worker = (await import(workerUrl.href)).default; }
  return worker.fetch(new Request(`https://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}
const localized = (path, locale) => `/${locale}${path}`;

test("publishes the audited substrate perimeter as 10 complete triplets", () => {
  assert.equal(inventory.paths.length, 10);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "substrate-hub").length, 1);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "substrate-profile").length, 9);
  assert.equal(inventory.excluded.length, 4);
  assert.equal(Object.keys(status.pages).length, 10);
  for (const page of Object.values(status.pages)) for (const locale of ["en", "es"]) {
    assert.equal(page.translations[locale].status, "published");
    assert.equal(page.translations[locale].parity, "validated");
    assert.equal(page.translations[locale].translatedFromFingerprint, page.sourceFingerprint);
  }
});

test("serves all 20 translated substrate routes with complete reciprocal SEO", async () => {
  for (const { path, kind } of inventory.paths) for (const locale of ["en", "es"]) {
    const route = localized(path, locale); const response = await render(route); assert.equal(response.status, 200, route); const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), route);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+href=["']${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}["']`, "i"), route);
    for (const alternate of ["fr", "en", "es", "x-default"]) assert.match(html, new RegExp(`hreflang=["']${alternate}["']`, "i"), `${route} ${alternate}`);
    assert.match(html, /<title>[^<]{12,}<\/title>/i, `${route} title`);
    assert.match(html, /<meta name="description" content="[^"]{40,}"/i, `${route} description`);
    assert.match(html, /application\/ld\+json/i, `${route} JSON-LD`);
    assert.match(html, /BreadcrumbList/i, `${route} breadcrumbs`);
    assert.match(html, /<img[^>]+alt="[^"]{8,}"/i, `${route} ALT`);
    assert.equal((html.match(new RegExp(`href="\/${locale}\/substrats`, "g")) ?? []).length > 0, true, `${route} localized substrate links`);
    assert.equal((html.match(new RegExp(`href="\/${locale}\/plantes`, "g")) ?? []).length > 0, true, `${route} Wave 1 link`);
    if (kind === "substrate-profile") {
      assert.equal((html.match(/data-parity-section=/g) ?? []).length, 5, `${route} sections`);
      assert.match(html, /FAQPage/i, `${route} FAQ`);
      assert.equal((html.match(/<details/g) ?? []).length >= 3, true, `${route} FAQ parity`);
    } else assert.equal((html.match(/data-parity-section=/g) ?? []).length, 9, `${route} component parity`);
  }
});

test("uses stable substrate terminology and preserves every numeric value", () => {
  assert.deepEqual(glossary["pierre ponce"], { en: "pumice", es: "piedra pómez" });
  assert.deepEqual(glossary["billes d’argile"], { en: "expanded clay pebbles", es: "arcilla expandida" });
  assert.equal(translations.en["Sphaigne séchée compactée"], "Compressed dried sphagnum moss");
  assert.equal(translations.es["Sphaigne séchée compactée"], "Musgo esfagno seco compactado");
  assert.equal(translations.en["Billes d’argile expansée"], "Expanded clay pebbles");
  assert.equal(translations.es["Écorce de pin horticole"], "Corteza de pino hortícola");
  for (const locale of ["en", "es"]) for (const [source, target] of Object.entries(translations[locale])) {
    assert.ok(target.trim(), `${locale}: empty translation`);
    for (const number of source.match(/\d+(?:[,.]\d+)?/g) ?? []) assert.match(target, new RegExp(number.replace(".", "[.,]")), `${locale}: ${number} lost`);
  }
});

test("projects 315 beta URLs while production sitemap stays French-only", async () => {
  const beta = await render("/sitemap-beta-multilingue.xml"); assert.equal(beta.status, 200); assert.equal(beta.headers.get("x-robots-tag"), "noindex"); const xml = await beta.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 315);
  assert.equal((xml.match(/hreflang="x-default"/g) ?? []).length, 315);
  for (const { path } of inventory.paths) for (const locale of ["fr", "en", "es"]) { const route = locale === "fr" ? path : localized(path, locale); assert.match(xml, new RegExp(`<loc>${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}<\/loc>`), route); }
  const production = await (await render("/sitemap.xml")).text(); assert.doesNotMatch(production, /<loc>https:\/\/jungle\.tibaldo\.fr\/(?:en|es)\//);
});

test("keeps commercial and local substrate services outside Wave 3", async () => {
  for (const route of ["/en/substrats-en-vrac-lille", "/es/rempotage", "/en/rempotage-plantes-lille", "/es/pots-cache-pots-lille"]) assert.equal((await render(route)).status, 404, route);
});
