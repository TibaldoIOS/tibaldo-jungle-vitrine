import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readyMixes } from "../app/substrats/selection.ts";

const bridge = readFileSync(new URL("../app/substrats/ReadyMixCommerce.tsx", import.meta.url), "utf8");
const selection = readFileSync(new URL("../app/substrats/SubstrateSelection.tsx", import.meta.url), "utf8");

const expected = new Map<string, readonly [string, string]>([
  ["aroid", ["01b29228-65f8-4b91-9ed1-c248cb9ba941", "sybotanica-aroid-mix-5l"]],
  ["alocasia", ["ca1788c2-f2d6-4273-9de2-b2aadf8b9ac6", "sybotanica-alocasia-mix-5l"]],
  ["anthurium", ["0c91e490-33c2-4123-914c-800ce2ff5c05", "sybotanica-anthurium-mix-5l"]],
  ["hoya", ["d7c7379d-7494-4dfa-8504-f9770b091a50", "sybotanica-hoya-mix-5l"]],
  ["syngonium", ["ed58e0ce-c607-4926-a637-25382025b314", "sybotanica-syngonium-mix-5l"]],
  ["calathea-maranta", ["3f63ad9b-75b9-44be-9b75-1c5fb31c6814", "sybotanica-calathea-maranta-mix-5l"]],
  ["cacti", ["51d9dc6d-8ca4-4c33-8244-0c1b365c4a29", "sybotanica-cacti-succulent-mix-5l"]],
  ["bonsai", ["a903bc57-7633-47ef-ae95-eaa0daabd7a1", "sybotanica-bonsai-mix-5l"]],
  ["ficus", ["e36586ad-71b0-4b3f-8544-6b5143db4125", "sybotanica-ficus-mix-5l"]],
  ["orchid", ["8f690e97-79c4-425b-aca3-ff1bb43a6661", "sybotanica-orchid-mix-5l"]],
  ["carnivorous", ["d845163d-6cf8-46e3-93db-565ea91ac6b1", "sybotanica-carnivorous-mix-5l"]],
  ["terrarium", ["3ba0d058-6bca-4683-b64b-8a28931e41c3", "sybotanica-terrarium-mix-5l"]],
] as const);

test("twelve received mixes use exact reviewed Shop identities; Fern stays explicitly unmapped", () => {
  assert.equal(readyMixes.length, 13);
  assert.equal(readyMixes.filter((mix) => mix.shop).length, 12);
  for (const mix of readyMixes) {
    if (mix.id === "fern") {
      assert.equal(mix.shop, null);
      continue;
    }
    const exact = expected.get(mix.id);
    assert.ok(exact, mix.id);
    assert.deepEqual([mix.shop?.id, mix.shop?.slug], exact);
    assert.equal(mix.shop?.format, "5 L");
  }
  assert.equal(new Set(readyMixes.flatMap((mix) => mix.shop ? [mix.shop.id] : [])).size, 12);
  assert.equal(new Set(readyMixes.flatMap((mix) => mix.shop ? [mix.shop.slug] : [])).size, 12);
});

test("Shop CTA is conditional on the exact public catalogue identity and manufacturer remains secondary", () => {
  assert.match(selection, /<ReadyMixCommerce mixName=\{mix\.name\} manufacturerUrl=\{mix\.source\} shop=\{mix\.shop\}/);
  assert.match(bridge, /product\.id === shop\.id/);
  assert.match(bridge, /product\.slug === shop\.slug/);
  assert.match(bridge, /product\.sizeName === shop\.format/);
  assert.match(bridge, /shopUrl\(`\/produits\/\$\{encodeURIComponent\(published\.slug\)\}`\)/);
  assert.match(bridge, /Fiche fabricant/);
  assert.match(bridge, /Non proposé au Shop/);
  assert.doesNotMatch(bridge, /price|stock|availableQuantity|Ajouter au panier/i);
  assert.doesNotMatch(selection, /Voir \{mix\.name\} chez Sybotanica/);
});
