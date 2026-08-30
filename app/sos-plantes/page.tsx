import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import SosPlantDiagnostic from "./SosPlantDiagnostic";
import BotanicalFaq from "../plantes/BotanicalFaq";

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

export default function Page() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: "SOS Plantes et diagnostic végétal à Lille", provider: { "@type": "LocalBusiness", name: "Studio Végétal — Tibaldo Jungle", address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressCountry: "FR" } }, areaServed: "Lille" },
    { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ] };

  return <main className="editorial-page sos-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero compact-inner-hero sos-hero"><div className="inner-hero-texture"/><div className="inner-hero-shade"/><SiteHeader/><div className="shell inner-hero-content"><p className="eyebrow"><span/> SOS Plantes · Diagnostic à Lille</p><h1><span className="hero-line"><span>Comprendre ce</span></span><span className="hero-line"><span><em>qui ne va pas.</em></span></span></h1><p>Feuilles jaunes, parasites, croissance bloquée : préparez les indices utiles, puis faites valider l’orientation par Tibaldo.</p><a className="button button-light" href="#diagnostic">Préparer ma demande ↓</a></div></section>

    <section className="shell sos-intro"><div><p className="section-kicker">Clinique végétale</p><h2>Lire les signes.<br/><em>Éviter les automatismes.</em></h2></div><div><p>Une feuille jaune ne signifie pas toujours trop d’eau. Une croissance lente n’appelle pas automatiquement de l’engrais. SOS Plantes croise le symptôme avec la lumière, l’arrosage, la saison et l’histoire récente de la plante.</p><p>Ici, l’objectif est de comprendre et d’orienter. Pour une intervention sur les racines, le pot ou le substrat, le Bar à rempotage conserve son propre univers.</p></div></section>

    <section className="shell" id="diagnostic"><SosPlantDiagnostic/></section>

    <section className="sos-method"><div className="shell"><header data-reveal><p className="section-kicker">La méthode Tibaldo</p><h2>Observer.<br/><em>Comprendre. Agir.</em></h2></header><div className="sos-method-steps"><article data-reveal><span>01</span><h3>Vous photographiez</h3><p>Une vue entière, le symptôme de près, le revers des feuilles et la surface du pot.</p></article><article data-reveal><span>02</span><h3>On croise les indices</h3><p>Symptômes, lumière, fréquence d’arrosage et changements récents sont mis en relation.</p></article><article data-reveal><span>03</span><h3>Vous intervenez juste</h3><p>Une priorité claire et des gestes mesurés, sans traitement ni rempotage systématique.</p></article></div></div></section>

    <section className="sos-photo-protocol" aria-labelledby="sos-photo-protocol-title">
      <div className="shell">
        <header data-reveal><p className="section-kicker">Le bon dossier photo</p><h2 id="sos-photo-protocol-title">Quatre regards.<br/><em>Un contexte.</em></h2></header>
        <div className="sos-photo-protocol-grid">
          <article data-reveal><span>01</span><strong>Plante entière</strong><p>Pour lire le port, la répartition des symptômes et le rapport à la lumière.</p></article>
          <article data-reveal><span>02</span><strong>Détail net</strong><p>Une zone atteinte cadrée de près, sans filtre ni correction automatique.</p></article>
          <article data-reveal><span>03</span><strong>Revers de feuille</strong><p>Les pétioles et le dessous du limbe révèlent parfois des indices invisibles de face.</p></article>
          <article data-reveal><span>04</span><strong>Pot et substrat</strong><p>La surface, le drainage et le contenant complètent l’histoire récente.</p></article>
        </div>
        <p data-reveal>Ajoutez la fréquence d’arrosage, l’exposition et tout changement récent. Tibaldo valide humainement l’orientation avant qu’elle ne soit présentée au client.</p>
      </div>
    </section>

    <section className="shell sos-service-paths"><article data-reveal><span>À distance</span><h2>Envoyer les photos de ma plante.</h2><p>Préparez des vues nettes et un contexte court. Tibaldo relit les éléments avant toute réponse client : aucun diagnostic automatique n’est présenté comme certain.</p><Link href="/sos-plantes#diagnostic">Préparer mon dossier <Arrow /></Link></article><article data-reveal><span>Au Studio</span><h2>Venir avec ma plante.</h2><p>Si les photographies ne suffisent pas, apportez la plante au Studio pour observer directement le feuillage, le pot, le substrat et les racines accessibles.</p><Link href="/contact">Organiser ma venue <Arrow /></Link></article></section>

    <section className="local-topic-links shell"><Link href="/sos-plantes#diagnostic"><span>Examen au Studio</span><strong>Faire diagnostiquer une plante à Lille</strong></Link><Link href="/conseils/thrips-plantes-interieur"><span>Parasites</span><strong>Reconnaître les thrips sur vos plantes</strong></Link><Link href="/rempotage"><span>Autre univers</span><strong>Découvrir le Bar à rempotage</strong></Link></section>
    <div className="shell sos-faq-shell"><BotanicalFaq items={faq.map((item) => ({ question: item.q, answer: item.a }))} title="Sauver une plante sans précipitation." id="questions-sos" /></div>
    <SiteFooter/>
  </main>;
}
