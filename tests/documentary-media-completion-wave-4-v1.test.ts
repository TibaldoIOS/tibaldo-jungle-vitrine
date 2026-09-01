import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { documentaryMediaWave4V1Registry } from "../lib/plants/documentary-media-completion-wave-4-v1.ts";
import { verifiedGroupMediaByGenre } from "../lib/plants/verified-group-media.ts";

test("Wave 4 registers four exact species photographs with complete rights", () => {
  assert.equal(documentaryMediaWave4V1Registry.length, 4);
  for (const record of documentaryMediaWave4V1Registry) {
    const [, , genre, slug] = record.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, record.route);
    const image = documentaryGallery(plant)[0];
    assert.ok(image, record.route);
    assert.equal(image.license?.status, "verified");
    assert.match(record.source, /^https:\/\//);
    assert.match(image.license?.licenseUrl ?? "", /^https:\/\//);
    assert.equal(existsSync(`public${record.localFile}`), true);
  }
});

test("Wave 4 accepts only two strong genus heroes and leaves family gaps honest", () => {
  for (const genre of ["fatsia", "ensete"]) {
    const image = verifiedGroupMediaByGenre[genre];
    assert.ok(image, genre);
    assert.equal(image.license?.status, "verified");
    assert.equal(existsSync(`public${image.src}`), true);
  }
  for (const family of ["araceae", "asparagaceae", "musaceae"]) {
    assert.equal(verifiedGroupMediaByGenre[family], undefined);
  }
});

test("Chlorophytum species and cultivar identities stay structurally distinct", () => {
  const comosum = getPlant("chlorophytum", "comosum");
  assert.ok(comosum);
  assert.equal(comosum.taxonomy.species, "Chlorophytum comosum");
  assert.equal(comosum.taxonomy.cultivar ?? null, null);
});
