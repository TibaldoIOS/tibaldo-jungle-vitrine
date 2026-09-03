import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { plants, plantFamilies } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { familyHubDecisions } from "../lib/seo/family-indexability-contract.ts";
import { expectedPublicSitemapUrlCount } from "../scripts/public-sitemap-contract.mjs";

const carousel = readFileSync(new URL("../app/plantes/GenusSpeciesCarousel.tsx", import.meta.url), "utf8");
const genusHub = readFileSync(new URL("../app/plantes/GoldenGenusHub.tsx", import.meta.url), "utf8");
const genusMobile = readFileSync(new URL("../app/plantes/GoldenGroupMobileBaseline.module.css", import.meta.url), "utf8");
const familyView = readFileSync(new URL("../app/plantes/PlantFamilyDirectory.tsx", import.meta.url), "utf8");
const familyStyles = readFileSync(new URL("../app/plantes/PlantFamilyDirectory.module.css", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

const longGridRoutes = ["alocasia", "anthurium", "monstera", "philodendron"] as const;
const longGenusTitles = ["Philodendron", "Epipremnum", "Epiphyllum", "Chlorophytum", "Syngonium", "Sansevieria"];
const longFamilyTitles = ["Apocynaceae", "Asphodelaceae", "Dicksoniaceae", "Marantaceae", "Nephrolepidaceae", "Strelitziaceae"];

for (const genre of longGridRoutes) {
  test(`long grid remains visible by default for ${genre}`, () => {
    assert.ok(plants.filter((plant) => plant.genre === genre).length >= 13);
    assert.match(carousel, /data-long-grid-visible/);
    assert.doesNotMatch(carousel, /aria-labelledby=\{`genus-carousel-\$\{genre\}`\}\s+data-reveal/);
    assert.match(carousel, /<header data-reveal>/);
  });
}

test("family Araceae uses the same fail-visible grid", () => {
  assert.equal(plants.filter((plant) => plant.taxonomy.family === "Araceae").length, 65);
  assert.match(carousel, /data-long-grid-visible/);
});

test("grid content does not depend on observer, delayed JavaScript or motion", () => {
  assert.doesNotMatch(carousel, /genus-carousel-track[^>]*data-reveal/);
  assert.doesNotMatch(carousel, /genus-carousel-card[^>]*data-reveal/);
  assert.match(globalStyles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("the last card remains reachable through normal document flow", () => {
  assert.match(carousel, /plants\.map\(\(plant\) =>/);
  assert.doesNotMatch(carousel, /plants\.slice\(/);
  assert.doesNotMatch(globalStyles, /\.genus-carousel-track\{[^}]*overflow:\s*hidden/);
});

for (const title of longGenusTitles) {
  test(`long genus H1 contract covers ${title}`, () => {
    assert.ok(title.length >= 9);
    assert.match(genusHub, /data-title-fit=\{title\.length >= 15 \? "extra-long" : title\.length >= 9 \? "long" : "default"\}/);
    assert.match(genusMobile, /data-title-fit="long"/);
    assert.match(genusMobile, /data-title-fit="extra-long"/);
  });
}

for (const title of longFamilyTitles) {
  test(`long family H1 contract covers ${title}`, () => {
    assert.ok(title.length >= 11);
    assert.match(familyView, /data-title-fit=\{family\.length >= 15 \? "extra-long" : family\.length >= 11 \? "long" : "default"\}/);
    assert.match(familyStyles, /data-title-fit="long"/);
    assert.match(familyStyles, /data-title-fit="extra-long"/);
  });
}

test("Asparagaceae uses the shared long-title contract", () => {
  assert.equal("Asparagaceae".length, 12);
  assert.doesNotMatch(familyStyles, /data-golden-family-v25="asparagaceae"/);
});

test("responsive grid column contract is unchanged", () => {
  assert.match(globalStyles, /grid-template-columns:\s*repeat\(auto-fit,minmax\(min\(100%,250px\),1fr\)\)/);
  assert.match(globalStyles, /@media \(max-width: 600px\)[^{]*\{[\s\S]*?\.genus-carousel-track\s*\{\s*grid-template-columns:\s*1fr/);
});

test("indexability and future sitemap contracts remain frozen", () => {
  assert.equal(plantFamilies.length, 31);
  assert.equal(new Set(plants.map((plant) => plant.taxonomy.family)).size, 16);
  assert.deepEqual(Object.entries(familyHubDecisions).filter(([, decision]) => decision === "INDEX_KEEP").map(([family]) => family), ["araceae", "asparagaceae", "musaceae"]);
  assert.equal(expectedPublicSitemapUrlCount, 176);
});

test("current documentary media contract contains 76 verified species and 20 honest gaps", () => {
  const gaps = plants.filter((plant) => documentaryGallery(plant).length === 0);
  assert.equal(plants.length, 96);
  assert.equal(plants.length - gaps.length, 76);
  assert.equal(gaps.length, 20);
});
