import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import worker from '../dist/server/index.js';

test('/liens is rendered with exact destinations, official favicon and contextual contacts', async () => {
  const response = await worker.fetch(new Request('https://beta-jungle.tibaldo.fr/liens'), {ASSETS:{fetch:async()=>new Response('missing',{status:404})}}, {waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200);
  const html=await response.text();
  const nav=html.match(/<nav[^>]*aria-label="Découvrir et suivre TIBALDO Jungle"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav);
  assert.equal((nav.match(/<a /g)||[]).length,3);
  for(const url of ['https://jungle.tibaldo.fr','https://www.instagram.com/tibaldojungle','https://facebook.com/tibaldojungle']) assert.ok(nav.includes(`href="${url}"`));
  for(const value of ['tel:+33743727079','mailto:jungle@tibaldo.fr','/favicon.svg']) assert.ok(html.includes(value));
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/jungle.tibaldo.fr\/liens"/);
  assert.match(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.ok(readFileSync(new URL('../public/favicon.svg',import.meta.url)).length<1024);
});
