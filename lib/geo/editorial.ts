export type GeoBrief = {
  answer: string;
  points: { label: string; value: string }[];
};

export const geoRevisionDate = "2026-08-21";

export const geoTierOneBriefs: Record<string, GeoBrief> = {
  "plantes/cycas/revoluta": {
    answer: "Cycas revoluta demande beaucoup de lumière, un substrat très drainant et des arrosages espacés. Il peut tolérer un froid bref une fois acclimaté, mais une culture en pot à Lille reste vulnérable au gel humide.",
    points: [
      { label: "Lumière", value: "Très vive, soleil progressif" },
      { label: "Arrosage", value: "Copieux puis séchage marqué" },
      { label: "Point de vigilance", value: "Toxique par ingestion" },
    ],
  },
  "plantes/dicksonia/antarctica": {
    answer: "Dicksonia antarctica est une fougère arborescente d’ombre claire qui demande un sol frais, une atmosphère humide et un abri contre le vent. À Lille, la couronne et le pot doivent être protégés avec prudence en hiver.",
    points: [
      { label: "Lumière", value: "Ombre claire à mi-ombre" },
      { label: "Arrosage", value: "Humidité régulière sans stagnation froide" },
      { label: "Hiver", value: "Protection respirante de la couronne" },
    ],
  },
  "plantes/strelitzia/nicolai": {
    answer: "Strelitzia nicolai est un grand oiseau de paradis blanc adapté aux intérieurs très lumineux et spacieux. Il se distingue difficilement de S. alba sur une seule feuille : l’architecture adulte, l’inflorescence et la provenance doivent être croisées.",
    points: [
      { label: "Port", value: "Grande touffe arborescente" },
      { label: "Floraison", value: "Blanche et bleu sombre" },
      { label: "Intérieur", value: "Très lumineux, grand volume" },
    ],
  },
  "plantes/strelitzia/alba": {
    answer: "Strelitzia alba est une espèce arborescente à floraison blanche. Kew place Strelitzia augusta dans sa synonymie, mais une étiquette commerciale « Augusta » ne suffit pas à identifier un spécimen comme S. alba.",
    points: [
      { label: "Nom accepté", value: "Strelitzia alba" },
      { label: "Synonyme", value: "Strelitzia augusta" },
      { label: "Identification", value: "Plusieurs caractères adultes nécessaires" },
    ],
  },
  "plantes/musa/basjoo": {
    answer: "Musa basjoo est le bananier du cluster Jungle le plus adapté à la pleine terre, mais sa rusticité doit être nuancée : feuilles, pseudo-tronc et partie souterraine ne résistent pas de la même façon au froid.",
    points: [
      { label: "Usage", value: "Pleine terre ou grand pot" },
      { label: "Croissance", value: "Rapide en saison chaude" },
      { label: "Hiver", value: "Souche protégée et sol drainé" },
    ],
  },
  "plantes/ensete/ventricosum-maurelii": {
    answer: "Ensete ventricosum ‘Maurelii’ est un bananier d’Abyssinie ornemental, massif et sensible au gel. Contrairement à de nombreux Musa, il reste normalement solitaire et ne produit pas spontanément une colonie de rejets.",
    points: [
      { label: "Genre", value: "Ensete, pas Musa" },
      { label: "Usage", value: "Pot ou extérieur saisonnier" },
      { label: "Hiver", value: "Rentrée lumineuse hors gel" },
    ],
  },
  "plantes/agave/americana-variegata": {
    answer: "Agave americana ‘Variegata’ est un cultivar panaché en rosette qui exige soleil progressif et drainage strict. Dans le Nord, l’humidité hivernale et le froid combinés rendent la culture en pot abrité plus sûre.",
    points: [
      { label: "Identité", value: "Cultivar horticole de A. americana" },
      { label: "Eau", value: "Faible, surtout en hiver" },
      { label: "Précaution", value: "Épines et sève irritante" },
    ],
  },
};

export const getGeoBrief = (genre: string, slug: string) => geoTierOneBriefs[`plantes/${genre}/${slug}`];
export const getGeoDates = (genre: string, slug: string, publishedAt: string, updatedAt: string) => ({
  publishedAt,
  updatedAt: getGeoBrief(genre, slug) ? geoRevisionDate : updatedAt,
});
