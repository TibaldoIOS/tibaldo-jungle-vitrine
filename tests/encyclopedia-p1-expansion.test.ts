import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { getPlantsByGenre, plantFamilies, plants } from "../lib/plants/catalog.ts";
import {
  encyclopediaP1Plants,
  encyclopediaP1Routes,
  p1AliasCanonicalMap,
} from "../lib/plants/encyclopedia-p1-expansion.ts";

const expectedRoutes = [
  "/plantes/alocasia/tandurusa",
  "/plantes/alocasia/melo",
  "/plantes/alocasia/mortfontanensis-polly",
  "/plantes/anthurium/luxurians",
  "/plantes/anthurium/wendlingeri",
  "/plantes/philodendron/hederaceum",
  "/plantes/philodendron/pink-princess",
  "/plantes/monstera/albo-variegata",
  "/plantes/ficus/elastica",
  "/plantes/hoya/carnosa",
  "/plantes/syngonium/podophyllum",
  "/plantes/sansevieria/trifasciata",
] as const;

test("P1 ajoute exactement les douze routes approuvées au catalogue V32", () => {
  assert.equal(encyclopediaP1Plants.length, 12);
  assert.deepEqual(encyclopediaP1Routes, expectedRoutes);
  for (const route of expectedRoutes) {
    const [, , genre, slug] = route.split("/");
    assert.equal(plants.filter((plant) => plant.genre === genre && plant.slug === slug).length, 1, route);
    assert.equal(plantFamilies.filter((family) => family.slug === genre).length, 1, `${genre}: hub canonique unique`);
  }
});

test("les corrections taxonomiques demandées ont un seul canonique", () => {
  const polly = encyclopediaP1Plants.find((plant) => plant.slug === "mortfontanensis-polly");
  assert.equal(polly?.taxonomy.species, "Alocasia × mortfontanensis");
  assert.match(polly?.hybridization ?? "", /A\. longiloba × A\. sanderiana/);

  const hederaceum = encyclopediaP1Plants.find((plant) => plant.slug === "hederaceum");
  assert.equal(hederaceum?.taxonomy.species, "Philodendron hederaceum");
  assert.ok(hederaceum?.synonyms.includes("Philodendron scandens"));

  const trifasciata = encyclopediaP1Plants.find((plant) => plant.slug === "trifasciata");
  assert.equal(trifasciata?.genre, "sansevieria");
  assert.equal(trifasciata?.botanicalName, "Dracaena trifasciata");
  assert.ok(trifasciata?.synonyms.includes("Sansevieria trifasciata"));

  const albo = encyclopediaP1Plants.find((plant) => plant.slug === "albo-variegata");
  assert.equal(albo?.taxonomy.species, "Monstera deliciosa");
  assert.equal(albo?.taxonomy.cultivar, "Albo Variegata");
  assert.equal(plants.filter((plant) => plant.genre === "monstera" && /\balbo\b/i.test(`${plant.slug} ${plant.botanicalName}`)).length, 1);
});

test("la table d’alias rassemble les intentions sans créer de route dupliquée", () => {
  // Un nom générique ne prouve pas le cultivar Polly : conserver le hub actuel.
  assert.equal(p1AliasCanonicalMap["/plantes/alocasia/amazonica"], "/plantes/alocasia");
  assert.equal(p1AliasCanonicalMap["/plantes/philodendron/scandens"], "/plantes/philodendron/hederaceum");
  // La forme panachée générique a désormais sa propre fiche : ne pas imposer Albo.
  assert.equal(p1AliasCanonicalMap["/plantes/monstera/variegata"], "/plantes/monstera/deliciosa-variegata");
  assert.equal(p1AliasCanonicalMap["/plantes/dracaena/trifasciata"], "/plantes/sansevieria/trifasciata");
  for (const [alias, target] of Object.entries(p1AliasCanonicalMap)) {
    assert.equal(plants.some((plant) => `/plantes/${plant.genre}/${plant.slug}` === alias), false, alias);
    const speciesTargets = plants.filter((plant) => `/plantes/${plant.genre}/${plant.slug}` === target);
    const genusTargets = plantFamilies.filter((family) => `/plantes/${family.slug}` === target);
    assert.equal(speciesTargets.length + genusTargets.length, 1, `${alias}: destination canonique unique`);
  }
});

test("chaque fiche P1 est substantielle, sourcée et conserve un média honnête", () => {
  const remainingGaps = new Set(["melo", "luxurians"]);
  const publicAssetPath = (src: string) =>
    src.startsWith("/media/") ? `public/${src.slice("/media/".length)}` : `public${src}`;
  for (const plant of encyclopediaP1Plants) {
    assert.ok(plant.description.length >= 2, `${plant.slug}: description`);
    assert.ok((plant.editorialSections?.length ?? 0) >= 3, `${plant.slug}: sections`);
    assert.ok(plant.problems.length >= 4, `${plant.slug}: diagnostics`);
    assert.ok(plant.comparisons.length >= 3, `${plant.slug}: comparaisons`);
    assert.ok(plant.faq.length >= 5, `${plant.slug}: FAQ`);
    assert.ok(plant.sources.length >= 2, `${plant.slug}: sources`);
    if (remainingGaps.has(plant.slug)) {
      assert.equal(plant.gallery[0].src, "/photo-reelle-a-venir.svg", `${plant.slug}: média-gap`);
      assert.equal(plant.gallery[0].license?.status, "media-gap", `${plant.slug}: droits gap`);
    } else {
      assert.ok(plant.gallery.length >= 1, `${plant.slug}: média connecté`);
      for (const image of plant.gallery) {
        assert.equal(image.license?.status, "verified", `${plant.slug}: droits vérifiés`);
        assert.ok(image.license?.sourceUrl, `${plant.slug}: source`);
        assert.ok(image.license?.licenseUrl, `${plant.slug}: licence`);
        assert.equal(existsSync(publicAssetPath(image.src)), true, `${plant.slug}: fichier local`);
      }
    }
    assert.equal(plant.shopUrl, undefined, `${plant.slug}: aucune offre`);
  }
  assert.equal(encyclopediaP1Plants.filter((plant) => plant.gallery[0].license?.status === "verified").length, 10);
  assert.equal(encyclopediaP1Plants.filter((plant) => plant.gallery[0].license?.status === "media-gap").length, 2);
});

test("les hubs majeurs conservent les entrées P1 sans créer de groupe dupliqué", () => {
  for (const genre of new Set(encyclopediaP1Plants.map((plant) => plant.genre))) {
    const entries = getPlantsByGenre(genre);
    assert.equal(plantFamilies.filter((family) => family.slug === genre).length, 1, genre);
    assert.equal(new Set(entries.map((plant) => plant.slug)).size, entries.length, genre);
    for (const historical of encyclopediaP1Plants.filter((plant) => plant.genre === genre)) {
      assert.equal(entries.filter((plant) => plant.slug === historical.slug).length, 1, `${genre}/${historical.slug}`);
    }
  }
});
