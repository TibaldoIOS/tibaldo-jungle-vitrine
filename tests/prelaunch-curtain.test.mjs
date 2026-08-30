import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("prelaunch-curtain", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path, userAgent = "Mozilla/5.0") =>
  worker.fetch(new Request(`http://localhost${path}`, { headers: { "user-agent": userAgent } }), env, ctx);

test("PUBLIC curtain is central and preserves underlying SSR content and hrefs", async () => {
  const routes = [
    "/",
    "/plantes",
    "/plantes/monstera/deliciosa",
    "/boutique-plantes-lille",
    "/rempotage",
  ];
  for (const route of routes) {
    const response = await fetchRoute(route);
    const html = await response.text();
    assert.equal(response.status, 200, route);
    assert.match(html, /Quelque chose/);
    assert.match(html, /se prépare\./);
    assert.match(html, /TIBALDO JUNGLE/);
    assert.match(html, /id="contenu-principal"/);
    assert.match(html, /<a\b[^>]*href=/i, `${route}: crawlable href missing`);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i, route);
  }
});

test("curtain markup is identical for ordinary and crawler user agents", async () => {
  const human = await (await fetchRoute("/plantes", "Mozilla/5.0 Safari/605.1.15")).text();
  const crawler = await (await fetchRoute("/plantes", "Googlebot/2.1")).text();
  for (const html of [human, crawler]) {
    assert.match(html, /jungle-prelaunch-curtain/);
    assert.match(html, /aria-modal="true"/);
    assert.match(html, /inert=""/);
    assert.match(html, /aria-hidden="true"/);
  }
});

test("switch is explicit, PUBLIC-only and keeps the Safe Link Mask mounted", () => {
  const config = readFileSync(new URL("../lib/public-prelaunch.ts", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(config, /PUBLIC_PRELAUNCH_CURTAIN\s*=\s*true/);
  assert.match(config, /isPublicDeployment\s*&&\s*curtainEnabled/);
  assert.match(layout, /<SafeLinkMaskLayer/);
  assert.match(layout, /<JunglePrelaunchCurtain/);
  assert.match(layout, /isPublicPrelaunchCurtainActive/);
});

test("curtain implementation has no crawler branch and supports reduced motion", () => {
  const component = readFileSync(new URL("../app/JunglePrelaunchCurtain.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(component, /googlebot|bingbot|navigator\.userAgent|\bnoindex\b|\bnofollow\b/i);
  assert.match(component, /region\.inert\s*=\s*true/);
  assert.match(component, /event\.key\s*!==\s*"Tab"/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*jungle-prelaunch-curtain/);
});
