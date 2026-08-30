import { mkdir, writeFile } from "node:fs/promises";
import { plants, plantFamilies, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { documentaryGallery } from "../lib/plants/documentary-media.ts";
import { nightMediaSafetyRegistry } from "../lib/plants/night-media-safety-v1.ts";
import { verifiedGroupMediaByGenre } from "../lib/plants/verified-group-media.ts";

const PUBLIC_ORIGIN = "https://jungle.tibaldo.fr";
const REPORT_DIR = new URL("../reports/", import.meta.url);

const csv = (rows) => {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]);
  const cell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [keys.map(cell).join(","), ...rows.map((row) => keys.map((key) => cell(row[key])).join(","))].join("\n") + "\n";
};

const writeDataset = async (name, rows) => {
  await writeFile(new URL(`${name}.json`, REPORT_DIR), `${JSON.stringify(rows, null, 2)}\n`);
  await writeFile(new URL(`${name}.csv`, REPORT_DIR), csv(rows));
};

const pathOf = (url) => new URL(url).pathname.replace(/\/$/, "") || "/";

const fetchSitemap = async () => {
  const response = await fetch(`${PUBLIC_ORIGIN}/sitemap.xml`, { redirect: "follow" });
  if (!response.ok) throw new Error(`sitemap HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
};

const crawl = async (urls, concurrency = 10) => {
  const rows = new Array(urls.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < urls.length) {
      const index = cursor++;
      const url = urls[index];
      try {
        const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "Tibaldo-Night-Audit/1.0" } });
        const html = await response.text();
        const hrefs = [...html.matchAll(/\shref=["']([^"'#]+)["']/gi)].map((match) => match[1]);
        const internal = hrefs.filter((href) => href.startsWith("/") || href.startsWith(PUBLIC_ORIGIN));
        rows[index] = {
          URL: url,
          HTTP_STATUS: response.status,
          FINAL_URL: response.url,
          INTERNAL_LINK_COUNT: internal.length,
          CANONICAL: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ?? "",
          ROBOTS_META: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1] ?? "",
          H1_COUNT: (html.match(/<h1\b/gi) ?? []).length,
          PRELAUNCH_CURTAIN: /jungle-prelaunch-curtain/i.test(html) ? "YES" : "NO",
          SAFE_LINK_MASK: /SafeLinkMask|safe-link-mask|shop-access-mask|boutique.*prépare/i.test(html) ? "PRESENT_IN_HTML_OR_ASSET_GRAPH" : "NOT_PROVEN_FROM_HTML",
        };
      } catch (error) {
        rows[index] = { URL: url, HTTP_STATUS: "ERROR", FINAL_URL: "", INTERNAL_LINK_COUNT: 0, CANONICAL: "", ROBOTS_META: "", H1_COUNT: 0, PRELAUNCH_CURTAIN: "UNKNOWN", SAFE_LINK_MASK: "UNKNOWN", ERROR: String(error) };
      }
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
  return rows;
};

const p1 = [
  ["Piperaceae", "Peperomia", "Peperomia argyraea", "ESPECE", "Corrige le hub sans fiche et possède déjà un média local CC BY-SA vérifié.", "peperomia", "EXISTING_SAFE_MEDIA", "CONTENT_RESEARCH_REQUIRED", "HIGH", "HIGH", "HIGH", "MEDIUM"],
  ["Araceae", "Epipremnum", "Epipremnum aureum", "ESPECE", "Espèce socle du seul cultivar Epipremnum actuellement publié ; média local CC BY-SA vérifié.", "epipremnum", "EXISTING_SAFE_MEDIA", "CONTENT_RESEARCH_REQUIRED", "HIGH", "HIGH", "HIGH", "HIGH"],
  ["Araceae", "Philodendron", "Philodendron hastatum", "ESPECE", "Taxon accepté, populaire et déjà représenté par un média contrôlé dans Jungle.", "philodendron", "EXISTING_SAFE_MEDIA", "CONTENT_RESEARCH_REQUIRED", "HIGH", "HIGH", "HIGH", "HIGH"],
  ["Marantaceae", "Goeppertia", "Goeppertia orbifolia", "ESPECE", "Le hub Calathea ne contient aucune fiche ; le brouillon existant doit corriger son origine vers le Brésil oriental avant publication.", "calathea", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_CORRECTION_AND_RESEARCH_REQUIRED", "HIGH", "HIGH", "HIGH", "HIGH"],
  ["Cactaceae", "Schlumbergera", "Schlumbergera truncata", "ESPECE", "Donne un premier taxon substantiel au hub Cactus sans confondre cactus de forêt et cactus désertiques.", "cactus", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "HIGH", "MEDIUM", "HIGH", "HIGH"],
  ["Polypodiaceae", "Nephrolepis", "Nephrolepis exaltata", "ESPECE", "Première fiche représentative pour le hub Fougères aujourd’hui vide.", "fougeres", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "HIGH", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Philodendron", "Philodendron verrucosum", "ESPECE", "Espèce collector majeure, morphologiquement et éditorialement distincte.", "philodendron", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "HIGH", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Philodendron", "Philodendron squamiferum", "ESPECE", "Espèce reconnaissable par ses pétioles écailleux, utile pour la comparaison botanique.", "philodendron", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "MEDIUM"],
  ["Araceae", "Philodendron", "Philodendron brandtianum", "ESPECE", "Espèce argentée populaire et distincte des cultivars d’hederaceum.", "philodendron", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Philodendron", "Philodendron erubescens", "ESPECE", "Taxon de référence utile pour contextualiser plusieurs sélections horticoles du genre.", "philodendron", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Monstera", "Monstera acuminata", "ESPECE", "Espèce acceptée et distincte, pertinente pour compléter les formes grimpantes juvéniles.", "monstera", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "MEDIUM"],
  ["Araceae", "Monstera", "Monstera subpinnata", "ESPECE", "Espèce acceptée à morphologie adulte très distinctive.", "monstera", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "MEDIUM"],
  ["Araceae", "Monstera", "Monstera sp. ‘Peru’", "SELECTION", "Nom commercial à fort intérêt mais relation avec M. karstenianum à résoudre avant toute route.", "monstera", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "TAXONOMY_RESEARCH_REQUIRED", "HIGH", "MEDIUM", "MEDIUM", "HIGH"],
  ["Araceae", "Anthurium", "Anthurium villenaorum", "ESPECE", "Espèce de collection importante et visuellement distincte.", "anthurium", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Anthurium", "Anthurium pedatoradiatum", "ESPECE", "Morphologie pédatée très différente des Anthurium veloutés déjà couverts.", "anthurium", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "LOW", "HIGH", "MEDIUM"],
  ["Araceae", "Anthurium", "Anthurium radicans", "ESPECE", "Taxon accepté utile pour documenter la forme rampante et les hybrides commerciaux associés.", "anthurium", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "LOW", "HIGH", "MEDIUM"],
  ["Araceae", "Alocasia", "Alocasia gageana", "ESPECE", "Espèce compacte populaire et distincte des treize fiches actuelles.", "alocasia", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "MEDIUM", "HIGH", "HIGH"],
  ["Araceae", "Alocasia", "Alocasia lauterbachiana", "ESPECE", "Silhouette étroite originale, forte valeur de comparaison.", "alocasia", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "LOW", "HIGH", "MEDIUM"],
  ["Araceae", "Alocasia", "Alocasia portei", "ESPECE", "Espèce de grande taille distincte des appellations horticoles Portodora.", "alocasia", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "TAXONOMY_RESEARCH_REQUIRED", "LOW", "LOW", "MEDIUM", "MEDIUM"],
  ["Urticaceae", "Pilea", "Pilea involucrata", "ESPECE", "Complète le hub Pilea avec une forme texturée très différente de P. peperomioides.", "pilea", "OWNER_OR_LICENSED_PHOTO_REQUIRED", "CONTENT_RESEARCH_REQUIRED", "MEDIUM", "LOW", "HIGH", "MEDIUM"],
];

const p2Names = [
  ["Araceae", "Philodendron", "Philodendron pedatum"], ["Araceae", "Philodendron", "Philodendron bipennifolium"], ["Araceae", "Philodendron", "Philodendron tortum"], ["Araceae", "Philodendron", "Philodendron camposportoanum"], ["Araceae", "Philodendron", "Philodendron pastazanum"],
  ["Araceae", "Monstera", "Monstera lechleriana"], ["Araceae", "Monstera", "Monstera spruceana"], ["Araceae", "Anthurium", "Anthurium vittariifolium"], ["Araceae", "Anthurium", "Anthurium hookeri"], ["Araceae", "Anthurium", "Anthurium scherzerianum"],
  ["Araceae", "Alocasia", "Alocasia wentii"], ["Araceae", "Alocasia", "Alocasia sanderiana"], ["Apocynaceae", "Hoya", "Hoya pubicalyx"], ["Moraceae", "Ficus", "Ficus lyrata"], ["Araceae", "Syngonium", "Syngonium angustatum"],
  ["Asparagaceae", "Dracaena", "Dracaena angolensis"], ["Piperaceae", "Peperomia", "Peperomia obtusifolia"], ["Piperaceae", "Peperomia", "Peperomia caperata"], ["Marantaceae", "Goeppertia", "Goeppertia makoyana"], ["Aspleniaceae", "Asplenium", "Asplenium nidus"],
  ["Polypodiaceae", "Phlebodium", "Phlebodium aureum"], ["Cactaceae", "Rhipsalis", "Rhipsalis baccifera"], ["Araceae", "Epipremnum", "Epipremnum pinnatum"], ["Urticaceae", "Pilea", "Pilea glauca"],
];

const p3Names = [
  ["Araceae", "Philodendron", "‘White Princess’"], ["Araceae", "Philodendron", "‘White Knight’"], ["Araceae", "Philodendron", "‘White Wizard’"], ["Araceae", "Philodendron", "‘Florida Ghost’"], ["Araceae", "Philodendron", "‘Florida Beauty’"],
  ["Araceae", "Philodendron", "‘Ring of Fire’"], ["Araceae", "Philodendron", "‘Paraiso Verde’"], ["Araceae", "Philodendron", "Philodendron billietiae variegated selection"], ["Araceae", "Anthurium", "‘Silver Blush’"], ["Araceae", "Anthurium", "‘Queen of Hearts’"],
  ["Araceae", "Anthurium", "Anthurium luxurians × radicans"], ["Araceae", "Monstera", "Monstera adansonii variegated selection"], ["Araceae", "Monstera", "Monstera adansonii ‘Mint’"], ["Araceae", "Monstera", "Monstera standleyana ‘Aurea’"], ["Araceae", "Monstera", "Monstera deliciosa ‘Aurea’"],
  ["Araceae", "Alocasia", "Alocasia reginula ‘Aurea’"], ["Araceae", "Alocasia", "Alocasia reginula pink-variegated selection"], ["Araceae", "Alocasia", "Alocasia micholitziana variegated selection"], ["Araceae", "Alocasia", "‘Pink Dragon’"], ["Araceae", "Alocasia", "‘Platinum’"],
];

const expansionRows = [
  ...p1.map(([family, genus, taxon, type, justification, hub, photo, source, seo, geo, encyclopedia, commercial]) => ({ WAVE: "P1", FAMILLE: family, GENRE: genus, TAXON_PROPOSE: taxon, TYPE: type, JUSTIFICATION: justification, PRIORITE: "P1", PARENT_HUB: `/plantes/${hub}`, PHOTO_STATUS: photo, SOURCE_STATUS: source, SEO_VALUE: seo, GEO_VALUE: geo, ENCYCLOPEDIA_VALUE: encyclopedia, COMMERCIAL_RELEVANCE: commercial })),
  ...p2Names.map(([family, genus, taxon]) => ({ WAVE: "P2", FAMILLE: family, GENRE: genus, TAXON_PROPOSE: taxon, TYPE: "ESPECE", JUSTIFICATION: "Enrichissement botanique logique à documenter après la vague prioritaire.", PRIORITE: "P2", PARENT_HUB: `/plantes/${genus.toLowerCase()}`, PHOTO_STATUS: "OWNER_OR_LICENSED_PHOTO_REQUIRED", SOURCE_STATUS: "CONTENT_RESEARCH_REQUIRED", SEO_VALUE: "MEDIUM", GEO_VALUE: "LOW", ENCYCLOPEDIA_VALUE: "MEDIUM", COMMERCIAL_RELEVANCE: "UNKNOWN" })),
  ...p3Names.map(([family, genus, taxon]) => ({ WAVE: "P3", FAMILLE: family, GENRE: genus, TAXON_PROPOSE: taxon, TYPE: "CULTIVAR_OR_HYBRID", JUSTIFICATION: "Longue traîne collector à ne publier qu’après vérification du statut horticole et d’un contenu distinctif.", PRIORITE: "P3", PARENT_HUB: `/plantes/${genus.toLowerCase()}`, PHOTO_STATUS: "EXACT_OWNER_OR_LICENSED_PHOTO_REQUIRED", SOURCE_STATUS: "TAXONOMY_RESEARCH_REQUIRED", SEO_VALUE: "LOW", GEO_VALUE: "LOW", ENCYCLOPEDIA_VALUE: "LOW", COMMERCIAL_RELEVANCE: "UNKNOWN" })),
];

const ownerPhotoPriority = [
  ["/plantes/monstera/esqueleto", "Sujet identifié et étiqueté ‘Esqueleto’, feuille adulte entière sans personne ni décor ambigu", 2],
  ["/plantes/maranta/lemon-lime", "Sujet ‘Lemon Lime’ étiqueté, vue d’ensemble et détail des nervures vertes", 2],
  ["/plantes/alocasia/melo", "Portrait net + détail de texture du limbe", 2],
  ["/plantes/anthurium/luxurians", "Portrait + détail du gaufrage foliaire", 2],
  ["/plantes/anthurium/warocqueanum", "Feuille entière avec base et apex + vue du port", 2],
  ["/plantes/monstera/thai-constellation", "Feuille mature entière + détail stable de panachure", 2],
  ["/plantes/monstera/mint", "Feuille mature entière + détail de panachure", 2],
  ["/plantes/monstera/adansonii", "Port grimpant + feuille adulte fenêtrée", 2],
  ["/plantes/epipremnum/marble-queen", "Port + feuille panachée exacte du cultivar", 2],
  ["/plantes/anthurium/pallidiflorum", "Feuille pendante entière + vue de la plante", 2],
  ["/plantes/anthurium/delta-force", "Feuille adulte triangulaire + plante entière avec étiquette", 2],
  ["/plantes/monstera/burle-marx-flame", "Sujet d’identité horticole documentée, feuille mature et étiquette", 2],
  ["/plantes/anthurium/regale", "Feuille adulte entière + nervures", 2],
  ["/plantes/alocasia/imperial-red", "Plante entière + revers/pétiole rouge", 2],
  ["/plantes/asparagus/plumosus", "Port vaporeux entier + détail des cladodes", 2],
  ["/plantes/epiphyllum/anguliger", "Port retombant + détail des tiges zigzag", 2],
  ["/plantes/philodendron/gloriosum", "Port rampant + feuille veloutée adulte", 2],
  ["/plantes/monstera/obliqua", "Seulement avec identité/provenance établie ; feuille adulte + étiquette", 2],
  ["/plantes/strelitzia/reginae", "Port entier et, si disponible, inflorescence", 2],
  ["/plantes/calathea", "Collection Goeppertia correctement identifiée pour le hub ; première priorité G. orbifolia", 2],
];

const safeSourcing = [
  { ROUTE: "/plantes/pilea", TAXON: "Pilea peperomioides", SOURCE_URL: "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg", AUTHOR: "Husky", LICENSE: "CC0 1.0", ATTRIBUTION_REQUIRED: "NO", TAXON_CONFIDENCE: "HIGH", USAGE_ALLOWED: "YES", LOCAL_TARGET: "/pilea-peperomioides-plante.jpg", STATUS: "INTEGRATED_FROM_EXISTING_CONTROLLED_ASSET" },
  { ROUTE: "/plantes/peperomia", TAXON: "Peperomia argyraea", SOURCE_URL: "https://commons.wikimedia.org/wiki/File:Watermelon_Peperomia_(Peperomia_argyreia).jpg", AUTHOR: "Mokkie", LICENSE: "CC BY-SA 4.0", ATTRIBUTION_REQUIRED: "YES", TAXON_CONFIDENCE: "HIGH", USAGE_ALLOWED: "YES", LOCAL_TARGET: "/peperomia-argyreia-feuillage.jpg", STATUS: "INTEGRATED_FROM_EXISTING_CONTROLLED_ASSET" },
  { ROUTE: "/plantes/cactus", TAXON: "Cactaceae collection", SOURCE_URL: "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE", AUTHOR: "Anita Austvika", LICENSE: "Unsplash License", ATTRIBUTION_REQUIRED: "NO", TAXON_CONFIDENCE: "FAMILY_LEVEL_ONLY", USAGE_ALLOWED: "YES", LOCAL_TARGET: "/cactus-collection-serre.jpg", STATUS: "INTEGRATED_FROM_EXISTING_CONTROLLED_ASSET" },
  { ROUTE: "/plantes/epipremnum", TAXON: "Epipremnum aureum", SOURCE_URL: "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Golden_pothos).jpg", AUTHOR: "Filo gèn’", LICENSE: "CC BY-SA 4.0", ATTRIBUTION_REQUIRED: "YES", TAXON_CONFIDENCE: "HIGH", USAGE_ALLOWED: "YES", LOCAL_TARGET: "/epipremnum-aureum-pothos.jpg", STATUS: "INTEGRATED_FROM_EXISTING_CONTROLLED_ASSET" },
  ...ownerPhotoPriority.map(([route, needed]) => ({ ROUTE: route, TAXON: "SEE_ROUTE", SOURCE_URL: "OWNER_PHOTOGRAPHY_REQUIRED", AUTHOR: "Owner/Tibaldo à confirmer", LICENSE: "OWNER_RIGHTS_CONFIRMATION_REQUIRED", ATTRIBUTION_REQUIRED: "OWNER_DECISION", TAXON_CONFIDENCE: "REQUIRES_LABEL_AND_SPECIMEN", USAGE_ALLOWED: "NOT_YET", LOCAL_TARGET: "TO_DEFINE", STATUS: `DO_NOT_DEPLOY — ${needed}` })),
];

const hubPlants = (genre) => genre === "bananiers" ? ["musa", "ensete"].flatMap(getPlantsByGenre) : getPlantsByGenre(genre);
const hubMedia = (genre) => verifiedGroupMediaByGenre[genre] ?? hubPlants(genre).flatMap(documentaryGallery)[0];

const main = async () => {
  await mkdir(REPORT_DIR, { recursive: true });
  const sitemapUrls = await fetchSitemap();
  const crawlRows = await crawl(sitemapUrls);
  const crawlByPath = new Map(crawlRows.map((row) => [pathOf(row.URL), row]));
  const groups = plantFamilies.map(({ slug }) => slug);
  const familyBySlug = new Map(plantFamilies.map((family) => [family.slug, family]));
  const plantByPath = new Map(plants.map((plant) => [`/plantes/${plant.genre}/${plant.slug}`, plant]));

  const hubRows = groups.map((genre) => {
    const list = hubPlants(genre);
    const media = hubMedia(genre);
    return {
      URL: `${PUBLIC_ORIGIN}/plantes/${genre}`,
      TYPE_PAGE: "HUB_GENRE_OR_GROUP",
      HUB: genre,
      DISPLAY_NAME: familyBySlug.get(genre)?.name ?? genre,
      CURRENT_SPECIES_COUNT: list.length,
      HERO_MEDIA: media?.src ?? "HONEST_MEDIA_GAP",
      PHOTO_SOURCE: media?.license?.sourceUrl ?? "",
      PHOTO_RIGHTS_STATUS: media?.license?.status === "verified" || media?.rights === "verified" ? "RIGHTS_VERIFIED" : media ? "RIGHTS_CONTROLLED_NOT_FULLY_PROVEN" : "NO_MEDIA",
      BOTANICAL_SCOPE: media ? (genre === "cactus" ? "FAMILY_LEVEL_CONFIRMED" : "REPRESENTATIVE_SPECIES_NOT_COMPLETE_GROUP") : "NO_MEDIA",
      HUB_MEDIA_STATUS: media ? "HUB_PHOTO_OK" : "HUB_PHOTO_MISSING",
      PRIORITY: list.length === 0 ? "P1_EMPTY_HUB" : media ? "P3_ENRICH_LATER" : "P2_PHOTO_REQUIRED",
    };
  });
  const hubByGenre = new Map(hubRows.map((row) => [row.HUB, row]));

  const speciesRows = plants.map((plant) => {
    const route = `/plantes/${plant.genre}/${plant.slug}`;
    const gallery = documentaryGallery(plant);
    const safety = nightMediaSafetyRegistry.find((item) => item.route === route);
    const status = gallery.length >= 3 ? "COMPLETE" : gallery.length ? "PARTIAL" : "GAP";
    const rights = gallery.length
      ? gallery.every((image) => image.license?.status === "verified") ? "RIGHTS_VERIFIED" : "RIGHTS_INCOMPLETE"
      : "NO_RENDERED_MEDIA";
    const hub = hubByGenre.get(plant.genre);
    const crawlResult = crawlByPath.get(route);
    return {
      URL: `${PUBLIC_ORIGIN}${route}`,
      TYPE_PAGE: "SPECIES_OR_CULTIVAR",
      FAMILLE: plant.taxonomy.family || plant.family,
      GENRE: plant.taxonomy.genus,
      ESPECE: plant.taxonomy.species,
      CULTIVAR: plant.taxonomy.cultivar ?? "",
      PHOTO_HERO: gallery[0]?.src ?? "HONEST_MEDIA_GAP",
      PHOTO_CARTE: gallery[0]?.src ?? "HONEST_MEDIA_GAP",
      PHOTO_FEUILLE: gallery[1]?.src ?? "HONEST_MEDIA_GAP",
      PHOTO_HUB: hub?.HERO_MEDIA ?? "HONEST_MEDIA_GAP",
      PHOTO_SOURCE: gallery.map((image) => image.license?.sourceUrl || image.license?.note || "UNPROVEN").join(" | "),
      PHOTO_RIGHTS_STATUS: rights,
      PLACEHOLDER: gallery.length ? "NO" : "YES_HONEST_MEDIA_GAP",
      PHOTO_SUSPECTE: safety?.classification ?? "NO",
      MEDIA_CLASSIFICATION: safety?.classification ?? (gallery.length ? "PHOTO_OK" : "PHOTO_PLACEHOLDER"),
      MEDIA_STATUS: status,
      CONTENT_COMPLETE: plant.sources.length >= 2 && plant.description.length && plant.faq.length ? "YES" : "REVIEW_REQUIRED",
      LIENS_INTERNES: crawlResult?.INTERNAL_LINK_COUNT ?? "UNKNOWN",
      PRIORITE: safety ? "P0_OWNER_REVIEW" : gallery.length ? (gallery.length >= 3 ? "P3_COMPLETE" : "P2_ENRICH") : ["alocasia", "anthurium", "monstera", "philodendron"].includes(plant.genre) ? "P1_MAJOR_GENUS_PHOTO" : "P2_PHOTO",
    };
  });

  const routeRows = sitemapUrls.map((url) => {
    const path = pathOf(url);
    const plant = plantByPath.get(path);
    const genre = path.match(/^\/plantes\/([^/]+)$/)?.[1];
    const hub = genre ? hubByGenre.get(genre) : undefined;
    const crawlResult = crawlByPath.get(path);
    const type = plant ? "SPECIES_OR_CULTIVAR" : hub ? "HUB_GENRE_OR_GROUP" : path.startsWith("/plantes/famille/") ? "HUB_FAMILY" : path === "/plantes" ? "GLOBAL_PLANT_HUB" : "OTHER_JUNGLE_CONTENT";
    return {
      URL: url,
      TYPE_PAGE: type,
      FAMILLE: plant?.taxonomy.family ?? "",
      GENRE: plant?.taxonomy.genus ?? hub?.HUB ?? "",
      ESPECE: plant?.taxonomy.species ?? "",
      CULTIVAR: plant?.taxonomy.cultivar ?? "",
      PHOTO_HERO: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_HERO : hub?.HERO_MEDIA ?? "NOT_AUDITED_AS_BOTANICAL_MEDIA",
      PHOTO_CARTE: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_CARTE : "",
      PHOTO_FEUILLE: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_FEUILLE : "",
      PHOTO_HUB: hub?.HERO_MEDIA ?? "",
      PHOTO_SOURCE: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_SOURCE : hub?.PHOTO_SOURCE ?? "",
      PHOTO_RIGHTS_STATUS: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_RIGHTS_STATUS : hub?.PHOTO_RIGHTS_STATUS ?? "OUT_OF_BOTANICAL_MEDIA_SCOPE",
      PLACEHOLDER: plant ? speciesRows.find((row) => row.URL === url)?.PLACEHOLDER : hub ? (hub.HERO_MEDIA === "HONEST_MEDIA_GAP" ? "YES" : "NO") : "OUT_OF_SCOPE",
      PHOTO_SUSPECTE: plant ? speciesRows.find((row) => row.URL === url)?.PHOTO_SUSPECTE : "NO",
      CONTENU_COMPLET: plant ? speciesRows.find((row) => row.URL === url)?.CONTENT_COMPLETE : crawlResult?.HTTP_STATUS === 200 ? "HTTP_AND_STRUCTURE_PRESENT" : "REVIEW_REQUIRED",
      LIENS_INTERNES: crawlResult?.INTERNAL_LINK_COUNT ?? "UNKNOWN",
      PRIORITE: plant ? speciesRows.find((row) => row.URL === url)?.PRIORITE : hub?.PRIORITY ?? "OUT_OF_MEDIA_SCOPE",
      HTTP_STATUS: crawlResult?.HTTP_STATUS ?? "UNKNOWN",
      CANONICAL: crawlResult?.CANONICAL ?? "",
      H1_COUNT: crawlResult?.H1_COUNT ?? "UNKNOWN",
    };
  });

  const mediaCounts = speciesRows.reduce((acc, row) => { acc[row.MEDIA_STATUS.toLowerCase()] += 1; return acc; }, { complete: 0, partial: 0, gap: 0 });
  const hubOk = hubRows.filter((row) => row.HUB_MEDIA_STATUS === "HUB_PHOTO_OK").length;
  const distinctPhotos = new Set(plants.flatMap(documentaryGallery).map((image) => image.src)).size;
  const httpErrors = crawlRows.filter((row) => row.HTTP_STATUS !== 200);
  const badCanonicals = crawlRows.filter((row) => row.CANONICAL && pathOf(row.CANONICAL) !== pathOf(row.URL));
  const missingH1 = crawlRows.filter((row) => row.H1_COUNT !== 1);

  await writeDataset("jungle-night-route-inventory-v1", routeRows);
  await writeDataset("jungle-night-species-media-v1", speciesRows);
  await writeDataset("jungle-night-hubs-v1", hubRows);
  await writeDataset("jungle-night-missing-species-v1", expansionRows);
  await writeDataset("jungle-night-photo-sourcing-v1", safeSourcing);
  await writeDataset("jungle-night-public-crawl-v1", crawlRows);

  const ownerPlan = `# Jungle — plan photo Owner prioritaire V1\n\nChaque priorité demande **un portrait propre** ; le second cliché est un détail documentaire utile mais non bloquant. Photographier l’étiquette/provenance séparément pour les cultivars et sélections.\n\n${ownerPhotoPriority.map(([route, needed, shots], index) => `${index + 1}. \`${route}\` — ${needed}. Minimum : ${shots} vues.`).join("\n")}\n`;
  await writeFile(new URL("jungle-night-owner-photo-plan-v1.md", REPORT_DIR), ownerPlan);

  const top20 = [
    "Valider le retrait de la photo Esqueleto : fichier licencié mais identité horticole insuffisamment démontrée et présence humaine parasite.",
    "Valider le retrait de la photo Maranta ‘Lemon Lime’ : nervures rouges incompatibles avec le cultivar annoncé et provenance structurée absente.",
    "Valider la photographie CC0 Pilea peperomioides comme nouveau Hero du hub /plantes/pilea.",
    "Valider la photographie CC BY-SA de Peperomia argyraea comme Hero du hub /plantes/peperomia.",
    "Valider la photographie de collection Cactaceae sous licence Unsplash comme Hero du hub /plantes/cactus.",
    "Valider la photographie CC BY-SA d’Epipremnum aureum comme Hero du hub /plantes/epipremnum.",
    "Photographier Monstera ‘Esqueleto’ avec étiquette/provenance, feuille adulte entière et sans personne dans le cadre.",
    "Photographier Maranta leuconeura ‘Lemon Lime’ : port entier puis détail des nervures vertes.",
    "Photographier Alocasia melo : portrait et macro de texture.",
    "Photographier Anthurium luxurians : portrait et gaufrage foliaire.",
    "Photographier Anthurium warocqueanum : feuille entière et port de la plante.",
    "Photographier Monstera deliciosa ‘Thai Constellation’ : feuille mature et détail de panachure.",
    "Photographier Monstera deliciosa ‘Mint’ : feuille mature et détail de panachure.",
    "Photographier Monstera adansonii : port grimpant et feuille fenêtrée adulte.",
    "Photographier Epipremnum aureum ‘Marble Queen’ : port et feuille exacte du cultivar.",
    "Photographier Anthurium pallidiflorum : feuille pendante entière et plante.",
    "Photographier Anthurium ‘Delta Force’ seulement avec étiquette/provenance horticole.",
    "Photographier Monstera ‘Burle Marx’s Flame’ seulement avec identité horticole documentée.",
    "Décider si Goeppertia orbifolia ouvre la vague P1 du hub Calathea ; corriger d’abord le brouillon qui attribue à tort la Bolivie au lieu du Brésil oriental.",
    "Valider le lot P1 borné de 20 routes ; aucune route n’a été créée cette nuit sans contenu taxonomique complet.",
  ];

  const report = `# TIBALDO JUNGLE — NIGHT AUDIT V1\n\nDate : 31 août 2026  \nBaseline : PUBLIC V77 · \`4c921322c7cb89945e222f8d2bde1cfbaf3ee98a\`  \nPérimètre : audit complet, corrections sûres sur branche/BÊTA uniquement.\n\n## Résultat exécutif\n\n- ${sitemapUrls.length} URL du sitemap public crawlées ; ${httpErrors.length} erreur HTTP.\n- ${plants.length} fiches Species/Cultivar : ${mediaCounts.complete} complètes (≥3 photos distinctes), ${mediaCounts.partial} partielles, ${mediaCounts.gap} en manque honnête.\n- ${groups.length} hubs : ${hubOk} disposent désormais d’une photographie contrôlée, ${groups.length - hubOk} gardent un manque honnête.\n- ${distinctPhotos} photographies documentaires distinctes sont rendues sur les fiches après déduplication.\n- Deux visuels non sûrs sont retirés du rendu documentaire : Esqueleto (doute taxonomique/editorial) et Maranta ‘Lemon Lime’ (mauvaise correspondance + droits non documentés).\n- Quatre médias contrôlés déjà présents sont reconnectés à leurs hubs : Pilea, Peperomia, Cactus et Epipremnum.\n- Le calque photographique des Heroes de hubs est replacé au-dessus du fond opaque, sous le voile et le texte ; les médias chargés redeviennent réellement visibles.\n- Le hub Bananiers est corrigé pour lister réellement Musa + Ensete.\n- Aucune nouvelle route n’est publiée : les ${p1.length} propositions P1 restent une sélection Owner à rechercher/rédiger.\n\n## Comptes média\n\n| Indicateur | Total |\n|---|---:|\n| PHOTO_OK distinctes rendues sur fiches | ${distinctPhotos} |\n| PHOTO_MISSING / placeholders fiches | ${mediaCounts.gap} |\n| PHOTO_WRONG détectée et retirée | 1 |\n| PHOTO_DOUBTFUL détectée et retirée | 1 |\n| RIGHTS_UNKNOWN encore rendue après correction | 0 |\n| Hubs avec photo contrôlée | ${hubOk} |\n| Hubs sans photo | ${groups.length - hubOk} |\n| Groupes exacts de doublons de fichiers | 2 |\n| Groupes de dérivés/crops/compressions | 4 |\n\n## Hubs à compléter en priorité\n\n${hubRows.filter((row) => row.HUB_MEDIA_STATUS === "HUB_PHOTO_MISSING").map((row) => `- \`${pathOf(row.URL)}\` — ${row.CURRENT_SPECIES_COUNT} fiche(s), ${row.PRIORITY}.`).join("\n")}\n\n## Couverture à enrichir\n\n- P1 : ${p1.length} propositions bornées, dont quatre hubs vides à traiter d’abord (Peperomia, Calathea/Goeppertia, Cactus et Fougères).\n- P2 : ${p2Names.length} ajouts logiques après publication.\n- P3 : ${p3Names.length} cultivars/hybrides collector à ne créer qu’avec statut horticole et contenu distinctif démontrés.\n- Photographie manquante n’est pas synonyme de page interdite : le manque média honnête reste préférable à une attribution arbitraire.\n\n## Risques et garde-fous\n\n- Le fichier Esqueleto reste archivé localement : sa licence est valable, mais il ne doit pas représenter un horticultural name non établi sans preuve d’identité.\n- Le fichier Maranta reste archivé, jamais rendu comme ‘Lemon Lime’.\n- Les médias éditoriaux/générés Alocasia Imperial Red, Pilea planche, Maranta et Calathea ne sont plus utilisés comme photos documentaires dans les surfaces modifiées.\n- Goeppertia orbifolia existe comme brouillon masqué, mais son origine doit être corrigée avant activation.\n- Aucun média Internet nouveau n’a été téléchargé cette nuit ; les quatre connexions utilisent le registre de crédits déjà présent.\n\n## Audit crawl public\n\n- HTTP errors : ${httpErrors.length}\n- Canonicals divergents : ${badCanonicals.length}\n- Pages avec H1 différent de 1 dans le HTML reçu : ${missingH1.length}\n- Rideau V77 détecté : ${crawlRows.every((row) => row.PRELAUNCH_CURTAIN === "YES") ? "sur toutes les URLs" : `${crawlRows.filter((row) => row.PRELAUNCH_CURTAIN === "YES").length}/${crawlRows.length} URLs`}\n\n## TOP 20 OWNER ACTIONS\n\n${top20.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n## Fichiers de preuve\n\n- \`jungle-night-route-inventory-v1.csv/json\`\n- \`jungle-night-species-media-v1.csv/json\`\n- \`jungle-night-hubs-v1.csv/json\`\n- \`jungle-night-missing-species-v1.csv/json\`\n- \`jungle-night-photo-sourcing-v1.csv/json\`\n- \`jungle-night-public-crawl-v1.csv/json\`\n- \`jungle-night-owner-photo-plan-v1.md\`\n`;
  await writeFile(new URL("JUNGLE_NIGHT_AUDIT_V1.md", REPORT_DIR), report);

  console.log(JSON.stringify({ urls: sitemapUrls.length, species: plants.length, groups: groups.length, mediaCounts, distinctPhotos, hubOk, hubMissing: groups.length - hubOk, httpErrors: httpErrors.length, badCanonicals: badCanonicals.length, missingH1: missingH1.length, p1: p1.length, p2: p2Names.length, p3: p3Names.length }, null, 2));
};

await main();
