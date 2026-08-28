import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";
import { jungleLocalIdentity, jungleStoreStructuredData } from "@/lib/jungle-local-identity";

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
  service?: {
    name: string;
    description: string;
    areaServed: string[];
    offer?: { price: string; description: string };
  };
  visitVisual?: {
    src: string;
    alt: string;
    caption: string;
  };
  notice?: { eyebrow: string; title: string; copy: string };
};

const linkVisuals: Record<string, { src: string; alt: string }> = {
  "/bar-a-rempotage-lille": { src: "/service-rempotage-plantes-lille.jpg", alt: "Rempotage d’une plante au Studio Végétal Tibaldo Jungle" },
  "/rempotage": { src: "/service-rempotage-plantes-lille.jpg", alt: "Bar à rempotage Tibaldo Jungle à Lille" },
  "/rempotage-plantes-lille": { src: "/service-rempotage-plantes-lille.jpg", alt: "Service de rempotage de plantes à Lille" },
  "/substrats": { src: "/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg", alt: "Composants de substrat horticole en vrac" },
  "/substrats-en-vrac-lille": { src: "/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg", alt: "Substrats horticoles disponibles en vrac à Lille" },
  "/diagnostic-plante-lille": { src: "/service-diagnostic-plantes-lille.jpg", alt: "Diagnostic et observation d’une plante d’intérieur" },
  "/sos-plantes": { src: "/service-diagnostic-plantes-lille.jpg", alt: "Service SOS Plantes à Lille" },
  "/conseils/pot-perce-cache-pot-coupelle": { src: "/advice-rempotage.jpg", alt: "Choix d’un pot percé pour le rempotage d’une plante" },
  "/plantes": { src: "/collection-plantes-rares-tibaldo-jungle-lille.jpg", alt: "Collection de plantes d’intérieur Tibaldo Jungle" },
  "/contact": { src: "/livraison-plantes-studio-vegetal-tibaldo-jungle-lille.jpg", alt: "Studio Végétal Tibaldo Jungle à Lille" },
};

export default function LocalSeoPage(props: LocalPageProps) {
  const visitVisual = props.visitVisual ?? (props.canonical === "/livraison-plantes-lille" ? {
    src: "/livraison-plantes-studio-vegetal-tibaldo-jungle-lille.jpg",
    alt: "Vitrine du Studio Végétal Tibaldo Jungle, boutique de plantes et point de départ des livraisons à Lille",
    caption: "Studio Végétal — Tibaldo Jungle · 3 place de l’Arbonnoise à Lille",
  } : undefined);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...jungleStoreStructuredData(),
      },
      ...(props.service ? [{
        "@type": "Service",
        "@id": `https://jungle.tibaldo.fr${props.canonical}#service`,
        name: props.service.name,
        description: props.service.description,
        url: `https://jungle.tibaldo.fr${props.canonical}`,
        provider: { "@id": jungleLocalIdentity.storeId },
        areaServed: props.service.areaServed.map((name) => ({ "@type": "City", name })),
        serviceType: props.service.name,
        ...(props.service.offer ? { offers: { "@type": "Offer", price: props.service.offer.price, priceCurrency: "EUR", description: props.service.offer.description, availability: "https://schema.org/InStock" } } : {}),
      }] : []),
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: props.title, item: `https://jungle.tibaldo.fr${props.canonical}` }] },
      { "@type": "FAQPage", mainEntity: props.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return <main className="editorial-page local-seo-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={`inner-hero compact-inner-hero local-seo-hero${props.canonical === "/livraison-plantes-lille" ? " is-delivery-hero" : ""}${props.canonical === "/mur-vegetal-naturel-lille" ? " is-living-wall-hero" : ""}`}>
      <div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> {props.eyebrow}</p><h1><span className="hero-line"><span>{props.title}</span></span><span className="hero-line"><span><em>{props.accent}</em></span></span></h1><p>{props.intro}</p><a className="button button-light" href="#informations">Préparer ma visite <Arrow /></a></div>
    </section>

    {props.notice && <aside className={`local-seo-notice${props.canonical === "/livraison-plantes-lille" ? " is-delivery-notice" : ""}`}><div className="shell" data-reveal><span>{props.notice.eyebrow}</span><strong>{props.notice.title}</strong><p>{props.notice.copy}</p></div></aside>}

    <section className="shell local-seo-story">
      <header data-reveal><p className="section-kicker">TIBALDO Jungle · Lille</p><h2>{props.sectionTitle}<br /><em>{props.sectionAccent}</em></h2></header>
      <div data-reveal>{props.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>

    <section className="local-seo-highlights"><div className="shell">
      {props.highlights.map((item, index) => <article key={item.title} data-reveal><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.copy}</p></article>)}
    </div></section>

    <section className="shell local-seo-visit" id="informations">
      <div data-reveal><p className="section-kicker">Boutique physique</p><h2>Une adresse végétale<br /><em>au cœur de Lille.</em></h2><p><strong>{jungleLocalIdentity.storeName}</strong><br />{jungleLocalIdentity.streetAddress}, {jungleLocalIdentity.postalCode} {jungleLocalIdentity.city}<br />Mardi · 14h–19h<br />Mercredi–samedi · 10h–19h<br />Dimanche · 10h–13h</p><a className="button button-green" href="https://www.google.com/maps/dir/?api=1&destination=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille" target="_blank" rel="noreferrer">Ouvrir l’itinéraire <Arrow /></a></div>
      {visitVisual ? <figure className="local-seo-visit-visual"><Image unoptimized src={visitVisual.src} alt={visitVisual.alt} width="1280" height="960" loading="lazy" /><figcaption>{visitVisual.caption}</figcaption></figure> : <iframe title={`Carte pour ${props.title} chez Tibaldo Jungle à Lille`} src="https://www.google.com/maps?q=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
    </section>

    <section className="local-seo-links"><div className="shell"><header data-reveal><p className="section-kicker">Continuer la visite</p><h2>Explorer le Studio.</h2></header><div>{props.links.map((link) => { const visual = linkVisuals[link.href] ?? linkVisuals["/plantes"]; return <a href={link.href} key={link.href} data-reveal><div className="local-seo-link-visual"><Image unoptimized src={visual.src} alt={visual.alt} loading="lazy"/><span aria-hidden="true"/></div><div className="local-seo-link-copy"><h3>{link.label}</h3><p>{link.copy}</p><strong>Découvrir <Arrow /></strong></div></a>; })}</div></div></section>

    <section className="shell local-seo-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Avant de venir.</h2></header>{props.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>
    <SiteFooter />
  </main>;
}
