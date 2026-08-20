export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export type TranslatedLocale = Exclude<Locale, "fr">;

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const isTranslatedLocale = (value: string): value is TranslatedLocale => value === "en" || value === "es";

export const pilotPaths = [
  "/",
  "/plantes",
  "/plantes/cycas/revoluta",
  "/plantes/anthurium/clarinervium",
  "/plantes/monstera/thai-constellation",
  "/plantes/bananiers",
  "/conseils/arroser-plantes-interieur",
] as const;

export type PilotPath = (typeof pilotPaths)[number];
export const isPilotPath = (path: string): path is PilotPath => pilotPaths.includes(path as PilotPath);

import wave1Inventory from "./wave1-inventory.generated.json";
import wave2Inventory from "./wave2-inventory.generated.json";
import wave3Inventory from "./wave3-inventory.generated.json";
export const wave1Paths = wave1Inventory.paths.map(({ path }) => path);
export const wave2Paths = wave2Inventory.paths.map(({ path }) => path);
export const wave3Paths = wave3Inventory.paths.map(({ path }) => path);
export const multilingualPaths = Array.from(new Set([...pilotPaths, ...wave1Paths, ...wave2Paths, ...wave3Paths]));
export const isMultilingualPath = (path: string) => multilingualPaths.includes(path);

export function canonicalPath(path: string) {
  const clean = `/${path}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  const match = clean.match(/^\/(en|es)(\/.*)?$/);
  return match ? match[2] || "/" : clean;
}

export function localeFromPath(path: string): Locale {
  const match = path.match(/^\/(en|es)(?:\/|$)/);
  return match?.[1] === "en" || match?.[1] === "es" ? match[1] : "fr";
}

export function localizedPath(path: string, locale: Locale) {
  const canonical = canonicalPath(path);
  return locale === "fr" ? canonical : `/${locale}${canonical === "/" ? "" : canonical}`;
}

export const languageNames: Record<Locale, string> = { fr: "Français", en: "English", es: "Español" };
export const languageFlags: Record<Locale, string> = { fr: "🇫🇷", en: "🇬🇧", es: "🇪🇸" };
export const languageTags: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES" };
export const openGraphLocales: Record<Locale, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES" };
