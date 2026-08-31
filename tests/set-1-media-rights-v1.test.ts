import assert from "node:assert/strict";
import { test } from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import {
  set1MarantaVerifyOnly,
  set1MediaRightsRegistry,
  set1RejectedMediaExclusions,
  set1RequiredMediaFields,
} from "../lib/plants/set-1-media-rights-v1.ts";

const routeToPlant = (route: string) => {
  const [, , genre, slug] = route.split("/");
  const plant = getPlant(genre, slug);
  assert.ok(plant, route);
  return plant;
};

test("Set 1 admits no incomplete candidate as documentary media", () => {
  assert.equal(set1MediaRightsRegistry.length, 11);
  assert.deepEqual(set1RequiredMediaFields, [
    "identity", "rights", "creator", "sourceUrl", "license", "licenseUrl", "alt", "dimensions", "role",
  ]);

  for (const entry of set1MediaRightsRegistry) {
    assert.ok(entry.missingRequiredFields.length > 0, entry.route);
    const plant = routeToPlant(entry.route);
    assert.equal(documentaryGallery(plant).length, 0, entry.route);
    assert.equal(plant.gallery.length, 1, entry.route);
    assert.equal(plant.gallery[0].src, "/photo-reelle-a-venir.svg", entry.route);
    assert.equal(plant.gallery[0].license?.status, "media-gap", entry.route);
  }
});

test("Maranta stays VERIFY_ONLY and Esqueleto remains an explicit replacement gap", () => {
  assert.equal(set1MarantaVerifyOnly.candidateDecision, "VERIFY_ONLY");
  const maranta = routeToPlant(set1MarantaVerifyOnly.route);
  const esqueleto = routeToPlant("/plantes/monstera/esqueleto");
  assert.equal(documentaryGallery(maranta).length, 0);
  assert.equal(documentaryGallery(esqueleto).length, 0);
  assert.match(maranta.gallery[0].license?.note ?? "", /PHOTO_WRONG/);
  assert.match(esqueleto.gallery[0].license?.note ?? "", /PHOTO_DOUBTFUL/);
});

test("Agave remains Caisse-only and rejected Gageana stays absent", () => {
  const agaveEntry = set1MediaRightsRegistry.find(({ route }) => route === "/plantes/agave/americana-variegata");
  assert.equal(agaveEntry?.publication, "CAISSE_ONLY_NO_SHOP");
  assert.equal(routeToPlant(agaveEntry!.route).shopUrl, undefined);

  assert.deepEqual(set1RejectedMediaExclusions.map(({ route, decision }) => [route, decision]), [
    ["/plantes/alocasia/gageana", "REJECTED_DO_NOT_REINTRODUCE"],
  ]);
  const gageana = routeToPlant("/plantes/alocasia/gageana");
  assert.equal(documentaryGallery(gageana).length, 0);
  assert.equal(gageana.gallery[0].src, "/photo-reelle-a-venir.svg");
});
