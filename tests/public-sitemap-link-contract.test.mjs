import assert from "node:assert/strict";
import test from "node:test";

import { expectedPublicSitemapUrlCount } from "../scripts/public-sitemap-contract.mjs";

const publicOrigin = "https://jungle.tibaldo.fr";
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("public-sitemap-links", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path) => worker.fetch(new Request(`http://localhost${path}`, { redirect: "manual" }), env, ctx);
const robotsMeta = (html) =>
  html.match(/<meta(?=[^>]*name=["']robots["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>/i)?.[1] ?? "";
const canonicalFor = (html) =>
  html.match(/<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/i)?.[1] ?? null;

test("PUBLIC sitemap derives the exact unique canonical route inventory", async () => {
  const response = await fetchRoute("/sitemap.xml");
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(response.status, 200);
  assert.equal(urls.length, expectedPublicSitemapUrlCount);
  assert.equal(new Set(urls).size, expectedPublicSitemapUrlCount);
});
test("PUBLIC sitemap routes are healthy, indexable, canonical and free of BETA links", async () => {
  const sitemap = await fetchRoute("/sitemap.xml");
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const internalLinks = new Set();

  for (const url of urls) {
    const path = new URL(url).pathname;
    const response = await fetchRoute(path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /\b(?:noindex|nofollow)\b/i, path);
    assert.doesNotMatch(robotsMeta(html), /\b(?:noindex|nofollow)\b/i, path);
    assert.equal(canonicalFor(html)?.replace(/\/$/, ""), `${publicOrigin}${path === "/" ? "" : path}`.replace(/\/$/, ""), path);
    assert.doesNotMatch(html, /beta-(?:jungle|shop)\.tibaldo\.fr/i, path);

    for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:#|mailto:|tel:|javascript:)/i.test(href)) continue;
      const destination = new URL(href, publicOrigin);
      if (destination.origin === publicOrigin) internalLinks.add(destination.pathname);
    }
  }

  for (const path of internalLinks) {
    const response = await fetchRoute(path);
    assert.ok(response.status < 400, `${path}: broken internal link (${response.status})`);
  }
});
