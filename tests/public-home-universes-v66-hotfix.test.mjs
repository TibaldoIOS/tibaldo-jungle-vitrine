import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const sha256 = async (path) => createHash("sha256").update(await readFile(new URL(`../${path}`, import.meta.url))).digest("hex");

test("PUBLIC restores the exact two Owner-approved universe media", async () => {
  const media = await read("lib/home-universe-media.ts");
  assert.match(media, /home-universe-plants-owner-v1\.avif/);
  assert.match(media, /home-universe-substrates-owner-v1\.avif/);
  assert.match(media, /TIBALDO_OWNER_MEDIA/);
  assert.equal(await sha256("public/owner-media/home-universes/home-universe-plants-owner-v1.avif"), "505650fc3c8fd8370a16ee771b5d499408496507345e70c4434e757f74051551");
  assert.equal(await sha256("public/owner-media/home-universes/home-universe-substrates-owner-v1.avif"), "22c312d1dacfc7fe7e5064c2f0462f09807044903030a15d82bc3d2419499660");
});

test("the approved V66 carousel is native, accessible and starts with Plants", async () => {
  const component = await read("app/HomeUniverseCarousel.tsx");
  const home = await read("app/HomeExperience.tsx");
  const css = await read("app/globals.css");
  assert.match(home, /<HomeUniverseCarousel \/>/);
  assert.match(component, /title: "Plantes"[\s\S]*title: "Substrats"[\s\S]*title: "Le Studio"/);
  assert.match(component, /aria-roledescription="carrousel"/);
  assert.match(component, /home-hub-indicators/);
  assert.doesNotMatch(component, /setInterval|autoplay/i);
  assert.match(css, /flex:0 0 min\(86vw,370px\)/);
  assert.match(css, /scroll-snap-type:x mandatory/);
  assert.match(css, /scroll-snap-stop:always/);
});

test("the V78 public opening and rights gates remain intact", async () => {
  const prelaunch = await read("lib/public-prelaunch.ts");
  const layout = await read("app/layout.tsx");
  const boutique = await read("app/boutique-plantes-lille/page.tsx");
  const home = await read("app/HomeExperience.tsx");
  assert.match(prelaunch, /PUBLIC_PRELAUNCH_CURTAIN = false/);
  assert.match(layout, /PublicPreopeningSignal/);
  assert.match(layout, /SafeLinkMaskLayer/);
  assert.match(boutique, /Boutique de plantes rares à Lille/);
  assert.match(home, /préparées et cultivées à Wattignies/);
  assert.doesNotMatch(home + layout, /monstera-leaf-identification-owner-reference|@REROOTGARDENS|beta-reference/i);
});
