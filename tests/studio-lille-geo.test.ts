import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { jungleLocalIdentity as studio, jungleStoreStructuredData } from "../lib/jungle-local-identity.ts";

test("Studio Lille coordinates and address share the canonical identity", () => {
  assert.equal(studio.latitude, 50.6251203);
  assert.equal(studio.longitude, 3.0394823);
  assert.equal(studio.streetAddress, "3 place de l’Arbonnoise");
  assert.equal(studio.postalCode, "59000");
  assert.equal(studio.city, "Lille");
  const schema = jungleStoreStructuredData();
  assert.deepEqual(schema.geo, { "@type": "GeoCoordinates", latitude: studio.latitude, longitude: studio.longitude });
  assert.equal(schema.hasMap, "https://maps.app.goo.gl/KAuuHJf1BPGf4Wgw6?g_st=ic");
  assert.equal(schema["@id"], "https://jungle.tibaldo.fr/#store");
});

test("runtime source cannot reintroduce the former Studio coordinate literals", () => {
  const source = execFileSync("git", ["grep", "-n", "-E", "latitude|longitude|coordinates|50\\.58|3\\.05", "--", "app", "lib"], { encoding: "utf8" });
  const former = ["50." + "5872384", "3." + "0572544"];
  for (const value of former) assert.ok(!source.includes(value), `Unexpected runtime coordinate: ${value}`);
});
