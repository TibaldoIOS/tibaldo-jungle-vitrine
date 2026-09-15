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
const styles = read("../app/globals.css");

test("exact published offers feed one shared contextual dock", () => {
  assert.match(offers, /product\.encyclopediaId === encyclopediaId/);
  assert.match(offers, /PLANT_SHOP_CONTEXT_EVENT/);
  assert.match(bridge, /publishPlantShopContext/);
  assert.match(layout, /<ConversionDock/);
  assert.doesNotMatch(bridge, /<nav|position:\s*fixed/);
  assert.match(dock, /plant-shop-offers/);
  assert.match(dock, /Adopte-moi/);
  assert.match(dock, /Voir cette plante au Shop/);
});

test("every plant profile exposes an honest persistent Shop action", () => {
  assert.match(bridge, /products: \[\]/);
  assert.match(dock, /plant-shop-catalogue/);
  assert.match(dock, /Voir le Shop/);
  assert.match(dock, /Aucune offre n’est actuellement publiée pour cette fiche/);
  assert.match(dock, /Voir le catalogue général/);
  assert.match(dock, /aria-expanded=\{chooserOpen\}/);
  assert.match(dock, /aria-hidden="true">🌱/);
  assert.match(dock, /plantChanged/);
  assert.match(dock, /if \(plantChanged\) setChooserOpen\(false\)/);
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

test("the offer panel keeps long plant names complete and clear of its close control", () => {
  const titleRule = styles.match(
    /\.conversion-dock-shop-panel header strong \{([^}]+)\}/,
  )?.[1];
  assert.ok(titleRule);
  assert.match(titleRule, /white-space:\s*normal/);
  assert.match(titleRule, /overflow-wrap:\s*anywhere/);
  assert.doesNotMatch(titleRule, /text-overflow:\s*ellipsis/);
  assert.match(
    styles,
    /\.conversion-dock-shop-panel header \{[^}]*padding:\s*18px 50px 16px 18px/,
  );
});
