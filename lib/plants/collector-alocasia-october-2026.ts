import type { PlantEntry } from "./types";

const mediaGap = (name: string): PlantEntry["gallery"] => [{
  src: "/photo-reelle-a-venir.svg",
  alt: "",
  caption: "Photographie documentaire non disponible.",
  width: 1200,
  height: 1200,
  license: {
    status: "media-gap",
    note: `Aucune photographie de ${name} avec identité et droits vérifiés n’est enregistrée dans le dépôt.`,
  },
}];

export const addCollectorAlocasiaOctober2026 = (plants: PlantEntry[]) => {
  const base = plants.find((plant) => plant.genre === "alocasia" && plant.slug === "imperial-red");
  if (!base) return plants;

  const entries: PlantEntry[] = [
    {
      ...base,
      slug: "venom",
      botanicalName: "Alocasia ‘Venom’",
      displayName: "Venom",
      listingName: "Alocasia ‘Venom’",
      subtitle: "Une sélection horticole recherchée pour ses feuilles sombres au sommet long et sinueux.",
      taxonomy: {
        ...base.taxonomy,
        species: "Hybride horticole non confirmé par une source botanique primaire",
        cultivar: "Venom",
        commonNames: ["Alocasia Venom"],
      },
      filters: {...base.filters, temperatureIdeal: [20, 28], humidityIdeal: [50, 75], watering: "modéré", growthRate: "moyenne", adultSizeCm: null, regions: ["Origine horticole"], collection: true},
      origin: "Origine horticole ; sélection attribuée dans la documentation spécialisée à Mason Lee (Mason Plants, Corée du Sud).",
      habitat: "Sélection cultivée sans aire naturelle propre. Sa culture suit les besoins généraux des Alocasia horticoles tropicaux.",
      hybridization: "Venom est un nom horticole, pas une espèce. Aroidpedia le documente comme une mutation d’une lignée ‘Amazonica’ sélectionnée vers 2019 ; faute de fiche primaire de l’obtenteur consultable ici, cette filiation est présentée comme une attribution secondaire et non comme une certitude botanique.",
      synonyms: ["Alocasia Venom"],
      description: [
        "Alocasia ‘Venom’ est recherchée pour un limbe sombre parcouru de nervures claires et surtout pour son apex très allongé, qui peut se courber ou se vriller à mesure que la feuille mûrit.",
        "Le nom Venom désigne une sélection horticole. Une jeune plante peut ne pas encore exprimer la silhouette spectaculaire des feuilles adultes ; l’étiquette et la traçabilité restent donc indispensables.",
      ],
      specimen: {observedHeight: "Dimensions variables selon maturité et lignée", note: "Aucune dimension du lot annoncé n’est déduite de la story Owner."},
      growth: {adultSize: "Développement variable ; aucune taille adulte certaine n’est annoncée", speed: "Variable selon chaleur et lumière", habit: "Dressé, en touffe"},
      care: {
        ...base.care,
        difficulty: 4,
        difficultyText: "Collection : stabilité chaude, racines aérées et observation attentive.",
        lightText: "Lumière vive filtrée ; acclimater progressivement et éviter le soleil brûlant sur les jeunes feuilles.",
        watering: "Arroser quand la partie supérieure du mélange a commencé à sécher, puis laisser égoutter. Ne pas maintenir le cœur du pot détrempé.",
        humidityText: "Humidité modérée à élevée avec air renouvelé ; l’humidité ne compense pas un substrat asphyxiant.",
        temperature: "Ambiance chaude et stable, idéalement autour de 20–28 °C ; éviter les courants d’air froid.",
      },
      comparisons: [
        {name: "Alocasia × mortfontanensis", difference: "Le groupe historiquement vendu comme Amazonica sert de repère horticole, mais la présente fiche ne transforme pas l’attribution secondaire de Venom en filiation botanique prouvée."},
        {name: "Alocasia longiloba", href: "/plantes/alocasia/longiloba", difference: "Longiloba est une espèce botanique acceptée et variable ; Venom reste une sélection horticole distincte."},
      ],
      faq: [
        {question: "Alocasia Venom est-elle une espèce ?", answer: "Non. Venom est traité ici comme un nom horticole. Il ne figure pas comme espèce acceptée dans la taxonomie de Kew."},
        {question: "Pourquoi les jeunes feuilles ressemblent-elles peu aux photos adultes ?", answer: "L’apex très allongé et la silhouette sinueuse peuvent devenir plus visibles avec la maturité. Une apparence juvénile ne suffit toutefois pas à confirmer l’identité."},
        {question: "Peut-on confirmer Venom sur une photo seule ?", answer: "Non. Plusieurs Alocasia ont des feuilles sombres et pointues ; conservez l’étiquette et la provenance du producteur."},
      ],
      tibaldoAdvice: [
        "Conservez l’étiquette du producteur : le nom commercial seul ne prouve pas la filiation.",
        "Attendez plusieurs feuilles matures avant de juger la forme caractéristique de l’apex.",
      ],
      editorialSections: [{
        id: "nom-et-traçabilite",
        eyebrow: "Nommer",
        title: "Venom : une identité horticole à tracer",
        paragraphs: ["La documentation spécialisée rattache Venom à une mutation du groupe Amazonica, mais l’absence de source primaire accessible impose de conserver cette histoire au conditionnel."],
        points: ["Nom horticole", "Apex foliaire allongé", "Traçabilité indispensable"],
      }],
      gallery: [{
        src: "/media/owner-media/alocasia-venom/alocasia-venom-hero-owner.webp",
        alt: "Alocasia en pot aux feuilles vert sombre largement nervurées de blanc, présenté comme visuel Hero de Venom",
        caption: "Visuel fourni par l’Owner pour le Hero d’Alocasia ‘Venom’ ; son usage éditorial ne constitue pas à lui seul une preuve d’identité botanique.",
        width: 1536,
        height: 1024,
        license: {
          status: "verified",
          creator: "Créateur non communiqué",
          license: "Utilisation publique autorisée par l’Owner",
          sourceUrl: "owner-provided://tibaldo/photo-20261011-alocasia-venom-hero-01/venom",
          registryPath: "/credits-images",
          note: "Image fournie par l’Owner pour cette fiche. Créateur non attribué ; aucune preuve botanique déduite du visuel. Provenance : docs/media-provenance/photo-20261011-alocasia-venom-hero-01.json",
        },
      }],
      mediaNeeds: [],
      seo: {
        title: "Alocasia Venom : identité horticole et entretien",
        description: "Comprendre Alocasia ‘Venom’ : nom horticole, apex foliaire allongé, limites d’identification, lumière, arrosage et culture.",
        keywords: ["Alocasia Venom", "Alocasia Venom entretien", "Alocasia Venom identité"],
      },
      sources: [
        {label: "Kew Science — genre Alocasia", url: "https://powo.science.kew.org/taxon/1078078-2"},
        {label: "Aroidpedia — Alocasia ‘Venom’ (source horticole secondaire)", url: "https://www.aroidpedia.com/archive/alocasia-venom"},
        {label: "Kew Science — Alocasia × mortfontanensis", url: "https://powo.science.kew.org/results?q=Alocasia%20%C3%97%20mortfontanensis"},
        {label: "RHS — culture des Alocasia", url: "https://www.rhs.org.uk/plants/alocasia/growing-guide"},
      ],
      showSources: true,
      publishedAt: "2026-10-10",
      updatedAt: "2026-10-11",
    },
    {
      ...base,
      slug: "teletubbies",
      botanicalName: "Alocasia sp. ‘Teletubbies’",
      displayName: "Teletubbies",
      listingName: "Alocasia sp. ‘Teletubbies’",
      subtitle: "Un nom commercial récent pour une Alocasia compacte aux feuilles épaisses et ondulées.",
      taxonomy: {
        ...base.taxonomy,
        species: "Alocasia sp.",
        cultivar: "Teletubbies",
        commonNames: ["Alocasia Teletubbies", "Alocasia Teletubby"],
      },
      filters: {...base.filters, temperatureIdeal: [20, 28], humidityIdeal: [50, 75], watering: "modéré", growthRate: "moyenne", adultSizeCm: null, regions: ["Origine horticole non établie"], collection: true},
      origin: "Origine horticole non établie par une source primaire accessible.",
      habitat: "Sélection cultivée sans aire naturelle propre documentée. L’étiquette commerciale ne permet pas de lui attribuer l’habitat d’une espèce précise.",
      hybridization: "Teletubbies est documenté dans le commerce comme nom horticole d’Alocasia, mais les filiations publiées sont contradictoires ou non sourcées. Cette fiche conserve donc Alocasia sp. ‘Teletubbies’ et n’adopte ni l’attribution à gageana — nom désormais synonyme d’Englerarum montanum chez Kew — ni une parenté Stingray/Loco sans preuve primaire.",
      synonyms: ["Alocasia Teletubby"],
      description: [
        "Alocasia sp. ‘Teletubbies’ est commercialisée pour un port compact et des feuilles épaisses, vertes et brillantes, aux bords ondulés et à la silhouette arrondie.",
        "Le nom est encore employé de manière inégale dans les catalogues. La forme d’une jeune feuille ne suffit pas à trancher une filiation ; la fiche reste volontairement au niveau Alocasia sp. tant qu’une documentation d’obtenteur n’est pas disponible.",
      ],
      specimen: {observedHeight: "Dimensions variables selon maturité et lignée", note: "Aucune dimension du lot annoncé n’est déduite de la story Owner."},
      growth: {adultSize: "Taille adulte non établie avec assez de fiabilité", speed: "Variable selon chaleur et lumière", habit: "Compact, dressé et en touffe selon les descriptions commerciales"},
      care: {
        ...base.care,
        difficulty: 3,
        difficultyText: "Intermédiaire : privilégier une motte aérée et une ambiance stable.",
        lightText: "Lumière vive filtrée ; acclimater progressivement et éviter le soleil brûlant.",
        watering: "Arroser quand la partie supérieure du mélange a commencé à sécher, puis laisser égoutter. Vérifier le cœur du pot avant de recommencer.",
        humidityText: "Humidité modérée à élevée avec circulation d’air ; ne pas maintenir le feuillage constamment mouillé.",
        temperature: "Ambiance chaude et stable, idéalement autour de 20–28 °C ; éviter les courants d’air froid.",
      },
      comparisons: [
        {name: "Englerarum montanum", difference: "Kew place l’ancien nom Alocasia gageana en synonymie d’Englerarum montanum. Aucune source primaire ne permet ici de rattacher Teletubbies à ce taxon."},
        {name: "Alocasia ‘Venom’", href: "/plantes/alocasia/venom", difference: "Venom est recherché pour un apex très allongé ; Teletubbies est vendu pour une feuille plus arrondie et ondulée, sans que cette comparaison prouve une parenté."},
      ],
      faq: [
        {question: "Teletubbies est-elle une espèce d’Alocasia ?", answer: "Non. Teletubbies est traité ici comme un nom horticole ou commercial, sans rang botanique propre."},
        {question: "S’agit-il d’Alocasia gageana ?", answer: "Cette attribution circule, mais elle n’est pas retenue sans source d’obtenteur. Kew traite en outre Alocasia gageana comme synonyme d’Englerarum montanum."},
        {question: "Comment confirmer l’identité ?", answer: "Conservez l’étiquette, le nom du producteur et les documents du lot. Une photo de jeune feuille seule ne suffit pas."},
      ],
      tibaldoAdvice: [
        "Gardez la traçabilité du lot et photographiez plusieurs feuilles à maturité.",
        "Ne forcez pas l’arrosage pour accélérer le déploiement : l’oxygénation des racines reste prioritaire.",
      ],
      editorialSections: [{
        id: "nom-commercial-prudent",
        eyebrow: "Nommer",
        title: "Teletubbies sans inventer sa filiation",
        paragraphs: ["Le nom est bien attesté dans le commerce horticole, mais les parentés proposées ne convergent pas. L’encyclopédie sépare donc l’usage commercial de la taxonomie botanique."],
        points: ["Nom horticole", "Espèce non attribuée", "Preuve producteur attendue"],
      }],
      gallery: mediaGap("Alocasia sp. ‘Teletubbies’"),
      mediaNeeds: [{role: "documentaire", description: "Photographie Owner du sujet Teletubbies, accompagnée de l’étiquette ou de la provenance producteur."}],
      seo: {
        title: "Alocasia Teletubbies : identité prudente et entretien",
        description: "Guide d’Alocasia sp. ‘Teletubbies’ : statut horticole, limites d’identification, lumière, arrosage et culture sans filiation inventée.",
        keywords: ["Alocasia Teletubbies", "Alocasia Teletubby", "Alocasia Teletubbies entretien"],
      },
      sources: [
        {label: "Kew Science — genre Alocasia", url: "https://powo.science.kew.org/taxon/1078078-2"},
        {label: "Kew Science — Alocasia gageana, synonyme d’Englerarum montanum", url: "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:84169-1"},
        {label: "GrowTropicals — usage commercial du nom Teletubbies", url: "https://growtropicals.com/collections/alocasia/products/alocasia-teletubbies"},
        {label: "RHS — culture des Alocasia", url: "https://www.rhs.org.uk/plants/alocasia/growing-guide"},
      ],
      showSources: true,
      publishedAt: "2026-10-10",
      updatedAt: "2026-10-10",
    },
  ];

  for (const entry of entries) {
    if (!plants.some((plant) => plant.genre === entry.genre && plant.slug === entry.slug)) plants.push(entry);
  }
  return plants;
};
