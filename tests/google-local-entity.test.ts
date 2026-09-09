import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { jungleLocalIdentity as identity, jungleStoreStructuredData } from "../lib/jungle-local-identity.ts";
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
test("local entity adds only Owner supplied geo/maps/social fields", async () => {
  const original = execFileSync("git", ["show", "8cc51055ba314d51cbdb6f13f7767e20eb670439:lib/jungle-local-identity.ts"], { encoding: "utf8" });
  const old = await import(`data:text/javascript,${encodeURIComponent(original.replaceAll(" as const", ""))}`);
  const { geo, hasMap, sameAs, ...preserved } = jungleStoreStructuredData();
  assert.deepEqual(preserved, old.jungleStoreStructuredData());
  assert.deepEqual(geo, { "@type": "GeoCoordinates", latitude: 50.5872384, longitude: 3.0572544 });
  assert.equal(hasMap, "https://maps.app.goo.gl/KAuuHJf1BPGf4Wgw6?g_st=ic");
  assert.deepEqual(sameAs, ["https://www.instagram.com/tibaldojungle/", "https://www.facebook.com/tibaldojungle"]);
  assert.doesNotMatch(JSON.stringify(jungleStoreStructuredData()), /AggregateRating|ratingValue|reviewCount|Review/);
});
test("one accessible passive social component, no SDK or reviews", () => {
  const ui = read("app/LocalPresence.tsx");
  for (const key of ["mapsUrl", "instagramUrl", "facebookUrl"]) assert.ok(ui.includes(`studio.${key}`));
  assert.equal((ui.match(/<a href=/g) || []).length, 3);
  assert.equal((ui.match(/aria-label=/g) || []).length, 4);
  assert.doesNotMatch(ui, /iframe|fetch\(|AggregateRating|reviewCount|ratingValue|useEffect/);
  assert.match(read("app/LocalPresence.module.css"), /focus-visible/);
  assert.match(read("app/LocalPresence.module.css"), /\.block \{ display: block;/);
  assert.match(read("app/LocalPresence.module.css"), /\.block \.heading \{ color: inherit;/);
  assert.match(read("app/LocalPresence.module.css"), /min-height: 44px/);
});
test("targeted page placements and canonical footer", () => {
  for (const path of ["app/contact/page.tsx", "app/LocalSeoPage.tsx", "app/SiteChrome.tsx", "app/evenements/[slug]/page.tsx"]) assert.match(read(path), /<LocalPresence/);
  assert.match(read("app/LocalSeoPage.tsx"), /props.canonical === "\/boutique-plantes-lille" \? <LocalPresence/);
  assert.match(read("app/evenements/[slug]/page.tsx"), /isOpening \? <>/);
  assert.doesNotMatch(read("app/contact/page.tsx"), /<iframe/);
});
test("Hero uses exact central coordinates, no alternate identity", () => {
  const page = read("app/page.tsx");
  assert.match(page, /jungleLocalIdentity.latitude/);
  assert.match(page, /jungleLocalIdentity.longitude/);
  assert.match(read("app/globals.css"), /writing-mode: vertical-rl/);
  assert.equal(identity.phoneE164, "+33743727079");
});
