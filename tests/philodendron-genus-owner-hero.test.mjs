import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

test('exact supplied Philodendron illustration and optimized bytes', () => {
  const r = JSON.parse(readFileSync('docs/media-provenance/philodendron-genus-20260913.json'));
  for (const [path, hash] of [[r.original,r.original_sha256],[r.asset,r.asset_sha256]]) {
    assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'),hash);
  }
  assert.equal(r.ai_generated_by_agent,false);
});
test('media is scoped to Philodendron with natural descriptive alt', () => {
  const component=readFileSync('app/plantes/GoldenGenusHub.tsx','utf8');
  const media=readFileSync('lib/plants/philodendron-genus-owner-hero.ts','utf8');
  assert.ok(component.includes('if (genre === "philodendron") return philodendronGenusOwnerHero;'));
  assert.ok(media.includes('Planche illustrée de feuilles de Philodendron'));
  assert.ok(media.includes('width: 1536'));
  const css=readFileSync('app/plantes/GenusIllustrationHero.module.css','utf8');
  assert.doesNotMatch(css,/object-fit:\s*contain|blur\(/);
});
