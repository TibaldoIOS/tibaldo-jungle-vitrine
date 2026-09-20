import assert from "node:assert/strict";
import test from "node:test";
import { getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";

test("publie la fiche exacte Platycerium bifurcatum avec le visuel Owner déclaré", () => {
  const plant = getPlant("platycerium", "bifurcatum");
  assert.ok(plant);
  assert.equal(plant.botanicalName, "Platycerium bifurcatum");
  assert.equal(plant.family, "Polypodiaceae");
  assert.match(plant.specimen.observedHeight, /H50 cm × 60 cm d’envergure/);
  assert.match(plant.specimen.observedHeight, /Ø20 × H20 cm/);
  assert.equal(plant.gallery[0]?.width, 1536);
  assert.equal(plant.gallery[0]?.height, 1024);
  assert.match(plant.gallery[0]?.caption ?? "", /mise en scène assistée par IA/);
  assert.equal(plant.mediaNeeds?.length, 0);
});

test("rattache le Platycerium au regroupement public des fougères", () => {
  assert.ok(getPlantsByGenre("fougeres").some((plant) => plant.botanicalName === "Platycerium bifurcatum"));
});
