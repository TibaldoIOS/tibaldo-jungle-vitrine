import type { PlantEntry } from "./types";

export const dicksoniaAntarctica: PlantEntry = {
  slug: "antarctica",
  genre: "dicksonia",
  genreLabel: "Dicksonia",
  botanicalName: "Dicksonia antarctica",
  displayName: "Dicksonia antarctica",
  listingName: "Dicksonia antarctica",
  subtitle:
    "La fougère arborescente de Tasmanie forme lentement une couronne monumentale de frondes au-dessus d’un stipe vivant, fibreux et avide d’humidité.",
  family: "Dicksoniaceae",
  taxonomy: {
    order: "Cyatheales",
    family: "Dicksoniaceae",
    genus: "Dicksonia",
    species: "antarctica",
    cultivar: null,
    commonNames: [
      "Fougère arborescente de Tasmanie",
      "Fougère arborescente d’Australie",
      "Soft tree fern",
    ],
  },
  filters: {
    temperatureMin: 0,
    temperatureIdeal: [10, 24],
    humidityIdeal: [60, 85],
    light: "moyenne",
    watering: "élevé",
    substrateTags: [
      "humifère",
      "organique",
      "frais",
      "drainant",
      "légèrement acide",
    ],
    growthRate: "lente",
    habits: ["dressé", "terrestre"],
    adultSizeCm: 600,
    needsSupport: false,
    variegated: false,
    collection: true,
    flowering: false,
    petToxic: false,
    humanToxic: false,
    regions: ["Australie", "Tasmanie", "Hauts-de-France"],
  },
  origin:
    "Sud-est de l’Australie, de l’extrême sud-est du Queensland à la Tasmanie",
  habitat:
    "Ravins ombragés, berges, sous-bois frais et forêts humides tempérées, souvent dans une atmosphère protégée du vent et durablement humide.",
  hybridization:
    "Espèce acceptée sous le nom Dicksonia antarctica Labill. ; fougère arborescente de l’ordre des Cyatheales, et non palmier ni arbre à bois.",
  synonyms: [
    "Balantium antarcticum C.Presl",
    "Cibotium billardierei Kaulf.",
    "Dicksonia billardierei F.Muell.",
  ],
  description: [
    "Dicksonia antarctica est une fougère, donc une plante vasculaire sans fleurs ni graines qui se reproduit par spores. Sa silhouette rappelle un petit palmier, mais sa couronne est formée de frondes divisées qui se déroulent depuis le cœur en crosses.",
    "Son prétendu tronc n’est pas un fût ligneux comparable à celui d’un arbre. Une tige centrale relativement mince est enveloppée d’un épais manteau de racines adventives, de bases de frondes et de fibres. Ce stipe poreux participe à l’alimentation en eau et peut accueillir mousses et petites épiphytes dans son habitat.",
    "Dans les forêts humides du sud-est australien, l’espèce peut devenir monumentale. En culture européenne, son développement reste beaucoup plus lent et dépend de la fraîcheur du sol, de l’humidité estivale, de l’abri et de la qualité de l’hivernage.",
  ],
  specimen: {
    observedHeight: "Sujet adulte : plusieurs mètres avec l’âge",
    note: "Aucun spécimen propriétaire définitif n’est encore photographié pour cette fiche. Les dimensions naturelles ne doivent pas être transposées automatiquement à une culture en pot ou au climat lillois.",
  },
  growth: {
    adultSize:
      "Jusqu’à environ 15 m dans des conditions naturelles exceptionnelles ; couramment bien moins en culture",
    speed:
      "Lente : Kew rapporte environ 1 à 10 cm de stipe par an selon les conditions",
    habit:
      "Stipe dressé, généralement solitaire, portant une large couronne de frondes arquées pouvant mesurer plusieurs mètres",
  },
  care: {
    light: 3,
    water: 5,
    humidity: 5,
    difficulty: 4,
    difficultyText:
      "Exige une humidité suivie, un emplacement protégé et un hivernage adapté au climat.",
    lightText:
      "Ombre lumineuse, mi-ombre ou lumière filtrée. Un soleil fort, surtout avec vent ou manque d’eau, brûle les jeunes frondes et dessèche le stipe.",
    watering:
      "Maintenir la motte fraîche sans la saturer. Pendant la croissance et les périodes sèches, humidifier aussi doucement le stipe fibreux ; en hiver, réduire les apports et ne jamais laisser de l’eau stagner dans la couronne.",
    humidityText:
      "Une atmosphère humide, fraîche et abritée du vent soutient le déploiement des frondes. Vent sec, chauffage et sécheresse prolongée brunissent rapidement les extrémités.",
    temperature:
      "Croissance confortable en ambiance fraîche à tempérée. La classification RHS H3 implique une protection hivernale dans les régions froides : durée du gel, vent, humidité, âge et culture en pot comptent davantage qu’un seuil isolé.",
    substrate:
      "Mélange humifère, riche en matière organique, frais mais drainant, de tendance neutre à acide. Le collet et la couronne ne doivent pas être enterrés.",
    repotting:
      "Utiliser un contenant lourd, percé et stable, juste assez grand pour les racines. Rempoter au printemps seulement lorsque la motte le justifie, sans démanteler le stipe ni enfouir sa base.",
    fertilizing:
      "Apports modérés et dilués du printemps à la fin de l’été, sur un substrat déjà humide. La croissance lente ne doit jamais être forcée par des doses élevées.",
    propagation:
      "Semis de spores mûres sur un milieu propre, fin et constamment humide. La formation du prothalle puis du jeune sporophyte est lente et délicate pour l’amateur.",
  },
  toxicity: {
    level: "Aucune toxicité majeure couramment signalée",
    summary:
      "Une plante décorative à manipuler comme une fougère, sans usage alimentaire domestique.",
    details:
      "Les sources horticoles consultées ne signalent pas de danger spécifique majeur. Cela ne constitue pas une invitation à consommer la plante ; gardez spores, fibres et produits de traitement hors de portée des enfants et animaux.",
  },
  problems: [
    {
      title: "Frondes brunes ou crispées",
      cause:
        "Sécheresse de la motte ou du stipe, vent sec, air chauffé, soleil trop intense ou dégâts du froid.",
      advice:
        "Contrôlez l’humidité en profondeur, abritez du vent et rétablissez progressivement une ambiance fraîche sans détremper la couronne.",
    },
    {
      title: "Jeunes crosses qui sèchent",
      cause:
        "Déshydratation du cœur pendant la croissance, gel tardif ou rupture brutale d’arrosage.",
      advice:
        "Maintenez le stipe et la motte régulièrement frais pendant la pousse et protégez la couronne des gelées tardives.",
    },
    {
      title: "Cœur mou ou odeur anormale",
      cause:
        "Humidité froide enfermée dans la couronne, protection hivernale non respirante ou pourriture.",
      advice:
        "Retirez le matériau détrempé, aérez, mettez à l’abri des pluies froides et demandez un diagnostic avant tout traitement.",
    },
    {
      title: "Croissance très lente",
      cause:
        "Rythme naturel, plante encore jeune, manque d’eau en été, faible lumière ou système racinaire en reprise.",
      advice:
        "N’augmentez pas brutalement l’engrais. Stabilisez lumière filtrée, humidité et température sur une saison complète.",
    },
    {
      title: "Taches, cochenilles ou limaces",
      cause:
        "Ravageurs opportunistes ou lésions favorisées par une atmosphère confinée et des tissus fragilisés.",
      advice:
        "Inspectez revers des frondes, rachis et cœur ; retirez manuellement les ravageurs identifiés et améliorez l’aération sans assécher.",
    },
  ],
  comparisons: [
    {
      name: "Cyathea cooperi",
      difference:
        "Croissance généralement plus rapide, stipe et frondes d’aspect différent, et tolérance au froid souvent moindre ; son stipe n’a pas le même manteau dense de racines fibreuses.",
    },
    {
      name: "Dicksonia fibrosa",
      difference:
        "Espèce néo-zélandaise distincte, souvent entourée d’une jupe persistante de vieilles frondes ; le nom Dicksonia antarctica Hook.f. lui a été appliqué autrefois mais n’est pas le nom du taxon australien de Labillardière.",
    },
    {
      name: "Palmier",
      difference:
        "Un palmier est une plante à graines et fleurs ; Dicksonia produit des spores sur les frondes et son stipe n’est pas un tronc ligneux classique.",
    },
  ],
  faq: [
    {
      question: "Dicksonia antarctica est-elle un palmier ?",
      answer:
        "Non. C’est une fougère arborescente de l’ordre des Cyatheales. Elle ne produit ni fleurs ni graines, mais des spores ; son stipe fibreux est très différent du tronc d’un palmier.",
    },
    {
      question: "Peut-elle rester dehors à Lille ?",
      answer:
        "Un sujet bien installé peut rester dehors dans un emplacement très abrité avec une protection hivernale sérieuse, mais aucune température ne garantit l’absence de dégâts. En pot, les racines sont nettement plus exposées et un lieu hors gel reste plus prudent.",
    },
    {
      question: "Faut-il arroser le tronc ?",
      answer:
        "Pendant la croissance et par temps sec, le stipe fibreux gagne à être humidifié doucement en complément de la motte. Évitez toutefois de remplir la couronne, surtout par temps froid, car l’eau stagnante peut favoriser la pourriture.",
    },
    {
      question: "Pourquoi les frondes deviennent-elles brunes ?",
      answer:
        "Sécheresse, vent, soleil brûlant, air chauffé ou froid peuvent brunir les frondes. Une ancienne fronde peut aussi finir naturellement son cycle ; examinez d’abord le cœur et l’humidité de la motte.",
    },
    {
      question: "Comment protéger le cœur en hiver ?",
      answer:
        "Rassemblez sans serrer les anciennes frondes si elles sont saines, puis placez dans la couronne un matériau sec, isolant et respirant. Protégez de la pluie froide sans enfermer l’humidité et retirez progressivement la protection au printemps.",
    },
    {
      question: "Peut-elle vivre en pot ?",
      answer:
        "Oui, dans un grand contenant stable, percé et protégé des surchauffes comme du gel. Le substrat doit rester frais mais respirant, et le pot nécessite une surveillance plus régulière qu’une plantation en pleine terre.",
    },
    {
      question: "Quelle est sa vitesse de croissance ?",
      answer:
        "Elle est lente et très variable. Kew indique environ 1 à 10 cm de stipe par an selon les conditions ; une jeune plante consacre longtemps son énergie aux racines et aux frondes avant de former une hauteur visible.",
    },
    {
      question: "Faut-il couper les anciennes frondes ?",
      answer:
        "Coupez uniquement les frondes entièrement sèches ou réellement endommagées, proprement près de leur base sans blesser le cœur. Les frondes encore vertes nourrissent la plante et peuvent contribuer à la protection hivernale.",
    },
  ],
  tibaldoAdvice: [
    "Choisissez d’abord un emplacement abrité du vent : l’humidité ne compense pas une exposition qui déchire et dessèche les frondes.",
    "En été, arrosez la motte en profondeur puis humidifiez le stipe par ruissellement doux. Ne versez pas systématiquement un seau dans le cœur.",
    "Pour l’hiver, privilégiez plusieurs couches respirantes et contrôlables plutôt qu’un emballage plastique étanche qui emprisonne la condensation.",
    "En pot à Lille, protégez aussi le contenant : les racines subissent le froid bien avant celles d’un sujet établi en pleine terre.",
    "Retirez les protections par étapes au printemps et gardez un voile disponible tant que les gelées tardives restent possibles.",
  ],
  localSpotlight: {
    title: "Cultiver Dicksonia antarctica à Lille et dans le Nord",
    text: "À Lille, installez-la dans une cour, un patio ou contre un mur protégé des vents d’est et du soleil brûlant, en ombre lumineuse ou mi-ombre. La pluie ne suffit pas toujours en été : contrôlez la motte et le stipe pendant les périodes sèches. L’hiver humide et venteux impose une protection prudente de la couronne, éventuellement du stipe, et surtout du pot. Un microclimat urbain abrité aide mais ne remplace jamais la surveillance des épisodes de gel durable.",
  },
  editorialSections: [
    {
      id: "culture-exterieur",
      eyebrow: "Jardin humide et abrité",
      title: "La cultiver dehors sans simplifier le climat.",
      paragraphs: [
        "En pleine terre, choisissez un sol profond, humifère et drainant qui reste frais en été. Une cuvette d’arrosage légère et un paillage organique limitent les à-coups, sans accumuler de matière contre la couronne.",
        "Le feuillage supporte une lumière plus forte lorsque l’air et le sol restent humides, mais l’ombre lumineuse protège mieux les jeunes frondes. Les murs surchauffés, les couloirs de vent et les sols gorgés d’eau en hiver sont à éviter.",
      ],
      points: [
        "Abriter des vents froids et desséchants",
        "Garder la zone racinaire fraîche en été",
        "Ne pas enterrer la couronne",
        "Prévoir l’hivernage avant la plantation",
      ],
    },
    {
      id: "culture-pot",
      eyebrow: "Terrasse, serre froide ou véranda",
      title: "Une culture en pot plus mobile, mais plus vulnérable.",
      paragraphs: [
        "Le pot facilite le déplacement vers un abri lumineux hors gel, mais il expose la motte aux variations rapides de température et d’humidité. Choisissez un contenant lourd, percé, proportionné au stipe et surélevé pour assurer l’écoulement.",
        "En été, le volume limité sèche vite ; en hiver, il peut rester froid et saturé. Ajustez donc les apports au poids du pot et protégez les parois pendant les épisodes froids.",
      ],
      points: [
        "Stabilité mécanique avant le volume décoratif",
        "Drainage libre sans soucoupe pleine",
        "Surveillance estivale rapprochée",
        "Hors gel lumineux pour les situations exposées",
      ],
    },
    {
      id: "hivernage",
      eyebrow: "Rusticité RHS H3",
      title: "Protéger la couronne sans enfermer l’humidité.",
      paragraphs: [
        "La classe H3 de la RHS décrit une plante rustique dans des régions côtières ou relativement douces, mais nécessitant une protection dans les zones froides. Elle ne constitue pas une promesse liée à une température unique.",
        "Avant les fortes gelées, placez un isolant sec et respirant autour du cœur, protégez le stipe si l’exposition le justifie et couvrez temporairement des pluies froides. Vérifiez régulièrement que la protection reste sèche. Au printemps, aérez puis retirez progressivement les couches afin d’éviter condensation et échauffement.",
      ],
      points: [
        "Durée du gel et vent comptent autant que le minimum",
        "Un jeune sujet et un pot sont plus vulnérables",
        "Jamais de plastique étanche contre le cœur",
        "Surveiller les gelées tardives après déballage",
      ],
    },
  ],
  gallery: [
    {
      src: "/images/botanical-heroes/prototypes/dicksonia-prototype.svg",
      alt: "Illustration botanique de Dicksonia antarctica avec stipe et couronne de frondes",
      caption: "Silhouette botanique de la fougère arborescente, utilisée comme repère éditorial.",
      width: 760,
      height: 620,
    },
  ],
  seo: {
    title: "Dicksonia antarctica : entretien, rusticité et hivernage",
    description:
      "Guide complet de Dicksonia antarctica : lumière, arrosage du stipe, culture en pot ou dehors, rusticité H3 et protection hivernale à Lille.",
    keywords: [
      "Dicksonia antarctica",
      "fougère arborescente de Tasmanie",
      "Dicksonia antarctica entretien",
      "Dicksonia antarctica rusticité",
      "hivernage fougère arborescente",
    ],
  },
  sources: [
    {
      label: "Kew Science — Plants of the World Online",
      url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:17082540-1/general-information",
    },
    {
      label: "World Flora Online — Dicksonia antarctica Labill.",
      url: "https://www.worldfloraonline.org/taxon/wfo-0001257053",
    },
    {
      label: "Royal Horticultural Society — hardiness H3",
      url: "https://www.rhs.org.uk/plants/pdfs/agm-lists/agm-ornamentals.pdf",
    },
    {
      label: "Australian National Botanic Gardens — Growing Native Plants",
      url: "https://www.anbg.gov.au/gnp/interns-2003/dicksonia-antarctica.html",
    },
  ],
  publishedAt: "2026-08-20",
  updatedAt: "2026-08-20",
};
