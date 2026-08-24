import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(new URL("../app/__lab/deliciosa/DeliciosaScrollStoryD3.tsx", import.meta.url), "utf8");
const d2 = await readFile(new URL("../app/__lab/deliciosa/DeliciosaScrollStoryD2.tsx", import.meta.url), "utf8");
const controller = await readFile(new URL("../app/__lab/deliciosa/D3ScrollStoryController.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/lab/deliciosa/d3/layout.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

const hero = (source) => source.match(/<section className="species-next-hero">[\s\S]*?<\/section>/)?.[0];

test("D3 preserves the owner-approved D2 hero markup", () => {
  assert.ok(hero(component));
  assert.equal(hero(component), hero(d2));
});

test("D3 is an isolated, non-indexed laboratory route", () => {
  assert.match(layout, /index:\s*false/);
  assert.match(layout, /follow:\s*false/);
  assert.match(layout, /canonical:\s*"\/lab\/deliciosa\/d3"/);
});

test("D3 uses one local photographic composition and the five-step storyboard", () => {
  assert.equal((component.match(/data-d3-morphology/g) ?? []).length, 1);
  assert.match(component, /\/monstera-deliciosa-feuilles\.jpg/);
  assert.doesNotMatch(component, /https?:\/\//);
  for (const copy of ["Juvénile", "Ascension", "Elle grimpe", "Maturation", "Adulte"]) assert.match(component, new RegExp(copy));
});

test("D3 keeps native scroll and has no motion dependency or scroll-jacking", () => {
  assert.match(controller, /requestAnimationFrame/);
  assert.match(controller, /passive:\s*true/);
  assert.match(controller, /--d3-progress/);
  assert.doesNotMatch(controller, /preventDefault|touchmove|wheel|gsap|lenis|locomotive/i);
});

test("D3 has one sticky cinematic scene plus reduced-motion and no-JS states", () => {
  assert.match(styles, /\.d3-story-active \.d3-stage\{position:sticky/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)[\s\S]*deliciosa-scroll-story-d3/);
  assert.match(styles, /deliciosa-scroll-story-d3\.d3-story-static/);
  assert.match(styles, /height:395svh/);
});
