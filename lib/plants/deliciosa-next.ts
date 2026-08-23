export const deliciosaNextQuickFacts = [
  { label: "Lumière", value: "4 sur 5", detail: "Vive · indirecte" },
  { label: "Arrosage", value: "2 sur 5", detail: "Après séchage partiel" },
  { label: "Humidité", value: "3 sur 5", detail: "Moyenne à élevée" },
  { label: "Difficulté", value: "2 sur 5", detail: "Accessible" },
  { label: "Toxicité", value: "Irritante", detail: "Si mastiquée ou ingérée" },
  { label: "Croissance", value: "Grimpante", detail: "Vigoureuse avec support" },
] as const;

export const deliciosaNextIdentity = {
  acceptedName: "Monstera deliciosa Liebm.",
  status: "Espèce acceptée",
  family: "Araceae",
  genus: "Monstera",
  order: "Alismatales",
  nativeRange: "Sud et est du Mexique jusqu’au Guatemala",
  habitat: "Liane des forêts tropicales humides",
  habit: "Grimpante · hémiepiphyte secondaire",
  synonyms: ["Monstera borsigiana", "Philodendron pertusum"],
} as const;

export const deliciosaNextFaq = [
  {
    question: "Où placer un Monstera deliciosa ?",
    answer:
      "Placez-le dans une lumière vive et indirecte. Un soleil doux peut être toléré après acclimatation, tandis qu’un soleil chaud derrière une vitre peut marquer le feuillage.",
  },
  {
    question: "Quand arroser un Monstera deliciosa ?",
    answer:
      "Arrosez lorsque la partie supérieure du mélange a séché, puis laissez toute l’eau excédentaire s’écouler. Vérifiez la motte plutôt que de suivre un calendrier fixe.",
  },
  {
    question: "Pourquoi les nouvelles feuilles n’ont-elles pas de trous ?",
    answer:
      "Les feuilles juvéniles sont souvent entières. Les découpes et perforations apparaissent avec le développement de la plante ; la lumière, la vigueur et la possibilité de grimper influencent sa morphologie sans garantir un nombre précis de fenestrations.",
  },
  {
    question: "À quoi servent les racines aériennes et faut-il les couper ?",
    answer:
      "Les racines aériennes participent à l’ancrage de cette liane grimpante. Elles peuvent être guidées vers un support ou le substrat ; évitez de les supprimer systématiquement et coupez seulement une partie gênante avec un outil propre.",
  },
  {
    question: "Quand rempoter et faut-il un pot percé ?",
    answer:
      "Rempotez lorsque les racines occupent réellement le contenant ou que le mélange sèche anormalement vite. Utilisez un pot percé seulement un peu plus grand afin que l’eau puisse s’évacuer.",
  },
  {
    question: "Monstera deliciosa est-il toxique pour les animaux et les enfants ?",
    answer:
      "Oui. Ses tissus contiennent des cristaux d’oxalate de calcium irritants en cas de mastication ou d’ingestion. Gardez la plante hors de portée des jeunes enfants et des animaux.",
  },
] as const;
export const deliciosaNextDiagnostics = [
  {
    title: "Feuilles jaunes",
    symptom: "Une ou plusieurs feuilles perdent progressivement leur vert.",
    causes:
      "Excès d’eau, froid, lumière insuffisante, racines en difficulté ou vieillissement naturel d’une feuille basse.",
    verify:
      "Touchez le mélange en profondeur, contrôlez l’évacuation de l’eau et observez si le jaunissement concerne une feuille ancienne ou plusieurs feuilles récentes.",
    action:
      "Laissez le mélange retrouver un séchage adapté et corrigez d’abord la lumière, la température ou le drainage identifiés. N’ajoutez pas d’engrais avant d’avoir compris la cause.",
  },
  {
    title: "Pointes ou plages brunes",
    symptom: "Les bords sèchent ou des zones brunes apparaissent sur le limbe.",
    causes:
      "Soleil trop chaud, arrosages irréguliers, accumulation de sels, air très sec ou dommage mécanique.",
    verify:
      "Reliez l’emplacement des marques à la fenêtre, vérifiez l’historique récent d’arrosage et recherchez une progression sur les nouvelles feuilles.",
    action:
      "Stabilisez les conditions, protégez la plante du soleil brûlant et rincez ponctuellement le mélange si une accumulation de sels est plausible.",
  },
  {
    title: "Croissance ralentie · feuilles peu fenêtrées",
    symptom: "Les nouvelles feuilles restent petites, entières ou espacées sur la tige.",
    causes:
      "Stade juvénile, lumière limitée, absence de support, saison peu lumineuse ou racines peu actives.",
    verify:
      "Comparez les dernières feuilles, la distance réelle à la fenêtre, la stabilité du support et l’état des racines avant de conclure à une carence.",
    action:
      "Améliorez progressivement la lumière et proposez un support stable. Laissez le temps à la plante de mûrir ; n’attendez pas une fenestration immédiate ou uniforme.",
  },
  {
    title: "Thrips ou acariens",
    symptom: "Marques argentées, points clairs, déformations ou très fines toiles apparaissent.",
    causes:
      "Présence possible de thrips, d’acariens ou d’un autre ravageur ; l’aspect seul ne suffit pas toujours à identifier l’organisme.",
    verify:
      "Isolez la plante puis inspectez le revers, les pétioles et les jeunes feuilles avec une lumière forte. Recherchez insectes, déjections, mues ou toiles.",
    action:
      "Nettoyez la plante, limitez la dispersion et demandez un avis adapté à l’organisme réellement observé. Répétez la surveillance plusieurs semaines.",
  },
] as const;

export const deliciosaNextSources = [
  {
    group: "Taxonomie",
    label: "Kew Science · Plants of the World Online",
    url: "https://powo.science.kew.org/taxon/87478-1",
  },
  {
    group: "Culture",
    label: "Royal Horticultural Society · Monstera deliciosa",
    url: "https://www.rhs.org.uk/plants/11192/monstera-deliciosa-f/details",
  },
  {
    group: "Horticulture · toxicité",
    label: "NC State Extension · Monstera deliciosa",
    url: "https://plants.ces.ncsu.edu/plants/monstera-deliciosa/",
  },
  {
    group: "Morphologie",
    label: "Missouri Botanical Garden · écologie des Araceae",
    url: "https://www.missouribotanicalgarden.org/Portals/0/staff/PDFs/croat/Ecology-LifeForms-Araceae-.pdf",
  },
] as const;
