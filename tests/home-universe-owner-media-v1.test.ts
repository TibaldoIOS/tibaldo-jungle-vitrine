import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { homeUniverseMedia } from "../lib/home-universe-media.ts";

test("uses the verified Owner substrate photograph and preserves the Studio", () => {
  assert.equal(homeUniverseMedia.substrates.provenance, "OWNER_PROVIDED_MEDIA");
  assert.equal(homeUniverseMedia.substrates.ownerMediaRequired, false);
  assert.equal(homeUniverseMedia.substrates.src, "/owner-media/home-universes/home-universe-substrates-owner-v1.avif");
  assert.equal(homeUniverseMedia.studio.src, "/media/projet-boutique-tibaldo-jungle-lille.webp");
});

test("fails safe when the supplied Plants file duplicates the substrate photograph", () => {
  assert.equal(homeUniverseMedia.plants.ownerMediaRequired, true);
  assert.equal(homeUniverseMedia.plants.src, "/collection-plantes-rares-tibaldo-jungle-lille.jpg");
});

test("records Owner-media provenance without an external licence dependency", () => {
  const report = JSON.parse(readFileSync("reports/home-universe-owner-media-provenance-v1.json", "utf8"));
  const substrate = report.assets.find((asset: { slot: string }) => asset.slot === "HOME_UNIVERSE_SUBSTRATES");
  assert.equal(substrate.rights_basis, "OWNER_PROVIDED_MEDIA");
  assert.equal(substrate.external_license_required, false);
});
