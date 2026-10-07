import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";
import styles from "../tibaldo-jungle-la-voix-du-nord/page.module.css";

const canonicalPath = "/coulisses/tibaldo-jungle-actu-fr";
const canonicalUrl = `https://jungle.tibaldo.fr${canonicalPath}`;
const pressUrl = "https://actu.fr/hauts-de-france/lille_59350/a-lille-il-transforme-sa-passion-devorante-pour-les-plantes-en-une-boutique-aux-airs-de-jungle_64893523.html";
const pressHeadline = "À Lille, il transforme sa passion dévorante pour les plantes en une boutique aux airs de jungle";
const image = {
  url: "/media/owner-media/monstera-deliciosa/monstera-deliciosa-jeune-feuille-fenestree.webp",
  width: 1330,
  height: 2364,
  alt: "Jeune feuille de Monstera deliciosa cultivée et photographiée par TIBALDO.",
};

export const metadata: Metadata = {
  title: "Tibaldo Jungle dans Actu.fr | Boutique de plantes à Lille",
  description: "Actu.fr raconte TIBALDO Jungle, le Studio Végétal de Lille : plantes d’intérieur, variétés rares, rempotage et rendez-vous autour du végétal.",
  alternates: { canonical: canonicalPath },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "TIBALDO Jungle",
    title: "Tibaldo Jungle dans Actu.fr",
    description: "Le média local présente le parcours de Romain Pruvost et l’ouverture du Studio Végétal TIBALDO Jungle à Lille.",
    url: canonicalPath,
    images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tibaldo Jungle dans Actu.fr",
    description: "Découvrez le Studio Végétal TIBALDO Jungle à Lille à travers cette couverture de la presse locale.",
    images: [image.url],
  },
};

const quickFacts = [
  ["Où se trouve TIBALDO Jungle ?", `${jungleLocalIdentity.streetAddress}, ${jungleLocalIdentity.postalCode} ${jungleLocalIdentity.city}, dans le quartier Cormontaigne.`],
  ["Que trouve-t-on au Studio ?", "Des plantes pour débuter comme des variétés plus rares, choisies selon les arrivages et leur identité réelle."],
  ["Le Studio propose-t-il du rempotage ?", "Oui. Le bar à rempotage accompagne le diagnostic des racines, le choix du pot et la composition du substrat."],
  ["Où suivre les rendez-vous du Studio ?", "Les rendez-vous et ateliers sont annoncés lorsqu’ils sont confirmés, dans les événements et sur les réseaux officiels de TIBALDO Jungle."],
] as const;

export default function TibaldoJungleActuFrPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Tibaldo Jungle dans Actu.fr : une passion devenue Studio Végétal à Lille",
        description: metadata.description,
        image: `https://jungle.tibaldo.fr${image.url}`,
        datePublished: "2026-10-07",
        dateModified: "2026-10-07",
        inLanguage: "fr-FR",
        mainEntityOfPage: canonicalUrl,
        author: { "@id": jungleLocalIdentity.organizationId },
        publisher: { "@id": jungleLocalIdentity.organizationId },
        about: { "@id": jungleLocalIdentity.storeId },
        citation: pressUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
          { "@type": "ListItem", position: 2, name: "Coulisses", item: "https://jungle.tibaldo.fr/coulisses" },
          { "@type": "ListItem", position: 3, name: "TIBALDO Jungle dans Actu.fr", item: canonicalUrl },
        ],
      },
    ],
  };

  return <main className={styles.page}>
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true"><Image unoptimized src={image.url} alt="" fill priority sizes="100vw" /></div>
      <div className={styles.heroShade} />
      <SiteHeader />
      <div className={`shell ${styles.heroContent}`}><p className={styles.eyebrow}>Presse locale · 7 octobre 2026</p><h1>Tibaldo Jungle<br /><em>dans Actu.fr.</em><small>Studio Végétal à Lille.</small></h1><p>Le média local revient sur le parcours de Romain Pruvost, de sa collection personnelle à l’ouverture d’une jardinerie urbaine pensée comme un lieu de rencontre.</p></div>
    </section>
    <article className={styles.article}>
      <section className={`shell ${styles.lead}`} data-reveal><div><p className="section-kicker">Une passion devenue lieu</p><h2>Plus qu’une boutique,<br /><em>un Studio Végétal.</em></h2></div><div><p>Publié le 7 octobre 2026, l’article d’Hervine Mahaud pour <cite>Actu.fr</cite> présente le parcours de Romain Pruvost : une passion nourrie par une collection de plus de 500 plantes, devenue un lieu ouvert au public à Lille.</p><p>L’article évoque l’inauguration du 26 septembre, des plantes pour débuter comme des variétés rares, un bar à rempotage et un projet d’ateliers. Il décrit surtout l’envie de faire du Studio un point de rencontre pour les personnes qui aiment cultiver les plantes.</p></div></section>
      <section className={styles.pressPanel} data-reveal><div className="shell"><p>Source externe</p><h2>Lire l’article<br /><em>d’Actu.fr.</em></h2><div><p>« {pressHeadline} », par Hervine Mahaud, publié le 7 octobre 2026. L’accès à l’article original peut être réservé aux abonnés du média.</p><a href={pressUrl}>Consulter l’article original <Arrow /></a></div></div></section>
      <section className={`shell ${styles.concept}`} data-reveal><div><p className="section-kicker">Le projet TIBALDO Jungle</p><h2>Choisir une plante,<br /><em>comprendre son vivant.</em></h2></div><div className={styles.conceptGrid}><div><span>01</span><h3>Une sélection évolutive</h3><p>La boutique réunit des plantes accessibles et des variétés de collection selon leur disponibilité réelle.</p></div><div><span>02</span><h3>Des conseils situés</h3><p>Le choix tient compte de la lumière, de l’espace, du quotidien et de l’expérience de chaque personne.</p></div><div><span>03</span><h3>Des gestes partagés</h3><p>Le rempotage aide à observer les racines et les matières avant d’agir. Les ateliers évoqués dans l’article relèvent d’un projet annoncé, non d’un programme actuel.</p></div></div></section>
      <section className={styles.facts} data-reveal><div className="shell"><header><p className="section-kicker">Repères vérifiés</p><h2>Préparer votre<br /><em>visite au Studio.</em></h2></header><dl>{quickFacts.map(([question, answer]) => <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}</dl></div></section>
      <section className={`shell ${styles.explore}`} data-reveal><header><p className="section-kicker">Continuer la visite</p><h2>Explorer la Jungle.</h2></header><nav aria-label="Découvrir TIBALDO Jungle"><Link href="/boutique-plantes-lille"><span>Le lieu</span><strong>Boutique de plantes à Lille</strong><Arrow /></Link><Link href="/plantes"><span>Les plantes</span><strong>Encyclopédie végétale</strong><Arrow /></Link><Link href="/rempotage"><span>Le service</span><strong>Bar à rempotage</strong><Arrow /></Link><Link href="/substrats"><span>Les matières</span><strong>Comprendre les substrats</strong><Arrow /></Link><Link href="/contact"><span>Venir au Studio</span><strong>Adresse, horaires et itinéraire</strong><Arrow /></Link></nav></section>
      <section className={`shell ${styles.related}`} data-reveal><p className="section-kicker">À lire aussi</p><Link href="/coulisses/tibaldo-jungle-la-voix-du-nord"><span>Presse locale · 26 septembre 2026</span><strong>TIBALDO Jungle dans La Voix du Nord</strong><Arrow /></Link></section>
      <footer className={`shell ${styles.credit}`}><p>Photographie d’illustration : TIBALDO. Cette page est une publication éditoriale originale de TIBALDO Jungle réalisée après lecture de l’article complet ; elle ne reproduit ni son texte ni ses photographies.</p></footer>
    </article>
    <SiteFooter />
  </main>;
}
