import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const privacy = await readFile(new URL("../app/politique-de-confidentialite/page.tsx", import.meta.url), "utf8");
const legacy = await readFile(new URL("../app/politique-confidentialite/page.tsx", import.meta.url), "utf8");
const chrome = await readFile(new URL("../app/SiteChrome.tsx", import.meta.url), "utf8");

test("publishes the canonical BETA draft and keeps the former route compatible", () => {
  assert.match(privacy, /canonical: "\/politique-de-confidentialite"/);
  assert.match(privacy, /DRAFT · OWNER LEGAL REVIEW REQUIRED/);
  assert.match(legacy, /\.\.\/politique-de-confidentialite\/page/);
  assert.match(chrome, /href="\/politique-de-confidentialite"/);
});

test("keeps the three privacy P1 gaps explicitly open", () => {
  for (const gap of ["PRIV-P1-002", "PRIV-P1-003", "PRIV-P1-004"]) assert.match(privacy, new RegExp(gap));
  assert.doesNotMatch(privacy, /READY_FOR_OPENING_PRIVACY=YES/);
});

test("does not add a cookie banner or a new required consent", () => {
  assert.match(privacy, /Aucun bandeau de consentement n’est donc ajouté/);
  assert.doesNotMatch(privacy, /cookie-consent|cookie-banner|type="checkbox"/i);
});
