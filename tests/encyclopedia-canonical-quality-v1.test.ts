import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { plants, plantFamilies, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { comparisonTarget, exactIdentityMatches, normalizeIdentity, plantEntityId } from "../lib/plants/canonical-identity.ts";
import type { PlantEntry } from "../lib/plants/types";

const baseline = JSON.parse(readFileSync(new URL("../docs/ENCYCLOPEDIA_BASELINE_V125.json", import.meta.url), "utf8")) as { entries: PlantEntry[] };
const byId = (id: string) => plants.find(p => plantEntityId(p) === id)!;
test("97 unique canonical entities, no lost PUBLIC URL or documentary media", () => {
  assert.equal(plants.length, 97);
  assert.equal(new Set(plants.map(plantEntityId)).size, plants.length);
  assert.equal(new Set(plants.map(p => normalizeIdentity(p.botanicalName))).size, plants.length);
  for (const old of baseline.entries) {
    const p = byId(plantEntityId(old));
    assert.ok(p, plantEntityId(old));
    assert.equal(JSON.stringify(p.gallery), JSON.stringify(old.gallery), `Media/provenance unchanged: ${plantEntityId(old)}`);
    assert.deepEqual(p.seo, old.seo, `Established SEO unchanged: ${plantEntityId(old)}`);
  }
});
test("no substring cultivar substitution and no self-link loops", () => {
  for (const p of plants) for (const c of p.comparisons) {
    const target = comparisonTarget(plants, p, c);
    assert.notEqual(target.href, `/plantes/${plantEntityId(p)}`);
    assert.ok(plants.some(e => target.href === `/plantes/${plantEntityId(e)}`) || plantFamilies.some(g => target.href === `/plantes/${g.slug}`));
  }
  const mq = byId("epipremnum/marble-queen");
  assert.deepEqual(comparisonTarget(plants, mq, { name: "Epipremnum aureum ‘Snow Queen’", difference: "" }), { href: "/plantes/epipremnum", exact: false });
  assert.equal(comparisonTarget(plants, mq, { name: "Epipremnum aureum", difference: "" }).href, "/plantes/epipremnum/aureum");
  assert.equal(exactIdentityMatches(plants, "Monstera Squeleto")[0]?.slug, "esqueleto");
  assert.equal(exactIdentityMatches(plants, "Monstera deliciosa Variegata")[0]?.slug, "deliciosa-variegata");
  assert.equal(exactIdentityMatches(plants, "Alocasia Silver Dragon")[0]?.slug, "silver-dragon");
  assert.equal(exactIdentityMatches(plants, "Philodendron New Red").length, 0);
});
test("new pages do not invent cultivar rank or copy another entity's image", () => {
  for (const id of ["epipremnum/aureum", "pilea/moon-valley", "philodendron/spiritus-sancti", "philodendron/splendid", "philodendron/florida-green", "alocasia/bambino"]) {
    const p = byId(id); assert.ok(p); assert.equal(p.gallery.length, 0); assert.ok(p.sources.length >= 2); assert.ok(p.faq.length >= 3);
    assert.ok(getPlantsByGenre(p.genre).some(c => plantEntityId(c) === id));
  }
  for (const id of ["alocasia/bambino", "philodendron/florida-green", "monstera/deliciosa-variegata", "alocasia/frydek-variegata"]) assert.equal(byId(id).taxonomy.cultivar, null);
  assert.equal(byId("philodendron/spiritus-sancti").taxonomy.species, "Philodendron spiritus-sancti");
});
test("toxicity uncertainty cannot become a pet-safe filter; horsetail does not flower", () => {
  for (const p of plants.filter(p => /à vérifier selon l’espèce/i.test(p.toxicity.level))) {
    assert.equal(p.filters.petToxic, null); assert.equal(p.filters.humanToxic, null);
  }
  for (const id of ["aloe/vera", "plumeria/rubra"]) { assert.equal(byId(id).filters.petToxic, true); assert.equal(byId(id).filters.humanToxic, true); }
  assert.equal(byId("equisetum/japonicum").filters.flowering, false);
  assert.equal(byId("pilea/peperomioides").care.substrate.includes("ou ."), false);
});
test("all entries have unique SEO and source-level genus membership", () => {
  assert.equal(new Set(plants.map(p => p.seo.title)).size, plants.length);
  assert.equal(new Set(plants.map(p => p.seo.description)).size, plants.length);
  for (const p of plants) { assert.ok(plantFamilies.some(g => g.slug === p.genre)); assert.ok(getPlantsByGenre(p.genre).includes(p)); }
});
test("commercial audit denominator, safe match levels and generic identity gates", () => {
  const mapping = JSON.parse(readFileSync(new URL("../docs/COMMERCIAL_TO_ENCYCLOPEDIA_MAPPING_V1.json", import.meta.url), "utf8"));
  assert.equal(mapping.records.length, 51);
  assert.equal(mapping.records.filter((r: { LINKAGE_READY: string }) => r.LINKAGE_READY === "YES").length, 47);
  for (const row of mapping.records) {
    if (row.LINKAGE_READY === "YES") assert.ok(byId(row.ENCYCLOPEDIA_ENTITY));
    else assert.ok(row.BLOCKER);
  }
  assert.equal(mapping.live_shop_read.full_current_catalog_coverage, "NOT_PROVEN");
});
