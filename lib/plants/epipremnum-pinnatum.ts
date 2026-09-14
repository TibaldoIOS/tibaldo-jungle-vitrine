import type { PlantEntry } from "./types";

// Evidence reviewed 2026-09-14: Kew POWO 87046-1 and NParks 1393.
// Species documentary record only; no cultivar, stock or media identity inferred.
export const epipremnumPinnatum: PlantEntry = {
  slug: "pinnatum", genre: "epipremnum", genreLabel: "Epipremnum",
  botanicalName: "Epipremnum pinnatum", displayName: "Pinnatum", listingName: "Epipremnum pinnatum",
  subtitle: "Une liane dont les feuilles se divisent en gagnant de la hauteur.",
  family: "Araceae",
  taxonomy: { order: "Alismatales", family: "Araceae", genus: "Epipremnum", species: "Epipremnum pinnatum", cultivar: null, commonNames: ["Dragon-tail plant", "Liane queue-de-dragon"] },
  synonyms: ["Pothos pinnatus", "Monstera pinnata", "Rhaphidophora pinnata", "Scindapsus pinnatus"],
  origin: "Asie tropicale et subtropicale jusqu’au Pacifique, incluant le nord de l’Australie, selon Kew.",
  habitat: "Forêts tropicales humides. Les racines aériennes fixent la liane aux troncs et aux surfaces rocheuses.",
  hybridization: "Epipremnum pinnatum est une espèce acceptée par Kew, indépendante d’Epipremnum aureum. Le nom horticole pinnatum 'Aureum' renvoie à aureum dans le traitement RHS ; il ne désigne pas ici un troisième taxon.",
  filters: { temperatureMin: 15, temperatureIdeal: [18, 28], humidityIdeal: [45, 70], light: "vive", watering: "modéré", substrateTags: ["aroïdes", "aéré", "drainant"], growthRate: "moyenne", habits: ["grimpant", "rampant", "épiphyte"], adultSizeCm: 2000, needsSupport: true, variegated: false, collection: false, flowering: true, petToxic: true, humanToxic: true, regions: ["Asie", "Océanie"] },
  description: [
    "Les jeunes feuilles sont entières, de forme elliptique à sagittée. En prenant de la hauteur, la liane développe un feuillage profondément incisé ; de petites ouvertures peuvent aussi apparaître près de la nervure centrale.",
    "Ce changement accompagne la maturité : une petite plante rampante n’a pas le même aspect qu’un sujet installé sur un tronc. Un tuteur aide la progression, sans garantir à lui seul le feuillage adulte dans un appartement.",
    "Aureum peut lui aussi produire de grandes feuilles découpées. Pour distinguer les deux espèces, il faut considérer l’ensemble de la plante et sa provenance, pas seulement compter les trous. Une panachure ne suffit pas non plus à déterminer une sélection nommée."
  ],
  specimen: { observedHeight: "Espèce grimpante", note: "Les dimensions décrivent un potentiel botanique, pas un spécimen mesuré ni une disponibilité au Studio." },
  growth: { adultSize: "Jusqu’à 15–20 m en milieu tropical ; développement limité par l’espace en intérieur", speed: "Variable selon les conditions et le support", habit: "Rampant au stade jeune, puis grimpant par racines aériennes" },
  care: {
    light: 4, water: 2, humidity: 3, difficulty: 2,
    lightText: "Lumière filtrée à mi-ombre lumineuse. En intérieur, acclimatez progressivement et protégez du soleil brûlant derrière une vitre.",
    watering: "En pot, laissez sécher le haut du mélange avant d’arroser puis faites égoutter. Les observations en sol tropical ne justifient pas une soucoupe constamment pleine en appartement.",
    humidityText: "Évitez l’air desséchant des radiateurs. Les valeurs de culture intérieure sont des repères pratiques, pas des seuils botaniques mesurés pour chaque sujet.",
    temperature: "Gardez cette liane tropicale au chaud et hors gel. Une pièce tempérée autour de 18–28 °C constitue un repère de culture ; évitez les courants d’air froid.",
    substrate: "Un mélange structuré et drainant, avec terreau, écorce et fraction minérale, dans un pot percé. Fixez le support sans compacter toute la motte.",
    repotting: "Rempotez lorsque les racines occupent le contenant ; profitez-en pour stabiliser le tuteur sans arracher les racines fixées.",
    fertilizing: "Apport modéré d’engrais en période de croissance selon la notice. Réduisez les apports quand la croissance ralentit.",
    propagation: "Bouture de tige avec un nœud viable. Maintenez le substrat légèrement humide, sans détremper ; une feuille isolée ne remplace pas une portion de tige."
  },
  toxicity: { level: "toxique", summary: "Ne pas ingérer ; tenir hors de portée des enfants et animaux.", details: "NParks signale des cristaux d’oxalate irritants à l’ingestion. Cette fiche ne recommande aucun usage alimentaire ou médicinal." },
  problems: [
    { title: "Feuilles qui restent entières", cause: "Stade juvénile, hauteur de grimpe ou conditions insuffisantes", advice: "Vérifiez l’ancrage et la lumière ; laissez le temps à la liane de mûrir, sans chercher à forcer les découpes avec de l’engrais." },
    { title: "Tige qui se détache du support", cause: "Support instable ou racines encore peu ancrées", advice: "Guidez avec des attaches souples et évitez de repositionner sans cesse une tige en cours d’enracinement." },
    { title: "Jaunissement accompagné d’une motte humide", cause: "Excès d’eau ou racines dégradées à vérifier", advice: "Contrôlez le drainage et les racines avant le prochain arrosage ; une feuille jaune seule ne suffit pas au diagnostic." }
  ],
  comparisons: [{ name: "Epipremnum aureum", href: "/plantes/epipremnum/aureum", difference: "Voir aussi le pothos doré : espèce distincte originaire de Mo’orea, avec des feuilles juvéniles souvent en cœur et marquées de jaune. Le nom pinnatum 'Aureum' est expliqué sur sa fiche." }],
  faq: [
    { question: "Pinnatum devient-il aureum en grandissant ?", answer: "Non : ce sont deux espèces acceptées distinctes. Le passage au feuillage adulte change l’aspect de la liane, pas son identité." },
    { question: "Pourquoi mon pinnatum n’a-t-il pas de découpes ?", answer: "Les jeunes feuilles sont entières. Un support permettant une progression verticale et des conditions favorables aident la maturation ; aucun délai universel n’est garanti." },
    { question: "Faut-il lui donner plus d’eau qu’au pothos doré ?", answer: "Les sources ne justifient pas un calendrier comparatif fixe. En intérieur, adaptez l’arrosage au pot, au mélange, à la lumière et au séchage réel." },
    { question: "Les feuilles trouées prouvent-elles que c’est un pinnatum ?", answer: "Non. Aureum et d’autres lianes peuvent aussi former des découpes. Conservez une identification complète et l’étiquette d’origine plutôt que ce seul indice." }
  ],
  tibaldoAdvice: ["Installez un support stable avant que la liane devienne difficile à déplacer.", "Ne confondez pas une feuille juvénile entière avec une erreur d’espèce.", "Conservez les noms de sélections sans les déduire d’une couleur."],
  gallery: [], mediaNeeds: [{ role: "Portrait documentaire", description: "Epipremnum pinnatum identifié, avec droits documentés ; ne pas substituer une photo d’aureum." }],
  seo: { title: "Epipremnum pinnatum : feuilles découpées et culture sur tuteur", description: "Reconnaître Epipremnum pinnatum : feuilles juvéniles et adultes, origine asiatique et pacifique, support, culture et distinction avec le pothos doré aureum.", keywords: ["Epipremnum pinnatum", "pinnatum feuilles découpées", "pinnatum aureum différence"] },
  sources: [{ label: "Kew — Epipremnum pinnatum, espèce acceptée et distribution", url: "https://powo.science.kew.org/taxon/87046-1" }, { label: "NParks — pinnatum, morphologie, culture et précautions", url: "https://www.nparks.gov.sg/florafaunaweb/flora/1/3/1393" }, { label: "RHS — le nom pinnatum 'Aureum' rattaché à aureum", url: "https://www.rhs.org.uk/plants/91403/epipremnum-aureum/details" }],
  showSources: true, publishedAt: "2026-09-14", updatedAt: "2026-09-14"
};
