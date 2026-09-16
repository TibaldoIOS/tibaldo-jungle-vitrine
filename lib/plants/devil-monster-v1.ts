import type { PlantEntry } from "./types";
import { deliciosaVariegata } from "./deliciosa-variegata-v2.ts";

const ownerMedia: PlantEntry["gallery"][number] = {
  src: "/media/owner-media/monstera-devil-monster/monstera-deliciosa-devil-monster-feuille-panachee.webp",
  alt: "Grande feuille fenêtrée de Monstera deliciosa ‘Devil Monster’, fortement marbrée de blanc crème et de vert.",
  caption: "Photo : TIBALDO",
  width: 1024,
  height: 1280,
  license: {
    status: "verified",
    creator: "TIBALDO",
    license: "Autorisation d’utilisation confirmée par l’Owner TIBALDO",
    sourceUrl: "owner-provided://tibaldo/photo-20260916-monstera-devil-monster-01/devil-monster",
    registryPath: "/credits-images",
    note: "Identité horticole fournie par Owner. Original et empreintes conservés dans docs/media-provenance/photo-20260916-monstera-devil-monster-01.json.",
  },
};

export const devilMonster: PlantEntry = {
  ...deliciosaVariegata,
  slug: "devil-monster",
  botanicalName: "Monstera deliciosa ‘Devil Monster’",
  displayName: "Devil Monster",
  listingName: "Devil Monster · Monstera deliciosa panachée",
  subtitle: "Une sélection horticole de Monstera deliciosa aux feuilles profondément découpées et fortement marbrées.",
  taxonomy: {
    ...deliciosaVariegata.taxonomy,
    cultivar: null,
    commonNames: ["Monstera Devil Monster", "Monstera deliciosa Devil Monster"],
  },
  origin: "Sélection horticole de Monstera deliciosa ; identité ‘Devil Monster’ confirmée par l’Owner, filiation de sélection non documentée ici.",
  habitat: "Sélection cultivée issue de Monstera deliciosa. Le cadre écologique reste celui d’une liane tropicale qui grimpe vers la lumière ; le nom horticole ne désigne pas une population sauvage.",
  hybridization: "Nom horticole conservé selon la provenance Owner. Cette fiche n’affirme ni statut formel de cultivar, ni origine clonale précise, ni mécanisme génétique au-delà de la panachure observée.",
  synonyms: ["Monstera ‘Devil Monster’", "Devil Monster Monstera"],
  description: [
    "Monstera deliciosa ‘Devil Monster’ est recherchée pour sa panachure claire très morcelée, mêlant éclaboussures, marbrures et plages crème sur un limbe vert.",
    "Sa morphologie demeure celle d’une Monstera deliciosa : la plante gagne en découpes et en fenestrations avec la maturité, une lumière suffisante et un support qu’elle peut coloniser.",
    "Le dessin d’une feuille ne prédit pas exactement les suivantes. Conservez l’étiquette et la provenance du sujet, et observez plusieurs pousses avant d’évaluer la stabilité ou l’équilibre de la panachure.",
  ],
  specimen: {
    observedHeight: "Dimensions variables selon l’âge et le support",
    note: "La photographie Owner documente une feuille adulte panachée ; elle ne constitue pas une promesse de motif identique sur chaque nouvelle feuille.",
  },
  growth: {
    adultSize: "Grande liane d’intérieur, souvent 2 à 3 m avec support dans de bonnes conditions",
    speed: "Variable, généralement plus lente lorsque la proportion de tissus clairs est élevée",
    habit: "Liane grimpante à racines aériennes",
  },
  care: {
    ...deliciosaVariegata.care,
    difficulty: 4,
    difficultyText: "Plante de collection qui demande une lumière vive, un support stable et une lecture attentive du séchage.",
  },
  comparisons: [
    { name: "Deliciosa Variegata", href: "/plantes/monstera/deliciosa-variegata", difference: "Une appellation générique pour une deliciosa panachée, sans attribution à la sélection ‘Devil Monster’." },
    { name: "Thai Constellation", href: "/plantes/monstera/thai-constellation", difference: "Une sélection nommée distincte ; son identité ne doit pas être déduite du seul aspect moucheté d’une feuille." },
    { name: "Mint", href: "/plantes/monstera/mint", difference: "Un nom horticole différent, associé à une panachure vert pâle ou mentholée ; les deux noms ne sont pas interchangeables." },
    { name: "Monstera deliciosa", href: "/plantes/monstera/deliciosa", difference: "L’espèce botanique verte qui constitue le cadre morphologique de cette sélection." },
  ],
  faq: [
    { question: "Devil Monster est-elle une espèce distincte ?", answer: "Non. La fiche la conserve comme une sélection horticole nommée de Monstera deliciosa, selon l’identité fournie par l’Owner." },
    { question: "Sa panachure sera-t-elle identique sur chaque feuille ?", answer: "Non. Le motif peut évoluer d’une pousse à l’autre ; une photographie ne garantit ni la quantité ni la répartition future des zones claires." },
    { question: "Quelle lumière lui donner ?", answer: "Une lumière très vive et filtrée, avec une acclimatation progressive. Les tissus clairs brûlent plus facilement et contribuent moins à la photosynthèse." },
    { question: "Faut-il un tuteur ?", answer: "Oui. Un support solide accompagne son port grimpant et favorise le développement de feuilles plus grandes et plus matures." },
    { question: "Comment l’arroser ?", answer: "Arrosez complètement après séchage partiel du mélange, puis laissez égoutter. Adaptez-vous au pot et à la saison plutôt qu’à un calendrier fixe." },
    { question: "Comment la multiplier ?", answer: "Par bouture de tige comportant un nœud et un point de croissance viable, ou par marcottage aérien, en conservant la traçabilité de la plante mère." },
  ],
  tibaldoAdvice: [
    "Conservez toujours l’étiquette et la provenance avec les boutures.",
    "Jugez l’équilibre de la panachure sur plusieurs feuilles successives.",
    "Installez le support tôt pour éviter d’endommager plus tard un système racinaire établi.",
  ],
  gallery: [ownerMedia],
  mediaNeeds: [],
  sources: [
    { label: "Kew Science — Monstera deliciosa", url: "https://powo.science.kew.org/results?q=Monstera%20deliciosa" },
    { label: "RHS — culture des Monstera", url: "https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants" },
  ],
  seo: {
    title: "Monstera Devil Monster : panachure et entretien",
    description: "Guide de Monstera deliciosa ‘Devil Monster’ : identité horticole, panachure, lumière, arrosage, support, bouturage et précautions.",
    keywords: ["Monstera Devil Monster", "Monstera deliciosa Devil Monster", "Monstera panachée", "Monstera rare Lille"],
  },
  publishedAt: "2026-09-16",
  updatedAt: "2026-09-16",
};

export function applyDevilMonsterContext(entries: PlantEntry[]): PlantEntry[] {
  if (entries.some((plant) => plant.genre === "monstera" && plant.slug === "devil-monster")) return entries;
  return [...entries, devilMonster];
}
