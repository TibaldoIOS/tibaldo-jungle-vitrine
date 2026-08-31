import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { documentaryMediaWaveV1Registry } from "../lib/plants/documentary-media-completion-wave-v1.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";

test("batch 1 publishes only seven exact, licensed and visually accepted photographs", () => {
  assert.equal(documentaryMediaWaveV1Registry.length, 7);

  for (const record of documentaryMediaWaveV1Registry) {
    const [, , genre, slug] = record.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, record.route);
    const gallery = documentaryGallery(plant);
    assert.equal(gallery.length, 1, record.route);
    const image = gallery[0];
    assert.equal(image.license?.status, "verified", record.route);
    assert.ok(image.license?.creator, record.route);
    assert.ok(image.license?.sourceUrl?.startsWith("https://commons.wikimedia.org/wiki/File:"), record.route);
    assert.ok(image.license?.licenseUrl?.startsWith("https://creativecommons.org/"), record.route);
    assert.equal(image.license?.registryPath, "/credits-images", record.route);
    assert.match(image.license?.note ?? "", /31 août 2026/, record.route);
    assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), image.src);
  }
});

test("known exclusions and batch-1 quality rejects remain honest gaps", () => {
  for (const [genre, slug] of [
    ["monstera", "esqueleto"],
    ["maranta", "lemon-lime"],
    ["alocasia", "gageana"],
    ["chlorophytum", "comosum"],
    ["plumeria", "rubra"],
    ["dicksonia", "antarctica"],
    ["equisetum", "japonicum"],
  ]) {
    const plant = getPlant(genre, slug);
    assert.ok(plant, `${genre}/${slug}`);
    assert.equal(documentaryGallery(plant).length, 0, `${genre}/${slug}`);
  }
});

test("Colocasia Eddo remains outside automatic verified promotion", () => {
  const plant = getPlant("colocasia", "esculenta-eddo");
  assert.ok(plant);
  assert.equal(documentaryMediaWaveV1Registry.some(({ route }) => route === "/plantes/colocasia/eddo"), false);
});
