import test from "node:test";
import assert from "node:assert/strict";
import { plants, plantGenres } from "../lib/plants/catalog.ts";
import { p1AliasCanonicalMap } from "../lib/plants/encyclopedia-p1-expansion.ts";
import worker from "../dist/server/index.js";
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const render = path => worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`, { redirect: "manual" }), env, ctx);
const canonical = html => html.match(/<link(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/)?.[1];
const structured = html => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const genusHtml = new Map();
for (const genre of plantGenres) genusHtml.set(genre, await (await render(`/plantes/${genre}`)).text());
const sitemap = await (await render("/sitemap.xml")).text();
for (const p of plants) test(`canonical rendered ${p.genre}/${p.slug}`, async () => {
  const path = `/plantes/${p.genre}/${p.slug}`;
  const r = await render(path); const html = await r.text();
  assert.equal(r.status, 200);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal(canonical(html), `https://jungle.tibaldo.fr${path}`);
  assert.match(html, /BreadcrumbList/); assert.match(html, /Article/); assert.match(html, /FAQPage/);
  assert.ok(structured(html).length);
  assert.doesNotMatch(r.headers.get("x-robots-tag") ?? "", /noindex|nofollow/);
  assert.doesNotMatch(html.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? "", /noindex|nofollow/);
  assert.doesNotMatch(html, /beta-jungle\.tibaldo\.fr|beta-shop\.tibaldo\.fr/);
  assert.ok(html.includes(`href="/plantes/${p.genre}"`));
  assert.ok(genusHtml.get(p.genre).includes(`href="${path}"`), "Real genus HTML referrer");
  assert.ok(sitemap.includes(`<loc>https://jungle.tibaldo.fr${path}</loc>`));
});
test("aliases redirect, unknown species 404, no duplicate sitemap locations", async () => {
  for (const [path, target] of Object.entries(p1AliasCanonicalMap)) {
    const r = await render(path); assert.equal(r.status, 301, path);
    assert.equal(new URL(r.headers.get("location"), "https://jungle.tibaldo.fr").pathname.replace(/\/$/, ""), target);
  }
  assert.equal((await render("/plantes/monstera/species-not-real-audit")).status, 404);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, new Set(urls).size);
});

test("all encyclopedia HTML internal destinations and fragment targets resolve", async () => {
  const targets = new Set();
  for (const p of plants) {
    const path = `/plantes/${p.genre}/${p.slug}`;
    const html = await (await render(path)).text();
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const url = new URL(href.replaceAll("&amp;", "&"), `https://jungle.tibaldo.fr${path}`);
      if (url.origin === "https://jungle.tibaldo.fr") targets.add(url.pathname + url.hash);
    }
  }
  const pages = new Map();
  for (const target of targets) {
    const [path, fragment] = target.split("#");
    if (!pages.has(path)) {
      const r = await render(path);
      pages.set(path, { status: r.status, html: await r.text() });
    }
    const page = pages.get(path);
    assert.ok(page.status === 200 || page.status === 301 || page.status === 308, `${target}: ${page.status}`);
    if (fragment && page.status === 200) assert.ok(page.html.includes(`id="${decodeURIComponent(fragment)}"`), `Missing anchor ${target}`);
  }
});
