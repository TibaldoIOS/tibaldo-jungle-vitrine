import assert from "node:assert/strict";
import test from "node:test";

test("renders the homepage SEO signals and editorial content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Boutique de plantes rares à Lille \| Tibaldo Jungle<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*name=["']description["'])(?=[^>]*content=["'][^"']*nouvelle boutique de plantes rares et exotiques à Lille[^"']*["'])[^>]*>/i,
  );
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/?["'])[^>]*>/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /Plantes rares[\s\S]*&amp; exotiques[\s\S]*à Lille\./i);
  assert.match(html, /Pourquoi « Studio Végétal » \?/i);
});
