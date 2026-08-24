import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const component = await readFile(new URL("app/__lab/deliciosa/v4/DeliciosaKnowledgeScrollV4.tsx", root), "utf8");
const d3 = await readFile(new URL("app/__lab/deliciosa/DeliciosaScrollStoryD3.tsx", root), "utf8");
const controller = await readFile(new URL("app/__lab/deliciosa/v4/KnowledgeScrollController.tsx", root), "utf8");
const data = await readFile(new URL("app/__lab/deliciosa/v4/knowledge-scenes.ts", root), "utf8");
const layout = await readFile(new URL("app/lab/deliciosa/v4/layout.tsx", root), "utf8");
const styles = await readFile(new URL("app/__lab/deliciosa/v4/v4.css", root), "utf8");
const hero = (source) => source.match(/<section className="species-next-hero">[\s\S]*?<\/section>/)?.[0];

test("V4 preserves the owner-approved D3 hero exactly", () => assert.equal(hero(component)?.replace(/\s+/g, " "), hero(d3)?.replace(/\s+/g, " ")));
test("V4 is an isolated noindex LAB route", () => { assert.match(layout, /index:\s*false/); assert.match(layout, /follow:\s*false/); assert.match(layout, /\/lab\/deliciosa\/v4/); });
test("V4 consumes structured Content Master and excludes Safety", () => { assert.match(data, /content-master-v1\.json/); assert.match(data, /unit\.safety_flag/); assert.match(data, /publication_status === "INTERNAL_ONLY"/); assert.match(data, /!item\.safety_flag/); });
test("V4 has 12 acts, five bounded sticky scenes and two level-5 scenes", () => { assert.equal((data.match(/id:\s*"/g) ?? []).length, 12); assert.equal((data.match(/sticky:\s*true/g) ?? []).length, 5); assert.equal((data.match(/motionLevel:\s*5/g) ?? []).length, 2); });
test("V4 keeps native scroll with one passive listener and no heavy motion library", () => { assert.match(controller, /requestAnimationFrame/); assert.match(controller, /passive:\s*true/); assert.doesNotMatch(controller, /preventDefault|wheel|touchmove|gsap|lenis|locomotive/i); });
test("V4 has reduced-motion and no-JS visible states", () => { assert.match(styles, /prefers-reduced-motion:reduce/); assert.match(styles, /v4-motion-static/); assert.doesNotMatch(styles.split(".v4-motion-active")[0], /opacity:\s*0/); });
test("V4 anti-reintroduction guard", () => {
  const publishable = `${component}\n${data}`;
  for (const forbidden of [/50\s*[–-]\s*75\s*%/i,/18\s*[–-]\s*28\s*°/i,/minimum[^\n]{0,40}15\s*°/i,/\b[234]\s*\/\s*5\b/i,/arroser[^\n]{0,30}(tous|chaque)[^\n]{0,20}jours/i,/toujours\s+(couper|guider|enterrer)/i,/borsigiana[^\n]{0,60}espèce\s+distincte/i,/safety\s+approuvée/i,/rhaphidophora\s+tetrasperma/i]) assert.doesNotMatch(publishable, forbidden);
  assert.match(component, /Hypothèse scientifique/); assert.match(component, /Association horticole ≠ causalité garantie/);
});
