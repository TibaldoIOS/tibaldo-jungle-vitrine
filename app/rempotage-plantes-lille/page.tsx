import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";

const title = "Bar à rempotage gratuit à Lille | Tibaldo Jungle";
const description = "Découvrez le bar à rempotage gratuit de Tibaldo Jungle à Lille : diagnostic des racines, mélange sur mesure et conseils pour toutes vos plantes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/rempotage-plantes-lille" },
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
    sectionTitle="Un service végétal rare à Lille,"
    sectionAccent="simple, utile et vraiment gratuit."
    paragraphs={[
      "Le bar à rempotage Tibaldo Jungle a été imaginé pour rendre le soin des plantes plus accessible en centre-ville de Lille. Vous n’avez pas besoin de deviner la taille du prochain pot, d’acheter un grand sac de terreau ou de mélanger plusieurs composants chez vous : apportez simplement votre plante au 3 place de l’Arbonnoise. Nous prenons le temps de regarder ce qui se passe sous la surface avant d’intervenir.",
      "Le geste et le conseil sont gratuits toute l’année, pour les plantes achetées chez Tibaldo Jungle comme pour celles qui viennent d’une autre boutique. Seuls le nouveau pot et la quantité de substrat réellement utilisés sont facturés lorsqu’ils sont nécessaires. Vous savez ainsi précisément ce qui est utile à votre plante, sans forfait de main-d’œuvre ni achat superflu.",
      "Un bon rempotage ne consiste pas seulement à placer une plante dans un pot plus grand. Nous contrôlons la densité de la motte, l’état des racines, le drainage, les signes d’excès d’eau, la présence éventuelle de parasites et la cohérence entre la plante et son contenant. Si elle n’a pas besoin d’être rempotée, nous vous le disons : un diagnostic honnête vaut mieux qu’une intervention automatique.",
      "Chaque mélange est ajusté à l’espèce et à votre quotidien. Alocasia, Anthurium, Monstera et Philodendron apprécient souvent une structure aérée ; cactus et plantes grasses demandent une part minérale plus importante ; Maranta, Calathea et fougères nécessitent une rétention d’eau mieux maîtrisée. Terreau, écorce de pin, perlite, sphaigne, pierre ponce, charbon actif ou zéolite sont associés selon les besoins réels de la plante.",
      "Le bar à rempotage s’adresse aussi bien aux débutants qu’aux collectionneurs de plantes rares à Lille. Vous repartez avec une plante installée proprement et des indications simples sur le premier arrosage, la reprise, la lumière et le délai avant fertilisation. Pour une grande plante, plusieurs sujets ou une motte difficile à transporter, contactez-nous avant votre venue afin que nous préparions l’espace nécessaire.",
    ]}
    highlights={[
      {
        title: "Vous apportez votre plante",
        copy: "Avec ou sans nouveau pot. Le service accueille aussi les plantes achetées ailleurs, sous réserve qu’elles puissent être manipulées en sécurité.",
      },
      {
        title: "Nous observons les racines",
        copy: "Motte, drainage, croissance, parasites et humidité sont contrôlés avant de décider s’il faut vraiment rempoter.",
      },
      {
        title: "Nous composons le bon mélange",
        copy: "Le geste est offert. Vous réglez uniquement le contenant et les matières utilisés, puis repartez avec des conseils personnalisés.",
      },
    ]}
    faq={[
      {
        question: "Le rempotage est-il vraiment gratuit à Lille ?",
        answer: "Oui. Chez Tibaldo Jungle, la main-d’œuvre et les conseils de rempotage sont gratuits toute l’année. Seuls le pot et la quantité de substrat réellement utilisés sont facturés lorsqu’ils sont nécessaires.",
      },
      {
        question: "Puis-je apporter une plante achetée dans une autre boutique ?",
        answer: "Oui. Le bar à rempotage accueille les plantes achetées chez Tibaldo Jungle comme ailleurs. La plante doit simplement pouvoir être transportée et manipulée sans risque.",
      },
      {
        question: "Faut-il prendre rendez-vous pour le bar à rempotage ?",
        answer: "Une plante de taille courante peut être apportée pendant les horaires d’ouverture. Pour plusieurs plantes, un très grand sujet ou une intervention plus complexe, contactez le Studio avant votre venue.",
      },
      {
        question: "Quand faut-il rempoter une plante d’intérieur ?",
        answer: "Des racines qui sortent du pot, une motte très compacte, un substrat épuisé, un séchage inhabituellement rapide ou une croissance qui ralentit peuvent justifier un diagnostic. Un pot trop grand peut toutefois être aussi problématique qu’un pot trop petit.",
      },
      {
        question: "Quel substrat utilisez-vous pour les plantes tropicales ?",
        answer: "Il n’existe pas de recette unique. Nous adaptons le mélange à l’espèce, à la taille du pot, à la lumière et aux habitudes d’arrosage, avec notamment terreau, écorce de pin, perlite, sphaigne, pierre ponce, charbon actif ou zéolite.",
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
    ]}
    service={{
      name: "Bar à rempotage gratuit à Lille",
      description: "Service gratuit de rempotage de plantes d’intérieur avec diagnostic des racines, choix du pot, mélange de substrat sur mesure et conseils personnalisés.",
      areaServed: ["Lille", "La Madeleine", "Lambersart", "Loos", "Ronchin", "Wattignies", "Métropole Européenne de Lille"],
    }}
  />;
}
