import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
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
test('mobile header separates brand/menu from retained social and shop controls', () => {
  const css = read('app/IphoneSafariUx.css');
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) auto/);
  assert.match(css, /grid-row: 2/);
  assert.match(css, /white-space: normal/);
  assert.match(css, /header-socials a \{ width: 44px; height: 44px/);
  assert.match(read('app/SiteChrome.tsx'), /header-shop.*href=\{shopUrl\(\)\}/);
});
test('home mobile has no continuous motion listener; rotation restores desktop and cleanup removes it', () => {
  let cleanup;
  const listeners = new Map();
  const media = (matches) => ({ matches, addEventListener(_, fn) { this.change = fn; }, removeEventListener() { this.change = null; } });
  const mobile = media(true), reduced = media(false);
  const hero = { style: { removeProperty() {} } };
  const compiled = ts.transpileModule(read('app/ScrollReveal.tsx'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  runInNewContext(compiled, {
    exports,
    require: name => name === 'react' ? { useEffect: fn => { cleanup = fn(); } } : { usePathname: () => '/' },
    document: {
      documentElement: { classList: { add() {}, remove() {} } }, body: {},
      querySelectorAll: () => [], querySelector: selector => selector === '.hero' ? hero : {},
    },
    window: {
      IntersectionObserver: true,
      matchMedia: query => query.includes('max-width') ? mobile : reduced,
      addEventListener: (event, fn) => listeners.set(event, fn),
      removeEventListener: event => listeners.delete(event),
      requestAnimationFrame: () => 1, cancelAnimationFrame() {},
    },
    IntersectionObserver: class { observe() {} disconnect() {} },
    MutationObserver: class { observe() {} disconnect() {} },
  });
  exports.default();
  assert.equal(listeners.has('scroll'), false);
  mobile.matches = false; mobile.change();
  assert.equal(listeners.has('scroll'), true);
  mobile.matches = true; mobile.change();
  assert.equal(listeners.has('scroll'), false);
  cleanup();
  assert.equal(mobile.change, null);
  assert.equal(reduced.change, null);
});
