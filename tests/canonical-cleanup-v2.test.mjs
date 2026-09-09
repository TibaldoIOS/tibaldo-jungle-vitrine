import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {default as worker} from '../dist/server/index.js';
const ctx={waitUntil(){},passThroughOnException(){}};
const env={ASSETS:{fetch:async request=>{
 const pathname=new URL(request.url).pathname;
 try{return new Response(await readFile(new URL('../public'+pathname,import.meta.url)),{headers:{'content-type':pathname.endsWith('.wasm')?'application/wasm':pathname.endsWith('.html')?'text/html':'application/octet-stream'}});}
 catch{return new Response('Not found',{status:404});}
}}};
const render=path=>worker.fetch(new Request('https://jungle.tibaldo.fr'+path),env,ctx);
test('PUBLIC93 tour remains served with its dedicated CSP and exact assets',async()=>{
 const homepage=await (await render('/')).text();assert.match(homepage,/href="\/visite-jungle\/index.html"/);
 for(const path of ['/visite-jungle/index.html','/visite-jungle/jungle.glb','/visite-jungle/vendor/draco/draco_decoder.wasm']){
  const response=await render(path);assert.equal(response.status,200,path);
  assert.match(response.headers.get('content-security-policy'),/wasm-unsafe-eval/);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()),await readFile(new URL('../public'+path,import.meta.url)));
 }
});
test('Monstera keeps its approved V6 hero with standard species body and care links',async()=>{
 const response=await render('/plantes/monstera/deliciosa');assert.equal(response.status,200);
 const html=await response.text();assert.match(html,/species-next-hero/);assert.match(html,/monstera-deliciosa-jonathan-borba-pexels.webp/);
 assert.match(html,/Comprendre ses besoins/);assert.match(html,/Observer longtemps/);
 assert.doesNotMatch(html,/species-experience-v[456]|deliciosa-art-direction/);
});
