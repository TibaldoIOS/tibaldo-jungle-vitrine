import inventory from "./wave3-inventory.generated.json";
import translations from "./wave3-translations.generated.json";
import { substrates, substrateProfiles, type SubstrateProfile } from "@/app/substrats/data";
import type { TranslatedLocale } from "./config";

type Dictionaries = Record<TranslatedLocale, Record<string, string>>;
const dictionaries = translations as Dictionaries;
const protectedKeys = new Set(["slug", "number", "tone", "image", "status"]);

export const wave3Entries = inventory.paths;
export const wave3Paths = wave3Entries.map(({ path }) => path);
export const isWave3Path = (path: string) => wave3Paths.includes(path);
export const translateWave3 = (source: string, locale: TranslatedLocale) => dictionaries[locale][source] ?? source;

function localizeValue<T>(value: T, locale: TranslatedLocale, key = ""): T {
  if (typeof value === "string") return (protectedKeys.has(key) ? value : translateWave3(value, locale)) as T;
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, locale, key)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [childKey, localizeValue(child, locale, childKey)])) as T;
  return value;
}

export const getWave3Substrates = (locale: TranslatedLocale) => substrates.map((item) => localizeValue(item, locale));
export const getWave3Profile = (path: string, locale: TranslatedLocale) => {
  const match = path.match(/^\/substrats\/([^/]+)$/);
  const profile = match ? substrateProfiles[match[1]] : undefined;
  return profile ? localizeValue<SubstrateProfile>(profile, locale) : undefined;
};

export const wave3SourceUi = {
  hubTitle: "La matière juste, pour des racines vivantes.",
  hubDescription: "Comprendre terreau, perlite, sphaigne, écorce et zéolite pour composer un substrat adapté à chaque plante d’intérieur.",
  hubIntro: "Terreau, écorces, fibres et minéraux : composez un mélange adapté à votre plante, dans la quantité réellement nécessaire.",
  manifestoTitle: "Tout commence sous la surface.",
  manifestoOne: "Une plante peut avoir la bonne lumière et le bon arrosage, mais peiner si ses racines manquent d’air. Chez Tibaldo Jungle, le substrat se pense comme un milieu vivant : il doit soutenir, respirer, drainer et garder juste ce qu’il faut d’humidité.",
  manifestoTwo: "Au Studio Végétal de Lille, chaque composant est disponible en vrac. Vous repartez avec le volume utile, une lecture simple de ses propriétés et, si vous le souhaitez, une recette ajustée à votre plante.",
  collectionTitle: "Neuf composants. Une infinité d’équilibres.",
  collectionIntro: "Chaque matière joue un rôle précis. Découvrez son toucher, son comportement et les plantes auxquelles elle convient.",
  mixTitle: "Pas de recette universelle.",
  mixCopy: "Un Anthurium n’attend pas la même chose qu’une Calathea. La taille du pot, votre manière d’arroser et la lumière changent aussi l’équilibre. Apportez une photo, votre plante ou simplement vos questions : nous vous aiderons à composer un mélange cohérent.",
};

const uiTranslations = {
  en: { hubEyebrow: "Growing media · Lille", explore: "Explore the components", component: "Component", benefits: "Benefits", uses: "Uses", plants: "Which plants?", availability: "Availability", discover: "Read the complete guide", role: "Its role in the pot", strengths: "What it contributes", methods: "How to use", suitable: "Which plants?", cautions: "Keep in mind", faq: "Frequently asked questions", all: "Explore the growing-media library", breadcrumbHome: "Home", breadcrumbHub: "Growing media", guide: "Understand this component" },
  es: { hubEyebrow: "Sustratos · Lille", explore: "Explorar los componentes", component: "Componente", benefits: "Ventajas", uses: "Usos", plants: "¿Para qué plantas?", availability: "Disponibilidad", discover: "Leer la guía completa", role: "Su función en la maceta", strengths: "Qué aporta", methods: "Cómo utilizarlo", suitable: "¿Para qué plantas?", cautions: "A tener en cuenta", faq: "Preguntas frecuentes", all: "Explorar la biblioteca de sustratos", breadcrumbHome: "Inicio", breadcrumbHub: "Sustratos", guide: "Comprender este componente" },
} as const;

export const getWave3Ui = (locale: TranslatedLocale) => {
  const localizedSource = Object.fromEntries(Object.entries(wave3SourceUi).map(([key, value]) => [key, translateWave3(value, locale)])) as Record<keyof typeof wave3SourceUi, string>;
  return { ...uiTranslations[locale], ...localizedSource };
};
