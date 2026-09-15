import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { bananiersGroupOwnerHero as hero } from "../lib/plants/bananiers-group-owner-hero.ts";
import { plants } from "../lib/plants/catalog.ts";

test("Bananiers exact authorized derivative has conservative composition ALT and Owner credit", () => {
  assert.equal(createHash("sha256").update(readFileSync(`public${hero.src}`)).digest("hex"), "19ad0f4b97daf5e83d1f931865d331e69de0f458b4ad6dd26a710ac0dcf2ea9b");
  assert.equal(hero.width, 1536); assert.equal(hero.height, 1024);
  assert.equal(hero.caption, "Photo : TIBALDO");
  assert.equal(hero.license.status, "verified");
  assert.match(hero.alt, /^Composition.*nervures parallèles.*bois/);
  assert.doesNotMatch(hero.alt, /Lille|Owner|Musa basjoo|Ensete ventricosum/);
  assert.ok(!plants.some(p => p.gallery.some(g => g.src === hero.src)), "Group composition must not become species documentary media");
});

test("Bananiers rendered Hero retains canonical, child links and private evidence boundary", async () => {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(new Request("https://jungle.tibaldo.fr/plantes/bananiers"), {}, {waitUntil() {}});
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(hero.src) && html.includes(hero.alt));
  assert.ok(html.includes("Photo : TIBALDO"));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/jungle.tibaldo.fr\/plantes\/bananiers"/);
  assert.doesNotMatch(html, /owner-provided:\/\/|docs\/media-provenance|originalSha256|beta-jungle/);
  for(const p of plants.filter(p=>p.genre==='musa'||p.genre==='ensete')) assert.ok(html.includes(`/plantes/${p.genre}/${p.slug}`));
  const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.ok(graphs.some(g => g["@graph"]?.some(v => v["@type"] === "CollectionPage")));
});
