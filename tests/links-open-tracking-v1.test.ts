import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyLinksOpen,
  linksOpenEventId,
  LINKS_OPEN_ACTION,
  LINKS_OPEN_TEST_ACTION,
  LINKS_OPEN_TEST_HEADER,
  LINKS_OPEN_TEST_VALUE,
} from "../lib/links-open-tracking.ts";

const safari = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Version/18.6 Mobile Safari/604.1";

function request(path = "/liens", headers: Record<string, string> = {}) {
  return new Request(`https://jungle.tibaldo.fr${path}`, {
    headers: { accept: "text/html", "user-agent": safari, ...headers },
  });
}

test("counts a normal HTML navigation without collecting a visitor identifier", () => {
  assert.deepEqual(classifyLinksOpen(request()), { kind: "visit", action: LINKS_OPEN_ACTION });
});

test("marks the explicit control opening separately", () => {
  assert.deepEqual(classifyLinksOpen(request("/liens", { [LINKS_OPEN_TEST_HEADER]: LINKS_OPEN_TEST_VALUE })), {
    kind: "test",
    action: LINKS_OPEN_TEST_ACTION,
  });
});

test("excludes bots, verified bots, preloads, non-HTML and other paths", () => {
  assert.equal(classifyLinksOpen(request("/liens", { "user-agent": "Googlebot/2.1" })).kind, "excluded");
  assert.equal(classifyLinksOpen(request(), true).kind, "excluded");
  assert.equal(classifyLinksOpen(request("/liens", { purpose: "prefetch" })).kind, "excluded");
  assert.equal(classifyLinksOpen(request("/liens", { accept: "application/json" })).kind, "excluded");
  assert.equal(classifyLinksOpen(request("/" )).kind, "excluded");
});

test("deduplicates real openings in a five-second global bucket, while tests stay distinct", () => {
  const at = new Date("2026-09-16T16:30:02.000Z");
  assert.equal(linksOpenEventId(LINKS_OPEN_ACTION, at), linksOpenEventId(LINKS_OPEN_ACTION, new Date("2026-09-16T16:30:04.999Z")));
  assert.notEqual(linksOpenEventId(LINKS_OPEN_ACTION, at), linksOpenEventId(LINKS_OPEN_ACTION, new Date("2026-09-16T16:30:05.000Z")));
  assert.notEqual(linksOpenEventId(LINKS_OPEN_TEST_ACTION, at), linksOpenEventId(LINKS_OPEN_TEST_ACTION, at));
});
