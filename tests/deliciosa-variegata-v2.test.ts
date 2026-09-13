import assert from "node:assert/strict";
import test from "node:test";
import { plants, getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";

test("Variegata is one new commercial form, not an invented cultivar or synonym", () => {
  const p = getPlant("monstera", "deliciosa-variegata")!;
  assert.equal(p.taxonomy.species, "Monstera deliciosa");
  assert.equal(p.taxonomy.cultivar, null);
  assert.equal(p.filters.variegated, true);
  assert.equal(p.gallery.length, 0);
  assert.deepEqual(p.synonyms, []);
  assert.equal(getPlantsByGenre("monstera").filter(p => p.slug === "deliciosa-variegata").length, 1);
  assert.equal(new Set(plants.map(p => `${p.genre}/${p.slug}`)).size, plants.length);
  const albo = getPlant("monstera", "albo-variegata")!;
  assert.ok(!albo.synonyms.includes("Monstera deliciosa ‘Variegata’"));
  assert.match(albo.faq[0].answer, /^Non/);
});

test("full care, morphology, identity and related forms without borrowed media", () => {
  const p = getPlant("monstera", "deliciosa-variegata")!;
  for (const value of Object.values(p.care)) if (typeof value === "string") assert.ok(value.length > 30);
  assert.ok(p.faq.length >= 6);
  assert.ok(p.problems.length >= 4);
  assert.ok(p.sources.length >= 3);
  assert.match(p.description.join(" "), /juvéniles/);
  assert.match(p.hybridization, /Aurea/);
  assert.match(p.faq.map(f => f.answer).join(" "), /génétique/);
  for (const slug of ["deliciosa", "albo-variegata", "thai-constellation", "mint", "dubia", "obliqua"]) assert.ok(getPlant("monstera", slug));
  for (const slug of ["thai-constellation", "mint"]) assert.ok(getPlant("monstera", slug)!.gallery.some(m => m.license?.creator === "TIBALDO"));
});
