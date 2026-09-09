import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { plantFamilies, plants } from "../lib/plants/catalog.ts";
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
  assert.equal(plants.length, 76);
  assert.equal(plantFamilies.length, 31);
  for (const route of expectedRoutes) {
    const [, , genre, slug] = route.split("/");
    assert.ok(plants.some((plant) => plant.genre === genre && plant.slug === slug), route);
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
  assert.equal(p1AliasCanonicalMap["/plantes/alocasia/amazonica"], "/plantes/alocasia/mortfontanensis-polly");
  assert.equal(p1AliasCanonicalMap["/plantes/philodendron/scandens"], "/plantes/philodendron/hederaceum");
  assert.equal(p1AliasCanonicalMap["/plantes/monstera/variegata"], "/plantes/monstera/albo-variegata");
  assert.equal(p1AliasCanonicalMap["/plantes/dracaena/trifasciata"], "/plantes/sansevieria/trifasciata");
  for (const alias of Object.keys(p1AliasCanonicalMap)) {
    assert.equal(encyclopediaP1Routes.includes(alias as (typeof encyclopediaP1Routes)[number]), false, alias);
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

test("les hubs majeurs atteignent les nouveaux totaux sans créer de groupe", () => {
  assert.equal(plants.filter((plant) => plant.genre === "alocasia").length, 13);
  assert.equal(plants.filter((plant) => plant.genre === "anthurium").length, 14);
  assert.equal(plants.filter((plant) => plant.genre === "philodendron").length, 8);
  assert.equal(plants.filter((plant) => plant.genre === "monstera").length, 12);
  for (const genre of ["ficus", "hoya", "syngonium", "sansevieria"] as const) {
    assert.equal(plants.filter((plant) => plant.genre === genre).length, 1, genre);
    assert.ok(plantFamilies.some((family) => family.slug === genre), genre);
  }
});
