import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { encyclopediaP1Routes } from "../lib/plants/encyclopedia-p1-expansion.ts";
import { isPhotoProductionPlaceholder } from "../lib/plants/types.ts";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

async function renderLab(pathname) {
  const previous = process.env.JUNGLE_LAB_ENABLED;
  process.env.JUNGLE_LAB_ENABLED = "1";
  try {
    return await render(pathname);
  } finally {
    if (previous === undefined) delete process.env.JUNGLE_LAB_ENABLED;
    else process.env.JUNGLE_LAB_ENABLED = previous;
  }
}

test("P1 renders twelve canonical Golden Species pages without commercial schema", async () => {
  for (const pathname of encyclopediaP1Routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${pathname}: H1`);
    assert.match(html, /data-golden-species-v1=/i, `${pathname}: Golden Species`);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+https:\\/\\/jungle\\.tibaldo\\.fr${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"), `${pathname}: canonical`);
    assert.match(html, /"@type":"Article"/i, `${pathname}: Article`);
    assert.match(html, /"@type":"Thing"/i, `${pathname}: Thing`);
    assert.match(html, /"@type":"FAQPage"/i, `${pathname}: FAQ`);
    assert.match(html, /"@type":"BreadcrumbList"/i, `${pathname}: breadcrumb`);
    assert.doesNotMatch(html, /"@type":"(?:Product|Offer)"/i, `${pathname}: commerce`);
  }
});

test("P1 entries are discoverable from the eight existing Golden Group hubs", async () => {
  const expected = {
    alocasia: ["tandurusa", "melo", "mortfontanensis-polly"],
    anthurium: ["luxurians", "wendlingeri"],
    philodendron: ["hederaceum", "pink-princess"],
    monstera: ["albo-variegata"],
    ficus: ["elastica"],
    hoya: ["carnosa"],
    syngonium: ["podophyllum"],
    sansevieria: ["trifasciata"],
  };
  for (const [genre, slugs] of Object.entries(expected)) {
    const response = await render(`/plantes/${genre}`);
    assert.equal(response.status, 200, genre);
    const html = await response.text();
    assert.match(html, /data-golden-group/i, `${genre}: Golden Group`);
    for (const slug of slugs) assert.match(html, new RegExp(`href=["']/plantes/${genre}/${slug}["']`, "i"), `${genre}/${slug}`);
  }
});

test("renders the homepage SEO signals and editorial content", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Tibaldo Jungle — Studio Végétal à Lille<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*name=["']description["'])(?=[^>]*content=["'][^"']*Nouveauté à Lille[^"']*26 septembre 2026[^"']*["'])[^>]*>/i,
  );
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/?["'])[^>]*>/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /Plantes rares[\s\S]*&amp; tropicales[\s\S]*à Lille\./i);
  assert.match(html, /Plantes d’intérieur et d’extérieur, espèces exotiques, pépites rares et conseils passionnés\./i);
  assert.match(html, /class=["']hero-line["']/i);
  assert.match(html, /data-parallax=["']18["']/i);
  assert.match(html, /Trois univers/i);
  assert.match(html, /href=["']\/substrats["']/i);
  assert.match(html, /Conseiller sans sur-vendre/i);
  assert.match(html, /Grande ouverture · 26 septembre 2026 · Lille/i);
  assert.match(html, /Rempotage gratuit toute l’année/i);
  assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
  assert.doesNotMatch(html, /Lille · Nord · France/i);
  assert.match(html, /href=["'](?:https:\/\/jungle\.tibaldo\.fr)?\/favicon\.png["']/i);
});

test("renders the substrates collection with local SEO metadata", async () => {
  const response = await render("/substrats");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Substrats en vrac à Lille/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/substrats["']/i);
  assert.match(html, /CollectionPage/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /Terreau Signature by Romain/i);
  assert.match(html, /Écorce de pin/i);
  assert.match(html, /Sphaigne séchée/i);
  assert.match(html, /Zéolite/i);
  assert.match(html, /src=["']\/substrats\/terreau-signature-substrat-plantes-lille\.jpg["']/i);
  assert.match(html, /src=["']\/substrats\/sphaigne-sechee-substrat-plantes-lille-v2\.png["']/i);
});

test("the shared carousel renders every Monstera entry after P1", async () => {
  const response = await render("/plantes/monstera");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="genus-species-carousel shell"/);
  assert.equal((html.match(/class="genus-carousel-card/g) ?? []).length, 15);
  for (const slug of ["deliciosa", "thai-constellation", "albo-variegata", "esqueleto", "burle-marx-flame", "dubia", "obliqua", "siltepecana", "pinnatipartita", "standleyana"]) {
    assert.match(html, new RegExp(`href="/plantes/monstera/${slug}"`));
  }
  assert.doesNotMatch(html, /<a[^>]*role="listitem"/);
});

test("V20 removes the rejected SOS legacy photo blocks and fake diagnosis", async () => {
  const response = await render("/sos-plantes");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /class="sos-signs"|class="sos-sign-grid"/);
  assert.doesNotMatch(html, /Lancer le pré-diagnostic|Votre pré-diagnostic apparaîtra ici/);
  assert.match(html, /Tibaldo relit avant réponse/);
  assert.match(html, /Venir au Studio/);
});

test("V20 keeps Chlorophytum on one canonical discovery surface", async () => {
  const response = await render("/plantes/chlorophytum");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/class="genus-species-carousel shell"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /class="plant-index shell pilot-v21-index"/);
  const source = readFileSync(new URL("../app/plantes/GenusPilotV21.tsx", import.meta.url), "utf8");
  assert.match(source, /genre === "chlorophytum"\) return <ChlorophytumCulture guide=\{guide\}/);
  assert.doesNotMatch(source, /genre === "chlorophytum" \? <ChlorophytumCulture plant=/);
});

test("V20 keeps Anthurium on the shared discovery carousel without a legacy duplicate", async () => {
  const html = await (await render("/plantes/anthurium")).text();
  assert.equal((html.match(/class="genus-species-carousel shell"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /anth-v2-species|anth-v2-gallery|anth-v2-index/);
});

test("V20 exposes the eleven-dimensional needs language on canonical species", async () => {
  const response = await render("/plantes/monstera/esqueleto");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /monstera-esqueleto-feuille-mature-fenestrations\.webp/);
  assert.match(html, /Aucune image fabriquée/i);
  assert.equal((html.match(/class="plant-need plant-need-/g) ?? []).length, 11);
  assert.match(html, /Carnet photographique/);
  for (const label of ["Lumière", "Arrosage", "Température", "Humidité", "Substrat", "Fertilisation", "Rempotage", "Croissance", "Support", "Toxicité", "Difficulté"]) assert.match(html, new RegExp(label));

  const veitchii = await (await render("/plantes/anthurium/veitchii")).text();
  assert.equal((veitchii.match(/class="plant-need plant-need-/g) ?? []).length, 11);
  assert.match(veitchii, /Carnet photographique/);
});

test("V20 photo-book preserves every verified gallery medium", async () => {
  const cycas = await (await render("/plantes/cycas/revoluta")).text();
  assert.match(cycas, /class="botanical-photo-book plant-profile-section"/);
  assert.match(cycas, /class="botanical-photo-book-stack"/);
  assert.match(cycas, /class="is-page-3"/);
  for (const medium of [
    "cycas-revoluta-terrasse-tibaldo.webp",
    "cycas-revoluta-port-couronne.webp",
    "cycas-revoluta-pot-noir-exterieur.webp",
    "cycas-revoluta-pot-bleu-frondes.webp",
  ]) assert.match(cycas, new RegExp(medium));
});

test("V25 consolidates species on Golden Species and uses the approved arch reveal", async () => {
  for (const route of [
    "/plantes/monstera/esqueleto",
    "/plantes/monstera/burle-marx-flame",
    "/plantes/anthurium/veitchii",
    "/plantes/chlorophytum/comosum",
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /data-golden-species-v(?:1|25)=/, route);
    assert.match(html, /Statut, synonymes et observation|Taxonomie complète et synonymes/, route);
    assert.match(html, /botanical-faq/, route);
    assert.doesNotMatch(html, /veitchii-v2-id-grid|veitchii-v2-conditions-grid/, route);
  }

  const componentUrl = new URL("../app/plantes/GoldenSpeciesProfile.tsx", import.meta.url);
  const component = readFileSync(componentUrl, "utf8");
  const css = [...component.matchAll(/import\s+\w+\s+from\s+["']([^"']+\.module\.css)["']/g)]
    .map(([, specifier]) => readFileSync(new URL(specifier, componentUrl), "utf8"))
    .join("\n");
  assert.match(css, /\.archMedia::after[^]*transform:\s*scaleX\(1\)/i);
  assert.match(css, /transform-origin:\s*right center/i);
  assert.match(css, /transition:\s*transform 1\.65s \.18s cubic-bezier\(\.77,\s*0,\s*\.18,\s*1\)/i);
  assert.match(css, /\.archFigure:global\(\.is-visible\) \.archMedia::after[^]*transform:\s*scaleX\(0\)/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[^]*\.archMedia::after/i);
  assert.doesNotMatch(css, /clip-path/i);
});

test("V23 keeps the Veitchii Golden Species prototype isolated, compact and non-indexable", async () => {
  const response = await render("/lab/v23/anthurium/veitchii");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  const html = await response.text();

  assert.match(html, /data-golden-species-v23="anthurium-veitchii"/);
  assert.match(html, /Lab V23[\s\S]*Golden Species · revue Owner/i);
  assert.match(html, /Nom botanique[\s\S]*Famille[\s\S]*Genre[\s\S]*Espèce[\s\S]*Ordre[\s\S]*Port/);
  assert.match(html, /Lecture en dix secondes[\s\S]*Les cinq repères essentiels/i);
  assert.match(html, /Carnet photographique[\s\S]*Une seule photographie de Veitchii est aujourd’hui vérifiée/i);
  assert.match(html, /Diagnostic prudent[\s\S]*Tout savoir avant de lui faire une place/i);
  assert.match(html, /<meta name="robots" content="noindex, nofollow, nocache"/i);
  assert.doesNotMatch(html, /veitchii-v2-id-grid|veitchii-v2-conditions-grid|plant-identity-signature/);
  assert.equal((html.match(/role="listitem"/g) ?? []).length, 1);

  const canonical = await (await render("/plantes/anthurium/veitchii")).text();
  assert.doesNotMatch(canonical, /data-golden-species-v23|Lab V23|Golden Species · revue Owner/i);
  assert.match(canonical, /data-golden-species-v(?:1|25)="anthurium\/veitchii"/);
});

test("V25.1 exposes only the two corrected Owner references with the reconstructed contracts", async () => {
  const speciesResponse = await renderLab("/lab/v25-1/golden-species/anthurium-veitchii");
  assert.equal(speciesResponse.status, 200);
  const species = await speciesResponse.text();
  assert.match(species, /data-corrected-golden-species="anthurium-veitchii"/);
  assert.match(species, /Lab V25\.1/);
  assert.match(species, /Portail botanique · 1,65 seconde/);
  assert.match(species, /Les cinq repères essentiels/);
  assert.match(species, /Une vue vérifiée/);
  assert.match(species, /name="robots" content="noindex, nofollow, nocache"/);

  const groupResponse = await renderLab("/lab/v25-1/golden-hub/pilea");
  assert.equal(groupResponse.status, 200);
  const group = await groupResponse.text();
  assert.match(group, /data-corrected-golden-group="pilea"/);
  assert.match(group, /pilea-planche-formes-textures\.webp/);
  assert.match(group, /width="972" height="1619"/);
  assert.match(group, /Formes &amp; textures/);
  assert.doesNotMatch(group, /pilea-collection-especes\.webp/);
  assert.match(group, /name="robots" content="noindex, nofollow, nocache"/);

  const component = readFileSync(new URL("../app/lab/v25-1/_components/CorrectedGoldenReferences.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/lab/v23/_golden-pilea/GoldenPilea.module.css", import.meta.url), "utf8");
  assert.match(css, /border-radius:\s*48% 48% 3px 3px \/ 16% 16% 3px 3px/);
  assert.match(css, /transform:\s*scaleX\(1\)/);
  assert.match(css, /transform-origin:\s*right center/);
  assert.match(css, /transition:\s*transform 1\.65s \.18s cubic-bezier\(\.77, 0, \.18, 1\)/);
  assert.doesNotMatch(component, /clip-path|pilea-collection-especes/);
  const correctedCss = readFileSync(new URL("../app/lab/v25-1/_components/CorrectedGoldenReferences.module.css", import.meta.url), "utf8");
  assert.match(correctedCss, /plant-section-nav a i/);
  assert.match(correctedCss, /plant-section-nav a svg\) \{ display: none; \}/);
});

test("V25.2 refines only the isolated Pilea Golden Group contract", async () => {
  const response = await renderLab("/lab/v25-2/golden-hub/pilea");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-corrected-golden-group-v25-2="pilea"/);
  assert.match(html, /Lab V25\.2/);
  assert.match(html, /pilea-planche-formes-textures\.webp/);
  assert.match(html, /width="972" height="1619"/);
  assert.match(html, /01[\s\S]*Comprendre le groupe[\s\S]*07[\s\S]*Continuer au Studio/);
  assert.doesNotMatch(html, /pilea-collection-especes\.webp/);
  assert.match(html, /name="robots" content="noindex, nofollow, nocache"/);

  const source = readFileSync(new URL("../app/lab/v25-2/_components/RefinedGoldenGroup.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/lab/v25-2/_components/RefinedGoldenGroup.module.css", import.meta.url), "utf8");
  assert.match(source, /data-hub-chapter-marker/);
  assert.match(css, /--hub-body-size:\s*17px/);
  assert.match(css, /\.plateHero \{ min-height: 700px/);
  assert.match(css, /\.groupSpecies :global\(\.genus-species-carousel\) \{ padding-top: 34px; padding-bottom: 0; \}/);

  const v251Species = await (await renderLab("/lab/v25-1/golden-species/anthurium-veitchii")).text();
  assert.match(v251Species, /data-corrected-golden-species="anthurium-veitchii"/);
  assert.match(v251Species, /Portail botanique · 1,65 seconde/);
});

test("V25.3 presents the controlled Pilea plate as one landscape editorial Hero", async () => {
  const response = await renderLab("/lab/v25-3/golden-hub/pilea");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-golden-group-v25-3="pilea"/);
  assert.match(html, /Lab V25\.3/);
  assert.match(html, /pilea-planche-formes-textures\.webp/);
  assert.match(html, /width="972" height="1619"/);
  assert.match(html, /Les Pilea forment un genre de la famille des Urticaceae/);
  assert.match(html, /culture en intérieur[\s\S]*lumière douce à vive/);
  assert.match(html, /hiver moins lumineux ralentit notamment le Pilea peperomioides/);
  assert.doesNotMatch(html, /pilea-collection-especes\.webp/);
  assert.match(html, /name="robots" content="noindex, nofollow, nocache"/);

  const source = readFileSync(new URL("../app/lab/v25-3/_components/FinalGoldenGroup.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/lab/v25-3/_components/FinalGoldenGroup.module.css", import.meta.url), "utf8");
  assert.match(source, /data-hero-editorial-copy/);
  assert.match(source, /RefinedGoldenGroup\.module\.css/);
  assert.match(css, /mask-image:\s*linear-gradient/);
  assert.match(css, /object-fit:\s*cover/);
  assert.doesNotMatch(source, /pilea-collection-especes|canvas|webgl/i);

  const v252 = await (await renderLab("/lab/v25-2/golden-hub/pilea")).text();
  assert.match(v252, /data-corrected-golden-group-v25-2="pilea"/);
  const goldenSpecies = await (await renderLab("/lab/v25-1/golden-species/anthurium-veitchii")).text();
  assert.match(goldenSpecies, /data-corrected-golden-species="anthurium-veitchii"/);
});

test("V25.4 compacts only the mobile Pilea Golden Group opening", async () => {
  const response = await renderLab("/lab/v25-4/golden-hub/pilea");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-golden-group-v25-4="pilea"/);
  assert.match(html, /Lab V25\.4/);
  assert.match(html, /pilea-planche-formes-textures\.webp/);
  assert.match(html, /width="972" height="1619"/);
  assert.match(html, /Les Pilea forment un genre de la famille des Urticaceae/);
  assert.match(html, /culture en intérieur[\s\S]*lumière douce à vive/);
  assert.match(html, /hiver moins lumineux ralentit notamment le Pilea peperomioides/);
  assert.doesNotMatch(html, /pilea-collection-especes\.webp/);
  assert.match(html, /name="robots" content="noindex, nofollow, nocache"/);

  const source = readFileSync(new URL("../app/lab/v25-4/_components/FinalMobileGoldenGroup.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/lab/v25-4/_components/FinalMobileGoldenGroup.module.css", import.meta.url), "utf8");
  assert.match(source, /FinalGoldenGroup\.module\.css/);
  assert.match(source, /RefinedGoldenGroup\.module\.css/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /min-height:\s*720px/);
  assert.match(css, /height:\s*220px/);
  assert.match(css, /\.introTransition[\s\S]*padding-bottom:\s*0/);
  assert.match(css, /\.passportTransition[\s\S]*padding-top:\s*48px/);
  assert.doesNotMatch(source, /pilea-collection-especes|canvas|webgl/i);

  const v253 = await (await renderLab("/lab/v25-3/golden-hub/pilea")).text();
  assert.match(v253, /data-golden-group-v25-3="pilea"/);
  const goldenSpecies = await (await renderLab("/lab/v25-1/golden-species/anthurium-veitchii")).text();
  assert.match(goldenSpecies, /data-corrected-golden-species="anthurium-veitchii"/);
  assert.match(goldenSpecies, /Portail botanique · 1,65 seconde/);
});

test("V23 reuses the bounded V19 reveal with an accessible reduced-motion fallback", () => {
  const css = readFileSync(
    new URL("../app/lab/v23/anthurium/veitchii/VeitchiiGoldenV23.module.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /photoRevealMedia::after[\s\S]*transition:\s*transform 1\.05s \.14s cubic-bezier\(\.77, 0, \.18, 1\)/i);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*photoRevealMedia::after\s*\{\s*display:\s*none/i);
  assert.doesNotMatch(css, /scroll-behavior:\s*smooth|position:\s*fixed/);
});

test("V22 keeps the rejected SOS symptom-photo treatment absent", async () => {
  const html = await (await render("/sos-plantes")).text();
  assert.match(html, /sos-photo-protocol/);
  assert.match(html, /Tibaldo valide humainement/i);
  assert.match(html, /botanical-faq/);
  assert.doesNotMatch(html, />\s*(Traces|Points noirs|Déformations|Odeurs)\s*</i);
});

test("V20 mobile menu is a modal interaction with lock, focus and Escape contracts", () => {
  const source = readFileSync(new URL("../app/MobileJungleMenu.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /body\.style\.position = "fixed"/);
  assert.match(source, /window\.scrollTo\(0, scrollY\)/);
  assert.match(source, /document\.activeElement === first/);
  assert.match(source, /createPortal\(/);
  assert.match(source, /document\.querySelectorAll<HTMLElement>\("main, footer"\)/);
  assert.match(source, /region\.inert = true/);
  assert.match(css, /\.mobile-menu-overlay\s*\{[^}]*z-index:\s*2000/);
  assert.doesNotMatch(css, /@media \(max-width: 900px\) \{[\s\S]{0,80}\n\s*nav\s*\{\s*display:\s*none/);
});

test("blocks beta crawling and exposes no beta sitemap", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robotsText = await robots.text();
  assert.match(robotsText, /Disallow: \/$/im);
  assert.doesNotMatch(robotsText, /Sitemap:/i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 404);
  assert.equal(sitemap.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("applies the BETA security header baseline to rendered routes", async () => {
  const response = await render("/plantes/anthurium/veitchii");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(
    response.headers.get("strict-transport-security"),
    "max-age=31536000; includeSubDomains",
  );
  assert.match(response.headers.get("permissions-policy") ?? "", /payment=\(\)/);
  const csp = response.headers.get("content-security-policy") ?? "";
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /connect-src 'self' https:\/\/api\.open-meteo\.com/);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("keeps BETA media MIME and cache policy explicit", () => {
  const workerSource = readFileSync(new URL("../worker/index.ts", import.meta.url), "utf8");
  const staticHeaders = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
  assert.match(workerSource, /endsWith\("\.webp"\)[\s\S]*Content-Type[\s\S]*image\/webp/);
  assert.match(workerSource, /max-age=86400, stale-while-revalidate=604800/);
  assert.match(staticHeaders, /\/\*\.webp[\s\S]*Content-Type:\s*image\/webp/);
  assert.match(staticHeaders, /max-age=86400, stale-while-revalidate=604800/);
});

test("serves hashed application bundles before the app router", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("bundle-policy-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let requestedAssetPath = "";
  const response = await worker.fetch(
    new Request("https://beta-jungle.tibaldo.fr/assets/index-example.js"),
    {
      ASSETS: {
        fetch: async (request) => {
          requestedAssetPath = new URL(request.url).pathname;
          return new Response("export {};", { headers: { "content-type": "text/javascript" } });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(requestedAssetPath, "/assets/index-example.js");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "public, max-age=31536000, immutable");
});

test("routes static media through the Worker before applying asset headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("asset-policy-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://beta-jungle.tibaldo.fr/media-example.webp"),
    {
      ASSETS: {
        fetch: async () => new Response(new Uint8Array([82, 73, 70, 70]), {
          headers: { "content-type": "application/octet-stream" },
        }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/webp");
  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=86400, stale-while-revalidate=604800",
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("serves public editorial media through the controlled BETA route", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("controlled-media-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let requestedAssetPath = "";
  const response = await worker.fetch(
    new Request("https://beta-jungle.tibaldo.fr/media/final-media-v35/monstera-deliciosa-jonathan-borba-pexels.webp"),
    {
      ASSETS: {
        fetch: async (request) => {
          requestedAssetPath = new URL(request.url).pathname;
          return new Response(new Uint8Array([82, 73, 70, 70]), {
            headers: { "content-type": "application/octet-stream" },
          });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(requestedAssetPath, "/final-media-v35/monstera-deliciosa-jonathan-borba-pexels.webp");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/webp");
  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=86400, stale-while-revalidate=604800",
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("rejects invalid controlled media paths without reading bundled assets", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("controlled-media-rejection-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let assetRead = false;
  const response = await worker.fetch(
    new Request("https://beta-jungle.tibaldo.fr/media/not-a-media-file.txt"),
    { ASSETS: { fetch: async () => { assetRead = true; return new Response(); } } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 404);
  assert.equal(assetRead, false);
});

test("keeps Jungle Scroll Story D isolated, server rendered and non-indexable", async () => {
  const response = await renderLab("/lab/deliciosa/d");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /LAB D/);
  assert.match(html, /data-story-sequence="facts"/);
  assert.match(html, /data-story-sequence="identity"/);
  assert.match(html, /data-story-sequence="morphology"/);
  assert.match(html, /data-story-sequence="cultivate"/);
  assert.match(html, /Monstera[\s\S]*deliciosa[\s\S]*Liebm\./);
  assert.match(html, /Observer[\s\S]*Arroser[\s\S]*Égoutter/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow, nocache"/i);
  assert.doesNotMatch(html, /botanix\.com/i);

  const servedProfile = await render("/plantes/monstera/deliciosa");
  assert.equal(servedProfile.status, 200);
  assert.doesNotMatch(await servedProfile.text(), /Jungle Scroll Story|LAB D/i);

  const motionSource = readFileSync(
    new URL("../app/__lab/deliciosa/ScrollStoryController.tsx", import.meta.url),
    "utf8",
  );
  assert.equal((motionSource.match(/addEventListener\("scroll"/g) ?? []).length, 1);
  assert.match(motionSource, /requestAnimationFrame/);
  assert.match(motionSource, /prefers-reduced-motion: reduce/);
  assert.match(motionSource, /\{ passive: true \}/);
});

test("keeps Cinematic Botanical D2 isolated while preserving D V1", async () => {
  const response = await renderLab("/lab/deliciosa/d2");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /LAB D2 — Jungle Cinematic Botanical/);
  assert.equal((html.match(/data-story-sequence=/g) ?? []).length, 4);
  assert.match(html, /SPECIMEN · 001/);
  assert.match(html, /Schéma de lecture · interprétation éditoriale/i);
  assert.match(html, /Observer[\s\S]*Arroser[\s\S]*Égoutter/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow, nocache"/i);
  assert.doesNotMatch(html, /botanix\.com|pinterest|willemse|moai/i);

  const dV1 = await renderLab("/lab/deliciosa/d");
  assert.equal(dV1.status, 200);
  assert.match(await dV1.text(), /Jungle Scroll Story/);

  const servedProfile = await render("/plantes/monstera/deliciosa");
  assert.doesNotMatch(await servedProfile.text(), /Cinematic Botanical|LAB D2/i);
});

test("beta hides every owner LAB route unless the explicit local switch is set", async () => {
  delete process.env.JUNGLE_LAB_ENABLED;
  for (const route of [
    "/lab/deliciosa/d",
    "/lab/deliciosa/d2",
    "/lab/deliciosa/d3",
    "/lab/deliciosa/v4",
    "/lab/deliciosa/art-direction-v1",
  ]) {
    const response = await render(route);
    assert.equal(response.status, 404, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", route);
  }
});

test("V19 Owner-review prototypes share one narrative system without replacing V18 routes", async () => {
  const prototypes = [
    ["/lab/v19/monstera/deliciosa", "Monstera deliciosa"],
    ["/lab/v19/anthurium/veitchii", "Anthurium veitchii"],
    ["/lab/v19/pilea/peperomioides", "Pilea peperomioides"],
  ];

  for (const [route, botanicalName] of prototypes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", route);
    const html = await response.text();
    assert.match(html, /Prototype V19/i, route);
    assert.match(html, new RegExp(botanicalName.replace(" ", "[\\s\\S]*"), "i"), route);
    assert.match(html, /id=["']identite["'][\s\S]*id=["']entretien["'][\s\S]*id=["']problemes["'][\s\S]*id=["']comparaison["'][\s\S]*id=["']faq["']/i, route);
    assert.match(html, /prefers-reduced-motion|SpeciesVisualNarrativeV2Motion/i, route);
    assert.doesNotMatch(html, /Jungle Scroll Story|ARCHIVE V6|LAB D2/i, route);
  }

  const canonical = await render("/plantes/monstera/deliciosa");
  assert.equal(canonical.status, 200);
  const canonicalHtml = await canonical.text();
  assert.doesNotMatch(canonicalHtml, /Prototype V19|Système visuel partagé/i);

  const motionSource = readFileSync(
    new URL("../app/plantes/SpeciesVisualNarrativeV2Motion.tsx", import.meta.url),
    "utf8",
  );
  assert.match(motionSource, /prefers-reduced-motion: reduce/);
  assert.match(motionSource, /IntersectionObserver/);
  assert.match(motionSource, /requestAnimationFrame/);
  assert.match(motionSource, /\{ passive: true \}/);
});

test("V23 Golden Pilea prototypes remain isolated and expose two distinct editorial roles", async () => {
  const groupResponse = await render("/lab/v23/golden-hub/pilea");
  assert.equal(groupResponse.status, 200);
  assert.equal(groupResponse.headers.get("x-robots-tag"), "noindex, nofollow");
  const groupHtml = await groupResponse.text();
  assert.match(groupHtml, /data-golden-group-v23="pilea"/);
  assert.match(groupHtml, /Golden Group/);
  assert.match(groupHtml, /pilea-planche-formes-textures\.webp/);
  assert.match(groupHtml, /ni un inventaire taxonomique exhaustif ni une disponibilité boutique/i);
  assert.equal((groupHtml.match(/class="genus-carousel-card/g) ?? []).length, 3);
  assert.match(groupHtml, /Photographie réelle[\s\S]*(?:à documenter|Pilea cadierei)/i);

  const speciesResponse = await render("/lab/v23/golden-species/pilea-peperomioides");
  assert.equal(speciesResponse.status, 200);
  assert.equal(speciesResponse.headers.get("x-robots-tag"), "noindex, nofollow");
  const speciesHtml = await speciesResponse.text();
  assert.match(speciesHtml, /data-golden-species-v23="pilea-peperomioides"/);
  assert.match(speciesHtml, /Golden Species/);
  assert.match(speciesHtml, /Reveal botanique · 1,65 seconde/);
  assert.match(speciesHtml, /Pilea peperomioides/);
  assert.match(speciesHtml, /Une seule photographie documentaire/i);
  assert.match(speciesHtml, /id="identite"[\s\S]*id="entretien"[\s\S]*id="problemes"[\s\S]*id="comparaison"[\s\S]*id="faq"/i);

  const styles = readFileSync(new URL("../app/lab/v23/_golden-pilea/GoldenPilea.module.css", import.meta.url), "utf8");
  assert.match(styles, /border-radius:\s*48% 48% 3px 3px\s*\/\s*16% 16% 3px 3px/);
  assert.match(styles, /transition:\s*transform 1\.65s \.18s cubic-bezier\(\.77, 0, \.18, 1\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.archMedia::after\s*\{\s*display:\s*none/);

  const canonicalHub = await (await render("/plantes/pilea")).text();
  const canonicalSpecies = await (await render("/plantes/pilea/peperomioides")).text();
  assert.doesNotMatch(canonicalHub, /data-golden-group-v23|Golden Group · choix visuel Owner/);
  assert.doesNotMatch(canonicalSpecies, /data-golden-species-v23|Golden Species · choix visuel Owner/);
});

test("Visual P1 target routes expose no internal production placeholders", async () => {
  const routes = [
    "/plantes/bananiers",
    "/plantes/cycas/revoluta",
    "/plantes/dicksonia/antarctica",
    "/fleurs",
  ];
  const internalCopy = /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie Tibaldo à venir|Photographies propriétaires à préparer|reportage botanique\s*à compléter|\?>\+/i;
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.doesNotMatch(html, internalCopy, route);
    assert.match(html, /<meta name="robots" content="noindex, nofollow/i, route);
    assert.match(html, /https:\/\/beta-shop\.tibaldo\.fr/i, route);
  }
});

test("photo-debt routes expose no internal production copy to visitors", async () => {
  const photoDebtPlants = plants.filter((plant) =>
    isPhotoProductionPlaceholder(plant.gallery[0]?.src),
  );
  const photoDebtRoutes = [
    ...new Set([
      "/plantes",
      ...photoDebtPlants.map((plant) => `/plantes/${plant.genre}`),
      ...photoDebtPlants.map(
        (plant) => `/plantes/${plant.genre}/${plant.slug}`,
      ),
    ]),
  ];
  const internalCopy = /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie Tibaldo à venir|Photographies propriétaires à préparer|reportage botanique\s*à compléter|photographier avant de publier|pourquoi (?:certaines fiches n['’]ont-elles pas encore de photo|la photographie manque-t-elle)|(?:photo|photographie|photographies|spécimen)[^.<>\"]*?(?:à venir|à ajouter|à réaliser|à préparer|à compléter|à relever|encore nécessaire|avant publication)|(?:dimension|dimensions|mesure|mesures)[^.<>\"]*?(?:à venir|à ajouter|à compléter|à relever|encore nécessaire)|gamme à identifier et photographier/i;

  for (const route of photoDebtRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const visitorContent = html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ");
    const imageAlts = [...html.matchAll(/\balt=["']([^"']*)["']/gi)]
      .map((match) => match[1])
      .join(" ");
    assert.doesNotMatch(`${visitorContent} ${imageAlts}`, internalCopy, route);
  }
});

test("Warocqueanum uses a scoped multiline species hero without changing its H1", async () => {
  const response = await render("/plantes/anthurium/warocqueanum");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /plant-profile-hero-anthurium-warocqueanum/i);
  assert.match(html, /<h1[^>]*>[\s\S]*?Anthurium[\s\S]*?warocqueanum[\s\S]*?<\/h1>/i);

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.plant-profile-hero-anthurium-warocqueanum h1\{[^}]*font-size:clamp\(60px,7\.2vw,104px\)/i);
  assert.match(css, /\.plant-profile-hero-anthurium-warocqueanum \.scientific-binomial\{[^}]*flex-direction:column[^}]*white-space:normal/i);
});

test("the photo fallback remains trackable but contains no visitor-facing production note", () => {
  const fallback = readFileSync(new URL("../public/photo-reelle-a-venir.svg", import.meta.url), "utf8");
  assert.match(fallback, /viewBox=["']0 0 1200 1500["']/i);
  assert.doesNotMatch(fallback, /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie réelle à venir/i);
});

test("Visual P1 preserves the three approved beta pilots", async () => {
  for (const route of ["/plantes", "/plantes/monstera", "/plantes/monstera/thai-constellation"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="noindex, nofollow/i, route);
    assert.match(html, /https:\/\/beta-shop\.tibaldo\.fr/i, route);
  }
});

test("species without a real Shop product never expose a dead merchant CTA", async () => {
  for (const [route, deadProductPath, genrePath] of [
    ["/plantes/anthurium/pallidiflorum", "/plantes/anthurium/pallidiflorum", "/plantes/anthurium"],
    ["/plantes/philodendron/billietiae", "/plantes/philodendron/billietiae", "/plantes/philodendron"],
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.doesNotMatch(html, new RegExp(`beta-shop\\.tibaldo\\.fr${deadProductPath}`), route);
    assert.match(html, new RegExp(`href=["']${genrePath}["']`), route);
    assert.doesNotMatch(html, />Voir en boutique</i, route);
  }
});

test("links the opening event contextually from major editorial pages", async () => {
  for (const route of ["/plantes", "/substrats", "/services"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
    assert.match(html, /Nouvelle boutique de plantes à Lille/i);
  }
});

test("renders the opening event with complete crawlable SEO data", async () => {
  const response = await render("/evenements/ouverture-tibaldo-jungle-lille");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Ouverture du Studio Végétal à Lille — 26 septembre 2026<\/title>/i);
  assert.match(html, /<meta(?=[^>]*property=["']og:title["'])(?=[^>]*content=["']Que faire à Lille le 26 septembre 2026 \? Ouverture du Studio Végétal["'])[^>]*>/i);
  assert.match(html, /<meta(?=[^>]*name=["']twitter:title["'])(?=[^>]*content=["']Que faire à Lille le 26 septembre 2026 \? Ouverture du Studio Végétal["'])[^>]*>/i);
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/evenements\/ouverture-tibaldo-jungle-lille["'])[^>]*>/i);
  assert.match(html, /<h1>Ouverture du Studio Végétal – Tibaldo Jungle à Lille<\/h1>/i);
  assert.match(html, /"@type":"Event"/i);
  assert.match(html, /"isAccessibleForFree":true/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.match(html, /26 septembre 2026/i);
  assert.doesNotMatch(html, /Que faire à Lille ce week-end/i);
});

test("serves every retained SEO migration as one direct 301", async () => {
  const redirects = new Map([
    ["/creation-boutique", "/coulisses"],
    ["/diagnostic-plante-lille", "/sos-plantes"],
    ["/traitement-thrips-lille", "/sos-plantes"],
    ["/conseils/thrips-plantes-interieur-lille", "/conseils/thrips-plantes-interieur"],
    ["/conseils/rempoter-plante-quand-comment", "/rempotage"],
    ["/rempotage-plantes-lille", "/rempotage"],
    ["/rempotage-monstera-lille", "/rempotage"],
    ["/substrat-alocasia-lille", "/plantes/alocasia"],
    ["/livraison-fleurs-coupees-lille", "/fleurs-sur-commande-lille"],
    ["/bouquets-fleurs-livraison-lille", "/fleurs-sur-commande-lille"],
  ]);
  for (const [source, destination] of redirects) {
    const response = await render(source);
    assert.equal(response.status, 301, source);
    assert.equal(new URL(response.headers.get("location"), "https://jungle.tibaldo.fr").pathname.replace(/\/$/, ""), destination);
  }
});

test("renders the Golden rempotage service landing with factual local schema", async () => {
  const response = await render("/rempotage");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /Sous la surface/i);
  assert.match(html, /Bar à rempotage gratuit à Lille/i);
  assert.match(html, /3 place de l’Arbonnoise/i);
  assert.match(html, /Terreau Signature offert/i);
  assert.match(html, /rel=["']canonical["'][^>]+https:\/\/jungle\.tibaldo\.fr\/rempotage/i);
  assert.match(html, /"@type":"Service"/i);
  assert.match(html, /"@type":"Offer"/i);
  assert.match(html, /"price":"0"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.doesNotMatch(html, /"@type":"Product"/i);
});

test("conserves the existing plant encyclopedia API contract", async () => {
  const response = await render("/api/encyclopedie/plantes");
  assert.equal(response.status, 200);
  const entries = await response.json();
  assert.ok(entries.length > 0);
  const expectedFields = ["id", "genre", "genreLabel", "slug", "displayName", "botanicalName", "cultivar", "family", "imageUrl", "imageAlt", "encyclopediaSlug", "encyclopediaUrl", "publishedAt", "updatedAt"];
  for (const entry of entries) {
    assert.deepEqual(Object.keys(entry), expectedFields);
    assert.match(entry.encyclopediaSlug, /^plantes\/[a-z0-9-]+\/[a-z0-9-]+$/);
    assert.equal(entry.encyclopediaUrl, `https://jungle.tibaldo.fr/${entry.encyclopediaSlug}`);
    assert.match(entry.imageUrl, /^https:\/\/jungle\.tibaldo\.fr\//);
    assert.ok(entry.botanicalName);
  }
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => entry.encyclopediaSlug)).size, entries.length);
  assert.ok(entries.some((entry) => entry.encyclopediaSlug === "plantes/epiphyllum/anguliger"));
});

test("exposes an additive versioned plant encyclopedia V2", async () => {
  const response = await render("/api/v2/encyclopedie/plantes");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-tibaldo-contract-version"), "2.0");
  const entries = await response.json();
  assert.ok(entries.length > 0);
  assert.equal(new Set(entries.map((entry) => entry.botanicalName.toLowerCase())).size, entries.length);
  for (const entry of entries) {
    assert.equal(entry.contractVersion, "2.0");
    assert.ok(entry.navigationGenre);
    assert.ok(entry.taxonomy.genus);
    assert.equal(entry.taxonomyGenreDiffers, entry.taxonomy.genus.toLowerCase() !== entry.navigationGenre);
    assert.ok(entry.taxonomy.species);
    assert.ok(entry.primaryImage.url);
    assert.ok(entry.images.length > 0);
    assert.equal(entry.primaryImage.url, entry.imageUrl);
    for (const image of entry.images) {
      assert.match(image.path, /^\//);
      assert.doesNotMatch(image.path, /^\/media\//, "Le contrat public conserve ses chemins canoniques");
      assert.equal(image.url, `https://jungle.tibaldo.fr${image.path}`);
      assert.ok(existsSync(new URL(`../public${image.path}`, import.meta.url)), `Média absent : ${image.path}`);
    }
  }
  const taxonKeys = entries.map((entry) => [entry.taxonomy.genus, entry.taxonomy.species, entry.taxonomy.cultivar ?? ""].join("|").toLowerCase());
  assert.equal(new Set(taxonKeys).size, entries.length);
});

test("returns 404 for an unknown encyclopedia plant page", async () => {
  const response = await render("/plantes/inconnu/plante-inconnue");
  assert.equal(response.status, 404);
});

test("renders Dicksonia, its hierarchy and the shared species hero fallback", async () => {
  for (const path of ["/plantes/dicksonia", "/plantes/famille/dicksoniaceae", "/plantes/dicksonia/antarctica"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
  const plantsHtml = await (await render("/plantes")).text();
  assert.match(plantsHtml, /href=["']\/plantes\/dicksonia["']/i);
  const speciesHtml = await (await render("/plantes/dicksonia/antarctica")).text();
  assert.match(speciesHtml, /<h1[^>]*>[\s\S]*?Dicksonia[\s\S]*?antarctica[\s\S]*?<\/h1>/i);
  assert.match(speciesHtml, /has-editorial-fallback/i);
  assert.match(speciesHtml, /data-golden-species-v(?:1|25)="dicksonia\/antarctica"/i);
  assert.match(speciesHtml, /rel=["']canonical["'][^>]+plantes\/dicksonia\/antarctica/i);
  assert.doesNotMatch(speciesHtml, /Dictyonia/i);
  const api = await (await render("/api/encyclopedie/plantes")).json();
  assert.equal(api.length, 96);
  assert.ok(api.some((entry) => entry.encyclopediaSlug === "plantes/dicksonia/antarctica"));
});

test("renders the Agave, Fatsia and five-species Strelitzia cluster", async () => {
  const paths = [
    "/plantes/agave", "/plantes/agave/americana-variegata",
    "/plantes/fatsia", "/plantes/fatsia/japonica-spiders-web",
    "/plantes/strelitzia", "/plantes/strelitzia/alba", "/plantes/strelitzia/caudata",
    "/plantes/strelitzia/juncea", "/plantes/strelitzia/nicolai", "/plantes/strelitzia/reginae",
  ];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<h1/i, path);
    assert.match(html, /rel=["']canonical["']/i, path);
    if (path.split("/").length === 4 && path !== "/plantes/strelitzia/alba") assert.match(html, /has-editorial-fallback/i, path);
    assert.doesNotMatch(html, /\/_vinext\/image/i, path);
    assert.match(html, /noindex/i, path);
  }
  const hub = await (await render("/plantes/strelitzia")).text();
  assert.match(hub, /cinq espèces/i);
  assert.match(hub, /synonyme de S\. alba/i);
  assert.doesNotMatch(hub, /href=["']\/plantes\/strelitzia\/augusta/i);
  const api = await (await render("/api/v2/encyclopedie/plantes")).json();
  assert.equal(api.length, 96);
  assert.equal(new Set(api.map((entry) => entry.encyclopediaSlug)).size, 96);
});

test("final convergence renders one shared Golden Group system with honest genus media", async () => {
  for (const genre of ["strelitzia", "chlorophytum", "alocasia", "dicksonia", "monstera", "anthurium", "pilea"]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, new RegExp(`data-golden-group-v(?:1|25)=["']${genre}["']`, "i"), genre);
    const markerCount = (html.match(/data-hub-chapter-marker/g) ?? []).length;
    assert.ok(markerCount === 7 || markerCount === 14, `${genre}: expected 7 rendered markers (the RSC transport may serialize them a second time), got ${markerCount}`);
    assert.match(html, /Passeport de culture/i, genre);
    assert.match(html, /Explorer le genre/i, genre);
    assert.match(html, /Histoire du groupe/i, genre);
    assert.match(html, /Questions du Studio/i, genre);
    assert.doesNotMatch(html, /genus-pilot-|anth-v2-|botanical-genus-hero|photo-genus-hero/i, genre);
    assert.doesNotMatch(html, /heroMosaic|pilea-collection-especes|photo[- ]mosaic/i, genre);
    assert.doesNotMatch(html, /\/_vinext\/image/i, genre);
  }

  const pilea = await (await render("/plantes/pilea")).text();
  assert.match(pilea, /data-group-media-state=["']verified["']/i);
  assert.match(pilea, /data-pilea-public-media-gate=["']resolved-with-verified-cc0-species-photo["']/i);
  assert.match(pilea, /pilea-peperomioides-plante\.jpg/i);
  assert.doesNotMatch(pilea, /pilea-planche-formes-textures\.webp/i);
  for (const genre of ["strelitzia", "chlorophytum", "alocasia", "dicksonia", "monstera", "anthurium"]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.doesNotMatch(html, /pilea-planche-formes-textures\.webp/i, genre);
  }
});

test("final convergence keeps representative canonical surfaces Golden and BETA-only", async () => {
  const speciesRoutes = [
    "/plantes/anthurium/veitchii",
    "/plantes/monstera/thai-constellation",
    "/plantes/pilea/peperomioides",
    "/plantes/monstera/deliciosa",
    "/plantes/cycas/revoluta",
    "/plantes/pilea/cadierei",
    "/plantes/chlorophytum/comosum",
  ];
  for (const route of speciesRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", route);
    const html = await response.text();
    assert.equal((html.match(/<main\b/gi) ?? []).length, 1, route);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, route);
    assert.match(html, /data-golden-species-v(?:1|25)=/i, route);
    assert.match(html, /plant-needs-visual-system/i, route);
    assert.match(html, /Diagnostic prudent/i, route);
    assert.match(html, /botanical-faq/i, route);
    assert.match(html, /<meta name="robots" content="noindex, nofollow, nocache"/i, route);
    assert.doesNotMatch(html, /thai-profile-v3|veitchii-profile-v2|veitchii-v2-id-grid|species-next-page/i, route);
  }

  const mediaGap = await (await render("/plantes/chlorophytum/comosum")).text();
  assert.match(mediaGap, /Aucune image fabriquée|Aucune photographie documentaire vérifiée/i);
  const richMedia = await (await render("/plantes/cycas/revoluta")).text();
  assert.match(richMedia, /botanical-photo-book/i);

  for (const route of ["/plantes/pilea", "/plantes/monstera", "/plantes/anthurium", "/plantes/alocasia", "/plantes/chlorophytum", "/plantes/bananiers"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", route);
    const html = await response.text();
    assert.match(html, /data-golden-group-v(?:1|25)=/i, route);
    assert.match(html, /data-hub-chapter-marker/i, route);
    assert.match(html, /botanical-faq/i, route);
    assert.doesNotMatch(html, /heroMosaic|genus-pilot-|anth-v2-|banana-profile|legacy-hub/i, route);
  }

  const bananas = await (await render("/plantes/bananiers")).text();
  assert.match(bananas, /froid|hiver|vent|Lille|Nord/i);

  for (const route of ["/plantes/famille/araceae", "/plantes/famille/asparagaceae"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", route);
    const html = await response.text();
    assert.match(html, /data-golden-family-v25=/i, route);
    assert.match(html, /Un répertoire compact/i, route);
    assert.doesNotMatch(html, /plant-family-card|placeholder-leaf|generic-leaf-wall/i, route);
  }
});

test("V25 keeps prior pilot content inside the shared Golden Group architecture", async () => {
  for (const genre of ["alocasia", "chlorophytum", "dicksonia"]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, new RegExp(`data-golden-group-v(?:1|25)=["']${genre}["']`, "i"), genre);
    assert.match(html, /Histoire du groupe/i, genre);
    assert.match(html, /application\/ld\+json/i, genre);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+plantes/${genre}`, "i"), genre);
    assert.doesNotMatch(html, /genus-pilot-|genus-motion-v1|pilot-rhythm-secondary/i, genre);
  }
});

test("V25 Golden Group diagnostic and FAQ remain semantic and accessible", async () => {
  for (const genre of ["alocasia", "chlorophytum", "dicksonia", "anthurium"]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, /Lire les signaux/i, genre);
    assert.match(html, /botanical-faq/i, genre);
    assert.match(html, /<details/i, genre);
    assert.doesNotMatch(html, /pilot-rhythm-secondary|rhythm-symptom-index|rhythm-faq-list/i, genre);
  }
});

test("renders /plantes V19 as a cinematic editorial hub with one compact index", async () => {
  const html = await (await render("/plantes")).text();
  assert.match(html, /class=["'][^"']*plants-hub-hero[^"']*["']/i);
  assert.match(html, /src=["']\/media\/plantes-mur-vegetal-hero-v19\.mp4["']/i);
  assert.match(html, /poster=["']\/media\/plantes-mur-vegetal-poster-v19\.webp["']/i);
  assert.match(html, /<video[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/i);
  assert.match(html, /href=["']#recherche-plantes["']/i);
  assert.match(html, /id=["']recherche-plantes["']/i);
  assert.match(html, /class=["'][^"']*plants-editorial-genera-list[^"']*["']/i);
  assert.match(html, /class=["'][^"']*plants-compact-index[^"']*["']/i);
  assert.doesNotMatch(html, /class=["'][^"']*plants-v3-essential-grid[^"']*["']/i);
  assert.doesNotMatch(html, /class=["'][^"']*botanical-directory-v3[^"']*["']/i);
  assert.match(html, /Trente et un genres/i);
  for (const name of ["Monstera", "Anthurium", "Philodendron", "Chlorophytum", "Sansevieria"]) {
    assert.match(html, new RegExp(`>${name}<`, "i"), name);
  }
  assert.match(html, /<details[^>]*>[\s\S]*Collection/i);
});

test("V25 reconciles Thai Constellation into Golden Species without losing cultivar content", async () => {
  const thai = await (await render("/plantes/monstera/thai-constellation")).text();
  assert.match(thai, /data-golden-species-v(?:1|25)="monstera\/thai-constellation"/i);
  assert.match(thai, /plant-needs-visual-system/i);
  assert.match(thai, /Diagnostic prudent/i);
  assert.match(thai, /Thai Constellation[\s\S]*Albo Variegata/i);
  assert.doesNotMatch(thai, /thai-profile-v3|thai-v3-identity-sheet|thai-v3-care-grid/i);
  assert.doesNotMatch(thai, /\/\_vinext\/image/i);

  for (const path of ["/plantes/anthurium/veitchii", "/plantes/monstera/deliciosa"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /thai-profile-v3|thai-v3-identity-sheet/i, path);
  }
});

test("serves Deliciosa with the approved hero and the shared species body", async () => {
  const html = await (await render("/plantes/monstera/deliciosa")).text();
  assert.match(html, /species-next-hero/);
  assert.match(html, /final-media-v35\/monstera-deliciosa-jonathan-borba-pexels\.webp/);
  assert.match(html, /data-golden-species-v(?:1|25)="monstera\/deliciosa"/);
  assert.match(html, /Statut, synonymes et observation|Taxonomie complète et synonymes/);
  assert.match(html, /plant-needs-visual-system/);
  assert.doesNotMatch(html, /species-next-diagnostic-index/);
  assert.doesNotMatch(html, /species-next-comparison-matrix/);
});

test("renders the Local Species SEO V1 pilot without inventing commerce", async () => {
  const pilots = [
    [
      "/plantes/anthurium/veitchii",
      "Anthurium veitchii",
      "Anthurium veitchii : entretien et conseils | TIBALDO Jungle",
      "/plantes/anthurium",
    ],
    [
      "/plantes/monstera/thai-constellation",
      "Monstera deliciosa ‘Thai Constellation’",
      "Monstera deliciosa ‘Thai Constellation’ : entretien et conseils | TIBALDO Jungle",
      "/plantes/monstera",
    ],
  ];

  for (const [path, species, title, genusPath] of pilots) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/title>`, "i"), path);
    assert.match(html, /species-local-studio/i, path);
    assert.match(html, new RegExp(`${species.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^]*chez TIBALDO Jungle`, "i"), path);
    assert.match(html, /Studio Végétal — TIBALDO Jungle/i, path);
    assert.match(html, /3 place de l’Arbonnoise[^]*59000 Lille/i, path);
    assert.match(html, new RegExp(`href=["']${genusPath.replaceAll("/", "\\/")}["']`, "i"), path);
    assert.match(html, /href=["']\/plantes["']/i, path);
    assert.match(html, /href=["']\/boutique-plantes-lille["']/i, path);
    assert.match(html, /Les disponibilités et les prix varient selon les arrivages/i, path);
    assert.doesNotMatch(html, /offre commerciale autoritaire|La fiche encyclopédique ne constitue pas une annonce/i, path);
    assert.match(html, /"@type":\["GardenStore","LocalBusiness"\]/i, path);
    assert.match(html, /"name":"TIBALDO Jungle"/i, path);
    assert.doesNotMatch(html, /"@type":"Product"|"@type":"Offer"/i, path);
    assert.match(html, /<meta name="robots" content="noindex, nofollow/i, path);
  }

  const hub = await (await render("/plantes/anthurium")).text();
  assert.match(hub, /<title>Anthurium : entretien, espèces et variétés \| TIBALDO Jungle<\/title>/i);
  assert.match(hub, /data-golden-group-v(?:1|25)="anthurium"/i);
  assert.doesNotMatch(hub, /Ce hub compare|catalogue indépendant|offre commerciale autoritaire/i);
  assert.match(hub, /href=["']\/plantes\/anthurium\/veitchii["']/i);

  const boutique = await (await render("/boutique-plantes-lille")).text();
  assert.match(boutique, /<title>Boutique de plantes à Lille \| TIBALDO Jungle<\/title>/i);
  assert.match(boutique, /href=["']\/plantes\/anthurium["']/i);
  assert.match(boutique, /href=["']\/plantes\/monstera\/thai-constellation["']/i);
  assert.match(boutique, /"@type":\["GardenStore","Florist","LocalBusiness"\]/i);
  assert.match(boutique, /"@id":"https:\/\/jungle\.tibaldo\.fr\/#store"/i);
  assert.match(boutique, /"email":"jungle@tibaldo\.fr"/i);
  assert.match(boutique, /"telephone":"\+33743727079"/i);
  assert.match(boutique, /"dayOfWeek":"Tuesday","opens":"14:00","closes":"19:00"/i);
  assert.match(boutique, /tibaldo-jungle-logo\.webp/i);
  assert.doesNotMatch(boutique, /facade-tibaldo-jungle-studio-vegetal-lille\.jpg/i);
  assert.doesNotMatch(boutique, /contact@tibaldo\.fr|Mardi · 10h/i);
  assert.doesNotMatch(boutique, /"@type":"Product"/i);
});

test("scopes the Deliciosa Owner hero without forking the shared species body", async () => {
  const response = await render("/plantes/monstera/deliciosa");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /species-next-hero/i);
  assert.match(html, /data-golden-species-v(?:1|25)="monstera\/deliciosa"/i);
  assert.match(html, /plant-needs-visual-system/i);
  for (const id of ["identite", "entretien", "problemes", "comparaison", "conseils", "faq"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`, "i"), id);
    assert.match(html, new RegExp(`href=["']#${id}["']`, "i"), id);
  }
  assert.match(html, /Sommaire de la fiche plante/i);
  assert.doesNotMatch(html, /species-next-nav|species-next-diagnostic-index|species-next-comparison-matrix/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /final-media-v35\/monstera-deliciosa-jonathan-borba-pexels\.webp/i);
  assert.doesNotMatch(html, /botanix\.com/i);
  assert.match(html, /<meta name="robots" content="noindex, nofollow/i);
  assert.match(html, /rel=["']canonical["'][^>]+plantes\/monstera\/deliciosa/i);

  for (const untouched of [
    "/plantes/monstera",
    "/plantes/monstera/thai-constellation",
    "/plantes/monstera/mint",
    "/plantes/monstera/adansonii",
    "/plantes/monstera/burle-marx-flame",
    "/plantes/monstera/esqueleto",
    "/plantes/anthurium/veitchii",
  ]) {
    const untouchedHtml = await (await render(untouched)).text();
    assert.doesNotMatch(untouchedHtml, /species-next-hero/i, untouched);
  }
});

test("serves species hero photos directly without the vinext image optimizer", async () => {
  for (const [path, image] of [
    ["/plantes/cycas/revoluta", "/media/images/cycas-revoluta/cycas-revoluta-terrasse-tibaldo.webp"],
    ["/plantes/monstera/deliciosa", "/media/final-media-v35/monstera-deliciosa-jonathan-borba-pexels.webp"],
    ["/plantes/anthurium/veitchii", "/media/anthurium-veitchii-king.jpg"],
  ]) {
    const html = await (await render(path)).text();
    assert.match(html, new RegExp(`<img[^>]+src=["']${image.replaceAll("/", "\\/")}["']`, "i"), path);
    assert.match(html, /fetchpriority=["']high["']/i, path);
    assert.match(html, /loading=["']eager["']/i, path);
    assert.match(html, /decoding=["']async["']/i, path);
    assert.doesNotMatch(html, /\/_vinext\/image/i, path);
  }
});

test("renders every V19 species route through the canonical shared profile", async () => {
  const slugs = {
    monstera: ["dubia", "siltepecana", "obliqua", "pinnatipartita", "standleyana"],
    anthurium: ["crystallinum", "magnificum", "forgetii", "papillilaminum"],
    alocasia: ["cuprea", "zebrina", "reginula", "micholitziana", "baginda", "sinuata", "longiloba", "macrorrhizos", "odora"],
  };
  for (const [genre, species] of Object.entries(slugs)) {
    for (const slug of species) {
      const path = `/plantes/${genre}/${slug}`;
      const response = await render(path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /plant-profile-page/i, path);
      assert.match(html, new RegExp(`rel=["']canonical["'][^>]+plantes\\/${genre}\\/${slug}`, "i"), path);
      assert.match(html, /Identité botanique/i, path);
      assert.match(html, /"@type":"FAQPage"/i, path);
      assert.doesNotMatch(html, /species-next-page|veitchii-profile-v2|thai-profile-v3/i, path);
    }
  }
});

test("renders the Bananiers cluster and preserves its API identities", async () => {
  for (const path of ["/plantes/bananiers", "/plantes/musa", "/plantes/ensete", "/plantes/musa/basjoo", "/plantes/musa/sikkimensis-red-tiger", "/plantes/musa/florida-variegata", "/plantes/ensete/ventricosum-maurelii"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<h1/i, path);
    assert.match(html, /canonical/i, path);
  }
  const entries = await (await render("/api/v2/encyclopedie/plantes")).json();
  const florida = entries.find((entry) => entry.encyclopediaSlug === "plantes/musa/florida-variegata");
  assert.equal(florida.taxonomy.species, "Non déterminée");
  assert.equal(florida.cultivar, "Florida Variegata");
});

test("consolidates the V2 hierarchy without orphaning Anthurium or Bananiers", async () => {
  const plantsPage = await (await render("/plantes")).text();
  assert.match(plantsPage, /href=["']\/plantes\/bananiers["']/i);
  assert.doesNotMatch(plantsPage, /class=["']plant-family-card["'][^>]+href=["']\/plantes\/(?:musa|ensete)["']/i);

  const anthurium = await (await render("/plantes/anthurium")).text();
  assert.match(anthurium, /href=["']\/plantes\/anthurium\/clarinervium["']/i);
  assert.match(anthurium, /href=["']\/plantes\/anthurium\/warocqueanum["']/i);

  const bananiers = await (await render("/plantes/bananiers")).text();
  for (const path of ["/plantes/musa", "/plantes/ensete", "/plantes/musa/basjoo", "/plantes/musa/sikkimensis-red-tiger", "/plantes/musa/florida-variegata", "/plantes/ensete/ventricosum-maurelii"]) {
    assert.match(bananiers, new RegExp(`href=["']${path.replaceAll("/", "\\/")}["']`, "i"), path);
  }
});

test("serves complete, media-truth-aware SEO metadata for the nine V2 pages", async () => {
  const paths = [
    "/plantes/anthurium/clarinervium",
    "/plantes/anthurium/warocqueanum",
    "/plantes/bananiers",
    "/plantes/musa",
    "/plantes/ensete",
    "/plantes/musa/basjoo",
    "/plantes/musa/sikkimensis-red-tiger",
    "/plantes/musa/florida-variegata",
    "/plantes/ensete/ventricosum-maurelii",
  ];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/i, path);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i, path);
    assert.match(html, /<meta[^>]+property=["']og:title["']/i, path);
    assert.doesNotMatch(html, /<meta[^>]+property=["']og:image["'][^>]+(?:photo-reelle-a-venir|interprétation éditoriale|pilea-collection-especes)/i, path);
    assert.match(html, /"@type":"BreadcrumbList"/i, path);
    assert.match(html, /<link[^>]+rel=["']canonical["']/i, path);
    assert.match(html, /noindex/i, path);
  }
});
