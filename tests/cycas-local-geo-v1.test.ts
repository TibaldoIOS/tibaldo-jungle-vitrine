import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { cycasRevoluta } from "../lib/plants/cycas-revoluta.ts";

const profile = readFileSync(new URL("../app/plantes/GoldenSpeciesProfile.tsx", import.meta.url), "utf8");
const guide = readFileSync(new URL("../app/plantes/CycasLocalGuide.tsx", import.meta.url), "utf8");
const route = readFileSync(new URL("../app/plantes/[genre]/[slug]/page.tsx", import.meta.url), "utf8");

test("Cycas local guide is limited to the exact species pilot", () => {
  assert.match(profile, /plant\.genre === "cycas" && plant\.slug === "revoluta"/);
  assert.match(profile, /isCycasRevoluta \? <CycasLocalGuide plant=\{plant\} \/>/);
  assert.match(profile, /isCycasRevoluta \? <SpeciesLocalStudio speciesName="Cycas revoluta"/);
});

test("Cycas local guide provides a direct answer and useful internal routes", () => {
  assert.match(guide, /Peut-on cultiver un Cycas revoluta à Lille/);
  for (const href of ["/plantes/cycas", "/substrats", "/rempotage", "/boutique-plantes-lille"]) assert.ok(guide.includes(`href="${href}"`), `missing ${href}`);
});

test("Cycas stays an Article without Product or Offer schema", () => {
  assert.match(route, /"@type": "Article"/);
  assert.doesNotMatch(route, /"@type": "(?:Product|Offer)"/);
  assert.equal(cycasRevoluta.updatedAt, "2026-09-02");
  assert.ok(cycasRevoluta.sources.length >= 4);
  assert.ok(cycasRevoluta.faq.some(({ question }) => question.includes("hiverner")));
});
