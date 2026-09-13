import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import worker from '../dist/server/index.js';

test('Plants color chapter preserves source copy, metadata, cards and shared design', () => {
  const path = 'app/plantes/page.tsx';
  const before = execFileSync('git', ['show', `4ee919f58928cbb996f2d985601bed668858b98b:${path}`], {encoding:'utf8'});
  const after = readFileSync(path,'utf8');
  const normalize = s => s.replace(/import rhythm[^\n]*\n/,'').replace(/className=\{`plants-editorial-genera \$\{rhythm.chapter\}`\}/,'className="shell plants-editorial-genera"').replace('<div className="shell"><div className="plants-editorial-genera-list">','<div className="plants-editorial-genera-list">').replace('</div></div>\n      </section>','</div>\n      </section>');
  assert.equal(normalize(after),before);
  for(const p of ['app/globals.css','app/SiteChrome.tsx','app/plantes/GoldenGenusHub.tsx']) assert.equal(readFileSync(p,'utf8'),execFileSync('git',['show',`4ee919f58928cbb996f2d985601bed668858b98b:${p}`],{encoding:'utf8'}));
});

test('Canonical Jungle chapter palette exceeds WCAG AA normal-text contrast', () => {
  const luminance = hex => hex.match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  for(const color of ['f1eee3','b9c9a7']) assert.ok((luminance(color)+.05)/(luminance('09261b')+.05)>4.5);
  const css=readFileSync('app/plantes/PlantsColorRhythm.module.css','utf8');
  assert.match(css,/background: var\(--forest-dark\)/);
  assert.match(css,/color: var\(--cream\)/);
  assert.match(css,/color: var\(--sage\)/);
  assert.doesNotMatch(css,/#[0-9a-f]{3,8}\b/i);
});

test('Rendered PUBLIC hub retains four doors, canonical, one H1 and valid JSON-LD', async () => {
  const response=await worker.fetch(new Request('https://jungle.tibaldo.fr/plantes'),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200);
  const html=await response.text();
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/<link[^>]*rel="canonical"[^>]*href="https:\/\/jungle.tibaldo.fr\/plantes"/);
  for(const slug of ['monstera','anthurium','alocasia','philodendron']) assert.ok(html.includes(`href="/plantes/${slug}"`));
  assert.doesNotMatch(html,/beta-jungle\.tibaldo\.fr/);
  for(const [,json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(()=>JSON.parse(json));
});
