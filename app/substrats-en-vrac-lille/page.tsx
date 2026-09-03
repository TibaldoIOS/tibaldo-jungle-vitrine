import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";
import { substrateLocalCommerce as local, substrateLocalFaq } from "../substrats/local-commerce";

const title = "Sybotanica & substrats en vrac à Lille | TIBALDO Jungle";
const description = "Revendeur Sybotanica à Lille : substrats, conseil et retrait au Studio. Achat sur place, téléphone ou click & collect selon disponibilité. Ouverture le 26 septembre.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/substrats-en-vrac-lille" },
  openGraph: { title, description, url: "/substrats-en-vrac-lille", images: [{ url: "/substrats/perlite-substrat-plantes-lille.jpg", alt: "Perlite et substrats en vrac chez Tibaldo Jungle à Lille" }] },
};

export default function SubstratsVracLille() {
  return <LocalSeoPage canonical="/substrats-en-vrac-lille"
    eyebrow="Revendeur Sybotanica · Lille"
    title="Vos substrats à Lille,"
    accent="le conseil en plus."
    intro="Mélanges Sybotanica et composants horticoles en vrac : choisissez pour votre plante, préparez votre achat et retrouvez-nous au Studio Végétal."
    notice={{ eyebrow: "Préparer l’ouverture", title: `Rendez-vous le ${local.openingDate}`, copy: "Achat sur place au Studio, contact par téléphone ou click & collect via le Shop lorsque les références et le retrait sont activés. Vérifiez le mélange, le volume et le conditionnement avant de vous déplacer." }}
    sectionTitle="Une matière adaptée."
    sectionAccent="Une adresse à Lille."
    paragraphs={[
      "TIBALDO Jungle est revendeur Sybotanica au Studio Végétal, 3 place de l’Arbonnoise, 59000 Lille, près du métro Cormontaigne. À partir du 26 septembre 2026, le conseil sur place vous aide à choisir selon la plante, le pot, la lumière et vos habitudes d’arrosage. Pour préparer votre visite, appelez le 07 43 72 70 79.",
      "Mélange aéré pour les racines d’un Monstera ou d’un Anthurium, rétention plus régulière pour une Calathea, drainage pour un cactus : la fonction compte avant le nom du sac. Le guide compare 13 mélanges Sybotanica ; il ne représente pas un inventaire en temps réel.",
      "La matériauthèque Jungle présente aussi terreau, écorce de pin, chips de coco, perlite, sphaigne séchée, charbon actif, billes d’argile, vermiculite et zéolite. La vente en vrac permet de rechercher la quantité utile pour un rempotage. Vérifiez avec le Studio le format proposé : une référence Sybotanica n’est pas automatiquement vendue en vrac.",
      local.nearby, local.metro, local.region,
    ]}
    highlights={[
      { title: "Choisir sur place", copy: "Au Studio de Lille dès l’ouverture, échangez sur votre plante et choisissez parmi les références disponibles. Le volume du pot et vos conditions de culture guident le conseil." },
      { title: "Préparer par téléphone", copy: "Au 07 43 72 70 79, précisez la plante, le mélange envisagé et le volume. Confirmez avec nous la disponibilité et les modalités avant de faire le déplacement." },
      { title: "Retirer après commande", copy: local.shopNotice + " Attendez la confirmation de préparation avant le retrait à Lille." },
    ]}
    faq={[...substrateLocalFaq]}
    links={[
      { href: "/substrats", label: "Choisir son mélange Sybotanica", copy: "Comparer les mélanges par plante, comprendre les composants et retrouver les sources du fabricant." },
      { href: "/rempotage", label: "Rempotage à Lille", copy: "Faire observer les racines et discuter du pot et du substrat adaptés." },
      { href: "/contact", label: "Contacter le Studio", copy: "Préparer votre visite, vérifier un conditionnement ou poser une question avant de venir." },
    ]}
  />;
}
