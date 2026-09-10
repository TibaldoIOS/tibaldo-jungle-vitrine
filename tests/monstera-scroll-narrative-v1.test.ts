import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Monstera gets one bounded scroll narrative between introduction and passport", () => {
  const hub = readFileSync("app/plantes/GoldenGenusHub.tsx", "utf8");
  const narrative = readFileSync("app/plantes/MonsteraScrollNarrative.tsx", "utf8");
  const css = readFileSync("app/plantes/MonsteraScrollNarrative.module.css", "utf8");
  assert.match(hub, /\{genre === "monstera" \? <MonsteraScrollNarrative \/> : null\}/);
  assert.match(narrative, /\["Entières", "Fenêtrées", "Découpées", "Panachées"\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /position: sticky/);
});
