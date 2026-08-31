import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { plantFamilies, plants } from "../lib/plants/catalog.ts";
import {
  speciesMediaExpansionV1Plants,
  speciesMediaExpansionV1Routes,
  speciesMediaExpansionV1Summary,
} from "../lib/plants/species-media-expansion-v1.ts";

const expectedRoutes = [
  "/plantes/peperomia/argyraea",
  "/plantes/epipremnum/aureum",
  "/plantes/philodendron/hastatum",
  "/plantes/calathea/orbifolia",
  "/plantes/cactus/truncata",
  "/plantes/fougeres/nephrolepis-exaltata",
  "/plantes/philodendron/verrucosum",
  "/plantes/philodendron/squamiferum",
  "/plantes/philodendron/brandtianum",
  "/plantes/philodendron/erubescens",
  "/plantes/monstera/acuminata",
  "/plantes/monstera/subpinnata",
  "/plantes/monstera/spruceana",
  "/plantes/anthurium/villenaorum",
  "/plantes/anthurium/pedatoradiatum",
  "/plantes/anthurium/radicans",
  "/plantes/alocasia/gageana",
  "/plantes/alocasia/lauterbachiana",
  "/plantes/alocasia/portei",
  "/plantes/pilea/involucrata",
] as const;

test("l’expansion contient exactement vingt routes nouvelles et uniques", () => {
  assert.equal(speciesMediaExpansionV1Plants.length, 20);
  assert.deepEqual(speciesMediaExpansionV1Routes, expectedRoutes);
  assert.equal(plants.length, 96);
  assert.equal(new Set(plants.map((plant) => `${plant.genre}/${plant.slug}`)).size, 96);
});

test("chaque fiche est substantielle, sourcée et ne prétend pas être disponible", () => {
  for (const plant of speciesMediaExpansionV1Plants) {
    assert.ok(plant.description.length >= 2, `${plant.slug}: description`);
    assert.ok((plant.editorialSections?.length ?? 0) >= 3, `${plant.slug}: sections`);
    assert.ok(plant.problems.length >= 4, `${plant.slug}: diagnostics`);
    assert.ok(plant.faq.length >= 5, `${plant.slug}: FAQ`);
    assert.ok(plant.sources.length >= 1, `${plant.slug}: sources`);
    assert.equal(plant.shopUrl, undefined, `${plant.slug}: aucune disponibilité inventée`);
  }
});

test("seize médias sont vérifiés et quatre restent en média-gap honnête", () => {
  assert.deepEqual(speciesMediaExpansionV1Summary, { routes: 20, verifiedMedia: 16, honestMediaGaps: 4 });
  const expectedGaps = new Set(["subpinnata", "villenaorum", "gageana", "lauterbachiana"]);
  for (const plant of speciesMediaExpansionV1Plants) {
    const image = plant.gallery[0];
    if (expectedGaps.has(plant.slug)) {
      assert.equal(image.license?.status, "media-gap", plant.slug);
      assert.equal(image.src, "/photo-reelle-a-venir.svg", plant.slug);
      continue;
    }
    assert.equal(image.license?.status, "verified", plant.slug);
    assert.ok(image.license?.creator, `${plant.slug}: auteur`);
    assert.ok(image.license?.sourceUrl, `${plant.slug}: source`);
    assert.ok(image.license?.licenseUrl, `${plant.slug}: licence`);
    const assetPath = image.src.startsWith("/media/") ? `public/${image.src.slice("/media/".length)}` : `public${image.src}`;
    assert.equal(existsSync(assetPath), true, `${plant.slug}: fichier`);
  }
});

test("les hubs Calathea, Cactus et Fougères ont une fiche et une photo contrôlée", () => {
  for (const genre of ["calathea", "cactus", "fougeres"] as const) {
    assert.ok(speciesMediaExpansionV1Plants.some((plant) => plant.genre === genre), genre);
    const hub = plantFamilies.find((family) => family.slug === genre);
    assert.ok(hub, genre);
    assert.doesNotMatch(hub.image, /photo-reelle-a-venir/, genre);
    const hubAssetPath = hub.image.startsWith("/media/") ? `public/${hub.image.slice("/media/".length)}` : `public${hub.image}`;
    assert.equal(existsSync(hubAssetPath), true, genre);
  }
});

test("la photographie Alocasia gageana rejetée n’est jamais rendue", () => {
  const gageana = speciesMediaExpansionV1Plants.find((plant) => plant.slug === "gageana");
  assert.equal(gageana?.gallery[0].license?.status, "media-gap");
  assert.equal(existsSync("public/alocasia-gageana.webp"), false);
});
