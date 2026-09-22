import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260923-nephrolepis-owner-media-v1.json", import.meta.url), "utf8"));

for (const photo of manifest.photos) {
  const [, genre, slug] = photo.canonical_slug.split("/");
  test(`${slug}: exact Owner media is canonical across plant and fern hubs`, () => {
    const plant = getPlant(genre, slug)!;
    assert.ok(plant);
    assert.equal(plant.gallery.length, 1);
    assert.equal(plant.gallery[0].src, photo.public_path);
    assert.equal(plant.gallery[0].alt, photo.alt);
    assert.equal(plant.gallery[0].caption, "Photo : TIBALDO");
    assert.equal(plant.gallery[0].license?.status, "verified");
    const bytes = readFileSync(new URL(`../public${photo.public_path.replace(/^\/media/, "")}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), photo.sha256);
    assert.equal(getPlantsByGenre("nephrolepis").find((entry) => entry.slug === slug)?.gallery[0].src, photo.public_path);
    assert.equal(getPlantsByGenre("fougeres").find((entry) => entry.genre === genre && entry.slug === slug)?.gallery[0].src, photo.public_path);
  });
}
