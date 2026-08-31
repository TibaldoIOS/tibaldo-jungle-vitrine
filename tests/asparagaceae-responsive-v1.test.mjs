import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Asparagaceae keeps its exact H1 and uses the shared long-title mobile correction", () => {
  const component = readFileSync("app/plantes/PlantFamilyDirectory.tsx", "utf8");
  const styles = readFileSync("app/plantes/PlantFamilyDirectory.module.css", "utf8");

  assert.match(component, /<h1 data-title-fit=/);
  assert.match(component, />Les <em>\{family\}\.\s*<\/em><\/h1>/);
  assert.match(styles, /\.heroContent h1\[data-title-fit="long"\]/);
  assert.match(styles, /font-size:clamp\(40px,12\.5vw,54px\)/);
  assert.doesNotMatch(styles, /word-break|overflow-wrap|transform:\s*scale/);
});
