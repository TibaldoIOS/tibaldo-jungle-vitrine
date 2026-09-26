import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";
import styles from "./page.module.css";

const canonicalPath = "/coulisses/tibaldo-jungle-la-voix-du-nord";
const canonicalUrl = `https://jungle.tibaldo.fr${canonicalPath}`;
const pressUrl = "https://www.lavoixdunord.fr/1740697/article/2026-09-26/lille-tibaldo-jungle-un-studio-vegetal-ouvre-sur-le-square-de-l-arbonnoise";
const image = {
  url: "/media/owner-media/monstera-deliciosa/monstera-deliciosa-jeune-feuille-fenestree.webp",
  width: 1330,
  height: 2364,
  alt: "Jeune feuille de Monstera deliciosa cultivée par TIBALDO, rétroéclairée et déjà largement fenêtrée.",
};
const shareImage = {
  url: "/media/press/tibaldo-jungle-la-voix-du-nord-og.webp",
  width: 1200,
  height: 630,
  alt: "Feuille de Monstera deliciosa cultivée par TIBALDO, photographiée en lumière naturelle.",
};

export const metadata: Metadata = {
  title: "Tibaldo Jungle dans La Voix du Nord | Studio Végétal Lille",
  description: "La Voix du Nord présente l’ouverture de TIBALDO Jungle, Studio Végétal à Lille : plantes rares, conseils, rempotage et cultures suivies à Wattignies.",
  alternates: { canonical: canonicalPath },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "TIBALDO Jungle",
    title: "Tibaldo Jungle dans La Voix du Nord",
    description: "La presse locale raconte l’ouverture du Studio Végétal TIBALDO Jungle, place de l’Arbonnoise à Lille.",
    url: canonicalPath,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tibaldo Jungle dans La Voix du Nord",
    description: "Découvrez le Studio Végétal TIBALDO Jungle à Lille à travers cette couverture de la presse locale.",
    images: [shareImage.url],
  },
};

const quickFacts = [
  ["Qu’est-ce que TIBALDO Jungle ?", "Un Studio Végétal indépendant consacré aux plantes, aux matières de culture et au conseil."],
  ["Où se trouve le Studio à Lille ?", `${jungleLocalIdentity.streetAddress}, ${jungleLocalIdentity.postalCode} ${jungleLocalIdentity.city}, près du square de l’Arbonnoise.`],
  ["Que trouve-t-on dans la boutique ?", "Des plantes d’intérieur et d’extérieur, des espèces tropicales, des variétés rares, des substrats et des accessoires selon les arrivages."],
  ["TIBALDO Jungle propose-t-il des plantes rares ?", "Oui. La sélection réunit notamment des plantes tropicales et des variétés de collection, selon leur disponibilité réelle."],
  ["Peut-on faire rempoter ses plantes ?", "Oui. Le bar à rempotage permet d’observer les racines, le drainage et le volume du pot avant d’intervenir."],
  ["Certaines plantes sont-elles cultivées par TIBALDO ?", "Oui. Certaines plantes sont suivies et cultivées dans la serre personnelle de Wattignies avant de rejoindre le Studio."],
] as const;

export default function TibaldoJungleLaVoixDuNordPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: "Tibaldo Jungle dans La Voix du Nord : le Studio Végétal de Lille",
    description: metadata.description,
    image: `https://jungle.tibaldo.fr${image.url}`,
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    inLanguage: "fr-FR",
    mainEntityOfPage: canonicalUrl,
    author: { "@id": jungleLocalIdentity.organizationId },
    publisher: { "@id": jungleLocalIdentity.organizationId },
    about: { "@id": jungleLocalIdentity.storeId },
    citation: pressUrl,
  };

  return <main className={styles.page}>
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true"><Image unoptimized src={image.url} alt="" fill priority sizes="100vw" /></div>
      <div className={styles.heroShade} />
      <SiteHeader />
      <div className={`shell ${styles.heroContent}`}><p className={styles.eyebrow}>Presse locale · 26 septembre 2026</p><h1>Tibaldo Jungle<br /><em>dans La Voix du Nord.</em><small>Studio Végétal à Lille.</small></h1><p>Le quotidien régional raconte l’ouverture du Studio Végétal place de l’Arbonnoise et le projet botanique qui relie Lille à la serre de Wattignies.</p></div>
    </section>
    <article className={styles.article}>
      <section className={`shell ${styles.lead}`} data-reveal><div><p className="section-kicker">Une ouverture remarquée à Lille</p><h2>Un lieu pour choisir,<br /><em>comprendre et cultiver.</em></h2></div><div><p>Publié le 26 septembre 2026, l’article de Christophe Tilmant pour <cite>La Voix du Nord</cite> présente TIBALDO Jungle au moment de son ouverture. Il décrit un Studio Végétal consacré aux plantes d’intérieur et d’extérieur, aux espèces tropicales et aux variétés rares.</p><p>La couverture souligne aussi le lien entre la boutique lilloise et la serre personnelle de Wattignies, où certaines plantes sont cultivées et suivies avant de rejoindre le Studio. Cette relation entre observation, culture et conseil donne au lieu sa singularité.</p></div></section>
      <section className={styles.pressPanel} data-reveal><div className="shell"><p>Source externe</p><h2>Lire l’article de<br /><em>La Voix du Nord.</em></h2><div><p>« Lille : Tibaldo Jungle, un studio végétal, ouvre sur le square de l’Arbonnoise », par Christophe Tilmant (CLP), publié le 26 septembre 2026.</p><a href={pressUrl}>Consulter l’article original <Arrow /></a></div></div></section>
      <section className={`shell ${styles.concept}`} data-reveal><div><p className="section-kicker">Le concept du Studio</p><h2>Une boutique de plantes,<br /><em>mais pas seulement.</em></h2></div><div className={styles.conceptGrid}><div><span>01</span><h3>Une sélection vivante</h3><p>Plantes d’intérieur, plantes d’extérieur, sujets tropicaux et variétés rares se rencontrent au rythme des cultures et des arrivages.</p></div><div><span>02</span><h3>Un conseil concret</h3><p>Le choix d’une plante tient compte de la lumière, de l’espace disponible et du quotidien de la personne qui va la cultiver.</p></div><div><span>03</span><h3>Un bar à rempotage</h3><p>Le Studio accompagne aussi l’observation des racines, le choix du contenant et la composition d’un substrat adapté.</p></div></div></section>
      <section className={styles.facts} data-reveal><div className="shell"><header><p className="section-kicker">Repères factuels</p><h2>TIBALDO Jungle<br /><em>en quelques mots.</em></h2></header><dl>{quickFacts.map(([question, answer]) => <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}</dl></div></section>
      <section className={`shell ${styles.explore}`} data-reveal><header><p className="section-kicker">Préparer votre visite</p><h2>Explorer la Jungle.</h2></header><nav aria-label="Découvrir TIBALDO Jungle"><Link href="/boutique-plantes-lille"><span>Le lieu</span><strong>Boutique de plantes à Lille</strong><Arrow /></Link><Link href="/plantes"><span>Les plantes</span><strong>Encyclopédie végétale</strong><Arrow /></Link><Link href="/plantes/monstera"><span>Les collections</span><strong>Découvrir les Monstera</strong><Arrow /></Link><Link href="/rempotage"><span>Le service</span><strong>Bar à rempotage</strong><Arrow /></Link><Link href="/contact"><span>Venir au Studio</span><strong>Adresse, horaires et itinéraire</strong><Arrow /></Link></nav></section>
      <footer className={`shell ${styles.credit}`}><p>Photographie d’illustration : TIBALDO. Cette page est une publication éditoriale originale de TIBALDO Jungle à propos de sa couverture dans la presse locale ; elle ne reproduit pas l’article de <cite>La Voix du Nord</cite>.</p></footer>
    </article>
    <SiteFooter />
  </main>;
}
