import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import { plantFamilies, plants } from "../lib/plants/catalog.ts";
import { willaertIdentityPlants } from "../lib/plants/willaert-identities-v1.ts";
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

test("release preserves established identities and adds only documented runtime entities", () => {
  const historical = JSON.parse(readFileSync(new URL("../docs/ENCYCLOPEDIA_CANONICAL_REGISTRY_V1.json", import.meta.url), "utf8"));
  const expected = new Set([...historical.entities.map(p => p.ENCYCLOPEDIA_ENTITY_ID), ...willaertIdentityPlants.map(p => `${p.genre}/${p.slug}`), "epipremnum/pinnatum", "ficus/abidjan", "monstera/devil-monster", "alocasia/platinum", "sansevieria/hahnii"]);
  const current = plants.map(p => `${p.genre}/${p.slug}`);
  assert.equal(new Set(current).size, current.length);
  assert.deepEqual(new Set(current), expected);
  assert.equal(plants.filter(p => p.genre === "monstera" && p.slug === "deliciosa-variegata").length, 1);
  assert.equal(plants.filter(p => p.genre === "monstera" && p.slug === "devil-monster").length, 1);
  for (const slug of ["frydek-variegata", "silver-dragon", "red-secret"]) {
    assert.equal(plants.filter(p => p.genre === "alocasia" && p.slug === slug).length, 1);
  }
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
    // Sitemap membership follows canonical entities, not a frozen release count.
    const plantUrls = plants.map(p => `https://jungle.tibaldo.fr/plantes/${p.genre}/${p.slug}`);
    for (const url of plantUrls) assert.ok(urls.includes(url), url);
    const speciesUrls = urls.filter(url => /^https:\/\/jungle\.tibaldo\.fr\/plantes\/(?!famille\/)[^/]+\/[^/]+$/.test(url));
    assert.deepEqual(new Set(speciesUrls), new Set(plantUrls));
    assert.ok(urls.includes("https://jungle.tibaldo.fr/plantes/monstera/deliciosa-variegata"));
    for (const slug of ["frydek-variegata", "silver-dragon", "red-secret"]) {
      assert.ok(urls.includes(`https://jungle.tibaldo.fr/plantes/alocasia/${slug}`));
    }
    assert.equal(new Set(urls).size, urls.length);
    assert.ok(urls.every((url) => url.startsWith("https://jungle.tibaldo.fr/")));
    assert.ok(urls.every((url) => !url.includes("/lab/")));
    assert.equal(urls.filter((url) => /^https:\/\/jungle\.tibaldo\.fr\/plantes\/[^/]+$/.test(url)).length, plantFamilies.length);
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

test("controlled Owner WebP routes override the storage MIME safely", async () => {
  const controlledPaths = [
    "/media/owner-media/strelitzia-alba/strelitzia-alba-inflorescence-blanche-spathe-sombre.webp",
    "/media/owner-media/anthurium-silver-blush/anthurium-silver-blush-feuillage-argente.webp",
  ];
  const assetRequests = [];
  const mediaEnv = {
    ...env,
    ASSETS: {
      fetch: async (request) => {
        assetRequests.push(new URL(request.url).pathname);
        return new Response("RIFF....WEBP", { headers: { "Content-Type": "application/octet-stream" } });
      },
    },
  };
  for (const path of controlledPaths) {
    const request = new Request(`https://jungle.tibaldo.fr${path}`);
    const response = await worker.fetch(request, mediaEnv, ctx);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("content-type"), "image/webp", path);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff", path);
  }
  assert.deepEqual(assetRequests, controlledPaths.map((path) => path.replace(/^\/media/, "")));
});
