import assert from "node:assert/strict";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";

const getPlant = (id: string) => plants.find((plant) => `${plant.genre}/${plant.slug}` === id);

test("Calathea orbifolia reste rattachée à Goeppertia et aux Marantaceae", () => {
  const plant = getPlant("calathea/orbifolia");
  assert.ok(plant);
  assert.equal(plant.botanicalName, "Goeppertia orbifolia");
  assert.equal(plant.taxonomy.genus, "Goeppertia");
  assert.equal(plant.taxonomy.family, "Marantaceae");
  assert.equal(plant.titlePrefix, "Calathea orbifolia —");
  assert.equal(plant.listingName, "Calathea orbifolia — Goeppertia orbifolia");
  assert.ok(plant.taxonomy.commonNames.includes("Calathea orbifolia"));
});

test("Echinocactus garde son identité botanique sous le repère Cactus", () => {
  const plant = getPlant("cactus/echinocactus-grusonii");
  assert.ok(plant);
  assert.equal(plant.botanicalName, "Echinocactus grusonii");
  assert.equal(plant.taxonomy.genus, "Echinocactus");
  assert.equal(plant.taxonomy.family, "Cactaceae");
  assert.equal(plant.titlePrefix, "Cactus —");
  assert.equal(plant.listingName, "Cactus — Echinocactus grusonii");
  assert.ok(plant.taxonomy.commonNames.includes("Cactus"));
});

test("Calathea et Cactus ne deviennent pas de fausses familles botaniques", () => {
  assert.equal(plants.some((plant) => plant.taxonomy.family === "Calathea"), false);
  assert.equal(plants.some((plant) => plant.taxonomy.family === "Cactus"), false);
});
