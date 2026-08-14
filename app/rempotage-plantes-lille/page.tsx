import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";

const title = "Rempotage gratuit à Lille, terreau offert | Tibaldo Jungle";
const description = "Bar à rempotage gratuit à Lille : geste, conseils et Terreau Signature offerts pour les plantes classiques. Grands sujets hors normes sur devis.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/rempotage-plantes-lille" },
  keywords: ["rempotage gratuit Lille", "bar à rempotage Lille", "terreau gratuit Lille", "terreau offert rempotage", "rempoter plante Lille", "rempotage plante intérieur Lille", "rempotage Monstera Lille", "Tibaldo Jungle rempotage"],
  openGraph: {
    title,
    description,
    url: "/rempotage-plantes-lille",
    type: "website",
    locale: "fr_FR",
    images: [{
      url: "/advice-rempotage.jpg",
      alt: "Bar à rempotage gratuit pour plantes d’intérieur chez Tibaldo Jungle à Lille",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/advice-rempotage.jpg"],
  },
};

export default function RempotagePlantesLille() {
  return <LocalSeoPage
    canonical="/rempotage-plantes-lille"
    eyebrow="Bar à rempotage gratuit · Lille"
    title="Rempotage gratuit"
    accent="au cœur de Lille."
    intro="Venez avec votre plante, même achetée ailleurs. Au Studio Végétal, le geste de rempotage est offert toute l’année : nous observons les racines, choisissons le bon volume et composons un mélange adapté."
    notice={{
      eyebrow: "Rempotage et Terreau Signature offerts",
      title: "0 € pour une plante classique",
      copy: "Le geste, le conseil et le Terreau Signature sont fournis gratuitement pour les plantes de format classique. Les sujets hors normes, besoins techniques particuliers et contenants restent exclus de cette offre.",
    }}
    sectionTitle="Un service végétal rare à Lille,"
    sectionAccent="simple, utile et vraiment gratuit."
    paragraphs={[
      "Le bar à rempotage Tibaldo Jungle a été imaginé pour rendre le soin des plantes plus accessible en centre-ville de Lille. Vous n’avez pas besoin de deviner la taille du prochain pot, d’acheter un grand sac de terreau ou de mélanger plusieurs composants chez vous : apportez simplement votre plante au 3 place de l’Arbonnoise. Nous prenons le temps de regarder ce qui se passe sous la surface avant d’intervenir.",
      "Le geste, le conseil et le Terreau Signature sont gratuits toute l’année pour les plantes d’intérieur de format classique, qu’elles aient été achetées chez Tibaldo Jungle ou dans une autre boutique. Vous pouvez apporter un pot percé adapté ou choisir un nouveau contenant au Studio. Le pot, les composants techniques complémentaires et les demandes particulières ne sont pas compris dans la gratuité.",
      "Un bon rempotage ne consiste pas seulement à placer une plante dans un pot plus grand. Nous contrôlons la densité de la motte, l’état des racines, le drainage, les signes d’excès d’eau, la présence éventuelle de parasites et la cohérence entre la plante et son contenant. Si elle n’a pas besoin d’être rempotée, nous vous le disons : un diagnostic honnête vaut mieux qu’une intervention automatique.",
      "Le Terreau Signature constitue la base offerte pour les plantes classiques. Il est pensé pour concilier réserve d’eau, structure et circulation de l’air. Certaines plantes demandent toutefois une recette plus technique : écorce de pin, perlite, sphaigne, charbon actif, vermiculite ou zéolite peuvent alors compléter le mélange selon les racines, la lumière et votre manière d’arroser.",
      "Le bar à rempotage s’adresse aussi bien aux débutants qu’aux collectionneurs de plantes rares à Lille. Vous repartez avec une plante installée proprement et des indications simples sur le premier arrosage, la reprise, la lumière et le délai avant fertilisation. Les plantes XXL, pots très lourds, sujets nécessitant plusieurs personnes, systèmes racinaires exceptionnels et projets en série sont considérés comme hors normes : contactez-nous avant votre venue pour vérifier la faisabilité et obtenir une estimation.",
    ]}
    highlights={[
      {
        title: "Terreau Signature offert",
        copy: "Pour une plante classique, la base de Terreau Signature et le geste de rempotage sont fournis gratuitement, même si la plante vient d’ailleurs.",
      },
      {
        title: "Nous observons les racines",
        copy: "Motte, drainage, croissance, parasites et humidité sont contrôlés avant de décider s’il faut vraiment rempoter.",
      },
      {
        title: "Une offre clairement délimitée",
        copy: "Le pot, les composants techniques supplémentaires et les plantes hors normes ne sont pas inclus. La faisabilité est confirmée avant intervention.",
      },
    ]}
    faq={[
      {
        question: "Le rempotage est-il vraiment gratuit à Lille ?",
        answer: "Oui. Pour une plante classique, la main-d’œuvre, les conseils et le Terreau Signature sont gratuits toute l’année. Le contenant, les composants techniques supplémentaires et les sujets hors normes ne sont pas compris.",
      },
      {
        question: "Puis-je apporter une plante achetée dans une autre boutique ?",
        answer: "Oui. Le bar à rempotage accueille les plantes achetées chez Tibaldo Jungle comme ailleurs. La plante doit simplement pouvoir être transportée et manipulée sans risque.",
      },
      {
        question: "Faut-il prendre rendez-vous pour le bar à rempotage ?",
        answer: "Une plante classique peut être apportée pendant les horaires d’ouverture, dans la limite d’un passage par semaine. Chaque passage est comptabilisé sur votre compte client. Pour plusieurs passages dans la même semaine, plusieurs plantes, un sujet XXL, un pot très lourd ou une intervention complexe, la prestation est proposée sur devis : contactez le Studio avant votre venue.",
      },
      {
        question: "Le Terreau Signature est-il vraiment fourni gratuitement ?",
        answer: "Oui. Le Terreau Signature utilisé comme base lors du rempotage d’une plante classique est offert. Un mélange demandant des composants techniques particuliers peut entraîner un supplément annoncé avant l’intervention.",
      },
      {
        question: "Qu’est-ce qu’une plante hors normes ?",
        answer: "Il s’agit notamment d’un sujet XXL, d’un ensemble très lourd, d’un pot difficile à déplacer, d’une motte nécessitant plusieurs personnes ou d’une intervention longue et technique. Contactez le Studio avec une photo et les dimensions pour vérifier la faisabilité.",
      },
      {
        question: "Quand faut-il rempoter une plante d’intérieur ?",
        answer: "Des racines qui sortent du pot, une motte très compacte, un substrat épuisé, un séchage inhabituellement rapide ou une croissance qui ralentit peuvent justifier un diagnostic. Un pot trop grand peut toutefois être aussi problématique qu’un pot trop petit.",
      },
      {
        question: "Quel substrat utilisez-vous pour les plantes tropicales ?",
        answer: "Il n’existe pas de recette unique. Nous adaptons le mélange à l’espèce, à la taille du pot, à la lumière et aux habitudes d’arrosage, avec notamment terreau, écorce de pin, perlite, sphaigne, charbon actif ou zéolite.",
      },
      {
        question: "Peut-on rempoter un Monstera, un Alocasia ou un Anthurium au Studio ?",
        answer: "Oui. Le service convient aux plantes d’intérieur courantes, aux aracées et à de nombreuses plantes de collection. Un diagnostic préalable permet de choisir le volume de pot et l’aération adaptés.",
      },
      {
        question: "Où trouver un bar à rempotage dans le centre de Lille ?",
        answer: "Le bar à rempotage Tibaldo Jungle se trouve au Studio Végétal, 3 place de l’Arbonnoise, 59000 Lille. Il est accessible pendant les horaires d’ouverture de la boutique.",
      },
    ]}
    links={[
      {
        href: "/bar-a-rempotage-lille",
        label: "Découvrir le bar à rempotage",
        copy: "Le fonctionnement du service gratuit, les plantes acceptées et la préparation de votre visite.",
      },
      {
        href: "/substrats-en-vrac-lille",
        label: "Substrats en vrac à Lille",
        copy: "Comprendre les composants utilisés et repartir avec la quantité réellement nécessaire.",
      },
      {
        href: "/diagnostic-plante-lille",
        label: "Diagnostic de plante",
        copy: "Feuilles jaunes, racines abîmées ou croissance ralentie : identifier la cause avant d’agir.",
      },
      {
        href: "/conseils/pot-perce-cache-pot-coupelle",
        label: "Pot percé ou cache-pot ?",
        copy: "Comprendre pourquoi l’évacuation de l’eau reste indispensable après un rempotage.",
      },
      {
        href: "/pots-cache-pots-lille",
        label: "Pots et cache-pots à Lille",
        copy: "Découvrir les matières et préparer le choix du prochain contenant.",
      },
    ]}
    service={{
      name: "Bar à rempotage gratuit à Lille",
      description: "Service de rempotage gratuit à Lille avec diagnostic des racines, conseils et Terreau Signature offert pour les plantes classiques. Sujets hors normes et besoins techniques particuliers exclus.",
      areaServed: ["Lille", "La Madeleine", "Lambersart", "Loos", "Ronchin", "Wattignies", "Métropole Européenne de Lille"],
      offer: {
        price: "0",
        description: "Geste de rempotage, conseils et Terreau Signature offerts pour une plante classique. Hors pot, composants techniques supplémentaires et sujets hors normes.",
      },
    }}
  />;
}
