import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { shopUrl } from "../lib/environment.ts";

test("Jungle beta sends shop CTAs exclusively to Shop beta", async () => {
  assert.equal(shopUrl(), "https://beta-shop.tibaldo.fr/");
  assert.equal(shopUrl("/plantes/pilea"), "https://beta-shop.tibaldo.fr/plantes/pilea");
  const files = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ConversionDock.tsx", import.meta.url), "utf8"),
  ]);
  for (const source of files) assert.doesNotMatch(source, /https:\/\/shop\.tibaldo\.fr/);
});

test("Jungle beta is globally marked and excluded from indexing", async () => {
  const [layout, robots, sitemap] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.txt/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /BetaEnvironmentBanner/);
  assert.match(layout, /index:\s*false/);
  assert.match(robots, /Disallow: \/|noindex, nofollow/);
  assert.match(sitemap, /status:\s*404/);
});
