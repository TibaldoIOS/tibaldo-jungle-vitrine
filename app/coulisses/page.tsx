import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Les coulisses de Tibaldo Jungle | Création du Studio à Lille",
  description: "Suivez la création de Tibaldo Jungle à Lille : travaux, choix des plantes, installation du Studio Végétal et préparatifs jusqu’à l’ouverture.",
  alternates: { canonical: "/coulisses" },
};

const steps = [
  { date: "Printemps 2026", title: "Le lieu prend forme", copy: "Les premières intentions deviennent un espace concret : circulation, lumière, zones de culture et accueil du public.", image: "/media/projet-boutique-tibaldo-jungle-lille.webp" },
  { date: "Été 2026", title: "La sélection végétale", copy: "Les plantes sont préparées et cultivées à Wattignies avant de rejoindre le Studio Végétal, situé au 3 place de l’Arbonnoise à Lille.", image: "/collection-plantes-rares-tibaldo-jungle-lille.jpg" },
  { date: "Août 2026", title: "Le Studio s’installe", copy: "Mobilier, matériauthèque de substrats et espaces de conseil trouvent leur place au 3 place de l’Arbonnoise.", image: "/media/projet-boutique-tibaldo-jungle-lille.webp" },
  { date: "25–26 septembre 2026", title: "Les premiers rendez-vous", copy: "Le Studio a accueilli ses premiers rendez-vous les 25 et 26 septembre 2026, autour des plantes rares, du conseil et du vivant.", image: "/opening-jungle.jpg" },
];

const pressCoverage = [
  { media: "Actu.fr", date: "7 octobre 2026", title: "Une passion devenue boutique aux airs de jungle", summary: "Le média local raconte le parcours de Romain Pruvost, de sa collection personnelle à l’ouverture du Studio Végétal à Lille.", href: "/coulisses/tibaldo-jungle-actu-fr", source: "https://actu.fr/hauts-de-france/lille_59350/a-lille-il-transforme-sa-passion-devorante-pour-les-plantes-en-une-boutique-aux-airs-de-jungle_64893523.html" },
  { media: "La Voix du Nord", date: "26 septembre 2026", title: "Un Studio Végétal ouvre square de l’Arbonnoise", summary: "Le quotidien régional présente l’ouverture, la sélection végétale et le lien entre Lille et les cultures suivies à Wattignies.", href: "/coulisses/tibaldo-jungle-la-voix-du-nord", source: "https://www.lavoixdunord.fr/1740697/article/2026-09-26/lille-tibaldo-jungle-un-studio-vegetal-ouvre-sur-le-square-de-l-arbonnoise" },
] as const;

export default function CoulissesPage() {
  const schema = { "@context": "https://schema.org", "@type": "Blog", name: "Les coulisses de Tibaldo Jungle", url: "https://jungle.tibaldo.fr/coulisses", inLanguage: "fr-FR", publisher: { "@id": "https://jungle.tibaldo.fr/#store" } };
  return <main className="editorial-page journal-page"><ScrollReveal/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><section className="inner-hero compact-inner-hero"><div className="inner-hero-texture"/><div className="inner-hero-shade"/><SiteHeader/><div className="shell inner-hero-content"><p className="eyebrow"><span/> Journal du Studio · Lille</p><h1><span className="hero-line"><span>De la création</span></span><span className="hero-line"><span><em>jusqu’au jour J.</em></span></span></h1><p>Les étapes, les choix et les imprévus qui ont donné naissance à la Jungle.</p></div></section><section className="shell journal-intro"><p className="section-kicker">Les coulisses de la Jungle</p><h2>Un lieu vivant<br/><em>depuis sa création.</em></h2><p>Cette chronologie rassemble les étapes du Studio et pourra être enrichie avec des médias validés.</p><Link className="journal-dream-link" href="/coulisses/mes-plantes-de-reve"><span>Carnet personnel · Projets futurs</span><strong>Mes plantes de rêve</strong><small>Les plantes que le fondateur rêve un jour de cultiver →</small></Link></section><section className={`shell ${styles.press}`} aria-labelledby="press-title"><header><p className="section-kicker">Revue de presse</p><h2 id="press-title">Ils parlent de<br/><em>TIBALDO Jungle.</em></h2></header><div>{pressCoverage.map((item)=><article key={item.media} data-reveal><p>{item.media} · <time>{item.date}</time></p><h3>{item.title}</h3><p>{item.summary}</p><div><Link href={item.href}>Lire notre page éditoriale →</Link><a href={item.source}>Voir la source originale ↗</a></div></article>)}</div></section><section className="shell journal-timeline">{steps.map((step,index)=><article key={step.title} data-reveal><div><span>{String(index+1).padStart(2,"0")}</span><time>{step.date}</time></div><Image unoptimized src={step.image} alt={`${step.title} — création de Tibaldo Jungle à Lille`} width="1200" height="900" loading="lazy"/><div><h2>{step.title}</h2><p>{step.copy}</p></div></article>)}</section><SiteFooter/></main>;
}
