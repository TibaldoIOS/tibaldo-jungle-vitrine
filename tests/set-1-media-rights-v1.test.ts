import assert from "node:assert/strict";
import { test } from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import {
  set1MarantaVerifyOnly,
  set1MediaRightsRegistry,
  set1NextMediaCertificationReviews,
  set1RejectedMediaExclusions,
  set1RequiredMediaFields,
} from "../lib/plants/set-1-media-rights-v1.ts";
import { documentaryMediaWaveV1Registry } from "../lib/plants/documentary-media-completion-wave-v1.ts";
import { documentaryMediaWave2V1Registry } from "../lib/plants/documentary-media-completion-wave-2-v1.ts";

const laterVerifiedRoutes = new Set([...documentaryMediaWaveV1Registry, ...documentaryMediaWave2V1Registry].map(({ route }) => route));

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
    if (laterVerifiedRoutes.has(entry.route)) {
      assert.equal(documentaryGallery(plant).length, 1, entry.route);
      assert.equal(plant.gallery[0].license?.status, "verified", entry.route);
      continue;
    }
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

test("Colocasia Eddo is real-review-required without any media relink or render change", () => {
  assert.deepEqual(set1NextMediaCertificationReviews, [{
    route: "/plantes/colocasia/esculenta-eddo",
    MEDIA_STATUS: "REAL_REVIEW_REQUIRED",
    certification: "NEXT_MEDIA_CERTIFICATION",
    renderPolicy: "PRESERVE_CURRENT_MEDIA",
    reason: "La photographie Commons est réelle et attribuée ; la fiche ‘Eddo’ conserve une identification de spécimen provisoire à revoir à la prochaine certification média.",
  }]);

  const colocasia = routeToPlant("/plantes/colocasia/esculenta-eddo");
  assert.equal(documentaryGallery(colocasia).length, 1);
  assert.deepEqual(colocasia.gallery, [{
    src: "/colocasia-esculenta-feuille.jpg",
    alt: "Grandes feuilles de Colocasia esculenta cultivé à Maui",
    caption: "Feuillage de Colocasia esculenta en culture · Forest & Kim Starr · CC BY 3.0 US.",
    width: 1280,
    height: 1707,
    license: {
      status: "verified",
      creator: "Forest & Kim Starr",
      license: "CC BY 3.0 US",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/us/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Starr-090519-8057-Colocasia_esculenta-leaves-Native_Nursery_Kula-Maui_(24325097844).jpg",
      registryPath: "/credits-images",
      note: "Licence et attribution revérifiées le 30 août 2026. Le fichier Commons documente Colocasia esculenta cultivé ; le recadrage Web historique reste un seul documentaire.",
    },
  }]);
});
