import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants, plantGenres } from "../lib/plants/catalog.ts";
import worker from "../dist/server/index.js";

const forbidden = /Owner TIBALDO|Photographie réelle contrôlée|VERIFIED_MEDIA|HONEST_MEDIA_GAP|SUPPLIER_PARTNER|LICENSED_PUBLIC_RIGHTS|media_provenance|owner-provided:\/\/|Preuve contrôlée/i;
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const render = path => worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`), env, { waitUntil() {}, passThroughOnException() {} });

test("all plant HTML, JSON-LD and browser-serialized props exclude internal evidence", async () => {
  const routes = ["/plantes", "/credits-images", ...plantGenres.map(g => `/plantes/${g}`), ...plants.map(p => `/plantes/${p.genre}/${p.slug}`)];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.doesNotMatch(html, forbidden, route);
    for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json), `${route}: parseable JSON-LD`);
    }
  }
});

test("actual API responses preserve machine statuses but never leak internal evidence", async () => {
  for (const route of ["/api/encyclopedie/plantes", "/api/v2/encyclopedie/plantes"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const entries = await response.json();
    assert.equal(entries.length, plants.length);
    for (const entry of entries) {
      if (route.includes("/v2/")) assert.ok(["VERIFIED_MEDIA", "HONEST_MEDIA_GAP"].includes(entry.media_status));
      const { media_status: status, ...publicFields } = entry;
      assert.ok(status === undefined || typeof status === "string");
      assert.doesNotMatch(JSON.stringify(publicFields), forbidden, `${route}: ${entry.slug}`);
      assert.doesNotMatch(JSON.stringify(publicFields), /"(?:note|registryPath|conversationId|rightsEvidence|sha256)":/, "no internal audit fields");
    }
  }
});

test("served client JavaScript cannot contain catalogue rights records", () => {
  const files = readdirSync("dist/client", { recursive: true }).filter(file => /\.js$/.test(file));
  assert.ok(files.length > 0);
  for (const file of files) assert.doesNotMatch(readFileSync(`dist/client/${file}`, "utf8"), /owner-provided:\/\/|Owner TIBALDO|Preuve contrôlée/, file);
});
