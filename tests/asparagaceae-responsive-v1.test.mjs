import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Asparagaceae keeps its exact H1 and uses a family-scoped mobile correction", () => {
  const component = readFileSync("app/plantes/PlantFamilyDirectory.tsx", "utf8");
  const styles = readFileSync("app/plantes/PlantFamilyDirectory.module.css", "utf8");

  assert.match(component, /<h1>Les <em>\{family\}\.\s*<\/em><\/h1>/);
  assert.match(styles, /\.page\[data-golden-family-v25="asparagaceae"\]\s+\.heroContent h1/);
  assert.match(styles, /font-size:clamp\(52px,15vw,67px\)/);
  assert.doesNotMatch(styles, /word-break|overflow-wrap|transform:\s*scale/);
});
