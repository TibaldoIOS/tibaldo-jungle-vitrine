import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import worker from '../dist/server/index.js';

const ctx = { waitUntil() {}, passThroughOnException() {} };
const env = { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } };
const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
test('Monstera hero serves the approved real photo without an illustrated board', async () => {
  const response = await worker.fetch(new Request('https://beta-jungle.tibaldo.fr/plantes/monstera'), env, ctx);
  assert.equal(response.status, 200);
  const html = await response.text();
  const hero = html.split('</section>')[0];
  assert.match(hero, /monstera-deliciosa-jonathan-borba-pexels.webp/);
  assert.doesNotMatch(hero, /monstera-leaf-identification-owner-reference|data-botanical-hub-leaf-plate/);
  assert.match(html, /noindex/);
});
test('home contrast remains local and dock labels keep existing geometry', () => {
  const polish = css.slice(css.indexOf('/* Pre-opening polish:'));
  assert.match(polish, /#accueil.hero .hero-shade/);
  assert.match(polish, /font-size: 11px/);
  assert.doesNotMatch(polish, /background-image:|url\(|min-height:|padding:|(?:^|\s)height:/);
});
