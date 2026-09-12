import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
test('Anthurium reference stays beta-only and reuses one exact image',()=>{
 const hub=readFileSync('app/plantes/GoldenGenusHub.tsx','utf8');
 assert.match(hub,/genre === 'anthurium' && isBetaJungleDeployment/);
 assert.match(hub,/showAnthuriumBoard && <AnthuriumLeafTable/);
 const metadata=JSON.parse(readFileSync('docs/media-provenance/anthurium-leaf-table-reference-v1.json','utf8'));
 assert.equal(metadata.public_rights_confirmed,false);
 assert.equal(createHash('sha256').update(readFileSync(`public${metadata.asset}`)).digest('hex'),metadata.asset_sha256);
 const plate=readFileSync('app/plantes/AnthuriumLeafTable.tsx','utf8');
 assert.match(plate,/loading="lazy"/);assert.match(plate,/Ouvrir le tableau/);
 assert.match(plate,/1427/);assert.match(plate,/1102/);
});
