import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { homeUniverseMedia } from "../lib/home-universe-media.ts";
import { botanicalHubLeafPlates } from "../lib/plants/botanical-hub-leaf-plates.ts";

const carousel = readFileSync(new URL("../app/HomeUniverseCarousel.tsx", import.meta.url), "utf8");
const globalCss = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const hub = readFileSync(new URL("../app/plantes/GoldenGenusHub.tsx", import.meta.url), "utf8");
const leafPlate = readFileSync(new URL("../app/plantes/BotanicalHubLeafPlate.tsx", import.meta.url), "utf8");
const referenceProvenance = JSON.parse(readFileSync(new URL("../media-provenance/monstera-leaf-identification-beta-reference-v1.json", import.meta.url), "utf8"));

test("mobile homepage carousel preserves all three media slots and starts with Plants", () => {
  assert.match(carousel, /title: "Plantes"[\s\S]*title: "Substrats"[\s\S]*title: "Le Studio"/);
  assert.equal(homeUniverseMedia.plants.src, "/owner-media/home-universes/home-universe-plants-owner-v1.avif");
  assert.equal(homeUniverseMedia.substrates.src, "/owner-media/home-universes/home-universe-substrates-owner-v1.avif");
  assert.equal(homeUniverseMedia.studio.src, "/media/projet-boutique-tibaldo-jungle-lille.webp");
  assert.match(globalCss, /flex:0 0 min\(86vw,370px\)/);
  assert.match(globalCss, /scroll-snap-type:x mandatory/);
  assert.doesNotMatch(carousel, /autoplay|setInterval|setTimeout/);
});

test("carousel exposes accessible, user-controlled indicators", () => {
  assert.match(carousel, /aria-roledescription="carrousel"/);
  assert.match(carousel, /aria-label={`\$\{index \+ 1\} sur \$\{universes\.length\} · \$\{item\.title\}`}/);
  assert.match(carousel, /aria-current=\{activeIndex === index/);
  assert.match(carousel, /prefers-reduced-motion: reduce/);
});

test("Monstera alone receives the Owner-provided beta reference board", () => {
  assert.match(hub, /genre === "monstera" && leafPlate/);
  assert.match(hub, /variant="hero-background"/);
  assert.match(hub, /genre !== "monstera" && leafPlate/);
  assert.equal(botanicalHubLeafPlates.monstera?.leaves.length, 6);
  assert.match(botanicalHubLeafPlates.monstera?.heroReferenceBoardAsset ?? "", /monstera-leaf-identification-owner-reference-v1\.webp$/);
  assert.match(leafPlate, /heroReferenceBoard/);
  assert.doesNotMatch(leafPlate, /heroTableauAsset|monstera-leaf-tableau-transparent/);
  assert.equal(referenceProvenance.provenance_status, "OWNER_PROVIDED_REFERENCE_FOR_BETA_REVIEW");
  assert.equal(referenceProvenance.public_promotion_allowed, false);
  assert.doesNotMatch(hub, /variant="hero-signature"/);
});
