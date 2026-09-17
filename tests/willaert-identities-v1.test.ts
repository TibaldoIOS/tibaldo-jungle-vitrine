import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPlant, plants } from "../lib/plants/catalog.ts";
import { willaertIdentityPlants } from "../lib/plants/willaert-identities-v1.ts";

const expected = [
  "yucca/gigantea-puck",
  "olea/europaea",
  "tetrapanax/papyrifer",
  "asplenium/scolopendrium",
  "anthurium/silver-blush",
  "cactus/assortiment",
  "philodendron/xanadu",
];

const mappingReport = JSON.parse(
  readFileSync(new URL("../docs/WILLAERT_JUNGLE_IDENTITIES_V1.json", import.meta.url), "utf8"),
) as { records: Array<{ product_id: string; encyclopedia_slug: string }> };

test("les références 126 et 127 suivent le registre Production exact", () => {
  const mapping = new Map(mappingReport.records.map((record) => [record.product_id, record.encyclopedia_slug]));
  assert.equal(mapping.get("TJ-P-00000126"), "philodendron/xanadu");
  assert.equal(mapping.get("TJ-P-00000127"), "cactus/assortiment");
});

test("le lot Willaert ajoute sept identités sans dupliquer Musa basjoo", () => {
  assert.deepEqual(willaertIdentityPlants.map((plant) => `${plant.genre}/${plant.slug}`), expected);
  assert.equal(plants.filter((plant) => `${plant.genre}/${plant.slug}` === "musa/basjoo").length, 1);
  for (const id of expected) assert.equal(plants.filter((plant) => `${plant.genre}/${plant.slug}` === id).length, 1, id);
});
test("Puck, Silver Blush et Xanadu conservent leur portée taxonomique exacte", () => {
  const puck = getPlant("yucca", "gigantea-puck")!;
  assert.equal(puck.taxonomy.species, "Yucca gigantea");
  assert.equal(puck.taxonomy.cultivar, null);
  assert.match(puck.hybridization, /non résolu/i);

  const silver = getPlant("anthurium", "silver-blush")!;
  assert.equal(silver.taxonomy.species, "Rattachement spécifique non confirmé");
  assert.equal(silver.taxonomy.cultivar, null);
  assert.equal(silver.gallery.length, 0);
  assert.doesNotMatch(JSON.stringify(silver), /anthurium-forgetii-dark-form-silver-blush-plante-en-pot/);

  const xanadu = getPlant("philodendron", "xanadu")!;
  assert.equal(xanadu.taxonomy.species, "Philodendron xanadu");
  assert.ok(xanadu.synonyms.includes("Thaumatophyllum xanadu"));
});

test("Cactus Mix reste un assortiment multi-identités partagé par S M et L", () => {
  const mix = getPlant("cactus", "assortiment")!;
  assert.equal(mix.taxonomy.species, "Identités individuelles non déterminées");
  assert.match(mix.hybridization, /S, M et L partagent cette fiche/);
  assert.match(mix.hybridization, /succulentes non Cactaceae/);
  assert.match(mix.gallery[0].caption, /Photo d’illustration/);
  assert.equal(mix.gallery[0].license?.status, "verified");
  assert.match(mix.gallery[0].license?.sourceUrl ?? "", /^https:\/\/unsplash\.com\//);
});

test("aucune photo d’une espèce voisine ne comble les lacunes documentaires", () => {
  for (const id of ["musa/basjoo", "yucca/gigantea-puck", "olea/europaea", "tetrapanax/papyrifer", "asplenium/scolopendrium", "anthurium/silver-blush", "philodendron/xanadu"]) {
    const [genre, slug] = id.split("/");
    const plant = getPlant(genre, slug)!;
    const documentary = plant.gallery.filter((image) => image.license?.status === "verified");
    assert.equal(documentary.length, 0, id);
  }
  assert.doesNotMatch(JSON.stringify(getPlant("asplenium", "scolopendrium")), /asplenium-nidus-fougere-nid-oiseau/);
});
