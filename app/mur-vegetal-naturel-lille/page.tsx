import type { Metadata } from "next";
import LocalSeoPage from "../LocalSeoPage";

export const metadata: Metadata = {
  title: "Création de mur végétal naturel à Lille | Tibaldo Jungle",
  description: "Conception et création sur mesure de murs végétaux naturels à Lille et dans la MEL, avec ou sans contrat d’entretien. Étude et prix sur devis.",
  alternates: { canonical: "/mur-vegetal-naturel-lille" },
};

export default function LivingWallPage() {
  return <LocalSeoPage
    canonical="/mur-vegetal-naturel-lille"
    eyebrow="Mur végétal naturel · Lille et MEL"
    title="Faire pousser"
    accent="un paysage vivant."
    intro="Tibaldo Jungle conçoit des murs végétaux naturels sur mesure pour les particuliers et les professionnels, avec ou sans prestation d’entretien. Chaque projet est étudié et chiffré sur devis."
    sectionTitle="Un mur pensé pour le lieu,"
    sectionAccent="pas un simple décor."
    paragraphs={[
      "La lumière, l’humidité, la température, l’accès à l’eau et les dimensions disponibles déterminent la structure du projet. La sélection végétale est ensuite composée pour créer un ensemble cohérent, durable et adapté à son environnement réel.",
      "La prestation peut comprendre l’étude, le choix des plantes, la préparation du support, l’installation et la mise en route. Selon les contraintes du bâtiment, certains travaux techniques ou raccordements peuvent nécessiter l’intervention d’un professionnel complémentaire.",
      "Après l’installation, vous pouvez entretenir vous-même le mur à partir de nos recommandations ou choisir un accompagnement régulier. La fréquence et le contenu des passages sont définis séparément selon la surface, les espèces et le niveau de suivi attendu.",
    ]}
    highlights={[
      { title: "Étude sur mesure", copy: "Analyse du mur, de la lumière, des contraintes techniques, du style recherché et du niveau d’entretien acceptable." },
      { title: "Création naturelle", copy: "Composition avec de vraies plantes sélectionnées selon leur port, leur croissance et les conditions du lieu." },
      { title: "Avec ou sans entretien", copy: "Livraison du projet avec conseils de suivi ou proposition d’un entretien régulier défini dans un devis distinct." },
    ]}
    service={{ name: "Création de mur végétal naturel", description: "Conception et installation de murs végétaux naturels sur mesure, avec ou sans entretien.", areaServed: ["Lille", "Métropole Européenne de Lille"] }}
    visitVisual={{ src: "/mur-vegetal-tibaldo-jungle-encyclopedie.webp", alt: "Mur végétal naturel mature conçu et cultivé par Tibaldo Jungle", caption: "Un exemple de mur vivant cultivé par Tibaldo Jungle" }}
    notice={{ eyebrow: "Projet personnalisé", title: "Création et entretien sur devis", copy: "Le prix dépend de la surface, du support, de l’accès, du système retenu, des végétaux et de la fréquence d’entretien souhaitée." }}
    links={[
      { href: "/contact", label: "Décrire votre projet", copy: "Dimensions, photos du mur, lumière disponible et adresse nous permettront de préparer un premier échange." },
      { href: "/plantes", label: "Explorer les plantes", copy: "Découvrir les genres végétaux et leurs besoins avant de composer un projet vivant." },
      { href: "/services", label: "Tous les services", copy: "Diagnostic, rempotage, livraison et autres projets végétaux proposés par le Studio." },
    ]}
    faq={[
      { question: "Combien coûte un mur végétal naturel ?", answer: "Chaque création est chiffrée sur devis. La surface, le système de culture, le support existant, l’accès à l’eau, les végétaux et la complexité de l’installation influencent le prix." },
      { question: "L’entretien est-il obligatoire ?", answer: "Non. Le mur peut être livré avec des recommandations d’entretien, ou accompagné d’une prestation régulière. Nous précisons toutefois les exigences minimales nécessaires à sa pérennité." },
      { question: "Intervenez-vous auprès des professionnels ?", answer: "Oui. Le service peut concerner une maison, un commerce, des bureaux, un restaurant ou un espace d’accueil à Lille et dans la métropole." },
      { question: "Un mur végétal peut-il être installé partout ?", answer: "Pas toujours. Une visite ou une étude permet de vérifier la lumière, la solidité du support, l’humidité, l’accès à l’eau et les possibilités d’entretien avant de confirmer la faisabilité." },
      { question: "Proposez-vous un contrat d’entretien ?", answer: "Oui, lorsque le projet et la zone d’intervention le permettent. La fréquence, les contrôles, la taille, le nettoyage et le remplacement éventuel de végétaux sont définis dans le devis." },
    ]}
  />;
}
