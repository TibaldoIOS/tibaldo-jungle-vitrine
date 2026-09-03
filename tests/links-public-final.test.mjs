import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const { default: worker } = await import("../dist/server/index.js");
async function render(path) {
  return worker.fetch(new Request("https://jungle.tibaldo.fr" + path), {
    ASSETS: { fetch: async () => new Response("", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}
test("permanent links destination responds 200 with all five exact destinations", async () => {
  const response = await render("/liens");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const href of ["https://jungle.tibaldo.fr", "https://www.instagram.com/tibaldojungle", "https://facebook.com/tibaldojungle", "tel:+33743727079", "mailto:jungle@tibaldo.fr"]) assert.ok(html.includes(`href="${href}"`), href);
  assert.match(html, /noindex,\s*follow/);
  assert.match(html, /href="https:\/\/jungle.tibaldo.fr\/liens"/);
  assert.match(html, /Cormontaigne/);
  assert.match(html, /src="\/favicon.svg"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});
test("utility page stays out of sitemap and preserves existing index", async () => {
  const xml = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(xml, /<loc>https:\/\/jungle.tibaldo.fr\/liens<\/loc>/);
  assert.match(xml, /<loc>https:\/\/jungle.tibaldo.fr\/plantes<\/loc>/);
});
test("page adds no JS client dependency, QR, generated media or extra service", () => {
  const page = readFileSync(new URL("../app/liens/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(page, /use client|useEffect|<script|iframe|qrcode/i);
  const css = readFileSync(new URL("../app/liens/page.module.css", import.meta.url), "utf8");
  assert.match(css, /focus-visible/);
  assert.match(css, /safe-area-inset-bottom/);
});
