import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { plants, plantFamilies, getPlantsByGenre } from "../lib/plants/catalog.ts";
import { comparisonTarget, parentSpecies, identityNames, normalizeIdentity, plantEntityId } from "../lib/plants/canonical-identity.ts";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy } from "../lib/plants/types.ts";
import { p1AliasCanonicalMap as encyclopediaP1Redirects } from "../lib/plants/encyclopedia-p1-expansion.ts";

const out = name => new URL(`../docs/${name}.json`, import.meta.url);
const save = (name, data) => writeFileSync(out(name), JSON.stringify(data, null, 2) + "\n");
const baselineName = "ENCYCLOPEDIA_BASELINE_V125";
if (process.argv.includes("--snapshot-before")) {
  if (existsSync(out(baselineName))) throw new Error("Baseline already exists; never overwrite historical evidence");
  save(baselineName, { version: 125, commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), entries: plants });
  console.log(`Baseline preserved: ${plants.length} entities`);
  process.exit();
}
const baseline = JSON.parse(readFileSync(out(baselineName), "utf8"));
const protectedNames = new Set(["monstera/esqueleto", "monstera/burle-marx-flame", "musa/florida-variegata", "alocasia/silver-dragon", "alocasia/red-secret", "colocasia/metallica", "sansevieria/black-diamond"]);
const ambiguous = new Set(["equisetum/japonicum", "anthurium/papillilaminum-dark-phoenix", "anthurium/forgetii-dark-form-silver-blush"]);
const synonymRoutes = new Set(["asparagus/plumosus", "epiphyllum/anguliger", "sansevieria/trifasciata"]);
const genuinePhoto = m => !isEditorialPlaceholder(m.src) && m.license?.status === "verified" && !isInternalPhotoProductionCopy(`${m.alt} ${m.caption}`);
const wordCount = value => value.split(/\s+/).filter(Boolean).length;
const duplicates = (list, field) => Object.entries(Object.groupBy(list, field)).filter(([, items]) => items.length > 1).map(([value, entries]) => ({ value, entities: entries.map(plantEntityId) }));
const inventory = plants.map(p => {
  const id = plantEntityId(p);
  const parent = parentSpecies(plants, p);
  const photos = p.gallery.filter(genuinePhoto);
  const broken = photos.filter(m => m.src.startsWith("/") && !existsSync(new URL(`../public${m.src}`, import.meta.url)) && !existsSync(new URL(`../public${m.src.replace(/^\/media\//, "/")}`, import.meta.url)));
  const genusLinks = getPlantsByGenre(p.genre).some(e => plantEntityId(e) === id);
  const emptyCritical = ["origin", "habitat", "description", "care", "toxicity", "seo"].filter(k => !p[k] || (Array.isArray(p[k]) && !p[k].length));
  const genericPropagation = /dépend de l’espèce/.test(p.care.propagation);
  const genericSourceOnly = p.sources.every(s => /powo.science.kew.org\/(results|$)|aroid.org\/$/.test(s.url));
  const internalCopy = p.description.concat(p.tibaldoAdvice).filter(isInternalPhotoProductionCopy);
  const flags = [...emptyCritical.map(k => `MISSING_${k}`), ...(genericPropagation ? ["GENERIC_PROPAGATION"] : []), ...(genericSourceOnly ? ["SPECIFIC_SOURCE_NEEDED"] : []), ...(internalCopy.length ? ["FILTERED_INTERNAL_COPY_PRESENT_IN_SOURCE"] : []), ...(ambiguous.has(id) ? ["IDENTITY_EVIDENCE_REQUIRED"] : []), ...(broken.length ? ["BROKEN_MEDIA"] : [])];
  const content = emptyCritical.length ? "CONTENT_MISSING_CRITICAL_INFORMATION" : genericPropagation ? "CONTENT_THIN" : p.faq.length >= 4 && wordCount(p.description.join(" ")) >= 60 && !genericSourceOnly ? "CONTENT_COMPLETE" : "CONTENT_GOOD";
  const forms = /forme horticole|forme commerciale|nom commercial|nom horticole/.test(p.hybridization);
  const rank = p.taxonomy.species.match(/\b(var\.|subsp\.|f\.)\s+(\S+)/);
  return {
    ENCYCLOPEDIA_ENTITY_ID: id, CANONICAL_NAME: p.botanicalName, DISPLAY_NAME: p.displayName,
    GENUS: p.taxonomy.genus, NAVIGATION_GENUS: p.genre,
    SPECIES: /^(?:[A-Z][a-z]+)\s+(?:[a-z-]+)$/.test(p.taxonomy.species) ? p.taxonomy.species : null,
    SPECIES_SOURCE_VALUE: p.taxonomy.species, INFRASPECIFIC_RANK_IF_ANY: rank?.[0] ?? null,
    CULTIVAR_IF_ANY: p.taxonomy.cultivar, CULTIVAR_FORMAL_ACCEPTANCE: protectedNames.has(id) || forms ? "NOT_ASSERTED" : p.taxonomy.cultivar ? "SEE_SOURCE_RECORD" : "NOT_APPLICABLE",
    HORTICULTURAL_FORM_IF_ANY: forms ? p.displayName : null, COMMERCIAL_ALIASES: p.taxonomy.commonNames,
    SAFE_EXACT_ALIASES: identityNames(p), SYNONYMS_SOURCE: p.synonyms,
    SLUG: p.slug, PUBLIC_URL: `https://jungle.tibaldo.fr/plantes/${id}`,
    PARENT_ENTITY: parent ? plantEntityId(parent) : `genus:${p.genre}`,
    ENTITY_LEVEL: /×/.test(p.taxonomy.species) ? "HYBRID" : rank ? "INFRASPECIFIC" : p.taxonomy.cultivar ? "HORTICULTURAL_ENTITY" : forms ? "HORTICULTURAL_FORM" : "SPECIES",
    IDENTITY_STATUS: ambiguous.has(id) ? "AMBIGUOUS" : protectedNames.has(id) || forms ? "HORTICULTURAL_NAME" : p.taxonomy.cultivar ? "HORTICULTURAL_NAME" : "CANONICAL_CLEAR",
    IDENTITY_NOTE: synonymRoutes.has(id) ? "Historical URL preserved; displayed current botanical identity already differs from the familiar name." : p.hybridization,
    MEDIA_STATUS: broken.length ? "BROKEN" : photos.some(m => /TIBALDO/i.test(m.license.creator ?? "")) ? "OWNER_VALID" : photos.length ? "VALID_EXISTING" : "MISSING",
    MEDIA: photos.map(m => ({ src: m.src, alt: m.alt, source: m.license.sourceUrl, evidence: m.license.note })),
    PUBLICATION_STATUS: "CANDIDATE_SOURCE", INDEXABILITY_STATUS: "REQUIRES_RENDERED_CERTIFICATION",
    CONTENT_STATUS: content, CONTENT_ASSESSMENT_METHOD: "Structural triage plus recorded targeted factual review; not a claim that every sentence has been freshly peer-reviewed.",
    FIELD_COVERAGE: { family: Boolean(p.family), identity: Boolean(p.hybridization), origin: Boolean(p.origin), habitat: Boolean(p.habitat), habit: Boolean(p.growth.habit), adultSize: Boolean(p.growth.adultSize), light: Boolean(p.care.lightText), water: Boolean(p.care.watering), humidity: Boolean(p.care.humidityText), temperature: Boolean(p.care.temperature), substrate: Boolean(p.care.substrate), nutrition: Boolean(p.care.fertilizing), repotting: Boolean(p.care.repotting), propagation: Boolean(p.care.propagation), toxicity: Boolean(p.toxicity.details), problems: p.problems.length, faq: p.faq.length, related: p.comparisons.length },
    SOURCES: p.sources, SOURCE_REVIEW: "Existing source record retained; see targeted evidence report for live-checked sources", FLAGS: flags,
    GENUS_DISCOVERABLE_IN_SOURCE: genusLinks,
    RELATED_ENTITIES: p.comparisons.map(c => ({ name: c.name, ...comparisonTarget(plants, p, c) })),
    HISTORICAL_SLUGS: Object.entries(encyclopediaP1Redirects).filter(([, target]) => target === `/plantes/${id}`).map(([source]) => source),
    SEO: p.seo,
  };
});
const oldById = new Map(baseline.entries.map(p => [plantEntityId(p), p]));
const changed = plants.filter(p => oldById.has(plantEntityId(p)) && JSON.stringify(p) !== JSON.stringify(oldById.get(plantEntityId(p)))).map(plantEntityId);
const newIds = plants.filter(p => !oldById.has(plantEntityId(p))).map(plantEntityId);
const aliasOwners = new Map();
for (const p of plants) for (const a of identityNames(p)) aliasOwners.set(a, [...(aliasOwners.get(a) ?? []), plantEntityId(p)]);
const aliasCollisions = [...aliasOwners].filter(([, ids]) => ids.length > 1).map(([alias, entities]) => ({ alias, entities, action: "NO_AUTOMATIC_MATCH" }));
const sharedMedia = new Map();
for (const p of plants) for (const m of p.gallery.filter(genuinePhoto)) sharedMedia.set(m.src, [...(sharedMedia.get(m.src) ?? []), plantEntityId(p)]);
const duplicatedMedia = [...sharedMedia].filter(([, ids]) => new Set(ids).size > 1).map(([src, ids]) => ({ src, entities: [...new Set(ids)], action: "IDENTITY_REVIEW_REQUIRED" }));
const counts = key => Object.fromEntries([...new Set(inventory.map(p => p[key]))].map(value => [value, inventory.filter(p => p[key] === value).length]));
save("ENCYCLOPEDIA_CANONICAL_REGISTRY_V1", { authority: "lib/plants/catalog.ts; generated view, not a parallel mapping system", source_before: baseline.commit, count_before: baseline.entries.length, count_after: plants.length, entities: inventory });
save("ENCYCLOPEDIA_QUALITY_AUDIT_V1", { methodology: "Exhaustive structural inventory. Factual interventions are bounded to sources in evidence records. Unreviewed scientific claims are not falsely certified.", new_pages: newIds, changed_pages: changed, content: counts("CONTENT_STATUS"), identity: counts("IDENTITY_STATUS"), media: counts("MEDIA_STATUS"), duplicate_slugs: duplicates(plants, plantEntityId), duplicate_canonical_names: duplicates(plants, p => normalizeIdentity(p.botanicalName)), duplicate_titles: duplicates(plants, p => normalizeIdentity(p.seo.title)), duplicate_descriptions: duplicates(plants, p => normalizeIdentity(p.seo.description)), alias_collisions: aliasCollisions, duplicated_media: duplicatedMedia, genus_inventory: plantFamilies.map(g => ({ slug: g.slug, children: getPlantsByGenre(g.slug).map(plantEntityId), intro: g.description, hero_modified: false })), issues: inventory.filter(p => p.FLAGS.length).map(p => ({ id: p.ENCYCLOPEDIA_ENTITY_ID, flags: p.FLAGS })), media_backlog: inventory.filter(p => p.MEDIA_STATUS === "MISSING").map(p => ({ id: p.ENCYCLOPEDIA_ENTITY_ID, name: p.CANONICAL_NAME, evidence_needed: "Photo + exact plant name and rights. No stock mutation required." })) });
console.log(JSON.stringify({ before: baseline.entries.length, after: plants.length, new: newIds, changed: changed.length, content: counts("CONTENT_STATUS"), media: counts("MEDIA_STATUS"), aliasCollisions }, null, 2));
