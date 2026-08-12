import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";

type InnerPageProps = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  cards: { title: string; copy: string; href?: string }[];
};

export default function InnerPage({ eyebrow, title, accent, intro, cards }: InnerPageProps) {
  return <main className="editorial-page"><ScrollReveal /><section className="inner-hero compact-inner-hero"><div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" /><SiteHeader /><div className="shell inner-hero-content"><p className="eyebrow"><span /> {eyebrow}</p><h1><span className="hero-line"><span>{title}</span></span><span className="hero-line"><span><em>{accent}</em></span></span></h1><p>{intro}</p></div></section><section className="inner-overview shell"><div className="inner-overview-heading" data-reveal><p className="section-kicker">Tibaldo Jungle · Lille</p><h2>Une rubrique pensée<br />pour grandir avec le Studio.</h2></div><div className="inner-overview-grid">{cards.map((card, index) => <article key={card.title} data-reveal><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.copy}</p>{card.href && <a href={card.href}>Découvrir <Arrow /></a>}</article>)}</div><a className="button button-green" href="/contact">Nous contacter <Arrow /></a></section><SiteFooter /></main>;
}
