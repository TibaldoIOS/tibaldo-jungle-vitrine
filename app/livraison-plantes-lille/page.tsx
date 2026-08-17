import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";

export const metadata: Metadata = {
  title: "Livraison locale de plantes à Lille et métropole | Tibaldo Jungle",
  description: "Livraison offerte dès 149 € à Lille et dans les communes limitrophes. Sinon, tarif routier aller-retour à 0,80 €/km, minimum 9,90 €.",
  alternates: { canonical: "/livraison-plantes-lille" },
  openGraph: { title: "Livraison locale de plantes | Tibaldo Jungle", description: "Une adresse, un panier et un seul tarif de livraison locale, calculé automatiquement selon le trajet.", url: "/livraison-plantes-lille", type: "website" },
};

export default function Page() {
  return <LocalSeoPage
    canonical="/livraison-plantes-lille"
    eyebrow="Livraison locale · Lille"
    title="Une seule livraison"
    accent="pour tout votre panier."
    intro="Plantes, cactus et accessoires sont réunis dans une même livraison, avec un tarif simple calculé automatiquement selon votre adresse."
    notice={{ eyebrow: "Livraison locale", title: "Offerte dès 149 €", copy: "À Lille et dans les communes directement limitrophes. Pour les autres commandes, les frais sont calculés automatiquement selon votre adresse." }}
    service={{ name: "Livraison locale Tibaldo Jungle", description: "Livraison locale de plantes, cactus et accessoires avec un tarif unique par panier.", areaServed: ["Lille", "Communes limitrophes de Lille", "France"] }}
    sectionTitle="Une adresse, un panier"
    sectionAccent="et un seul tarif."
    paragraphs={[
      "Le tarif est calculé selon la distance routière réelle entre le Studio Végétal Tibaldo Jungle à Lille et l’adresse de livraison. Il ne dépend jamais du lieu où chaque article est conservé avant la préparation de la commande.",
      "Lorsqu’elle n’est pas offerte, la livraison est calculée à 0,80 € par kilomètre réellement parcouru sur l’aller-retour, avec un minimum de facturation de 9,90 €. Une adresse située à 20 km du Studio représente donc 40 km aller-retour, soit 32 € de livraison.",
      "Dès 149 € TTC d’achat, la livraison est automatiquement offerte lorsque l’adresse se situe à Lille ou dans une commune directement limitrophe de Lille. Dans toute autre commune, le tarif kilométrique reste applicable, même lorsque le panier atteint 149 €.",
      "Un panier peut réunir une plante, plusieurs cactus et des accessoires : une seule livraison est organisée et un seul montant est facturé. Les différents lieux de préparation restent une information logistique interne, sans effet sur le prix présenté au client.",
      "L’adresse complète est vérifiée avant la validation. Pour un sujet particulièrement lourd ou volumineux, un étage sans ascenseur ou un accès difficile, nous vous contactons si une organisation particulière est nécessaire.",
    ]}
    highlights={[
      { title: "Minimum 9,90 €", copy: "Le tarif est calculé à 0,80 € par kilomètre routier aller-retour, avec ce montant minimum." },
      { title: "Offerte dès 149 €", copy: "La gratuité s’applique si le panier atteint 149 € et si l’adresse se situe à Lille ou dans une commune limitrophe." },
      { title: "Un seul tarif", copy: "Une commande contenant plusieurs produits ou lieux de préparation ne génère jamais plusieurs frais de livraison." },
    ]}
    faq={[
      { question: "Comment les frais de livraison sont-ils calculés ?", answer: "Ils correspondent à la distance routière entre le Studio Végétal à Lille et l’adresse du client, multipliée par deux pour l’aller-retour, puis par 0,80 €. Le minimum facturé est de 9,90 €." },
      { question: "Quand la livraison est-elle offerte ?", answer: "Elle est offerte lorsque le panier atteint au moins 149 € TTC et que l’adresse de livraison se trouve à Lille ou dans une commune directement limitrophe de Lille." },
      { question: "La livraison est-elle offerte ailleurs à partir de 149 € ?", answer: "Non. Dans une commune non limitrophe de Lille, le tarif kilométrique reste applicable quel que soit le montant du panier." },
      { question: "Plusieurs produits entraînent-ils plusieurs frais ?", answer: "Non. Une adresse et un panier donnent toujours lieu à un seul tarif, même lorsque les articles sont préparés depuis plusieurs lieux internes." },
      { question: "Le retrait au Studio reste-t-il possible ?", answer: "Oui. Le retrait au Studio Végétal, 3 place de l’Arbonnoise à Lille, reste proposé sans frais sur un créneau convenu." },
    ]}
    links={[
      { href: "https://shop.tibaldo.fr", label: "Accéder au Shop", copy: "Composer votre panier et calculer automatiquement la livraison selon votre adresse." },
      { href: "/boutique-plantes-lille", label: "Boutique de plantes à Lille", copy: "Découvrir le Studio Végétal et préparer votre visite." },
      { href: "/contact", label: "Préparer une livraison particulière", copy: "Nous signaler un accès difficile, un étage sans ascenseur ou un végétal très volumineux." },
    ]}
  />;
}
