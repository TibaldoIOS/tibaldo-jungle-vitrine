import Image from "next/image";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Les coulisses de Tibaldo Jungle | Création du Studio à Lille",
  description: "Suivez la création de Tibaldo Jungle à Lille : travaux, choix des plantes, installation du Studio Végétal et préparatifs jusqu’à l’ouverture.",
  alternates: { canonical: "/coulisses" },
};

const steps = [
  { date: "Printemps 2026", title: "Le lieu prend forme", copy: "Les premières intentions deviennent un espace concret : circulation, lumière, zones de culture et accueil du public.", image: "/projet-boutique-tibaldo-jungle-lille.webp" },
  { date: "Été 2026", title: "La sélection végétale", copy: "Les plantes sont choisies, suivies et préparées entre Lille et Wattignies, avec une attention particulière portée aux sujets de collection.", image: "/collection-plantes-rares-tibaldo-jungle-lille.jpg" },
  { date: "Août 2026", title: "Le Studio s’installe", copy: "Mobilier, matériauthèque de substrats et espaces de conseil trouvent leur place au 3 place de l’Arbonnoise.", image: "/projet-boutique-tibaldo-jungle-lille.webp" },
  { date: "26 septembre 2026", title: "Le jour J", copy: "Tibaldo Jungle ouvre ses portes : plantes rares, conseils, rempotage raisonné et rencontres autour du vivant.", image: "/opening-jungle.jpg" },
];

export default function CoulissesPage() {
  const schema = { "@context": "https://schema.org", "@type": "Blog", name: "Les coulisses de Tibaldo Jungle", url: "https://jungle.tibaldo.fr/coulisses", inLanguage: "fr-FR", publisher: { "@id": "https://jungle.tibaldo.fr/#store" } };
  return <main className="editorial-page journal-page"><ScrollReveal/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><section className="inner-hero compact-inner-hero"><div className="inner-hero-texture"/><div className="inner-hero-shade"/><SiteHeader/><div className="shell inner-hero-content"><p className="eyebrow"><span/> Journal du Studio · Lille</p><h1><span className="hero-line"><span>De la création</span></span><span className="hero-line"><span><em>jusqu’au jour J.</em></span></span></h1><p>Les étapes, les choix et les imprévus qui donnent naissance à la Jungle.</p></div></section><section className="shell journal-intro"><p className="section-kicker">Les coulisses de la Jungle</p><h2>Un lieu vivant<br/><em>avant même son ouverture.</em></h2><p>Cette première chronologie sera enrichie avec les photos du Studio et une sélection des publications Instagram validées avant mise en ligne.</p></section><section className="shell journal-timeline">{steps.map((step,index)=><article key={step.title} data-reveal><div><span>{String(index+1).padStart(2,"0")}</span><time>{step.date}</time></div><Image unoptimized src={step.image} alt={`${step.title} — création de Tibaldo Jungle à Lille`} width="1200" height="900" loading="lazy"/><div><h2>{step.title}</h2><p>{step.copy}</p></div></article>)}</section><SiteFooter/></main>;
}
