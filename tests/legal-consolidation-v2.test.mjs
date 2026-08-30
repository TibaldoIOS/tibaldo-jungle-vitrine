import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("privacy V2 is one canonical transverse beta source", async () => {
  const [privacy, legacy] = await Promise.all([read("app/politique-confidentialite/page.tsx"), read("app/politique-de-confidentialite/page.tsx")]);
  assert.match(privacy, /TIBALDO_PRIVACY_BETA_V2_2026-08-30/);
  assert.match(privacy, /contact@tibaldo\.fr/);
  assert.match(privacy, /Beta Lab et captures privées/);
  assert.match(privacy, /robots: \{ index: false, follow: false \}/);
  assert.match(legacy, /redirect\("\/politique-confidentialite"\)/);
});

test("CGV V2 distinguish distance sales, living plants and handover", async () => {
  const terms = await read("app/conditions-generales-de-vente/page.tsx");
  assert.match(terms, /TIBALDO_CGV_BETA_V2_2026-08-30/);
  assert.match(terms, /contrat à distance/);
  assert.match(terms, /ne constitue pas une exclusion générale de toutes les plantes/);
  assert.match(terms, /L’absence de réserve immédiate ne supprime/);
  assert.match(terms, /effectuée directement par Tibaldo/);
  assert.doesNotMatch(terms, /s’engage à reprendre contact sous quarante-huit heures/);
  assert.doesNotMatch(terms, /actuellement 9,90 €|forfait de 49 €/);
});
