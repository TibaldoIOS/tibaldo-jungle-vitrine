import test from "node:test";
import assert from "node:assert/strict";
import { getPlant } from "../lib/plants/catalog.ts";

const species = ["baginda", "reginula", "micholitziana", "cuprea"];
const selections = ["silver-dragon", "frydek-variegata", "red-secret"];
const horticultural = /Silver Dragon|Dragon Scale|Black Velvet|Frydek|Red Secret/i;

test("species identity does not own horticultural-selection copy", () => {
  for (const slug of species) {
    const p = getPlant("alocasia", slug)!;
    assert.equal(p.botanicalName, `Alocasia ${slug}`);
    assert.doesNotMatch(JSON.stringify([p.description, p.subtitle, p.hybridization, p.taxonomy.commonNames]), horticultural);
    assert.ok(p.comparisons.some(c => horticultural.test(c.name)));
  }
});

test("species and selections retain explicit reciprocal contextual links", () => {
  for (const [parent, child] of [["baginda", "silver-dragon"], ["micholitziana", "frydek-variegata"], ["cuprea", "red-secret"]]) {
    assert.ok(getPlant("alocasia", parent)!.comparisons.some(c => c.href === `/plantes/alocasia/${child}`));
    assert.ok(getPlant("alocasia", child)!.comparisons.some(c => c.href === `/plantes/alocasia/${parent}`));
  }
  assert.match(getPlant("alocasia", "silver-dragon")!.taxonomy.species, /non confirmé/);
  for (const slug of ["dragon-scale", "black-velvet", "frydek"]) assert.equal(getPlant("alocasia", slug), undefined);
});

test("substantive identity and selection editorial blocks are distinct", () => {
  const paragraphs: string[] = [];
  const headings: string[] = [];
  for (const slug of [...species, ...selections]) {
    const p = getPlant("alocasia", slug)!;
    paragraphs.push(...p.description);
    if (selections.includes(slug)) {
      for (const section of p.editorialSections ?? []) {
        headings.push(section.title);
        paragraphs.push(...section.paragraphs);
      }
    }
  }
  assert.equal(new Set(paragraphs).size, paragraphs.length);
  assert.equal(new Set(headings).size, headings.length);
});

test("species and horticultural search intents have unique metadata", () => {
  const pages = [...species, ...selections].map(slug => getPlant("alocasia", slug)!);
  for (const field of ["title", "description"] as const) assert.equal(new Set(pages.map(p => p.seo[field])).size, pages.length);
  assert.doesNotMatch(getPlant("alocasia", "reginula")!.seo.description, /Black Velvet/);
});
