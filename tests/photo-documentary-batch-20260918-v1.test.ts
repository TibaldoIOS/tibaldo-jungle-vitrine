import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getPlant } from "../lib/plants/catalog.ts";
import { toPlantApiV1 } from "../lib/plants/api-contract.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260918-documentary-batch-02.json", import.meta.url), "utf8"));

test("documentary batch 02 links exact cultivars, rights and WebP derivatives", () => {
  for (const photo of manifest.photos) {
    const [, genre, slug] = photo.canonical_slug.split("/");
    const plant = getPlant(genre, slug)!;
    assert.ok(plant, photo.canonical_slug);
    const media = plant.gallery[0];
    assert.equal(media.src, photo.public_path);
    assert.equal(media.alt, photo.alt);
    assert.equal(media.license?.creator, photo.creator);
    assert.equal(media.license?.license, photo.license);
    assert.equal(media.license?.licenseUrl, photo.license_url);
    assert.equal(media.license?.sourceUrl, photo.source_page_url);
    assert.equal(media.license?.status, "verified");
    assert.equal(plant.mediaNeeds?.length ?? 0, 0);

    const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.equal(bytes.byteLength, photo.bytes);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), photo.sha256);

    assert.equal(toPlantApiV1(plant).imageUrl, photo.api_url);
    assert.equal(toVerifiedMediaApiFields(plant, "documentary-batch-02-test").primary_media_url, photo.api_url);
  }
});
