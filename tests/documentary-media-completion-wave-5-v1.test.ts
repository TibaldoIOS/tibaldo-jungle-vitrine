import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { plants } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { documentaryMediaWave5V1Registry } from "../lib/plants/documentary-media-completion-wave-5-v1.ts";
import { verifiedGroupMediaByGenre } from "../lib/plants/verified-group-media.ts";

test("Wave 5 accepts only exact, attributed species media", () => {
  assert.equal(documentaryMediaWave5V1Registry.length, 2);
  for (const record of documentaryMediaWave5V1Registry) {
    const [, , genre, slug] = record.route.split("/");
    const plant = plants.find((item) => item.genre === genre && item.slug === slug);
    assert.ok(plant, record.route);
    const image = documentaryGallery(plant)[0];
    assert.equal(image?.license?.status, "verified");
    assert.ok(image.license.creator);
    assert.ok(image.license.sourceUrl?.startsWith("https://"));
    assert.ok(fs.existsSync(path.join(process.cwd(), "public", image.src)));
  }
});

test("Wave 5 hub heroes are verified progressive enhancement", () => {
  for (const genre of ["agave", "equisetum", "maranta"] as const) {
    const image = verifiedGroupMediaByGenre[genre];
    assert.equal(image?.rights, "verified");
    assert.equal(image?.license?.status, "verified");
    assert.ok(fs.existsSync(path.join(process.cwd(), "public", image.src)));
  }
});

test("quality firewall preserves uncertain and prior decision gaps", () => {
  for (const [genre, slug] of [["monstera","standleyana"],["monstera","esqueleto"],["ensete","ventricosum-maurelii"]]) {
    const plant = plants.find((item) => item.genre === genre && item.slug === slug);
    assert.ok(plant);
    assert.equal(documentaryGallery(plant).length, 0, `${genre}/${slug}`);
  }
  assert.equal(documentaryMediaWave5V1Registry.some(({ route }) => route === "/plantes/colocasia/esculenta-eddo"), false);
  assert.ok(documentaryGallery(plants.find((item) => item.genre === "alocasia" && item.slug === "portei")!).length > 0);
});

test("Wave 5 totals preserve the 96-species contract", () => {
  assert.equal(plants.length, 96);
  assert.equal(plants.filter((plant) => documentaryGallery(plant).length > 0).length, 73);
  assert.equal(plants.filter((plant) => documentaryGallery(plant).length === 0).length, 23);
});
