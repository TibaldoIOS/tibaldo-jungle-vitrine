import type { Level, PlantEntry, PlantFilters } from "./types";

type Genus = "monstera" | "anthurium" | "alocasia";

type LicensedImage = {
  src: string;
  alt: string;
  caption: string;
  creator: string;
  license: string;
  sourceUrl: string;
};

type SpeciesDraft = {
  slug: string;
  genre: Genus;
  botanicalName: string;
  taxonomyName?: string;
  displayName: string;
  subtitle: string;
  origin: string;
  habitat: string;
  status: string;
  commonNames: string[];
  synonyms?: string[];
  description: [string, string];
  morphology: string;
  adultSize: string;
  adultSizeCm: number;
  habit: PlantFilters["habits"];
  growthRate?: PlantFilters["growthRate"];
  difficulty: Level;
  humidity?: Level;
  water?: Level;
  lightText: string;
  watering: string;
  temperature: string;
  careFocus: string;
  comparison: { name: string; difference: string };
  sources: PlantEntry["sources"];
  image?: LicensedImage;
};

const publishedAt = "2026-08-28";
const placeholder = "/photo-reelle-a-venir.svg";
const creditsRegistry = "/credits-images";

const powo = (name: string) => ({
  label: `Kew Science — Plants of the World Online · ${name}`,
  url: `https://powo.science.kew.org/results?q=${encodeURIComponent(name)}`,
});

const supportingSource: Record<Genus, PlantEntry["sources"][number]> = {
  monstera: {
    label: "International Aroid Society — A revision of Monstera (Madison)",
    url: "https://www.aroid.org/genera/monstera/Madison_Monstera_Rec.pdf",
  },
  anthurium: {
    label: "International Aroid Society — genre Anthurium",
    url: "https://www.aroid.org/genera/anthurium/anthsections14.html",
  },
  alocasia: {
    label: "International Aroid Society — genre Alocasia",
    url: "https://www.aroid.org/genera/alocasia/ias-expo-about",
  },
};

const licensedImage = (image: LicensedImage): PlantEntry["gallery"][number] => ({
  src: image.src,
  alt: image.alt,
  caption: image.caption,
  width: 1200,
  height: 1500,
  license: {
    status: "verified",
    creator: image.creator,
    license: image.license,
    sourceUrl: image.sourceUrl,
    registryPath: creditsRegistry,
    note: "Fichier déjà présent dans le dépôt et crédit déjà publié dans le registre d’images.",
  },
});

const mediaGap = (draft: SpeciesDraft): PlantEntry["gallery"][number] => ({
  src: placeholder,
  alt: `Illustration botanique décorative de ${draft.taxonomyName ?? draft.botanicalName}`,
  caption: `Média non documentaire : aucune photographie de ${draft.taxonomyName ?? draft.botanicalName} n’est actuellement vérifiée dans le registre du dépôt.`,
  width: 1200,
  height: 1500,
  license: {
    status: "media-gap",
    registryPath: creditsRegistry,
    note: "Placeholder existant ; ne pas le traiter comme une preuve d’identification botanique.",
  },
});

function makeSpecies(draft: SpeciesDraft): PlantEntry {
  const genusLabel = draft.genre[0].toUpperCase() + draft.genre.slice(1);
  const isMonstera = draft.genre === "monstera";
  const isAnthurium = draft.genre === "anthurium";
  const isGiantAlocasia = draft.slug === "macrorrhizos" || draft.slug === "odora";
  const image = draft.image ? licensedImage(draft.image) : mediaGap(draft);
  const humidity = draft.humidity ?? (isAnthurium ? 4 : 3);
  const water = draft.water ?? 3;
  const substrate = isAnthurium
    ? "Mélange fin mais très aéré : écorces calibrées, fibre ou terreau structuré et fraction minérale, dans un pot percé."
    : isMonstera
      ? "Mélange d’aroïdes structuré et drainant, riche en matière organique, dans un pot percé ; support vertical stable pour les formes grimpantes."
      : "Mélange organique aéré et drainant qui reste légèrement frais en croissance, sans eau stagnante autour du corme.";
  const filters: PlantFilters = {
    temperatureMin: 15,
    temperatureIdeal: [18, 28],
    humidityIdeal: isAnthurium ? [60, 80] : [55, 80],
    light: "vive",
    watering: water >= 4 ? "régulier" : "modéré",
    substrateTags: ["aroïdes", "aéré", "drainant", "pot percé"],
    growthRate: draft.growthRate ?? "moyenne",
    habits: draft.habit,
    adultSizeCm: draft.adultSizeCm,
    needsSupport: draft.habit.includes("grimpant"),
    variegated: false,
    collection: true,
    flowering: true,
    petToxic: true,
    humanToxic: true,
    regions: [draft.origin],
  };

  return {
    slug: draft.slug,
    genre: draft.genre,
    genreLabel: genusLabel,
    botanicalName: draft.botanicalName,
    displayName: draft.displayName,
    subtitle: draft.subtitle,
    family: "Araceae",
    taxonomy: {
      order: "Alismatales",
      family: "Araceae",
      genus: genusLabel,
      species: draft.taxonomyName ?? draft.botanicalName,
      cultivar: null,
      commonNames: draft.commonNames,
    },
    filters,
    origin: draft.origin,
    habitat: draft.habitat,
    hybridization: draft.status,
    synonyms: draft.synonyms ?? [],
    description: draft.description,
    specimen: {
      observedHeight: "Aucune mesure locale publiée",
      note: "Les dimensions indiquées dans la fiche décrivent l’espèce d’après les sources ; elles ne sont pas présentées comme une observation du Studio.",
    },
    growth: {
      adultSize: draft.adultSize,
      speed: draft.growthRate === "rapide" ? "Rapide en phase chaude et lumineuse" : "Moyenne, variable avec la lumière et la chaleur",
      habit: draft.habit.join(" et "),
    },
    care: {
      light: 4,
      water,
      humidity,
      difficulty: draft.difficulty,
      lightText: draft.lightText,
      watering: draft.watering,
      humidityText: humidity >= 4
        ? "Humidité assez élevée, mais toujours accompagnée d’une circulation d’air douce."
        : "Humidité domestique stable à modérée ; éviter le souffle direct du chauffage.",
      temperature: draft.temperature,
      substrate,
      repotting: isGiantAlocasia
        ? "Rempoter quand le contenant devient instable ou densément raciné ; prévoir un pot lourd, percé et proportionné."
        : "Rempoter lorsque les racines occupent le contenant, sans surdimensionner le nouveau pot.",
      fertilizing: "Apport modéré et régulier pendant la croissance active, sur un substrat déjà humide ; suspendre si la plante ralentit nettement.",
      propagation: isMonstera
        ? "Bouture de tige portant au moins un nœud viable ; conserver la traçabilité du taxon ou du clone."
        : isAnthurium
          ? "Division d’un sujet à plusieurs points de croissance ou semis frais correctement identifié."
          : "Séparation prudente des rejets ou division du corme lorsque la plante est en croissance active.",
    },
    toxicity: {
      level: "toxique",
      summary: "À tenir hors de portée des enfants, chats et chiens.",
      details: "Comme les autres Araceae, les tissus contiennent des cristaux d’oxalate de calcium irritants en cas de mastication ou d’ingestion.",
    },
    problems: [
      { title: "Jaunissement", cause: "Excès d’eau, lumière insuffisante, froid ou sénescence d’une ancienne feuille.", advice: "Contrôler l’état des racines et le rythme de séchage avant de modifier la fertilisation." },
      { title: "Bords secs", cause: "Arrosages irréguliers, air très sec, sels accumulés ou soleil brutal.", advice: "Stabiliser la culture et évaluer les nouvelles feuilles plutôt qu’une lésion ancienne." },
      { title: "Croissance bloquée", cause: "Température basse, lumière insuffisante, racines abîmées ou adaptation saisonnière.", advice: draft.careFocus },
      { title: "Parasites", cause: "Thrips, acariens ou cochenilles peuvent se loger dans les jeunes feuilles.", advice: "Isoler, inspecter le revers du feuillage et traiter selon le parasite réellement observé." },
    ],
    comparisons: [draft.comparison],
    faq: [
      { question: `Comment reconnaître ${draft.taxonomyName ?? draft.botanicalName} ?`, answer: draft.morphology },
      { question: "Quel point de culture surveiller en priorité ?", answer: draft.careFocus },
      { question: "La taille adulte est-elle garantie en intérieur ?", answer: "Non. Le support, la lumière, la chaleur, le volume racinaire et la durée de culture modifient fortement les dimensions obtenues en pot." },
      { question: "Cette fiche prouve-t-elle la présence de l’espèce au Studio ?", answer: "Non. La fiche documente une identité botanique ; disponibilité, provenance d’un lot et identification d’un spécimen doivent être vérifiées séparément." },
      { question: "Faut-il un pot percé ?", answer: "Oui. L’eau excédentaire doit pouvoir quitter entièrement le contenant après l’arrosage." },
    ],
    tibaldoAdvice: [draft.careFocus, "Conserver l’étiquette et la provenance : une apparence juvénile ou une forme horticole ne suffit pas toujours à confirmer l’espèce.", "Observer les racines et la vitesse de séchage avant d’augmenter l’arrosage."],
    mediaNeeds: draft.image ? undefined : [{
      role: "Photographie documentaire principale",
      description: `Média manquant : photographie correctement identifiée de ${draft.taxonomyName ?? draft.botanicalName}, avec provenance et licence vérifiables.`,
    }],
    gallery: [image],
    seo: {
      title: `${draft.taxonomyName ?? draft.botanicalName} : entretien et identification`,
      description: `${draft.subtitle} Taxonomie, critères d’identification, lumière, arrosage et substrat.`,
      keywords: [`${draft.taxonomyName ?? draft.botanicalName} entretien`, `${draft.displayName} identification`, `${genusLabel} culture`],
    },
    sources: draft.sources,
    publishedAt,
    updatedAt: publishedAt,
  };
}

const drafts: SpeciesDraft[] = [
  {
    slug: "dubia", genre: "monstera", botanicalName: "Monstera dubia", displayName: "Monstera dubia",
    subtitle: "Une Monstera à phase juvénile plaquée contre le support, très différente de son feuillage adulte.",
    origin: "Mexique tropical à Amérique du Sud et Trinidad", habitat: "Liane des forêts tropicales humides de basse altitude, montant étroitement sur les troncs.",
    status: "Espèce acceptée par Plants of the World Online.", commonNames: ["Shingle plant", "Monstera dubia"],
    description: ["Le stade juvénile applique ses feuilles petites et imbriquées contre l’écorce, comme des tuiles. Ce comportement de « shingling » est un caractère de croissance, pas un manque d’eau.", "Sur un support assez large et avec la maturité, le limbe devient beaucoup plus grand ; il peut rester entier puis devenir pinnatifide et perforé. Tous les individus ne suivent pas exactement la même séquence."],
    morphology: "Chercher une tige grimpante étroitement appliquée au support et des feuilles juvéniles dissymétriques, imbriquées ; les adultes peuvent devenir profondément divisées et perforées.",
    adultSize: "Liane de plusieurs mètres ; feuilles adultes pouvant approcher 1 m dans la nature", adultSizeCm: 300, habit: ["grimpant", "hémiépiphyte"], difficulty: 3,
    lightText: "Lumière vive filtrée ; une lumière trop faible prolonge le stade juvénile et espace les nœuds.", watering: "Arroser après séchage superficiel, sans laisser le support ni la motte durablement saturés.", temperature: "Idéalement 18 à 28 °C ; éviter les nuits froides et une motte humide sous 15 °C.",
    careFocus: "Le support est déterminant : offrir tôt une surface verticale large, stable et légèrement texturée sans attacher les limbes contre la paroi.", comparison: { name: "Rhaphidophora korthalsii", difference: "Autre « shingle plant » souvent confondu ; l’identification ne doit pas reposer sur le seul port plaqué juvénile." },
    sources: [powo("Monstera dubia"), supportingSource.monstera],
  },
  {
    slug: "siltepecana", genre: "monstera", botanicalName: "Monstera siltepecana", displayName: "Monstera siltepecana",
    subtitle: "Une espèce mésoaméricaine au feuillage juvénile argenté dont la silhouette change avec la maturité.",
    origin: "Mexique méridional à Amérique centrale", habitat: "Liane de forêt tropicale humide et de forêt de montagne, grimpant sur des supports vivants.",
    status: "Espèce acceptée par Plants of the World Online.", commonNames: ["Silver Monstera", "Monstera argentée"],
    description: ["Les feuilles juvéniles sont entières, allongées, vert bleuté à argenté entre des nervures plus sombres. Cette apparence horticole familière n’est pas la morphologie finale de l’espèce.", "En grimpant, la plante produit des feuilles plus grandes ; les sujets adultes perdent une partie de l’aspect argenté et peuvent développer des perforations près de la nervure centrale."],
    morphology: "Associer les plages argentées juvéniles, les nervures vert sombre et le port grimpant ; confirmer sur des feuilles successives, car le stade adulte change fortement.",
    adultSize: "Liane de plusieurs mètres ; limbes adultes nettement plus grands que les feuilles vendues", adultSizeCm: 250, habit: ["grimpant", "hémiépiphyte"], difficulty: 2,
    lightText: "Lumière vive indirecte pour conserver des entre-nœuds courts et accompagner le passage au feuillage adulte.", watering: "Laisser sécher les premiers centimètres, puis arroser à fond et égoutter.", temperature: "18 à 27 °C, avec une croissance ralentie sous 16 °C.",
    careFocus: "Ne pas diagnostiquer la disparition des plages argentées comme une carence : la maturation du limbe modifie naturellement le dessin.", comparison: { name: "Monstera dubia", difference: "Dubia développe typiquement une phase juvénile plaquée en tuiles contre le support, plus marquée que chez siltepecana." },
    sources: [powo("Monstera siltepecana"), supportingSource.monstera],
  },
  {
    slug: "obliqua", genre: "monstera", botanicalName: "Monstera obliqua", displayName: "Monstera obliqua",
    subtitle: "Une espèce variable aux limbes minces, beaucoup plus rare en culture que son nom ne le laisse croire.",
    origin: "Trinidad à Amérique tropicale du Sud", habitat: "Petite liane de sous-bois tropical humide, souvent sur des supports bas et dans une atmosphère stable.",
    status: "Espèce acceptée par Plants of the World Online ; le nom est fréquemment mal appliqué dans le commerce.", commonNames: ["Monstera obliqua"],
    description: ["Monstera obliqua n’est pas définie par des feuilles « presque entièrement trouées ». L’espèce est variable : ses limbes très minces peuvent être entiers ou porter une série de perforations.", "Les inflorescences produites en groupes nombreux et plusieurs caractères de pétiole, de tige et de limbe séparent l’espèce des formes commerciales d’adansonii. Une photo isolée ne suffit pas à valider une obliqua."],
    morphology: "Examiner un limbe membraneux et dissymétrique, puis croiser tige, pétiole, provenance et, si disponible, inflorescence ; la quantité de trous seule n’est pas diagnostique.",
    adultSize: "Petite liane ; feuilles généralement plus fines et modestes que celles de grandes Monstera", adultSizeCm: 150, habit: ["grimpant", "hémiépiphyte"], growthRate: "lente", difficulty: 5, humidity: 5,
    lightText: "Lumière douce mais généreuse, très filtrée ; le limbe mince marque rapidement sous un soleil direct.", watering: "Maintenir une humidité régulière sans anoxie racinaire ; éviter les alternances extrêmes de détrempage et dessèchement.", temperature: "Chaleur stable, idéalement 20 à 27 °C, sans courant d’air froid.",
    careFocus: "Priorité à l’identification et à la stabilité : refuser l’étiquette « obliqua » si elle ne repose que sur une feuille très perforée.", comparison: { name: "Monstera adansonii", difference: "Adansonii, bien plus courante, porte un limbe généralement plus épais ; le commerce lui applique souvent à tort le nom obliqua." },
    sources: [powo("Monstera obliqua"), supportingSource.monstera],
  },
  {
    slug: "pinnatipartita", genre: "monstera", botanicalName: "Monstera pinnatipartita", displayName: "Monstera pinnatipartita",
    subtitle: "Une liane andine dont les feuilles adultes se divisent profondément jusqu’au voisinage de la nervure.",
    origin: "Costa Rica à ouest de l’Amérique du Sud tropicale", habitat: "Liane de forêt tropicale humide, notamment de zones montagnardes, montant vers la lumière.",
    status: "Espèce acceptée par Plants of the World Online.", commonNames: ["Monstera pinnatipartita"],
    description: ["Les jeunes feuilles sont entières et peuvent ressembler à plusieurs autres Monstera. À maturité, les incisions partent du bord et s’approchent fortement de la nervure centrale.", "Ce caractère pinnatifide diffère d’un limbe surtout perforé. Un support vertical, du temps et une lumière suffisante sont nécessaires avant de juger la morphologie adulte."],
    morphology: "Sur un sujet mature, rechercher des divisions profondes partant du bord plutôt qu’une série dominante de trous internes.",
    adultSize: "Grande liane ; feuillage adulte ample sur un support durable", adultSizeCm: 300, habit: ["grimpant", "hémiépiphyte"], difficulty: 3,
    lightText: "Lumière vive filtrée, avec un support vertical dès le stade juvénile.", watering: "Arroser après séchage partiel du mélange ; humidifier le support sans maintenir la base du pot détrempée.", temperature: "18 à 27 °C ; éviter le froid humide.",
    careFocus: "Ne pas promettre des feuilles divisées sur un jeune plant : la maturité dépend du support, de la lumière et de la continuité de croissance.", comparison: { name: "Monstera subpinnata", difference: "Subpinnata produit une division en segments plus nettement séparés ; l’observation de plusieurs feuilles adultes est nécessaire." },
    sources: [powo("Monstera pinnatipartita"), supportingSource.monstera],
  },
  {
    slug: "standleyana", genre: "monstera", botanicalName: "Monstera standleyana", displayName: "Monstera standleyana",
    subtitle: "Une Monstera grimpante à feuilles entières, souvent rencontrée sous des formes horticoles panachées.",
    origin: "Costa Rica à nord-ouest de la Colombie", habitat: "Liane de forêt tropicale humide, fixée aux troncs et supports verticaux.",
    status: "Espèce acceptée par Plants of the World Online ; les panachures commerciales demandent un nom de cultivar séparé.", commonNames: ["Monstera standleyana", "Five holes plant (nom commercial ambigu)"],
    description: ["L’espèce porte des limbes elliptiques à lancéolés qui restent entiers, sans les grandes fenestrations attendues chez d’autres Monstera. Le port grimpant et l’articulation foliaire restent ceux d’une aroïde lianescente.", "Les plantes mouchetées de crème sont des formes horticoles : la panachure ne définit pas l’espèce et ne doit pas être ajoutée à une fiche sans étiquette fiable."],
    morphology: "Rechercher une liane à feuilles entières, étroites et alternes ; ne pas utiliser la seule panachure comme critère d’espèce.",
    adultSize: "Liane de plusieurs mètres ; feuillage allongé restant entier", adultSizeCm: 250, habit: ["grimpant", "hémiépiphyte"], difficulty: 2,
    lightText: "Lumière vive indirecte ; les formes panachées, documentées séparément, demandent assez de lumière sans soleil brûlant.", watering: "Laisser sécher légèrement le mélange entre deux arrosages complets.", temperature: "18 à 27 °C ; protéger des courants froids.",
    careFocus: "Installer un support pour limiter les entre-nœuds ; conserver séparément toute information de cultivar ou de panachure.", comparison: { name: "Philodendron ‘Cobra’", difference: "Nom commercial parfois appliqué à une Monstera standleyana panachée ; il ne transforme pas la plante en Philodendron." },
    sources: [powo("Monstera standleyana"), supportingSource.monstera],
  },
  {
    slug: "crystallinum", genre: "anthurium", botanicalName: "Anthurium crystallinum", displayName: "Anthurium crystallinum",
    subtitle: "Un Anthurium de Panama et de Colombie aux feuilles veloutées parcourues de nervures claires.",
    origin: "Panama à Colombie", habitat: "Sous-arbrisseau épiphyte du biome tropical humide.", status: "Espèce acceptée par Plants of the World Online.",
    commonNames: ["Anthurium cristallin", "Crystal anthurium"], synonyms: ["Anthurium killipianum"],
    description: ["Les feuilles cordiformes, sombres et veloutées sont structurées par des nervures argentées qui gagnent en contraste à mesure que le limbe durcit.", "La nouvelle feuille est souple et vulnérable aux chocs. Une humidité élevée n’autorise pas un substrat compact : ses racines ont besoin d’air."],
    morphology: "Croiser le limbe cordiforme velouté, les nervures claires et la forme du pétiole ; la couleur seule ne distingue pas toutes les espèces de la section Cardiolonchium.",
    adultSize: "Sous-arbrisseau compact à moyen ; limbes de plusieurs dizaines de centimètres", adultSizeCm: 90, habit: ["épiphyte", "dressé"], difficulty: 3, humidity: 4,
    lightText: "Lumière vive diffuse ; protéger les feuilles veloutées d’un soleil direct chaud.", watering: "Arroser quand la surface commence à sécher, en gardant le cœur du mélange aéré.", temperature: "19 à 27 °C, avec stabilité nocturne.",
    careFocus: "Protéger les nouvelles feuilles jusqu’à leur durcissement et ne jamais compenser un air sec par une motte saturée.", comparison: { name: "Anthurium magnificum", difference: "Magnificum est notamment associé à des pétioles adultes nettement quadrangulaires ou ailés ; une jeune feuille seule peut prêter à confusion." },
    sources: [powo("Anthurium crystallinum"), supportingSource.anthurium],
    image: { src: "/media/anthurium-crystallinum-feuille.jpg", alt: "Feuille cordiforme veloutée et nervurée d’Anthurium crystallinum", caption: "Anthurium crystallinum · photographie documentaire déjà créditée dans le dépôt", creator: "David J. Stang", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Anthurium_crystallinum_6zz.jpg" },
  },
  {
    slug: "magnificum", genre: "anthurium", botanicalName: "Anthurium magnificum Linden", taxonomyName: "Anthurium magnificum", displayName: "Anthurium magnificum",
    subtitle: "Une espèce colombienne aux feuilles veloutées et aux pétioles adultes anguleux.",
    origin: "Colombie andine", habitat: "Sous-arbrisseau épiphyte du biome tropical humide, signalé dans les Andes colombiennes.",
    status: "Anthurium magnificum Linden est une espèce acceptée par Plants of the World Online.", commonNames: ["Anthurium magnificum"], synonyms: ["Anthurium sanderi"],
    description: ["Le limbe adulte est cordiforme, coriace à velouté, avec des nervures plus pâles. Les pétioles portent plusieurs angles et peuvent paraître presque carrés en coupe.", "Le nom d’auteur Linden distingue ici le nom accepté d’un homonyme publié par W. Bull, rattaché par Kew à Anthurium grande."],
    morphology: "Confirmer un pétiole adulte à quatre angles ou étroitement ailé, puis croiser forme du limbe, nervation et provenance ; ne pas conclure depuis une plantule.",
    adultSize: "Sous-arbrisseau moyen ; limbes adultes souvent autour de 30 à 40 cm selon les descriptions", adultSizeCm: 110, habit: ["épiphyte", "dressé"], difficulty: 4, humidity: 4,
    lightText: "Lumière vive tamisée, sans rayonnement chaud sur le velours foliaire.", watering: "Maintenir une humidité régulière après léger séchage de surface, avec un drainage très rapide.", temperature: "18 à 26 °C ; éviter les écarts brusques.",
    careFocus: "Attendre un pétiole et un limbe adultes avant de trancher entre magnificum, crystallinum et leurs hybrides horticoles.", comparison: { name: "Anthurium crystallinum", difference: "Le pétiole de crystallinum est généralement plus arrondi ; magnificum développe des angles ou ailes beaucoup plus diagnostiques à maturité." },
    sources: [
      { label: "Kew Science — Anthurium magnificum Linden", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:85054-1/general-information" },
      supportingSource.anthurium,
    ],
  },
  {
    slug: "forgetii", genre: "anthurium", botanicalName: "Anthurium forgetii", displayName: "Anthurium forgetii",
    subtitle: "Un Anthurium colombien dont le pétiole rejoint le limbe sans sinus basal largement ouvert.",
    origin: "Colombie", habitat: "Sous-arbrisseau du biome tropical humide andin.", status: "Espèce acceptée par Plants of the World Online ; distincte des hybrides horticoles qui utilisent forgetii comme parent.",
    commonNames: ["Anthurium forgetii"],
    description: ["La feuille est peltée : le pétiole s’insère légèrement à l’intérieur du limbe, ce qui ferme la base au lieu de former le sinus en cœur visible chez beaucoup d’Anthurium veloutés.", "Les appellations « dark form » ou les croisements avec ‘Silver Blush’ ne sont pas des synonymes de l’espèce. Ils doivent conserver leur identité horticole séparée."],
    morphology: "Observer la base arrondie presque fermée et l’insertion peltée du pétiole ; confirmer avec plusieurs feuilles et l’étiquette d’origine.",
    adultSize: "Sous-arbrisseau compact à moyen ; limbes décrits autour de 25 à 36 cm", adultSizeCm: 80, habit: ["dressé"], difficulty: 3, humidity: 4,
    lightText: "Lumière vive diffuse pour conserver un port compact sans brûler le velours.", watering: "Arroser après un léger ressuyage du mélange ; ne pas laisser sécher les racines fines à cœur.", temperature: "19 à 27 °C, sans air froid sur les nouvelles feuilles.",
    careFocus: "Ne pas fusionner l’espèce avec les formes sombres ou les hybrides : documenter séparément le parent botanique et le croisement.", comparison: { name: "Anthurium forgetii dark form × ‘Silver Blush’", difference: "Le croisement déjà documenté dans l’encyclopédie est une descendance horticole, pas un synonyme ni une forme garantie de l’espèce." },
    sources: [
      { label: "Kew Science — Anthurium forgetii N.E.Br.", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:15285-2/general-information" },
      supportingSource.anthurium,
    ],
  },
  {
    slug: "papillilaminum", genre: "anthurium", botanicalName: "Anthurium papillilaminum", displayName: "Anthurium papillilaminum",
    subtitle: "Une espèce panaméenne terrestre aux limbes mats et veloutés, souvent utilisée comme parent d’hybrides.",
    origin: "Panama", habitat: "Sous-arbrisseau terrestre du biome tropical humide.", status: "Espèce acceptée par Plants of the World Online ; distincte des nombreux clones et croisements horticoles abrégés « papi ».",
    commonNames: ["Anthurium papillilaminum", "Papi (abréviation horticole ambiguë)"],
    description: ["Les feuilles sont ovales à étroitement ovales, lobées à la base, mates et densément papillaires, ce qui contribue à leur aspect velouté.", "Le marché emploie « papi » pour l’espèce, des clones et des parents de croisements. Sans traçabilité, la couleur sombre ou la forme du sinus ne suffit pas à attribuer un clone."],
    morphology: "Croiser surface mate densément papillaire, limbe lobé, pétiole et provenance ; une teinte sombre n’est pas un caractère suffisant.",
    adultSize: "Sous-arbrisseau moyen ; limbes décrits autour de 25 à 43 cm", adultSizeCm: 100, habit: ["terrestre", "dressé"], difficulty: 4, humidity: 4,
    lightText: "Lumière vive et diffuse, avec protection des nouvelles feuilles sombres.", watering: "Conserver le mélange légèrement frais mais riche en air ; laisser la surface ressuyer entre les apports.", temperature: "20 à 28 °C, avec chaleur stable et ventilation douce.",
    careFocus: "Maintenir une traçabilité stricte : espèce, clone et hybride ne doivent jamais être interchangeables dans l’étiquette ou la fiche.", comparison: { name: "Anthurium papillilaminum × ‘Dark Phoenix’", difference: "Ce croisement horticole a un second parent nommé ; il ne doit pas être catalogué comme l’espèce papillilaminum pure." },
    sources: [
      { label: "Kew Science — Anthurium papillilaminum Croat", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:272342-2/general-information" },
      supportingSource.anthurium,
    ],
  },
  {
    slug: "cuprea", genre: "alocasia", botanicalName: "Alocasia cuprea", displayName: "Alocasia cuprea",
    subtitle: "Une Alocasia de Bornéo au limbe métallique cuivré, épais et fortement nervuré.",
    origin: "Bornéo", habitat: "Herbe terrestre de forêt tropicale humide, sur sol riche et drainé.", status: "Espèce acceptée par Plants of the World Online.",
    commonNames: ["Alocasia miroir", "Mirror plant"],
    description: ["Les feuilles épaisses et presque plastifiées reflètent des tons cuivre, bronze et vert sombre selon l’angle. Les nervures enfoncées donnent au limbe un relief marqué.", "Cette surface métallique est propre à l’espèce et ne justifie pas l’emploi du nom commercial ‘Red Secret’ sans étiquette de cultivar ou de sélection."],
    morphology: "Rechercher un limbe épais, ovale à sagitté, au reflet cuivre métallique et aux nervures profondément imprimées.",
    adultSize: "Alocasia compacte à moyenne, souvent sous 1 m en culture", adultSizeCm: 80, habit: ["terrestre", "dressé"], growthRate: "lente", difficulty: 3, humidity: 4,
    lightText: "Lumière vive filtrée ; le soleil direct chaud marque rapidement le limbe métallique.", watering: "Laisser la surface ressuyer, puis arroser sans remplir durablement le cache-pot.", temperature: "20 à 28 °C ; éviter le froid humide.",
    careFocus: "Surveiller le corme et le pétiole : une plante compacte demande moins d’eau qu’une grande Alocasia à croissance rapide.", comparison: { name: "Alocasia azlanii", difference: "Azlanii peut aussi montrer des reflets irisés, mais présente un réseau de nervures colorées et une morphologie distincte." },
    sources: [powo("Alocasia cuprea"), supportingSource.alocasia],
    image: { src: "/media/alocasia-cuprea-feuillage.jpg", alt: "Feuille métallique cuivrée et nervurée d’Alocasia cuprea", caption: "Alocasia cuprea · photographie documentaire déjà créditée dans le dépôt", creator: "Frank Schulenburg", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Alocasia_cuprea_(portrait_orientation).jpg" },
  },
  {
    slug: "zebrina", genre: "alocasia", botanicalName: "Alocasia zebrina", displayName: "Alocasia zebrina",
    subtitle: "Une espèce philippine reconnaissable à ses longs pétioles rayés de bandes sombres.",
    origin: "Philippines", habitat: "Herbe terrestre de forêt tropicale humide sur l’île de Luçon.", status: "Espèce acceptée par Plants of the World Online.",
    commonNames: ["Alocasia zébrée", "Zebra alocasia"],
    description: ["Le dessin zébré appartient au pétiole, tandis que le limbe reste vert, sagitté et relativement simple. L’intérêt botanique ne se réduit donc pas à une panachure de feuille.", "Des sélections réticulées circulent en horticulture ; elles ne doivent pas être ajoutées au nom de l’espèce sans documentation de cultivar."],
    morphology: "Identifier les bandes irrégulières brun sombre sur les pétioles et les limbes verts sagittés ; écarter une coloration due à des lésions.",
    adultSize: "Alocasia moyenne à grande, environ 1 à 1,5 m selon les conditions", adultSizeCm: 150, habit: ["terrestre", "dressé"], growthRate: "rapide", difficulty: 3,
    lightText: "Lumière vive indirecte pour soutenir les longs pétioles sans brûler les feuilles.", watering: "Arroser régulièrement en croissance après ressuyage de surface, puis espacer si la plante ralentit.", temperature: "19 à 28 °C, sans courant froid.",
    careFocus: "Tourner progressivement le pot et offrir assez de lumière : les longs pétioles se déséquilibrent vite vers une fenêtre unique.", comparison: { name: "Alocasia ‘Sarian’", difference: "‘Sarian’ est un hybride horticole au limbe plus denté ; il ne doit pas être traité comme synonyme de zebrina." },
    sources: [powo("Alocasia zebrina"), supportingSource.alocasia],
  },
  {
    slug: "reginula", genre: "alocasia", botanicalName: "Alocasia reginula", displayName: "Alocasia reginula",
    subtitle: "Une petite Alocasia sombre aux nervures blanches, connue en horticulture par la sélection ‘Black Velvet’.",
    origin: "Bornéo", habitat: "Petite herbe terrestre du biome tropical humide.", status: "Espèce acceptée par Plants of the World Online ; ‘Black Velvet’ est une appellation horticole à conserver séparément.",
    commonNames: ["Black Velvet alocasia", "Alocasia velours noir"],
    description: ["Le limbe compact est presque noir-vert, velouté, avec des nervures primaires et secondaires blanches. Le revers peut être profondément rouge.", "Le nom ‘Black Velvet’ est largement associé à la plante cultivée, mais la fiche d’espèce ne présume pas que chaque reginula appartient à cette sélection."],
    morphology: "Associer port compact, limbe sombre velouté, nervures blanches très contrastées et revers rougeâtre.",
    adultSize: "Espèce compacte, souvent 30 à 45 cm en culture", adultSizeCm: 45, habit: ["terrestre", "dressé"], growthRate: "lente", difficulty: 3, humidity: 3, water: 2,
    lightText: "Lumière vive diffuse ; éviter le soleil chaud sur les feuilles sombres.", watering: "Laisser sécher davantage que pour une grande Alocasia, puis arroser le petit volume racinaire sans le saturer.", temperature: "20 à 28 °C ; très sensible au froid humide.",
    careFocus: "Son petit corme et sa croissance lente rendent le sur-arrosage plus dangereux qu’une brève baisse d’humidité ambiante.", comparison: { name: "Alocasia baginda", difference: "Baginda porte un limbe plus clair, très bullé et pelté, plutôt qu’un velours noir uni à nervures blanches." },
    sources: [powo("Alocasia reginula"), supportingSource.alocasia],
  },
  {
    slug: "micholitziana", genre: "alocasia", botanicalName: "Alocasia micholitziana", displayName: "Alocasia micholitziana",
    subtitle: "Une Alocasia philippine aux feuilles sagittées veloutées et aux nervures pâles.",
    origin: "Philippines", habitat: "Herbe terrestre de forêt tropicale humide de Luçon.", status: "Espèce acceptée par Plants of the World Online ; les noms ‘Frydek’ et les formes panachées relèvent de l’horticulture.",
    commonNames: ["Green Velvet alocasia", "Alocasia velours vert"],
    description: ["Le limbe vert profond est sagitté, mat à velouté, et parcouru de nervures crème. Les lobes basaux et les marges légèrement ondulées donnent une silhouette plus découpée qu’une reginula.", "‘Frydek’ est souvent utilisé comme nom commercial. Une forme panachée doit être documentée comme telle, sans modifier le statut de l’espèce botanique."],
    morphology: "Rechercher un limbe sagitté vert velours, des nervures claires et des lobes basaux bien ouverts, sur une plante plus ample que reginula.",
    adultSize: "Alocasia moyenne, généralement 60 à 100 cm en culture", adultSizeCm: 100, habit: ["terrestre", "dressé"], difficulty: 3, humidity: 4,
    lightText: "Lumière vive indirecte ; protéger le velours des rayons chauds.", watering: "Conserver une légère fraîcheur en croissance après ressuyage superficiel, puis réduire avec le ralentissement saisonnier.", temperature: "19 à 28 °C, loin d’une vitre froide.",
    careFocus: "Inspecter les nouvelles feuilles pour les acariens et les thrips ; leur texture masque parfois le début d’une attaque.", comparison: { name: "Alocasia amazonica", difference: "Amazonica est un hybride horticole à limbe plus luisant et marges fortement découpées, non un synonyme de micholitziana." },
    sources: [powo("Alocasia micholitziana"), supportingSource.alocasia],
  },
  {
    slug: "baginda", genre: "alocasia", botanicalName: "Alocasia baginda", displayName: "Alocasia baginda",
    subtitle: "Une petite espèce de Bornéo au limbe épais, pelté et fortement bullé.",
    origin: "Kalimantan oriental, Bornéo", habitat: "Herbe terrestre compacte de forêt tropicale humide.", status: "Espèce acceptée par Plants of the World Online ; ‘Dragon Scale’ désigne une sélection horticole, pas toute l’espèce.",
    commonNames: ["Dragon Scale alocasia", "Alocasia écaille de dragon"],
    description: ["Le limbe très épais et pelté forme des zones bombées gris vert entre des nervures enfoncées, évoquant une écaille. La plante reste naturellement basse et robuste.", "Les sélections ‘Dragon Scale’ ou ‘Silver Dragon’ ne doivent pas être transformées en synonymes botaniques. Leur aspect et leur nom exigent une traçabilité propre."],
    morphology: "Observer un limbe presque rond à largement ovale, pelté, coriace et bullé, avec des plages grisâtres encadrées par les nervures.",
    adultSize: "Espèce compacte, environ 25 à 40 cm", adultSizeCm: 40, habit: ["terrestre", "dressé"], growthRate: "lente", difficulty: 3, humidity: 3, water: 2,
    lightText: "Lumière vive diffuse, sans soleil direct sur le limbe épais.", watering: "Laisser le dessus du mélange sécher avant un arrosage mesuré ; ne pas garder le petit corme continuellement humide.", temperature: "20 à 28 °C ; éviter absolument la combinaison froid et saturation.",
    careFocus: "Adapter l’arrosage à son faible volume foliaire et à sa croissance lente, même si l’air ambiant est humide.", comparison: { name: "Alocasia melo", difference: "Melo partage une texture épaisse et bullée, mais son limbe et sa nervation diffèrent ; l’origine horticole doit être conservée." },
    sources: [
      { label: "Kew Science — Alocasia baginda Kurniawan & P.C.Boyce", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:60456116-2/general-information" },
      supportingSource.alocasia,
    ],
  },
  {
    slug: "sinuata", genre: "alocasia", botanicalName: "Alocasia sinuata", displayName: "Alocasia sinuata",
    subtitle: "Une espèce philippine compacte aux feuilles brillantes, gaufrées et profondément nervurées.",
    origin: "Philippines", habitat: "Herbe terrestre de forêt tropicale humide, souvent sur sol calcaire ou rocheux bien drainé.", status: "Espèce acceptée par Plants of the World Online.",
    commonNames: ["Quilted Dreams alocasia", "Alocasia gaufrée"],
    description: ["Le limbe vert sombre et luisant est fortement gaufré entre les nervures ; son contour sinueux explique le nom spécifique. La feuille paraît matelassée plutôt que veloutée.", "Cette espèce compacte ne doit pas être illustrée par une photographie générique d’Alocasia : la texture du limbe est un critère central."],
    morphology: "Chercher une feuille compacte, luisante, peltée à sagittée, dont les zones entre nervures forment un gaufrage profond.",
    adultSize: "Espèce compacte, souvent 30 à 60 cm", adultSizeCm: 60, habit: ["terrestre", "dressé"], growthRate: "lente", difficulty: 4, humidity: 4, water: 2,
    lightText: "Lumière vive tamisée, avec bonne aération autour du feuillage gaufré.", watering: "Arroser après ressuyage net de la surface ; le mélange doit évacuer rapidement l’excès.", temperature: "20 à 28 °C, sans refroidissement du pot.",
    careFocus: "Priorité au drainage et à la chaleur du corme ; une forte humidité atmosphérique ne doit pas se traduire par une motte détrempée.", comparison: { name: "Alocasia baginda", difference: "Baginda présente des plages plus gris argenté et un limbe très coriace en écaille ; sinuata est plus verte, brillante et sinueuse." },
    sources: [powo("Alocasia sinuata"), supportingSource.alocasia],
  },
  {
    slug: "longiloba", genre: "alocasia", botanicalName: "Alocasia longiloba", displayName: "Alocasia longiloba",
    subtitle: "Une Alocasia très variable aux longs lobes sagittés, largement distribuée en Asie du Sud-Est.",
    origin: "Asie tropicale continentale à Malésie occidentale", habitat: "Herbe terrestre de sous-bois humide, présente dans des habitats et populations variés.", status: "Espèce acceptée par Plants of the World Online ; complexe morphologique variable qui impose une identification prudente.",
    commonNames: ["Long-lobed alocasia", "Alocasia à longs lobes"],
    description: ["Le limbe sagitté porte un lobe antérieur allongé et des lobes postérieurs étroits. La teinte, la largeur et le contraste des nervures varient entre populations et formes cultivées.", "Cette variabilité a produit de nombreux noms horticoles. La fiche conserve le concept d’espèce sans attribuer automatiquement une provenance ou une forme à une plante de commerce."],
    morphology: "Évaluer la longue pointe, les lobes basaux étroits, le pétiole et la provenance ; ne pas conclure à partir du seul contraste argenté des nervures.",
    adultSize: "Alocasia moyenne à grande, environ 1 à 1,5 m selon la provenance", adultSizeCm: 150, habit: ["terrestre", "dressé"], difficulty: 3, humidity: 4,
    lightText: "Lumière vive filtrée, adaptée à une plante de sous-bois.", watering: "Arroser régulièrement en croissance après léger séchage, puis réduire si la plante entre en repos.", temperature: "18 à 28 °C ; éviter une motte froide et humide.",
    careFocus: "Conserver toute information de provenance : longiloba est variable et une photographie de feuille isolée ne résout pas toujours l’identité.", comparison: { name: "Alocasia watsoniana", difference: "Plusieurs grandes Alocasia sagittées sombres se ressemblent ; pétiole, nervation, revers et provenance doivent être croisés." },
    sources: [powo("Alocasia longiloba"), supportingSource.alocasia],
  },
  {
    slug: "macrorrhizos", genre: "alocasia", botanicalName: "Alocasia macrorrhizos", displayName: "Alocasia macrorrhizos",
    subtitle: "Une oreille d’éléphant géante, largement cultivée sous les tropiques et capable de devenir arborescente.",
    origin: "Malésie à Pacifique occidental, largement cultivée et naturalisée", habitat: "Grande herbe terrestre de zones tropicales humides, lisières et sites anciennement cultivés.", status: "Espèce acceptée par Plants of the World Online ; l’aire observée aujourd’hui est en partie liée à une culture ancienne.",
    commonNames: ["Oreille d’éléphant géante", "Giant taro"], synonyms: ["Alocasia macrorrhiza (orthographe horticole fréquente)"],
    description: ["Le pseudotronc épais porte d’immenses feuilles dressées, avec le pétiole attaché au sinus basal plutôt qu’au centre du limbe. Dans de bonnes conditions, la plante dépasse largement les dimensions d’un appartement.", "L’espèce a été transportée et cultivée depuis longtemps. Une origine géographique d’un spécimen horticole ne doit donc pas être déduite de la seule aire actuelle."],
    morphology: "Observer le très grand port, le pseudotronc, les feuilles sagittées dressées et l’insertion du pétiole au sinus ; comparer l’inflorescence pour séparer les espèces proches.",
    adultSize: "Géante, souvent 3 à 5 m sous climat tropical ; nettement moins en pot", adultSizeCm: 400, habit: ["terrestre", "dressé"], growthRate: "rapide", difficulty: 2, humidity: 3, water: 4,
    lightText: "Lumière très vive à soleil doux après acclimatation ; prévoir beaucoup d’espace autour du feuillage.", watering: "Arrosages généreux en pleine croissance après ressuyage superficiel, fortement réduits en hiver peu lumineux.", temperature: "18 à 30 °C ; aucune exposition au gel.",
    careFocus: "Anticiper le poids et la taille avant rempotage : un petit sujet peut devenir rapidement incompatible avec une pièce étroite.", comparison: { name: "Alocasia odora", difference: "Odora est proche ; l’inflorescence, le port adulte et plusieurs caractères végétatifs sont plus fiables qu’une jeune feuille seule." },
    sources: [powo("Alocasia macrorrhizos"), supportingSource.alocasia],
  },
  {
    slug: "odora", genre: "alocasia", botanicalName: "Alocasia odora", displayName: "Alocasia odora",
    subtitle: "Une grande Alocasia d’Asie orientale tropicale, connue pour une inflorescence odorante.",
    origin: "Chine méridionale à Indochine et archipels voisins", habitat: "Grande herbe terrestre de forêts, lisières et vallons humides subtropicaux à tropicaux.", status: "Espèce acceptée par Plants of the World Online.",
    commonNames: ["Night-scented lily", "Alocasia odorante"],
    description: ["Alocasia odora forme de grandes touffes aux feuilles sagittées vertes. Le nom fait référence à l’odeur de l’inflorescence, caractère qui ne peut pas être évalué sur une jeune plante non fleurie.", "Sa ressemblance avec macrorrhizos et d’autres grandes oreilles d’éléphant rend les étiquettes commerciales parfois incertaines. Le port adulte et la floraison apportent de meilleurs indices."],
    morphology: "Croiser grandes feuilles sagittées, architecture de la touffe, caractères de l’inflorescence et provenance ; le parfum n’est utile que sur une plante en fleur.",
    adultSize: "Grande espèce, souvent 2 à 3 m en conditions favorables", adultSizeCm: 300, habit: ["terrestre", "dressé"], growthRate: "rapide", difficulty: 2, humidity: 3, water: 4,
    lightText: "Lumière très vive filtrée à soleil doux progressif, avec assez d’espace vertical.", watering: "Maintenir une humidité régulière pendant la croissance, puis réduire nettement quand lumière et température baissent.", temperature: "18 à 29 °C ; protéger du gel et des vents froids.",
    careFocus: "Ne pas attribuer l’espèce à une plantule générique : attendre des caractères adultes et conserver la provenance du lot.", comparison: { name: "Alocasia macrorrhizos", difference: "Les deux deviennent très grandes ; l’inflorescence et l’architecture adulte permettent une comparaison plus sûre qu’un limbe juvénile." },
    sources: [
      { label: "Kew Science — Alocasia odora (G.Lodd.) Spach", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:60469948-2" },
      supportingSource.alocasia,
    ],
  },
];

export const encyclopediaV19ExpansionPlants = drafts.map(makeSpecies) satisfies PlantEntry[];

export const encyclopediaV19ExpansionMediaAudit = encyclopediaV19ExpansionPlants.map((plant) => ({
  route: `/plantes/${plant.genre}/${plant.slug}`,
  botanicalName: plant.botanicalName,
  media: plant.gallery[0].src,
  status: plant.gallery[0].license?.status ?? "media-gap",
  note: plant.gallery[0].license?.note ?? "Licence non renseignée",
}));

export const encyclopediaV19TaxonomyAudit = [
  {
    route: "/plantes/monstera/burle-marx-flame",
    label: "Monstera sp. ‘Burle Marx’s Flame’",
    status: "Nom accepté par l’International Aroid Society, taxon non établi.",
  },
  {
    route: "/plantes/monstera/esqueleto",
    label: "Monstera sp. ‘Esqueleto’",
    status: "Nom horticole historique/non établi ; aucune espèce botanique n’est affirmée.",
  },
] as const;

export const v19MediaGapCount = encyclopediaV19ExpansionMediaAudit.filter(({ status }) => status === "media-gap").length;
