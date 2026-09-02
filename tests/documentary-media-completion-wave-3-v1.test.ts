import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { getPlant, plants } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { documentaryMediaWave3V1Registry } from "../lib/plants/documentary-media-completion-wave-3-v1.ts";
import { verifiedGroupMediaByGenre } from "../lib/plants/verified-group-media.ts";

test("Wave 3 publishes ten exact documentary photographs with complete rights evidence", () => {
  assert.equal(documentaryMediaWave3V1Registry.length, 10);
  for (const record of documentaryMediaWave3V1Registry) {
    const [, , genre, slug] = record.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, record.route);
    const media = documentaryGallery(plant)[0];
    assert.ok(media, record.route);
    assert.equal(media.license?.status, "verified", record.route);
    assert.equal(media.license?.registryPath, "/credits-images", record.route);
    assert.match(media.license?.sourceUrl ?? "", /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, record.route);
    assert.match(media.license?.licenseUrl ?? "", /^https:\/\/creativecommons\.org\//, record.route);
    assert.ok(media.width >= 1200 && media.height >= 1000, record.route);
    const path = `public${record.mediaFile}`;
    assert.equal(existsSync(path), true, path);
    assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), record.sha256, path);
    assert.equal(record.identityConfidence, "high");
    assert.equal(record.rightsConfidence, "high");
  }
});

test("later waves and the Owner-authorized Pallidiflorum restore reduce honest gaps to 21", () => {
  const gaps = plants.filter((plant) => documentaryGallery(plant).length === 0);
  assert.equal(plants.length, 96);
  assert.equal(gaps.length, 21);
  assert.equal(plants.length - gaps.length, 75);
  for (const [genre, slug] of [
    ["monstera", "esqueleto"],
    ["monstera", "thai-constellation"],
    ["monstera", "mint"],
    ["monstera", "burle-marx-flame"],
    ["anthurium", "delta-force"],
    ["anthurium", "papillilaminum-dark-phoenix"],
    ["alocasia", "imperial-red"],
    ["philodendron", "royal-queen"],
    ["musa", "florida-variegata"],
  ]) {
    const plant = getPlant(genre, slug);
    assert.ok(plant, `${genre}/${slug}`);
    assert.equal(documentaryGallery(plant).length, 0, `${genre}/${slug}`);
  }
});

test("Philodendron hub hero is a proven, natural landscape source", () => {
  const media = verifiedGroupMediaByGenre.philodendron;
  assert.ok(media);
  assert.equal(media.rights, "verified");
  assert.ok(media.width > media.height);
  assert.equal(media.license?.status, "verified");
  assert.match(media.license?.sourceUrl ?? "", /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
});

test("ScrollReveal re-observes route content after client navigation", () => {
  const source = readFileSync("app/ScrollReveal.tsx", "utf8");
  assert.match(source, /new MutationObserver/);
  assert.match(source, /mutation\.addedNodes\.forEach\(registerWithin\)/);
  assert.match(source, /mutationObserver\.observe\(document\.body, \{ childList: true, subtree: true \}\)/);
  assert.match(source, /registered = new WeakSet<HTMLElement>/);
  assert.match(source, /element\.classList\.add\("is-visible"\)/);
  const styles = readFileSync("app/globals.css", "utf8");
  assert.match(styles, /\.reveal-ready \.plants-library-page \[data-reveal\]/);
  assert.match(styles, /opacity:\s*1;[\s\S]*?filter:\s*none;[\s\S]*?transform:\s*none;/);
});
