// Bounded offline importer. No runtime request, invented media or packaging edits.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { readyMixes, selectedComponents, mineral, nutrition } from '../app/substrats/selection.ts';
const entries = [...readyMixes.map(p=>({...p,family:'mix'})),...selectedComponents.map(p=>({...p,family:'component'})),{...mineral,id:'mineral',family:'mineral'},...nutrition.map(p=>({...p,family:'nutrition'}))];
const evidenceDir='media-evidence/sybotanica-products-v2';
const assetDir='public/supplier-media/sybotanica/products';
await fs.mkdir(evidenceDir,{recursive:true});
await fs.mkdir(assetDir,{recursive:true});
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const rows=[];
// Exact official media IDs visually reviewed as a set on 2026-09-03.
const approvedIds=[55932475670855,55932404728135,55932436644167,55932365209927,55932423045447,55932443722055,55932393029959,55932482421063,55932456534343,55932383232327,55932373369159,55932466626887,55932492316999,57490484691271,57490484265287,57490487181639,57490459820359,45551473295687,54916085219655,54916085645639,54916110057799,54916088168775,54916089217351,54916086628679];
for(const entry of entries){
  const cache=`${evidenceDir}/${entry.id}.json`;
  let p;
  try { p=JSON.parse(await fs.readFile(cache,'utf8')); }
  catch { const r=await fetch(entry.source+'.js'); if(!r.ok) throw Error(`${entry.id} HTTP ${r.status}`); p=await r.json(); await fs.writeFile(cache,JSON.stringify(p,null,2)+'\n'); }
  const candidates=p.media.filter(m=>m.media_type==='image');
  console.log(JSON.stringify({id:entry.id,title:p.title,candidates:candidates.slice(0,3).map(m=>({id:m.id,alt:m.alt,src:m.src}))}));
  if(!process.argv.includes('--integrate')) continue;
  // Selection is based on source metadata plus visual inspection of the full sheet.
  const selected=candidates.find(candidate=>candidate.id===approvedIds[entries.indexOf(entry)]);
  if(!selected || new URL(selected.src).hostname!=='cdn.shopify.com') throw Error(`Unrecognized media ${entry.id}`);
  const response=await fetch(selected.src); if(!response.ok) throw Error(`Media ${entry.id}: ${response.status}`);
  const original=Buffer.from(await response.arrayBuffer());
  const originalMetadata=await sharp(original).metadata();
  const variants=[];
  for(const width of [400,800]){
    const filename=`sybotanica-${entry.id}-${width}.webp`;
    const result=await sharp(original).rotate().resize({width,withoutEnlargement:true}).webp({quality:83}).toBuffer({resolveWithObject:true});
    await fs.writeFile(`${assetDir}/${filename}`,result.data);
    variants.push({src:`/media/supplier-media/sybotanica/products/${filename}`,width:result.info.width,height:result.info.height,bytes:result.data.length,sha256:sha(result.data)});
  }
  rows.push({id:entry.id,product:entry.name,family:entry.family,sourceUrl:entry.source,sourceType:'OFFICIAL_SYBOTANICA_PRODUCT_PAGE',officialSybotanica:true,manufacturerTitle:p.title,manufacturerProductId:p.id,mediaId:selected.id,originalUrl:selected.src,manufacturerAlt:selected.alt,originalSha256:sha(original),originalWidth:originalMetadata.width,originalHeight:originalMetadata.height,credit:'Sybotanica',rightsBasis:'OWNER_CONFIRMED_ACTIVE_PARTNERSHIP_AND_REQUESTED_BETA_PRODUCT_PRESENTATION_2026_09_03',publicPromotion:'SEPARATE_RIGHTS_REVIEW_REQUIRED',aiGenerated:false,processing:'Resize and WebP compression only. Full image and packaging retained.',variants});
}
if(rows.length){
  if(rows.length!==24)throw Error('Expected 24 exact products');
  await fs.writeFile('app/substrats/product-media.json',JSON.stringify(rows,null,2)+'\n');
  // Read-only QA sheet derived from the authentic downloaded images, not a web asset.
  const thumbs=await Promise.all(rows.map(async(row,i)=>({input:await sharp(`${assetDir}/sybotanica-${row.id}-400.webp`).resize({width:200,height:240,fit:'contain',background:'#fff'}).png().toBuffer(),left:(i%6)*200,top:Math.floor(i/6)*240})));
  await sharp({create:{width:1200,height:960,channels:3,background:'#fff'}}).composite(thumbs).jpeg({quality:90}).toFile(`${evidenceDir}/contact-sheet.jpg`);
  console.log(`INTEGRATED ${rows.length}, bytes ${rows.reduce((n,r)=>n+r.variants.reduce((a,v)=>a+v.bytes,0),0)}`);
}
