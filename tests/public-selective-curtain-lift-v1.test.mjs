import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const config = read("lib/public-prelaunch.ts");
const layout = read("app/layout.tsx");
const signal = read("app/PublicPreopeningSignal.tsx");
const home = read("app/page.tsx");
const homeExperience = read("app/HomeExperience.tsx");
const coulisses = read("app/coulisses/page.tsx");
const boutique = read("app/boutique-plantes-lille/page.tsx");
const methodology = read("app/methodologie-sources/page.tsx");
const leafRegistry = read("lib/plants/catalog.ts");

test("PUBLIC curtain is off while the Safe Link Mask and non-blocking signal remain", () => {
  assert.match(config, /PUBLIC_PRELAUNCH_CURTAIN\s*=\s*false/);
  assert.match(layout, /<PublicPreopeningSignal/);
  assert.match(layout, /<SafeLinkMaskLayer/);
  assert.match(signal, /La Jungle est ouverte en ligne/);
  assert.match(signal, /26 septembre/);
  assert.doesNotMatch(signal, /position:\s*fixed|aria-modal|role="dialog"/);
});

test("homepage provides useful pre-opening actions without claiming Shop availability", () => {
  assert.match(home, /Le Studio se prépare/);
  assert.match(home, /La Jungle est déjà ouverte/);
  assert.match(home, /href="\/plantes">Explorer la Jungle/);
  assert.match(home, /href="\/contact">Préparer ma visite/);
});

test("Lille and Wattignies roles are explicit", () => {
  assert.match(homeExperience, /préparées et cultivées à Wattignies/);
  assert.match(homeExperience, /Studio Végétal situé à Lille/);
  assert.match(coulisses, /préparées et cultivées à Wattignies/);
  assert.match(coulisses, /3 place de l’Arbonnoise à Lille/);
});

test("bounded Boutique metadata and methodology publication are present", () => {
  assert.match(boutique, /Boutique de plantes rares à Lille \| TIBALDO Jungle/);
  assert.match(boutique, /sélection selon les arrivages/);
  assert.match(methodology, /datePublished: "2026-08-21"/);
  assert.match(methodology, /dateModified: "2026-09-02"/);
  assert.match(methodology, /Plants of the World Online/);
});

test("unlicensed V69 Monstera board is absent from the PUBLIC source", () => {
  for (const source of [layout, home, leafRegistry]) {
    assert.doesNotMatch(source, /monstera-leaf-identification-owner-reference|beta-reference|@REROOTGARDENS/i);
  }
});
