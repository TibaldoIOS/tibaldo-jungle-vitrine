import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('Black Diamond layout fix stays route-scoped and leaves media/content untouched', () => {
  const component = readFileSync('app/plantes/PlantSpeciesHero.tsx', 'utf8');
  const css = readFileSync('app/plantes/BlackDiamondHero.module.css', 'utf8');
  assert.match(component, /plant.genre === "sansevieria" && plant.slug === "black-diamond" \? layout.hero/);
  assert.match(component, /src=\{image.src\}/);
  assert.match(component, /name=\{plant.botanicalName\}/);
  assert.match(css, /height: auto/);
  assert.match(css, /flex: 1 0 auto/);
  assert.match(css, /min-height: auto/);
  assert.match(css, /6.8vw, 104px/);
  assert.match(css, /max-width: 600px/);
});
