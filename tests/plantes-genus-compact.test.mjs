import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import worker from '../dist/server/index.js';

const base='3209051a404e4ac3f415ae6c8c316f9f2196505d';
test('compact change preserves page copy, routes, media, shared styling and SEO source',()=>{
  for(const path of ['app/plantes/page.tsx','app/globals.css','app/SiteChrome.tsx','lib/plants/catalog.ts','app/plantes/GoldenGenusHub.tsx']) {
    assert.equal(readFileSync(path,'utf8'),execFileSync('git',['show',`${base}:${path}`],{encoding:'utf8'}),path);
  }
  const path='app/plantes/PlantsColorRhythm.module.css';
  const css=readFileSync(path,'utf8');
  const previous=execFileSync('git',['show',`${base}:${path}`],{encoding:'utf8'});
  assert.ok(css.startsWith(previous),'existing palette and chapter rules unchanged');
  const compact=css.slice(previous.length);
  assert.doesNotMatch(compact,/font-size|font-family|background:|color:|url\(/,'no new colors, typography or images');
  assert.match(compact,/min-height: clamp\(480px, 40vw, 540px\)/);
  assert.match(compact,/position: absolute/,'image intrinsic height cannot stretch grid');
  assert.match(compact,/object-fit: cover/);
  assert.match(compact,/object-position: center 65%/);
  assert.match(compact,/nth-child\(even\)/,'alternation maintained');
  assert.match(compact,/aspect-ratio: 4 \/ 3/,'compact mobile image');
});

test('rendered hub retains four original genre destinations and indexable metadata',async()=>{
  const response=await worker.fetch(new Request('https://jungle.tibaldo.fr/plantes'),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){}});
  assert.equal(response.status,200);
  const html=await response.text();
  assert.equal((html.match(/class="plants-editorial-genus"/g)??[]).length,4);
  for(const genre of ['monstera','anthurium','alocasia','philodendron']) assert.ok(html.includes(`href="/plantes/${genre}"`));
  assert.equal((html.match(/<h1\b/g)??[]).length,1);
  assert.match(html,/<link[^>]*rel="canonical"[^>]*href="https:\/\/jungle.tibaldo.fr\/plantes"/);
  assert.doesNotMatch(html,/beta-jungle\.tibaldo\.fr/);
  for(const [,json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(()=>JSON.parse(json));
});
