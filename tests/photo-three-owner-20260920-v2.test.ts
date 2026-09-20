import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { getPlant, plantFamilies, plants } from "../lib/plants/catalog.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const manifest = JSON.parse(
  readFileSync(
    new URL(
      "../docs/media-provenance/photo-20260920-three-02.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const identities = [
  ["monstera", "obliqua"],
  ["cactus", "echinocactus-grusonii"],
  ["ficus", "abidjan"],
] as const;

test("three Owner photos map to exact canonical entities, WebP bytes and API", () => {
  identities.forEach(([genre, slug], index) => {
    const plant = getPlant(genre, slug)!;
    const photo = manifest.photos[index];
    assert.ok(plant, `${genre}/${slug}`);
    assert.equal(
      plants.filter((p) => p.genre === genre && p.slug === slug).length,
      1,
    );
    assert.equal(plant.gallery[0].src, photo.public_path);
    assert.equal(plant.gallery[0].alt, photo.alt);
    assert.equal(plant.gallery[0].license?.status, "verified");
    assert.equal(plant.gallery[0].license?.creator, "TIBALDO");
    const bytes = readFileSync(
      new URL(`../public${photo.asset_path}`, import.meta.url),
    );
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.equal(bytes.byteLength, photo.bytes);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      photo.sha256,
    );
    const api = toVerifiedMediaApiFields(plant, "photo-wave-test");
    assert.equal(api.primary_media_url, photo.api_url);
    assert.equal(api.primary_media_alt, photo.alt);
  });
});

test("three Owner photos are used on their public family cards", () => {
  assert.equal(
    plantFamilies.find((f) => f.slug === "monstera")?.image,
    manifest.photos[0].public_path,
  );
  assert.equal(
    plantFamilies.find((f) => f.slug === "cactus")?.image,
    manifest.photos[1].public_path,
  );
  assert.equal(
    plantFamilies.find((f) => f.slug === "ficus")?.image,
    manifest.photos[2].public_path,
  );
});

test("new views preserve the prior verified Owner media as secondary", () => {
  assert.match(
    getPlant("monstera", "obliqua")!.gallery[1].src,
    /monstera-obliqua-feuilles-fenestrees\.webp$/,
  );
  assert.match(
    getPlant("ficus", "abidjan")!.gallery[1].src,
    /ficus-elastica-abidjan-feuillage-sombre\.webp$/,
  );
});
