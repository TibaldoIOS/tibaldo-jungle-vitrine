import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  buildLinksStatsRange,
  buildLinksStatsWindow,
  LINKS_STATS_MAX_RANGE_DAYS,
  LINKS_STATS_TIME_ZONE,
} from "../lib/links-open-stats.ts";

test("builds seven Europe/Paris calendar days with explicit ISO bounds", () => {
  const window = buildLinksStatsWindow(new Date("2026-09-17T10:00:00.000Z"));
  assert.equal(LINKS_STATS_TIME_ZONE, "Europe/Paris");
  assert.equal(window.start, "2026-09-10T22:00:00.000Z");
  assert.equal(window.startDate, "2026-09-11");
  assert.equal(window.endDate, "2026-09-17");
  assert.equal(window.todayStart, "2026-09-16T22:00:00.000Z");
  assert.equal(window.end, "2026-09-17T22:00:00.000Z");
  assert.equal(window.daily.length, 7);
  assert.deepEqual(window.daily.map((day) => day.date), [
    "2026-09-11",
    "2026-09-12",
    "2026-09-13",
    "2026-09-14",
    "2026-09-15",
    "2026-09-16",
    "2026-09-17",
  ]);
});

test("accepts an inclusive custom Europe/Paris date range", () => {
  const window = buildLinksStatsRange(
    { start: "2026-09-01", end: "2026-09-03" },
    new Date("2026-09-17T10:00:00.000Z"),
  );
  assert.equal(window.startDate, "2026-09-01");
  assert.equal(window.endDate, "2026-09-03");
  assert.equal(window.start, "2026-08-31T22:00:00.000Z");
  assert.equal(window.end, "2026-09-03T22:00:00.000Z");
  assert.deepEqual(window.daily.map((day) => day.date), ["2026-09-01", "2026-09-02", "2026-09-03"]);
});

test("rejects partial, invalid, reversed and oversized custom ranges", () => {
  const now = new Date("2026-09-17T10:00:00.000Z");
  assert.throws(() => buildLinksStatsRange({ start: "2026-09-01" }, now), /START_AND_END_REQUIRED/);
  assert.throws(() => buildLinksStatsRange({ start: "2026-02-30", end: "2026-03-01" }, now), /DATE_INVALID/);
  assert.throws(() => buildLinksStatsRange({ start: "2026-09-03", end: "2026-09-01" }, now), /DATE_ORDER_INVALID/);
  assert.equal(LINKS_STATS_MAX_RANGE_DAYS, 366);
  assert.throws(() => buildLinksStatsRange({ start: "2025-01-01", end: "2026-01-02" }, now), /RANGE_TOO_LARGE/);
});

test("keeps Europe/Paris calendar bounds correct across daylight-saving changes", () => {
  const window = buildLinksStatsWindow(new Date("2026-10-27T12:00:00.000Z"));
  assert.equal(window.start, "2026-10-20T22:00:00.000Z");
  assert.equal(window.end, "2026-10-27T23:00:00.000Z");
  assert.equal(window.daily[3].end, "2026-10-24T22:00:00.000Z");
  assert.equal(window.daily[4].end, "2026-10-25T23:00:00.000Z");
});

test("the internal stats route is read-only, authenticated and excludes control opens", () => {
  const worker = readFileSync(new URL("../worker/index.ts", import.meta.url), "utf8");
  assert.match(worker, /const LINKS_STATS_PATH = "\/api\/internal\/links-stats"/);
  assert.match(worker, /authorizedInternalLinksRequest\(request, env\)/);
  assert.match(worker, /request\.method !== "GET"/);
  assert.match(worker, /url\.searchParams\.get\("start"\)/);
  assert.match(worker, /url\.searchParams\.get\("end"\)/);
  assert.match(worker, /range_count/);
  assert.match(worker, /first_open/);
  assert.match(worker, /action = \?/);
  assert.match(worker, /LINKS_OPEN_ACTION/);
  assert.doesNotMatch(worker, /handleLinksStats[\s\S]*LINKS_OPEN_TEST_ACTION/);
});
