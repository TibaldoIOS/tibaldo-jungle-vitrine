import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import SosPlantDiagnostic from "./SosPlantDiagnostic";

export const metadata: Metadata = {
  title: "SOS Plantes à Lille | Diagnostic plante Tibaldo Jungle",
  description: "Feuilles jaunes, parasites, racines abîmées ou croissance bloquée ? Premier diagnostic et conseils pour votre plante d’intérieur à Lille.",
  alternates: { canonical: "/sos-plantes" },
  openGraph: { title: "SOS Plantes à Lille", description: "Comprendre les symptômes avant de rempoter ou traiter.", url: "/sos-plantes", type: "website" },
};

const faq = [
  { q: "Puis-je venir sans rendez-vous avec ma plante ?", a: "Oui pour une première observation aux horaires d’ouverture. Pour une plante volumineuse ou très atteinte, envoyez des photos avant le déplacement." },
  { q: "Pouvez-vous identifier un parasite sur photo ?", a: "Une photo nette du dessus et du revers des feuilles, des pétioles et du substrat permet souvent une première orientation, sans remplacer un examen direct." },
  { q: "Faut-il rempoter une plante malade ?", a: "Pas systématiquement. Un rempotage peut ajouter du stress. Il doit répondre à un problème racinaire ou de substrat clairement identifié." },
];

const signs = [
  { image: "/anthurium-crystallinum-feuille.jpg", alt: "Feuille d’Anthurium observée pour repérer des marques", label: "Feuillage", title: "Jaunissement ou taches", copy: "Observer où le symptôme commence permet de distinguer vieillissement, lumière et problème racinaire." },
  { image: "/philodendron-billietiae-revers-feuille.jpg", alt: "Revers de feuille inspecté pour rechercher des parasites", label: "Parasites", title: "Traces, points ou déformations", copy: "Le revers, les nervures et les jeunes pousses racontent souvent plus que la face visible." },
  { image: "/advice-rempotage.jpg", alt: "Racines et substrat examinés avant une intervention", label: "Racines", title: "Odeur ou substrat humide", copy: "Avant de rempoter, on vérifie le drainage, le rythme de séchage et l’état réel des racines." },
  { image: "/pilea-peperomioides-plante.jpg", alt: "Silhouette d’une plante observée pour comprendre sa croissance", label: "Croissance", title: "Port faible ou bloqué", copy: "Lumière, saison, nutrition et taille du pot sont étudiées ensemble, jamais séparément." },
];

export default function Page() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: "SOS Plantes et diagnostic végétal à Lille", provider: { "@type": "LocalBusiness", name: "Studio Végétal — Tibaldo Jungle", address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressCountry: "FR" } }, areaServed: "Lille" },
    { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ] };

  return <main className="editorial-page sos-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero compact-inner-hero sos-hero"><div className="inner-hero-texture"/><div className="inner-hero-shade"/><SiteHeader/><div className="shell inner-hero-content"><p className="eyebrow"><span/> SOS Plantes · Diagnostic à Lille</p><h1><span className="hero-line"><span>Comprendre ce</span></span><span className="hero-line"><span><em>qui ne va pas.</em></span></span></h1><p>Feuilles jaunes, parasites, croissance bloquée : observez les symptômes et obtenez une première orientation avant de traiter.</p><a className="button button-light" href="#diagnostic">Tester l’assistant photo ↓</a></div></section>

    <section className="shell sos-intro"><div><p className="section-kicker">Clinique végétale</p><h2>Lire les signes.<br/><em>Éviter les automatismes.</em></h2></div><div><p>Une feuille jaune ne signifie pas toujours trop d’eau. Une croissance lente n’appelle pas automatiquement de l’engrais. SOS Plantes croise le symptôme avec la lumière, l’arrosage, la saison et l’histoire récente de la plante.</p><p>Ici, l’objectif est de comprendre et d’orienter. Pour une intervention sur les racines, le pot ou le substrat, le Bar à rempotage conserve son propre univers.</p></div></section>

    <section className="sos-signs" aria-labelledby="sos-signs-title"><div className="shell"><header data-reveal><p className="section-kicker">Premiers indices</p><h2 id="sos-signs-title">Ce que la plante<br/><em>vous montre.</em></h2></header><div className="sos-sign-grid">{signs.map((sign, index) => <article key={sign.title} data-reveal><img src={sign.image} alt={sign.alt}/><span>{String(index + 1).padStart(2, "0")} · {sign.label}</span><h3>{sign.title}</h3><p>{sign.copy}</p></article>)}</div></div></section>

    <section className="shell" id="diagnostic"><SosPlantDiagnostic/></section>

    <section className="sos-method"><div className="shell"><header data-reveal><p className="section-kicker">La méthode Tibaldo</p><h2>Observer.<br/><em>Comprendre. Agir.</em></h2></header><div className="sos-method-steps"><article data-reveal><span>01</span><h3>Vous photographiez</h3><p>Une vue entière, le symptôme de près, le revers des feuilles et la surface du pot.</p></article><article data-reveal><span>02</span><h3>On croise les indices</h3><p>Symptômes, lumière, fréquence d’arrosage et changements récents sont mis en relation.</p></article><article data-reveal><span>03</span><h3>Vous intervenez juste</h3><p>Une priorité claire et des gestes mesurés, sans traitement ni rempotage systématique.</p></article></div></div></section>

    <section className="shell sos-knowledge-routes" aria-labelledby="sos-knowledge-title"><header data-reveal><p className="section-kicker">Première orientation</p><h2 id="sos-knowledge-title">Un symptôme,<br/><em>un guide pour commencer.</em></h2><p>Choisissez le signe dominant, puis revenez à l’état réel de la plante avant d’intervenir.</p></header><div>{[
      ["Feuilles jaunes", "Croiser eau, lumière, froid et renouvellement naturel.", "/conseils/feuilles-jaunes-plantes-interieur"],
      ["Thrips", "Inspecter le revers et les jeunes feuilles avant de traiter.", "/conseils/thrips-plantes-interieur"],
      ["Araignées rouges", "Rechercher points, décolorations et fines toiles.", "/conseils/araignees-rouges-plantes"],
      ["Arrosage", "Vérifier la motte plutôt que suivre un calendrier.", "/conseils/arroser-plantes-interieur"],
      ["Humidité", "Augmenter l’humidité sans supprimer la circulation d’air.", "/conseils/humidite-plantes-tropicales"],
      ["Racines et rempotage", "Intervenir seulement si le pot ou les racines le justifient.", "/rempotage"],
    ].map(([title, copy, href]) => <Link href={href} key={href} data-reveal><strong>{title}</strong><span>{copy}</span><small>Lire le guide →</small></Link>)}</div><p className="sos-genre-routes">Les diagnostics de culture sont également détaillés dans les guides <Link href="/plantes/alocasia">Alocasia</Link>, <Link href="/plantes/anthurium">Anthurium</Link> et <Link href="/plantes/monstera">Monstera</Link>.</p></section>

    <section className="shell sos-service-paths"><article data-reveal><span>SOS Plantes</span><h2>Comprendre un problème.</h2><p>Diagnostic, parasites, feuilles abîmées ou croissance anormale : nous cherchons d’abord la cause.</p><a href="/sos-plantes#diagnostic">Faire examiner ma plante ↗</a></article><article data-reveal><span>Bar à rempotage</span><h2>Intervenir sur le pot.</h2><p>Changement de contenant, mélange adapté et travail des racines : un service distinct quand il est réellement nécessaire.</p><a href="/rempotage">Découvrir le rempotage ↗</a></article></section>

    <section className="local-topic-links shell"><a href="/sos-plantes#diagnostic"><span>Examen au Studio</span><strong>Faire diagnostiquer une plante à Lille</strong></a><Link href="/conseils/thrips-plantes-interieur"><span>Parasites</span><strong>Reconnaître les thrips sur vos plantes</strong></Link><a href="/rempotage-plantes-lille"><span>Autre univers</span><strong>Découvrir le Bar à rempotage</strong></a></section>
    <section className="shell local-seo-faq flowers-faq"><header><p className="section-kicker">Questions fréquentes</p><h2>Sauver une plante sans précipitation.</h2></header>{faq.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</section>
    <SiteFooter/>
  </main>;
}
