import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const page = read("app/coulisses/tibaldo-jungle-actu-fr/page.tsx");
const journal = read("app/coulisses/page.tsx");
const home = read("app/HomeExperience.tsx");
const localLanding = read("app/boutique-plantes-lille/page.tsx");
const lvdn = read("app/coulisses/tibaldo-jungle-la-voix-du-nord/page.tsx");
const lastModified = read("lib/seo/last-modified.ts");
const identity = read("lib/jungle-local-identity.ts");

const route = "/coulisses/tibaldo-jungle-actu-fr";
const pressUrl = "https://actu.fr/hauts-de-france/lille_59350/a-lille-il-transforme-sa-passion-devorante-pour-les-plantes-en-une-boutique-aux-airs-de-jungle_64893523.html";

test("Actu.fr page keeps verified source metadata and an original framing", () => {
  assert.match(page, new RegExp(pressUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(page, /Hervine Mahaud/);
  assert.match(page, /publié le 7 octobre 2026/);
  assert.match(page, /lecture de l’article complet/);
  assert.match(page, /ne reproduit ni son texte ni ses photographies/);
});

test("Actu.fr page is canonical, indexable and exposes bounded structured data", () => {
  assert.match(page, /alternates: \{ canonical: canonicalPath \}/);
  assert.match(page, /robots: \{ index: true, follow: true \}/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /datePublished: "2026-10-07"/);
  assert.match(page, /citation: pressUrl/);
  assert.doesNotMatch(page, /"@type": "Review"/);
  assert.doesNotMatch(page, /sameAs:/);
});

test("Actu.fr page uses approved TIBALDO media, not press photography", () => {
  assert.match(page, /monstera-deliciosa-jeune-feuille-fenestree\.webp/);
  assert.doesNotMatch(page, /<Image[^>]+actu\.fr/i);
  assert.doesNotMatch(page, /Hervine Mahaud[^<]+photograph/i);
});

test("press coverage is connected across journal, home, local landing and both articles", () => {
  for (const source of [journal, home, localLanding, lvdn, lastModified]) assert.match(source, new RegExp(route));
  assert.match(page, /href="\/coulisses\/tibaldo-jungle-la-voix-du-nord"/);
  for (const link of ["/boutique-plantes-lille", "/plantes", "/rempotage", "/substrats", "/contact"]) assert.match(page, new RegExp(`href="${link}"`));
});

test("canonical Lille identity remains unchanged and press sources stay out of sameAs", () => {
  assert.match(identity, /streetAddress: "3 place de l’Arbonnoise"/);
  assert.match(identity, /latitude: 50\.6251203/);
  assert.match(identity, /longitude: 3\.0394823/);
  assert.match(identity, /instagram\.com\/tibaldojungle/);
  assert.match(identity, /facebook\.com\/tibaldojungle/);
  assert.doesNotMatch(identity, /actu\.fr|lavoixdunord\.fr/);
});
