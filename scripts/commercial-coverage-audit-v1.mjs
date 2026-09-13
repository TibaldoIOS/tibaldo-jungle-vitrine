import { readFileSync, writeFileSync } from "node:fs";
import { plants } from "../lib/plants/catalog.ts";
import { plantEntityId } from "../lib/plants/canonical-identity.ts";

// This is the Owner's explicitly requested reference set, NOT an invented
// current stock export. Existing six-product mapping stays canonical.
const references = [
  ["Alocasia zebrina", "alocasia/zebrina"], ["Alocasia Frydek Variegata", "alocasia/frydek-variegata", "HORTICULTURAL_FORM_MATCH"],
  ["Alocasia Silver Dragon", "alocasia/silver-dragon", "HORTICULTURAL_FORM_MATCH"], ["Alocasia Red Secret", "alocasia/red-secret", "HORTICULTURAL_FORM_MATCH"],
  ["Alocasia Jacklyn", "alocasia/tandurusa"], ["Alocasia Bambino", "alocasia/bambino", "HORTICULTURAL_FORM_MATCH"], ["Alocasia melo", "alocasia/melo"], ["Alocasia Dragon Scale", "alocasia/baginda", "SPECIES_LEVEL_MATCH"],
  ...["clarinervium", "pallidiflorum", "veitchii", "warocqueanum", "regale", "crystallinum", "magnificum"].map(s => [`Anthurium ${s}`, `anthurium/${s}`]),
  ["Philodendron Imperial Green", "philodendron/imperial-green", "HORTICULTURAL_FORM_MATCH"], ["Philodendron Pink Princess", "philodendron/pink-princess", "HORTICULTURAL_FORM_MATCH"],
  ...["melanochrysum", "gloriosum"].map(s => [`Philodendron ${s}`, `philodendron/${s}`]),
  ["Philodendron splendid", "philodendron/splendid", "HORTICULTURAL_FORM_MATCH"], ["Philodendron Florida Green", "philodendron/florida-green", "HORTICULTURAL_FORM_MATCH"], ["Philodendron spiritus-sancti", "philodendron/spiritus-sancti"],
  ["Monstera deliciosa", "monstera/deliciosa"], ["Monstera deliciosa Variegata", "monstera/deliciosa-variegata", "HORTICULTURAL_FORM_MATCH"], ["Monstera Thai Constellation", "monstera/thai-constellation", "HORTICULTURAL_FORM_MATCH"],
  ...["dubia", "obliqua", "adansonii"].map(s => [`Monstera ${s}`, `monstera/${s}`]), ["Monstera Squeleto", "monstera/esqueleto", "HORTICULTURAL_FORM_MATCH"],
  ["Hoya callistophylla", "hoya/callistophylla"],
  ["Dracaena / Sansevieria Black Diamond", "sansevieria/black-diamond", "HORTICULTURAL_FORM_MATCH"], ["Dracaena / Sansevieria Black Gold", "sansevieria/black-gold", "HORTICULTURAL_FORM_MATCH"],
  ["Asparagus plumosus", "asparagus/plumosus"], ["Epipremnum aureum", "epipremnum/aureum"], ["Epipremnum Marble Queen", "epipremnum/marble-queen", "HORTICULTURAL_FORM_MATCH"],
  ["Maranta Lemon", null, "AMBIGUOUS_MATCH", "Confirmer Lemon Lime sur l’étiquette du produit ; le nom abrégé seul n’est pas une preuve."],
  ["Pilea peperomioides", "pilea/peperomioides"], ["Pilea involucrata Moon Valley", "pilea/moon-valley", "HORTICULTURAL_FORM_MATCH"],
  ["Chlorophytum Bonnie", "chlorophytum/bonnie", "HORTICULTURAL_FORM_MATCH"], ["Chlorophytum Ocean", "chlorophytum/ocean", "HORTICULTURAL_FORM_MATCH"], ["Asplenium nidus", "asplenium/nidus"],
  ["Beaucarnea", null, "IDENTITY_INSUFFICIENT", "Étiquette fournisseur indiquant l’espèce ; la demande de fiche recurvata n’identifie pas l’arrivage générique."],
  ["Nephrolepis Green Lady", "nephrolepis/green-lady", "HORTICULTURAL_FORM_MATCH"], ["Nephrolepis Green Moment", "nephrolepis/green-moment", "HORTICULTURAL_FORM_MATCH"],
  ["Agave americana Variegata", "agave/americana-variegata", "HORTICULTURAL_FORM_MATCH"], ["Colocasia Metallica", "colocasia/metallica", "HORTICULTURAL_FORM_MATCH"],
  ["Cycas revoluta", "cycas/revoluta"], ["Dicksonia antarctica", "dicksonia/antarctica"], ["Fatsia japonica Spider's Web", "fatsia/japonica-spiders-web", "HORTICULTURAL_FORM_MATCH"],
  ["Strelitzia augusta", null, "AMBIGUOUS_MATCH", "Le synonyme botanique vise alba, mais Augusta est aussi mal appliqué commercialement à nicolai. Exiger une identité fournisseur complète ou des caractères adultes probants."],
  ["Nepenthes", null, "IDENTITY_INSUFFICIENT", "Espèce ou hybride précis sur l’étiquette ; aucune identité déduite d’un mélange."],
];
const old = JSON.parse(readFileSync(new URL("../docs/shop-to-jungle-coverage-v1.json", import.meta.url), "utf8"));
const records = references.map(([name, id, level = "EXACT_ENCYCLOPEDIA_MATCH", blocker = null]) => {
  const p = plants.find(p => plantEntityId(p) === id);
  return { PRODUCT_NAME: name, PRODUCT_ID_IF_AVAILABLE: null, EVIDENCE_SCOPE: "Owner audit reference list 2026-09-13; not a live stock assertion", CANONICAL_BOTANICAL_IDENTITY: p?.botanicalName ?? null, ENCYCLOPEDIA_ENTITY: p ? id : null, ENCYCLOPEDIA_URL: p ? `https://jungle.tibaldo.fr/plantes/${id}` : null, MATCH_LEVEL: id && !p ? "NO_MATCH" : level, LINKAGE_READY: p ? "YES" : "NO", BLOCKER: id && !p ? "Canonical page missing" : blocker, IDENTITY_CONFIDENCE: p ? "HIGH_AT_DECLARED_MATCH_LEVEL" : "INSUFFICIENT", COMMERCIAL_AVAILABILITY: "NOT_ASSERTED" };
});
const count = level => records.filter(r => r.MATCH_LEVEL === level).length;
const covered = records.filter(r => r.LINKAGE_READY === "YES").length;
const result = { mission: "COMMERCIAL_TO_ENCYCLOPEDIA_MAPPING_V1", canonical_mapping_mechanism: "docs/shop-to-jungle-coverage-v1.json + lib/plants/catalog.ts; this is an audit export only", live_shop_read: { endpoint: "https://shop.tibaldo.fr/api/catalogue", http: 404, homepage_http: 200, homepage_state: "Shop coming-soon page, no current product export", full_current_catalog_coverage: "NOT_PROVEN" }, known_source_product_mappings: old.records,
  kpi: { KNOWN_COMMERCIAL_PLANT_REFERENCES: records.length, EXACTLY_MAPPED: count("EXACT_ENCYCLOPEDIA_MATCH"), HORTICULTURAL_FORM_MAPPED: count("HORTICULTURAL_FORM_MATCH"), SPECIES_LEVEL_MAPPED: count("SPECIES_LEVEL_MATCH"), AMBIGUOUS: count("AMBIGUOUS_MATCH"), MISSING_PAGE: count("NO_MATCH"), IDENTITY_INSUFFICIENT: count("IDENTITY_INSUFFICIENT"), COMMERCIAL_ENCYCLOPEDIA_COVERAGE_PERCENT: +(100 * covered / records.length).toFixed(2), DENOMINATOR: "51 Owner-listed plant references, NOT the unavailable complete current Shop catalog. Horticultural matches are counted separately from exact botanical species matches." },
  records, SHOP_MUTATED: false, BACKEND_MUTATED: false, CAISSE_MUTATED: false };
writeFileSync(new URL("../docs/COMMERCIAL_TO_ENCYCLOPEDIA_MAPPING_V1.json", import.meta.url), JSON.stringify(result, null, 2) + "\n");
writeFileSync(new URL("../docs/ENCYCLOPEDIA_OWNER_AMBIGUITIES_V1.json", import.meta.url), JSON.stringify({ commercial_records: records.filter(r => r.LINKAGE_READY === "NO"), additional_generic_labels_do_not_create: ["ALOCASIA", "ALOCASIA MELANGE", "CACTUS MELANGE", "PHILODENDRON MIX", "PLANTE VERTE", "NEPENTHES MELANGE"], existing_entities: [{ id: "anthurium/papillilaminum-dark-phoenix", evidence_required: "Étiquette complète du croisement : papi n’est pas une preuve de papillilaminum ; nom et filiation du second parent." }, { id: "anthurium/forgetii-dark-form-silver-blush", evidence_required: "Étiquette/provenance du croisement et des sélections parentales ; ne pas certifier un cultivar ou clone depuis la photo." }, { id: "equisetum/japonicum", evidence_required: "Identité complète du fournisseur et caractères du sujet pour résoudre le nom horticole japonicum." }], non_blocking_media_backlog: "See ENCYCLOPEDIA_QUALITY_AUDIT_V1.json; photographs do not block factual documentary pages", one_batched_owner_report: true }, null, 2) + "\n");
console.log(JSON.stringify(result.kpi, null, 2));
