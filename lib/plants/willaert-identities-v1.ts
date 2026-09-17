import type { PlantEntry, PlantFilters } from "./types";

type Entry = {
  slug: string;
  genre: string;
  genreLabel: string;
  botanicalName: string;
  displayName: string;
  listingName: string;
  family: string;
  order: string;
  taxonomyGenus: string;
  taxonomySpecies: string;
  cultivar: string | null;
  commonNames: string[];
  origin: string;
  habitat: string;
  status: string;
  subtitle: string;
  description: string[];
  synonyms?: string[];
  light?: 1 | 2 | 3 | 4 | 5;
  water?: 1 | 2 | 3 | 4 | 5;
  humidity?: 1 | 2 | 3 | 4 | 5;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  outdoor?: boolean;
  habits?: PlantFilters["habits"];
  adultSizeCm?: number;
  petToxic?: boolean | null;
  humanToxic?: boolean | null;
  lightText: string;
  watering: string;
  temperature: string;
  substrate: string;
  propagation: string;
  comparisons?: PlantEntry["comparisons"];
  faq: PlantEntry["faq"];
  sources: PlantEntry["sources"];
  gallery?: PlantEntry["gallery"];
  seo: PlantEntry["seo"];
};

const makePlant = (entry: Entry): PlantEntry => {
  const outdoor = entry.outdoor ?? false;
  const filters: PlantFilters = {
    temperatureMin: outdoor ? -8 : 15,
    temperatureIdeal: outdoor ? [5, 28] : [18, 27],
    humidityIdeal: [40, 75],
    light: (entry.light ?? 4) >= 5 ? "soleil" : (entry.light ?? 4) >= 4 ? "vive" : "moyenne",
    watering: (entry.water ?? 3) >= 4 ? "régulier" : (entry.water ?? 3) <= 1 ? "faible" : "modéré",
    substrateTags: ["drainant", "pot percé"],
    growthRate: "moyenne",
    habits: entry.habits ?? ["dressé"],
    adultSizeCm: entry.adultSizeCm ?? 150,
    needsSupport: (entry.habits ?? []).includes("grimpant"),
    variegated: false,
    collection: false,
    flowering: true,
    petToxic: entry.petToxic ?? null,
    humanToxic: entry.humanToxic ?? null,
    regions: [entry.origin],
  };

  return {
    slug: entry.slug,
    genre: entry.genre,
    genreLabel: entry.genreLabel,
    botanicalName: entry.botanicalName,
    displayName: entry.displayName,
    listingName: entry.listingName,
    subtitle: entry.subtitle,
    family: entry.family,
    taxonomy: {
      order: entry.order,
      family: entry.family,
      genus: entry.taxonomyGenus,
      species: entry.taxonomySpecies,
      cultivar: entry.cultivar,
      commonNames: entry.commonNames,
    },
    filters,
    origin: entry.origin,
    habitat: entry.habitat,
    hybridization: entry.status,
    synonyms: entry.synonyms ?? [],
    description: entry.description,
    specimen: {
      observedHeight: "Aucune mesure de spécimen publiée",
      note: "Le format commercial est conservé dans le produit et ne modifie pas l’identité encyclopédique.",
    },
    growth: {
      adultSize: "Variable selon l’identité, la maturité et les conditions de culture",
      speed: "Variable",
      habit: (entry.habits ?? ["dressé"]).join(" et "),
    },
    care: {
      light: entry.light ?? 4,
      water: entry.water ?? 3,
      humidity: entry.humidity ?? 3,
      difficulty: entry.difficulty ?? 2,
      lightText: entry.lightText,
      watering: entry.watering,
      humidityText: "Maintenir une circulation d’air adaptée sans enfermer durablement le feuillage.",
      temperature: entry.temperature,
      substrate: entry.substrate,
      repotting: "Rempoter seulement lorsque la motte le justifie, dans un pot percé légèrement plus grand.",
      fertilizing: "Apports modérés pendant la croissance active, sur un substrat déjà humide.",
      propagation: entry.propagation,
    },
    toxicity: entry.petToxic === true || entry.humanToxic === true
      ? {
          level: "toxique",
          summary: "Tenir hors de portée des enfants et des animaux.",
          details: "Cette plante ornementale ne doit pas être ingérée. Contactez un professionnel en cas d’ingestion.",
        }
      : {
          level: "non établie pour ce lot",
          summary: "Ne pas considérer une plante décorative comme comestible.",
          details: "L’innocuité n’est pas déduite d’un nom commercial. Demandez un avis professionnel en cas d’ingestion.",
        },
    problems: [
      { title: "Feuillage jaune", cause: "Excès d’eau, froid, manque de lumière ou vieillissement naturel.", advice: "Contrôler la motte et les racines avant de modifier la fertilisation." },
      { title: "Bords secs", cause: "Arrosage irrégulier, soleil brutal, vent ou accumulation de sels.", advice: "Stabiliser les conditions et observer les nouvelles feuilles." },
      { title: "Croissance ralentie", cause: "Lumière ou température insuffisante, reprise racinaire ou repos saisonnier.", advice: "Respecter le rythme réel de la plante sans forcer par l’engrais." },
    ],
    comparisons: entry.comparisons ?? [],
    faq: entry.faq,
    tibaldoAdvice: [
      "Conserver l’étiquette et la provenance avec la plante.",
      "Ne pas transformer un format commercial en rang botanique.",
      "Observer les racines avant de modifier l’arrosage.",
    ],
    mediaNeeds: (entry.gallery?.length ?? 0) > 0 ? [] : [{ role: "portrait", description: `Photographie exacte et autorisée de ${entry.botanicalName}.` }],
    gallery: entry.gallery ?? [],
    seo: entry.seo,
    sources: entry.sources,
    showSources: true,
    publishedAt: "2026-09-17",
    updatedAt: "2026-09-17",
  };
};

const cactusIllustration: PlantEntry["gallery"][number] = {
  src: "/cactus-collection-serre.jpg",
  alt: "Collection d’illustration réunissant plusieurs cactus en serre, sans identifier le contenu variable du lot Cactus Mix",
  caption: "Photo d’illustration : le contenu du lot Cactus Mix varie et se choisit au Studio · Anita Austvika · licence Unsplash",
  width: 1200,
  height: 800,
  license: {
    status: "verified",
    creator: "Anita Austvika",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    sourceUrl: "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE",
    registryPath: "/credits-images",
    note: "Illustration générique autorisée, jamais présentée comme photographie du lot Willaert ni comme preuve d’identité individuelle.",
  },
};

export const willaertIdentityPlants: PlantEntry[] = [
  makePlant({
    slug: "gigantea-puck",
    genre: "yucca",
    genreLabel: "Yucca",
    botanicalName: "Yucca gigantea — vendu comme ‘Puck’",
    displayName: "Yucca ‘Puck’",
    listingName: "Yucca gigantea · Puck",
    family: "Asparagaceae",
    order: "Asparagales",
    taxonomyGenus: "Yucca",
    taxonomySpecies: "Yucca gigantea",
    cultivar: null,
    commonNames: ["Yucca elephantipes ‘Puck’", "Yucca sans épines ‘Puck’"],
    origin: "Espèce du Mexique central à l’Amérique centrale ; sélection horticole commercialisée comme ‘Puck’",
    habitat: "Yucca gigantea est un arbre de biome tropical saisonnièrement sec. Le lot vendu comme ‘Puck’ relève de la culture horticole en pot.",
    status: "Yucca gigantea est le nom d’espèce accepté par Kew ; Yucca elephantipes est un synonyme. La RHS répertorie ‘Puck’ avec un statut de nom non résolu : Jungle conserve donc ce libellé commercial sans lui attribuer un cultivar formel établi.",
    subtitle: "Le yucca sans épines vendu sous le nom ‘Puck’, rattaché prudemment à Yucca gigantea.",
    description: [
      "Yucca gigantea forme un tronc épaissi portant des rosettes de feuilles rubanées. En intérieur, sa silhouette dépend fortement de la lumière et du rythme d’arrosage.",
      "Le mot ‘Puck’ identifie ici le lot horticole reçu. Il ne permet pas, à lui seul, de promettre une taille adulte, une panachure ou une stabilité particulière.",
    ],
    synonyms: ["Yucca elephantipes", "Yucca guatemalensis"],
    light: 5,
    water: 1,
    humidity: 2,
    habits: ["dressé"],
    adultSizeCm: 250,
    lightText: "Lumière très vive, avec soleil progressif ; éviter un fond de pièce sombre.",
    watering: "Laisser sécher une part importante du mélange avant un arrosage complet, puis vider l’excédent.",
    temperature: "Ambiance lumineuse hors gel ; protéger le lot en pot du froid humide.",
    substrate: "Mélange très drainant et stable dans un pot percé, sans surdimensionnement.",
    propagation: "Bouture de tronc ou séparation d’un rejet correctement enraciné, en conservant le nom commercial avec la plante mère.",
    faq: [
      { question: "Puck est-il un cultivar botanique confirmé ?", answer: "Non dans cette fiche : la RHS conserve ce nom avec un statut non résolu. Jungle le présente comme libellé horticole du lot." },
      { question: "Yucca elephantipes est-il le nom accepté ?", answer: "Kew place ce nom en synonymie de Yucca gigantea, retenu ici comme identité d’espèce." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "Aucune photographie exacte et autorisée du lot Puck n’est encore disponible ; une plante ressemblante ne lui est pas substituée." },
    ],
    sources: [
      { label: "Kew Science — Yucca gigantea, espèce acceptée", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:543700-1" },
      { label: "RHS — Yucca elephantipes ‘Puck’, nom non résolu", url: "https://www.rhs.org.uk/plants/196486/yucca-elephantipes-puck-v/details" },
    ],
    seo: { title: "Yucca gigantea Puck : identité et entretien", description: "Yucca vendu comme Puck : nom accepté Yucca gigantea, ancien nom elephantipes, lumière, arrosage et statut horticole non résolu.", keywords: ["Yucca Puck", "Yucca gigantea", "Yucca elephantipes Puck"] },
  }),
  makePlant({
    slug: "europaea",
    genre: "olea",
    genreLabel: "Olea",
    botanicalName: "Olea europaea",
    displayName: "Olivier",
    listingName: "Olea europaea · Olivier",
    family: "Oleaceae",
    order: "Lamiales",
    taxonomyGenus: "Olea",
    taxonomySpecies: "Olea europaea",
    cultivar: null,
    commonNames: ["Olivier", "Olivier d’Europe"],
    origin: "Afrique, région méditerranéenne jusqu’au sud de l’Asie centrale selon Kew",
    habitat: "Arbuste ou arbre persistant des biomes subtropicaux, largement cultivé depuis l’Antiquité.",
    status: "Espèce botanique acceptée. Aucun cultivar n’est attribué au lot Willaert sans étiquette plus précise.",
    subtitle: "L’olivier méditerranéen, à cultiver en pleine lumière et dans un sol parfaitement drainé.",
    description: [
      "Olea europaea porte des feuilles opposées, coriaces, vert gris au revers argenté. Sa croissance en pot reste liée à la lumière, au drainage et au volume racinaire.",
      "Le format M décrit le produit reçu, pas une variété botanique. La fiche conserve l’espèce sans inventer de cultivar fruitier ou ornemental.",
    ],
    outdoor: true,
    light: 5,
    water: 2,
    humidity: 1,
    adultSizeCm: 500,
    lightText: "Plein soleil après acclimatation, à l’emplacement le plus lumineux disponible.",
    watering: "Arroser profondément en croissance puis laisser sécher nettement ; réduire par temps froid.",
    temperature: "La rusticité dépend du sujet, du sol et de l’exposition ; protéger particulièrement une motte en pot lors des gels marqués.",
    substrate: "Sol ou mélange minéral très drainant, sans eau stagnante en hiver.",
    propagation: "Bouture ou greffe selon le cultivar ; le semis ne conserve pas une sélection horticole non identifiée.",
    faq: [
      { question: "Cet olivier a-t-il un cultivar connu ?", answer: "Non. Le lot est documenté au niveau de l’espèce Olea europaea seulement." },
      { question: "Peut-il vivre en pot à Lille ?", answer: "Oui avec beaucoup de lumière, un drainage franc et une protection adaptée de la motte pendant les épisodes froids." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "Aucune photographie exacte et autorisée du lot reçu n’est encore publiée." },
    ],
    sources: [{ label: "Kew Science — Olea europaea, espèce acceptée", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:610675-1" }],
    seo: { title: "Olea europaea : culture de l’olivier en pot ou au jardin", description: "Guide de l’olivier Olea europaea : identité, plein soleil, arrosage, drainage et protection d’un sujet en pot à Lille.", keywords: ["Olea europaea", "olivier en pot", "olivier Lille"] },
  }),
  makePlant({
    slug: "papyrifer",
    genre: "tetrapanax",
    genreLabel: "Tetrapanax",
    botanicalName: "Tetrapanax papyrifer",
    displayName: "Plante à papier de riz",
    listingName: "Tetrapanax papyrifer",
    family: "Araliaceae",
    order: "Apiales",
    taxonomyGenus: "Tetrapanax",
    taxonomySpecies: "Tetrapanax papyrifer",
    cultivar: null,
    commonNames: ["Plante à papier de riz", "Aralie à papier de Chine"],
    origin: "Centre et sud de la Chine, Taiwan selon Kew",
    habitat: "Arbuste ou petit arbre du biome tropical humide, cultivé pour son feuillage spectaculaire.",
    status: "Espèce botanique acceptée. Aucun cultivar n’est attribué au lot.",
    subtitle: "Un arbuste architectural aux feuilles palmées de grande ampleur.",
    description: [
      "Tetrapanax papyrifer forme de grandes feuilles palmées portées par de longs pétioles, sur des tiges à moelle blanche.",
      "La plante peut drageonner lorsqu’elle est installée. Son développement et sa tenue au froid dépendent fortement du microclimat et de la protection de la souche.",
    ],
    outdoor: true,
    light: 4,
    water: 3,
    humidity: 3,
    adultSizeCm: 400,
    lightText: "Lumière vive à soleil doux, dans une situation protégée des vents qui déchirent les feuilles.",
    watering: "Arroser régulièrement en période de croissance sans maintenir une motte froide et saturée en hiver.",
    temperature: "Protéger un jeune sujet et sa souche lors des gels ; la rusticité réelle dépend du microclimat et du drainage.",
    substrate: "Sol humifère, fertile et drainant, restant frais pendant la croissance.",
    propagation: "Séparation prudente d’un drageon enraciné ou semis documenté.",
    faq: [
      { question: "Tetrapanax papyrifer est-il une aralie ?", answer: "Il appartient aux Araliaceae, mais constitue le genre Tetrapanax et ne doit pas être rebaptisé Fatsia." },
      { question: "Peut-il drageonner ?", answer: "Oui, une plante installée peut produire des rejets à distance ; surveillez son extension au jardin." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "Jungle attend une photographie exacte et autorisée du sujet ou une illustration documentaire clairement licenciée." },
    ],
    comparisons: [{ name: "Fatsia japonica", href: "/plantes/fatsia", difference: "Même famille, mais genre et architecture distincts ; Tetrapanax peut devenir plus ample et drageonnant." }],
    sources: [{ label: "Kew Science — Tetrapanax papyrifer, espèce acceptée", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:86417-3" }],
    seo: { title: "Tetrapanax papyrifer : culture et grandes feuilles", description: "Guide de Tetrapanax papyrifer : identité, lumière, eau, grandes feuilles, drageons et protection hivernale à Lille.", keywords: ["Tetrapanax papyrifer", "plante papier de riz", "Tetrapanax Lille"] },
  }),
  makePlant({
    slug: "scolopendrium",
    genre: "asplenium",
    genreLabel: "Asplenium",
    botanicalName: "Asplenium scolopendrium",
    displayName: "Scolopendre",
    listingName: "Asplenium scolopendrium · Langue-de-cerf",
    family: "Aspleniaceae",
    order: "Polypodiales",
    taxonomyGenus: "Asplenium",
    taxonomySpecies: "Asplenium scolopendrium",
    cultivar: null,
    commonNames: ["Langue-de-cerf", "Scolopendre"],
    origin: "Hémisphère Nord tempéré jusqu’au Mexique et à l’Afrique du Nord selon Kew",
    habitat: "Fougère vivace ou géophyte rhizomateuse de milieux tempérés, souvent ombragés et frais.",
    status: "Espèce botanique acceptée. La facture n’établit aucune sous-espèce ni aucun cultivar.",
    subtitle: "Une fougère rustique aux longues frondes entières en forme de langue.",
    description: [
      "Asplenium scolopendrium se distingue par ses frondes entières, luisantes et allongées, réunies en rosette.",
      "Elle ne doit pas être confondue avec Asplenium nidus : leurs frondes peuvent paraître proches, mais leurs origines et leurs conditions de culture ne sont pas interchangeables.",
    ],
    outdoor: true,
    light: 2,
    water: 4,
    humidity: 4,
    adultSizeCm: 60,
    habits: ["terrestre"],
    lightText: "Ombre claire à mi-ombre, à l’abri du soleil chaud et desséchant.",
    watering: "Maintenir un sol frais et drainant, sans assécher durablement le rhizome ni noyer le cœur.",
    temperature: "Espèce tempérée adaptée à l’extérieur ; protéger surtout le pot des alternances de gel et saturation.",
    substrate: "Sol humifère, frais, riche en matière organique et drainant.",
    propagation: "Division d’une touffe établie ou semis de spores, sans floraison ni graine.",
    faq: [
      { question: "Est-ce la même fougère qu’Asplenium nidus ?", answer: "Non. A. scolopendrium est une espèce tempérée distincte ; la photo Owner de nidus ne peut pas lui servir d’illustration exacte." },
      { question: "Cette fougère produit-elle des fleurs ?", answer: "Non. Comme les autres fougères, elle se reproduit par spores." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "La photo existante concerne Asplenium nidus. Jungle ne l’utilise pas pour illustrer une espèce différente." },
    ],
    comparisons: [{ name: "Asplenium nidus", href: "/plantes/asplenium/nidus", difference: "Fougère tropicale nid-d’oiseau distincte ; son média exact n’est pas réutilisé ici." }],
    sources: [{ label: "Kew Science — Asplenium scolopendrium, espèce acceptée", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:30216020-2" }],
    seo: { title: "Asplenium scolopendrium : culture de la langue-de-cerf", description: "Guide d’Asplenium scolopendrium : fougère langue-de-cerf, ombre, sol frais, culture extérieure et différence avec Asplenium nidus.", keywords: ["Asplenium scolopendrium", "langue de cerf", "fougère scolopendre"] },
  }),
  makePlant({
    slug: "silver-blush",
    genre: "anthurium",
    genreLabel: "Anthurium",
    botanicalName: "Anthurium ‘Silver Blush’",
    displayName: "Silver Blush",
    listingName: "Anthurium ‘Silver Blush’",
    family: "Araceae",
    order: "Alismatales",
    taxonomyGenus: "Anthurium",
    taxonomySpecies: "Rattachement spécifique non confirmé",
    cultivar: null,
    commonNames: ["Anthurium Silver Blush", "Anthurium crystallinum Silver Blush"],
    origin: "Horticulture ; origine de sélection et rattachement spécifique non établis par la facture",
    habitat: "Sélection cultivée comme un Anthurium de feuillage velouté, sans population sauvage propre attribuée au nom commercial.",
    status: "Silver Blush est un nom horticole commercial largement utilisé, souvent rattaché à Anthurium crystallinum. Faute de registre ou de traçabilité fournisseur concluante, Jungle ne transforme pas cet usage en cultivar botanique formel ni en parentage certain.",
    subtitle: "Un nom horticole d’Anthurium argenté conservé sans inventer son parentage.",
    description: [
      "Le commerce décrit Silver Blush pour un feuillage cordiforme sombre dont les nervures et les plages argentées sont particulièrement visibles.",
      "Cette fiche est distincte de l’hybride Anthurium forgetii dark form × ‘Silver Blush’ déjà documenté : ni son identité ni sa photographie Owner ne sont réutilisées pour le lot reçu.",
    ],
    light: 4,
    water: 3,
    humidity: 4,
    difficulty: 3,
    petToxic: true,
    humanToxic: true,
    adultSizeCm: 50,
    lightText: "Lumière vive filtrée, sans soleil chaud direct sur le feuillage.",
    watering: "Arroser après un séchage partiel du mélange, puis laisser l’excédent s’évacuer entièrement.",
    temperature: "Chaleur stable, idéalement 18 à 27 °C, sans courant d’air froid.",
    substrate: "Mélange très aéré pour Araceae, avec écorce fine et fraction minérale dans un pot percé.",
    propagation: "Division d’un rejet ou multiplication végétative documentée ; un semis ne garantit pas la conservation d’un nom horticole.",
    faq: [
      { question: "Silver Blush est-il forcément Anthurium crystallinum ?", answer: "Le rattachement est fréquent dans le commerce, mais la facture seule ne suffit pas à le certifier. Jungle conserve donc un nom horticole prudent." },
      { question: "Est-ce l’hybride Forgetii DF × Silver Blush déjà photographié ?", answer: "Non. Ce croisement constitue une autre entité et sa photo Owner ne documente pas ce lot." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "Aucune photographie exacte et autorisée du Silver Blush reçu n’est encore validée." },
    ],
    comparisons: [{ name: "Anthurium forgetii dark form × ‘Silver Blush’", href: "/plantes/anthurium/forgetii-dark-form-silver-blush", difference: "Croisement horticole distinct, avec une provenance et un média propres." }],
    sources: [
      { label: "Kew Science — Anthurium crystallinum, espèce acceptée", url: "https://powo.science.kew.org/results?q=Anthurium%20crystallinum" },
      { label: "GrowTropicals — usage commercial Anthurium Silver Blush", url: "https://growtropicals.com/products/anthurium-silver-blush" },
      { label: "Aquasabi — usage commercial Anthurium crystallinum Silver Blush", url: "https://www.aquasabi.com/Anthurium-crystallinum-Silver-Blush" },
    ],
    seo: { title: "Anthurium Silver Blush : identité horticole et entretien", description: "Anthurium Silver Blush : nom horticole prudent, feuillage argenté, lumière, arrosage et distinction avec l’hybride Forgetii DF.", keywords: ["Anthurium Silver Blush", "Silver Blush entretien", "Anthurium argenté"] },
  }),
  makePlant({
    slug: "assortiment",
    genre: "cactus",
    genreLabel: "Cactus",
    botanicalName: "Cactus — assortiment commercial",
    displayName: "Cactus Mix",
    listingName: "Cactus Mix · assortiment",
    family: "Identité botanique variable",
    order: "Non déterminé",
    taxonomyGenus: "Assortiment commercial",
    taxonomySpecies: "Identités individuelles non déterminées",
    cultivar: null,
    commonNames: ["Cactus Mix", "Assortiment de cactus et plantes succulentes"],
    origin: "Lot horticole multi-identités ; aucune origine unique attribuable",
    habitat: "Le lot peut réunir des plantes de familles, genres et habitats différents. Aucun milieu naturel commun n’est inventé.",
    status: "Assortiment commercial volontairement non identifié au niveau de l’espèce. Les formats S, M et L partagent cette fiche ; ils ne constituent ni espèces ni variétés. Certains sujets peuvent être des succulentes non Cactaceae.",
    subtitle: "Une fiche d’assortiment honnête : chaque plante se choisit et s’identifie au Studio.",
    description: [
      "Cactus Mix désigne un assortiment variable, pas un taxon botanique. Une aréole permet de reconnaître une Cactaceae, tandis que plusieurs autres succulentes peuvent lui ressembler sans être des cactus.",
      "Les conseils précis de lumière, de repos ou de rusticité dépendent de l’individu choisi. La photographie illustre l’esprit de l’assortiment et ne promet ni l’espèce ni l’aspect du lot disponible.",
    ],
    light: 5,
    water: 1,
    humidity: 1,
    adultSizeCm: 100,
    lightText: "Lumière très vive ; confirmer l’identité de la plante choisie avant d’imposer un plein soleil.",
    watering: "Identifier d’abord le sujet, puis arroser seulement lorsque son mélange a séché au niveau adapté à son groupe.",
    temperature: "Aucune rusticité commune n’est affirmée pour un lot multi-identités ; demander le conseil correspondant au sujet choisi.",
    substrate: "Mélange et granulométrie adaptés à l’individu, toujours dans un contenant percé.",
    propagation: "La méthode dépend entièrement de l’identité : bouture, rejet, semis ou greffe selon la plante.",
    faq: [
      { question: "Cactus Mix est-il une espèce ?", answer: "Non. C’est un assortiment commercial variable, proposé en trois formats S, M et L." },
      { question: "Tous les sujets sont-ils des Cactaceae ?", answer: "Pas nécessairement. Un lot peut contenir des succulentes d’autres familles ; chaque plante doit être observée et identifiée séparément." },
      { question: "La photo montre-t-elle le lot exact ?", answer: "Non. C’est une photo d’illustration sous licence ; l’aspect et les espèces varient et le choix se fait au Studio." },
      { question: "Ces plantes résistent-elles au gel ?", answer: "Aucune rusticité générale n’est affirmée. Elle dépend de l’identité exacte du sujet." },
    ],
    sources: [
      { label: "Kew Science — famille Cactaceae", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:30000055-2" },
      { label: "RHS — guide cactus et succulentes", url: "https://www.rhs.org.uk/plants/types/cacti-succulents/growing-guide" },
      { label: "Unsplash — photographie d’illustration, Anita Austvika", url: "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE" },
    ],
    gallery: [cactusIllustration],
    seo: { title: "Cactus Mix : choisir et entretenir un assortiment", description: "Cactus Mix S, M ou L : assortiment variable à choisir au Studio, identification honnête, lumière, arrosage et différence entre cactus et succulentes.", keywords: ["Cactus Mix", "assortiment cactus", "cactus Lille"] },
  }),
  makePlant({
    slug: "xanadu",
    genre: "philodendron",
    genreLabel: "Philodendron",
    botanicalName: "Philodendron xanadu",
    displayName: "Xanadu",
    listingName: "Philodendron xanadu · Xanadu",
    family: "Araceae",
    order: "Alismatales",
    taxonomyGenus: "Philodendron",
    taxonomySpecies: "Philodendron xanadu",
    cultivar: null,
    commonNames: ["Philodendron Xanadu", "Thaumatophyllum xanadu"],
    origin: "Sud du Brésil au Paraguay selon Kew",
    habitat: "Sous-arbrisseau terrestre du biome tropical saisonnièrement sec.",
    status: "Kew accepte Philodendron xanadu comme espèce et place Thaumatophyllum xanadu en synonymie. Le nom Xanadu ne désigne donc pas ici un cultivar inventé.",
    subtitle: "Un Philodendron autoportant aux feuilles profondément découpées.",
    description: [
      "Philodendron xanadu forme une touffe dense de feuilles lobées sur des entre-nœuds courts. Son port diffère des Philodendron grimpants qui réclament un tuteur vertical.",
      "Le produit Willaert L se rattache à cette identité fournie par l’Owner. Le format L reste une donnée commerciale et non un rang botanique.",
    ],
    synonyms: ["Thaumatophyllum xanadu"],
    light: 4,
    water: 3,
    humidity: 3,
    difficulty: 2,
    petToxic: true,
    humanToxic: true,
    adultSizeCm: 120,
    habits: ["terrestre", "dressé"],
    lightText: "Lumière vive indirecte, avec éventuellement un soleil doux après acclimatation.",
    watering: "Arroser après séchage de la surface et laisser l’eau s’évacuer ; réduire quand la croissance ralentit.",
    temperature: "Chaleur stable, idéalement 18 à 27 °C, sans courant d’air froid.",
    substrate: "Mélange aéré et drainant pour Araceae, dans un pot stable et percé.",
    propagation: "Division d’une touffe ou séparation d’un rejet portant des racines et un point de croissance.",
    faq: [
      { question: "Faut-il l’appeler Thaumatophyllum xanadu ?", answer: "Ce nom existe dans la littérature, mais Kew accepte actuellement Philodendron xanadu et traite Thaumatophyllum xanadu comme synonyme." },
      { question: "Xanadu a-t-il besoin d’un tuteur ?", answer: "Son port est compact et autoportant ; un tuteur de liane n’est généralement pas nécessaire." },
      { question: "Pourquoi aucune photo n’est-elle affichée ?", answer: "Aucune photographie exacte et autorisée du lot Xanadu reçu n’est encore publiée." },
    ],
    comparisons: [{ name: "Philodendron ‘Imperial Green’", href: "/plantes/philodendron/imperial-green", difference: "Sélection compacte à feuilles entières, distincte des lobes profonds de Xanadu." }],
    sources: [
      { label: "Kew Science — Philodendron xanadu, espèce acceptée", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:20011461-1" },
      { label: "RHS — culture des Philodendron", url: "https://www.rhs.org.uk/plants/philodendron/growing-guide" },
    ],
    seo: { title: "Philodendron xanadu : identité, feuilles lobées et entretien", description: "Guide de Philodendron xanadu : identité acceptée, synonyme Thaumatophyllum xanadu, lumière, arrosage et port autoportant.", keywords: ["Philodendron xanadu", "Thaumatophyllum xanadu", "Xanadu entretien"] },
  }),
];
