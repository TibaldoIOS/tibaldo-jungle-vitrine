import type { PlantEntry } from "./types";

export const plantEntityId = (plant: Pick<PlantEntry, "genre" | "slug">) => `${plant.genre}/${plant.slug}`;
export const normalizeIdentity = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

// Explicit editorial aliases only. A substring is never proof of cultivar identity.
// Generic common names are intentionally excluded from automatic matching.
export function identityNames(plant: PlantEntry): string[] {
  return [...new Set([plant.botanicalName, plant.displayName, `${plant.taxonomy.genus} ${plant.displayName}`, plant.listingName ?? "", ...plant.synonyms.filter(n => !/mal appliqu|souvent confondu|hort\.|historique\)/i.test(n))].map(normalizeIdentity).filter(Boolean))];
}

export function exactIdentityMatches(entries: PlantEntry[], name: string): PlantEntry[] {
  const normalized = normalizeIdentity(name);
  return entries.filter(p => identityNames(p).includes(normalized));
}

export function comparisonTarget(entries: PlantEntry[], plant: PlantEntry, comparison: PlantEntry["comparisons"][number]) {
  const self = `/plantes/${plantEntityId(plant)}`;
  if (comparison.href && comparison.href !== self && entries.some(p => `/plantes/${plantEntityId(p)}` === comparison.href)) {
    return { href: comparison.href, exact: true };
  }
  const matches = exactIdentityMatches(entries, comparison.name).filter(p => plantEntityId(p) !== plantEntityId(plant));
  if (matches.length === 1) return { href: `/plantes/${plantEntityId(matches[0])}`, exact: true };
  // A genus destination is visibly labelled as exploration, never as an exact comparison.
  const firstWord = normalizeIdentity(comparison.name).split(" ")[0];
  const genus = entries.find(p => normalizeIdentity(p.taxonomy.genus) === firstWord)?.genre ?? plant.genre;
  return { href: `/plantes/${genus}`, exact: false };
}

export function parentSpecies(entries: PlantEntry[], plant: PlantEntry): PlantEntry | undefined {
  const species = normalizeIdentity(plant.taxonomy.species);
  if (!species || /non|hybride|cultivar|sp /i.test(species)) return undefined;
  return entries.find(p => plantEntityId(p) !== plantEntityId(plant) && !p.taxonomy.cultivar && normalizeIdentity(p.botanicalName) === species);
}
