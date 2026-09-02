import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { exactVerifiedPrimaryMedia, mediaRegistryVersionFor, toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const registryVersion = mediaRegistryVersionFor(plants);
const contract = (genre: string, slug: string) => {
  const plant = plants.find((candidate) => candidate.genre === genre && candidate.slug === slug);
  assert.ok(plant, `${genre}/${slug}`);
  return { plant, api: toVerifiedMediaApiFields(plant, registryVersion), image: exactVerifiedPrimaryMedia(plant) };
};

test("Wave 6 plus the Owner-authorized Pallidiflorum restore expose 75 verified identities", () => {
  const contracts = plants.map((plant) => toVerifiedMediaApiFields(plant, registryVersion));
  assert.equal(contracts.length, 96);
  assert.equal(contracts.filter(({ media_status }) => media_status === "VERIFIED_MEDIA").length, 75);
  assert.equal(contracts.filter(({ media_status }) => media_status === "HONEST_MEDIA_GAP").length, 21);
});

test("Cycas revoluta and Philodendron Brasil expose exact licensed media", () => {
  for (const [genre, slug] of [["cycas", "revoluta"], ["philodendron", "brasil"]]) {
    const { api, image } = contract(genre, slug);
    assert.equal(api.media_status, "VERIFIED_MEDIA");
    assert.match(api.primary_media_url, /^https:\/\/beta-jungle\.tibaldo\.fr\/documentary-media-wave-6-v1\//);
    assert.ok(api.primary_media_creator);
    assert.ok(api.primary_media_source_url?.startsWith("https://commons.wikimedia.org/wiki/File:"));
    assert.ok(api.primary_media_license);
    assert.ok(api.primary_media_license_url);
    assert.ok(image);
    assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)));
  }
});

test("remaining sensitive identities stay honest gaps and Eddo remains untouched", () => {
  for (const [genre, slug] of [["alocasia", "imperial-red"], ["monstera", "esqueleto"]]) {
    assert.equal(contract(genre, slug).api.media_status, "HONEST_MEDIA_GAP");
    assert.equal(contract(genre, slug).api.primary_media_url, null);
  }
  const eddo = contract("colocasia", "esculenta-eddo");
  assert.equal(eddo.api.media_status, "VERIFIED_MEDIA");
  assert.doesNotMatch(eddo.image!.src, /documentary-media-wave-6-v1/);
});

test("Caisse-relevant exact media and fail-closed identities do not regress", () => {
  assert.equal(contract("anthurium", "clarinervium").api.media_status, "VERIFIED_MEDIA");
  assert.equal(contract("epipremnum", "aureum").api.media_status, "VERIFIED_MEDIA");
  assert.equal(plants.some((plant) => plant.slug === "bonnie"), false);
  assert.equal(plants.some((plant) => plant.slug === "imperial-green"), false);
});
