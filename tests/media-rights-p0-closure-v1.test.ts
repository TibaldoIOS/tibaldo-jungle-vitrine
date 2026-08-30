import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { getPlant, plantFamilies } from "../lib/plants/catalog.ts";
import { mediaRightsP0ClosureRegistry } from "../lib/plants/media-rights-p0-closure-v1.ts";

const removedAssets = [
  "/anthurium-pallidiflorum-cascade.webp",
  "/asparagus-setaceus-plumosus.jpg",
  "/epipremnum-marble-queen.webp",
  "/disocactus-anguliger-cactus-zigzag.webp",
  "/monstera-thai-constellation-planche-botanique.webp",
  "/monstera-mint-planche-botanique.webp",
  "/monstera-adansonii-monkey-mask.webp",
  "/anthurium-delta-force-triangulaire.webp",
];

test("closes the exact 11-route P0 media-rights set", () => {
  assert.equal(mediaRightsP0ClosureRegistry.length, 11);
  assert.equal(mediaRightsP0ClosureRegistry.filter(({ decision }) => decision === "RIGHTS_PROVEN_KEEP").length, 3);
  assert.equal(mediaRightsP0ClosureRegistry.filter(({ decision }) => decision === "REMOVE_AND_USE_HONEST_MEDIA_GAP").length, 8);

  for (const item of mediaRightsP0ClosureRegistry) {
    const [, , genre, slug] = item.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, item.route);
    if (item.decision === "REMOVE_AND_USE_HONEST_MEDIA_GAP") {
      assert.equal(plant.gallery.length, 1, item.route);
      assert.equal(plant.gallery[0].src, "/photo-reelle-a-venir.svg", item.route);
      assert.equal(plant.gallery[0].license?.status, "media-gap", item.route);
      continue;
    }

    assert.ok(plant.gallery.length >= 1, item.route);
    for (const image of plant.gallery) {
      assert.equal(image.license?.status, "verified", `${item.route}: status`);
      assert.ok(image.license?.creator, `${item.route}: creator`);
      assert.ok(image.license?.sourceUrl?.startsWith("https://commons.wikimedia.org/wiki/File:"), `${item.route}: source`);
      assert.ok(image.license?.licenseUrl?.startsWith("https://"), `${item.route}: license`);
      assert.equal(image.license?.registryPath, "/credits-images", `${item.route}: registry`);
      assert.match(image.license?.note ?? "", /30 août 2026/, `${item.route}: proof date`);
    }
  }
});

test("does not expose removed rights-unknown assets through canonical plant or group data", () => {
  const familyGuideSource = readFileSync(new URL("../lib/plants/family-guides.ts", import.meta.url), "utf8");
  const renderedData = JSON.stringify({
    affectedPlants: mediaRightsP0ClosureRegistry.map(({ route }) => {
      const [, , genre, slug] = route.split("/");
      return getPlant(genre, slug);
    }),
    plantFamilies,
    familyGuideSource,
  });
  for (const asset of removedAssets) assert.doesNotMatch(renderedData, new RegExp(asset.replaceAll("/", "\\/")), asset);
});

test("preserves representative verified V35 media outside the P0 set", () => {
  for (const [genre, slug] of [
    ["monstera", "deliciosa"],
    ["alocasia", "tandurusa"],
    ["anthurium", "wendlingeri"],
    ["sansevieria", "trifasciata"],
  ]) {
    const plant = getPlant(genre, slug);
    assert.ok(plant, `${genre}/${slug}`);
    assert.ok(plant.gallery.some((image) => image.license?.status === "verified"), `${genre}/${slug}`);
  }
});
