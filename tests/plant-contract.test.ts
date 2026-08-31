import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { encyclopediaSlugOf, toPlantApiV1, toPlantApiV2 } from "../lib/plants/api-contract.ts";
import { plants } from "../lib/plants/catalog.ts";
import {
  encyclopediaV19ExpansionPlants,
  encyclopediaV19TaxonomyAudit,
  v19MediaGapCount,
} from "../lib/plants/encyclopedia-v19-expansion.ts";

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

test("Dicksonia antarctica ajoute une seule identité botanique centrale", () => {
  const dicksonia = plants.find((entry) => entry.genre === "dicksonia" && entry.slug === "antarctica");
  assert.equal(plants.length, 96);
  assert.equal(dicksonia?.botanicalName, "Dicksonia antarctica");
  assert.equal(dicksonia?.taxonomy.family, "Dicksoniaceae");
  assert.equal(dicksonia?.taxonomy.order, "Cyatheales");
  assert.equal(encyclopediaSlugOf(dicksonia!), "plantes/dicksonia/antarctica");
  assert.equal(plants.some((entry) => /Dictyonia/i.test(entry.botanicalName)), false);
});

test("le lot Agave, Fatsia et Strelitzia ajoute sept identités exactes", () => {
  const expected = [
    ["agave", "americana-variegata", "Agave americana ‘Variegata’"],
    ["fatsia", "japonica-spiders-web", "Fatsia japonica ‘Spider’s Web’"],
    ["strelitzia", "alba", "Strelitzia alba"],
    ["strelitzia", "caudata", "Strelitzia caudata"],
    ["strelitzia", "juncea", "Strelitzia juncea"],
    ["strelitzia", "nicolai", "Strelitzia nicolai"],
    ["strelitzia", "reginae", "Strelitzia reginae"],
  ];
  for (const [genre, slug, name] of expected) {
    const entry = plants.find((item) => item.genre === genre && item.slug === slug);
    assert.equal(entry?.botanicalName, name);
    assert.equal(encyclopediaSlugOf(entry!), `plantes/${genre}/${slug}`);
  }
  assert.equal(plants.some((item) => item.genre === "strelitzia" && item.slug === "augusta"), false);
  assert.equal(plants.find((item) => item.genre === "agave")?.taxonomy.cultivar, "Variegata");
  assert.equal(plants.find((item) => item.genre === "fatsia")?.taxonomy.cultivar, "Spider’s Web");
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

test("V19 reste intact après les expansions des genres majeurs", () => {
  const expected = { monstera: 15, anthurium: 17, alocasia: 16 } as const;
  for (const [genre, count] of Object.entries(expected)) {
    const entries = plants.filter((plant) => plant.genre === genre);
    assert.equal(entries.length, count, genre);
    assert.equal(new Set(entries.map((plant) => plant.slug)).size, count, genre);
  }
  assert.equal(encyclopediaV19ExpansionPlants.length, 18);
});

test("V19 conserve les identités botaniques demandées sans fusionner espèces et hybrides", () => {
  const expected = [
    ["monstera", "dubia", "Monstera dubia"],
    ["monstera", "siltepecana", "Monstera siltepecana"],
    ["monstera", "obliqua", "Monstera obliqua"],
    ["monstera", "pinnatipartita", "Monstera pinnatipartita"],
    ["monstera", "standleyana", "Monstera standleyana"],
    ["anthurium", "crystallinum", "Anthurium crystallinum"],
    ["anthurium", "magnificum", "Anthurium magnificum Linden"],
    ["anthurium", "forgetii", "Anthurium forgetii"],
    ["anthurium", "papillilaminum", "Anthurium papillilaminum"],
    ["alocasia", "cuprea", "Alocasia cuprea"],
    ["alocasia", "zebrina", "Alocasia zebrina"],
    ["alocasia", "reginula", "Alocasia reginula"],
    ["alocasia", "micholitziana", "Alocasia micholitziana"],
    ["alocasia", "baginda", "Alocasia baginda"],
    ["alocasia", "sinuata", "Alocasia sinuata"],
    ["alocasia", "longiloba", "Alocasia longiloba"],
    ["alocasia", "macrorrhizos", "Alocasia macrorrhizos"],
    ["alocasia", "odora", "Alocasia odora"],
  ] as const;
  for (const [genre, slug, botanicalName] of expected) {
    const entry = plants.find((plant) => plant.genre === genre && plant.slug === slug);
    assert.equal(entry?.botanicalName, botanicalName, `${genre}/${slug}`);
    assert.ok((entry?.sources.length ?? 0) >= 2, `${genre}/${slug} sources`);
    assert.equal(encyclopediaSlugOf(entry!), `plantes/${genre}/${slug}`);
  }
  assert.equal(plants.find((plant) => plant.slug === "magnificum")?.taxonomy.species, "Anthurium magnificum");
  assert.notEqual(plants.find((plant) => plant.slug === "forgetii")?.slug, "forgetii-dark-form-silver-blush");
  assert.notEqual(plants.find((plant) => plant.slug === "papillilaminum")?.slug, "papillilaminum-dark-phoenix");
});

test("V19 publie les deux libellés Monstera prudents demandés", () => {
  const burle = plants.find((plant) => plant.slug === "burle-marx-flame");
  const esqueleto = plants.find((plant) => plant.slug === "esqueleto");
  assert.equal(burle?.botanicalName, "Monstera sp. ‘Burle Marx’s Flame’");
  assert.equal(burle?.taxonomy.species, "sp. (non établi)");
  assert.match(burle?.hybridization ?? "", /accepté.*International Aroid Society.*pas une espèce botanique établie/i);
  assert.equal(esqueleto?.botanicalName, "Monstera sp. ‘Esqueleto’");
  assert.equal(esqueleto?.taxonomy.species, "sp. (non établi)");
  assert.match(esqueleto?.hybridization ?? "", /historique\/non établi/i);
  assert.deepEqual(encyclopediaV19TaxonomyAudit.map(({ label }) => label), [
    "Monstera sp. ‘Burle Marx’s Flame’",
    "Monstera sp. ‘Esqueleto’",
  ]);
});

test("l’audit nocturne retire Esqueleto du rendu documentaire tant que l’identité reste insuffisante", () => {
  const esqueleto = plants.find((entry) => entry.genre === "monstera" && entry.slug === "esqueleto");
  assert.equal(esqueleto?.gallery[0].src, "/photo-reelle-a-venir.svg");
  assert.equal(esqueleto?.gallery[0].license?.status, "media-gap");
  assert.match(esqueleto?.gallery[0].license?.note ?? "", /PHOTO_DOUBTFUL/);
  assert.equal(existsSync(new URL("../public/monstera-esqueleto-feuille-mature-fenestrations.webp", import.meta.url)), true);
});

test("V19 ne référence aucun média absent et explicite chaque lacune documentaire", () => {
  for (const plant of plants) {
    for (const image of plant.gallery) {
      const publicPath = image.src.replace(/^\/media\//, "/");
      assert.equal(existsSync(new URL(`../public${publicPath}`, import.meta.url)), true, `${plant.genre}/${plant.slug}: ${image.src}`);
    }
  }

  const v19WithVerifiedPhoto = encyclopediaV19ExpansionPlants.filter((plant) => plant.gallery[0].license?.status === "verified");
  assert.deepEqual(v19WithVerifiedPhoto.map((plant) => plant.slug).sort(), ["crystallinum", "cuprea"]);
  assert.equal(v19MediaGapCount, 16);
  for (const plant of encyclopediaV19ExpansionPlants.filter((plant) => plant.gallery[0].license?.status === "media-gap")) {
    assert.equal(plant.gallery[0].src, "/photo-reelle-a-venir.svg");
    assert.match(plant.mediaNeeds?.[0]?.description ?? "", /Média manquant.*provenance.*licence/i);
  }
});
