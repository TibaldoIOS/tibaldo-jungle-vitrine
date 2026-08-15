import type { Metadata } from "next";
import InnerPage from "../InnerPage";

export const metadata: Metadata = {
  title: "Services et livraison de plantes et fleurs à Lille | Tibaldo Jungle",
  description:
    "Diagnostic, rempotage, livraison de plantes et création de murs végétaux naturels à Lille, avec ou sans entretien et sur devis.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <InnerPage
      eyebrow="Nos services · Studio Végétal Lille"
      title="Faire grandir"
      accent="votre jungle."
      intro="Diagnostic, rempotage, livraison végétale et commandes florales : chaque service répond à un besoin précis, sans geste inutile."
      cards={[
        {
          title: "SOS Plantes",
          copy: "Observer les symptômes, identifier un parasite ou comprendre un ralentissement avant de décider d’un traitement.",
          href: "/sos-plantes",
        },
        {
          title: "Bar à rempotage",
          copy: "Intervenir concrètement sur les racines, le drainage, le volume du pot et la composition du substrat.",
          href: "/rempotage-plantes-lille",
        },
        {
          title: "Livraison de plantes",
          copy: "Faire livrer à Lille une plante d’intérieur, un grand sujet ou une sélection végétale disponible au Studio.",
          href: "/livraison-plantes-lille",
        },
        {
          title: "Fleurs coupées",
          copy: "Commander des bottes et fleurs coupées professionnelles sur devis, avec retrait ou livraison à Lille.",
          href: "/livraison-fleurs-coupees-lille",
        },
        {
          title: "Bouquets fournisseurs",
          copy: "Accéder sur demande à des bouquets déjà confectionnés par un fournisseur professionnel, sans prestation de composition par Tibaldo Jungle.",
          href: "/bouquets-fleurs-livraison-lille",
        },
        {
          title: "Projets végétaux",
          copy: "Imaginer une sélection de plantes pour la maison, un commerce, des bureaux ou un événement.",
          href: "/contact",
        },
        {
          title: "Murs végétaux naturels",
          copy: "Concevoir un mur vivant sur mesure pour un intérieur privé ou professionnel, avec ou sans entretien. Prix sur devis.",
          href: "/mur-vegetal-naturel-lille",
        },
      ]}
      partner={{
        eyebrow: "Revendeur partenaire",
        name: "Sybotanica",
        copy: "Tibaldo Jungle sélectionne et achète les produits Sybotanica en palette afin de négocier des conditions avantageuses. Les références retenues seront revendues directement par le Studio et proposées sur la boutique en ligne.",
      }}
    />
  );
}
