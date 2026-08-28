import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";
import OpeningEventLink from "./OpeningEventLink";

type InnerPageProps = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  cards: { title: string; copy: string; href?: string }[];
  partner?: {
    eyebrow: string;
    name: string;
    copy: string;
    href?: string;
    linkLabel?: string;
  };
};

export default function InnerPage({
  eyebrow,
  title,
  accent,
  intro,
  cards,
  partner,
}: InnerPageProps) {
  return (
    <main className="editorial-page services-page">
      <ScrollReveal />
      <section className="inner-hero compact-inner-hero">
        <div className="inner-hero-texture" aria-hidden="true" />
        <div className="inner-hero-shade" aria-hidden="true" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <p className="eyebrow">
            <span /> {eyebrow}
          </p>
          <h1>
            <span className="hero-line">
              <span>{title}</span>
            </span>
            <span className="hero-line">
              <span>
                <em>{accent}</em>
              </span>
            </span>
          </h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="inner-overview shell">
        <div className="inner-overview-heading" data-reveal>
          <p className="section-kicker">Tibaldo Jungle · Lille</p>
          <h2>
            Une rubrique pensée
            <br />
            pour grandir avec le Studio.
          </h2>
        </div>
        <div className="inner-overview-grid">
          {cards.map((card, index) => (
            <article
              key={card.title}
              data-service={String(index + 1).padStart(2, "0")}
              data-reveal
              style={{ "--service-order": index } as React.CSSProperties}
            >
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              {card.href && (
                <a href={card.href}>
                  Découvrir <Arrow />
                </a>
              )}
            </article>
          ))}
        </div>
        {partner && (
          <aside
            className={`services-partner${partner.href ? "" : " is-reseller"}`}
            data-reveal
          >
            <div>
              <span>{partner.eyebrow}</span>
              <strong>{partner.name}</strong>
            </div>
            <p>{partner.copy}</p>
            {partner.href && partner.linkLabel && (
              <a href={partner.href} target="_blank" rel="sponsored noreferrer">
                {partner.linkLabel} <Arrow />
              </a>
            )}
          </aside>
        )}
        <Link className="button button-green" href="/contact">
          Nous contacter <Arrow />
        </Link>
      </section>
      <OpeningEventLink />
      <SiteFooter />
    </main>
  );
}
