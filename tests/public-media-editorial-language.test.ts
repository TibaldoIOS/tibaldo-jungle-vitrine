import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { publicMediaCredit } from "../lib/plants/public-media-credit.ts";
import { getPlant } from "../lib/plants/catalog.ts";

const publicSources = [
  "app/plantes/GoldenSpeciesProfile.tsx",
  "app/credits-images/page.tsx",
  "lib/plants/catalog.ts",
].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")).join("\n");

test("public media presentation never renders internal provenance vocabulary", () => {
  for (const term of ["Owner TIBALDO", "Photographie réelle contrôlée", "VERIFIED_MEDIA", "HONEST_MEDIA_GAP", "SUPPLIER_PARTNER", "LICENSED_PUBLIC_RIGHTS", "media_provenance"]) {
    assert.doesNotMatch(publicSources, new RegExp(term, "i"), term);
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
});
