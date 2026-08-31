import type { PlantEntry, PlantMediaLicense } from "./types";

type CarePreset = "aroid-climber" | "aroid-terrestrial" | "soft-foliage" | "fern" | "epiphytic-cactus";

type ExpansionSpecies = {
  slug: string;
  genre: string;
  genreLabel: string;
  botanicalName: string;
  displayName: string;
  subtitle: string;
  family: string;
  order: string;
  botanicalGenus: string;
  species: string;
  commonNames: string[];
  synonyms?: string[];
  origin: string;
  regions: string[];
  habitat: string;
  description: [string, string];
  signature: string;
  adultSize: string;
  adultSizeCm: number;
  habit: PlantEntry["filters"]["habits"];
  growthRate: PlantEntry["filters"]["growthRate"];
  preset: CarePreset;
  sourceUrl: string;
  sourceLabel?: string;
  image?: keyof typeof verifiedMedia;
};

const publishedAt = "2026-08-31";

const license = (data: Omit<PlantMediaLicense, "status">): PlantMediaLicense => ({ status: "verified", ...data });

const verifiedMedia = {
  "peperomia-argyraea": {
    src: "/peperomia-argyreia-feuillage.jpg", width: 1280, height: 720,
    creator: "Mokkie", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Watermelon_Peperomia_(Peperomia_argyreia).jpg",
  },
  "epipremnum-aureum": {
    src: "/epipremnum-aureum-pothos.jpg", width: 1280, height: 1707,
    creator: "Filo gèn’", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Golden_pothos).jpg",
  },
  "philodendron-hastatum": {
    src: "/philodendron-hastatum-feuillage.jpg", width: 1280, height: 853,
    creator: "Krzysztof Ziarnek, Kenraiz", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_hastatum_kz2.jpg",
  },
  "goeppertia-orbifolia": {
    src: "/goeppertia-orbifolia.webp", width: 1920, height: 1311,
    creator: "Krzysztof Ziarnek, Kenraiz", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Calathea_orbifolia_kz1.jpg",
  },
  "schlumbergera-truncata": {
    src: "/schlumbergera-truncata.webp", width: 1920, height: 1404,
    creator: "Krzysztof Ziarnek, Kenraiz", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Schlumbergera_truncata_kz01.jpg",
  },
  "nephrolepis-exaltata": {
    src: "/nephrolepis-exaltata.webp", width: 1200, height: 1600,
    creator: "Nathaly 1106", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Helecho_de_Boston_(Nephrolepis_exaltata).jpg",
  },
  "philodendron-verrucosum": {
    src: "/philodendron-verrucosum.webp", width: 1920, height: 2560,
    creator: "Chhe", license: "Domaine public", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PhilodendronVerrucosum.jpg",
  },
  "philodendron-squamiferum": {
    src: "/philodendron-squamiferum.webp", width: 1920, height: 2926,
    creator: "Krzysztof Ziarnek, Kenraiz", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_squamiferum_kz1.jpg",
  },
  "philodendron-brandtianum": {
    src: "/philodendron-brandtianum.webp", width: 1152, height: 2048,
    creator: "Martha Lucia Ortiz Moreno", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_brandtianum_in_Colombia.jpg",
  },
  "philodendron-erubescens": {
    src: "/philodendron-erubescens.webp", width: 1920, height: 1440,
    creator: "Filo gèn’", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_erubescens_(angiospermes).jpg",
  },
  "monstera-acuminata": {
    src: "/monstera-acuminata.webp", width: 1536, height: 2048,
    creator: "Annika Lindqvist", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Monstera_acuminata_in_Belize.jpg",
  },
  "monstera-spruceana": {
    src: "/monstera-spruceana.webp", width: 1536, height: 2048,
    creator: "Vincent A. Vos", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Monstera_spruceana_in_Bolivia.jpg",
  },
  "anthurium-pedatoradiatum": {
    src: "/anthurium-pedatoradiatum.webp", width: 1920, height: 1440,
    creator: "Consultaplantas", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Anthurium_pedato-radiatum.JPG",
  },
  "anthurium-radicans": {
    src: "/anthurium-radicans.webp", width: 716, height: 955,
    creator: "Aureonatal", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Anthurium_radicans.jpg",
  },
  "alocasia-portei": {
    src: "/alocasia-portei.webp", width: 1920, height: 2180,
    creator: "Obsidian Soul", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alocasia_portei_(Philippines).jpg",
  },
  "pilea-involucrata": {
    src: "/pilea-involucrata.webp", width: 1920, height: 1584,
    creator: "Diego Delso", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pilea_involucrata,_Jardín_Botánico,_Múnich,_Alemania_2012-04-21,_DD_02.jpg",
  },
} as const;

const careByPreset: Record<CarePreset, Pick<PlantEntry, "care" | "filters">> = {
  "aroid-climber": {
    filters: { temperatureMin: 16, temperatureIdeal: [18, 27], humidityIdeal: [50, 75], light: "vive", watering: "modéré", substrateTags: ["aroïdes", "aéré", "drainant"], growthRate: "moyenne", habits: ["grimpant"], adultSizeCm: 180, needsSupport: true, variegated: false, collection: true, flowering: true, petToxic: true, humanToxic: true, regions: [] },
    care: { light: 4, water: 3, humidity: 4, difficulty: 3, lightText: "Lumière vive indirecte, avec acclimatation avant tout soleil doux.", watering: "Arroser lorsque la surface commence à sécher, puis laisser l’excédent s’évacuer.", humidityText: "Une humidité moyenne à élevée soutient le feuillage, sans remplacer l’aération.", temperature: "Ambiance chaude et stable, idéalement autour de 18 à 27 °C ; éviter le froid prolongé.", substrate: "Mélange structuré pour aroïdes, associant matière organique, écorce et fraction minérale poreuse.", repotting: "Rempoter dans un pot percé seulement lorsque les racines occupent réellement le volume.", fertilizing: "Fertilisation équilibrée et diluée pendant la croissance active.", propagation: "Bouture de tige comportant au moins un nœud viable, ou division selon le port." },
  },
  "aroid-terrestrial": {
    filters: { temperatureMin: 16, temperatureIdeal: [18, 28], humidityIdeal: [55, 80], light: "vive", watering: "régulier", substrateTags: ["aroïdes", "aéré", "drainant"], growthRate: "moyenne", habits: ["terrestre", "dressé"], adultSizeCm: 120, needsSupport: false, variegated: false, collection: true, flowering: true, petToxic: true, humanToxic: true, regions: [] },
    care: { light: 4, water: 3, humidity: 4, difficulty: 3, lightText: "Lumière vive filtrée ; éviter un soleil chaud sans acclimatation.", watering: "Maintenir un rythme régulier tout en laissant respirer les premiers centimètres du mélange.", humidityText: "Humidité moyenne à élevée, avec circulation d’air et racines oxygénées.", temperature: "Conserver une chaleur stable, idéalement 18 à 28 °C, loin des courants d’air froids.", substrate: "Mélange grossier, organique et minéral, qui retient un peu d’eau sans rester saturé.", repotting: "Choisir un pot percé et seulement légèrement plus grand que la motte.", fertilizing: "Engrais équilibré dilué pendant la période de croissance.", propagation: "Division de rejets, de rhizome ou de cormes suffisamment enracinés selon le genre." },
  },
  "soft-foliage": {
    filters: { temperatureMin: 14, temperatureIdeal: [18, 26], humidityIdeal: [45, 70], light: "moyenne", watering: "modéré", substrateTags: ["aéré", "organique", "drainant"], growthRate: "moyenne", habits: ["terrestre"], adultSizeCm: 60, needsSupport: false, variegated: false, collection: false, flowering: true, petToxic: false, humanToxic: false, regions: [] },
    care: { light: 3, water: 3, humidity: 3, difficulty: 2, lightText: "Lumière indirecte moyenne à vive, sans soleil brûlant.", watering: "Arroser après un léger séchage en surface et vider systématiquement l’eau résiduelle.", humidityText: "Une humidité intérieure modérée suffit si les arrosages restent réguliers.", temperature: "Température intérieure stable, idéalement autour de 18 à 26 °C.", substrate: "Mélange fin mais aéré, drainant et organique, dans un contenant percé.", repotting: "Rempoter sans surdimensionner lorsque les racines occupent le pot.", fertilizing: "Apport doux et espacé durant la croissance active.", propagation: "Boutures de tige ou division selon l’architecture de la plante." },
  },
  fern: {
    filters: { temperatureMin: 12, temperatureIdeal: [16, 25], humidityIdeal: [50, 75], light: "moyenne", watering: "régulier", substrateTags: ["humifère", "aéré", "drainant"], growthRate: "rapide", habits: ["terrestre", "retombant"], adultSizeCm: 90, needsSupport: false, variegated: false, collection: false, flowering: false, petToxic: false, humanToxic: false, regions: [] },
    care: { light: 3, water: 4, humidity: 4, difficulty: 2, lightText: "Lumière indirecte moyenne à vive ; protéger des rayons chauds.", watering: "Conserver le mélange souplement humide sans eau stagnante ni dessèchement prolongé.", humidityText: "Une humidité régulière limite le dessèchement des frondes.", temperature: "Ambiance tempérée, idéalement autour de 16 à 25 °C.", substrate: "Mélange humifère, fin et respirant, dans un pot bien drainé.", repotting: "Diviser ou rempoter lorsque la touffe remplit le contenant.", fertilizing: "Engrais très dilué pendant la pousse des nouvelles frondes.", propagation: "Division de touffes ou de stolons suffisamment enracinés." },
  },
  "epiphytic-cactus": {
    filters: { temperatureMin: 10, temperatureIdeal: [15, 24], humidityIdeal: [40, 65], light: "vive", watering: "modéré", substrateTags: ["épiphyte", "aéré", "drainant"], growthRate: "moyenne", habits: ["épiphyte", "retombant"], adultSizeCm: 45, needsSupport: false, variegated: false, collection: false, flowering: true, petToxic: false, humanToxic: false, regions: [] },
    care: { light: 4, water: 2, humidity: 3, difficulty: 2, lightText: "Lumière vive indirecte ; un soleil doux favorise la floraison après acclimatation.", watering: "Arroser après séchage partiel, plus parcimonieusement pendant la phase de repos.", humidityText: "Une humidité intérieure modérée convient avec une bonne ventilation.", temperature: "Croissance tempérée ; une période plus fraîche et sèche contribue à l’induction florale.", substrate: "Mélange très aéré de cactus épiphyte, plus organique qu’un substrat désertique.", repotting: "Rempoter après floraison lorsque le pot devient réellement étroit.", fertilizing: "Apport faible en période de croissance, interrompu pendant le repos.", propagation: "Boutures de segments laissées à cicatriser brièvement avant plantation." },
  },
};

const safeToxicity: PlantEntry["toxicity"] = {
  level: "prudence",
  summary: "Aucune plante décorative ne doit être considérée comme comestible.",
  details: "Cette fiche ne remplace pas l’avis d’un centre antipoison ou d’un vétérinaire en cas d’ingestion.",
};

const aroidToxicity: PlantEntry["toxicity"] = {
  level: "toxique",
  summary: "À tenir hors de portée des enfants et des animaux.",
  details: "Comme les autres Araceae, les tissus contiennent des cristaux insolubles d’oxalate de calcium irritants par mastication ou ingestion.",
};

const toPlant = (draft: ExpansionSpecies): PlantEntry => {
  const preset = careByPreset[draft.preset];
  const media = draft.image ? verifiedMedia[draft.image] : undefined;
  const gallery: PlantEntry["gallery"] = media ? [{
    src: media.src,
    alt: `Photographie documentaire de ${draft.botanicalName}`,
    caption: `${draft.botanicalName} — photographie sous licence ${media.license}.`,
    width: media.width,
    height: media.height,
    license: license({ creator: media.creator, license: media.license, licenseUrl: media.licenseUrl, sourceUrl: media.sourceUrl, registryPath: "reports/media-registry-v1.json", note: "Source, auteur, licence et identité taxonomique contrôlés le 31 août 2026." }),
  }] : [{
    src: "/photo-reelle-a-venir.svg",
    alt: `Emplacement documentaire réservé à ${draft.botanicalName}`,
    caption: "Média absent : aucune photographie incertaine n’est substituée au taxon.",
    width: 1200,
    height: 1500,
    license: { status: "media-gap", note: "Photographie exacte et réutilisable encore à documenter." },
  }];

  return {
    slug: draft.slug, genre: draft.genre, genreLabel: draft.genreLabel, botanicalName: draft.botanicalName,
    displayName: draft.displayName, subtitle: draft.subtitle, family: draft.family,
    taxonomy: { order: draft.order, family: draft.family, genus: draft.botanicalGenus, species: draft.species, cultivar: null, commonNames: draft.commonNames },
    filters: { ...preset.filters, adultSizeCm: draft.adultSizeCm, habits: draft.habit, growthRate: draft.growthRate, needsSupport: draft.habit.includes("grimpant"), regions: draft.regions },
    origin: draft.origin, habitat: draft.habitat,
    hybridization: "Espèce botanique acceptée ; aucun statut de cultivar ou d’hybride n’est revendiqué.",
    synonyms: draft.synonyms ?? [], description: draft.description,
    specimen: { observedHeight: draft.adultSize, note: "Ordre de grandeur horticole : la taille dépend de la maturité et des conditions, sans mesure d’un spécimen Tibaldo revendiquée." },
    growth: { adultSize: draft.adultSize, speed: draft.growthRate === "rapide" ? "Rapide en période active" : draft.growthRate === "lente" ? "Lente à modérée" : "Modérée en période active", habit: draft.signature },
    care: preset.care,
    toxicity: draft.family === "Araceae" ? aroidToxicity : safeToxicity,
    problems: [
      { title: "Feuillage qui jaunit", cause: "Excès d’eau, lumière inadéquate, froid ou renouvellement naturel.", advice: "Contrôler d’abord les racines, la lumière et le rythme de séchage avant de modifier les soins." },
      { title: "Bords secs", cause: "Arrosages irréguliers, air très sec ou accumulation de sels.", advice: "Stabiliser l’arrosage, éloigner du chauffage et rincer ponctuellement le mélange." },
      { title: "Croissance faible", cause: "Lumière insuffisante, saison froide ou racines peu actives.", advice: "Rapprocher progressivement de la lumière et attendre une reprise réelle avant de fertiliser." },
      { title: "Parasites", cause: "Acariens, thrips ou cochenilles peuvent coloniser les jeunes tissus.", advice: "Isoler, identifier précisément le parasite et répéter une intervention adaptée." },
    ],
    comparisons: [
      { name: `Autres ${draft.genreLabel}`, difference: `La combinaison « ${draft.signature.toLowerCase()} » aide à distinguer ${draft.displayName}.` },
      { name: "Nom commercial approximatif", difference: `Toujours vérifier le nom ${draft.botanicalName} plutôt que l’aspect seul.` },
    ],
    faq: [
      { question: `Comment reconnaître ${draft.botanicalName} ?`, answer: `${draft.signature}. L’origine et l’architecture générale complètent l’identification.` },
      { question: `Quelle lumière convient à ${draft.displayName} ?`, answer: preset.care.lightText },
      { question: "À quelle fréquence faut-il arroser ?", answer: "Il n’existe pas de calendrier universel : observez le séchage, le poids du pot et l’activité de la plante." },
      { question: "Quel substrat utiliser ?", answer: preset.care.substrate },
      { question: "Faut-il rempoter immédiatement ?", answer: "Non. Rempotez lorsque les racines et le rythme de séchage le justifient, dans un pot percé et ajusté." },
    ],
    tibaldoAdvice: ["Lisez le poids du pot plutôt qu’un calendrier.", "Adaptez progressivement la lumière pour éviter les brûlures.", "Une racine oxygénée est plus utile qu’un mélange constamment mouillé."],
    localSpotlight: { title: "Cultiver à Lille", text: "En hiver, rapprochez la plante de la lumière tout en protégeant son pot du vitrage froid et des radiateurs." },
    editorialSections: [
      { id: "identifier", eyebrow: "Reconnaître", title: draft.signature, paragraphs: [draft.description[0]], points: [draft.botanicalName, draft.origin, draft.adultSize] },
      { id: "habitat", eyebrow: "Comprendre", title: "Lire son milieu d’origine", paragraphs: [draft.habitat] },
      { id: "cultiver", eyebrow: "Cultiver", title: "Lumière, eau, respiration", paragraphs: [draft.description[1]] },
    ],
    mediaNeeds: media ? [{ role: "Vue complémentaire", description: `Une seconde vue indépendante de ${draft.botanicalName} enrichirait le Photo Book sans être nécessaire à la publication.` }] : [{ role: "Portrait botanique principal", description: `Photographie exacte de ${draft.botanicalName}, avec source et droits démontrés.` }],
    gallery,
    seo: { title: `${draft.botanicalName} : entretien et identification`, description: `${draft.subtitle} Origine, identification, lumière, arrosage, substrat et culture en intérieur.`, keywords: [draft.botanicalName, `${draft.displayName} entretien`, draft.genreLabel, "plante tropicale Lille"] },
    sources: [
      { label: draft.sourceLabel ?? "Kew Science — Plants of the World Online", url: draft.sourceUrl },
      ...(media ? [{ label: `Wikimedia Commons — photographie de ${draft.botanicalName}`, url: media.sourceUrl }] : []),
    ],
    publishedAt, updatedAt: publishedAt,
  };
};

const drafts: ExpansionSpecies[] = [
  { slug: "argyraea", genre: "peperomia", genreLabel: "Peperomia", botanicalName: "Peperomia argyraea", displayName: "Peperomia pastèque", subtitle: "Un Peperomia brésilien aux feuilles peltées rayées d’argent.", family: "Piperaceae", order: "Piperales", botanicalGenus: "Peperomia", species: "Peperomia argyraea", commonNames: ["Peperomia pastèque", "Watermelon peperomia"], synonyms: ["Peperomia argyreia"], origin: "Est du Brésil", regions: ["Brésil"], habitat: "Espèce du Brésil oriental, associée au biome tropical humide.", description: ["Ses feuilles presque rondes, attachées près du centre du limbe, alternent bandes vert sombre et argentées.", "Ses pétioles charnus et ses racines fines demandent un mélange aéré et un arrosage mesuré."], signature: "Une feuille peltée aux rayures de pastèque", adultSize: "Environ 20 à 35 cm", adultSizeCm: 35, habit: ["terrestre"], growthRate: "moyenne", preset: "soft-foliage", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A678020-1/general-information", image: "peperomia-argyraea" },
  { slug: "aureum", genre: "epipremnum", genreLabel: "Epipremnum", botanicalName: "Epipremnum aureum", displayName: "Pothos doré", subtitle: "Une liane aux feuilles marbrées qui change d’échelle lorsqu’elle grimpe.", family: "Araceae", order: "Alismatales", botanicalGenus: "Epipremnum", species: "Epipremnum aureum", commonNames: ["Pothos", "Pothos doré"], origin: "Îles de la Société, Polynésie française", regions: ["Polynésie française"], habitat: "Liane de forêt tropicale humide, largement cultivée et naturalisée hors de son aire native.", description: ["Les jeunes feuilles cordiformes portent une marbrure jaune irrégulière ; sur support, les feuilles adultes deviennent beaucoup plus grandes et peuvent se découper.", "Une lumière vive entretient la marbrure, tandis qu’un support révèle son port de liane."], signature: "Une liane dorée qui grandit en grimpant", adultSize: "Plusieurs mètres sur support", adultSizeCm: 300, habit: ["grimpant", "retombant"], growthRate: "rapide", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/results?q=Epipremnum%20aureum", image: "epipremnum-aureum" },
  { slug: "hastatum", genre: "philodendron", genreLabel: "Philodendron", botanicalName: "Philodendron hastatum", displayName: "Silver Sword", subtitle: "Un Philodendron brésilien aux feuilles lancéolées bleu argenté.", family: "Araceae", order: "Alismatales", botanicalGenus: "Philodendron", species: "Philodendron hastatum", commonNames: ["Silver Sword", "Philodendron argenté"], origin: "Sud-est du Brésil", regions: ["Brésil"], habitat: "Hémiépiphyte grimpant de la forêt atlantique du sud-est brésilien.", description: ["Ses feuilles sagittées puis lancéolées prennent un reflet bleu argenté caractéristique.", "Un support vertical, une lumière vive et des racines aérées favorisent des feuilles plus grandes."], signature: "Une lame argentée portée par une liane", adultSize: "Plusieurs mètres en grimpant", adultSizeCm: 250, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A87792-1/general-information", image: "philodendron-hastatum" },
  { slug: "orbifolia", genre: "calathea", genreLabel: "Calathea", botanicalName: "Goeppertia orbifolia", displayName: "Orbifolia", subtitle: "Une Marantaceae brésilienne aux larges feuilles striées d’argent.", family: "Marantaceae", order: "Zingiberales", botanicalGenus: "Goeppertia", species: "Goeppertia orbifolia", commonNames: ["Calathea orbifolia", "Orbifolia"], synonyms: ["Calathea orbifolia"], origin: "Est du Brésil", regions: ["Brésil"], habitat: "Plante terrestre du sous-bois tropical humide de l’est du Brésil.", description: ["De larges feuilles presque rondes sont parcourues de bandes argentées régulières sur un fond vert.", "Elle préfère une lumière douce, une eau peu minéralisée et un mélange souplement humide, jamais saturé."], signature: "De grandes feuilles rondes striées d’argent", adultSize: "Environ 60 à 100 cm", adultSizeCm: 100, habit: ["terrestre"], growthRate: "moyenne", preset: "soft-foliage", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A60461168-2", image: "goeppertia-orbifolia" },
  { slug: "truncata", genre: "cactus", genreLabel: "Cactus", botanicalName: "Schlumbergera truncata", displayName: "Cactus de Noël", subtitle: "Un cactus épiphyte brésilien aux segments dentés et aux fleurs hivernales.", family: "Cactaceae", order: "Caryophyllales", botanicalGenus: "Schlumbergera", species: "Schlumbergera truncata", commonNames: ["Cactus de Noël", "Cactus de novembre"], origin: "Sud-est du Brésil", regions: ["Brésil"], habitat: "Cactus épiphyte des forêts atlantiques humides du sud-est brésilien, installé sur les arbres et rochers.", description: ["Ses tiges aplaties sont divisées en segments aux dents nettement tronquées ; les fleurs asymétriques apparaissent en saison courte.", "Ce cactus forestier réclame plus de matière organique et moins de soleil direct qu’un cactus désertique."], signature: "Des segments tronqués et une floraison suspendue", adultSize: "Environ 25 à 45 cm, retombant", adultSizeCm: 45, habit: ["épiphyte", "retombant"], growthRate: "moyenne", preset: "epiphytic-cactus", sourceUrl: "https://powo.science.kew.org/taxon/229597-2", image: "schlumbergera-truncata" },
  { slug: "nephrolepis-exaltata", genre: "fougeres", genreLabel: "Fougères", botanicalName: "Nephrolepis exaltata", displayName: "Fougère de Boston", subtitle: "Une fougère américaine aux longues frondes arquées et légères.", family: "Nephrolepidaceae", order: "Polypodiales", botanicalGenus: "Nephrolepis", species: "Nephrolepis exaltata", commonNames: ["Fougère de Boston", "Boston fern"], origin: "Amériques tropicales et subtropicales", regions: ["Amérique tropicale", "Caraïbes"], habitat: "Fougère terrestre ou parfois épiphyte des régions tropicales et subtropicales américaines.", description: ["La touffe produit de longues frondes pennées, souples et arquées, capables de former une cascade dense.", "Le maintien d’un substrat souplement humide et d’une bonne humidité évite que les pinnules ne sèchent en série."], signature: "Une cascade de frondes finement pennées", adultSize: "Environ 50 à 100 cm d’envergure", adultSizeCm: 100, habit: ["terrestre", "retombant"], growthRate: "rapide", preset: "fern", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A17160830-1", image: "nephrolepis-exaltata" },
  { slug: "verrucosum", genre: "philodendron", genreLabel: "Philodendron", botanicalName: "Philodendron verrucosum", displayName: "Verrucosum", subtitle: "Un Philodendron velouté aux nervures claires et pétioles hérissés.", family: "Araceae", order: "Alismatales", botanicalGenus: "Philodendron", species: "Philodendron verrucosum", commonNames: ["Philodendron verrucosum"], origin: "Costa Rica jusqu’au Pérou", regions: ["Amérique centrale", "Andes tropicales"], habitat: "Hémiépiphyte de forêts tropicales humides, depuis l’Amérique centrale jusqu’aux Andes septentrionales.", description: ["Le limbe sombre et velouté souligne des nervures claires, tandis que les pétioles portent une pubescence distinctive.", "Il apprécie une lumière vive filtrée, un support et une atmosphère humide mais ventilée."], signature: "Velours sombre, nervures claires, pétioles hérissés", adultSize: "Plusieurs mètres sur support", adultSizeCm: 250, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A314474-2/general-information", image: "philodendron-verrucosum" },
  { slug: "squamiferum", genre: "philodendron", genreLabel: "Philodendron", botanicalName: "Philodendron squamiferum", displayName: "Squamiferum", subtitle: "Une liane guyanaise aux feuilles lobées et pétioles rouges velus.", family: "Araceae", order: "Alismatales", botanicalGenus: "Philodendron", species: "Philodendron squamiferum", commonNames: ["Philodendron à pétioles velus"], origin: "Guyanes et nord du Brésil", regions: ["Guyanes", "Brésil"], habitat: "Liane hémiépiphyte des forêts tropicales humides du plateau des Guyanes et du nord amazonien.", description: ["Les feuilles adultes se divisent en lobes profonds ; les pétioles rougeâtres couverts de soies constituent son meilleur repère.", "Le tuteurage permet d’observer la maturation du limbe sans confondre la plante avec un hybride horticole."], signature: "Des pétioles rouges velus sous une feuille lobée", adultSize: "Plusieurs mètres en grimpant", adultSizeCm: 250, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A88023-1/general-information", image: "philodendron-squamiferum" },
  { slug: "brandtianum", genre: "philodendron", genreLabel: "Philodendron", botanicalName: "Philodendron brandtianum", displayName: "Brandtianum", subtitle: "Un Philodendron néotropical aux feuilles argentées qui se plaque sur son support.", family: "Araceae", order: "Alismatales", botanicalGenus: "Philodendron", species: "Philodendron brandtianum", commonNames: ["Silver leaf philodendron"], origin: "Amérique tropicale", regions: ["Amérique du Sud"], habitat: "Liane de forêt tropicale humide, capable de plaquer ses jeunes pousses contre les troncs.", description: ["Les feuilles juvéniles cordiformes sont irrégulièrement couvertes de plages argentées sur fond vert olive.", "Un support plat ou vertical révèle son comportement de liane et favorise la transition vers un feuillage plus mature."], signature: "Une mosaïque d’argent qui se plaque au support", adultSize: "Plusieurs mètres en grimpant", adultSizeCm: 200, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/results?q=Philodendron%20brandtianum", image: "philodendron-brandtianum" },
  { slug: "erubescens", genre: "philodendron", genreLabel: "Philodendron", botanicalName: "Philodendron erubescens", displayName: "Philodendron rouge", subtitle: "Une espèce colombienne à tiges et pétioles rougissants, à l’origine de nombreux cultivars.", family: "Araceae", order: "Alismatales", botanicalGenus: "Philodendron", species: "Philodendron erubescens", commonNames: ["Philodendron rouge"], origin: "Colombie", regions: ["Colombie"], habitat: "Liane hémiépiphyte des forêts tropicales humides colombiennes.", description: ["Ses tiges et pétioles prennent des tons rouges à pourpres, sous des feuilles vertes allongées.", "L’espèce botanique ne doit pas être confondue avec chacun des nombreux cultivars horticoles issus de sa lignée."], signature: "Une liane verte portée par des axes rouge sombre", adultSize: "Plusieurs mètres sur support", adultSizeCm: 300, habit: ["grimpant", "hémiépiphyte"], growthRate: "rapide", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/results?q=Philodendron%20erubescens", image: "philodendron-erubescens" },
  { slug: "acuminata", genre: "monstera", genreLabel: "Monstera", botanicalName: "Monstera acuminata", displayName: "Acuminata", subtitle: "Une Monstera mésoaméricaine qui commence sa vie plaquée contre les troncs.", family: "Araceae", order: "Alismatales", botanicalGenus: "Monstera", species: "Monstera acuminata", commonNames: ["Monstera acuminata"], origin: "Mexique jusqu’en Amérique centrale", regions: ["Mexique", "Amérique centrale"], habitat: "Liane hémiépiphyte des forêts tropicales humides mésoaméricaines.", description: ["Les jeunes pousses peuvent former un stade plaqué au tronc avant de produire des feuilles plus grandes et fenêtrées.", "Un support vertical et une lumière vive permettent de lire cette transformation sans la forcer."], signature: "Une jeune liane plaquée qui devient fenêtrée", adultSize: "Plusieurs mètres dans son habitat", adultSizeCm: 300, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A87463-1/general-information", image: "monstera-acuminata" },
  { slug: "subpinnata", genre: "monstera", genreLabel: "Monstera", botanicalName: "Monstera subpinnata", displayName: "Subpinnata", subtitle: "Une liane andino-amazonienne aux feuilles adultes profondément divisées.", family: "Araceae", order: "Alismatales", botanicalGenus: "Monstera", species: "Monstera subpinnata", commonNames: ["Monstera subpinnata"], origin: "Sud-est de la Colombie jusqu’à la Bolivie", regions: ["Colombie", "Équateur", "Pérou", "Bolivie"], habitat: "Liane hémiépiphyte des forêts tropicales humides du versant andino-amazonien.", description: ["Le limbe adulte se découpe presque jusqu’à la nervure centrale en segments étroits et réguliers.", "La forme adulte apparaît mieux sur un support vertical, avec lumière vive et croissance continue."], signature: "Une feuille adulte découpée comme une fronde", adultSize: "Plusieurs mètres en forêt", adultSizeCm: 300, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A87550-1/general-information" },
  { slug: "spruceana", genre: "monstera", genreLabel: "Monstera", botanicalName: "Monstera spruceana", displayName: "Spruceana", subtitle: "Une Monstera néotropicale aux feuilles adultes divisées en nombreux segments.", family: "Araceae", order: "Alismatales", botanicalGenus: "Monstera", species: "Monstera spruceana", commonNames: ["Monstera spruceana"], origin: "Costa Rica jusqu’à l’Amérique du Sud tropicale", regions: ["Amérique centrale", "Amérique du Sud"], habitat: "Liane hémiépiphyte de forêt tropicale humide, du Costa Rica à l’Amérique du Sud.", description: ["La plante mature produit un limbe profondément pinnatifide, composé de segments nombreux et relativement étroits.", "Son identification demande d’observer une plante mature et sa progression sur support, pas une seule jeune feuille."], signature: "Une grande feuille divisée en segments nombreux", adultSize: "Plusieurs mètres en forêt", adultSizeCm: 350, habit: ["grimpant", "hémiépiphyte"], growthRate: "moyenne", preset: "aroid-climber", sourceUrl: "https://powo.science.kew.org/taxon/87547-1", image: "monstera-spruceana" },
  { slug: "villenaorum", genre: "anthurium", genreLabel: "Anthurium", botanicalName: "Anthurium villenaorum", displayName: "Villenaorum", subtitle: "Un Anthurium péruvien compact aux feuilles veloutées et nervures argentées.", family: "Araceae", order: "Alismatales", botanicalGenus: "Anthurium", species: "Anthurium villenaorum", commonNames: ["Anthurium villenaorum"], origin: "Pérou", regions: ["Pérou"], habitat: "Anthurium de forêt tropicale humide péruvienne, décrit comme espèce botanique distincte.", description: ["Ses feuilles allongées, sombres et veloutées sont structurées par des nervures plus claires.", "Sa silhouette compacte ne dispense pas d’un mélange très aéré et d’une lumière vive filtrée."], signature: "Un velours compact parcouru de nervures argentées", adultSize: "Environ 40 à 80 cm", adultSizeCm: 80, habit: ["terrestre", "épiphyte"], growthRate: "lente", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/results?q=Anthurium%20villenaorum" },
  { slug: "pedatoradiatum", genre: "anthurium", genreLabel: "Anthurium", botanicalName: "Anthurium pedatoradiatum", displayName: "Fingers", subtitle: "Un Anthurium mexicain dont les feuilles adultes se divisent comme une main.", family: "Araceae", order: "Alismatales", botanicalGenus: "Anthurium", species: "Anthurium pedatoradiatum", commonNames: ["Anthurium Fingers"], origin: "Sud du Mexique", regions: ["Mexique"], habitat: "Espèce terrestre du sud du Mexique, dans le biome tropical saisonnier humide.", description: ["Les feuilles juvéniles sont entières puis se divisent progressivement en lobes rayonnants avec la maturité.", "La transformation est un caractère de développement : une jeune feuille non lobée n’est pas une erreur d’identification à elle seule."], signature: "Une feuille qui se divise comme les doigts d’une main", adultSize: "Environ 60 à 120 cm", adultSizeCm: 120, habit: ["terrestre", "dressé"], growthRate: "moyenne", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A85194-1", image: "anthurium-pedatoradiatum" },
  { slug: "radicans", genre: "anthurium", genreLabel: "Anthurium", botanicalName: "Anthurium radicans", displayName: "Radicans", subtitle: "Un Anthurium brésilien rampant aux feuilles cordiformes profondément gaufrées.", family: "Araceae", order: "Alismatales", botanicalGenus: "Anthurium", species: "Anthurium radicans", commonNames: ["Anthurium radicans"], origin: "Sud-est du Brésil", regions: ["Brésil"], habitat: "Espèce de la forêt atlantique brésilienne, à port rampant ou courtement grimpant.", description: ["De petites feuilles épaisses et cordiformes montrent un relief bullé très marqué.", "Son port horizontal demande un pot large ou une composition qui laisse avancer le rhizome sans l’enfouir."], signature: "Un cœur gaufré porté par une tige rampante", adultSize: "Environ 30 à 60 cm d’étalement", adultSizeCm: 60, habit: ["rampant", "terrestre"], growthRate: "lente", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/results?q=Anthurium%20radicans", image: "anthurium-radicans" },
  { slug: "gageana", genre: "alocasia", genreLabel: "Alocasia", botanicalName: "Alocasia gageana", displayName: "Gageana", subtitle: "Une Alocasia du Myanmar, plus compacte que les grandes oreilles d’éléphant.", family: "Araceae", order: "Alismatales", botanicalGenus: "Alocasia", species: "Alocasia gageana", commonNames: ["Dwarf elephant ear"], origin: "Myanmar", regions: ["Myanmar"], habitat: "Espèce terrestre tropicale originaire du Myanmar.", description: ["Elle forme une touffe de feuilles vertes sagittées, d’un développement plus contenu que plusieurs grandes Alocasia.", "La chaleur, la lumière et un mélange respirant soutiennent sa croissance sans maintenir le corme dans l’eau."], signature: "Une oreille d’éléphant en touffe compacte", adultSize: "Environ 80 à 150 cm", adultSizeCm: 150, habit: ["terrestre", "dressé"], growthRate: "rapide", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/results?q=Alocasia%20gageana" },
  { slug: "lauterbachiana", genre: "alocasia", genreLabel: "Alocasia", botanicalName: "Alocasia lauterbachiana", displayName: "Purple Sword", subtitle: "Une Alocasia de Nouvelle-Guinée aux feuilles étroites et revers pourpré.", family: "Araceae", order: "Alismatales", botanicalGenus: "Alocasia", species: "Alocasia lauterbachiana", commonNames: ["Purple Sword", "Alocasia épée pourpre"], origin: "Nord de la Nouvelle-Guinée jusqu’à l’archipel Bismarck", regions: ["Nouvelle-Guinée", "Archipel Bismarck"], habitat: "Espèce terrestre tropicale de Nouvelle-Guinée septentrionale et de l’archipel Bismarck.", description: ["Ses feuilles longues, étroites et dentées contrastent avec un revers et des pétioles souvent pourprés.", "Elle réclame davantage de lumière qu’un sous-bois sombre pour conserver un port dense et sa coloration."], signature: "Une feuille en épée au revers pourpre", adultSize: "Environ 100 à 150 cm", adultSizeCm: 150, habit: ["terrestre", "dressé"], growthRate: "moyenne", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A962407-1/general-information" },
  { slug: "portei", genre: "alocasia", genreLabel: "Alocasia", botanicalName: "Alocasia portei", displayName: "Portei", subtitle: "Une grande Alocasia philippine aux feuilles profondément divisées.", family: "Araceae", order: "Alismatales", botanicalGenus: "Alocasia", species: "Alocasia portei", commonNames: ["Alocasia portei"], origin: "Luzon, Philippines", regions: ["Philippines"], habitat: "Grande espèce terrestre endémique de Luzon, dans le biome tropical humide.", description: ["Les grandes feuilles sagittées sont découpées en lobes profonds et irréguliers, portées par un pseudo-tronc robuste.", "Son ampleur réclame une lumière franche, un contenant stable et un substrat qui reste oxygéné malgré les arrosages."], signature: "Une géante philippine aux feuilles profondément lobées", adultSize: "Plus de 200 cm à maturité", adultSizeCm: 250, habit: ["terrestre", "dressé"], growthRate: "rapide", preset: "aroid-terrestrial", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A77177330-1/general-information", image: "alocasia-portei" },
  { slug: "involucrata", genre: "pilea", genreLabel: "Pilea", botanicalName: "Pilea involucrata", displayName: "Friendship plant", subtitle: "Un Pilea néotropical compact aux feuilles gaufrées bronze et vert.", family: "Urticaceae", order: "Rosales", botanicalGenus: "Pilea", species: "Pilea involucrata", commonNames: ["Friendship plant", "Pilea gaufré"], origin: "Amérique centrale jusqu’au Pérou et Petites Antilles", regions: ["Amérique centrale", "Amérique du Sud", "Caraïbes"], habitat: "Herbacée terrestre du sous-bois tropical humide, de l’Amérique centrale au Pérou et dans les îles du Vent.", description: ["Ses petites feuilles opposées présentent un relief gaufré, des plages bronze et des marges vertes.", "La plante reste compacte avec une lumière indirecte suffisante et se renouvelle facilement par boutures de tige."], signature: "Un petit feuillage gaufré bronze et vert", adultSize: "Environ 20 à 35 cm", adultSizeCm: 35, habit: ["terrestre"], growthRate: "rapide", preset: "soft-foliage", sourceUrl: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A77091436-1", image: "pilea-involucrata" },
];

export const speciesMediaExpansionV1Plants = drafts.map(toPlant);

export const speciesMediaExpansionV1Routes = speciesMediaExpansionV1Plants.map((plant) => `/plantes/${plant.genre}/${plant.slug}`);

export const speciesMediaExpansionV1Summary = {
  routes: speciesMediaExpansionV1Routes.length,
  verifiedMedia: speciesMediaExpansionV1Plants.filter((plant) => plant.gallery[0]?.license?.status === "verified").length,
  honestMediaGaps: speciesMediaExpansionV1Plants.filter((plant) => plant.gallery[0]?.license?.status === "media-gap").length,
};
