import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import worker from '../dist/server/index.js';
test('Aroid pilot is editorial, attributed, accessible and fail-closed without Shop offers', async () => {
  const response = await worker.fetch(new Request('https://jungle.tibaldo.fr/substrats/aroid-mix'), {ASSETS:{fetch:async()=>new Response('',{status:404})}}, {waitUntil(){}});
  assert.equal(response.status,200);
  const html=await response.text();
  for(const text of ['Aroid Mix.', 'Disponibilité à confirmer', 'Photographies : Sybotanica', 'aroid-mix-texture-main.jpg']) assert.ok(html.includes(text),text);
  assert.ok(!html.includes('beta-jungle.tibaldo.fr'));
  assert.ok(!html.includes('Ajouter au panier'));
  assert.ok(!html.includes('"@type":"Offer"'));
  assert.ok(!html.includes('"@type":"Product"'));
  assert.match(html, /rel="canonical" href="https:\/\/jungle.tibaldo.fr\/substrats\/aroid-mix"/);
  assert.equal((html.match(/<h1/g)||[]).length,1);
});
test('Exact texture and partnership provenance are retained',()=>{
  const registry=JSON.parse(readFileSync(new URL('../app/substrats/aroid-mix/media-provenance.json',import.meta.url)));
  assert.equal(registry.credit,'Sybotanica');
  assert.equal(createHash('sha256').update(readFileSync(new URL('../'+registry.additionalMedia.local,import.meta.url))).digest('hex'),registry.additionalMedia.sha256);
});
