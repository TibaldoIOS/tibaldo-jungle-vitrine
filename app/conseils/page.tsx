import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { guides } from "@/lib/guides/catalog";

export const metadata: Metadata = {
  title: "Conseils plantes d’intérieur | Guides Tibaldo Jungle Lille",
  description: "Guides experts sur l’arrosage, la lumière, les parasites, le rempotage et les substrats pour plantes d’intérieur à Lille.",
  alternates: { canonical: "/conseils" },
};

const universes = [
  { name: "Choisir", copy: "Trouver une plante adaptée à votre lumière, votre pièce et votre quotidien." },
  { name: "Entretenir", copy: "Arroser, nourrir et accompagner la croissance au fil des saisons." },
  { name: "Soigner", copy: "Lire les symptômes et agir avec méthode face aux parasites ou aux feuilles abîmées." },
  { name: "Rempoter", copy: "Comprendre les racines, le pot et le rôle de chaque composant du substrat." },
];

export default function Page() {
  const featured = guides.slice(0, 3);
  return <main className="editorial-page guides-page">
    <ScrollReveal/>
    <section className="inner-hero compact-inner-hero advice-hero"><div className="inner-hero-texture"/><div className="inner-hero-shade"/><SiteHeader/><div className="shell inner-hero-content"><p className="eyebrow"><span/> Conseils Tibaldo Jungle</p><h1><span className="hero-line"><span>Mieux comprendre.</span></span><span className="hero-line"><span><em>Mieux cultiver.</em></span></span></h1><p>Un carnet pratique pour choisir, entretenir et soigner vos plantes d’intérieur, fondé sur l’observation plutôt que sur les recettes automatiques.</p><a className="button button-light" href="#guides">Explorer les guides ↓</a></div></section>

    <section className="shell advice-universes" aria-labelledby="advice-universes-title"><header data-reveal><p className="section-kicker">Par où commencer ?</p><h2 id="advice-universes-title">Un conseil pour<br/><em>chaque situation.</em></h2></header><div>{universes.map((universe, index) => <a href={`#${universe.name.toLowerCase()}`} key={universe.name} data-reveal><span>0{index + 1}</span><h3>{universe.name}</h3><p>{universe.copy}</p><strong>Voir les sujets ↘</strong></a>)}</div></section>

    <section className="advice-featured"><div className="shell"><header data-reveal><p className="section-kicker">À lire maintenant</p><h2>Les questions qui<br/><em>reviennent au Studio.</em></h2></header><div className="advice-featured-grid">{featured.map((guide, index) => <a href={`/conseils/${guide.slug}`} key={guide.slug} className={index === 0 ? "is-main" : ""} data-reveal><img src={guide.image} alt=""/><div><span>{guide.eyebrow} · {guide.readingTime}</span><h3>{guide.title}</h3><p>{guide.intro}</p><strong>Lire le guide ↗</strong></div></a>)}</div></div></section>

    <section className="shell advice-photo-bridge" data-reveal><div><p className="section-kicker">Une photo, un premier indice</p><h2>Votre plante montre<br/><em>un signe inhabituel ?</em></h2></div><div><p>Ajoutez une photo, choisissez le symptôme principal et précisez depuis quand il est apparu. L’assistant prépare une première lecture prudente et vous oriente vers SOS Plantes si nécessaire.</p><a className="button button-green" href="/sos-plantes#diagnostic">Tester le diagnostic photo ↗</a></div></section>

    <section className="shell advice-library" id="guides"><header data-reveal><p className="section-kicker">La bibliothèque</p><h2>Treize guides.<br/><em>Des gestes concrets.</em></h2><p>Des réponses courtes à consulter au bon moment, complétées progressivement par les observations du Studio à Lille.</p></header>{universes.map((universe) => { const items = guides.filter((guide) => guide.category === universe.name); return <section id={universe.name.toLowerCase()} key={universe.name} className="advice-category" data-reveal><div><span>{String(items.length).padStart(2, "0")} sujets</span><h3>{universe.name}</h3><p>{universe.copy}</p></div><div>{items.map((guide) => <a href={`/conseils/${guide.slug}`} key={guide.slug}><img src={guide.image} alt=""/><div><span>{guide.eyebrow} · {guide.readingTime}</span><h4>{guide.title}</h4><p>{guide.intro}</p></div><strong>↗</strong></a>)}</div></section>; })}</section>

    <section className="local-topic-links shell"><a href="/sos-plantes"><span>Service à Lille</span><strong>Diagnostic de plante</strong></a><Link href="/conseils/thrips-plantes-interieur"><span>Parasites</span><strong>Thrips sur plantes d’intérieur</strong></Link><Link href="/plantes/alocasia"><span>Substrats</span><strong>Mélange et culture des Alocasia</strong></Link></section>
    <SiteFooter/>
  </main>;
}
