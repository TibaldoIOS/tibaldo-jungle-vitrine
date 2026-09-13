import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { plants, getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { shopReferencePlants } from "../lib/plants/shop-reference-coverage-v1.ts";

const mapping = JSON.parse(readFileSync(new URL("../docs/shop-to-jungle-coverage-v1.json", import.meta.url), "utf8"));
test("three documented forms, no duplicate species or juvenile page", () => {
  assert.deepEqual(shopReferencePlants.map(p => p.slug), ["frydek-variegata", "silver-dragon", "red-secret"]);
  assert.equal(new Set(plants.map(p => `${p.genre}/${p.slug}`)).size, plants.length);
  assert.equal(getPlant("monstera", "dubia-juvenile"), undefined);
  assert.equal(getPlant("monstera", "obliqua-peru"), undefined);
});
test("explicit names are not replaced by species or invented taxonomy", () => {
  const frydek = getPlant("alocasia", "frydek-variegata")!;
  assert.equal(frydek.taxonomy.species, "Alocasia micholitziana");
  assert.equal(frydek.taxonomy.cultivar, null);
  assert.equal(frydek.filters.variegated, true);
  assert.equal(getPlant("alocasia", "silver-dragon")!.taxonomy.species, "Rattachement spécifique non confirmé");
  assert.match(getPlant("alocasia", "red-secret")!.hybridization, /non résolu/);
});
test("full template content, distinct metadata and honest media gaps", () => {
  for (const p of shopReferencePlants) {
    assert.equal(p.gallery.length, 0);
    assert.equal(p.showSources, true);
    assert.ok(p.sources.length >= 4);
    assert.ok(p.faq.length >= 4);
    assert.ok(p.problems.length >= 3);
    assert.ok(p.editorialSections!.some(s => s.paragraphs.includes(p.care.propagation)));
    for (const value of Object.values(p.care)) if (typeof value === "string") assert.ok(value.length > 20);
    assert.ok(getPlantsByGenre("alocasia").some(g => g.slug === p.slug));
    assert.equal(p.shopUrl, undefined);
    assert.doesNotMatch(JSON.stringify(p), /"@type":"(?:Offer|AggregateRating)"|en stock|disponible au Studio/i);
  }
  assert.equal(new Set(shopReferencePlants.map(p => p.seo.title)).size, 3);
  assert.equal(new Set(shopReferencePlants.map(p => p.seo.description)).size, 3);
});
test("exact handoff links and ambiguity gate; no production commerce write", () => {
  assert.equal(mapping.production_shop_write, false);
  assert.equal(mapping.records.length, 6);
  const pending = mapping.records.filter((r: { LINKAGE_READY: string }) => r.LINKAGE_READY === "NO");
  assert.equal(pending.length, 1);
  assert.equal(pending[0].SHOP_NAME, "Monstera Deliciosa Variegata");
  assert.equal(pending[0].ENCYCLOPEDIA_SLUG, null);
  for (const r of mapping.records.filter((r: { LINKAGE_READY: string }) => r.LINKAGE_READY === "YES")) {
    const [genre, slug] = r.ENCYCLOPEDIA_SLUG.split("/");
    assert.ok(getPlant(genre, slug));
    assert.equal(r.ENCYCLOPEDIA_URL, `https://jungle.tibaldo.fr/plantes/${genre}/${slug}`);
  }
});
test("parents reference new forms and existing Owner media stay attached to exact species", () => {
  for (const [slug, label] of [["micholitziana", "Frydek Variegata"], ["baginda", "Silver Dragon"], ["cuprea", "Red Secret"]]) {
    assert.ok(getPlant("alocasia", slug)!.comparisons.some(c => c.name === label));
  }
  assert.ok(getPlant("monstera", "dubia")!.faq.some(q => /Juvenile/.test(q.question)));
  assert.ok(getPlant("monstera", "obliqua")!.faq.some(q => /Peru/.test(q.question)));
  for (const [genre, slug] of [["monstera", "dubia"], ["monstera", "obliqua"], ["alocasia", "cuprea"]]) {
    assert.ok(getPlant(genre, slug)!.gallery.some(m => m.license?.creator === "TIBALDO"));
  }
});
