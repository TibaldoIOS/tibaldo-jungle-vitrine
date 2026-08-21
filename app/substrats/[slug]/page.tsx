import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import { featuredSubstrateSlugs, substrateProfiles, substrateReferences, substrates } from "../data";

const origin = "https://jungle.tibaldo.fr";

export function generateStaticParams() {
  return featuredSubstrateSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = substrateProfiles[slug as keyof typeof substrateProfiles];
  if (!profile) return {};
  const canonical = `/substrats/${profile.slug}`;
  return {
    title: `${profile.shortName} à Lille : usages et conseils | Tibaldo Jungle`,
    description: profile.seoDescription,
    alternates: { canonical },
    keywords: [`${profile.shortName} Lille`, `${profile.shortName} plantes`, `substrat plantes Lille`, "Studio Végétal Lille"],
    openGraph: { type: "article", locale: "fr_FR", url: canonical, siteName: "Studio Végétal — Tibaldo Jungle", title: `${profile.shortName} pour plantes à Lille`, description: profile.seoDescription, images: [{ url: "/advice-rempotage.jpg", width: 1200, height: 630, alt: `${profile.shortName} pour plantes d’intérieur chez Tibaldo Jungle à Lille` }] },
    twitter: { card: "summary_large_image", title: `${profile.shortName} pour plantes à Lille`, description: profile.seoDescription, images: ["/advice-rempotage.jpg"] },
  };
}

export default async function SubstrateProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = substrateProfiles[slug as keyof typeof substrateProfiles];
  if (!profile) notFound();
  const substrate = substrates.find((item) => item.slug === profile.slug)!;
  const url = `${origin}/substrats/${profile.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#article`, headline: `${profile.shortName} pour plantes à Lille : usages et conseils`, description: profile.seoDescription, datePublished: "2026-08-15", dateModified: "2026-08-21", mainEntityOfPage: url, inLanguage: "fr-FR", author: { "@id": `${origin}/#organization` }, publisher: { "@id": `${origin}/#organization` }, about: profile.name },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: profile.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${origin}/` }, { "@type": "ListItem", position: 2, name: "Substrats", item: `${origin}/substrats` }, { "@type": "ListItem", position: 3, name: profile.shortName, item: url }] },
  ] };

  return <main className={`editorial-page substrate-detail substrate-detail-${profile.slug}`}>
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero substrate-detail-hero">
      <div
        className="inner-hero-texture"
        style={{ backgroundImage: `linear-gradient(105deg, rgba(6,35,27,.88), rgba(6,35,27,.28)), url(${substrate.image})` }}
        aria-hidden="true"
      /><div className="inner-hero-shade" aria-hidden="true" /><SiteHeader />
      <div className="shell inner-hero-content"><Link className="family-genre-breadcrumb" href="/substrats">Substrats <span>→</span> {profile.shortName}</Link><p className="eyebrow"><span /> {profile.eyebrow}</p><h1><span className="hero-line"><span>{profile.title}</span></span><span className="hero-line"><span><em>{profile.accent}</em></span></span></h1><p>{profile.intro}</p><a className="button button-light" href="#guide">Comprendre ce composant <Arrow /></a></div>
      <div className="shell substrate-availability"><span className={profile.status === "available" ? "is-available" : "is-soon"} /> <strong>{profile.statusLabel}</strong><small>3 place de l’Arbonnoise · Lille</small></div>
    </section>
    <section className="shell substrate-detail-photo" data-reveal><img src={substrate.image} alt={substrate.imageAlt} width="1400" height="850" /><p><span>La matière en détail</span>{profile.intro}</p></section>
    <section className="shell substrate-detail-intro" id="guide" data-reveal><div><p className="section-kicker">Son rôle dans le pot</p><h2>Un composant,<br /><em>un équilibre précis.</em></h2></div><p>{profile.role}</p></section>
    <section className="substrate-detail-strengths"><div className="shell"><header data-reveal><p className="section-kicker">Ce qu’il apporte</p><h2>Lire la matière<br />avant de la mélanger.</h2></header><div className="substrate-strength-grid">{profile.strengths.map((item, index) => <article key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>
    <section className="shell substrate-detail-methods"><header data-reveal><p className="section-kicker">Gestes du Studio</p><h2>Comment utiliser<br />{profile.shortName.toLowerCase()}.</h2></header><div>{profile.methods.map((item) => <article key={item.title} data-reveal><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
    <section className="substrate-detail-guide"><div className="shell substrate-detail-guide-grid"><div data-reveal><p className="section-kicker">Pour quelles plantes ?</p><h2>Une matière choisie<br /><em>selon les racines.</em></h2><ul>{profile.suitableFor.map((plant) => <li key={plant}>{plant}</li>)}</ul></div><aside data-reveal><span>À garder en tête</span>{profile.cautions.map((caution) => <p key={caution}>{caution}</p>)}</aside></div></section>
    <section className="shell local-seo-faq flowers-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Bien utiliser {profile.shortName.toLowerCase()}.</h2></header>{profile.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</section>
    <section className="shell plant-sources substrate-sources" data-reveal><p className="section-kicker">Sources horticoles</p><p>Les propriétés physiques et les usages indiqués sont croisés avec des publications universitaires ou techniques. Le résultat dépend toujours du mélange complet, du contenant et de la conduite d’arrosage.</p><div>{substrateReferences[profile.slug].map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} <Arrow /></a>)}</div><p>Révisé le <time dateTime="2026-08-21">21 août 2026</time> · <Link href="/methodologie-sources">Méthodologie éditoriale</Link></p></section>
    <nav className="shell flower-service-link" data-reveal><Link href="/substrats">Explorer toute la matériauthèque <span>↗</span></Link><Link href="/substrats-en-vrac-lille">Substrats en vrac à Lille <span>↗</span></Link><Link href="/pots-cache-pots-lille">Pots et cache-pots à Lille <span>↗</span></Link></nav>
    <SiteFooter />
  </main>;
}
