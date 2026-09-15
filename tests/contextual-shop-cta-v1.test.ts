import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const offers = read("../app/plantes/shop-offers.ts");
const bridge = read("../app/plantes/PlantShopBar.tsx");
const dock = read("../app/ConversionDock.tsx");
const cards = read("../app/plantes/GenusSpeciesCarousel.tsx");
const cardAction = read("../app/plantes/PlantCardShopAction.tsx");
const layout = read("../app/layout.tsx");

test("exact published offers feed one shared contextual dock", () => {
  assert.match(offers, /product\.encyclopediaId === encyclopediaId/);
  assert.match(offers, /PLANT_SHOP_CONTEXT_EVENT/);
  assert.match(bridge, /publishPlantShopContext/);
  assert.match(layout, /<ConversionDock/);
  assert.doesNotMatch(bridge, /<nav|position:\s*fixed/);
  assert.match(dock, /data-action="shop-exact"/);
  assert.match(dock, /data-action="shop-variants"/);
  assert.match(dock, /Voir au Shop/);
  assert.match(dock, /Choisir ma taille/);
});

test("variant chooser exposes exact Shop links, price and availability", () => {
  for (const source of [dock, cardAction]) {
    assert.match(source, /plantShopHref\(product\)/);
    assert.match(source, /formatShopPrice\(product\.priceTtc\)/);
    assert.match(source, /formatShopAvailability\(product\.availableQuantity\)/);
    assert.doesNotMatch(source, /Ajouter au panier|localStorage|supabase/i);
  }
  assert.match(offers, /const sizeOrder = \["XS", "S", "M", "L", "XL", "XXL"\]/);
});

test("preview cards keep the encyclopedia link separate from commerce", () => {
  assert.match(cards, /<Link className="genus-carousel-main"/);
  assert.match(cards, /<PlantCardShopAction/);
  assert.match(cards, /Lire la fiche/);
  assert.doesNotMatch(cardAction, /<Link/);
  assert.match(cardAction, /if \(!products\?\.length\) return null/);
});
