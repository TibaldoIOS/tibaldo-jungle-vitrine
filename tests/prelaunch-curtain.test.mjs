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

test("PUBLIC pages are accessible and keep the non-blocking pre-opening signal", async () => {
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
    assert.match(html, /La Jungle est ouverte en ligne/);
    assert.match(html, /26 septembre/);
    assert.match(html, /id="contenu-principal"/);
    assert.match(html, /<a\b[^>]*href=/i, `${route}: crawlable href missing`);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i, route);
    assert.doesNotMatch(html, /class="jungle-prelaunch-curtain"/);
    assert.doesNotMatch(html, /id="contenu-principal"[^>]*(?:inert|aria-hidden)/);
  }
});

test("ordinary and crawler user agents receive the same accessible publication", async () => {
  const human = await (await fetchRoute("/plantes", "Mozilla/5.0 Safari/605.1.15")).text();
  const crawler = await (await fetchRoute("/plantes", "Googlebot/2.1")).text();
  for (const html of [human, crawler]) {
    assert.match(html, /La Jungle est ouverte en ligne/);
    assert.doesNotMatch(html, /class="jungle-prelaunch-curtain"/);
    assert.doesNotMatch(html, /id="contenu-principal"[^>]*(?:inert|aria-hidden)/);
  }
});

test("switch is explicit, PUBLIC-only and keeps the Safe Link Mask mounted", () => {
  const config = readFileSync(new URL("../lib/public-prelaunch.ts", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(config, /PUBLIC_PRELAUNCH_CURTAIN\s*=\s*false/);
  assert.match(config, /isPublicDeployment\s*&&\s*curtainEnabled/);
  assert.match(layout, /<SafeLinkMaskLayer/);
  assert.match(layout, /<JunglePrelaunchCurtain/);
  assert.match(layout, /isPublicPrelaunchCurtainActive/);
});

test("dormant curtain implementation remains crawler-neutral and removable", () => {
  const component = readFileSync(new URL("../app/JunglePrelaunchCurtain.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(component, /googlebot|bingbot|navigator\.userAgent|\bnoindex\b|\bnofollow\b/i);
  assert.match(component, /region\.inert\s*=\s*true/);
  assert.match(component, /event\.key\s*!==\s*"Tab"/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*jungle-prelaunch-curtain/);
});
