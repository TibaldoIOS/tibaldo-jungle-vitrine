import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Guide du rempotage des plantes | Tibaldo Jungle",
  description: "Quand et comment rempoter une plante d’intérieur : signes à observer, diagnostic des racines, choix du pot et composition du substrat.",
  alternates: { canonical: "/rempotage" },
};

const symptoms = [
  ["Racines serrées", "Elles sortent sous le pot, tournent en cercle ou soulèvent la motte."],
  ["Terreau épuisé", "L’eau traverse trop vite, stagne en surface ou le substrat s’est fortement tassé."],
  ["Plante fragilisée", "Feuilles jaunes, croissance ralentie, pot instable ou suspicion de pourriture."],
];

export default function RepottingPage() {
  return <main className="editorial-page repotting-page">
    <ScrollReveal />
    <section className="inner-hero compact-inner-hero repotting-hero">
      <div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> Bar à rempotage · Gratuit · Lille</p><h1><span className="hero-line"><span>Votre plante</span></span><span className="hero-line"><span><em>manque d’espace ?</em></span></span></h1><p>Apportez-la au Studio : le geste de rempotage est offert toute l’année. Vous réglez uniquement le pot, le substrat ou les fournitures choisis si nécessaire.</p><a className="button button-light" href="/sos-plantes">Diagnostiquer ma plante <Arrow /></a></div>
    </section>
    <section className="repotting-diagnosis shell">
      <div className="repotting-heading" data-reveal><p className="section-kicker">Reconnaître les signes</p><h2>Quand faut-il<br />rempoter ?</h2><p>Un pot plus grand n’est pas toujours la réponse. Le diagnostic évite les rempotages inutiles et protège les racines.</p></div>
      <div className="repotting-symptoms">{symptoms.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="repotting-process"><div className="shell"><p className="section-kicker" data-reveal>Au Studio Végétal</p><h2 data-reveal>Observer. Composer.<br /><em>Faire repartir.</em></h2><div className="repotting-steps"><p data-reveal data-parallax="48" data-parallax-direction="up"><strong>01 · Diagnostic</strong>Nous vérifions la motte, les racines, l’humidité et la stabilité de la plante.</p><p data-reveal data-parallax="58" data-parallax-direction="down"><strong>02 · Mélange sur mesure</strong>Le substrat est ajusté à l’espèce, à votre lumière et à vos habitudes d’arrosage.</p><p data-reveal data-parallax="48" data-parallax-direction="up"><strong>03 · Conseils de reprise</strong>Vous repartez avec des gestes simples pour l’arrosage et les semaines suivantes.</p></div><div className="repotting-free-note"><strong>Le geste et le Terreau Signature sont offerts.</strong><span>Pour une plante classique, même achetée ailleurs. Le nouveau pot, les composants techniques supplémentaires et les sujets hors normes ne sont pas inclus.</span></div><a className="button button-light" href="/contact">Venir au Studio <Arrow /></a></div></section>
    <section className="repotting-note shell" data-reveal><img src="/advice-rempotage.jpg" alt="Rempotage et diagnostic des racines au Studio Végétal Tibaldo Jungle à Lille" width="1200" height="1800" /><div><p className="section-kicker">Le bon réflexe</p><h2>Venez avec votre plante.</h2><p>Si elle est volumineuse, envoyez-nous d’abord une photo du feuillage, du pot et des racines visibles. Nous pourrons préparer votre passage.</p><a className="button button-green" href="mailto:jungle@tibaldo.fr?subject=SOS%20Rempotage">Envoyer des photos <Arrow /></a><p className="repotting-local-links"><a href="/rempotage-monstera-lille">Rempotage Monstera à Lille ↗</a><a href="/diagnostic-plante-lille">Diagnostic de plante à Lille ↗</a></p></div></section>
    <nav className="shell flower-service-link" data-reveal><a href="/rempotage-plantes-lille">Découvrir le service de rempotage à Lille <span>↗</span></a></nav>
    <SiteFooter />
  </main>;
}
