import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { potComparativeScale, potEditorialCatalog, potEditorialGroups } from "../lib/pots/catalog.ts";

test("the Jungle editorial collection contains exactly the 15 authorized merchant models", () => {
  assert.equal(potEditorialCatalog.length, 15);
  assert.deepEqual(potEditorialCatalog.map((pot) => pot.repere), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16]);
  assert.equal(new Set(potEditorialCatalog.map((pot) => pot.supplierReference)).size, 15);
});

test("the comparative gallery preserves one diameter scale after subject occupancy correction", () => {
  const visualDiameter = (repere: number) => potComparativeScale(potEditorialCatalog.find((entry) => entry.repere === repere)!);

  assert.ok(visualDiameter(3) > visualDiameter(2));
  assert.ok(visualDiameter(3) > visualDiameter(5));
  assert.ok(Math.abs(visualDiameter(3) / visualDiameter(2) - 1.9) < .01);
  assert.ok(Math.abs(visualDiameter(3) / visualDiameter(5) - 1.727) < .01);
  assert.ok(potEditorialCatalog.every((pot) => potComparativeScale(pot) > 0 && potComparativeScale(pot) <= 1));
});

test("only exact same-model colour and finish variants are grouped", () => {
  assert.deepEqual(potEditorialGroups.map((group) => [...group.reperes]), [[3, 5], [6, 7]]);
  assert.equal(new Set(potEditorialGroups.flatMap((group) => group.reperes)).size, 4);
});

test("every editorial model has one optimized image and factual dimensions", () => {
  for (const pot of potEditorialCatalog) {
    assert.match(pot.image, /^\/media\/pots\/famiflora-lot1\/.+\.jpg$/);
    assert.ok(existsSync(resolve(process.cwd(), "public", pot.image.slice(1))), pot.image);
    assert.ok(existsSync(resolve(process.cwd(), "public", pot.cropImage.slice(1))), pot.cropImage);
    assert.match(pot.dimensions, /^Ø/);
    assert.ok(pot.alt.length > 30);
  }
});

test("the public page remains editorial and does not invent commerce or technical attributes", () => {
  const page = readFileSync(resolve(process.cwd(), "app/pots-cache-pots-lille/page.tsx"), "utf8");
  const collection = readFileSync(resolve(process.cwd(), "app/pots-cache-pots-lille/PotCollection.tsx"), "utf8");
  assert.doesNotMatch(page, /"@type":\s*"Product"|"@type":\s*"Offer"/);
  assert.doesNotMatch(page, /InStock|OutOfStock|priceCurrency|quantité disponible/i);
  assert.doesNotMatch(page, /résistant au gel|diamètre intérieur|trou de drainage/i);
  assert.match(collection, /mise en scène assistée par IA/);
  assert.match(collection, /unoptimized/, "nested public media must bypass the hosted image optimizer");
  assert.match(page, /shopUrl\("\/produits\?type=pot"\)/, "the real published Shop collection is linked once");
});
