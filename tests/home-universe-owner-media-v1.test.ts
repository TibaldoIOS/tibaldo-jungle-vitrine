import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { homeUniverseMedia } from "../lib/home-universe-media.ts";

test("uses both verified Owner photographs and preserves the Studio", () => {
  assert.equal(homeUniverseMedia.plants.provenance, "TIBALDO_OWNER_MEDIA");
  assert.equal(homeUniverseMedia.plants.ownerMediaRequired, false);
  assert.equal(homeUniverseMedia.plants.src, "/owner-media/home-universes/home-universe-plants-owner-v1.avif");
  assert.equal(homeUniverseMedia.substrates.provenance, "TIBALDO_OWNER_MEDIA");
  assert.equal(homeUniverseMedia.substrates.ownerMediaRequired, false);
  assert.equal(homeUniverseMedia.substrates.src, "/owner-media/home-universes/home-universe-substrates-owner-v1.avif");
  assert.equal(homeUniverseMedia.studio.src, "/media/projet-boutique-tibaldo-jungle-lille.webp");
});

test("keeps the Plants and Substrates Owner assets distinct", () => {
  assert.notEqual(homeUniverseMedia.plants.src, homeUniverseMedia.substrates.src);
  assert.equal(homeUniverseMedia.plants.width, 1200);
  assert.equal(homeUniverseMedia.plants.height, 2133);
  assert.equal(homeUniverseMedia.substrates.width, 1200);
  assert.equal(homeUniverseMedia.substrates.height, 2467);
});

test("records the authoritative Owner rights and content-distinction evidence", () => {
  const report = JSON.parse(readFileSync("reports/home-universe-owner-media-provenance-v1.json", "utf8"));
  const plants = report.assets.find((asset: { slot: string }) => asset.slot === "HOME_UNIVERSE_PLANTS");
  const substrate = report.assets.find((asset: { slot: string }) => asset.slot === "HOME_UNIVERSE_SUBSTRATES");
  assert.equal(plants.status, "TIBALDO_OWNER_MEDIA");
  assert.equal(substrate.status, "TIBALDO_OWNER_MEDIA");
  assert.equal(plants.third_party_license, "NONE_REQUIRED");
  assert.equal(substrate.third_party_license, "NONE_REQUIRED");
  assert.equal(report.plants_substrates_distinct_evidence.status, "PASS");
});
