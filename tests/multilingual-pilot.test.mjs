import assert from "node:assert/strict";
import test from "node:test";

const origin = "https://jungle.tibaldo.fr";
const paths = ["/", "/plantes", "/plantes/cycas/revoluta", "/plantes/anthurium/clarinervium", "/plantes/monstera/thai-constellation", "/plantes/bananiers", "/conseils/arroser-plantes-interieur"];

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
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
  assert.match(english, /Cycas revoluta: care, light and watering/i);
  assert.match(english, /Botanical identity/i);
  assert.match(english, /Is Cycas revoluta a palm\?/i);
  assert.match(english, /BreadcrumbList/);
  assert.match(english, /"inLanguage":"en-GB"/);
  assert.match(english, /alt="Cycas revoluta with a crown/i);

  const spanish = await (await render("/es/plantes/monstera/thai-constellation")).text();
  assert.match(spanish, /guía completa de cuidados/i);
  assert.match(spanish, /Un cultivar, una identidad/i);
  assert.match(spanish, /¿La variegación Thai Constellation es estable\?/i);
  assert.match(spanish, /"inLanguage":"es-ES"/);
  assert.match(spanish, /Hoja crema variegada/i);
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

test("exposes a beta-only multilingual sitemap with 21 published URLs", async () => {
  const response = await render("/sitemap-beta-multilingue.xml");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 21);
  assert.equal((xml.match(/hreflang="x-default"/g) ?? []).length, 21);
  for (const path of paths) for (const locale of ["fr", "en", "es"]) assert.match(xml, new RegExp(`<loc>${origin.replaceAll("/", "\\/")}${localized(path, locale).replaceAll("/", "\\/")}<\\/loc>`));
});

test("does not change the locale-neutral encyclopedia API identities", async () => {
  const response = await render("/api/v2/encyclopedie/plantes");
  assert.equal(response.status, 200);
  const entries = await response.json();
  for (const expected of ["plantes/cycas/revoluta", "plantes/anthurium/clarinervium", "plantes/monstera/thai-constellation"]) assert.equal(entries.filter((entry) => entry.encyclopediaSlug === expected).length, 1, expected);
});

