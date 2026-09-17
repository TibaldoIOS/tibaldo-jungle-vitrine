import assert from "node:assert/strict";
import test from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { toPlantApiV1 } from "../lib/plants/api-contract.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const expected = [
  ["strelitzia", "alba", "/media/owner-media/strelitzia-alba/"],
  ["anthurium", "silver-blush", "/media/owner-media/anthurium-silver-blush/"],
  ["ficus", "abidjan", "/media/owner-media/ficus-elastica-abidjan/"],
  ["alocasia", "platinum", "/media/owner-media/alocasia-platinum/"],
  ["musa", "basjoo", "/media/documentary-media/musa-basjoo/"],
  ["olea", "europaea", "/media/documentary-media/olea-europaea/"],
  ["asplenium", "scolopendrium", "/media/documentary-media/asplenium-scolopendrium/"],
  ["tetrapanax", "papyrifer", "/media/documentary-media/tetrapanax-papyrifer/"],
] as const;

test("les nouveaux médias vérifiés utilisent la route publique à MIME contrôlé", () => {
  for (const [genre, slug, prefix] of expected) {
    const plant = getPlant(genre, slug)!;
    assert.ok(plant, `${genre}/${slug}`);
    const v1 = toPlantApiV1(plant);
    const verified = toVerifiedMediaApiFields(plant, "mime-contract-test");
    assert.ok(new URL(v1.imageUrl).pathname.startsWith(prefix), v1.imageUrl);
    assert.ok(new URL(verified.primary_media_url!).pathname.startsWith(prefix), verified.primary_media_url!);
  }
});
