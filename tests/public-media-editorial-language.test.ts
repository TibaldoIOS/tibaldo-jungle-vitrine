import assert from "node:assert/strict";
import { test } from "node:test";
import { publicMediaCredit, publicMediaLicense } from "../lib/plants/public-media-credit.ts";
import { getPlant, plants } from "../lib/plants/catalog.ts";
import { toPlantApiV1, toPlantApiV2 } from "../lib/plants/api-contract.ts";
import { toVerifiedMediaApiFields } from "../lib/plants/verified-media-api-contract.ts";

const forbidden = /Owner TIBALDO|Photographie réelle contrôlée|VERIFIED_MEDIA|HONEST_MEDIA_GAP|SUPPLIER_PARTNER|LICENSED_PUBLIC_RIGHTS|media_provenance|owner-provided:\/\/|Preuve contrôlée/i;

test("public media presentation never renders internal provenance vocabulary", () => {
  for (const plant of plants) {
    const internalBefore = JSON.stringify(plant);
    const api = toVerifiedMediaApiFields(plant, "test");
    // This documented machine enum is not editorial copy. Keep the API contract.
    assert.ok(["VERIFIED_MEDIA", "HONEST_MEDIA_GAP"].includes(api.media_status));
    const { media_status: status, ...attribution } = api;
    assert.equal(status, api.media_status);
    assert.doesNotMatch(JSON.stringify({ v1: toPlantApiV1(plant), v2: toPlantApiV2(plant), attribution }), forbidden, `${plant.genre}/${plant.slug}: public API`);
    for (const image of plant.gallery) {
      assert.doesNotMatch(JSON.stringify({ alt: image.alt, caption: image.caption, credit: publicMediaCredit(image) }), forbidden, `${plant.slug}: visitor image copy`);
    }
    assert.equal(JSON.stringify(plant), internalBefore, "public projection cannot mutate evidence");
  }
});

test("public media credits are natural while provenance remains internal", () => {
  const pallidiflorum = getPlant("anthurium", "pallidiflorum");
  assert.ok(pallidiflorum);
  const image = pallidiflorum.gallery[0];
  assert.equal(publicMediaCredit(image), "Photo : Driftless Botanicals");
  assert.match(image.caption, /Photo : Driftless Botanicals/);
  assert.doesNotMatch(image.caption, /Owner|autorisée|contrôlée/i);
  assert.match(image.license?.license ?? "", /Owner TIBALDO/);
  assert.match(image.license?.note ?? "", /Preuve contrôlée/);
});

test("the credit formatter handles owner, supplier, licensed, and unknown media honestly", () => {
  const image = { src: "/media/test.webp", alt: "Feuille", caption: "", width: 1, height: 1 };
  assert.equal(publicMediaCredit({ ...image, license: { status: "verified", creator: "TIBALDO", note: "internal" } }), "Photo : TIBALDO");
  assert.equal(publicMediaCredit({ ...image, license: { status: "verified", creator: "Sybotanica", note: "internal" } }), "Photo : Sybotanica");
  assert.equal(publicMediaCredit({ ...image, license: { status: "verified", creator: "Wikimedia Commons", note: "internal" } }), "Photo : Wikimedia Commons");
  assert.equal(publicMediaCredit(image), "Photographie botanique");
  assert.equal(publicMediaLicense({ ...image, license: { status: "verified", license: "CC BY-SA 4.0", note: "internal" } }), "CC BY-SA 4.0");
  assert.equal(publicMediaLicense({ ...image, license: { status: "verified", license: "Domaine public", note: "internal" } }), "Domaine public");
  assert.equal(publicMediaLicense({ ...image, license: { status: "verified", license: "Autorisation confirmée par l’Owner TIBALDO", note: "internal" } }), "Utilisation avec autorisation");
  assert.equal(publicMediaLicense(image), null, "no invented rights for unknown media");
});
