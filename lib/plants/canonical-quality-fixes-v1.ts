import type { PlantEntry } from "./types";
import { parentSpecies, plantEntityId } from "./canonical-identity.ts";

const source = (label: string, url: string) => ({ label, url });
const propagation: Record<string, { text: string; source: PlantEntry["sources"][number] }> = {
  "pilea/cadierei": { text: "Boutures de tiges au printemps, avec plusieurs nœuds. Pincez les jeunes pousses pour ramifier la touffe ; une plante dégarnie peut être renouvelée à partir de boutures saines.", source: source("NC State Extension — Pilea cadierei", "https://plants.ces.ncsu.edu/plants/pilea-cadierei/") },
  "aloe/vera": { text: "Séparez un rejet possédant ses propres racines et laissez sécher la blessure avant la reprise des arrosages. La division des rejets est préférable à une tentative avec une feuille isolée.", source: source("NC State Extension — Aloe vera, division et toxicité", "https://plants.ces.ncsu.edu/plants/aloe-vera/") },
  "chlorophytum/comosum": { text: "Enracinez les plantules portées par les hampes, ou divisez une touffe suffisamment développée. Pour une sélection panachée, conservez la provenance ; le semis ne garantit pas ses caractères.", source: source("RHS — culture et multiplication des Chlorophytum", "https://www.rhs.org.uk/plants/spider-plants/growing-guide") },
  "philodendron/gloriosum": { text: "Divisez une tige rampante saine en conservant un nœud et un point de croissance viable. Ne traitez pas le rhizome comme une liane à enrouler sur un tuteur.", source: source("RHS — Philodendron gloriosum", "https://www.rhs.org.uk/plants/12678/philodendron-gloriosum/details") },
  "philodendron/grazielae": { text: "Bouture de tige portant un nœud et un bourgeon viable, dans une ambiance chaude et un mélange aéré. Une feuille séparée de la tige ne suffit pas.", source: source("RHS — culture et bouturage des Philodendron", "https://www.rhs.org.uk/plants/philodendron/growing-guide") },
  "anthurium/regale": { text: "Bouture d’extrémité de tige ou de nœud avec bourgeon viable, en ambiance chaude et aérée. Une feuille seule sans bourgeon ne remplace pas un point de croissance.", source: source("RHS — Anthurium regale", "https://www.rhs.org.uk/plants/188644/anthurium-regale/details") },
  "yucca/rostrata": { text: "Le semis est une méthode documentée pour cette espèce. Les boutures de racines ou de tige sont des opérations plus spécialisées ; ne supposez pas qu’un sujet produira des rejets faciles à diviser.", source: source("NC State Extension — Yucca rostrata", "https://plants.ces.ncsu.edu/plants/yucca-rostrata/") },
  "plumeria/rubra": { text: "Bouture d’extrémité de tige au printemps : laissez sécher la base avant de l’installer dans un milieu d’enracinement. Le semis est possible, mais ne garantit pas la couleur ni le cultivar de la plante mère.", source: source("RHS — Plumeria rubra, repos et boutures", "https://www.rhs.org.uk/plants/94126/plumeria-rubra/details") },
  "monstera/esqueleto": { text: "Bouturez une portion de tige avec nœud et bourgeon viable, ou effectuez un marcottage. Conservez la provenance du clone ; cette multiplication ne résout pas son identité spécifique.", source: source("RHS — culture des Monstera", "https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants") },
  "monstera/burle-marx-flame": { text: "Bouture de tige avec nœud viable ou marcottage d’un sujet sain. Gardez la filiation horticole documentée ; une feuille isolée ne permet pas de conserver le clone.", source: source("RHS — culture des Monstera", "https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants") },
  "colocasia/esculenta-eddo": { text: "Séparez un rejet ou divisez un organe souterrain de réserve en conservant un bourgeon viable. Évitez de laisser les divisions fraîches dans un mélange froid et saturé.", source: source("NC State Extension — Colocasia esculenta", "https://plants.ces.ncsu.edu/plants/colocasia-esculenta/") },
};

export function applyCanonicalQualityFixes(entries: PlantEntry[]): PlantEntry[] {
  return entries.map(original => {
    let p = original;
    const id = plantEntityId(p);
    // Historic records mixed epithets and binomials in the same field.
    // Normalize the representation only; keep every indexed URL/title and name.
    if (/^[a-z][a-z-]+$/.test(p.taxonomy.species)) p = { ...p, taxonomy: { ...p.taxonomy, species: `${p.taxonomy.genus} ${p.taxonomy.species}` } };
    // Unknown is not safe. Do not extrapolate an absence of toxicity from silence.
    if (/à vérifier selon l’espèce/i.test(p.toxicity.level)) p = { ...p, filters: { ...p.filters, petToxic: null, humanToxic: null } };
    if (id === "equisetum/japonicum") p = { ...p, filters: { ...p.filters, flowering: false },
      hybridization: "L’appellation horticole japonicum est conservée dans l’URL historique. Son rattachement infraspécifique et l’identité du sujet restent à confirmer : cette fiche ne démontre pas un taxon distinct.",
      care: { ...p.care, propagation: "Division d’un rhizome portant des pousses viables ; ne pas disséminer les fragments dans le jardin ou le milieu naturel.", watering: "La prêle demande un substrat restant humide. Ne lui appliquez pas le séchage d’une succulente ; le régime d’immersion éventuel dépend de l’identité exacte et du mode de culture.", substrate: "Substrat retenant l’humidité, dans un contenant qui permet de maîtriser les rhizomes. Vérifiez leur confinement plutôt que de rechercher un mélange très sec." },
      sources: [...p.sources, source("University of Florida — Equisetum hyemale, tiges et rhizomes", "https://plant-directory.ifas.ufl.edu/plant-directory/equisetum-hyemale/")],
      faq: [{ question: "La prêle produit-elle des fleurs ?", answer: "Non. Ses structures reproductrices portent des spores : ce ne sont pas des fleurs." }, { question: "Peut-elle coloniser le jardin ?", answer: "Ses rhizomes peuvent s’étendre. Cultivez-la de manière confinée et ne dispersez pas les fragments." }, { question: "Japonicum suffit-il à identifier la plante ?", answer: "Non. Le nom horticole historique doit être rapproché d’une étiquette et d’une identification complète avant toute attribution précise." }],
    };
    if (propagation[id]) p = { ...p, care: { ...p.care, propagation: propagation[id].text }, sources: [...p.sources.filter(s => s.url !== propagation[id].source.url), propagation[id].source], showSources: true };
    if (id === "aloe/vera") p = { ...p,
      filters: { ...p.filters, humanToxic: true, petToxic: true },
      toxicity: { level: "Toxique à l’ingestion et latex irritant", summary: "L’Aloe vera ornemental ne doit pas être consommé par les enfants ou les animaux.", details: "NC State signale des composés anthraquinoniques dans les feuilles et un risque d’irritation par le latex. La présence de gel dans des produits préparés ne rend pas une feuille brute sans danger." },
      description: [...p.description, "Les feuilles charnues en rosette stockent l’eau ; laissez le mélange sécher entre deux arrosages. Les rejets latéraux permettent de former puis de diviser une touffe. Une hampe florale peut apparaître sur un sujet mature, sans être systématique en intérieur."],
      faq: [...p.faq.filter(f => !/photographie|pot percé|toxique/i.test(f.question)), { question: "Peut-on consommer les feuilles du pot ?", answer: "Non. La fiche concerne une plante ornementale ; son latex et ses feuilles peuvent être irritants ou toxiques. Elle ne fournit pas de recette alimentaire ni de conseil médical." }, { question: "Comment multiplier la touffe ?", answer: "Séparez des rejets déjà enracinés, plutôt que de compter sur une feuille coupée." }],
    };
    if (id === "pilea/peperomioides") p = { ...p, care: { ...p.care, substrate: p.care.substrate.replace("perlite ou .", "perlite.") } };
    if (id === "pilea/cadierei") p = { ...p,
      description: [...p.description, "Le limbe denté porte des plages argentées en relief, disposées de part et d’autre des nervures. La plante forme une petite touffe dressée plutôt que les longues tiges d’un pothos. Les nouvelles pousses portent le feuillage le plus net ; un pincement et des boutures permettent de renouveler une touffe dégarnie."],
      faq: [...p.faq.filter(f => !/photographie|pot percé/.test(f.question)), { question: "Pourquoi mon Pilea cadierei se dégarnit-il ?", answer: "Le vieillissement des tiges et une lumière insuffisante peuvent accentuer le dégarnissement. Pincez une plante en croissance et renouvelez si besoin la touffe avec des boutures saines." }],
    };
    if (id === "yucca/rostrata") p = { ...p,
      filters: { ...p.filters, petToxic: true, humanToxic: null, growthRate: "lente" },
      toxicity: { level: "Prudence avec les animaux et les pointes", summary: "Installez le Yucca hors des passages et ne laissez pas les animaux le mâchonner.", details: "NC State signale un risque pour chats, chiens et chevaux. Les pointes et marges des feuilles imposent aussi une manipulation prudente ; aucune innocuité pour l’humain n’est déduite du silence des sources." },
      description: [...p.description, "Originaire du Texas et du nord-est du Mexique, ce Yucca forme avec le temps un tronc surmonté d’une couronne de feuilles étroites bleu-vert. Les anciennes feuilles peuvent rester sur le tronc. Sa croissance est lente : un sujet à tronc ne se reconstitue pas rapidement après une taille mal placée."],
      care: { ...p.care, substrate: "Sol très drainant, sableux ou minéral, sans poche d’eau autour de la base. En pot, le drainage doit rester libre même en hiver.", temperature: "Espèce résistante au froid lorsqu’elle est bien installée et au sec relatif ; la culture en pot et l’humidité hivernale modifient le risque. Aucun seuil unique ne garantit la survie à Lille." },
      faq: [...p.faq.filter(f => !/photographie|pot percé/.test(f.question)), { question: "Le froid est-il le seul risque hivernal ?", answer: "Non. Une base durablement humide ou un drainage bloqué peuvent compromettre une plante résistante au froid. Vérifiez d’abord l’écoulement de l’eau." }],
    };
    if (id === "plumeria/rubra") p = { ...p,
      filters: { ...p.filters, petToxic: true, humanToxic: true },
      toxicity: { level: "Irritant et nocif à l’ingestion", summary: "Évitez l’ingestion et le contact de la sève avec peau et yeux.", details: "La RHS signale ces risques pour Plumeria rubra, également pour les animaux. Portez des gants lors des coupes et lavez les zones exposées." },
      description: [...p.description, "Les branches épaisses portent les feuilles surtout vers leurs extrémités. Le frangipanier peut perdre ses feuilles au repos : cette phase n’appelle pas les mêmes arrosages qu’une plante chaude et feuillée en pleine croissance."],
      care: { ...p.care, watering: "Arrosez modérément pendant la croissance puis laissez égoutter. Au repos hivernal, maintenez presque sec ; n’arrosez pas une plante défeuillée comme en été.", temperature: "Hivernez en situation lumineuse hors gel, avec un minimum de 10 °C selon la RHS. Évitez surtout l’association froid et mélange humide." },
      faq: [...p.faq.filter(f => !/photographie|pot percé/.test(f.question)), { question: "Faut-il arroser quand les feuilles sont tombées ?", answer: "Réduisez fortement pendant le repos : les besoins sont bien plus faibles. Contrôlez la fermeté des tiges et l’état du mélange au lieu de suivre un calendrier d’été." }],
    };
    if (id === "monstera/esqueleto" && !p.synonyms.includes("Monstera Squeleto")) p = { ...p, synonyms: [...p.synonyms, "Monstera Squeleto"] };
    if (id === "philodendron/royal-queen") p = { ...p, synonyms: p.synonyms.filter(n => n !== "Philodendron New Red") };
    // Link to an actual species page when it exists. Never fabricate parent URLs.
    const parent = parentSpecies(entries, p);
    if (parent && !p.comparisons.some(c => c.href === `/plantes/${plantEntityId(parent)}` || c.name === parent.botanicalName)) p = { ...p, comparisons: [...p.comparisons, { name: parent.botanicalName, href: `/plantes/${plantEntityId(parent)}`, difference: "Le cadre botanique de l’espèce, à distinguer de cette sélection ou forme horticole." }] };
    return p === original ? p : { ...p, updatedAt: "2026-09-13" };
  });
}
