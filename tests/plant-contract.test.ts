import assert from "node:assert/strict";
import test from "node:test";
import { encyclopediaSlugOf, toPlantApiV1, toPlantApiV2 } from "../lib/plants/api-contract.ts";
import { plants } from "../lib/plants/catalog.ts";

const plant = {
  slug: "deliciosa",
  genre: "monstera",
  genreLabel: "Monstera",
  botanicalName: "Monstera deliciosa",
  displayName: "Deliciosa",
  subtitle: "Une espèce botanique.",
  taxonomy: { order: "Alismatales", family: "Araceae", genus: "Monstera", species: "Monstera deliciosa", cultivar: null, commonNames: ["Faux philodendron"] },
  synonyms: [],
  description: ["Description botanique."],
  gallery: [],
  publishedAt: "2026-01-01",
  updatedAt: "2026-01-02",
};

test("encyclopedia_slug est indépendant d’une variante commerciale", () => {
  assert.equal(encyclopediaSlugOf(plant), "plantes/monstera/deliciosa");
});

test("le contrat V1 conserve exactement ses champs publics", () => {
  assert.deepEqual(Object.keys(toPlantApiV1(plant)), [
    "id", "genre", "genreLabel", "slug", "displayName", "botanicalName", "cultivar", "family",
    "imageUrl", "imageAlt", "encyclopediaSlug", "encyclopediaUrl", "publishedAt", "updatedAt",
  ]);
});

test("une fiche sans image utilise un média éditorial stable", () => {
  const entry = toPlantApiV1(plant);
  assert.equal(entry.imageUrl, "https://jungle.tibaldo.fr/photo-reelle-a-venir.svg");
  assert.ok(entry.imageAlt.length > 0);
});

test("le contrat V2 est un sur-ensemble du contrat V1", () => {
  const v1 = toPlantApiV1(plant);
  const v2 = toPlantApiV2(plant);
  for (const [key, value] of Object.entries(v1)) assert.deepEqual(v2[key as keyof typeof v2], value);
  assert.equal(v2.contractVersion, "2.0");
  assert.equal(v2.taxonomy.genus, "Monstera");
  assert.equal(v2.primaryImage.url, v1.imageUrl);
});

test("l’étape 1 ajoute deux identités Anthurium sans variante commerciale", () => {
  const clarinervium = plants.find((entry) => entry.genre === "anthurium" && entry.slug === "clarinervium");
  const warocqueanum = plants.find((entry) => entry.genre === "anthurium" && entry.slug === "warocqueanum");
  assert.equal(clarinervium?.botanicalName, "Anthurium clarinervium");
  assert.equal(warocqueanum?.botanicalName, "Anthurium warocqueanum");
  assert.equal(encyclopediaSlugOf(clarinervium!), "plantes/anthurium/clarinervium");
  assert.equal(encyclopediaSlugOf(warocqueanum!), "plantes/anthurium/warocqueanum");
  const forbiddenCommercialVariants = new Set(["veitchii-narrow", "delta-force-baby", "warocqueanum-xxl"]);
  assert.equal(plants.some((entry) => entry.genre === "anthurium" && forbiddenCommercialVariants.has(entry.slug)), false);
});

test("tous les encyclopedia_slug restent uniques", () => {
  const slugs = plants.map(encyclopediaSlugOf);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("l’étape 2 ajoute quatre identités Bananiers sans taille commerciale", () => {
  const expected = [
    ["musa", "basjoo", "Musa basjoo"],
    ["musa", "sikkimensis-red-tiger", "Musa sikkimensis 'Red Tiger'"],
    ["musa", "florida-variegata", "Musa 'Florida Variegata'"],
    ["ensete", "ventricosum-maurelii", "Ensete ventricosum 'Maurelii'"],
  ];
  for (const [genre, slug, botanicalName] of expected) {
    const entry = plants.find((plant) => plant.genre === genre && plant.slug === slug);
    assert.equal(entry?.botanicalName, botanicalName);
    assert.equal(encyclopediaSlugOf(entry!), `plantes/${genre}/${slug}`);
  }
  const florida = plants.find((plant) => plant.slug === "florida-variegata");
  assert.equal(florida?.taxonomy.species, "Non déterminée");
  assert.equal(florida?.taxonomy.cultivar, "Florida Variegata");
});
