import assert from "node:assert/strict";
import test from "node:test";
import { isLinksOpenAlertPayload } from "../lib/links-open-alert.ts";

const valid = {
  event_id: "links-test-81a718ff-b3ad-4824-81d3-cff44250ee36",
  kind: "test",
  occurred_at: "2026-09-16T17:30:00.000Z",
  path: "/liens",
};

test("accepts the bounded non-identifying alert envelope", () => {
  assert.equal(isLinksOpenAlertPayload(valid), true);
});

test("rejects visitor data, unknown paths and invalid timestamps", () => {
  assert.equal(isLinksOpenAlertPayload({ ...valid, ip: "192.0.2.1" }), false);
  assert.equal(isLinksOpenAlertPayload({ ...valid, path: "/" }), false);
  assert.equal(isLinksOpenAlertPayload({ ...valid, occurred_at: "not-a-date" }), false);
});
