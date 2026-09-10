import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("Monstera hub hero uses the supplied Owner image with its exact accessible description", () => {
  const source = readFileSync("app/plantes/GoldenGenusHub.tsx", "utf8");
  assert.match(source, /src: "\/monstera-collection-feuilles-tibaldo\.webp"/);
  assert.match(source, /alt: "Composition de feuilles de Monstera, aux formes, découpes et panachures variées\."/);
  assert.match(source, /if \(genre === "monstera"\) return monsteraHeroMedia/);
  assert.ok(existsSync("public/monstera-collection-feuilles-tibaldo.webp"));
});
