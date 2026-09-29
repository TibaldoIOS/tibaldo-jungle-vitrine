import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";
import { substrateLocalCommerce as local, substrateLocalFaq } from "../substrats/local-commerce";
import { supplierMedia } from "../substrats/supplier-media";

const title = "Sybotanica & substrats en vrac à Lille | TIBALDO Jungle";
const description = "Revendeur Sybotanica à Lille : mélanges conditionnés, composants horticoles en vrac, conseil et retrait au Studio Végétal.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/substrats-en-vrac-lille" },
  openGraph: { title, description, url: "/substrats-en-vrac-lille", images: [{ url: supplierMedia.collection.src, width: supplierMedia.collection.width, height: supplierMedia.collection.height, alt: supplierMedia.collection.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [supplierMedia.collection.src] },
};

export default function SubstratsVracLille() {
  return <LocalSeoPage canonical="/substrats-en-vrac-lille"
    eyebrow="Revendeur Sybotanica · Lille"
    title="Vos substrats à Lille,"
    accent="le conseil en plus."
    intro="Mélanges Sybotanica et composants horticoles en vrac : choisissez pour votre plante, préparez votre achat et retrouvez-nous au Studio Végétal."
    notice={{ eyebrow: local.studioStatus, title: "Mélanges, vrac et conseil sur place", copy: `${local.openingHours}. Achat au Studio, contact par téléphone et consultation des références publiées dans le Shop. Aucune commande ni aucun retrait ne sont supposés actifs : vérifiez le mélange, le volume, le conditionnement et les modalités avant de vous déplacer.` }}
    sectionTitle="Une matière adaptée."
    sectionAccent="Une adresse à Lille."
    paragraphs={[
      "TIBALDO Jungle est revendeur Sybotanica au Studio Végétal, 3 place de l’Arbonnoise, 59000 Lille, près du métro Cormontaigne. Le Studio est ouvert du mardi au dimanche. Le conseil sur place vous aide à choisir selon la plante, le pot, la lumière et vos habitudes d’arrosage. Pour préparer votre visite, appelez le 07 43 72 70 79.",
      "Mélange aéré pour les racines d’un Monstera ou d’un Anthurium, rétention plus régulière pour une Calathea, drainage pour un cactus : la fonction compte avant le nom du sac. Le guide compare 13 mélanges Sybotanica ; il ne représente pas un inventaire en temps réel.",
      "La matériauthèque Jungle présente aussi terreau, écorce de pin, chips de coco, perlite, sphaigne séchée, charbon actif, billes d’argile, vermiculite et zéolite. La vente en vrac permet de rechercher la quantité utile pour un rempotage. Vérifiez avec le Studio le format proposé : une référence Sybotanica n’est pas automatiquement vendue en vrac.",
      local.nearby, local.metro, local.region,
    ]}
    highlights={[
      { title: "Choisir sur place", copy: "Au Studio de Lille, échangez sur votre plante et choisissez parmi les références disponibles. Le volume du pot et vos conditions de culture guident le conseil." },
      { title: "Préparer par téléphone", copy: "Au 07 43 72 70 79, précisez la plante, le mélange envisagé et le volume. Confirmez avec nous la disponibilité et les modalités avant de faire le déplacement." },
      { title: "Consulter avant de venir", copy: local.shopNotice + " Attendez une confirmation explicite avant tout retrait à Lille." },
    ]}
    faq={[...substrateLocalFaq]}
    links={[
      { href: "/substrats", label: "Choisir son mélange Sybotanica", copy: "Comparer les mélanges par plante, comprendre les composants et retrouver les sources du fabricant." },
      { href: "/rempotage", label: "Rempotage à Lille", copy: "Faire observer les racines et discuter du pot et du substrat adaptés." },
      { href: "/contact", label: "Contacter le Studio", copy: "Préparer votre visite, vérifier un conditionnement ou poser une question avant de venir." },
    ]}
  />;
}
