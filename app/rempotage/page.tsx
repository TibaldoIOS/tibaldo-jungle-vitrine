import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";

const canonical = "https://jungle.tibaldo.fr/rempotage";
const socialImage = "https://jungle.tibaldo.fr/advice-rempotage.jpg";

export const metadata: Metadata = {
  title: "Guide du rempotage des plantes | Tibaldo Jungle",
  description: "Quand et comment rempoter une plante d’intérieur : signes à observer, diagnostic des racines, choix du pot et composition du substrat.",
  alternates: { canonical: "/rempotage" },
  openGraph: {
    type: "article",
    url: canonical,
    title: "Guide du rempotage des plantes",
    description: "Reconnaître le bon moment, choisir le pot et le substrat, puis rempoter une plante sans fragiliser ses racines.",
    images: [{ url: socialImage, width: 1200, height: 1800, alt: "Rempotage d’une plante et observation de ses racines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide du rempotage des plantes",
    description: "Les signes à observer, le choix du pot et du substrat, les étapes et les soins après rempotage.",
    images: [socialImage],
  },
};

const symptoms = [
  ["Racines serrées", "Elles sortent sous le pot, tournent en cercle ou soulèvent la motte."],
  ["Terreau épuisé", "L’eau traverse trop vite, stagne en surface ou le substrat s’est fortement tassé."],
  ["Plante fragilisée", "Feuilles jaunes, croissance ralentie, pot instable ou suspicion de pourriture."],
];

const steps = [
  ["Préparer", "Choisissez un pot percé légèrement plus large, un substrat adapté, puis arrosez modérément la plante la veille si la motte est très sèche."],
  ["Observer", "Sortez délicatement la motte. Desserrez seulement les racines qui tournent fortement et retirez les parties molles ou mortes avec un outil propre."],
  ["Replanter", "Placez la plante à la même hauteur, comblez sans tasser excessivement et laissez une marge d’arrosage sous le bord du pot."],
];

export default function RepottingPage() {
  return <main className="editorial-page repotting-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "@id": `${canonical}#article`, headline: "Quand et comment rempoter une plante ?", description: metadata.description, datePublished: "2026-08-17", dateModified: "2026-08-21", mainEntityOfPage: canonical, inLanguage: "fr-FR", author: { "@id": "https://jungle.tibaldo.fr/#organization" }, publisher: { "@id": "https://jungle.tibaldo.fr/#organization" } }) }} />
    <section className="inner-hero compact-inner-hero repotting-hero">
      <div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> Guide pratique · Plantes d’intérieur</p><h1><span className="hero-line"><span>Quand et comment</span></span><span className="hero-line"><span><em>rempoter une plante ?</em></span></span></h1><p>Reconnaître le bon moment, choisir un pot drainant et renouveler le substrat sans fragiliser les racines.</p><a className="button button-light" href="#etapes">Voir les étapes <Arrow /></a></div>
    </section>
    <section className="repotting-diagnosis shell">
      <div className="repotting-heading" data-reveal><p className="section-kicker">Reconnaître les signes</p><h2>Quand faut-il<br />rempoter ?</h2><p>Un pot plus grand n’est pas toujours la réponse. Le diagnostic évite les rempotages inutiles et protège les racines.</p></div>
      <div className="repotting-symptoms">{symptoms.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="repotting-process" id="etapes"><div className="shell"><p className="section-kicker" data-reveal>La méthode</p><h2 data-reveal>Préparer. Observer.<br /><em>Replanter.</em></h2><div className="repotting-steps">{steps.map(([title, copy], index) => <p key={title} data-reveal data-parallax={index === 1 ? "58" : "48"} data-parallax-direction={index === 1 ? "down" : "up"}><strong>0{index + 1} · {title}</strong>{copy}</p>)}</div><div className="repotting-free-note"><strong>Le drainage commence par un trou d’évacuation.</strong><span>Un pot percé permet à l’excédent d’eau de sortir. Une couche de billes d’argile ne remplace pas ce drainage dans un contenant fermé.</span></div><Link className="button button-light" href="/conseils/pot-perce-cache-pot-coupelle">Choisir le bon contenant <Arrow /></Link></div></section>
    <section className="repotting-note shell" data-reveal><img src="/advice-rempotage.jpg" alt="Rempotage d’une plante et observation de ses racines" width="1200" height="1800" /><div><p className="section-kicker">Après le rempotage</p><h2>Quand arroser après<br />un rempotage ?</h2><p><strong>Après un rempotage simple avec des racines saines, arrosez seulement si le nouveau mélange et la motte le nécessitent, puis laissez tout l’excédent s’écouler.</strong> Il n’existe pas de délai universel : l’état initial de la motte et l’intervention réalisée comptent davantage que le calendrier.</p><ul className="repotting-aftercare-list"><li><strong>Racines saines, motte peu humide :</strong> un arrosage complet peut mettre le nouveau mélange en contact avec les racines.</li><li><strong>Motte déjà très humide :</strong> attendez qu’elle commence réellement à sécher au lieu d’ajouter automatiquement de l’eau.</li><li><strong>Racines fortement taillées :</strong> évitez de maintenir le pot saturé ; laissez les zones coupées reprendre dans un mélange aéré.</li><li><strong>Racines malades ou pourries :</strong> corrigez d’abord la cause, retirez seulement les tissus morts et adaptez l’eau à la quantité de racines encore actives.</li><li><strong>Mélange très drainant :</strong> il évacue vite l’excédent, mais cela ne signifie pas que la plante doit être arrosée quotidiennement.</li></ul><p>Replacez ensuite la plante dans une lumière adaptée, sans changement brutal, et évitez une fertilisation soutenue immédiatement après une intervention importante sur les racines.</p><p className="repotting-local-links"><Link href="/substrats">Comprendre les substrats ↗</Link><Link href="/conseils/arroser-plantes-interieur">Adapter l’arrosage ↗</Link></p></div></section>
    <nav className="shell flower-service-link" data-reveal><Link href="/rempotage-plantes-lille"><span>Vous êtes à Lille ?</span> Le Studio Végétal propose également un service de rempotage <strong>↗</strong></Link></nav>
    <SiteFooter />
  </main>;
}
