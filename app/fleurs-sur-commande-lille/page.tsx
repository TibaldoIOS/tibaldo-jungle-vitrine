import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";

const canonical = "https://jungle.tibaldo.fr/fleurs-sur-commande-lille";

export const metadata: Metadata = {
  title: "Fleurs coupées sur commande à Lille | Tibaldo Jungle",
  description: "Commandez vos fleurs coupées à Lille sur devis : sélection fournisseur professionnelle, acompte, retrait en bacs au Studio Végétal ou livraison.",
  alternates: { canonical },
  openGraph: {
    title: "Fleurs coupées sur commande à Lille | Tibaldo Jungle",
    description: "Une commande florale sur mesure, préparée selon votre projet, à retirer au Studio Végétal ou à faire livrer à Lille.",
    url: canonical,
    type: "website",
  },
};

const faqs = [
  { question: "Puis-je acheter des fleurs coupées directement en boutique ?", answer: "Non. Les fleurs coupées sont proposées exclusivement sur commande afin de garantir une sélection fraîche, adaptée à votre projet et commandée spécialement auprès de nos fournisseurs professionnels." },
  { question: "Comment obtenir un devis de fleurs à Lille ?", answer: "Indiquez la date, le type d’événement, les fleurs ou couleurs souhaitées, les quantités et le mode de retrait. Tibaldo Jungle prépare ensuite une proposition personnalisée." },
  { question: "Un acompte est-il demandé ?", answer: "Oui. La commande fournisseur est lancée après validation du devis et règlement de l’acompte indiqué. Le solde et les conditions figurent clairement sur le devis." },
  { question: "Puis-je récupérer les fleurs moi-même ?", answer: "Oui. Les fleurs peuvent être préparées en bacs et retirées au Studio Végétal, 3 place de l’Arbonnoise à Lille, au créneau convenu." },
  { question: "La livraison est-elle possible ?", answer: "Oui, selon la date, le volume et l’adresse. La livraison est chiffrée séparément dans le devis, notamment à Lille et dans la métropole lilloise." },
];

export default function FlowersOnOrderPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Service", name: "Fleurs coupées sur commande à Lille", serviceType: "Commande et livraison de fleurs coupées", provider: { "@type": "Florist", name: "Studio Végétal — Tibaldo Jungle", url: "https://jungle.tibaldo.fr", telephone: "+33743727079", address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressCountry: "FR" } }, areaServed: { "@type": "City", name: "Lille" }, url: canonical },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Nos services", item: "https://jungle.tibaldo.fr/services" }, { "@type": "ListItem", position: 3, name: "Fleurs sur commande", item: canonical }] },
  ];

  return <main className="editorial-page flowers-page"><ScrollReveal /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero compact-inner-hero flowers-hero"><div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" /><SiteHeader /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Fleurs coupées · Lille · Sur commande</p><h1><span className="hero-line"><span>Des fleurs choisies</span></span><span className="hero-line"><span><em>pour votre projet.</em></span></span></h1><p>Une sélection professionnelle de fleurs coupées, commandée spécialement pour votre réception, votre mariage ou votre événement. Aucun stock permanent : chaque demande fait l’objet d’un devis personnalisé.</p><a className="button button-light" href="mailto:jungle@tibaldo.fr?subject=Demande%20de%20devis%20fleurs%20sur%20commande">Demander un devis <Arrow /></a></div></section>
    <section className="shell flowers-intro"><header data-reveal><p className="section-kicker">Une offre simple et transparente</p><h2>Vous imaginez.<br /><em>Nous organisons la commande.</em></h2></header><div data-reveal><p>Tibaldo Jungle vous donne accès à une sélection de fleurs coupées issue de fournisseurs professionnels. Vous nous confiez votre date, vos envies, votre palette de couleurs et les quantités souhaitées : nous vérifions les possibilités, préparons le chiffrage puis lançons l’approvisionnement après validation.</p><p>Cette prestation convient notamment aux mariages, anniversaires, dîners, réceptions privées, besoins professionnels et projets de décoration réalisés par vos soins. Elle concerne la fourniture des fleurs en bacs, sans imposer une prestation florale complète.</p><strong>Les fleurs présentées ou évoquées restent soumises aux disponibilités, aux saisons et aux arrivages du fournisseur.</strong></div></section>
    <section className="flowers-steps"><div className="shell"><article data-reveal><span>01</span><h2>Votre demande</h2><p>Date, ambiance, couleurs, variétés, quantités et budget estimatif.</p></article><article data-reveal><span>02</span><h2>Devis & acompte</h2><p>Une proposition claire avant toute commande auprès du fournisseur.</p></article><article data-reveal><span>03</span><h2>Réception des fleurs</h2><p>Retrait des bacs au Studio ou livraison convenue dans le devis.</p></article></div></section>
    <section className="shell flowers-options"><div data-reveal><p className="section-kicker">Deux façons de recevoir votre commande</p><h2>Retirer au Studio<br /><em>ou être livré.</em></h2></div><div><article data-reveal><span>Retrait</span><h3>Vos fleurs prêtes en bacs</h3><p>Récupérez la commande au 3 place de l’Arbonnoise à Lille, au jour et au créneau fixés ensemble. Vous repartez avec les fleurs coupées destinées à vos propres compositions.</p></article><article data-reveal><span>Livraison</span><h3>Déposées sur votre lieu</h3><p>Selon le volume et la destination, les bacs peuvent être livrés à Lille ou dans la métropole lilloise. Les frais sont indiqués avant validation.</p></article></div></section>
    <section className="flowers-notice"><div className="shell" data-reveal><p>Important</p><h2>Uniquement sur commande.</h2><span>Pas de vente libre de fleurs coupées en magasin. Un délai raisonnable est nécessaire pour consulter les disponibilités, établir le devis et organiser l’approvisionnement.</span><a className="button button-light" href="mailto:jungle@tibaldo.fr?subject=Demande%20de%20devis%20fleurs%20sur%20commande">Parler de votre projet <Arrow /></a></div></section>
    <section className="shell local-seo-faq flowers-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Préparer votre commande.</h2></header>{faqs.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</section>
    <SiteFooter />
  </main>;
}
