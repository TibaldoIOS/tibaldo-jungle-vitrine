import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { getPlant, plants } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { documentaryMediaWave2V1Registry } from "../lib/plants/documentary-media-completion-wave-2-v1.ts";

test("Wave 2 batch 1 publishes only exact, licensed and visually accepted photographs", () => {
  assert.equal(documentaryMediaWave2V1Registry.length, 5);

  for (const record of documentaryMediaWave2V1Registry) {
    const [, , genre, slug] = record.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, record.route);
    const gallery = documentaryGallery(plant);
    assert.equal(gallery.length, 1, record.route);
    const media = gallery[0];
    assert.equal(media.license?.status, "verified", record.route);
    assert.ok(media.license?.creator, record.route);
    assert.ok(media.license?.sourceUrl?.startsWith("https://commons.wikimedia.org/wiki/File:"), record.route);
    assert.ok(media.license?.licenseUrl?.startsWith("https://creativecommons.org/"), record.route);
    assert.equal(media.license?.registryPath, "/credits-images", record.route);
    assert.match(media.license?.note ?? "", /31 août 2026/, record.route);
    assert.ok(existsSync(new URL(`../public${media.src}`, import.meta.url)), media.src);
  }
});

test("Wave 2 batch 1 reduces honest gaps without weakening sensitive exclusions", () => {
  const gaps = plants.filter((plant) => documentaryGallery(plant).length === 0);
  assert.equal(gaps.length, 25);

  for (const [genre, slug] of [
    ["monstera", "thai-constellation"],
    ["monstera", "mint"],
    ["monstera", "burle-marx-flame"],
    ["monstera", "esqueleto"],
    ["philodendron", "royal-queen"],
    ["alocasia", "imperial-red"],
  ]) {
    const plant = getPlant(genre, slug);
    assert.ok(plant, `${genre}/${slug}`);
    assert.equal(documentaryGallery(plant).length, 0, `${genre}/${slug}`);
  }
});
