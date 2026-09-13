import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const render = path => worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`), env, ctx);
const routes = ["alocasia/frydek-variegata", "alocasia/silver-dragon", "alocasia/red-secret", "monstera/dubia", "monstera/obliqua"];

for (const route of routes) test(`rendered PUBLIC contract: ${route}`, async () => {
  const r = await render(`/plantes/${route}`);
  const html = await r.text();
  assert.equal(r.status, 200);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(html.includes(`rel="canonical" href="https://jungle.tibaldo.fr/plantes/${route}"`));
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /Article/);
  assert.match(html, /FAQPage/);
  assert.doesNotMatch(r.headers.get("x-robots-tag") ?? "", /noindex|nofollow/i);
  assert.doesNotMatch(html.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? "", /noindex|nofollow/i);
  assert.doesNotMatch(html, /beta-jungle\.tibaldo\.fr|beta-shop\.tibaldo\.fr/);
  assert.ok(html.includes(`href="/plantes/${route.split('/')[0]}"`));
  for (const json of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    assert.doesNotThrow(() => JSON.parse(json[1]));
  }
});

test("new forms have real HTML referrers from genus and species, no copied media", async () => {
  const genus = await (await render("/plantes/alocasia")).text();
  for (const [parent, child] of [["micholitziana", "frydek-variegata"], ["baginda", "silver-dragon"], ["cuprea", "red-secret"]]) {
    assert.ok(genus.includes(`href="/plantes/alocasia/${child}"`));
    const html = await (await render(`/plantes/alocasia/${parent}`)).text();
    assert.ok(html.includes(`href="/plantes/alocasia/${child}"`));
    const form = await (await render(`/plantes/alocasia/${child}`)).text();
    assert.doesNotMatch(form, /alocasia-cuprea-feuillage-reflets-cuivres\.webp/);
  }
});
