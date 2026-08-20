import type { Metadata } from "next";
import { SiteFooter } from "../../SiteChrome";
import PlantGenusHero from "../PlantGenusHero";
import "./bananiers.css";

const origin = "https://jungle.tibaldo.fr";
const cards = [
  { name: "Musa basjoo", href: "/plantes/musa/basjoo", genus: "Musa", leaf: "Vert, ample", use: "Pleine terre ou grand pot", cold: "Souche protégée ; parties aériennes plus fragiles", winter: "Paillage respirant et drainage", propagation: "Rejets enracinés" },
  { name: "Musa sikkimensis ‘Red Tiger’", href: "/plantes/musa/sikkimensis-red-tiger", genus: "Musa", leaf: "Marques rouges variables", use: "Pot ou site extérieur protégé", cold: "À évaluer selon site, sans copier Basjoo", winter: "Protection sérieuse ou rentrée", propagation: "Rejets ; semis non fidèle au cultivar" },
  { name: "Musa ‘Florida Variegata’", href: "/plantes/musa/florida-variegata", genus: "Musa", leaf: "Panachure verte et crème", use: "Culture lumineuse en pot", cold: "Sensible au froid", winter: "Lumineux et hors gel", propagation: "Aucune promesse de stabilité non documentée" },
  { name: "Ensete ventricosum ‘Maurelii’", href: "/plantes/ensete/ventricosum-maurelii", genus: "Ensete", leaf: "Vert sombre, rouge et pourpre", use: "Pot ou extérieur saisonnier", cold: "Sensible au gel", winter: "Rentrée hors gel", propagation: "Port solitaire ; pas de rejets spontanés" },
];

export const metadata: Metadata = {
  title: "Bananiers : entretien, Musa, Ensete et hivernage",
  description: "Guide des bananiers : différences entre Musa et Ensete, culture en pot ou pleine terre, eau, substrat, vent, froid et hivernage dans le Nord.",
  alternates: { canonical: "/plantes/bananiers" },
  openGraph: { type: "article", locale: "fr_FR", url: "/plantes/bananiers", title: "Bananiers : comprendre Musa et Ensete", description: "Culture, entretien, rusticité et comparaison de quatre bananiers documentés par Jungle.", images: [{ url: "/photo-reelle-a-venir.svg", width: 1200, height: 1500, alt: "Photographie réelle d’un ensemble de Musa et Ensete à ajouter" }] },
  twitter: { card: "summary_large_image", title: "Bananiers : comprendre Musa et Ensete", description: "Culture, entretien, rusticité et comparaison de quatre bananiers documentés par Jungle.", images: ["/photo-reelle-a-venir.svg"] },
};

export default function BananiersPage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${origin}/plantes/bananiers#page`, name: "Bananiers : Musa et Ensete", url: `${origin}/plantes/bananiers`, description: metadata.description, mainEntity: { "@id": `${origin}/plantes/bananiers#list` } },
    { "@type": "ItemList", "@id": `${origin}/plantes/bananiers#list`, numberOfItems: cards.length, itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, name: card.name, url: `${origin}${card.href}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: origin }, { "@type": "ListItem", position: 2, name: "Plantes", item: `${origin}/plantes` }, { "@type": "ListItem", position: 3, name: "Bananiers", item: `${origin}/plantes/bananiers` }] },
  ] };
  return <><script id="bananiers-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <PlantGenusHero genre="bananiers" label="Univers horticole · Musaceae" title="bananiers" titleLead="Les" subtitle="Musa et Ensete : des silhouettes proches, mais des racines, des rejets et des hivernages qui ne se conduisent pas de la même façon." />
    <main className="banana-main">
      <section className="shell banana-intro"><div><p className="section-kicker">Comprendre avant de cultiver</p><h2>Une allure tropicale.<br /><em>Plusieurs stratégies.</em></h2></div><div><p>Un bananier est une grande plante herbacée, pas un arbre. Son « tronc » est un pseudo-tronc formé par les gaines des feuilles. Sous terre, l’organisation varie : les Musa sont souvent rhizomateux et capables de rejeter, tandis que les Ensete restent normalement solitaires.</p><p>Cette différence commande la multiplication, la place nécessaire et l’hivernage. La rusticité ne se résume jamais à un chiffre : une feuille, un pseudo-tronc et un rhizome n’ont pas la même résistance, et l’humidité hivernale peut être aussi décisive que le froid.</p></div></section>
      <section className="shell banana-genus"><a href="/plantes/musa"><span>01 · Genre</span><h2>Musa</h2><p>Des bananiers souvent rhizomateux, dont Basjoo, Red Tiger et Florida Variegata illustrent trois usages très différents.</p></a><a href="/plantes/ensete"><span>02 · Genre</span><h2>Ensete</h2><p>Des plantes normalement solitaires à base renflée, représentées ici par le spectaculaire Maurelii.</p></a></section>
      <section className="banana-north"><div className="shell"><p className="section-kicker">Encadré local</p><h2>Cultiver un bananier<br /><em>à Lille et dans le Nord.</em></h2><div className="banana-north-grid"><p>Le climat lillois associe gels possibles, faible lumière hivernale, vent et périodes humides. En pleine terre, choisissez un endroit abrité et un sol qui évacue l’eau. Musa basjoo est le candidat le plus logique du groupe, avec une protection de la souche et sans promesse de conservation du feuillage.</p><p>En pot, anticipez la rentrée avant l’automne : Florida Variegata et Ensete Maurelii demandent un hivernage hors gel, tandis que Red Tiger mérite une approche prudente. Au printemps, attendez le réchauffement du sol avant de reprendre franchement eau et engrais.</p></div></div></section>
      <section className="shell banana-care"><p className="section-kicker">Les fondamentaux</p><div><article><h3>Lumière & vent</h3><p>Lumière généreuse, acclimatation au soleil et protection contre les rafales qui fendent les feuilles.</p></article><article><h3>Eau & nutrition</h3><p>Apports abondants en croissance, puis réduction nette lorsque température et lumière diminuent.</p></article><article><h3>Sol & pot</h3><p>Mélange riche mais drainant, pot percé et volume stable pour des plantes rapidement lourdes.</p></article><article><h3>Hiver</h3><p>Identifier d’abord le taxon : paillage d’une souche rustique et rentrée d’un sujet sensible ne sont pas équivalents.</p></article></div></section>
      <section className="shell banana-compare"><header><p className="section-kicker">Comparer sans simplifier</p><h2>Quatre bananiers.<br /><em>Quatre conduites.</em></h2></header><div className="banana-compare-grid">{cards.map((card) => <article key={card.href}><span>{card.genus}</span><h3><a href={card.href}>{card.name}</a></h3><dl><div><dt>Feuillage</dt><dd>{card.leaf}</dd></div><div><dt>Usage</dt><dd>{card.use}</dd></div><div><dt>Froid</dt><dd>{card.cold}</dd></div><div><dt>Hivernage</dt><dd>{card.winter}</dd></div><div><dt>Multiplication</dt><dd>{card.propagation}</dd></div></dl><a className="banana-card-link" href={card.href}>Lire la fiche →</a></article>)}</div></section>
    </main><SiteFooter /></>;
}
