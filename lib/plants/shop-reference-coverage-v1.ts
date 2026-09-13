import type { PlantEntry } from "./types";
import { encyclopediaV19ExpansionPlants } from "./encyclopedia-v19-expansion.ts";

// Editorial forms only. No product, stock, price or Shop write is performed here.
const date = "2026-09-13";
const parent = (slug: string): PlantEntry => {
  const found = encyclopediaV19ExpansionPlants.find(p => p.genre === "alocasia" && p.slug === slug);
  if (!found) throw new Error(`Missing canonical Alocasia parent: ${slug}`);
  return found;
};
const cultureSources = [
  { label: "RHS — culture des Alocasia en intérieur", url: "https://www.rhs.org.uk/plants/alocasia/growing-guide" },
  { label: "NC State Extension — Alocasia, précautions et culture", url: "https://plants.ces.ncsu.edu/plants/alocasia/" },
  { label: "UF/IFAS — Alocasia, formes horticoles et morphologie", url: "https://ask.ifas.ufl.edu/publication/FP033/pdf" },
];

function form(base: PlantEntry, overrides: Partial<PlantEntry>): PlantEntry {
  const p = { ...base, ...overrides };
  return {
    ...p,
    showSources: true,
    gallery: [],
    mediaNeeds: [{ role: "Portrait documentaire", description: `Photographie du sujet identifié ${p.displayName}, avec provenance et droits documentés.` }],
    specimen: { observedHeight: "Aucune mesure de spécimen publiée", note: "Dimensions indicatives en culture, et non mesures d’un sujet du Studio. Les repères d’ambiance ne sont pas des seuils de survie." },
    editorialSections: [
      ...(p.editorialSections ?? []),
      { id: "multiplication", eyebrow: "Multiplier", title: "Garder la bonne identité", paragraphs: [p.care.propagation, "Conservez le nom et la provenance avec chaque division. Une feuille détachée sans point de croissance ne constitue pas une nouvelle plante."] },
    ],
    publishedAt: date,
    updatedAt: date,
  };
}

const micholitziana = parent("micholitziana");
const frydek = form(micholitziana, {
  slug: "frydek-variegata", botanicalName: "Alocasia micholitziana — Frydek Variegata", displayName: "Frydek Variegata",
  subtitle: "Le velours de micholitziana, ponctué de secteurs blancs et verts.",
  taxonomy: { ...micholitziana.taxonomy, cultivar: null, commonNames: ["Alocasia Frydek Variegata", "Alocasia micholitziana panaché", "Variegated Frydek"] },
  filters: { ...micholitziana.filters, variegated: true, adultSizeCm: 90, growthRate: "lente" },
  origin: "Forme horticole d’Alocasia micholitziana, espèce des Philippines ; origine de sélection non établie.",
  habitat: "La forme panachée cultivée n’a pas d’aire sauvage propre documentée. Elle conserve les besoins d’une plante tropicale de lumière filtrée.",
  hybridization: "Frydek Variegata est ici une appellation horticole, pas une variété botanique décrite. UF/IFAS documente une forme panachée de micholitziana sous ce nom. La RHS signale en revanche que Frydek est un nom mal appliqué à certaines plantes vertes ; aucun enregistrement de cultivar précis n’est déduit de l’étiquette.",
  synonyms: [],
  description: ["De grandes zones blanches ou crème interrompent le vert du limbe velouté. Les nervures claires restent distinctes de cette panachure irrégulière : une micholitziana verte à nervures blanches n’est pas, pour cette seule raison, Frydek Variegata.", "La répartition des couleurs varie d’une feuille à l’autre. Cette fiche décrit la forme horticole proposée sous ce nom, sans attribuer un clone, une obtention ou une rareté commerciale à un lot non documenté."],
  growth: { adultSize: "Environ 60 à 90 cm de hauteur et de largeur dans les repères horticoles UF/IFAS ; le sujet en pot peut rester plus petit.", speed: "Variable, souvent progressive en intérieur", habit: "Touffe terrestre dressée ; pas de tuteur grimpant nécessaire" },
  care: { ...micholitziana.care, difficulty: 4, lightText: "Placez-la près d’une fenêtre lumineuse avec une lumière filtrée. N’exposez pas brutalement les secteurs clairs au soleil brûlant pour tenter d’augmenter la panachure.", propagation: "Séparez un rejet ou un corme viable en croissance, avec racines si possible. La multiplication végétative conserve la filiation, mais ne garantit pas la quantité de blanc sur chaque nouvelle feuille. Le semis ne garantit pas la même panachure." },
  editorialSections: [{ id: "feuillage", eyebrow: "Observer", title: "Nervures claires ou vraie panachure ?", paragraphs: ["Les secteurs clairs occupent des portions du limbe, tandis que les nervures suivent un réseau régulier. Regardez plusieurs feuilles et conservez l’étiquette : le nom Frydek est utilisé de façons différentes dans le commerce.", "Sur un jeune sujet, les feuilles sont plus petites. Leur développement ne justifie pas une fiche juvénile séparée. Il n’existe pas de proportion de blanc promise à maturité."] }],
  comparisons: [{ name: "Alocasia micholitziana", difference: "Le cadre botanique de la forme panachée ; des nervures claires seules ne caractérisent pas Variegata." }, { name: "Alocasia ‘Silver Dragon’", difference: "Son effet argenté et son relief ne correspondent pas aux grands secteurs blancs de Frydek Variegata." }],
  faq: [
    { question: "Frydek Variegata est-il une espèce ?", answer: "Non. Cette fiche traite une forme horticole panachée de micholitziana. Elle ne crée ni espèce ni variété botanique supplémentaire." },
    { question: "Frydek vert et Frydek Variegata sont-ils interchangeables ?", answer: "Non pour un lien produit précis. Le nom Frydek a plusieurs usages horticoles ; la panachure et la traçabilité doivent correspondre au sujet vendu." },
    { question: "Une feuille très blanche annonce-t-elle les suivantes ?", answer: "Non. Évaluez les nouvelles feuilles successives, sans garantir une proportion de panachure ni stimuler la couleur par un excès d’engrais." },
    { question: "Peut-elle rester dehors à Lille ?", answer: "Ce n’est pas une plante rustique pour l’hiver lillois. Privilégiez une pièce chaude, lumineuse et sans courant d’air froid." },
  ],
  sources: [...micholitziana.sources.slice(0, 1), ...cultureSources, { label: "RHS — micholitziana Maxkowskii et usage du nom Frydek vert", url: "https://www.rhs.org.uk/plants/522690/alocasia-micholitziana-maxkowskii/details" }],
  seo: { title: "Alocasia Frydek Variegata : identité et entretien", description: "Reconnaître la forme panachée de micholitziana : velours, secteurs blancs, lumière, arrosage et multiplication du Frydek Variegata.", keywords: ["Alocasia Frydek Variegata", "micholitziana panaché"] },
});

const baginda = parent("baginda");
const silver = form(baginda, {
  slug: "silver-dragon", botanicalName: "Alocasia ‘Silver Dragon’", displayName: "Silver Dragon",
  subtitle: "Un feuillage argenté en relief, traversé de nervures vert sombre.",
  taxonomy: { ...baginda.taxonomy, species: "Rattachement spécifique non confirmé", cultivar: "Silver Dragon", commonNames: ["Alocasia Silver Dragon", "Alocasia baginda Silver Dragon — usage horticole"] },
  filters: { ...baginda.filters, adultSizeCm: 100, variegated: true, regions: ["Horticulture"] },
  origin: "Sélection horticole ; origine précise non documentée ici.",
  habitat: "Pas d’aire sauvage attribuée à la sélection. La culture en intérieur demande chaleur, lumière filtrée et racines aérées.",
  hybridization: "La RHS répertorie Alocasia ‘Silver Dragon’ au niveau du genre, avec un statut de nom non résolu. Le rattachement commercial fréquent à baginda n’est pas transformé ici en certitude taxonomique ni en synonyme de l’espèce.",
  synonyms: [],
  description: ["Les feuilles larges et épaisses donnent une impression d’écailles. Les plages argentées contrastent avec un réseau vert foncé, davantage qu’avec les taches blanches irrégulières d’une Alocasia panachée de type Frydek.", "Silver Dragon est une sélection horticole documentée, non une nouvelle espèce sauvage. Sa fiche reste distincte de baginda et de Dragon Scale afin de ne pas confondre des étiquettes commerciales proches."],
  growth: { adultSize: "Souvent autour de 50 cm ; la RHS indique une plage adulte de 0,5 à 1 m. Le contenant et les conditions modifient l’encombrement.", speed: "Progressive selon les conditions de culture", habit: "Touffe terrestre dressée ; pas une liane à palisser" },
  care: { ...baginda.care, temperature: "Cultivez au chaud, au-dessus de 15 °C ; évitez les courants d’air froid. Une ambiance de 18 à 28 °C est un repère pratique, non une garantie de croissance.", propagation: "Divisez une touffe ou séparez un rejet avec un point de croissance viable pendant la reprise végétative. Conservez le nom Silver Dragon avec les divisions ; le semis ne garantit pas les caractères de la sélection." },
  editorialSections: [{ id: "feuillage", eyebrow: "Observer", title: "Un relief qui se lit avec la lumière", paragraphs: ["Comparez des feuilles déployées plutôt qu’une pousse encore pliée. L’éclairage et l’âge de la feuille modifient l’impression argentée ; une photographie très contrastée ne suffit pas à identifier un cultivar.", "Les petites plantes grandissent en touffe. Le passage à un feuillage plus ample ne correspond ni à un changement d’espèce ni à une étape grimpante."] }],
  comparisons: [{ name: "Alocasia baginda", difference: "Espèce souvent associée aux noms Dragon Scale et Silver Dragon ; cette proximité commerciale n’efface pas les identités horticoles." }, { name: "Frydek Variegata", difference: "Feuillage velouté à secteurs blancs irréguliers, plutôt qu’un relief argenté parcouru de nervures sombres." }],
  faq: [
    { question: "Silver Dragon est-il le nom d’une espèce ?", answer: "Non. La RHS emploie Alocasia ‘Silver Dragon’ et indique un nom non résolu. La fiche conserve ce niveau horticole sans inventer de parentage." },
    { question: "Silver Dragon et Dragon Scale sont-ils la même référence ?", answer: "Ne les substituez pas automatiquement. Les noms servent à distinguer des présentations horticoles ; conservez celui porté par la plante." },
    { question: "Le feuillage argenté signifie-t-il qu’il manque d’engrais ?", answer: "Pas à lui seul : l’aspect argenté fait partie de la description de Silver Dragon. Une décoloration récente se juge avec l’état des racines, de la motte et des autres feuilles." },
    { question: "Faut-il un grand pot ?", answer: "Non. Choisissez un pot percé proportionné aux racines ; un grand volume de mélange humide n’accélère pas une petite plante." },
  ],
  sources: [...cultureSources, { label: "RHS — Alocasia Silver Dragon, description et statut du nom", url: "https://www.rhs.org.uk/plants/372019/alocasia-silver-dragon-v/details" }],
  seo: { title: "Alocasia Silver Dragon : identité, relief et entretien", description: "Comprendre Silver Dragon : feuillage argenté, nom horticole, lumière filtrée, arrosage, substrat et différences avec baginda et Frydek.", keywords: ["Alocasia Silver Dragon", "Silver Dragon entretien"] },
});

const cuprea = parent("cuprea");
const red = form(cuprea, {
  slug: "red-secret", botanicalName: "Alocasia cuprea ‘Red Secret’", displayName: "Red Secret",
  subtitle: "Des feuilles cuivrées et lustrées, au revers rouge sombre.",
  taxonomy: { ...cuprea.taxonomy, cultivar: "Red Secret", commonNames: ["Alocasia Red Secret"] },
  filters: { ...cuprea.filters, adultSizeCm: 100, temperatureMin: 18 },
  origin: "Sélection horticole associée à Alocasia cuprea, espèce de Bornéo ; origine de sélection non établie.",
  habitat: "Pas d’aire sauvage propre à Red Secret ; le milieu naturel de cuprea ne prouve pas la provenance d’une plante cultivée.",
  hybridization: "La RHS répertorie Alocasia cuprea ‘Red Secret’, avec Alocasia ‘Red Secret’ comme synonyme horticole, mais son statut de nom reste non résolu. Cette fiche conserve l’appellation sans revendiquer une obtention enregistrée ni un croisement connu.",
  synonyms: ["Alocasia ‘Red Secret’"],
  description: ["Les limbes ovales, brillants et marqués de nervures creusées changent de teinte en se développant. Les jeunes feuilles rougeâtres laissent place à un mélange de vert sombre et de bronze cuivré ; le revers reste rouge foncé.", "Une cuprea métallique n’est pas automatiquement une Red Secret. La forme est documentée séparément pour respecter le nom horticole ; l’identification d’un sujet reste liée à son étiquette et à sa provenance."],
  growth: { adultSize: "Autour de 80 cm dans la description RHS, avec une plage indicative de 0,5 à 1 m ; dimensions variables en pot.", speed: "Progressive dans une ambiance chaude et stable", habit: "Touffe terrestre dressée, sans besoin de support grimpant" },
  care: { ...cuprea.care, temperature: "Conservez une ambiance chaude, au-dessus de 18 °C selon le conseil RHS pour Red Secret. Évitez le contact avec une vitre froide et les courants d’air.", propagation: "Séparez un rejet ou divisez une touffe en croissance, en gardant un point de croissance viable. Étiquetez chaque division ; un semis de cuprea ne garantit pas la sélection Red Secret." },
  editorialSections: [{ id: "feuillage", eyebrow: "Observer", title: "Le cuivre n’est pas une étiquette", paragraphs: ["Observez l’évolution d’une feuille après son déploiement. La couleur dépend de son âge et de l’éclairage : une teinte rouge isolée ne démontre pas à elle seule le nom Red Secret.", "Les jeunes sujets ont des feuilles plus petites, mais restent dans la même identité horticole. Aucun changement de nom ou de fiche n’est nécessaire lorsqu’ils prennent du volume."] }],
  comparisons: [{ name: "Alocasia cuprea", difference: "L’espèce botanique constitue le cadre de Red Secret ; une photo générique de cuprea ne prouve pas cette sélection." }, { name: "Alocasia ‘Silver Dragon’", difference: "Silhouette argentée et nervures sombres, différente du registre cuivré et rouge de Red Secret." }],
  faq: [
    { question: "Red Secret est-il une espèce distincte de cuprea ?", answer: "Non. C’est un nom horticole rattaché à cuprea par la RHS, qui le conserve avec un statut nomenclatural non résolu." },
    { question: "Toutes les cuprea sont-elles des Red Secret ?", answer: "La fiche ne fait pas cette assimilation. Conservez l’identité exacte fournie avec la plante plutôt que de déduire un nom de la brillance d’une feuille." },
    { question: "Les feuilles restent-elles toujours rouges ?", answer: "Non. Leur teinte évolue après le déploiement ; le dessus peut devenir vert sombre et cuivré. Le rouge du revers ne signifie pas qu’il faut davantage d’engrais." },
    { question: "Peut-on arroser selon un calendrier fixe ?", answer: "Mieux vaut contrôler la motte. Sa vitesse de séchage varie avec la température, les racines, le pot et la lumière ; videz toujours l’eau résiduelle." },
  ],
  sources: [...cuprea.sources.slice(0, 1), ...cultureSources, { label: "RHS — Alocasia cuprea Red Secret, nom et caractères", url: "https://www.rhs.org.uk/plants/504110/alocasia-cuprea-red-secret/details" }],
  seo: { title: "Alocasia Red Secret : cuprea, feuillage et entretien", description: "La sélection horticole Red Secret : identité liée à cuprea, feuilles cuivrées, chaleur, arrosage, rempotage et multiplication.", keywords: ["Alocasia Red Secret", "Alocasia cuprea Red Secret"] },
});

export const shopReferencePlants: PlantEntry[] = [frydek, silver, red];

// Add legitimate contextual links without changing indexed titles, URLs or media.
export function applyShopReferenceContext(entries: PlantEntry[]): PlantEntry[] {
  return entries.map(p => {
    const children: Record<string, PlantEntry> = { micholitziana: frydek, baginda: silver, cuprea: red };
    const child = children[p.slug];
    if (p.genre === "alocasia" && child) return { ...p, updatedAt: date, comparisons: [...p.comparisons, { name: child.displayName, difference: `Consulter ${child.displayName} pour distinguer cette appellation horticole du cadre de l’espèce.` }] };
    if (p.genre === "monstera" && p.slug === "dubia") return { ...p, updatedAt: date, faq: [...p.faq, { question: "Dubia Juvenile est-il une autre espèce ?", answer: "Non. Juvenile décrit le stade de croissance de Monstera dubia. Les petites feuilles plaquées au support et le feuillage plus développé relèvent de la même espèce : une seule fiche canonique suffit." }] };
    if (p.genre === "monstera" && p.slug === "obliqua") return { ...p, updatedAt: date, faq: [...p.faq, { question: "Que signifie Obliqua Peru ?", answer: "Peru est employé comme précision horticole ou géographique. La présente fiche documente Monstera obliqua au niveau de l’espèce, pas un cultivar formel Peru. Ce complément ne prouve ni une collecte péruvienne ni l’identité d’un clone ; conservez la provenance du lot séparément. Ne pas confondre avec Monstera karstenianum, également vendu sous le nom Peru." }] };
    return p;
  });
}
