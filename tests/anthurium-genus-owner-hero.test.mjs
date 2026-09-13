import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const registry = JSON.parse(readFileSync('docs/media-provenance/anthurium-genus-20260913.json', 'utf8'));
test('exact original and optimized illustration preserved', () => {
  for (const [path, hash] of [
    ['docs/media-provenance/originals/anthurium-genus-20260913/owner-original.jpg', 'fe2ada2663ab8bf79024ae840fa720f7306f448844347d7d895005f63b3bd11c'],
    ['public/owner-media/anthurium-genus/anthurium-planche-feuilles-tibaldo.webp', '18cd9e6f3f2597277741c301e8fd545dff3f7c7cfe34a01ef9b19972a852ccc3'],
  ]) assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'), hash);
  assert.ok(JSON.stringify(registry).includes('TIBALDO'));
});
test('illustration is scoped to Anthurium and labelled honestly', () => {
  const component = readFileSync('app/plantes/GoldenGenusHub.tsx', 'utf8');
  const media = readFileSync('lib/plants/anthurium-genus-owner-hero.ts', 'utf8');
  assert.ok(component.includes('if (genre === "anthurium") return anthuriumGenusOwnerHero;'));
  assert.ok(component.includes('/monstera-collection-feuilles-tibaldo.webp'));
  assert.ok(media.includes('Planche illustrée présentant différentes formes de feuilles d’Anthurium'));
  assert.ok(media.includes('width: 487'));
  assert.ok(media.includes('height: 630'));
});
