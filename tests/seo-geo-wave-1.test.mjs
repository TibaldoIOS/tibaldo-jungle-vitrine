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
  assert.match(catalog, /aussi recherchée comme Red Imperial/);
  assert.match(catalog, /"Alocasia Red Imperial"/);
});

test("Imperial Red opens with a direct care answer and Pallidiflorum stays editorial", () => {
  const catalog = read("lib/plants/catalog.ts");
  assert.match(catalog, /Alocasia Red Imperial.*lumière vive indirecte.*arrosage.*substrat/s);
  assert.doesNotMatch(catalog, /Anthurium pallidiflorum : entretien et achat à Lille/);
  assert.doesNotMatch(catalog, /Disponibilité au Studio Végétal Tibaldo Jungle à Lille/);
  assert.match(catalog, /Cette fiche documente l’espèce/);
});

test("functional headings and contextual links remain limited to five pilot species", () => {
  const profile = read("app/plantes/GoldenSpeciesProfile.tsx");
  const links = read("app/plantes/SpeciesCareLinks.tsx");
  assert.match(profile, /Lumière, arrosage, humidité et substrat/);
  assert.match(profile, /Problèmes fréquents · Diagnostic prudent/);
  assert.match(links, /const pilotSpecies = new Set/);
  assert.match(links, /if \(!pilotSpecies\.has/);
});

test("guide images expose meaningful alt text, dimensions and responsive sizes", () => {
  const page = read("app/conseils/page.tsx");
  assert.match(page, /Illustration du guide/);
  assert.match(page, /guideImageDimensions/);
  assert.match(page, /sizes=/);
});

test("species pages do not claim commercial availability without Shop authority", () => {
  const catalog = read("lib/plants/catalog.ts");
  const localModule = read("app/plantes/SpeciesLocalStudio.tsx");
  assert.doesNotMatch(catalog, /Philodendron billietiae : entretien et achat à Lille/);
  assert.doesNotMatch(catalog, /Disponibilité chez Tibaldo Jungle à Lille/);
  assert.match(localModule, /ne constitue pas un état du stock/);
  assert.match(localModule, /indiqués\s+par le Shop Tibaldo/);
});

test("depth-four Asparagaceae and Musaceae hubs link to useful genus and group pages", () => {
  const content = read("lib/plants/family-hub-content.ts");
  const directory = read("app/plantes/PlantFamilyDirectory.tsx");
  for (const href of ["/plantes/agave", "/plantes/sansevieria", "/plantes/bananiers", "/plantes/musa", "/plantes/ensete"]) {
    assert.match(content, new RegExp(href.replaceAll("/", "\\/")));
  }
  assert.match(directory, /content\.relatedLinks\.map/);
});
