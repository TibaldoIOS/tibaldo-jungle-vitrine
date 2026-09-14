import test from "node:test";
import assert from "node:assert/strict";
import worker from "../dist/server/index.js";
import { getPlant } from "../lib/plants/catalog.ts";

const base = process.env.ALOCASIA_QA_ORIGIN;
const origin = "https://jungle.tibaldo.fr";
const render = path => base
  ? fetch(`${base}${path}`, { redirect: "manual" })
  : worker.fetch(new Request(`${origin}${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });

for (const slug of ["baginda", "silver-dragon", "reginula", "micholitziana", "frydek-variegata", "cuprea", "red-secret"]) {
  test(`Alocasia editorial rendered: ${slug}`, async () => {
    const p = getPlant("alocasia", slug);
    const path = `/plantes/alocasia/${slug}`;
    const response = await render(path);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.equal(html.match(/<link(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/)?.[1], `${origin}${path}`);
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    assert.ok(schemas.length);
    assert.match(html, /BreadcrumbList/);
    assert.doesNotMatch(html, /beta-jungle\.tibaldo\.fr/);
    assert.ok(html.includes(p.description[0]), "Current editorial paragraph must be rendered");
    if (slug === "reginula") assert.ok(html.includes(p.subtitle), "Updated species subtitle must be deployed");
    for (const c of p.comparisons.filter(c => c.href)) {
      assert.ok(html.includes(`href="${c.href}"`), `Missing comparison: ${c.href}`);
      assert.equal((await render(c.href)).status, 200);
      assert.ok(html.includes(c.difference), "Updated comparison copy must be rendered");
    }
    const identity = html.split('id="identite"')[1]?.split('<section')[0] ?? "";
    if (["baginda", "reginula", "micholitziana", "cuprea"].includes(slug)) assert.doesNotMatch(identity, /Silver Dragon|Dragon Scale|Black Velvet|Frydek|Red Secret/);
  });
}
