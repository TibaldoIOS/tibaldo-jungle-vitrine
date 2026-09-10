import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveFeaturedTableaux } from '../lib/plants/featured-tableaux.ts';
import { plantFamilies, plants } from '../lib/plants/catalog.ts';

test('12 unique canonical entrances; exact counts and strict photo provenance', () => {
  const cards = resolveFeaturedTableaux();
  assert.equal(cards.length, 12);
  assert.equal(new Set(cards.map(c => c.slug)).size, 12);
  assert.equal(plantFamilies.length, 31);
  for (const card of cards) {
    assert.ok(plantFamilies.some(g => g.slug === card.slug));
    assert.equal(card.count, plants.filter(p => p.genre === card.slug).length);
    if (card.image) {
      assert.equal(card.image.license?.status, 'verified');
      assert.ok(card.image.license?.sourceUrl);
      assert.ok(card.image.license?.creator);
      assert.ok(card.image.alt);
      assert.ok(!card.image.src.endsWith('.svg'));
    }
  }
});
test('neutral states do not borrow another genus photo', () => {
  const cards = resolveFeaturedTableaux();
  for (const genus of ['calathea', 'maranta', 'musa', 'strelitzia']) assert.equal(cards.find(c => c.slug === genus)?.image, null);
});
test('semantic cards and motion safeguards preserve direct navigation', () => {
  const css = readFileSync('app/plantes/tableaux.css','utf8');
  const component = readFileSync('app/plantes/FeaturedTableaux.tsx','utf8');
  const page = readFileSync('app/plantes/page.tsx','utf8');
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /repeat\(4,minmax/);
  assert.match(css, /repeat\(2,minmax/);
  assert.ok(!component.includes('onClick'));
  assert.match(component, /aria-describedby/);
  assert.match(page, /<PlantExplorer/);
  assert.match(page, /<CompactBotanicalIndex/);
  assert.ok(!page.includes('<BotanicalMotif'));
});
