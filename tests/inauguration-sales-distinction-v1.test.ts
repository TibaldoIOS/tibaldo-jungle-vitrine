import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { openingEvent } from "../lib/events/catalog.ts";

const read = (path: string) => readFileSync(path, "utf8");

test("keeps first sales and inauguration as two distinct owner-confirmed milestones", () => {
  const publicCopy = [
    read("app/PublicPreopeningSignal.tsx"),
    read("app/HomeOpeningBanner.tsx"),
    read("app/HomeExperience.tsx"),
    read("app/contact/page.tsx"),
    read("app/page.tsx"),
    read("app/substrats/page.tsx"),
    read("app/substrats-en-vrac-lille/page.tsx"),
  ].join("\n");
  assert.match(publicCopy, /25 septembre(?: 2026)?(?: à| ·) 10 h/);
  assert.match(publicCopy, /26 septembre(?: 2026)?(?: à| ·) 18 h/);
  assert.doesNotMatch(publicCopy, /Ouverture le 26 septembre|ouvre à Lille le 26 septembre|10 h[–-]19 h/);
});

test("removes the unsupported store opening date and keeps weekly hours untouched", () => {
  const homepage = read("app/page.tsx");
  assert.doesNotMatch(homepage, /openingDate/);
  assert.match(homepage, /Mardi · 14h–19h/);
  assert.match(homepage, /Mercredi–samedi · 10h–19h/);
  assert.match(homepage, /Dimanche · 10h–13h/);
});

test("publishes an inauguration start without inventing an end time", () => {
  assert.equal(openingEvent.title, "Inauguration du Studio Végétal – Tibaldo Jungle à Lille");
  assert.equal(openingEvent.startAt, "2026-09-26T18:00:00+02:00");
  assert.equal(openingEvent.endAt, null);
  assert.doesNotMatch(JSON.stringify(openingEvent), /10 h à 19 h|10h–19h|2026-09-26T10:00/);
  const page = read("app/evenements/[slug]/page.tsx");
  assert.match(page, /\.\.\.\(event\.endAt \? \{ endDate: event\.endAt \} : \{\}\)/);
  const repository = read("lib/events/repository.ts");
  assert.match(repository, /set\(toRow\(openingEvent\)\)/);
  assert.doesNotMatch(repository, /set\(\{[\s\S]*title: openingEvent\.title/);
});
