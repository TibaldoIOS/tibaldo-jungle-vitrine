import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { botanicalHubLeafPlates } from "../lib/plants/botanical-hub-leaf-plates.ts";

const pilots = ["monstera", "anthurium", "philodendron", "alocasia"] as const;

test("the pilot is limited to the four Owner-approved hubs", () => {
  assert.deepEqual(Object.keys(botanicalHubLeafPlates).sort(), [...pilots].sort());
});

test("each plate contains six distinct canonical references", () => {
  for (const genus of pilots) {
    const plate = botanicalHubLeafPlates[genus];
    assert.ok(plate);
    assert.equal(plate.leaves.length, 6);
    assert.equal(new Set(plate.leaves.map((leaf) => leaf.canonicalRoute)).size, 6);
    assert.ok(plate.altText.length > 50);
    const controlledAssetPath = plate.plateAsset.replace(/^\/media/, "");
    const asset = new URL(`../public${controlledAssetPath}`, import.meta.url);
    assert.ok(existsSync(asset), `${plate.plateAsset} must exist locally`);
    assert.ok(statSync(asset).size > 100_000, `${plate.plateAsset} must retain useful detail`);
    assert.ok(statSync(asset).size < 400_000, `${plate.plateAsset} must remain web-sized`);
    for (const leaf of plate.leaves) {
      const [, section, routeGenus, slug] = leaf.canonicalRoute.split("/");
      assert.equal(section, "plantes");
      assert.equal(routeGenus, genus);
      const canonical = plants.find((plant) => plant.genre === genus && plant.slug === slug);
      assert.ok(canonical, `${leaf.canonicalRoute} must exist in the canonical registry`);
      assert.equal(canonical.botanicalName, leaf.botanicalName);
      assert.equal(leaf.identityStatus, "canonical-reference");
    }
  }
});

test("the generic hub component inserts the plate without replacing hero media", () => {
  const hub = readFileSync(new URL("../app/plantes/GoldenGenusHub.tsx", import.meta.url), "utf8");
  assert.match(hub, /<BotanicalHubLeafPlate data=\{leafPlate\}/);
  assert.match(hub, /firstGroupMedia\(genre, plants\)/);
  assert.match(hub, /<Image unoptimized src=\{media\.src\}/);
  const component = readFileSync(new URL("../app/plantes/BotanicalHubLeafPlate.tsx", import.meta.url), "utf8");
  assert.match(component, /data-botanical-hub-leaf-plate/);
  assert.match(component, /<Image className=\{styles\.plateImage\}/);
  assert.doesNotMatch(component, /<svg|<path/);
});
