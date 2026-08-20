import inventory from "./wave1-inventory.generated.json";
import translations from "./wave1-translations.generated.json";
import { plants } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { familyEditorials } from "@/lib/plants/family-editorials";
import type { PlantEntry } from "@/lib/plants/types";
import type { TranslatedLocale } from "./config";

export type Wave1Kind = "hub" | "group" | "genre" | "family" | "identity";
export type Wave1Path = (typeof inventory.paths)[number]["path"];
export const wave1Entries = inventory.paths as { path: string; kind: Wave1Kind }[];
export const wave1Paths = wave1Entries.map(({ path }) => path);
export const isWave1Path = (path: string) => wave1Paths.includes(path);
export const wave1KindOf = (path: string) => wave1Entries.find((entry) => entry.path === path)?.kind;

type Dictionaries = Record<TranslatedLocale, Record<string, string>>;
const dictionaries = translations as Dictionaries;
const protectedKeys = new Set(["slug", "genre", "botanicalName", "displayName", "listingName", "name", "family", "order", "genus", "species", "cultivar", "url", "src", "shopUrl", "publishedAt", "updatedAt"]);
const protectedArrays = new Set(["synonyms"]);

export const translateString = (source: string, locale: TranslatedLocale) => dictionaries[locale][source] ?? source;

export function localizeValue<T>(value: T, locale: TranslatedLocale, key = ""): T {
  if (typeof value === "string") return (protectedKeys.has(key) ? value : translateString(value, locale)) as T;
  if (Array.isArray(value)) {
    if (protectedArrays.has(key)) return value;
    return value.map((item) => localizeValue(item, locale, key)) as T;
  }
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [childKey, localizeValue(child, locale, childKey)])) as T;
  return value;
}

export const getWave1Plant = (path: string, locale: TranslatedLocale) => {
  const [, root, genre, slug] = path.split("/");
  if (root !== "plantes" || !genre || !slug || genre === "famille") return undefined;
  const plant = plants.find((entry) => entry.genre === genre && entry.slug === slug);
  return plant ? localizeValue<PlantEntry>(plant, locale) : undefined;
};

export const getWave1Genre = (path: string, locale: TranslatedLocale) => {
  const [, root, genre, extra] = path.split("/");
  if (root !== "plantes" || !genre || extra || genre === "bananiers") return undefined;
  const guide = familyGuides[genre as keyof typeof familyGuides];
  if (!guide) return undefined;
  const editorials = familyEditorials[genre as keyof typeof familyEditorials] ?? [];
  const localizedGuide = localizeValue(guide, locale);
  return {
    genre,
    guide: { ...localizedGuide, name: translateString(guide.name, locale) },
    editorials: localizeValue(editorials, locale),
    plants: plants.filter((plant) => plant.genre === genre).map((plant) => localizeValue<PlantEntry>(plant, locale)),
  };
};

export const getWave1Family = (path: string, locale: TranslatedLocale) => {
  const match = path.match(/^\/plantes\/famille\/([^/]+)$/);
  if (!match) return undefined;
  const family = plants.find((plant) => plant.taxonomy.family.toLowerCase() === match[1])?.taxonomy.family;
  if (!family) return undefined;
  return { family, plants: plants.filter((plant) => plant.taxonomy.family === family).map((plant) => localizeValue<PlantEntry>(plant, locale)) };
};
