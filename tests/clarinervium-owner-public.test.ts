import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { getPlant } from "../lib/plants/catalog.ts";

test("Clarinervium PUBLIC preserves exact canonical Owner JPEG, alt, credit and rights", () => {
  const media = getPlant("anthurium", "clarinervium")!.gallery[0];
  assert.equal(media.src, "/images/anthurium-clarinervium-feuilles-veloutees-nervures-claires.jpg");
  assert.equal(media.alt, "Anthurium clarinervium aux feuilles vert foncé veloutées et aux nervures claires.");
  assert.equal(media.caption, "Photo : TIBALDO");
  assert.equal(media.width, 1200);
  assert.equal(media.height, 1200);
  assert.equal(media.license?.status, "verified");
  assert.match(media.license?.note ?? "", /photographie personnelle/);
  assert.equal(createHash("sha256").update(readFileSync(new URL(`../public${media.src}`, import.meta.url))).digest("hex"), "e1a1a0e72967cdfd37b0930f81e3d0cc4cf58d99945fe3108e56c75059f3b49c");
});

test("Adansonii PUBLIC Owner media remains unchanged", () => {
  const media = getPlant("monstera", "adansonii")!.gallery[0];
  assert.equal(media.src, "/images/monstera-adansonii-plante-feuilles-perforees.jpg");
  assert.equal(media.license?.status, "verified");
  assert.equal(createHash("sha256").update(readFileSync(new URL(`../public${media.src}`, import.meta.url))).digest("hex"), "3f21c5ebabf5f0774cfefb3bebd938fed753d9112af3c4920083269419e9929f");
});
