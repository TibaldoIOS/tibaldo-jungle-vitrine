import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { plants, plantFamilies } from "../lib/plants/catalog.ts";

async function html(path) {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(new Request("https://jungle.tibaldo.fr" + path),
    { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

test("index preserves all canonical server-rendered links and replaces status/counters", async () => {
  const page = await html("/plantes");
  const nav = page.match(/<nav class="plants-compact-index"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav);
  for (const family of plantFamilies) assert.ok(nav.includes(`href="/plantes/${family.slug}"`), family.slug);
  assert.equal((nav.match(/<a /g) ?? []).length, plantFamilies.length);
  assert.match(nav, /tabindex="0"/i);
  assert.doesNotMatch(nav, /fiche|guide disponible|0 variété/i);
  assert.match(page, /plants-index-scroll-hint/);
  assert.doesNotMatch(page, /01 · Guide disponible/i);
});

test("featured counts derive from current canonical plants, including singular", async () => {
  const page = await html("/plantes");
  for (const genre of ["monstera", "anthurium", "philodendron", "alocasia"]) {
    const count = plants.filter(p => p.genre === genre).length;
    assert.ok(page.includes(`${count} variétés`), genre);
  }
  assert.match(page, /1 variété/);
});

test("shared hubs retain content without technical Hero eyebrow", async () => {
  for (const genre of ["monstera", "anthurium", "musa", "philodendron", "alocasia"]) {
    const page = await html("/plantes/" + genre);
    assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(page, /Univers botanique<\/p>|GUIDE DISPONIBLE|\d+ fiches sont documentées/);
    assert.match(page, /golden-group-species-/);
  }
});

test("directory is native scroll, responsive, focusable and never reveal-hidden", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("../app/plantes/CompactBotanicalIndex.tsx", import.meta.url), "utf8");
  assert.match(css, /max-height: 420px/);
  assert.match(css, /overflow-y: auto/);
  assert.match(css, /scrollbar-color:/);
  assert.match(css, /plants-compact-index:focus-visible/);
  for (const columns of ["repeat(3, minmax(0, 1fr))", "repeat(2, minmax(0, 1fr))", "1fr"]) assert.ok(css.includes("grid-template-columns: " + columns));
  assert.doesNotMatch(source, /data-reveal|useEffect|onScroll/);
});
