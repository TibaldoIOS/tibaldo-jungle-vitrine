import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";
import { getPlant, plants } from "../lib/plants/catalog.ts";
import { mediaRegistryVersionFor, toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const plant = getPlant("anthurium", "pallidiflorum");
assert.ok(plant);
const image = plant.gallery[0];
const asset = new URL(`../public${image.src}`, import.meta.url);

test("Pallidiflorum uses the exact controlled Owner-authorized WebP", () => {
  assert.equal(image.src, "/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp");
  assert.equal(image.alt, "Anthurium pallidiflorum aux longues feuilles rubanées et retombantes");
  assert.equal(image.width, 1080);
  assert.equal(image.height, 1080);
  assert.equal(image.license?.status, "verified");
  assert.equal(image.license?.sourceUrl, "https://www.driftlessbotanicals.net/wp-content/uploads/2024/12/Anth-Pallidiflorum.jpeg");
  assert.ok(existsSync(asset));
  assert.ok(statSync(asset).size < 208_618);
  assert.equal(readFileSync(asset).subarray(8, 12).toString("ascii"), "WEBP");
});

test("strict Jungle media API resolves Pallidiflorum by exact canonical identity", () => {
  const contract = toVerifiedMediaApiFields(plant, mediaRegistryVersionFor(plants));
  assert.equal(contract.identity_status, "EXACT_CANONICAL_IDENTITY");
  assert.equal(contract.media_status, "VERIFIED_MEDIA");
  assert.equal(contract.primary_media_url, `${process.env.NEXT_PUBLIC_JUNGLE_ORIGIN}/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp`);
  assert.equal(contract.primary_media_alt, image.alt);
  assert.equal(contract.primary_media_source_url, image.license?.sourceUrl);
});

test("species metadata and structured-data code consume the canonical gallery", () => {
  const routeSource = readFileSync(new URL("../app/plantes/[genre]/[slug]/page.tsx", import.meta.url), "utf8");
  const heroSource = readFileSync(new URL("../app/plantes/PlantSpeciesHero.tsx", import.meta.url), "utf8");
  assert.match(routeSource, /const image = plant\.gallery\.find\(isDocumentaryImage\)/);
  assert.match(routeSource, /image: gallery\.map/);
  assert.match(routeSource, /"@type": "ImageObject"/);
  assert.match(heroSource, /src=\{image\.src\}/);
  assert.match(heroSource, /alt=\{image\.alt\}/);
});
