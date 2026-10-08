import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const home = readFileSync("app/HomeExperience.tsx", "utf8");
const css = readFileSync("app/globals.css", "utf8");
const mediaPath = "public/studio-vegetal-tibaldo-jungle-romain-pruvost-caisse-lille.webp";

test("the Owner caisse photograph is scoped to the Studio block on Home", () => {
  assert.match(home, /home-studio-compact/);
  assert.match(home, /src="\/studio-vegetal-tibaldo-jungle-romain-pruvost-caisse-lille\.webp"/);
  assert.match(home, /Romain Pruvost derrière la caisse du Studio Végétal TIBALDO Jungle à Lille, entouré de plantes/);
  assert.ok(existsSync(mediaPath));
});

test("the approved source dimensions and responsive crop contract are explicit", () => {
  assert.match(home, /width="2000" height="1125"/);
  assert.match(css, /\.home-studio-compact figure img\{[^}]*object-fit:cover[^}]*\}/);
});

test("other historical project imagery stays referenced outside this Home replacement", () => {
  assert.doesNotMatch(home, /src="\/media\/projet-boutique-tibaldo-jungle-lille\.webp"/);
  assert.match(readFileSync("app/coulisses/page.tsx", "utf8"), /\/media\/projet-boutique-tibaldo-jungle-lille\.webp/);
});
