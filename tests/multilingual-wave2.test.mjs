import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://jungle.tibaldo.fr";
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave2-inventory.generated.json", import.meta.url), "utf8"));
const status = JSON.parse(await readFile(new URL("../lib/i18n/wave2-editorial-status.generated.json", import.meta.url), "utf8"));
const translations = JSON.parse(await readFile(new URL("../lib/i18n/wave2-translations.generated.json", import.meta.url), "utf8"));
const glossary = JSON.parse(await readFile(new URL("../lib/i18n/horticultural-glossary.json", import.meta.url), "utf8"));
let worker;
async function render(pathname) {
  if (!worker) { const workerUrl = new URL("../dist/server/index.js", import.meta.url); workerUrl.searchParams.set("wave2", `${process.pid}-${Date.now()}`); worker = (await import(workerUrl.href)).default; }
  return worker.fetch(new Request(`https://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}
const localized = (path, locale) => `/${locale}${path}`;

test("publishes the exact national guide perimeter as 13 complete triplets", () => {
  assert.equal(inventory.paths.length, 13);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "guide-hub").length, 1);
  assert.equal(inventory.paths.filter(({ kind }) => kind === "guide").length, 12);
  assert.equal(inventory.excluded.length, 7);
  assert.equal(Object.keys(status.pages).length, 13);
  for (const page of Object.values(status.pages)) for (const locale of ["en", "es"]) {
    assert.equal(page.translations[locale].status, "published");
    assert.equal(page.translations[locale].parity, "validated");
    assert.equal(page.translations[locale].translatedFromFingerprint, page.sourceFingerprint);
  }
});

test("serves all 26 translated guide routes with reciprocal SEO and content parity", async () => {
  for (const { path, kind } of inventory.paths) for (const locale of ["en", "es"]) {
    const route = localized(path, locale);
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), route);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+href=["']${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}["']`, "i"), route);
    for (const alternate of ["fr", "en", "es", "x-default"]) assert.match(html, new RegExp(`hreflang=["']${alternate}["']`, "i"), `${route} ${alternate}`);
    assert.match(html, /<title>[^<]{12,}<\/title>/i, `${route} title`);
    assert.match(html, /<meta name="description" content="[^"]{40,}"/i, `${route} description`);
    assert.match(html, /application\/ld\+json/i, `${route} JSON-LD`);
    assert.match(html, /BreadcrumbList|CollectionPage/i, `${route} structured data`);
    assert.match(html, /<img[^>]+alt="[^"]{5,}"/i, `${route} ALT`);
    assert.equal((html.match(/href="\/(?:en|es)\/conseils/g) ?? []).length > 0, true, `${route} localized navigation`);
    if (kind === "guide") assert.equal((html.match(/data-parity-section=/g) ?? []).length >= 3, true, `${route} complete sections`);
    else assert.equal((html.match(/class="wave2-guide-grid"[\s\S]*?<\/section>/g) ?? []).length, 1, `${route} guide library`);
  }
});

test("keeps horticultural vocabulary and technical values stable", () => {
  assert.equal(Object.keys(glossary).length >= 39, true);
  assert.deepEqual(glossary["pourriture racinaire"], { en: "root rot", es: "podredumbre radicular" });
  assert.deepEqual(glossary["racines aériennes"], { en: "aerial roots", es: "raíces aéreas" });
  assert.equal(translations.en["Choisir le bon substrat"], "How to choose the right growing medium");
  assert.equal(translations.es["Choisir le bon substrat"], "Cómo elegir el sustrato adecuado");
  assert.equal(translations.en["Araignées rouges : les repérer tôt"], "Spider mites: how to spot them early");
  assert.equal(translations.es["Araignées rouges : les repérer tôt"], "Ácaros: cómo detectarlos a tiempo");
  for (const locale of ["en", "es"]) for (const [source, target] of Object.entries(translations[locale])) {
    assert.ok(target.trim().length > 0, `${locale}: empty translation for ${source}`);
    for (const number of source.match(/\d+(?:[,.]\d+)?/g) ?? []) assert.match(target, new RegExp(number.replace(".", "[.,]")), `${locale}: numeric value ${number}`);
  }
});

test("adds Wave 2 only to the noindex beta sitemap", async () => {
  const beta = await render("/sitemap-beta-multilingue.xml");
  assert.equal(beta.status, 200);
  assert.equal(beta.headers.get("x-robots-tag"), "noindex");
  const xml = await beta.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 279);
  for (const { path } of inventory.paths) for (const locale of ["fr", "en", "es"]) {
    const route = locale === "fr" ? path : localized(path, locale);
    assert.match(xml, new RegExp(`<loc>${origin.replaceAll("/", "\\/")}${route.replaceAll("/", "\\/")}<\/loc>`), route);
  }
  const production = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(production, /<loc>https:\/\/jungle\.tibaldo\.fr\/(?:en|es)\//);
});

test("fails closed for non-published local and commercial translations", async () => {
  for (const route of ["/en/sos-plantes", "/es/rempotage", "/en/services", "/es/substrats-en-vrac-lille"]) assert.equal((await render(route)).status, 404, route);
});
