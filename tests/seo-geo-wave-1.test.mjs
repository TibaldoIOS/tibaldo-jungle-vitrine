import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("SEO/GEO Wave 1 removes the two active internal rempotage redirects", () => {
  for (const path of ["app/boutique-plantes-lille/page.tsx", "app/substrats-en-vrac-lille/page.tsx"]) {
    assert.doesNotMatch(read(path), /href: "\/rempotage-plantes-lille"/);
    assert.match(read(path), /href: "\/rempotage"/);
  }
});

test("canonical species pages expose contextual care, guide and cited-material links", () => {
  const profile = read("app/plantes/GoldenSpeciesProfile.tsx");
  const links = read("app/plantes/SpeciesCareLinks.tsx");
  assert.match(profile, /<SpeciesCareLinks plant={plant} \/>/);
  assert.match(links, /\/conseils\/lumiere-plantes-interieur/);
  assert.match(links, /\/conseils\/arroser-plantes-interieur/);
  assert.match(links, /\/conseils\/choisir-substrat-plante-interieur/);
  assert.match(links, /\/substrats\/ecorce-de-pin/);
});

test("banana species point back to their shared Bananiers hub", () => {
  const profile = read("app/plantes/GoldenSpeciesProfile.tsx");
  assert.match(profile, /const isBanana = plant\.genre === "musa" \|\| plant\.genre === "ensete"/);
  assert.match(profile, /href="\/plantes\/bananiers"/);
});

test("Imperial Red keeps one canonical identity while acknowledging the observed query variant", () => {
  const catalog = read("lib/plants/catalog.ts");
  assert.match(catalog, /parfois recherchée comme Red Imperial/);
  assert.match(catalog, /"Alocasia Red Imperial"/);
});
