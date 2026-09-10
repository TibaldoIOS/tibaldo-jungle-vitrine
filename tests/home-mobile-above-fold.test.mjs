import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import worker from '../dist/server/index.js';
const base='979673c58b5774ff62360f1ea8fcc72c995ea45d';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('homepage retains identity, primary actions and opening facts',async()=>{
 const r=await worker.fetch(new Request('https://jungle.tibaldo.fr/'),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){}});
 assert.equal(r.status,200); const html=await r.text();
 for(const value of ['Plantes rares et tropicales à Lille','10 h–19 h','26 SEPTEMBRE 2026','Entrée gratuite','Explorer la Jungle','https://shop.tibaldo.fr/','preopening-compact'])assert.ok(html.includes(value),value);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.ok(!html.includes('beta-shop.tibaldo.fr'));
});
test('compact treatment is homepage scoped and mobile only',()=>{
 const css=read('app/HomeMobile.module.css');
 assert.match(css,/@media \(max-width: 600px\)/);
 assert.match(css,/\.home :global\(\.hero-local-coordinates\) \{ display: none; \}/);
 assert.match(css,/min-height: 44px/);
 assert.match(css,/safe-area-inset-bottom/);
 assert.match(css,/:global\(body\):has\(\.home\)/);
});
test('social destinations remain in accessible menu',()=>{
 const s=read('app/MobileJungleMenu.tsx');
 assert.match(s,/https:\/\/www.instagram.com\/tibaldojungle/);
 assert.match(s,/https:\/\/www.facebook.com\/tibaldojungle/);
 assert.match(s,/aria-modal="true"/);
});
test('event data, photo, navigation, carousel and substrates stay unchanged',()=>{
 for(const p of ['app/HomeOpeningBanner.tsx','app/HomeExperience.tsx','app/SiteChrome.tsx','app/ConversionDock.tsx','lib/jungle-local-identity.ts','app/substrats/SubstrateSelection.tsx','public/hero-jungle.jpg']){
  const before=execFileSync('git',['show',`${base}:${p}`]);
  assert.deepEqual(readFileSync(new URL('../'+p,import.meta.url)),before,p);
 }
});
