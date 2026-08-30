import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("honest-media-gap hero avoids Safari's negative compositor stack", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /\.plant-profile-hero\.has-editorial-fallback \.plant-profile-hero-fallback\{z-index:0\}/,
  );
  assert.match(
    css,
    /\.plant-profile-hero\.has-editorial-fallback \.plant-profile-hero-shade,[\s\S]*?\.plant-profile-hero\.has-editorial-fallback::after\{z-index:1\}/,
  );
  assert.match(
    css,
    /\.plant-profile-hero\.has-editorial-fallback>\.site-header,[\s\S]*?\.plant-profile-hero\.has-editorial-fallback \.plant-profile-hero-content\{position:relative;z-index:2\}/,
  );
});

test("Golden Species reveals do not preallocate filtered offscreen layers", () => {
  const css = read("app/plantes/GoldenBaseline.module.css");
  const rule = css.match(
    /:global\(\.reveal-ready\) \.speciesHero :global\(\[data-reveal\]\) \{([\s\S]*?)\}/,
  )?.[1];

  assert.ok(rule, "Golden Species must provide a compositor-safe reveal override");
  assert.match(rule, /filter:\s*none/);
  assert.match(rule, /will-change:\s*auto/);
  assert.doesNotMatch(rule, /filter\s+\.\d+s/);
});

test("P1 route data contains no client navigation side effects", () => {
  const source = read("lib/plants/encyclopedia-p1-expansion.ts");

  assert.doesNotMatch(source, /history\.(?:back|go|replaceState)/);
  assert.doesNotMatch(source, /location\.(?:replace|assign|href)/);
  assert.doesNotMatch(source, /router\.(?:back|replace|push)/);
});
