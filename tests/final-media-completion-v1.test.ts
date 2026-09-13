import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { encyclopediaP1Plants } from "../lib/plants/encyclopedia-p1-expansion.ts";
import type { PlantEntry } from "../lib/plants/types.ts";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy } from "../lib/plants/types.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

// Approved attachment identities audited at 9ec136f, not a frozen population
// or complete/partial/gap census. New plants/photos are allowed; removing a
// protected attachment requires an explicit reviewed retirement, not silence.
const approvedAttachments: readonly (readonly [string, string])[] = [
  ["alocasia/imperial-red","/media/owner-media/alocasia-imperial-red/alocasia-imperial-red-feuillage-petioles-pourpres.webp"],
  ["anthurium/pallidiflorum","/media/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp"],
  ["anthurium/veitchii","/media/anthurium-veitchii-king.jpg"],
  ["philodendron/billietiae","/philodendron-billietiae-feuilles-ondulees.jpg"],
  ["philodendron/billietiae","/philodendron-billietiae-petioles-orange.jpg"],
  ["philodendron/billietiae","/philodendron-billietiae-revers-feuille.jpg"],
  ["pilea/peperomioides","/media/owner-media/pilea-peperomioides/pilea-peperomioides-plante-lumiere-fenetre.webp"],
  ["pilea/peperomioides","/owner-media/pilea-peperomioides/pilea-peperomioides-plante-tibaldo-1200.webp"],
  ["pilea/peperomioides","/owner-media/pilea-peperomioides/pilea-peperomioides-feuillage-tibaldo-1200.webp"],
  ["pilea/peperomioides","/owner-media/pilea-peperomioides/pilea-peperomioides-detail-tibaldo-1200.webp"],
  ["pilea/peperomioides","/pilea-peperomioides-plante.jpg"],
  ["epipremnum/marble-queen","/owner-media/marble-queen/epipremnum-marble-queen-plante-tibaldo-1200.webp"],
  ["epipremnum/marble-queen","/owner-media/marble-queen/epipremnum-marble-queen-detail-panachure-tibaldo-1200.webp"],
  ["epipremnum/marble-queen","/owner-media/marble-queen/epipremnum-marble-queen-vue-trois-quarts-tibaldo-1200.webp"],
  ["monstera/deliciosa","/media/final-media-v35/monstera-deliciosa-jonathan-borba-pexels.webp"],
  ["monstera/thai-constellation","/owner-media/monstera/monstera-thai-constellation-owner-2026-09.webp"],
  ["monstera/mint","/owner-media/monstera/monstera-mint-owner-2026-09.webp"],
  ["monstera/adansonii","/images/monstera-adansonii-plante-feuilles-perforees.jpg"],
  ["anthurium/delta-force","/media/owner-media/anthurium-delta-force/anthurium-delta-force-plante-en-pot.webp"],
  ["philodendron/melanochrysum","/philodendron-melanochrysum-real.jpg"],
  ["anthurium/regale","/media/owner-media/anthurium-regale/anthurium-regale-feuille-detail.webp"],
  ["anthurium/papillilaminum-dark-phoenix","/media/owner-media/anthurium-papillilaminum-dark-phoenix/anthurium-papillilaminum-dark-phoenix-plante-en-pot.webp"],
  ["anthurium/forgetii-dark-form-silver-blush","/media/owner-media/anthurium-forgetii-dark-form-silver-blush/anthurium-forgetii-dark-form-silver-blush-plante-en-pot.webp"],
  ["monstera/burle-marx-flame","/media/owner-media/monstera-burle-marx-flame/monstera-burle-marx-flame-plante-entiere.webp"],
  ["monstera/esqueleto","/media/owner-media/monstera-esqueleto/monstera-esqueleto-feuille-detail.webp"],
  ["monstera/esqueleto","/media/monstera-esqueleto-feuille-mature-fenestrations.webp"],
  ["colocasia/esculenta-eddo","/colocasia-esculenta-feuille.jpg"],
  ["monstera/dubia","/media/owner-media/monstera-dubia/monstera-dubia-plante-sur-planche.webp"],
  ["monstera/siltepecana","/media/owner-media/monstera-siltepecana/monstera-siltepecana-plante-en-suspension.webp"],
  ["monstera/obliqua","/media/owner-media/monstera-obliqua/monstera-obliqua-feuilles-fenestrees.webp"],
  ["monstera/pinnatipartita","/media/owner-media/monstera-pinnatipartita/monstera-pinnatipartita-plante-en-pot.webp"],
  ["monstera/standleyana","/media/owner-media/monstera-standleyana/monstera-standleyana-feuillage-panache.webp"],
  ["anthurium/crystallinum","/media/anthurium-crystallinum-feuille.jpg"],
  ["anthurium/magnificum","/media/owner-media/anthurium-magnificum/anthurium-magnificum-feuille-detail.webp"],
  ["anthurium/forgetii","/media/owner-media/anthurium-forgetii/anthurium-forgetii-feuillage-detail.webp"],
  ["anthurium/papillilaminum","/media/owner-media/anthurium-papillilaminum/anthurium-papillilaminum-plante-en-pot.webp"],
  ["alocasia/cuprea","/media/owner-media/alocasia-cuprea/alocasia-cuprea-feuillage-reflets-cuivres.webp"],
  ["alocasia/cuprea","/media/alocasia-cuprea-feuillage.jpg"],
  ["maranta/lemon-lime","/media/owner-media/maranta-lemon-lime/maranta-lemon-lime-feuillage-vue-dessus.webp"],
  ["anthurium/clarinervium","/images/anthurium-clarinervium-feuilles-veloutees-nervures-claires.jpg"],
  ["anthurium/warocqueanum","/media/owner-media/anthurium-warocqueanum/anthurium-warocqueanum-feuillage-en-serre.webp"],
  ["alocasia/tandurusa","/media/final-media-v35/alocasia-tandurusa-port.webp"],
  ["alocasia/tandurusa","/media/final-media-v35/alocasia-tandurusa-feuillage.webp"],
  ["alocasia/mortfontanensis-polly","/media/final-media-v35/alocasia-polly.webp"],
  ["anthurium/luxurians","/media/owner-media/anthurium-luxurians/anthurium-luxurians-feuilles-gaufrees.webp"],
  ["anthurium/wendlingeri","/media/final-media-v35/anthurium-wendlingeri-port.webp"],
  ["anthurium/wendlingeri","/media/final-media-v35/anthurium-wendlingeri-inflorescence.webp"],
  ["philodendron/hederaceum","/media/final-media-v35/philodendron-hederaceum-port.webp"],
  ["philodendron/hederaceum","/media/final-media-v35/philodendron-hederaceum-feuillage.webp"],
  ["philodendron/pink-princess","/media/final-media-v35/philodendron-pink-princess.webp"],
  ["monstera/albo-variegata","/media/final-media-v35/monstera-albo-variegata.webp"],
  ["ficus/elastica","/media/final-media-v35/ficus-elastica-port.webp"],
  ["ficus/elastica","/media/final-media-v35/ficus-elastica-feuille.webp"],
  ["hoya/carnosa","/media/final-media-v35/hoya-carnosa-port.webp"],
  ["hoya/carnosa","/media/final-media-v35/hoya-carnosa-fleurs.webp"],
  ["syngonium/podophyllum","/media/final-media-v35/syngonium-podophyllum-feuillage.webp"],
  ["syngonium/podophyllum","/media/final-media-v35/syngonium-podophyllum-port.webp"],
  ["sansevieria/trifasciata","/media/final-media-v35/dracaena-trifasciata-port.webp"],
  ["sansevieria/trifasciata","/media/final-media-v35/dracaena-trifasciata-jardin-botanique.webp"],
  ["sansevieria/black-diamond","/media/owner-media/sansevieria-black-diamond/dracaena-trifasciata-black-diamond-feuilles-detail.webp"],
  ["colocasia/metallica","/media/owner-media/colocasia-metallica/colocasia-metallica-feuillage-exterieur.webp"],
];

const canonicalPath = (src: string) => src.replace(/^\/media\//, "/");
const publicAssetPath = (src: string) => `public${canonicalPath(src)}`;

const documentaryGallery = (plant: PlantEntry) => plant.gallery.filter(image =>
  image.license?.status === "verified" &&
  !isEditorialPlaceholder(image.src) &&
  !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
  !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`)
);

function assertMediaContract(plant: PlantEntry) {
  const key = `${plant.genre}/${plant.slug}`;
  const paths = plant.gallery.map(image => canonicalPath(image.src));
  assert.equal(new Set(paths).size, paths.length, `${key}: duplicate attachment`);
  const photos = documentaryGallery(plant);
  const gaps = plant.gallery.filter(image => image.license?.status === "media-gap");
  if (gaps.length) {
    assert.equal(photos.length, 0, `${key}: no mixed photo/gap`);
    assert.equal(plant.gallery.length, 1, `${key}: one honest fallback`);
    assert.ok(isEditorialPlaceholder(gaps[0].src), `${key}: no photo labelled as gap`);
    assert.ok(gaps[0].license?.note, `${key}: documented gap`);
  }
  for (const image of plant.gallery.filter(image => image.license?.status === "verified")) {
    assert.ok(photos.includes(image), `${key}: illustration/placeholder cannot be verified photography`);
    const rights = image.license!;
    assert.ok(rights.creator && rights.license && rights.registryPath && rights.note, `${key}: rights evidence`);
    assert.equal(rights.registryPath, "/credits-images");
    // Legacy CC0 source is held in the existing public credits registry, not
    // fabricated by a test-only replacement image. Keep its exact attribution.
    if (key === "pilea/peperomioides" && image.src === "/pilea-peperomioides-plante.jpg" && !rights.sourceUrl) {
      assert.equal(rights.creator, "Husky");
      assert.equal(rights.license, "CC0 1.0");
      assert.equal(rights.licenseUrl, "https://creativecommons.org/publicdomain/zero/1.0/");
      assert.ok(readFileSync("app/credits-images/page.tsx", "utf8").includes('["Pilea peperomioides", "Husky", "CC0", "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg"]'));
    } else {
      assert.match(rights.sourceUrl ?? "", /^(https:\/\/|owner-provided:\/\/).+/);
    }
    assert.ok(existsSync(publicAssetPath(image.src)), `${key}: local media exists`);
    assert.ok(image.alt.trim() && image.width > 0 && image.height > 0, `${key}: accessible image geometry`);
  }
  const api = toVerifiedMediaApiFields(plant, "media-contract-test");
  assert.ok(["VERIFIED_MEDIA", "HONEST_MEDIA_GAP"].includes(api.media_status));
  // The API's strict primary-media contract also requires a source URL.
  const eligible = photos.filter(image => image.license?.sourceUrl);
  if (eligible.length) {
    assert.equal(api.media_status, "VERIFIED_MEDIA", `${key}: approved primary is discoverable`);
    assert.equal(new URL(api.primary_media_url!).pathname, imageApiPath(eligible[0].src));
  } else {
    assert.equal(api.media_status, "HONEST_MEDIA_GAP", `${key}: no invented verified media`);
    for (const [field, value] of Object.entries(api)) {
      if (field.startsWith("primary_media_")) assert.equal(value, null, `${key}: honest gap ${field}`);
    }
  }
}
const imageApiPath = (src: string) =>
  src === "/media/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp" ? src : canonicalPath(src);

function assertApprovedAttachments(entries: readonly PlantEntry[]) {
  const byKey = new Map(entries.map(plant => [`${plant.genre}/${plant.slug}`, plant]));
  for (const [key, path] of approvedAttachments) {
    assert.ok(byKey.get(key)?.gallery.some(image =>
      image.src === path && image.license?.status === "verified"
    ), `${key}: approved media must not disappear: ${path}`);
  }
}

test("l'expansion conserve les médias approuvés et classe honnêtement chaque fiche sans census figé", () => {
  assert.ok(plants.length > 0);
  assert.equal(new Set(plants.map(plant => `${plant.genre}/${plant.slug}`)).size, plants.length);
  for (const plant of plants) assertMediaContract(plant);
  assertApprovedAttachments(plants);
});

test("les gardes rejettent perte de média, doublon, fausse vérification et preuve manquante", () => {
  const plant = plants.find(plant => plant.genre === "epipremnum" && plant.slug === "marble-queen")!;
  const image = plant.gallery[0];
  assert.throws(() => assertApprovedAttachments(plants.map(p => p === plant ? {...p, gallery: []} : p)));
  assert.throws(() => assertApprovedAttachments(plants.map(p => p === plant ? {...p, gallery: p.gallery.map(i => ({...i, license: undefined}))} : p)));
  assert.throws(() => assertMediaContract({...plant, gallery: [image, {...image, src: `/media${image.src}`}]}));
  assert.throws(() => assertMediaContract({...plant, gallery: [{...image, src: "/photo-reelle-a-venir.svg"}]}));
  assert.throws(() => assertMediaContract({...plant, gallery: [{...image, license: {...image.license!, sourceUrl: undefined}}]}));
  assert.throws(() => assertMediaContract({...plant, gallery: [{...image, src: "/unapproved-missing-photo.webp"}]}));
  assert.throws(() => assertMediaContract({...plant, gallery: [image, {...image, src: "/photo-reelle-a-venir.svg", license: {status: "media-gap", note: "gap"}}]}));
  // Adding an honest gap does not have to preserve an obsolete global census.
  assert.doesNotThrow(() => assertMediaContract({...plant, slug: "test-only-new-gap", gallery: []}));
});

test("la galerie Pilea canonique remplace le montage CC0 historique sans effet runtime", () => {
  const pilea = plants.find(plant => plant.genre === "pilea" && plant.slug === "peperomioides")!;
  const before = JSON.stringify(pilea);
  const gallery = documentaryGallery(pilea);
  assert.ok(gallery.some(image => image.license?.creator === "TIBALDO"));
  assert.ok(gallery.some(image => image.src === "/pilea-peperomioides-plante.jpg" && image.license?.creator === "Husky"));
  assertMediaContract(pilea);
  assert.equal(JSON.stringify(pilea), before);
});

test("les dix nouvelles fiches qualifiées ont uniquement des médias locaux, sourcés et licenciés", () => {
  const remainingP1Gaps = new Set(["alocasia/melo", "anthurium/luxurians"]);
  const p1 = encyclopediaP1Plants;
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
