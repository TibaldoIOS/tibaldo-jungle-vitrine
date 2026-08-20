import inventory from "./wave2-inventory.generated.json";
import translations from "./wave2-translations.generated.json";
import { guides, getGuide } from "@/lib/guides/catalog";
import type { TranslatedLocale } from "./config";

type Dictionaries = Record<TranslatedLocale, Record<string, string>>;
const dictionaries = translations as Dictionaries;

export const wave2Entries = inventory.paths;
export const wave2Paths = wave2Entries.map(({ path }) => path);
export const isWave2Path = (path: string) => wave2Paths.includes(path);
export const wave2KindOf = (path: string) => wave2Entries.find((entry) => entry.path === path)?.kind;
export const translateWave2 = (source: string, locale: TranslatedLocale) => dictionaries[locale][source] ?? source;

export function getWave2Guide(path: string, locale: TranslatedLocale) {
  const match = path.match(/^\/conseils\/([^/]+)$/);
  if (!match) return undefined;
  const source = getGuide(match[1]);
  if (!source) return undefined;
  return {
    ...source,
    title: translateWave2(source.title, locale),
    eyebrow: translateWave2(source.eyebrow, locale),
    category: translateWave2(source.category, locale),
    readingTime: translateWave2(source.readingTime, locale),
    intro: translateWave2(source.intro, locale),
    sections: source.sections.map(([title, copy]) => [translateWave2(title, locale), translateWave2(copy, locale)] as const),
  };
}

export const getWave2Guides = (locale: TranslatedLocale) => guides.map((guide) => getWave2Guide(`/conseils/${guide.slug}`, locale)!);

export const wave2Ui = {
  en: {
    hubTitle: "Houseplant advice and growing guides",
    hubDescription: "Practical Tibaldo Jungle guides to help you choose, water, feed, repot and care for houseplants.",
    hubEyebrow: "Tibaldo Jungle advice",
    hubIntro: "A practical library for choosing, growing and caring for houseplants, based on observation rather than fixed recipes.",
    library: "Guide library",
    guide: "Practical guide",
    contents: "In this guide",
    related: "Explore all guides",
    read: "Read the guide",
    breadcrumbs: ["Home", "Advice"],
  },
  es: {
    hubTitle: "Consejos y guías para plantas de interior",
    hubDescription: "Guías prácticas de Tibaldo Jungle para elegir, regar, abonar, trasplantar y cuidar plantas de interior.",
    hubEyebrow: "Consejos Tibaldo Jungle",
    hubIntro: "Una biblioteca práctica para elegir, cultivar y cuidar plantas de interior, basada en la observación y no en recetas fijas.",
    library: "Biblioteca de guías",
    guide: "Guía práctica",
    contents: "En esta guía",
    related: "Explorar todas las guías",
    read: "Leer la guía",
    breadcrumbs: ["Inicio", "Consejos"],
  },
} as const;
