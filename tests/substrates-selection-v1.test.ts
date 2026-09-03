import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readyMixes, mixGroups, plantMixMapping, nutrition, mineral, selectedComponents, sourceRegistry } from "../app/substrats/selection.ts";
import { plantFamilies } from "../lib/plants/catalog.ts";
import { supplierMedia, supplierMediaRights } from "../app/substrats/supplier-media.ts";
import { createHash } from "node:crypto";

test("selection contains exactly 13 mixes, 4 components, 6 nutrition references and 1 mineral source", () => {
  assert.equal(readyMixes.length, 13); assert.equal(selectedComponents.length, 4); assert.equal(nutrition.length, 6); assert.ok(mineral.source); assert.equal(sourceRegistry.length, 24);
  assert.equal(new Set(sourceRegistry.map(s => s.url)).size, 24);
});
test("every plant finder entry resolves to its canonical mix without duplicated mapping", () => {
  for (const item of plantMixMapping) assert.ok(readyMixes.some(m => m.id === item.mixId && m.plants.includes(item.plant)));
  for (const name of ["Monstera", "Philodendron", "Alocasia", "Anthurium", "Calathea", "Maranta", "Ficus", "Orchidée", "Cactus", "Succulente", "Bonsaï", "Hoya", "Syngonium", "Fougère", "Carnivore", "Terrarium"]) assert.ok(plantMixMapping.some(p => p.plant === name), name);
  assert.equal(new Set(plantMixMapping.map(p => p.plant)).size, plantMixMapping.length);
});
test("editorial groups and encyclopedia destinations exist", () => {
  for (const mix of readyMixes) {
    assert.ok(mixGroups.some(g => g.id === mix.group));
    for (const slug of mix.hubs) assert.ok(plantFamilies.some(g => g.slug === slug && g.available), slug);
  }
});
test("product source registry does not grant rights to individual packshots; no runtime supplier fetch", () => {
  for (const entry of sourceRegistry) {
    assert.equal(new URL(entry.url).hostname, "www.sybotanica.com");
    assert.equal(entry.reviewedAt, "2026-09-03"); assert.equal(entry.mediaRights, "NOT_ESTABLISHED_NO_SUPPLIER_IMAGE_USED");
  }
  const component = readFileSync("app/substrats/SubstrateSelection.tsx", "utf8");
  assert.doesNotMatch(component, /fetch\(|useEffect|use client|<iframe/);
  assert.match(component, /plantMixMapping\.map/); assert.match(component, /tabIndex=\{-1\}/);
});
test("only two authorized press photographs, exact bytes and local delivery", () => {
  assert.equal(Object.keys(supplierMedia).length,2);
  assert.equal(supplierMediaRights.evidence,"https://www.sybotanica.com/pages/press");
  assert.equal(supplierMediaRights.packshotRights,"NOT_ESTABLISHED_NOT_USED");
  const expected=["3db8dcc78a2eeccd76c2a8ae4014ea634dfec979c9e19cb73b5fb6896e4d3f58","ea642ab22fbe44ca9fd691d99d657a9faeef8d83f82dc8e9e361c0754c92e18a"];
  Object.values(supplierMedia).forEach((media,index)=>{
    assert.ok(media.source.startsWith("https://drive.google.com/file/d/"));
    assert.equal(createHash("sha256").update(readFileSync(`public${media.src}`)).digest("hex"),expected[index]);
    assert.ok(media.alt.length>20);
  });
});
test("existing route and matter guides preserved, content visible without reveal dependency", () => {
  const page = readFileSync("app/substrats/page.tsx", "utf8");
  assert.match(page, /canonical: "\/substrats"/); assert.match(page, /substrates\.map/);
  assert.match(page, /<SubstrateSelection/);
  const component = readFileSync("app/substrats/SubstrateSelection.tsx", "utf8");
  assert.doesNotMatch(component, /data-reveal/);
  const css = readFileSync("app/substrats/selection.module.css", "utf8");
  assert.doesNotMatch(css, /opacity:\s*0|display:\s*none/);
  assert.match(css, /:focus-visible/); assert.match(css, /prefers-reduced-motion/);
});
