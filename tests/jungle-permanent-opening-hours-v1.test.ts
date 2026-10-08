import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  jungleLocalIdentity,
  jungleOpeningHours,
  jungleOpeningHoursSchema,
  jungleStoreStructuredData,
} from "../lib/jungle-local-identity.ts";
import { anthuriumWeekendDays } from "../lib/events/anthurium-weekend.ts";

const read = (path: string) => readFileSync(path, "utf8");
const wedToSat = ["Wednesday", "Thursday", "Friday", "Saturday"];

test("the permanent schedule models the midday closure without losing Monday", () => {
  assert.deepEqual(jungleOpeningHours, [
    { dayOfWeek: "Monday", closed: true },
    { dayOfWeek: "Tuesday", opens: "14:00", closes: "19:00" },
    { dayOfWeek: wedToSat, opens: "10:00", closes: "13:00" },
    { dayOfWeek: wedToSat, opens: "14:00", closes: "19:00" },
    { dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
  ]);
});

test("LocalBusiness JSON-LD has parseable split hours and an explicit closed Monday", () => {
  assert.deepEqual(jungleOpeningHoursSchema, [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "00:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: wedToSat, opens: "10:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: wedToSat, opens: "14:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
  ]);
  const store = jungleStoreStructuredData();
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(store)));
  assert.deepEqual(store.openingHoursSpecification, jungleOpeningHoursSchema);
  assert.equal(store.address.streetAddress, "3 place de l’Arbonnoise");
  assert.equal(store.address.postalCode, "59000");
  assert.equal(store.address.addressLocality, "Lille");
  assert.equal(jungleLocalIdentity.mapsUrl, "https://maps.app.goo.gl/KAuuHJf1BPGf4Wgw6?g_st=ic");
});

test("all permanent-hour surfaces show the split schedule and no stale continuous range", () => {
  const visibleFiles = [
    "app/PublicPreopeningSignal.tsx",
    "app/SiteChrome.tsx",
    "app/LocalSeoPage.tsx",
    "app/HomeExperience.tsx",
    "app/contact/page.tsx",
    "app/page.tsx",
    "app/rempotage/page.tsx",
    "app/substrats/local-commerce.ts",
  ];
  for (const file of visibleFiles) {
    const source = read(file);
    assert.match(source, /[Mm]ercredi–samedi[^\n<"]*10 ?h–13 ?h \/ 14 ?h–19 ?h/, file);
    assert.doesNotMatch(source, /[Mm]ercredi–samedi[^\n<"]*10 ?h–19 ?h/, file);
  }
});

test("dated event hours remain independent from the permanent schedule", () => {
  assert.deepEqual(anthuriumWeekendDays, [
    { date: "2026-10-10", label: "Samedi 10 octobre 2026", opens: "10:00", closes: "19:00" },
    { date: "2026-10-11", label: "Dimanche 11 octobre 2026", opens: "10:00", closes: "13:00" },
  ]);
  const sybotanica = read("app/evenements/week-end-sybotanica-octobre-2026/page.tsx");
  assert.match(sybotanica, /Samedi 3 octobre : <strong>10 h–19 h<\/strong>/);
  assert.match(sybotanica, /Dimanche 4 octobre : <strong>10 h–13 h<\/strong>/);
});
