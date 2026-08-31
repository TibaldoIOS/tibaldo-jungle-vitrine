import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { plantFamilies, plants } from "../lib/plants/catalog.ts";
import { familyHubContent } from "../lib/plants/family-hub-content.ts";
import {
  familyHubDecision,
  familyHubDecisions,
  isFamilyIndexable,
  isRouteIndexable,
} from "../lib/seo/family-indexability-contract.ts";

const historicalMissing = [
  "apocynaceae", "araliaceae", "asphodelaceae", "cactaceae", "cycadaceae",
  "dicksoniaceae", "equisetaceae", "marantaceae", "moraceae", "strelitziaceae", "urticaceae",
];
const families = [...new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase()))].sort();
const familyRoute = readFileSync("app/plantes/famille/[family]/page.tsx", "utf8");
const sitemapRoute = readFileSync("app/sitemap.xml/route.ts", "utf8");
const familyView = readFileSync("app/plantes/PlantFamilyDirectory.tsx", "utf8");
const carousel = readFileSync("app/plantes/GenusSpeciesCarousel.tsx", "utf8");
const css = readFileSync("app/globals.css", "utf8");

test("one explicit family policy covers the complete V47 family inventory", () => {
  assert.deepEqual(Object.keys(familyHubDecisions).sort(), families);
  assert.deepEqual(families.filter(isFamilyIndexable), ["araceae", "asparagaceae", "musaceae"]);
});

test("the eleven historical sitemap gaps are intentionally noindex-follow", () => {
  assert.equal(historicalMissing.length, 11);
  for (const family of historicalMissing) {
    assert.equal(familyHubDecision(family), "NOINDEX_FOLLOW", family);
    assert.equal(isRouteIndexable(`/plantes/famille/${family}`), false, family);
  }
});

test("all retained indexable family hubs have specific editorial substance", () => {
  for (const family of families.filter(isFamilyIndexable)) {
    const content = familyHubContent[family];
    assert.ok(content, family);
    assert.ok(content.definition.length >= 150, family);
    assert.ok(content.distinction.length >= 150, family);
    assert.ok(content.traits.length >= 3, family);
  }
});

test("metadata and sitemap consume the same family indexability function", () => {
  assert.match(familyRoute, /isFamilyIndexable\(slug\)/);
  assert.match(familyRoute, /index:\s*false,\s*follow:\s*true/);
  assert.match(sitemapRoute, /\.filter\(isFamilyIndexable\)/);
});

test("every indexable family has valid child species links", () => {
  for (const family of families.filter(isFamilyIndexable)) {
    const children = plants.filter((plant) => plant.taxonomy.family.toLowerCase() === family);
    assert.ok(children.length > 0, family);
    assert.equal(new Set(children.map((plant) => `/plantes/${plant.genre}/${plant.slug}`)).size, children.length, family);
  }
});

test("every indexable genus hub has at least one valid child route", () => {
  for (const genre of plantFamilies.filter((family) => family.available).map((family) => family.slug)) {
    const acceptedGenres = genre === "bananiers" ? ["musa", "ensete"] : [genre];
    const children = plants.filter((plant) => acceptedGenres.includes(plant.genre));
    assert.ok(children.length > 0, genre);
  }
});

test("all V47 species remain reachable from a genus or the bananiers group", () => {
  const genusRoutes = new Set<string>(plantFamilies.filter((family) => family.available).map((family) => family.slug));
  for (const plant of plants) {
    assert.ok(genusRoutes.has(plant.genre) || (plant.genre === "musa" || plant.genre === "ensete") && genusRoutes.has("bananiers"), `${plant.genre}/${plant.slug}`);
  }
});

test("genus and family explorers render one responsive botanical grid", () => {
  assert.match(familyView, /GenusSpeciesCarousel/);
  assert.match(css, /\.genus-carousel-track\s*\{[^}]*display:\s*grid/);
  assert.match(css, /grid-template-columns:\s*repeat\(auto-fit/);
  assert.doesNotMatch(css, /\.genus-carousel-track\s*\{[^}]*overflow-x:\s*auto/);
});

test("cards preserve real hrefs and honest media gaps", () => {
  assert.match(carousel, /href=\{`\/plantes\/\$\{plant\.genre\}\/\$\{plant\.slug\}`\}/);
  assert.match(carousel, /documentaryGallery\(plant\)\[0\]/);
  assert.match(carousel, /Photographie réelle/);
  assert.match(carousel, /à documenter/);
});

test("V47 media inventory remains 96 species with the five Wave 2 routes", () => {
  assert.equal(plants.length, 96);
  for (const route of ["monstera/adansonii", "anthurium/clarinervium", "anthurium/warocqueanum", "anthurium/regale", "philodendron/gloriosum"]) {
    const [genre, slug] = route.split("/");
    assert.ok(plants.find((plant) => plant.genre === genre && plant.slug === slug)?.gallery.some((image) => image.license?.status === "verified"), route);
  }
});

test("Esqueleto stays an honest gap and Portei keeps its current media", () => {
  const esqueleto = plants.find((plant) => plant.genre === "monstera" && plant.slug === "esqueleto");
  const portei = plants.find((plant) => plant.slug === "portei");
  assert.equal(esqueleto?.gallery[0]?.license?.status, "media-gap");
  assert.ok(portei?.gallery.length);
});
