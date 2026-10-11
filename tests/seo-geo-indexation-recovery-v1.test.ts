import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getPlant } from "../lib/plants/catalog.ts";
import {
  jungleLocalIdentity,
  jungleOrganizationStructuredData,
  jungleStoreStructuredData,
} from "../lib/jungle-local-identity.ts";

test("Cactus Mix keeps its honest variable identity without a pseudo-family link", () => {
  const cactus = getPlant("cactus", "assortiment")!;
  assert.equal(cactus.taxonomy.family, "Identité botanique variable");
  const profile = readFileSync("app/plantes/GoldenSpeciesProfile.tsx", "utf8");
  const hero = readFileSync("app/plantes/PlantSpeciesHero.tsx", "utf8");
  assert.match(profile, /family === "Identité botanique variable" \? plant\.taxonomy\.family/);
  assert.match(hero, /family === "Identité botanique variable"/);
  assert.doesNotMatch(profile, /href=\{`\/plantes\/famille\/\$\{plant\.taxonomy\.family\.toLowerCase\(\)\}`\}>\{plant\.taxonomy\.family\}<\/Link><\/dd><\/div>/);
});

test("the stable Organization contract is canonical and remains distinct from Store", () => {
  const organization = jungleOrganizationStructuredData();
  const store = jungleStoreStructuredData();
  assert.equal(organization["@id"], jungleLocalIdentity.organizationId);
  assert.equal(organization.name, "TIBALDO Jungle");
  assert.equal(organization.alternateName, "Studio Végétal — TIBALDO Jungle");
  assert.equal(store["@id"], jungleLocalIdentity.storeId);
  assert.notEqual(store["@id"], organization["@id"]);
  assert.deepEqual(store.parentOrganization, { "@id": organization["@id"] });
});

test("species pages reuse the canonical Organization helper", () => {
  const page = readFileSync("app/plantes/[genre]/[slug]/page.tsx", "utf8");
  assert.match(page, /const organization = jungleOrganizationStructuredData\(\)/);
  assert.doesNotMatch(page, /name: "Studio Végétal – Tibaldo Jungle"/);
  assert.doesNotMatch(page, /alternateName: "Tibaldo Jungle"/);
});
