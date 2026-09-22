import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { getPlant, plants } from "../lib/plants/catalog.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260923-epipremnum-owner-01.json", import.meta.url), "utf8"));

test("publishes the two exact Owner Epipremnum photos without identity mixing", () => {
  assert.equal(manifest.photos.length, 2);
  const expected = new Map([
    ["epipremnum/aureum", "Epipremnum aureum"],
    ["epipremnum/marble-queen", "Epipremnum aureum ‘Marble Queen’"],
  ]);

  for (const photo of manifest.photos) {
    const entityId = photo.canonical_slug.replace(/^plantes\//, "");
    const [genre, slug] = entityId.split("/");
    const plant = getPlant(genre, slug)!;
    assert.ok(plant, entityId);
    assert.equal(plant.botanicalName, expected.get(entityId));
    assert.equal(plants.filter((entry) => `${entry.genre}/${entry.slug}` === entityId).length, 1);
    assert.equal(plant.gallery[0].src, photo.public_path);
    assert.equal(plant.gallery[0].alt, photo.alt);
    assert.equal(plant.gallery[0].caption.includes("Photo : TIBALDO"), true);
    assert.equal(plant.gallery[0].license?.sourceUrl, "owner-provided://tibaldo/photo-20260923-epipremnum-owner-01");
    const bytes = readFileSync(`public${photo.public_path}`);
    assert.equal(bytes.length, photo.bytes);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), photo.sha256);
    assert.equal(plant.gallery[0].width, photo.width);
    assert.equal(plant.gallery[0].height, photo.height);
  }

  assert.notEqual(
    getPlant("epipremnum", "aureum")!.gallery[0].src,
    getPlant("epipremnum", "marble-queen")!.gallery[0].src,
  );
});

test("keeps the earlier Marble Queen Owner views as secondary rollback media", () => {
  const gallery = getPlant("epipremnum", "marble-queen")!.gallery;
  assert.equal(gallery.length, 4);
  assert.ok(gallery.slice(1).every((media) => media.src.startsWith("/owner-media/marble-queen/")));
  assert.equal(new Set(gallery.map((media) => media.src)).size, gallery.length);
});
