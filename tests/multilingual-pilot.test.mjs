import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://jungle.tibaldo.fr";
const paths = ["/", "/plantes", "/plantes/cycas/revoluta", "/plantes/anthurium/clarinervium", "/plantes/monstera/thai-constellation", "/plantes/bananiers", "/conseils/arroser-plantes-interieur"];

async function render(pathname = "/", hostname = "localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`https://${hostname}${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

function localized(path, locale) { return locale === "fr" ? path : `/${locale}${path === "/" ? "" : path}`; }

test("publishes exactly seven reciprocal FR/EN/ES pilot families", async () => {
  for (const path of paths) {
    for (const locale of ["fr", "en", "es"]) {
      const route = localized(path, locale);
      const response = await render(route);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`, "i"), route);
      assert.match(html, new RegExp(`rel=["']canonical["'][^>]+href=["']${origin.replaceAll("/", "\\/")}${route === "/" ? "\\/?" : route.replaceAll("/", "\\/")}["']`, "i"), route);
      for (const alternate of ["fr", "en", "es", "x-default"]) assert.match(html, new RegExp(`hreflang=["']${alternate}["']`, "i"), `${route} ${alternate}`);
      assert.match(html, /application\/ld\+json/i, route);
    }
  }
});

test("localizes SEO, visible copy, FAQ, breadcrumbs and structured data", async () => {
  const english = await (await render("/en/plantes/cycas/revoluta")).text();
  assert.match(english, /Cycas revoluta: (?:care|maintenance)(?:,| and) (?:advice|watering|hardiness)/i);
  assert.match(english, /Botanical identity/i);
  assert.match(english, /How hardy is Cycas revoluta\?/i);
  assert.match(english, /BreadcrumbList/);
  assert.match(english, /"inLanguage":"en-GB"/);
  assert.match(english, /alt="[^"]*Cycas revoluta/i);

  const spanish = await (await render("/es/plantes/monstera/thai-constellation")).text();
  assert.match(spanish, /Monstera deliciosa[^<]*cuidados/i);
  assert.match(spanish, /Identidad botánica/i);
  assert.match(spanish, /¿Qué luz (?:necesita|para la) Monstera deliciosa/i);
  assert.match(spanish, /"inLanguage":"es-ES"/);
  assert.match(spanish, /alt="[^"]*Monstera deliciosa Thai Constellation/i);
});

test("keeps the exact page in the server-rendered language switcher", async () => {
  const html = await (await render("/en/plantes/cycas/revoluta")).text();
  for (const route of ["/plantes/cycas/revoluta", "/en/plantes/cycas/revoluta", "/es/plantes/cycas/revoluta"]) assert.match(html, new RegExp(`href=["']${route.replaceAll("/", "\\/")}["']`, "i"), route);
  assert.match(html, /aria-label="Français"/i);
  assert.match(html, /aria-label="English"/i);
  assert.match(html, /aria-label="Español"/i);
});

test("returns a real 404 for untranslated or unknown locale pages", async () => {
  for (const path of ["/en/services", "/es/contact", "/de/plantes", "/en/plantes/inconnu/inconnu"]) assert.equal((await render(path)).status, 404, path);
});

test("exposes a beta-only multilingual sitemap with all published URLs", async () => {
  const response = await render("/sitemap-beta-multilingue.xml");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 315);
  assert.equal((xml.match(/hreflang="x-default"/g) ?? []).length, 315);
  for (const path of paths) for (const locale of ["fr", "en", "es"]) assert.match(xml, new RegExp(`<loc>${origin.replaceAll("/", "\\/")}${localized(path, locale).replaceAll("/", "\\/")}<\\/loc>`));
});

test("does not change the locale-neutral encyclopedia API identities", async () => {
  const response = await render("/api/v2/encyclopedie/plantes");
  assert.equal(response.status, 200);
  const entries = await response.json();
  for (const expected of ["plantes/cycas/revoluta", "plantes/anthurium/clarinervium", "plantes/monstera/thai-constellation"]) assert.equal(entries.filter((entry) => entry.encyclopediaSlug === expected).length, 1, expected);
});

test("keeps every non-production preview out of search engines", async () => {
  const beta = await render("/en/plantes/cycas/revoluta", "pilot.example.test");
  assert.equal(beta.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  const production = await render("/en/plantes/cycas/revoluta", "jungle.tibaldo.fr");
  assert.equal(production.headers.get("x-robots-tag"), null);
});

test("tracks source and translation versions for every pilot page", async () => {
  const manifest = JSON.parse(await readFile(new URL("../lib/i18n/editorial-status.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(manifest.pages), paths);
  for (const [path, page] of Object.entries(manifest.pages)) {
    assert.match(page.sourceVersion, /^fr-/i, path);
    assert.match(page.sourceFingerprint, /^[a-f0-9]{64}$/, path);
    assert.ok(page.sourceFiles.length > 0, path);
    for (const locale of ["en", "es"]) {
      assert.equal(page.translations[locale].status, "published", `${path} ${locale}`);
      assert.equal(page.parity[locale], "validated", `${path} ${locale} parity`);
      assert.equal(page.translations[locale].translatedFromFingerprint, page.sourceFingerprint, `${path} ${locale}`);
    }
  }
});

test("enforces section and FAQ parity before a translation can be published", async () => {
  const parity = JSON.parse(await readFile(new URL("../lib/i18n/editorial-parity.json", import.meta.url), "utf8"));
  const status = JSON.parse(await readFile(new URL("../lib/i18n/editorial-status.json", import.meta.url), "utf8"));
  for (const [path, contract] of Object.entries(parity.pages)) {
    if (/^\/plantes\/[^/]+\/[^/]+$/.test(path)) continue;
    for (const locale of ["en", "es"]) {
      const route = localized(path, locale);
      const response = await render(route);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      const sectionIds = [...html.matchAll(/data-parity-section="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(sectionIds, contract.requiredSections, `${route} sections`);
      const pageDetails = Math.max(0, (html.match(/<details/g) ?? []).length - 1);
      assert.equal(pageDetails, contract.faqCount, `${route} FAQ`);
      assert.equal((html.match(/class="pilot-breadcrumbs/g) ?? []).length, 1, `${route} breadcrumbs`);
      const breadcrumbHtml = html.match(/<nav class="pilot-breadcrumbs[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
      assert.equal((breadcrumbHtml.match(/<li/g) ?? []).length, contract.breadcrumbCount, `${route} breadcrumb items`);
      assert.match(html, /<img[^>]+alt="[^"]+"/i, `${route} ALT`);
      assert.match(html, /rel="canonical"/i, `${route} canonical`);
      assert.match(html, /application\/ld\+json/i, `${route} JSON-LD`);
      assert.equal(status.pages[path].translations[locale].status, "published", `${route} status`);
      assert.equal(status.pages[path].parity[locale], "validated", `${route} parity status`);
      if (contract.faqCount === 0) assert.doesNotMatch(html, /"@type":"FAQPage"/, `${route} JSON-LD FAQ`);
      else assert.match(html, /"@type":"FAQPage"/, `${route} JSON-LD FAQ`);
    }
  }
});

test("keeps the complete Cycas editorial units and Lille context in EN and ES", async () => {
  const expectations = {
    en: [/seeds/i, /drainage holes/i, /Repotting/i, /Propagation/i, /Lille/i],
    es: [/semillas/i, /(?:agujeros|perforad[ao])/i, /Trasplante/i, /Multiplicación/i, /Lille/i],
  };
  for (const locale of ["en", "es"]) {
    const html = await (await render(`/${locale}/plantes/cycas/revoluta`)).text();
    for (const expected of expectations[locale]) assert.match(html, expected, `${locale} ${expected}`);
  }
});

test("preserves every botanical identity in the translated plant collection", async () => {
  for (const locale of ["en", "es"]) {
    const html = await (await render(`/${locale}/plantes`)).text();
    for (const identity of ["Cycas revoluta", "Anthurium clarinervium", "Monstera deliciosa ‘Thai Constellation’", "Musa basjoo", "Ensete ventricosum &#x27;Maurelii&#x27;"]) {
      assert.match(html, new RegExp(identity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${locale} ${identity}`);
    }
  }
});
