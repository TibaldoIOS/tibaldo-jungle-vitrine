import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("Home removes the large opening block and uses the compact Anthurium banner", () => {
  const home = read("app/page.tsx");
  assert.doesNotMatch(home, /<HomeOpeningBanner\s*\/>/);
  assert.match(home, /<AnthuriumWeekendLink compact\s*\/>/);
});

test("compact Anthurium copy and destination stay exact", () => {
  const component = read("app/AnthuriumWeekendLink.tsx");
  assert.match(component, /Week-end Anthurium/);
  assert.match(component, /5 références · prix fidélité/);
  assert.match(component, /Découvrir l’offre/);
  assert.match(component, /href=\{anthuriumWeekendPath\}/);
});

test("the compact public hours signal keeps the Owner schedule", () => {
  const signal = read("app/PublicPreopeningSignal.tsx");
  assert.match(signal, /Mardi 14 h–19 h/);
  assert.match(signal, /mercredi–samedi 10 h–13 h \/ 14 h–19 h/);
  assert.match(signal, /dimanche 10 h–13 h/);
});

test("the Home-only compact banner has bounded desktop height styling", () => {
  const css = read("app/HomeOpeningBanner.module.css");
  assert.match(css, /\.compact \.inner \{ min-height: 96px; padding-block: 14px; \}/);
  assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.compact \.inner/);
});
