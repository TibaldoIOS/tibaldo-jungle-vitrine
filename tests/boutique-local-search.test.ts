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
  assert.match(page,/ne vaut pas confirmation de stock/);
});
test('all six real services and accessible, sized, responsive existing Owner image',()=>{
  for(const route of ['/conseils','/rempotage','/substrats-en-vrac-lille','/pots-cache-pots-lille','/sos-plantes','/livraison-plantes-lille']) assert.ok(page.includes(route));
  for(const field of ['width={photo.width}','height={photo.height}','srcSet=','loading="lazy"','alt="Feuillages']) assert.ok(page.includes(field));
  assert.match(page,/homeUniverseMedia.plants/);
  assert.match(page,/ce n’est pas une photographie du stock/);
});
test('eight contextual routes point toward local landing without changing other genus destinations',()=>{
  const hubs=readFileSync('app/plantes/GoldenGenusHub.tsx','utf8');
  assert.match(hubs,/\['monstera', 'anthurium', 'alocasia', 'philodendron'\].includes\(genre\) \? '\/boutique-plantes-lille' : '\/contact'/);
  for(const route of ['services','rempotage','pots-cache-pots-lille','sos-plantes']) assert.ok(readFileSync(`app/${route}/page.tsx`,'utf8').includes('/boutique-plantes-lille'));
});
test('canonical identity, sitemap, robots, events and unrelated experiments remain byte-identical',()=>{
  for(const path of ['lib/jungle-local-identity.ts','app/robots.ts','app/sitemap.ts','lib/events/catalog.ts','app/HomeExperience.tsx','app/plantes/page.tsx','lib/editorial/catalog.ts']){
    assert.equal(execFileSync('git',['diff','2b45be231c20abd53bca565e43c4a3979333b94e','--',path],{encoding:'utf8'}),'',path);
  }
});
