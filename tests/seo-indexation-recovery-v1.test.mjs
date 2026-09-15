import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { default as worker } from "../dist/server/index.js";

const ctx = { waitUntil() {}, passThroughOnException() {} };
const env = {
  ASSETS: {
    fetch: async (request) => {
      const pathname = new URL(request.url).pathname;
      try {
        return new Response(
          await readFile(new URL(`../public${pathname}`, import.meta.url)),
        );
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};
const render = (path) =>
  worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`), env, ctx);

test("weak family archives stay crawlable but are excluded from indexing", async () => {
  const response = await render("/plantes/famille/strelitziaceae");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<meta name="robots" content="noindex, follow"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jungle\.tibaldo\.fr\/plantes\/famille\/strelitziaceae"/,
  );
});

test("substantial family archives remain indexable", async () => {
  const response = await render("/plantes/famille/araceae");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /<meta name="robots" content="noindex/);
});

test("the homepage advertises a crawlable PNG favicon", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(
    html,
    /href="https:\/\/jungle\.tibaldo\.fr\/favicon\.png"/,
  );
  assert.match(html, /type="image\/png"/);
});
