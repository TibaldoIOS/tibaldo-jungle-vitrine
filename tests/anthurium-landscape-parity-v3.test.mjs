import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import worker from '../dist/server/index.js';

const env = { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const page = async genus => (await worker.fetch(new Request(`https://jungle.tibaldo.fr/plantes/${genus}`), env, ctx)).text();

test('Anthurium and Monstera use identical hero, media, fade and content classes', async () => {
  const extract = html => {
    const section = html.match(/<section[^>]*aria-labelledby="golden-group-title-[^"]+"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section);
    return [...section.matchAll(/<(?:section|div)[^>]*class="([^"]+)"/g)].map(m => m[1]);
  };
  assert.deepEqual(extract(await page('anthurium')), extract(await page('monstera')));
  const component = readFileSync('app/plantes/GoldenGenusHub.tsx', 'utf8');
  assert.doesNotMatch(component, /AnthuriumHeroPlate|plate\.plate/);
  const css = readFileSync('app/plantes/GoldenGroupHeroBaseline.module.css', 'utf8');
  assert.match(css, /object-fit: cover/);
  assert.match(css, /inset: 0 -4% 0 36%/);
});

test('copy and all content after the hero remain byte-identical in source', () => {
  const path = 'app/plantes/GoldenGenusHub.tsx';
  const before = execFileSync('git', ['show', `1586d1822dbbd1a118f23380f260daf1fee192f0:${path}`], { encoding: 'utf8' });
  const after = readFileSync(path, 'utf8');
  const normalize = text => text.split('\n').filter(line => !/import plate|<section className=|<div className=/.test(line)).join('\n');
  assert.equal(normalize(after), normalize(before));
  assert.equal(after.slice(after.indexOf('</section>')), before.slice(before.indexOf('</section>')));
  for (const p of ['app/plantes/GoldenGroupHeroBaseline.module.css', 'app/plantes/GoldenGroupMobileBaseline.module.css', 'app/SiteChrome.tsx', 'lib/plants/anthurium-genus-owner-hero.ts']) {
    assert.equal(readFileSync(p,'utf8'), execFileSync('git',['show',`1586d1822dbbd1a118f23380f260daf1fee192f0:${p}`],{encoding:'utf8'}));
  }
});

test('Anthurium canonical metadata, title, credit and illustrated image are preserved', async () => {
  const html = await page('anthurium');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /https:\/\/jungle\.tibaldo\.fr\/plantes\/anthurium/);
  assert.match(html, /Planche illustrée · Création TIBALDO\./);
  assert.match(html, /anthurium-planche-feuilles-tibaldo.webp/);
  assert.doesNotMatch(html, /beta-jungle\.tibaldo\.fr/);
  for (const [,value] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(()=>JSON.parse(value));
});
