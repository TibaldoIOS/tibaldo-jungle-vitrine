import type { PlantEntry } from "./types";
import { requestedPlants } from "./requested-plants.ts";

const base = requestedPlants.find(p => p.genre === "monstera" && p.slug === "deliciosa");
if (!base) throw new Error("Missing canonical Monstera deliciosa");

// Owner commercial identity, 2026-09-13. Not proof of a clone or cultivar.
export const deliciosaVariegata: PlantEntry = {
  ...base,
  slug: "deliciosa-variegata",
  botanicalName: "Monstera deliciosa — Variegata",
  displayName: "Deliciosa Variegata",
  listingName: "Deliciosa Variegata · forme panachée",
  subtitle: "Une Monstera deliciosa panachée, sans lui attribuer un cultivar par défaut.",
  taxonomy: { ...base.taxonomy, cultivar: null, commonNames: ["Monstera deliciosa Variegata", "Monstera deliciosa panachée"] },
  filters: { ...base.filters, variegated: true, collection: true, growthRate: "moyenne", adultSizeCm: 300 },
  origin: "Forme horticole de Monstera deliciosa, espèce originaire du Mexique au Panama ; origine de sélection non établie.",
  habitat: "Le nom commercial Variegata ne désigne pas une population sauvage. L’espèce est une liane tropicale qui s’appuie sur les arbres pour gagner la lumière.",
  hybridization: "Variegata désigne ici une forme horticole panachée commercialisée sous ce nom. Ce n’est ni un nouveau taxon botanique ni l’affirmation d’un cultivar enregistré. Le nom seul ne démontre pas une identité Albo, Thai Constellation, Mint ou Aurea, ni un mécanisme génétique précis.",
  synonyms: [],
  description: [
    "Cette fiche accompagne l’appellation commerciale Monstera deliciosa Variegata. Elle décrit une deliciosa à feuillage panaché, sans promettre une couleur, un motif uniforme ou la filiation d’une sélection nommée.",
    "Les feuilles portent des plages de coloration différentes du vert dominant. Leur répartition peut varier selon les pousses ; l’étiquette Variegata ne permet pas à elle seule de prévoir les feuilles suivantes. Gardez le nom et la provenance du sujet plutôt que de l’identifier d’après une seule photographie.",
    "Le développement reste celui de Monstera deliciosa : feuilles juvéniles peu découpées, puis limbes plus amples avec découpes et perforations lorsque la plante mûrit dans de bonnes conditions. L’âge, la lumière et le support comptent autant que le dessin de la panachure.",
  ],
  specimen: { observedHeight: "Dimensions variables en culture", note: "Repères horticoles, sans mesure ni photographie attribuée à un spécimen du Studio." },
  growth: { adultSize: "En intérieur, souvent 2 à 3 m avec un support ; davantage est possible si l’espace et les conditions le permettent. Ce n’est pas une taille garantie pour cette appellation.", speed: "Variable selon le sujet, la lumière et la proportion de tissus verts", habit: "Liane grimpante à racines aériennes ; prévoir un support stable" },
  care: {
    ...base.care,
    difficulty: 3,
    difficultyText: "Accessible avec une bonne lumière et un arrosage attentif ; la panachure ne dispense pas d’observer les racines.",
    lightText: "Lumière vive filtrée, près d’une fenêtre. Les formes panachées demandent généralement davantage de lumière que les sujets verts ; évitez un passage brutal au soleil brûlant.",
    watering: "Arrosez abondamment lorsque le quart à un tiers supérieur du mélange a séché, puis laissez égoutter. Adaptez la fréquence au pot, à la saison et aux racines, sans calendrier rigide.",
    humidityText: "Une humidité intérieure modérée et stable convient généralement. Éloignez la plante des radiateurs et gardez une bonne circulation d’air ; ne compensez pas l’air sec par une motte constamment détrempée.",
    temperature: "Visez une ambiance chaude d’environ 18 à 28 °C, à l’abri du gel et des courants d’air froid. Ce sont des repères de culture, non des seuils de résistance propres à un clone.",
    substrate: "Mélange organique aéré et drainant pour aroïdes : terreau structuré, écorce et fraction grossière, dans un contenant percé. Ajustez la rétention d’eau à votre intérieur.",
    repotting: "Au printemps ou en croissance, rempotez si les racines ont colonisé le pot. Choisissez un contenant légèrement plus grand et installez le support sans comprimer les racines.",
    fertilizing: "Apportez un engrais complet pendant la croissance, selon la notice du produit, sur une motte déjà humide. Réduisez quand la croissance ralentit ; aucun engrais ne garantit la panachure.",
    propagation: "Bouturez une portion de tige portant un nœud et un bourgeon viable, ou pratiquez un marcottage aérien. Une feuille avec son pétiole seul ne suffit pas. La multiplication végétative conserve la filiation, sans promettre le motif futur ; le semis ne garantit pas la même forme panachée.",
  },
  comparisons: [
    { name: "Monstera deliciosa", href: "/plantes/monstera/deliciosa", difference: "Le cadre botanique de cette forme commerciale, indépendamment de sa panachure." },
    { name: "Albo Variegata", href: "/plantes/monstera/albo-variegata", difference: "Une appellation distincte : le mot Variegata seul ne justifie pas cette attribution." },
    { name: "Thai Constellation", href: "/plantes/monstera/thai-constellation", difference: "Une sélection nommée à documenter séparément ; elle n’est pas déduite d’une étiquette générique." },
    { name: "Mint", href: "/plantes/monstera/mint", difference: "Un autre nom horticole, non interchangeable avec le nom commercial Variegata." },
  ],
  faq: [
    { question: "Variegata est-il une espèce ou un cultivar précis ?", answer: "L’espèce est Monstera deliciosa. Ici, Variegata est une appellation horticole commerciale pour une forme panachée ; aucun statut de cultivar formel n’est affirmé." },
    { question: "Est-ce forcément une Albo, une Thai Constellation, une Mint ou une Aurea ?", answer: "Non. Ces noms ne sont pas substitués à Variegata. Il faut une provenance spécifique pour rattacher une plante à une sélection nommée." },
    { question: "La panachure est-elle garantie stable ?", answer: "Pas sur la seule base de cette appellation. Observez les nouvelles pousses ; nous ne déduisons ni un mécanisme génétique ni une quantité de couleur garantie du nom commercial." },
    { question: "Pourquoi les jeunes feuilles ont-elles peu de trous ?", answer: "La forme juvénile de deliciosa est moins découpée. Maturité, bonne lumière et support favorisent un feuillage plus ample ; cela ne définit pas une autre variété." },
    { question: "Faut-il un tuteur ?", answer: "Oui, un support solide accompagne son port grimpant. Fixez la tige sans serrer les pétioles et laissez les racines aériennes s’orienter vers le support." },
    { question: "Comment réagir à une zone claire qui brunit ?", answer: "Contrôlez l’exposition, le séchage de la motte et les apports d’engrais. Une zone abîmée ne redevient pas verte ; stabilisez les conditions avant d’intervenir davantage." },
  ],
  tibaldoAdvice: ["Conservez l’étiquette et la provenance avec les boutures.", "Suivez plusieurs feuilles successives avant de conclure sur la panachure.", "Prévoyez ensemble l’emplacement lumineux, le pot et le support."],
  editorialSections: [
    { id: "identite", eyebrow: "Nommer", title: "Un nom commercial, pas une identité inventée", paragraphs: ["La RHS documente également des plantes sous le nom Variegata. Cet usage horticole ne suffit pas à rattacher chaque plante ainsi vendue à une même sélection. Ici, l’identité est volontairement conservée au niveau de la forme commerciale de deliciosa."] },
    { id: "maturite", eyebrow: "Observer", title: "Panachure et maturité, deux lectures différentes", paragraphs: ["Les découpes du limbe traduisent le développement de la plante ; les plages de couleur relèvent de sa panachure. Une petite feuille entière peut donc appartenir à la même plante qu’une grande feuille fenêtrée."] },
    { id: "multiplication", eyebrow: "Multiplier", title: "Un nœud, une filiation, aucune promesse de motif", paragraphs: ["Bouturage de tige et marcottage s’appuient sur un point de croissance viable. Gardez la traçabilité de la plante mère et ne renommez pas la descendance d’après la couleur d’une seule feuille."] },
  ],
  gallery: [],
  mediaNeeds: [{ role: "Portrait documentaire", description: "Sujet commercialisé comme Monstera deliciosa Variegata, identifié avec provenance correspondante. Ne pas substituer une photo Albo, Thai, Mint ou Aurea." }],
  showSources: true,
  sources: [
    { label: "NC State Extension — Monstera deliciosa, développement et culture", url: "https://plants.ces.ncsu.edu/plants/monstera-deliciosa/" },
    { label: "RHS — culture des Monstera", url: "https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants" },
    { label: "RHS — usage horticole du nom Variegata, sans identification du sujet commercial", url: "https://www.rhs.org.uk/plants/90394/monstera-deliciosa-variegata-v/details" },
  ],
  seo: { title: "Monstera deliciosa Variegata : forme panachée et entretien", description: "Comprendre Monstera deliciosa Variegata sans la confondre avec Albo, Thai ou Mint : identité, feuillage, lumière, arrosage, support et bouturage.", keywords: ["Monstera deliciosa Variegata", "Monstera panachée entretien"] },
  publishedAt: "2026-09-13", updatedAt: "2026-09-13",
};

export function applyVariegataContext(entries: PlantEntry[]): PlantEntry[] {
  return [...entries.map(p => p.genre === "monstera" && ["deliciosa", "albo-variegata"].includes(p.slug)
    ? { ...p, comparisons: [...p.comparisons, { name: "Deliciosa Variegata", href: "/plantes/monstera/deliciosa-variegata", difference: "La forme commerciale générique panachée, sans attribution automatique à un cultivar nommé." }], updatedAt: "2026-09-13" }
    : p), deliciosaVariegata];
}
