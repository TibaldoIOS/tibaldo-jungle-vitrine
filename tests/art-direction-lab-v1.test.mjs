import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";

const componentPath = "app/__lab/deliciosa/art-direction-v1/DeliciosaArtDirectionLabV1.tsx";
const controllerPath = "app/__lab/deliciosa/art-direction-v1/ArtDirectionScrollController.tsx";
const cssPath = "app/__lab/deliciosa/art-direction-v1/art-direction-v1.css";
const layoutPath = "app/lab/deliciosa/art-direction-v1/layout.tsx";
const v4Path = "app/__lab/deliciosa/v4/DeliciosaKnowledgeScrollV4.tsx";
const source = fs.readFileSync(componentPath, "utf8");
const controller = fs.readFileSync(controllerPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const layout = fs.readFileSync(layoutPath, "utf8");
const v4 = fs.readFileSync(v4Path, "utf8");

const hero = (text) => {
  const start = text.indexOf('<section className="species-next-hero">');
  const end = text.indexOf("</section>", start) + 10;
  return text.slice(start, end).replace(/\s+/g, " ").trim();
};

test("Hero frozen remains byte-equivalent after normalization", () => {
  const hash = crypto.createHash("sha256").update(hero(source)).digest("hex");
  assert.equal(hash, "7eb2e9200b51e2fd16662f963a52b086e79bef94c23cf7485a909fd66115d7fc");
  assert.equal(hero(source), hero(v4));
});

test("LAB is isolated, four-scene and noindex", () => {
  assert.equal((source.match(/data-art-sticky="true"/g) || []).length, 4);
  for (const id of ["art-origin", "art-leaf", "art-climb", "art-roots"]) assert.match(source, new RegExp(`id="${id}"`));
  assert.match(layout, /index:\s*false/);
  assert.match(layout, /follow:\s*false/);
  assert.doesNotMatch(layout, /canonical/);
  assert.doesNotMatch(source, /DeliciosaKnowledgeScrollV4/);
});

test("Content Master FINAL is consumed without product mutation", () => {
  const content = fs.readFileSync("app/__lab/deliciosa/art-direction-v1/art-direction-content.ts", "utf8");
  assert.match(content, /content-master-v1-final\.json/);
  assert.match(content, /publication_eligibility\.startsWith\("V4_ELIGIBLE"\)/);
  assert.match(source, /LAB_VISUAL_EXCERPT|data-lab-visual-excerpt/);
});

test("Motion remains native and reduced-motion has a static state", () => {
  assert.match(controller, /requestAnimationFrame/);
  assert.match(controller, /passive:\s*true/);
  assert.doesNotMatch(controller, /preventDefault|wheel|touchmove/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /artlab-motion-static/);
});

test("Remote review mode freezes the same scene DOM without altering normal scroll", () => {
  assert.match(controller, /params\.get\("review"\) === "1"/);
  assert.match(controller, /data-art-scene-id/);
  for (const scene of ["origin", "leaf", "climb", "subsurface"]) {
    assert.match(source, new RegExp(`data-art-scene-id="${scene}"`));
  }
  assert.match(controller, /reviewProgress/);
  assert.match(controller, /scrollIntoView/);
  assert.match(css, /artlab-review-mode/);
});

test("No prohibited content or external assets are introduced", () => {
  const rendered = `${source}\n${css}`;
  for (const forbidden of [/50\s*[–-]\s*75\s*%/i, /18\s*[–-]\s*28\s*°?C/i, /minimum\s+15\s*°?C/i, /\b[234]\/5\b/, /Rhaphidophora/i, /\bborsigiana\b/i, /\bthrips\b/i, /Botanix/i, /https?:\/\//i]) assert.doesNotMatch(rendered, forbidden);
  assert.doesNotMatch(source, /toujours\s+(couper|guider|enterrer)/i);
  assert.doesNotMatch(source, /garantit.*fenestr/i);
  assert.doesNotMatch(source, /plant-monstera\.jpg/);
});

test("No card soup or heavy motion dependency", () => {
  assert.doesNotMatch(source, /className="[^"]*(card|grid-card)/i);
  assert.doesNotMatch(controller, /gsap|lenis|locomotive|three|webgl/i);
  assert.match(css, /artlab-cutaway/);
  assert.match(css, /artlab-leaf-crop/);
});
