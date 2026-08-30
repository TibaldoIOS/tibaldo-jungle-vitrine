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

test("approved Botanical Heroes are active and rejected prototypes stay disabled", async () => {
  const { botanicalHeroRegistry, hasBotanicalHero } = await import("../lib/plants/botanical-heroes.ts");
  for (const genre of ["strelitzia", "chlorophytum", "alocasia", "dicksonia"]) {
    assert.equal(hasBotanicalHero(genre), true, genre);
  }
  assert.equal(botanicalHeroRegistry.alocasia.status, "APPROVED");
  assert.equal(botanicalHeroRegistry.dicksonia.status, "APPROVED");
  assert.equal(botanicalHeroRegistry.monstera.status, "PROTOTYPE_REJECTED");
  assert.equal(hasBotanicalHero("monstera"), false);
});

test("editorial motion always provides a reduced-motion fallback", async () => {
  const [styles, reveal] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollReveal.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/i);
  assert.match(reveal, /prefers-reduced-motion:\s*reduce/i);
  assert.match(reveal, /classList\.add\("is-visible"\)/);
});

test("the /plantes Owner video is bounded, silent, and served by the controlled media route", async () => {
  const [hero, styles, worker, mp4, poster] = await Promise.all([
    readFile(new URL("../app/plantes/PlantsHeroMedia.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/plantes-mur-vegetal-hero-v19.mp4", import.meta.url)),
    readFile(new URL("../public/plantes-mur-vegetal-poster-v19.webp", import.meta.url)),
  ]);

  assert.match(hero, /<video\s+autoPlay\s+muted\s+loop\s+playsInline/);
  assert.match(hero, /preload="metadata"/);
  assert.match(hero, /plantes-mur-vegetal-hero-v19\.mp4/);
  assert.match(hero, /plantes-mur-vegetal-poster-v19\.webp/);
  assert.doesNotMatch(hero, /controls|<audio/i);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.plants-hub-video video[\s\S]*display: none/);
  assert.match(styles, /\.plants-hub-video-poster[\s\S]*display: block/);
  assert.match(worker, /mp4[\s\S]*webm/);
  assert.match(worker, /video\/mp4/);
  assert.ok(mp4.byteLength > 1_000_000 && mp4.byteLength < 5_000_000);
  assert.ok(poster.byteLength > 50_000 && poster.byteLength < 600_000);
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

test("Golden V25 keeps the visual and environment guardrails", async () => {
  const [styles, photoRegistry, directory, profile, golden, chrome] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../lib/plants/photo-genus-heroes.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/BotanicalDirectoryV3.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/PlantProfile.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/GoldenSpeciesProfile.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteChrome.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(photoRegistry, /monstera[\s\S]*OWNER_AUTHORIZED/);
  assert.doesNotMatch(photoRegistry, /https?:\/\//);
  assert.match(styles, /word-break:normal/);
  assert.match(styles, /overflow-wrap:normal/);
  assert.match(styles, /body:has\(\.conversion-dock\)/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
  assert.match(styles, /footer-parking-grid[\s\S]*overflow-x:auto/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(directory, /aria-expanded/);
  assert.match(directory, /aria-controls/);
  assert.match(directory, /tabIndex=\{open \? 0 : -1\}/);
  assert.match(profile, /GoldenSpeciesProfile/);
  assert.doesNotMatch(profile, /ThaiConstellationProfileV3/);
  assert.match(golden, /data-golden-species-v(?:1|25)/);
  assert.doesNotMatch(chrome, /↗️/);
});

test("Deliciosa preserves its Owner hero and uses the canonical species body", async () => {
  const [profile, nextProfile, ownerHero, styles, interactions] = await Promise.all([
    readFile(new URL("../app/plantes/GoldenSpeciesProfile.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/DeliciosaProfileNext.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/DeliciosaOwnerHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/plantes/SpeciesNextInteractions.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(profile, /plant\.genre === "monstera" && plant\.slug === "deliciosa"/);
  assert.match(profile, /<DeliciosaOwnerHero/);
  assert.doesNotMatch(profile, /<DeliciosaProfileNext/);
  assert.match(nextProfile, /ARCHIVE V6/);
  assert.match(ownerHero, /final-media-v35\/monstera-deliciosa-jonathan-borba-pexels\.webp/);
  assert.match(ownerHero, /01 · Reconnaître · Encyclopédie végétale/);
  assert.match(nextProfile, /monstera-deliciosa-feuilles\.jpg/);
  assert.doesNotMatch(nextProfile, /botanix\.com/);
  assert.match(interactions, /prefers-reduced-motion: reduce/);
  assert.match(interactions, /aria-current/);
  assert.match(interactions, /aria-expanded/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)[\s\S]*\.species-next-page\.next-motion-ready/);
  assert.match(styles, /\.species-next-page\.next-motion-ready \[data-next-reveal\]\.is-visible/);
});

test("species full-bleed regions follow the responsive shell gutter", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /--shell-gutter:\s*20px/);
  assert.match(styles, /--shell-gutter:\s*16px/);
  assert.match(
    styles,
    /\.plant-profile-layout\s*>\s*aside[\s\S]*margin-inline:\s*calc\(-1\s*\*\s*var\(--shell-gutter\)\)/,
  );
  assert.match(styles, /\.species-next-morphology[\s\S]*padding-inline:\s*var\(--shell-gutter\)/);
  assert.match(
    styles,
    /\.p1-species-compact\s+\.plant-gallery\s*>\s*div[\s\S]*padding-right:\s*var\(--shell-gutter\)/,
  );
});
