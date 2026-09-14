import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { genusIntroductions } from '../lib/plants/genus-introductions.ts';
// Existing guide modules use bundler-style extensionless imports.
registerHooks({ resolve(s, c, next) { try { return next(s, c); } catch (error) { if (s.startsWith('.') && !/\.[a-z]+$/.test(s)) return next(s + '.ts', c); throw error; } } });
const { familyGuides } = await import('../lib/plants/family-guides.ts');
const entries = Object.entries(genusIntroductions);
const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const shingles = (s: string) => { const words = normalize(s).split(' '); return new Set(words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(' '))); };
test('every canonical group has an explicit introduction, with no unused group', () => {
  assert.deepEqual(Object.keys(genusIntroductions).sort(), Object.keys(familyGuides).sort());
});
test('two-line headings and paragraphs are complete and unique', () => {
  const headings = new Set<string>(); const sentences = new Map<string,string>();
  for (const [slug, value] of entries) {
    assert.equal(value.heading.length, 2); assert.equal(value.paragraphs.length, 2);
    const heading = normalize(value.heading.join(' ')); assert(!headings.has(heading), slug); headings.add(heading);
    for (const line of value.heading) assert(line.trim().length > 8);
    for (const p of value.paragraphs) {
      assert(p.length > 100, slug);
      for (const sentence of p.split(/(?<=[.!?])\s+/)) {
        const key = normalize(sentence); assert(!sentences.has(key), `${slug} duplicates ${sentences.get(key)}`); sentences.set(key, slug);
      }
    }
    assert(!/un langage commun|des formes singulières|chaque plante est unique|une invitation à|un voyage végétal/i.test(value.heading.join(' ') + value.paragraphs.join(' ')));
  }
});
test('no near-duplicate introduction (word-trigram Jaccard below 0.25)', () => {
  for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
    const a = shingles(entries[i][1].paragraphs.join(' ')), b = shingles(entries[j][1].paragraphs.join(' '));
    const overlap = [...a].filter(x => b.has(x)).length;
    assert(overlap / new Set([...a,...b]).size < 0.25, `${entries[i][0]} / ${entries[j][0]}`);
  }
});
