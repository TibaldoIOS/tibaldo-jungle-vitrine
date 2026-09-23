import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260923-musa-florida-variegata-01.json", import.meta.url), "utf8"));

test("Musa Florida Variegata uses the exact Owner media across its canonical surfaces", () => {
  const plant = getPlant("musa", "florida-variegata")!;
  assert.ok(plant);
  assert.equal(plant.gallery.length, 1);
  assert.equal(plant.gallery[0].src, manifest.public_path);
  assert.equal(plant.gallery[0].alt, manifest.alt);
  assert.equal(plant.gallery[0].caption, "Photo : TIBALDO");
  assert.equal(plant.gallery[0].license?.status, "verified");
  const bytes = readFileSync(new URL(`../public${manifest.public_path.replace(/^\/media/, "")}`, import.meta.url));
  assert.equal(bytes.length, manifest.bytes);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), manifest.sha256);
  assert.equal(getPlantsByGenre("musa").find((entry) => entry.slug === "florida-variegata")?.gallery[0].src, manifest.public_path);
});
