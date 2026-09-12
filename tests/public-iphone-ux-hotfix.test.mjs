import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p, 'utf8');
test('opening signal reuses monochrome SVG without changing destination or copy', () => {
  const s = read('app/PublicPreopeningSignal.tsx');
  assert.match(s, /Préparer l’ouverture <Arrow \/>/);
  assert.doesNotMatch(s, /↗/);
  assert.match(s, /href="\/evenements\/ouverture-tibaldo-jungle-lille"/);
});
test('dock clearance follows actual dimensions and safe area, with cleanup', () => {
  const s = read('app/ConversionDock.tsx'), css = read('app/IphoneSafariUx.css');
  assert.match(s, /ResizeObserver\(measure\)/);
  assert.match(s, /getBoundingClientRect\(\).height \+ bottom \+ 16/);
  assert.match(s, /observer.disconnect\(\)/);
  assert.doesNotMatch(s, /addEventListener\("scroll"/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /scroll-padding-bottom: var\(--jungle-dock-clearance\)/);
  assert.match(css, /min-height: 44px/);
});
test('scroll frame batches all geometry reads before style writes', () => {
  const s = read('app/ScrollReveal.tsx');
  assert.ok(s.indexOf('getBoundingClientRect()') < s.indexOf('hero.style.setProperty'));
  assert.doesNotMatch(s.slice(s.indexOf('hero.style.setProperty')), /getBoundingClientRect|offsetHeight/);
  assert.match(s, /passive: true/);
});
test('mobile retains arrivals but removes animated filter from home reveals', () => {
  const s = read('app/IphoneSafariUx.css');
  assert.match(s, /max-width: 800px/);
  assert.match(s, /transition-property: opacity, transform/);
  assert.match(s, /animation-name: safari-photo-arrival/);
  assert.doesNotMatch(s.slice(s.indexOf('@keyframes safari-photo-arrival')), /filter:/);
  assert.match(read('app/globals.css'), /prefers-reduced-motion: reduce/);
});
