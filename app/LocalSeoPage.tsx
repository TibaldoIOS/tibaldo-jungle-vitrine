import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";

type LocalPageProps = {
  canonical: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  sectionTitle: string;
  sectionAccent: string;
  paragraphs: string[];
  highlights: { title: string; copy: string }[];
  faq: { question: string; answer: string }[];
  links: { href: string; label: string; copy: string }[];
};

const address = "3 place de l’Arbonnoise, 59000 Lille";

export default function LocalSeoPage(props: LocalPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Florist", "Store", "LocalBusiness"],
        "@id": "https://jungle.tibaldo.fr/#store",
        name: "Tibaldo Jungle — Studio Végétal",
        url: "https://jungle.tibaldo.fr",
        telephone: "+33743727079",
        email: "jungle@tibaldo.fr",
        address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressRegion: "Hauts-de-France", addressCountry: "FR" },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
        ],
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: props.title, item: `https://jungle.tibaldo.fr${props.canonical}` }] },
      { "@type": "FAQPage", mainEntity: props.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return <main className="editorial-page local-seo-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero compact-inner-hero local-seo-hero">
      <div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> {props.eyebrow}</p><h1><span className="hero-line"><span>{props.title}</span></span><span className="hero-line"><span><em>{props.accent}</em></span></span></h1><p>{props.intro}</p><a className="button button-light" href="#informations">Préparer ma visite <Arrow /></a></div>
    </section>

    <section className="shell local-seo-story">
      <header data-reveal><p className="section-kicker">Tibaldo Jungle · Lille</p><h2>{props.sectionTitle}<br /><em>{props.sectionAccent}</em></h2></header>
      <div data-reveal>{props.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>

    <section className="local-seo-highlights"><div className="shell">
      {props.highlights.map((item, index) => <article key={item.title} data-reveal><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.copy}</p></article>)}
    </div></section>

    <section className="shell local-seo-visit" id="informations">
      <div data-reveal><p className="section-kicker">Boutique physique</p><h2>Une adresse végétale<br /><em>au cœur de Lille.</em></h2><p><strong>Tibaldo Jungle — Studio Végétal</strong><br />{address}<br />Mardi–samedi · 10h–19h<br />Dimanche · 10h–13h</p><a className="button button-green" href="https://www.google.com/maps/dir/?api=1&destination=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille" target="_blank" rel="noreferrer">Ouvrir l’itinéraire <Arrow /></a></div>
      <iframe title={`Carte pour ${props.title} chez Tibaldo Jungle à Lille`} src="https://www.google.com/maps?q=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>

    <section className="local-seo-links"><div className="shell"><header data-reveal><p className="section-kicker">Continuer la visite</p><h2>Explorer le Studio.</h2></header><div>{props.links.map((link) => <a href={link.href} key={link.href} data-reveal><h3>{link.label}</h3><p>{link.copy}</p><strong>Découvrir <Arrow /></strong></a>)}</div></div></section>

    <section className="shell local-seo-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Avant de venir.</h2></header>{props.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>
    <SiteFooter />
  </main>;
}
