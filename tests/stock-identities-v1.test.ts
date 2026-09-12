import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { plants, getPlant, getPlantsByGenre, plantFamilies } from "../lib/plants/catalog.ts";
import { stockIdentityPlants } from "../lib/plants/stock-identities-v1.ts";

const routes = ["philodendron/imperial-green", "hoya/callistophylla", "sansevieria/black-gold", "asplenium/nidus", "nephrolepis/green-lady", "nephrolepis/green-moment", "chlorophytum/bonnie", "chlorophytum/ocean", "beaucarnea/recurvata"];
test("nine distinct canonical identities; existing Zebrina and Pink Princess remain unique", () => {
  assert.deepEqual(stockIdentityPlants.map(p => p.genre + "/" + p.slug), routes);
  assert.equal(new Set(plants.map(p => p.genre + "/" + p.slug)).size, plants.length);
  for (const route of [...routes, "alocasia/zebrina", "philodendron/pink-princess"]) {
    assert.equal(plants.filter(p => p.genre + "/" + p.slug === route).length, 1, route);
  }
});
test("unresolved supplier names do not become species or availability claims", () => {
  assert.equal(getPlant("sansevieria", "black-diamond"), undefined);
  assert.equal(getPlant("colocasia", "metallica"), undefined);
  assert.match(getPlant("beaucarnea", "recurvata")!.faq[0].answer, /étiquette fournisseur imprécise/);
  for (const p of stockIdentityPlants) {
    assert.equal(p.shopUrl, undefined);
    assert.doesNotMatch(JSON.stringify(p), /"@type":"(?:Product|Offer|AggregateRating)"|en stock|prix de vente|disponible au Studio/i);
    assert.equal(p.specimen.observedHeight, "Aucune mesure de spécimen publiée");
  }
});
test("taxonomy distinguishes genus routes, species and cultivar status", () => {
  const black = getPlant("sansevieria", "black-gold")!;
  assert.equal(black.taxonomy.genus, "Dracaena");
  assert.equal(black.taxonomy.species, "Dracaena trifasciata");
  assert.equal(getPlant("philodendron", "imperial-green")!.taxonomy.species, "Parentage non précisé");
  assert.match(getPlant("nephrolepis", "green-lady")!.hybridization, /non résolu/);
  assert.equal(getPlant("nephrolepis", "green-moment")!.family, "Polypodiaceae");
});
test("new pages preserve an honest media gap and substantive evidence", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const p of stockIdentityPlants) {
    assert.equal(p.gallery.length, 0);
    assert.equal(p.showSources, true);
    assert.ok(p.sources.length >= 2);
    for (const s of p.sources) assert.match(s.url, /^https:\/\//);
    for (const value of Object.values(p.care)) if (typeof value === "string") assert.ok(value.length > 20);
    assert.ok(p.problems.length >= 2);
    assert.ok(p.faq.length >= 1);
    assert.ok(p.editorialSections?.some(s => s.paragraphs.includes(p.care.propagation)));
    titles.add(p.seo.title); descriptions.add(p.seo.description);
  }
  assert.equal(titles.size, routes.length); assert.equal(descriptions.size, routes.length);
});
test("fern universe and genus cards give real canonical referrers", () => {
  for (const genre of ["asplenium", "nephrolepis", "beaucarnea"]) assert.ok(plantFamilies.some(f => f.slug === genre));
  for (const route of ["asplenium/nidus", "nephrolepis/green-lady", "nephrolepis/green-moment"]) {
    assert.ok(getPlantsByGenre("fougeres").some(p => p.genre + "/" + p.slug === route));
  }
});
test("unknown toxicity cannot pass the animal-safe filter", () => {
  assert.equal(getPlant("asplenium", "nidus")!.filters.petToxic, null);
  assert.equal(getPlant("chlorophytum", "bonnie")!.filters.petToxic, false);
  assert.equal(getPlant("hoya", "callistophylla")!.filters.petToxic, true);
  assert.match(readFileSync(new URL("../app/plantes/PlantExplorer.tsx", import.meta.url), "utf8"), /petToxic === false/);
});
