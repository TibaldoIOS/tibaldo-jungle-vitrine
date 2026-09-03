import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { exactVerifiedPrimaryMedia, mediaRegistryVersionFor, toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const registryVersion = mediaRegistryVersionFor(plants);
const entry = (genre: string, slug: string) => {
  const plant = plants.find((candidate) => candidate.genre === genre && candidate.slug === slug);
  assert.ok(plant, `${genre}/${slug}`);
  return toVerifiedMediaApiFields(plant, registryVersion);
};

test("verified media API classifies all 96 canonical entries without fuzzy association", () => {
  const contracts = plants.map((plant) => toVerifiedMediaApiFields(plant, registryVersion));
  assert.equal(contracts.length, 96);
  assert.equal(new Set(contracts.map(({ jungle_slug }) => jungle_slug)).size, 96);
  assert.equal(contracts.filter(({ media_status }) => media_status === "VERIFIED_MEDIA").length, 75);
  assert.equal(contracts.filter(({ media_status }) => media_status === "HONEST_MEDIA_GAP").length, 21);
  assert.match(registryVersion, /^jungle-media-v1-[0-9a-f]{8}$/);
});

test("every verified media record has complete rights, a beta URL and a real asset", () => {
  for (const plant of plants) {
    const contract = toVerifiedMediaApiFields(plant, registryVersion);
    const image = exactVerifiedPrimaryMedia(plant);
    if (contract.media_status === "HONEST_MEDIA_GAP") {
      assert.equal(contract.primary_media_url, null);
      continue;
    }
    assert.ok(image);
    assert.match(contract.primary_media_url, /^https:\/\/beta-jungle\.tibaldo\.fr\//);
    assert.ok(contract.primary_media_creator);
    assert.ok(contract.primary_media_source_url);
    assert.ok(contract.primary_media_license);
    assert.ok(existsSync(new URL(`../public${image.src.replace(/^\/media\//, "/")}`, import.meta.url)), image.src);
  }
});

test("priority product identities return exact verified media or an honest gap", () => {
  const clarinervium = entry("anthurium", "clarinervium");
  assert.equal(clarinervium.media_status, "VERIFIED_MEDIA");
  assert.match(clarinervium.primary_media_url!, /\/media\/documentary-media-wave-2-v1\/anthurium-clarinervium-owner-2026-09\.webp$/);
  assert.equal(entry("epipremnum", "aureum").media_status, "VERIFIED_MEDIA");
  assert.equal(entry("alocasia", "imperial-red").media_status, "HONEST_MEDIA_GAP");
  assert.equal(entry("anthurium", "pallidiflorum").media_status, "VERIFIED_MEDIA");
  assert.match(entry("anthurium", "pallidiflorum").primary_media_url!, /anthurium-pallidiflorum-feuillage-tibaldo-jungle\.webp$/);
  assert.equal(plants.some((plant) => plant.slug === "bonnie"), false);
  assert.equal(plants.some((plant) => plant.slug === "imperial-green"), false);
});

test("Cycas uses the new exact licensed documentary override without rewriting its Owner gallery", () => {
  const cycas = plants.find((plant) => plant.genre === "cycas" && plant.slug === "revoluta");
  assert.ok(cycas);
  assert.equal(toVerifiedMediaApiFields(cycas, registryVersion).media_status, "VERIFIED_MEDIA");
  assert.match(toVerifiedMediaApiFields(cycas, registryVersion).primary_media_url!, /documentary-media-wave-6-v1\/cycas-revoluta-documentaire\.webp$/);
  assert.match(cycas.gallery[0].src, /cycas-revoluta-terrasse-tibaldo/);
});
