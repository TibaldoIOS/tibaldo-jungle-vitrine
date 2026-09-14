import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { alocasiaGenusOwnerHero as hero } from "../lib/plants/alocasia-genus-owner-hero.ts";

test("Alocasia Hero retains exact approved derivative and descriptive metadata", () => {
  assert.equal(createHash("sha256").update(readFileSync(`public${hero.src}`)).digest("hex"), "d6e69e259d968cd526ec25af5f5157eb7c3c50267d07d32be5a25d64f912a038");
  assert.equal(hero.width, 1536); assert.equal(hero.height, 1024);
  assert.equal(hero.license?.status, "verified");
  assert.equal(hero.caption, "Photo : TIBALDO");
  assert.match(hero.alt, /illustrées/);
  assert.doesNotMatch(hero.alt, /Owner|Lille|verified/);
});
test("Alocasia public HTML and existing Article use the same Hero without private evidence", async () => {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(new Request("https://jungle.tibaldo.fr/plantes/alocasia"), {}, {waitUntil() {}});
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(hero.src));
  assert.ok(html.includes(hero.alt));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /owner-provided:\/\/|docs\/media-provenance|originalSha256/);
  const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.ok(graphs.some(g => g["@graph"]?.some((v: {"@type": string; image?: string}) => v["@type"] === "Article" && v.image === hero.src)));
});
