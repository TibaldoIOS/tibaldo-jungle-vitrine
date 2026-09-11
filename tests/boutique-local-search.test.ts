import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const page=readFileSync('app/boutique-plantes-lille/page.tsx','utf8');
test('one local page, exact approved title, semantic intent and no permanent-stock promise',()=>{
  assert.match(page,/Boutique de plantes tropicales et vertes à Lille \| TIBALDO Jungle/);
  for(const word of ['plantes vertes','tropicales','exotiques','collection','selon les arrivages','26 septembre 2026']) assert.ok(page.includes(word));
  assert.match(page,/alternates: \{ canonical: '\/boutique-plantes-lille' \}/);
  assert.match(page,/robots: betaOnlyRobots/);
  assert.doesNotMatch(page,/"@type": "(?:Product|Offer|AggregateRating|FAQPage)"/);
  assert.match(page,/ne sont pas promises en permanence/);
  assert.match(page,/pas un catalogue de stock/);
});
test('six services remain; wall removed only from landing, two questions and compact access',()=>{
  for(const route of ['/conseils','/rempotage','/substrats-en-vrac-lille','/pots-cache-pots-lille','/sos-plantes','/livraison-plantes-lille']) assert.ok(page.includes(route));
  assert.doesNotMatch(page,/regard-vegetal|homeUniverseMedia|Découvrir le service/);
  assert.match(page,/<SiteFooter compactTransit\/>/);
  assert.match(page,/href="\/contact"/);
  const questions=page.split('const questions = [')[1].split('];')[0];
  assert.equal((questions.match(/\['/g)||[]).length,2);
  assert.match(page,/Approfondir dans l’Encyclopédie/);
  for(const path of ['public/owner-media/home-universes/home-universe-plants-owner-v1.avif','public/local-studio/mur-vegetal-tibaldo-640.avif','app/SiteChrome.tsx']) assert.equal(execFileSync('git',['diff','456770b168f0adc2e8be92a3bd29a09085516efb','--',path],{encoding:'utf8'}),'');
});
test('eight contextual routes point toward local landing without changing other genus destinations',()=>{
  const hubs=readFileSync('app/plantes/GoldenGenusHub.tsx','utf8');
  assert.match(hubs,/\['monstera', 'anthurium', 'alocasia', 'philodendron'\].includes\(genre\) \? '\/boutique-plantes-lille' : '\/contact'/);
  for(const route of ['services','rempotage','pots-cache-pots-lille','sos-plantes']) assert.ok(readFileSync(`app/${route}/page.tsx`,'utf8').includes('/boutique-plantes-lille'));
});
test('canonical identity, sitemap, robots, events and unrelated experiments remain byte-identical',()=>{
  for(const path of ['app/robots.ts','app/sitemap.ts','lib/events/catalog.ts','app/HomeExperience.tsx','app/plantes/page.tsx','lib/editorial/catalog.ts']){
    assert.equal(execFileSync('git',['diff','2b45be231c20abd53bca565e43c4a3979333b94e','--',path],{encoding:'utf8'}),'',path);
  }
});
test('only commercial coordinates change in canonical identity; metadata and inbound links preserved',()=>{
  const base='456770b168f0adc2e8be92a3bd29a09085516efb';
  const old=execFileSync('git',['show',`${base}:lib/jungle-local-identity.ts`],{encoding:'utf8'});
  assert.equal(readFileSync('lib/jungle-local-identity.ts','utf8'),old.replace('50.5872384','50.6251203').replace('3.0572544','3.0394823'));
  const oldPage=execFileSync('git',['show',`${base}:app/boutique-plantes-lille/page.tsx`],{encoding:'utf8'});
  assert.equal(page.match(/const title[\s\S]*?const services/)?.[0],oldPage.match(/const title[\s\S]*?const services/)?.[0]);
  assert.equal(page.match(/<h1>[\s\S]*?<\/h1>/)?.[0].replace(/<[^>]+>/g,''),oldPage.match(/<h1>[\s\S]*?<\/h1>/)?.[0].replace(/<[^>]+>/g,''));
  for(const path of ['app/plantes/GoldenGenusHub.tsx','app/services/page.tsx','app/rempotage/page.tsx','app/pots-cache-pots-lille/page.tsx','app/sos-plantes/page.tsx']) assert.equal(execFileSync('git',['diff',base,'--',path],{encoding:'utf8'}),'');
});
test('Wave 1.1 copy, services, questions and local identity are locked',()=>{
  const base='ff31edf5b878dd60a43277d68708aef5fd41debe';
  const old=execFileSync('git',['show',`${base}:app/boutique-plantes-lille/page.tsx`],{encoding:'utf8'});
  assert.equal(page.match(/const services[\s\S]*?export default/)?.[0],old.match(/const services[\s\S]*?export default/)?.[0]);
  for(const paragraph of old.matchAll(/<p(?: [^>]*)?>([^<{]+)<\/p>/g)) assert.ok(page.includes(paragraph[1]),paragraph[1]);
  assert.equal(execFileSync('git',['diff',base,'--','lib/jungle-local-identity.ts'],{encoding:'utf8'}),'');
});
test('native folds keep SSR answers, semantic controls and keyboard activation',()=>{
  assert.match(page,/<details key=\{question\}>/);
  assert.match(page,/<summary>/);
  assert.match(page,/<p>\{answer\}<\/p>/);
  assert.doesNotMatch(page,/onMouseEnter|onTouchStart|preventDefault|dangerouslySetInnerHTML.*answer/);
});
test('narrative CSS has focus equivalents, mobile fallback and reduced-motion override',()=>{
  const css=readFileSync('app/boutique-plantes-lille/boutique.module.css','utf8');
  for(const rule of [':focus-within',':focus-visible','prefers-reduced-motion:reduce','animation:none!important','transition:none!important','.serviceScene>header{position:static','@media(hover:hover)']) assert.ok(css.includes(rule),rule);
  assert.match(page,/article tabIndex=\{0\}/);
  assert.match(page,/li key=\{factor\} tabIndex=\{0\}/);
  assert.ok(css.includes('.serviceScene:has(.services article:focus-within) .actionStage>span{opacity:0!important}'));
  for(let i=1;i<=6;i++) assert.ok(css.includes(`article:nth-child(${i}):focus-within) .actionStage>span:nth-child(${i})`));
});
test('motion is progressive enhancement, finite and scoped; no media or dependency change',()=>{
  const motion=readFileSync('app/boutique-plantes-lille/NarrativeMotion.tsx','utf8');
  assert.match(motion,/reduced.matches/);
  assert.match(motion,/observer.unobserve/);
  assert.doesNotMatch(motion,/setInterval|requestAnimationFrame|style.opacity/);
  const base='ff31edf5b878dd60a43277d68708aef5fd41debe';
  for(const path of ['package.json','package-lock.json','public','app/SiteChrome.tsx','app/ScrollReveal.tsx']) assert.equal(execFileSync('git',['diff',base,'--',path],{encoding:'utf8'}),'',path);
});
