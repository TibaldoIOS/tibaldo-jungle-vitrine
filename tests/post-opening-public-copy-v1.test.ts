import assert from "node:assert/strict";
import test from "node:test";
import { openingEvent } from "../lib/events/catalog.ts";
import { publicEventCopy } from "../lib/events/public-copy.ts";

test("opening event becomes a public archive without mutating stored history", () => {
  const original = structuredClone(openingEvent);
  const archive = publicEventCopy(openingEvent, Date.parse("2026-09-29T20:13:51+02:00"));
  assert.match(archive.seoTitle, /Archive/);
  assert.match(archive.excerpt, /Événement passé/);
  for (const field of ["id", "slug", "status", "startAt", "endAt", "address", "postalCode", "city", "program", "gallery", "facebookUrl"] as const) assert.deepEqual(archive[field], original[field], field);
  assert.doesNotMatch(JSON.stringify(archive.faq), /Participe|Intéressé|avant le 26 septembre/);
  assert.deepEqual(openingEvent, original);
});
