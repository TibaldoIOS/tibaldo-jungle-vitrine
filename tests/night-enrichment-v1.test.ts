import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants, getPlant } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { nightMediaSafetyRegistry } from "../lib/plants/night-media-safety-v1.ts";
import { verifiedGroupMediaByGenre } from "../lib/plants/verified-group-media.ts";

const certifiedMediaInventory = JSON.parse(
  readFileSync("reports/species-media-inventory-after-expansion-v1.json", "utf8"),
) as {
  after: {
    species: number;
    realMediaSpecies: number;
    mediaGapSpecies: number;
  };
};

test("night media safety removes exactly the two unsafe documentary renderings", () => {
  assert.equal(nightMediaSafetyRegistry.length, 2);
  assert.deepEqual(nightMediaSafetyRegistry.map(({ classification }) => classification).sort(), ["PHOTO_DOUBTFUL", "PHOTO_WRONG"]);
  for (const decision of nightMediaSafetyRegistry) {
    const [, , genre, slug] = decision.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, decision.route);
    assert.equal(documentaryGallery(plant).length, 0, decision.route);
    assert.equal(plant.gallery[0].license?.status, "media-gap", decision.route);
  }
});

test("seven group heroes reuse only locally available, proven assets", () => {
  assert.deepEqual(Object.keys(verifiedGroupMediaByGenre).sort(), ["cactus", "ensete", "epipremnum", "fatsia", "peperomia", "philodendron", "pilea"]);
  for (const media of Object.values(verifiedGroupMediaByGenre)) {
    assert.equal(media.rights, "verified");
    assert.equal(media.license?.status, "verified");
    assert.ok(media.license?.sourceUrl?.startsWith("https://"));
    assert.ok(media.license?.licenseUrl?.startsWith("https://"));
    assert.equal(existsSync(`public${media.src}`), true, media.src);
  }
});

test("group documentary media is composited above the opaque hero surface", () => {
  const css = readFileSync("app/plantes/GoldenGroupHeroBaseline.module.css", "utf8");
  assert.match(css, /\.landscapeMedia\s*\{[^}]*z-index:\s*0/);
  assert.match(css, /\.forestFade\s*\{[^}]*z-index:\s*1/);
  assert.doesNotMatch(css, /\.landscapeMedia\s*\{[^}]*z-index:\s*-/);
});

test("species media inventory is deterministic after safety closure", () => {
  const counts = { complete: 0, partial: 0, gap: 0 };
  for (const plant of plants) {
    const count = documentaryGallery(plant).length;
    if (count >= 3) counts.complete += 1;
    else if (count) counts.partial += 1;
    else counts.gap += 1;
  }
  assert.equal(plants.length, certifiedMediaInventory.after.species);
  assert.deepEqual(counts, { complete: 2, partial: 69, gap: 25 });
  assert.equal(certifiedMediaInventory.after.realMediaSpecies, 35, "report remains the historical pre-wave baseline");
  assert.equal(certifiedMediaInventory.after.mediaGapSpecies, 61, "report remains the historical pre-wave baseline");
});

test("Bananiers hub composes Musa and Ensete instead of querying a nonexistent genus", () => {
  const source = readFileSync("app/plantes/[genre]/page.tsx", "utf8");
  assert.match(source, /genre === "bananiers"/);
  assert.match(source, /\["musa", "ensete"\]\.flatMap/);
});

test("Plant Explorer never promotes a placeholder as a documentary image", () => {
  const page = readFileSync("app/plantes/page.tsx", "utf8");
  const explorer = readFileSync("app/plantes/PlantExplorer.tsx", "utf8");
  assert.match(page, /documentaryGallery\(plant\)\[0\]/);
  assert.match(explorer, /plant-search-media-gap/);
});
