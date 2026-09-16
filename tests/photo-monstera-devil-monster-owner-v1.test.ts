import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { getPlant, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const manifest = JSON.parse(readFileSync(new URL("../docs/media-provenance/photo-20260916-monstera-devil-monster-01.json", import.meta.url), "utf8"));
const photo = manifest.photos[0];

test("Devil Monster has one canonical Owner identity and exact served media", () => {
  const matches = getPlantsByGenre("monstera").filter((plant) => plant.slug === "devil-monster");
  assert.equal(matches.length, 1);
  const plant = getPlant("monstera", "devil-monster")!;
  assert.equal(plant.botanicalName, "Monstera deliciosa ‘Devil Monster’");
  assert.equal(plant.taxonomy.cultivar, null);
  assert.equal(plant.gallery.length, 1);
  assert.equal(plant.gallery[0].src, photo.public_path);
  assert.equal(plant.gallery[0].alt, photo.alt);
  assert.equal(plant.gallery[0].caption, "Photo : TIBALDO");
  assert.equal(plant.gallery[0].license?.creator, "TIBALDO");
  const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  assert.equal(createHash("sha256").update(bytes).digest("hex"), photo.sha256);
  const api = toVerifiedMediaApiFields(plant, "photo-devil-monster-test");
  assert.equal(api.primary_media_url, photo.api_url);
  assert.equal(api.primary_media_alt, photo.alt);
  assert.equal(api.primary_media_creator, "TIBALDO");
  const page = readFileSync(new URL("../app/plantes/monstera/devil-monster/page.tsx", import.meta.url), "utf8");
  assert.match(page, /monstera-deliciosa-devil-monster-feuille-panachee\.webp/);
  assert.match(page, /Photo : TIBALDO/);
  assert.match(page, /data-arch-contract="owner-devil-monster-v1"/);
});
