import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260923-silver-dragon-01.json", import.meta.url), "utf8"));

test("Silver Dragon uses the exact Owner media contract", () => {
  const plant = getPlant("alocasia", "silver-dragon");
  assert.ok(plant);
  assert.equal(plant.botanicalName, "Alocasia ‘Silver Dragon’");
  assert.equal(plant.gallery[0]?.src, manifest.derivative.public_path);
  assert.equal(plant.gallery[0]?.alt, manifest.alt);
  assert.equal(plant.gallery[0]?.caption, "Photo : TIBALDO");
  assert.equal(plant.gallery[0]?.license?.creator, "TIBALDO");
  assert.equal(plant.gallery[0]?.width, 1254);
  assert.equal(plant.gallery[0]?.height, 1254);
});

test("Owner provenance keeps the two commercial formats explicit without mutating them", () => {
  assert.deepEqual(manifest.commercial_variants.map((variant: { size: string }) => variant.size), ["XS", "M"]);
  assert.equal(manifest.commercial_mutation, "NONE_IN_JUNGLE");
});
