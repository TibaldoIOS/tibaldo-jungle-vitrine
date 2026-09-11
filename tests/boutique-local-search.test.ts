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
  assert.equal(page.match(/<h1>[\s\S]*?<\/h1>/)?.[0],oldPage.match(/<h1>[\s\S]*?<\/h1>/)?.[0]);
  for(const path of ['app/plantes/GoldenGenusHub.tsx','app/services/page.tsx','app/rempotage/page.tsx','app/pots-cache-pots-lille/page.tsx','app/sos-plantes/page.tsx']) assert.equal(execFileSync('git',['diff',base,'--',path],{encoding:'utf8'}),'');
});
