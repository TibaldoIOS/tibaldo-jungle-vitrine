import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { getPlant, plantFamilies } from "../lib/plants/catalog.ts";
import { mediaRightsP0ClosureRegistry } from "../lib/plants/media-rights-p0-closure-v1.ts";
import type { PlantEntry } from "../lib/plants/types.ts";

const removedAssets = [
  "/anthurium-pallidiflorum-cascade.webp",
  "/asparagus-setaceus-plumosus.jpg",
  "/epipremnum-marble-queen.webp",
  "/disocactus-anguliger-cactus-zigzag.webp",
  "/monstera-thai-constellation-planche-botanique.webp",
  "/monstera-mint-planche-botanique.webp",
  "/monstera-adansonii-monkey-mask.webp",
  "/anthurium-delta-force-triangulaire.webp",
];

const ownerReplacements = new Map([
  ["/plantes/philodendron/billietiae", "owner-provided://tibaldo/photo-20260914-billietiae-01/billietiae"],
  ["/plantes/monstera/thai-constellation", "owner-provided://tibaldo/monstera-thai-constellation-2026-09-05"],
  ["/plantes/monstera/mint", "owner-provided://tibaldo/monstera-mint-2026-09-05"],
  ["/plantes/epipremnum/marble-queen", "owner-provided://tibaldo/marble-queen-2026-09-08"],
  ["/plantes/anthurium/delta-force", "owner-provided://tibaldo/photo-20260911-delta-01/delta-force"],
]);

function assertCurrentRights(route: string, gallery: PlantEntry["gallery"]) {
  assert.ok(gallery.length > 0, route);
  assert.equal(new Set(gallery.map(image => image.src.replace(/^\/media\//, "/"))).size, gallery.length, `${route}: no duplicate media`);
  if (gallery.some(image => image.license?.status === "media-gap")) {
    assert.equal(gallery.length, 1, `${route}: no placeholder mixed with photos`);
    assert.equal(gallery[0].src, "/photo-reelle-a-venir.svg");
    assert.ok(gallery[0].license?.note);
    return;
  }
  for (const image of gallery) {
    assert.ok(!removedAssets.includes(image.src.replace(/^\/media\//, "/")), `${route}: retired asset`);
    const license = image.license;
    assert.equal(license?.status, "verified", `${route}: verified rights`);
    assert.ok(license?.creator && license.license && license.sourceUrl && license.note, `${route}: complete evidence`);
    assert.equal(license.registryPath, "/credits-images");
    assert.ok(image.alt && image.width > 0 && image.height > 0);
    assert.ok(existsSync(`public${image.src.replace(/^\/media\//, "/")}`), `${route}: file exists`);
    if (license.sourceUrl.startsWith("owner-provided://")) {
      assert.equal(license.sourceUrl, ownerReplacements.get(route), `${route}: explicit approved replacement`);
      assert.equal(license.creator, "TIBALDO");
      assert.match(license.license, /confirmés|confirmée/);
      assert.match(license.note, /Owner/);
    } else {
      assert.match(license.sourceUrl, /^https:\/\//);
      if (route !== "/plantes/anthurium/pallidiflorum") assert.match(license.licenseUrl ?? "", /^https:\/\//);
      assert.match(license.note, /Preuve contrôlée/);
    }
  }
}

test("closes the exact 11-route P0 media-rights set", () => {
  assert.equal(mediaRightsP0ClosureRegistry.length, 11);
  assert.equal(mediaRightsP0ClosureRegistry.filter(({ decision }) => decision === "RIGHTS_PROVEN_KEEP").length, 5);
  assert.equal(mediaRightsP0ClosureRegistry.filter(({ decision }) => decision === "REMOVE_AND_USE_HONEST_MEDIA_GAP").length, 6);

  for (const item of mediaRightsP0ClosureRegistry) {
    const [, , genre, slug] = item.route.split("/");
    const plant = getPlant(genre, slug);
    assert.ok(plant, item.route);
    assertCurrentRights(item.route, plant.gallery);
    if (item.decision === "RIGHTS_PROVEN_KEEP" || ownerReplacements.has(item.route)) {
      assert.ok(plant.gallery.every(image => image.license?.status === "verified"), `${item.route}: preserve approved photography`);
    }
  }
});

test("Marble Queen active derivatives match the exact Owner evidence, not a frozen count", () => {
  const proof = JSON.parse(readFileSync("docs/media-provenance/marble-queen-owner-2026-09-08.json", "utf8"));
  assert.equal(proof.canonicalSlug, "plantes/epipremnum/marble-queen");
  assert.equal(proof.creator, "TIBALDO");
  assert.match(proof.rightsEvidence, /explicitly authorizes reuse/);
  for (const image of getPlant("epipremnum", "marble-queen")!.gallery) {
    const records = proof.files.filter((record: {file: string}) => record.file === `work/jungle/public${image.src}`);
    assert.equal(records.length, 1, image.src);
    const record = records[0];
    assert.equal(createHash("sha256").update(readFileSync(`public${image.src}`)).digest("hex"), record.sha256);
    assert.equal(image.width, record.width);
    assert.equal(image.height, record.height);
  }
});

test("rights guard rejects missing proof, duplicate photos and mixed placeholders", () => {
  const route = "/plantes/epipremnum/marble-queen";
  const image = getPlant("epipremnum", "marble-queen")!.gallery[0];
  assert.throws(() => assertCurrentRights(route, [{ ...image, license: undefined }]));
  assert.throws(() => assertCurrentRights(route, [{ ...image, license: { ...image.license!, sourceUrl: "owner-provided://unproven" } }]));
  assert.throws(() => assertCurrentRights(route, [image, image]));
  assert.throws(() => assertCurrentRights(route, [image, getPlant("asparagus", "plumosus")!.gallery[0]]));
});

test("restores Pallidiflorum from the exact Owner-authorized URL without the stale asset", () => {
  const plant = getPlant("anthurium", "pallidiflorum");
  assert.ok(plant);
  assert.equal(plant.gallery.length, 1);
  assert.equal(plant.gallery[0].src, "/media/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp");
  assert.equal(plant.gallery[0].alt, "Anthurium pallidiflorum aux longues feuilles rubanées et retombantes");
  assert.equal(plant.gallery[0].width, 1080);
  assert.equal(plant.gallery[0].height, 1080);
  assert.equal(plant.gallery[0].license?.status, "verified");
  assert.equal(plant.gallery[0].license?.sourceUrl, "https://www.driftlessbotanicals.net/wp-content/uploads/2024/12/Anth-Pallidiflorum.jpeg");
  assert.match(plant.gallery[0].license?.license ?? "", /Owner TIBALDO/);
  assert.doesNotMatch(JSON.stringify(plant), /anthurium-pallidiflorum-cascade\.webp/);
});

test("does not expose removed rights-unknown assets through canonical plant or group data", () => {
  const familyGuideSource = readFileSync(new URL("../lib/plants/family-guides.ts", import.meta.url), "utf8");
  const renderedData = JSON.stringify({
    affectedPlants: mediaRightsP0ClosureRegistry.map(({ route }) => {
      const [, , genre, slug] = route.split("/");
      return getPlant(genre, slug);
    }),
    plantFamilies,
    familyGuideSource,
  });
  for (const asset of removedAssets) assert.doesNotMatch(renderedData, new RegExp(asset.replaceAll("/", "\\/")), asset);
});

test("preserves representative verified V35 media outside the P0 set", () => {
  for (const [genre, slug] of [
    ["monstera", "deliciosa"],
    ["alocasia", "tandurusa"],
    ["anthurium", "wendlingeri"],
    ["sansevieria", "trifasciata"],
  ]) {
    const plant = getPlant(genre, slug);
    assert.ok(plant, `${genre}/${slug}`);
    assert.ok(plant.gallery.some((image) => image.license?.status === "verified"), `${genre}/${slug}`);
  }
});
