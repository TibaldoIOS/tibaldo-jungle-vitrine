// Dossier botanique et saisonnier Jungle. Les prix, stocks, variantes et commandes
// restent exclusivement gérés par le Shop / la Caisse (ENCYCLOPEDIA_CONTRACT.md).
export const christmasTreeBase = "/sapins-noel-lille";
export const christmasTreeCities = [
  "Lille", "Lambersart", "La Madeleine", "Marcq-en-Barœul",
  "Villeneuve-d’Ascq", "Mons-en-Barœul", "Loos", "Wattignies",
  "Wasquehal", "Roubaix", "Tourcoing", "Croix",
] as const;

export const christmasTreeFaq = [
  {
    question: "Où trouver un sapin de Noël naturel à Lille ?",
    answer: "TIBALDO Jungle, Studio Végétal situé au 3 place de l’Arbonnoise, 59000 Lille, présente sa sélection saisonnière de Nordmann et d’Épicéas. Contactez le Studio pour confirmer les arrivages, les tailles et les modalités de réservation avant tout déplacement.",
  },
  {
    question: "La livraison de sapins est-elle incluse dans la métropole lilloise ?",
    answer: "Pour la sélection de sapins de Noël, une livraison incluse est prévue aux adresses éligibles de la Métropole Européenne de Lille, après confirmation du Studio et du créneau. Il s’agit d’une modalité saisonnière distincte du barème habituel de livraison des plantes et accessoires.",
  },
  {
    question: "Puis-je retirer un sapin au Studio Végétal ?",
    answer: "Le retrait au 3 place de l’Arbonnoise est envisageable sur demande. Les conditions applicables sont communiquées avant réservation ; aucun tarif ou supplément de retrait n’est annoncé sans confirmation.",
  },
  {
    question: "Nordmann ou Épicéa : lequel perd le moins ses aiguilles ?",
    answer: "Le Nordmann retient généralement mieux ses aiguilles en intérieur. L’Épicéa commun offre un parfum résineux plus marqué, mais sèche et perd habituellement ses aiguilles plus vite, surtout près d’un radiateur.",
  },
  {
    question: "Comment garder un sapin coupé frais plus longtemps ?",
    answer: "Conservez-le au frais et à l’ombre avant installation. Recoupez légèrement et droit la base du tronc si nécessaire, placez-le immédiatement dans un pied avec réserve d’eau, contrôlez le niveau tous les jours et évitez les sources de chaleur.",
  },
  {
    question: "Que faire du sapin après les fêtes dans la MEL ?",
    answer: "Retirez décorations, guirlandes et filet, puis consultez les consignes de votre commune de la MEL : points de collecte, déchèteries et opérations de broyage varient selon le lieu et l’année. Ne déposez pas le sapin sur le trottoir hors dispositif autorisé.",
  },
] as const;

export const christmasTrees = [
  {
    slug: "nordmann",
    commonName: "Sapin Nordmann",
    botanicalName: "Abies nordmanniana",
    family: "Pinaceae",
    genus: "Abies",
    species: "nordmanniana",
    tagline: "Des aiguilles souples et une meilleure tenue en intérieur.",
    identification: "Le Nordmann porte des aiguilles plutôt plates, souples, vert foncé et disposées de part et d’autre des rameaux. Comme chez les vrais sapins du genre Abies, les cônes sont dressés et se désagrègent sur l’arbre.",
    selection: "À privilégier pour un salon chauffé, pour une installation plus précoce ou lorsque l’on veut limiter les aiguilles au sol. La fraîcheur à l’achat reste déterminante : aucune essence ne résiste indéfiniment à un air chaud et sec.",
    atmosphere: "Une silhouette généralement ample et régulière, avec des rameaux assez robustes pour recevoir les décorations.",
    origin: "Espèce originaire notamment des régions montagneuses du Caucase et du nord de la Turquie ; les arbres vendus à Noël sont habituellement issus de plantations horticoles.",
    indoor: "Installez le sapin loin des radiateurs, cheminées et baies fortement ensoleillées. Placez le tronc dans un support avec réservoir et vérifiez l’eau chaque jour.",
    before: "Avant de le décorer, conservez-le dans un garage non chauffé ou un lieu ombragé, à l’abri du vent. Maintenez la base du tronc dans l’eau si possible.",
    after: "Un Nordmann coupé ne se replante pas : débarrassez-le de tous ses ornements et utilisez la filière de collecte de votre commune.",
    faq: [
      { question: "Le Nordmann pique-t-il ?", answer: "Ses aiguilles sont généralement moins piquantes que celles de l’Épicéa ; cela ne dispense pas de surveiller les enfants et les animaux." },
      { question: "Le Nordmann sent-il le sapin ?", answer: "Son parfum est habituellement plus discret que celui de l’Épicéa commun." },
      { question: "Puis-je installer mon Nordmann dès la fin novembre à Lille ?", answer: "C’est l’essence la plus adaptée des deux à une installation anticipée, sous réserve d’un arbre fraîchement coupé, d’une réserve d’eau et d’une pièce peu chauffée. Aucune durée précise n’est garantie." },
    ],
  },
  {
    slug: "epicea",
    commonName: "Épicéa commun",
    botanicalName: "Picea abies",
    family: "Pinaceae",
    genus: "Picea",
    species: "abies",
    tagline: "Le parfum résineux traditionnel des fêtes de Noël.",
    identification: "L’Épicéa possède des aiguilles plus fines, rigides et piquantes, disposées tout autour des rameaux. Ses cônes sont pendants, à la différence de ceux des vrais sapins du genre Abies.",
    selection: "À choisir pour son odeur boisée typique de Noël, surtout si l’arbre peut être installé assez près des fêtes. Il est généralement plus sensible au dessèchement et à la chute des aiguilles que le Nordmann.",
    atmosphere: "Une silhouette conique traditionnelle et un feuillage fin qui accompagne une décoration légère.",
    origin: "Espèce largement présente dans les régions montagneuses d’Europe. Les sujets vendus pour Noël proviennent en principe de cultures dédiées et non d’une coupe libre en forêt.",
    indoor: "Gardez l’Épicéa dans une pièce aussi fraîche que possible, à bonne distance des appareils de chauffage. Veillez particulièrement à ce que le pied ne manque jamais d’eau.",
    before: "Laissez-le au frais à l’ombre, protégé des courants d’air desséchants, puis installez-le le plus tard possible si vous recherchez une bonne tenue des aiguilles.",
    after: "Un Épicéa coupé ne peut pas être replanté. Retirez toutes les décorations avant la collecte ou le broyage prévu dans votre commune.",
    faq: [
      { question: "Pourquoi l’Épicéa perd-il ses aiguilles ?", answer: "Une fois coupé, l’arbre se déshydrate progressivement. La chaleur, l’air sec et une réserve d’eau vide accélèrent ce phénomène." },
      { question: "L’Épicéa est-il plus parfumé que le Nordmann ?", answer: "Oui, son parfum de résine est généralement plus prononcé : c’est l’un de ses grands atouts traditionnels." },
      { question: "Quand installer un Épicéa dans un appartement lillois ?", answer: "Le plus près possible de la période pendant laquelle vous souhaitez en profiter, surtout si votre logement est chauffé. Conservez-le au frais auparavant et maintenez sa base dans l’eau." },
    ],
  },
] as const;

export type ChristmasTree = (typeof christmasTrees)[number];
export function getChristmasTree(slug: string): ChristmasTree | undefined {
  return christmasTrees.find((tree) => tree.slug === slug);
}
