import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { potEditorialCatalog } from "../lib/pots/catalog.ts";

test("the Jungle editorial collection contains exactly the 15 authorized merchant models", () => {
  assert.equal(potEditorialCatalog.length, 15);
  assert.deepEqual(potEditorialCatalog.map((pot) => pot.repere), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16]);
  assert.equal(new Set(potEditorialCatalog.map((pot) => pot.supplierReference)).size, 15);
});

test("every editorial model has one optimized image and factual dimensions", () => {
  for (const pot of potEditorialCatalog) {
    assert.match(pot.image, /^\/media\/pots\/famiflora-lot1\/.+\.webp$/);
    assert.ok(existsSync(resolve(process.cwd(), "public", pot.image.slice(1))), pot.image);
    assert.match(pot.dimensions, /^Ø/);
    assert.ok(pot.alt.length > 30);
  }
});

test("the public page remains editorial and does not invent commerce or technical attributes", () => {
  const page = readFileSync(resolve(process.cwd(), "app/pots-cache-pots-lille/page.tsx"), "utf8");
  assert.doesNotMatch(page, /"@type":\s*"Product"|"@type":\s*"Offer"/);
  assert.doesNotMatch(page, /InStock|OutOfStock|priceCurrency|quantité disponible/i);
  assert.doesNotMatch(page, /résistant au gel|diamètre intérieur|trou de drainage/i);
  assert.match(page, /mise en scène assistée par IA/);
});
