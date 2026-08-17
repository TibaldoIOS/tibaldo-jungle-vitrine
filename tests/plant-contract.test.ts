import assert from "node:assert/strict";
import test from "node:test";
import { encyclopediaSlugOf, toPlantApiV1, toPlantApiV2 } from "../lib/plants/api-contract.ts";

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
