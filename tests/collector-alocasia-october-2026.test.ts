import test from "node:test";
import assert from "node:assert/strict";
import {getPlant, getPlantsByGenre} from "../lib/plants/catalog.ts";

const expected = ["micholitziana", "frydek-variegata", "platinum", "venom", "teletubbies", "longiloba"];

test("the six Owner labels resolve to six distinct canonical profiles", () => {
  for (const slug of expected) assert.ok(getPlant("alocasia", slug), slug);
  assert.equal(new Set(expected).size, 6);
  assert.equal(getPlantsByGenre("alocasia").filter((plant) => expected.includes(plant.slug)).length, 6);
});

test("existing Frydek, Platinum and longiloba identities stay canonical", () => {
  assert.equal(getPlant("alocasia", "micholitziana")?.taxonomy.species, "Alocasia micholitziana");
  assert.equal(getPlant("alocasia", "frydek-variegata")?.taxonomy.cultivar, null);
  assert.equal(getPlant("alocasia", "platinum")?.botanicalName, "Alocasia sp. ‘Platinum’");
  assert.equal(getPlant("alocasia", "longiloba")?.taxonomy.species, "Alocasia longiloba");
});

test("Venom and Teletubbies are presented as cautious horticultural identities", () => {
  const venom = getPlant("alocasia", "venom")!;
  const teletubbies = getPlant("alocasia", "teletubbies")!;
  assert.equal(venom.taxonomy.cultivar, "Venom");
  assert.match(venom.hybridization, /attribution secondaire/i);
  assert.equal(teletubbies.taxonomy.species, "Alocasia sp.");
  assert.match(teletubbies.hybridization, /n.adopte ni l.attribution à gageana/i);
  assert.doesNotMatch(teletubbies.origin, /gageana|Stingray|Loco/i);
});

test("new pages keep an honest media gap and expose sources", () => {
  for (const slug of ["venom", "teletubbies"]) {
    const plant = getPlant("alocasia", slug)!;
    assert.equal(plant.gallery[0]?.license?.status, "media-gap");
    assert.equal(plant.gallery[0]?.alt, "");
    assert.equal(plant.showSources, true);
    assert.ok(plant.sources.length >= 4);
  }
});
