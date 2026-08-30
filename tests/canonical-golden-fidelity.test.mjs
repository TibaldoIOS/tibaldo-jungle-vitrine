import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { isEditorialPlaceholder } from "../lib/plants/types.ts";

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function readDirectCssImports(relativeComponentPath) {
  const componentUrl = new URL(`../${relativeComponentPath}`, import.meta.url);
  const source = readFileSync(componentUrl, "utf8");
  const css = [...source.matchAll(/import\s+\w+\s+from\s+["']([^"']+\.module\.css)["']/g)]
    .map(([, specifier]) => readFileSync(new URL(specifier, componentUrl), "utf8"))
    .join("\n");
  return { source, css };
}

test("canonical Species mounts the locked Golden Species generation", () => {
  const profile = read("app/plantes/PlantProfile.tsx");
  const { source, css } = readDirectCssImports("app/plantes/GoldenSpeciesProfile.tsx");

  assert.match(profile, /<GoldenSpeciesProfile\s+plant=\{plant\}/);
  assert.doesNotMatch(profile, /ThaiConstellationProfileV3|VeitchiiProfileV2|DeliciosaProfileNext/);
  assert.match(source, /data-golden-species-v(?:1|25)/);
  assert.match(source, /PlantNeedsVisualSystem/);
  assert.match(source, /BotanicalPhotoBook/);
  assert.match(source, /BotanicalFaq/);
  assert.match(source, /Statut, synonymes et observation|Taxonomie complète et synonymes/);
  assert.match(source, /Lecture en dix secondes/);
  assert.match(source, /Diagnostic prudent/);
  assert.match(source, /Aucune image fabriquée|mediaGap/);

  assert.match(css, /border-radius:\s*48% 48% 3px 3px\s*\/\s*16% 16% 3px 3px/i);
  assert.match(css, /\.archMedia::after[^]*transform:\s*scaleX\(1\)/i);
  assert.match(css, /transform-origin:\s*right center/i);
  assert.match(css, /transition:\s*transform 1\.65s \.18s cubic-bezier\(\.77,\s*0,\s*\.18,\s*1\)/i);
  assert.match(css, /\.archFigure:global\(\.is-visible\) \.archMedia::after[^]*transform:\s*scaleX\(0\)/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[^]*\.archMedia::after/i);
  assert.doesNotMatch(css, /clip-path/i);

  assert.doesNotMatch(source, /<summary[^]*?<i\s+aria-hidden=["']true["']/i);
  assert.doesNotMatch(css, /\.(?:deepDive|diagnosticList)\s+summary\s+i[^}]*border-(?:right|bottom)/i);
  assert.doesNotMatch(source, /ThaiConstellationProfileV3|thai-profile-v3|veitchii-v2-id-grid|veitchii-v2-conditions-grid/);
});

test("canonical Group mounts the locked Golden Group generation without a mosaic", () => {
  const { source, css } = readDirectCssImports("app/plantes/GoldenGenusHub.tsx");
  const genusRoute = read("app/plantes/[genre]/page.tsx");
  const bananas = read("app/plantes/bananiers/page.tsx");

  assert.match(genusRoute, /<GoldenGenusHub/);
  assert.match(bananas, /<GoldenGenusHub/);
  assert.match(source, /data-golden-group-v(?:1|25)/);
  assert.match(source, /data-hub-chapter-marker/);
  assert.match(source, /HubChapterMarker/);
  assert.match(source, /PlantCarePassport/);
  assert.match(source, /GenusSpeciesCarousel/);
  assert.match(source, /BotanicalFaq/);
  assert.doesNotMatch(source, /pilea-planche-formes-textures\.webp/);
  assert.match(source, /resolved-with-verified-cc0-species-photo/);
  assert.match(source, /data-group-media-state=\{media \? media\.rights : "honest-gap"\}/);
  assert.doesNotMatch(source, /heroMosaic|pilea-collection-especes|photo mosaic|photo-mosaic/i);
  assert.doesNotMatch(source, /genus-pilot-|anth-v2-|botanical-genus-hero|photo-genus-hero/i);

  assert.match(css, /--hub-body-size:\s*17px/i);
  assert.match(css, /--hub-body-leading:\s*1\.58/i);
  assert.match(css, /\.chapterMarker\s*\{/i);
  assert.match(css, /\.chapterMarker span[^]*border-radius:/i);
  assert.match(css, /\.chapterMarker i[^]*linear-gradient/i);
  assert.doesNotMatch(css, /\.heroMosaic\b/i);
});

test("editorial prototype media can never be promoted as documentary media", () => {
  const species = read("app/plantes/GoldenSpeciesProfile.tsx");
  const group = read("app/plantes/GoldenGenusHub.tsx");
  const speciesRoute = read("app/plantes/[genre]/[slug]/page.tsx");
  const groupRoute = read("app/plantes/[genre]/page.tsx");
  const documentary = read("lib/plants/documentary-media.ts");

  assert.match(species, /documentaryGallery\(plant\)/);
  assert.match(group, /documentaryGallery\(plant\)/);
  assert.match(speciesRoute, /isEditorialPlaceholder\(image\.src\)/);
  assert.match(groupRoute, /isDocumentaryPlantImage/);
  assert.match(documentary, /isEditorialPlaceholder\(image\.src\)/);
  assert.match(documentary, /isPhotoProductionPlaceholder\(image\.src\)/);
  assert.equal(isEditorialPlaceholder("/images/botanical-heroes/prototypes/dicksonia-prototype.svg"), true);
  assert.equal(isEditorialPlaceholder("/hero-jungle.jpg"), true);
  assert.equal(isEditorialPlaceholder("/advice-rempotage.jpg"), true);
});

test("Thai, Bananiers and Family routes cannot remount a parallel legacy generation", () => {
  const profile = read("app/plantes/PlantProfile.tsx");
  const bananas = read("app/plantes/bananiers/page.tsx");
  const familyRoute = read("app/plantes/famille/[family]/page.tsx");
  const familyDirectory = read("app/plantes/PlantFamilyDirectory.tsx");

  assert.doesNotMatch(profile, /ThaiConstellationProfileV3|thai-profile-v3|thai-v3-identity-sheet|thai-v3-care-grid/i);
  assert.match(bananas, /GoldenGenusHub/);
  assert.match(bananas, /froid|hiver|vent|Lille|Nord/i);
  assert.doesNotMatch(bananas, /BananaHub|banana-profile|legacy/i);
  assert.match(familyRoute, /PlantFamilyDirectory/);
  assert.match(familyDirectory, /data-golden-family-v25/);
  assert.match(familyDirectory, /Un répertoire compact/);
  assert.doesNotMatch(familyDirectory, /plant-family-card|placeholder-leaf|generic-leaf-wall/i);
});

test("BETA remains globally noindex, nofollow and closed to sitemap discovery", () => {
  const layout = read("app/layout.tsx");
  const mode = read("lib/deployment-mode.ts");
  const robots = read("app/robots.txt/route.ts");
  const sitemap = read("app/sitemap.xml/route.ts");

  assert.match(layout, /betaOnlyRobots/);
  assert.match(mode, /index:\s*false/);
  assert.match(mode, /follow:\s*false/);
  assert.match(mode, /nocache:\s*true/);
  assert.match(robots, /Disallow:\s*\//i);
  assert.match(sitemap, /status:\s*404/);
});
