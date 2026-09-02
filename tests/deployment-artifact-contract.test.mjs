import assert from "node:assert/strict";
import test from "node:test";

import { plants } from "../lib/plants/catalog.ts";
import { publicPermanentRedirects } from "../lib/seo/public-redirects.ts";

const requestedMode = process.env.JUNGLE_ENV === "public" ? "public" : "beta";
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("artifact-contract", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path) => worker.fetch(new Request(`http://localhost${path}`, { redirect: "manual" }), env, ctx);
const metaRobots = (html) =>
  html.match(/<meta(?=[^>]*name=["']robots["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>/i)?.[1] ?? "";

const labs = [
  "/lab/v19/anthurium/veitchii",
  "/lab/v19/monstera/deliciosa",
  "/lab/v19/pilea/peperomioides",
  "/lab/v23/anthurium/veitchii",
  "/lab/v23/golden-hub/pilea",
  "/lab/v23/golden-species/pilea-peperomioides",
  "/lab/v25-1/golden-hub/pilea",
  "/lab/v25-1/golden-species/anthurium-veitchii",
  "/lab/v25-2/golden-hub/pilea",
  "/lab/v25-3/golden-hub/pilea",
  "/lab/v25-4/golden-hub/pilea",
];

test("release species inventory remains frozen", () => {
  assert.equal(plants.length, 76);
});

test(`${requestedMode} artifact has the exact indexing and customer-mode contract`, async () => {
  for (const path of ["/", "/plantes", "/rempotage"]) {
    const response = await fetchRoute(path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    if (requestedMode === "public") {
      assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex|nofollow/i, path);
      assert.doesNotMatch(metaRobots(html), /noindex|nofollow/i, path);
      assert.doesNotMatch(html, /MODE BÊTA|MODE TEST|beta-shop\.tibaldo\.fr/i, path);
      assert.match(html, /https:\/\/shop\.tibaldo\.fr/i, path);
    } else {
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", path);
      assert.match(metaRobots(html), /noindex/i, path);
      assert.match(metaRobots(html), /nofollow/i, path);
      assert.match(html, /MODE BÊTA \/ TEST/i, path);
      assert.match(html, /https:\/\/beta-shop\.tibaldo\.fr/i, path);
    }
  }
});

test(`${requestedMode} artifact has the exact robots and sitemap contract`, async () => {
  const robots = await fetchRoute("/robots.txt");
  const robotsText = await robots.text();
  const sitemap = await fetchRoute("/sitemap.xml");
  assert.equal(robots.status, 200);

  if (requestedMode === "public") {
    assert.match(robotsText, /^Allow: \/$/im);
    assert.doesNotMatch(robotsText, /^Disallow: \/$/im);
    assert.match(robotsText, /^Sitemap: https:\/\/jungle\.tibaldo\.fr\/sitemap\.xml$/im);
    assert.doesNotMatch(robots.headers.get("x-robots-tag") ?? "", /noindex|nofollow/i);
    assert.equal(sitemap.status, 200);
    const xml = await sitemap.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.equal(urls.length, 157);
    assert.equal(new Set(urls).size, urls.length);
    assert.ok(urls.every((url) => url.startsWith("https://jungle.tibaldo.fr/")));
    assert.ok(urls.every((url) => !url.includes("/lab/")));
    assert.equal(urls.filter((url) => /^https:\/\/jungle\.tibaldo\.fr\/plantes\/[^/]+$/.test(url)).length, 31);
  } else {
    assert.match(robotsText, /^Disallow: \/$/im);
    assert.doesNotMatch(robotsText, /^Sitemap:/im);
    assert.equal(robots.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(sitemap.status, 404);
    assert.equal(sitemap.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});

test("PUBLIC artifact closes every Lab route", { skip: requestedMode !== "public" }, async () => {
  for (const path of labs) assert.equal((await fetchRoute(path)).status, 404, path);
});

test("PUBLIC artifact preserves direct permanent redirects", { skip: requestedMode !== "public" }, async () => {
  for (const [source, destination] of Object.entries(publicPermanentRedirects)) {
    const response = await fetchRoute(source);
    assert.equal(response.status, 301, source);
    assert.equal(new URL(response.headers.get("location"), "https://jungle.tibaldo.fr").pathname.replace(/\/$/, ""), destination, source);
  }
});
