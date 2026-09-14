import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { plants, getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { exactIdentityMatches, plantEntityId, parentSpecies } from "../lib/plants/canonical-identity.ts";

test("accepted species are distinct; no third pinnatum-aureum entity", () => {
  for (const slug of ["aureum", "pinnatum"]) {
    const p = getPlant("epipremnum", slug)!;
    assert.equal(p.botanicalName, `Epipremnum ${slug}`);
    assert.equal(p.taxonomy.species, p.botanicalName);
    assert.equal(p.taxonomy.cultivar, null);
    assert.ok(getPlantsByGenre("epipremnum").includes(p));
  }
  assert.equal(getPlant("epipremnum", "pinnatum-aureum"), undefined);
  assert.equal(parentSpecies(plants, getPlant("epipremnum", "marble-queen")!)?.slug, "aureum");
  for (const values of [plants.map(plantEntityId), plants.map(p => p.seo.title), plants.map(p => p.seo.description)]) assert.equal(new Set(values).size, values.length);
});

test("historical horticultural wording resolves exactly to aureum, not pinnatum", () => {
  for (const alias of ["Epipremnum pinnatum 'Aureum'", "Epipremnum pinnatum Aureum", "epipremnum pinnatum ‘aureum’", "Scindapsus aureus"]) {
    assert.deepEqual(exactIdentityMatches(plants, alias).map(plantEntityId), ["epipremnum/aureum"]);
  }
  assert.deepEqual(exactIdentityMatches(plants, "Epipremnum pinnatum").map(plantEntityId), ["epipremnum/pinnatum"]);
  assert.equal(exactIdentityMatches(plants, "Pothos").length, 0, "Generic name must not become automatic product identity");
  const aureum = getPlant("epipremnum", "aureum")!;
  for (const name of ["Golden pothos", "Pothos doré", "Pothos", "Devil's ivy"]) assert.ok(aureum.taxonomy.commonNames.includes(name));
});

test("cross-links and documentary gap do not invent a photograph or stock", () => {
  const a = getPlant("epipremnum", "aureum")!;
  const p = getPlant("epipremnum", "pinnatum")!;
  assert.ok(a.comparisons.some(c => c.href === "/plantes/epipremnum/pinnatum"));
  assert.ok(p.comparisons.some(c => c.href === "/plantes/epipremnum/aureum"));
  assert.deepEqual(p.gallery, []);
  assert.ok(p.mediaNeeds?.length);
  assert.equal(p.shopUrl, undefined);
  assert.ok(p.sources.some(s => s.url === "https://powo.science.kew.org/taxon/87046-1"));
  assert.notDeepEqual(p.description, a.description);
  assert.notDeepEqual(p.problems, a.problems);
  assert.equal(p.filters.variegated, false);
  assert.ok(p.filters.regions.includes("Asie"));
});

test("existing aureum commercial mapping and established SEO remain unchanged", () => {
  const mapping = JSON.parse(readFileSync(new URL("../docs/COMMERCIAL_TO_ENCYCLOPEDIA_MAPPING_V1.json", import.meta.url), "utf8"));
  const row = mapping.records.find((r: { PRODUCT_NAME: string }) => r.PRODUCT_NAME === "Epipremnum aureum");
  assert.equal(row.ENCYCLOPEDIA_ENTITY, "epipremnum/aureum");
  assert.equal(row.ENCYCLOPEDIA_URL, "https://jungle.tibaldo.fr/plantes/epipremnum/aureum");
  assert.equal(getPlant("epipremnum", "aureum")!.seo.title, "Epipremnum aureum : pothos doré, entretien et bouture");
  assert.equal(getPlant("epipremnum", "aureum")!.seo.description, "Pothos doré ou Golden pothos : identité d’Epipremnum aureum, feuilles juvéniles et adultes, lumière, arrosage, support, bouturage et précautions.");
});
