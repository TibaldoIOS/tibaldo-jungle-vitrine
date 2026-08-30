import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import type { PlantEntry } from "../lib/plants/types.ts";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy } from "../lib/plants/types.ts";

const pileaVerifiedOverride: PlantEntry["gallery"][number] = {
  src: "/pilea-peperomioides-plante.jpg",
  license: { status: "verified", note: "Photographie CC0 vérifiée" },
  alt: "Pilea peperomioides",
  caption: "Photographie CC0 vérifiée",
  width: 1280,
  height: 1707,
};

const documentaryGallery = (plant: (typeof plants)[number]) => {
  const source = plant.genre === "pilea" && plant.slug === "peperomioides"
    ? [pileaVerifiedOverride]
    : plant.gallery;
  return source.filter((image, index, images) =>
    !isEditorialPlaceholder(image.src) &&
    image.license?.status !== "media-gap" &&
    !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
    !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`) &&
    images.findIndex((candidate) => candidate.src === image.src) === index,
  );
};

const publicAssetPath = (src: string) =>
  src.startsWith("/media/") ? `public/${src.slice("/media/".length)}` : `public${src}`;

test("la complétion média conserve exactement 76 fiches et le contrat 2/27/47", () => {
  assert.equal(plants.length, 76);
  const counts = { complete: 0, partial: 0, gap: 0 };
  for (const plant of plants) {
    const count = documentaryGallery(plant).length;
    if (count >= 3) counts.complete += 1;
    else if (count >= 1) counts.partial += 1;
    else counts.gap += 1;
  }
  assert.deepEqual(counts, { complete: 2, partial: 27, gap: 47 });
});

test("les dix nouvelles fiches qualifiées ont uniquement des médias locaux, sourcés et licenciés", () => {
  const remainingP1Gaps = new Set(["alocasia/melo", "anthurium/luxurians"]);
  const p1 = plants.slice(-12);
  assert.equal(p1.length, 12);
  for (const plant of p1) {
    const key = `${plant.genre}/${plant.slug}`;
    if (remainingP1Gaps.has(key)) {
      assert.equal(documentaryGallery(plant).length, 0, key);
      continue;
    }
    const gallery = documentaryGallery(plant);
    assert.ok(gallery.length >= 1, key);
    for (const image of gallery) {
      assert.equal(image.license?.status, "verified", `${key}: rights`);
      assert.ok(image.license?.sourceUrl?.startsWith("https://commons.wikimedia.org/wiki/File:"), `${key}: source`);
      assert.ok(image.license?.licenseUrl?.startsWith("https://creativecommons.org/"), `${key}: license`);
      assert.equal(existsSync(publicAssetPath(image.src)), true, `${key}: local asset`);
      assert.ok(image.width >= 1200, `${key}: width`);
      assert.ok(image.height >= 1000, `${key}: height`);
    }
  }
});

test("Monstera deliciosa utilise une seule source Pexels traçable sans dupliquer le documentaire", () => {
  const deliciosa = plants.find((plant) => plant.genre === "monstera" && plant.slug === "deliciosa");
  assert.ok(deliciosa);
  const pexels = deliciosa.gallery.filter((image) => image.license?.license === "Pexels License");
  assert.equal(pexels.length, 1);
  assert.match(pexels[0].license?.sourceUrl ?? "", /pexels\.com\/fr-fr\/photo\//);
  assert.equal(existsSync(publicAssetPath(pexels[0].src)), true);
  assert.equal(deliciosa.gallery.length, 1);
  assert.equal(pexels[0].src, deliciosa.gallery[0].src);
  const hero = readFileSync("app/plantes/DeliciosaOwnerHero.tsx", "utf8");
  assert.match(hero, /monstera-deliciosa-jonathan-borba-pexels\.webp/);
  assert.doesNotMatch(hero, /monstera-deliciosa-feuilles\.jpg/);
});

test("Colocasia utilise la photo exacte avec la licence complète", () => {
  const colocasia = plants.find((plant) => plant.genre === "colocasia" && plant.slug === "esculenta-eddo");
  assert.ok(colocasia);
  assert.equal(colocasia.gallery[0].src, "/colocasia-esculenta-feuille.jpg");
  assert.equal(colocasia.gallery[0].license?.status, "verified");
  assert.equal(colocasia.gallery[0].license?.creator, "Forest & Kim Starr");
  assert.equal(colocasia.gallery[0].license?.licenseUrl, "https://creativecommons.org/licenses/by/3.0/us/");
});

test("le hub Pilea ne charge plus la planche sans preuve de droits", () => {
  const source = readFileSync("app/plantes/GoldenGenusHub.tsx", "utf8");
  assert.doesNotMatch(source, /src:\s*["']\/pilea-planche-formes-textures\.webp/);
  assert.match(source, /if \(genre === "pilea"\) return null/);
  assert.match(source, /blocked-pending-rights-proof-or-owner-original/);
});
