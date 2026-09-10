import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { editorialArticles, editorialMedia, getEditorialArticle } from '../lib/editorial/catalog.ts';
import { editorialStructuredData } from '../lib/editorial/seo.ts';
import { plants } from '../lib/plants/catalog.ts';

test('one real pilot, reusable chapters, valid references and real internal destinations', () => {
  assert.equal(editorialArticles.length, 1);
  const article = getEditorialArticle('monstera-half-moon')!;
  assert.ok(article); assert.equal(getEditorialArticle('guttation'), undefined);
  assert.equal(article.relatedArticles.length, 0);
  assert.equal(new Set(article.chapters.map(c => c.id)).size, article.chapters.length);
  for (const chapter of article.chapters) for (const id of chapter.sources) assert.ok(article.sources.some(s => s.id === id));
  for (const callout of article.callouts) assert.ok(article.chapters.some(c => c.id === callout.after));
  for (const related of article.relatedPlants) assert.ok(plants.some(p => p.genre === related.genre && p.slug === related.slug));
});
test('exact rights-cleared photography is reused with explicit contextual qualification', () => {
  const article = editorialArticles[0]; const media = editorialMedia(article)!;
  assert.equal(media.license?.status, 'verified'); assert.equal(media.license?.creator, 'TIBALDO');
  assert.ok(media.license?.sourceUrl); assert.ok(media.license?.registryPath);
  assert.match(media.src, /monstera-thai-constellation-owner-2026-09.webp$/);
  assert.ok(existsSync(`public${media.src}`)); assert.equal(media.width, 1365); assert.equal(media.height, 2048);
  assert.match(article.heroMedia.context, /non démonstration d’un motif Half Moon/);
  assert.doesNotMatch(media.alt, /Owner|VERIFIED_MEDIA|Half Moon/);
});
test('scientific sources and limits, no unfounded categorical cultivar claim', () => {
  const article = editorialArticles[0]; assert.equal(article.sources.length, 4);
  assert.ok(article.sources.every(s => s.supports && s.limitation && /^https:\/\//.test(s.url)));
  const prose = article.chapters.flatMap(c => c.paragraphs).join(' ');
  assert.match(prose, /ne prouve pas son inexistence/);
  assert.match(prose, /conseil de culture et de choix personnel/);
  assert.doesNotMatch(prose, /aucun cultivar|variété officiellement inexistante|garantit.*Half Moon/);
});
test('Article and breadcrumb schema respect the supplied environment, with no product or ratings', () => {
  for (const origin of ['https://beta-jungle.tibaldo.fr', 'https://jungle.tibaldo.fr']) {
    const data = editorialStructuredData(editorialArticles[0], origin); const json = JSON.stringify(data);
    assert.deepEqual(data['@graph'].map(x => x['@type']), ['Article', 'BreadcrumbList']);
    assert.doesNotMatch(json, /Product|Offer|AggregateRating|reviewCount/);
    assert.ok(json.includes(`${origin}/oeil-vegetal/monstera-half-moon`));
    assert.ok(json.includes(`${origin}/owner-media/monstera/`));
    if (origin.includes('beta-')) assert.ok(!json.includes('https://jungle.tibaldo.fr'));
  }
});
test('server-rendered content remains visible, semantic, keyboard navigable and motion-free', () => {
  const css = readFileSync('app/oeil-vegetal/oeil.css', 'utf8');
  const page = readFileSync('app/oeil-vegetal/[slug]/page.tsx', 'utf8');
  assert.match(css, /focus-visible/); assert.match(css, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(css, /opacity:\s*0[;}]/); assert.doesNotMatch(page, /data-reveal|onClick|use client/);
  assert.match(page, /betaOnlyRobots/); assert.match(page, /notFound\(\)/);
  assert.match(page, /<article>/); assert.match(page, /<nav/);
  assert.match(readFileSync('app/SiteChrome.tsx', 'utf8'), /isBetaJungleDeployment && <Link href="\/oeil-vegetal"/);
});
