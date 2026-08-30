import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("safe-link-mask", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path) => worker.fetch(new Request(`http://localhost${path}`), env, ctx);

test("PUBLIC keeps every Shop destination as a real crawlable href", async () => {
  for (const path of ["/", "/plantes", "/rempotage", "/livraison-plantes-lille"]) {
    const response = await fetchRoute(path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    const shopAnchors = [
      ...html.matchAll(/<a\b(?=[^>]*\bhref=["']https:\/\/shop\.tibaldo\.fr\/?["'])[^>]*>/gi),
    ];
    assert.ok(shopAnchors.length > 0, `${path}: real Shop href missing`);
    for (const [anchor] of shopAnchors) {
      assert.doesNotMatch(anchor, /\brel=["'][^"']*nofollow/i, path);
    }
  }
});

test("mask logic is UX-only and has no crawler-specific branch", () => {
  const source = readFileSync(new URL("../app/SafeLinkMaskLayer.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /googlebot|useragent|navigator\.userAgent|\bnoindex\b|\bnofollow\b/i);
  assert.match(source, /preventDefault\(\)/);
  assert.match(source, /new URL\(anchor\.href/);
});

test("mask is mounted only in the explicit PUBLIC build mode", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /isPublicJungleDeployment[\s\S]*<SafeLinkMaskLayer/);
});
