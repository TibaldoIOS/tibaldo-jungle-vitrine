import assert from "node:assert/strict";
import test from "node:test";
import { getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { horticulturalIdentityPlants } from "../lib/plants/horticultural-identities-v1.ts";

test("two documented horticultural identities, never an Alocasia substitution", () => {
  const black = getPlant("sansevieria", "black-diamond")!;
  const colo = getPlant("colocasia", "metallica")!;
  assert.equal(black.taxonomy.species, "Dracaena trifasciata");
  assert.match(black.hybridization, /aucun enregistrement officiel/);
  assert.equal(colo.taxonomy.genus, "Colocasia");
  assert.equal(colo.taxonomy.species, "Colocasia esculenta");
  assert.match(colo.hybridization, /non résolu/);
  assert.deepEqual(colo.synonyms, []);
  assert.ok(!black.synonyms.some(s => /Midnight|Gold|Robusta/.test(s)));
});
test("source-backed pages without borrowed photos or commerce claims", () => {
  for (const p of horticulturalIdentityPlants) {
    assert.equal(p.gallery.length, 0);
    assert.equal(p.showSources, true);
    assert.ok(p.sources.length >= 3);
    assert.equal(p.shopUrl, undefined);
    assert.equal(p.filters.petToxic, true);
    assert.ok(getPlantsByGenre(p.genre).some(x => x.slug === p.slug));
    assert.ok(p.editorialSections?.some(s => s.id === "multiplication"));
    assert.ok(p.faq.length >= 2);
    assert.doesNotMatch(JSON.stringify(p), /"@type":"(?:Product|Offer|AggregateRating)"|en stock|disponible au Studio/);
  }
});
