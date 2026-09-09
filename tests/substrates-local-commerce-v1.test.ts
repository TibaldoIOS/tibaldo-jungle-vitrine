import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { substrateLocalCommerce as local, substrateLocalFaq as faq } from "../app/substrats/local-commerce.ts";

const read = (path: string) => readFileSync(path, "utf8");
test("local retail paths are owner-confirmed but do not invent stock or live checkout", () => {
  assert.equal(local.openingDate, "26 septembre 2026");
  assert.match(local.shopNotice, /références publiées avec le retrait activé/);
  assert.equal(faq.length, 7);
  assert.match(faq.map(f => f.answer).join(" "), /pas un stock en temps réel/);
  assert.match(faq.map(f => f.answer).join(" "), /07 43 72 70 79/);
  assert.doesNotMatch(JSON.stringify({ local, faq }), /InStock|revendeur exclusif|livraison gratuite/i);
});
test("three real links preserve canonical identity and environment-correct Shop", () => {
  const component = read("app/substrats/LocalSubstrateVisit.tsx");
  assert.match(component, /shopUrl\(\)/);
  assert.match(component, /tel:\$\{studio.phoneE164\}/);
  assert.match(component, /href="\/contact"/);
  assert.doesNotMatch(component, /https:\/\/(beta-)?shop|use client|onClick|data-reveal/);
});
test("local SEO stays on two existing routes, FAQ HTML and schema share data", () => {
  const page = read("app/substrats-en-vrac-lille/page.tsx");
  assert.match(page, /canonical: "\/substrats-en-vrac-lille"/);
  assert.match(read("app/substrats/page.tsx"), /canonical: "\/substrats"/);
  assert.match(page, /faq=\{\[\.\.\.substrateLocalFaq\]\}/);
  const renderer = read("app/LocalSeoPage.tsx");
  assert.match(renderer, /mainEntity: props.faq.map/);
  assert.match(renderer, /props.faq.map\(\(item\) => <details/);
  assert.doesNotMatch(page, /areaServed|"Offer"|"Product"|service=|InStock/);
});
test("regional visit context retains one Lille address, no Wattignies shop", () => {
  assert.match(local.metro, /pas sur le lieu de culture de Wattignies/);
  assert.match(local.region, /Nord/); assert.match(local.region, /Pas-de-Calais/);
  assert.match(local.region, /Hauts-de-France/); assert.match(local.region, /un seul lieu/);
});
