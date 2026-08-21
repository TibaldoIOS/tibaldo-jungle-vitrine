import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../SiteChrome";

const canonical = "https://jungle.tibaldo.fr/methodologie-sources";
export const metadata: Metadata = {
  title: "Méthodologie éditoriale et sources | Tibaldo Jungle",
  description: "Comment l’encyclopédie Tibaldo Jungle vérifie la taxonomie, distingue faits botaniques, conseils horticoles et informations commerciales, puis révise ses fiches.",
  alternates: { canonical: "/methodologie-sources" },
  robots: { index: true, follow: true },
  openGraph: { type: "article", locale: "fr_FR", url: canonical, title: "Méthodologie éditoriale de Tibaldo Jungle", description: "Sources, vérification botanique, responsabilité éditoriale et processus de correction de l’encyclopédie Jungle." },
  twitter: { card: "summary", title: "Méthodologie éditoriale de Tibaldo Jungle", description: "Sources, vérification botanique et processus de correction de l’encyclopédie Jungle." },
};

const sections = [
  ["Notre objectif", "Jungle construit une encyclopédie durable des plantes documentées par le Studio Végétal. Une fiche représente une identité botanique ou horticole, jamais une taille commerciale, un prix ou un stock momentané."],
  ["Vérifier l’identité botanique", "Le nom scientifique, le genre, l’espèce, la famille, les synonymes et le statut du nom sont contrôlés en priorité auprès de références institutionnelles comme Plants of the World Online de Kew et World Flora Online. Les sources horticoles reconnues, notamment la Royal Horticultural Society, complètent les informations de culture et de cultivar."],
  ["Hiérarchie des sources", "Une référence taxonomique institutionnelle prime pour le statut d’un nom. Une source horticole sert à documenter la culture, sans devenir automatiquement une autorité taxonomique. Une fiche commerciale peut aider à reconnaître une appellation de marché, mais ne suffit pas à établir une espèce."],
  ["Quatre natures d’information", "Un fait botanique décrit une identité ou un caractère vérifiable. Un conseil horticole dépend du climat, du pot, du substrat et des conditions de culture. Une observation Tibaldo n’est publiée que lorsqu’elle provient réellement d’un sujet ou d’une pratique documentée par Tibaldo. Une information commerciale concerne le Studio, un service ou une disponibilité et reste distincte de la fiche encyclopédique."],
  ["Révision et dates", "La date de publication correspond à l’entrée réelle de la fiche dans l’encyclopédie. La date de révision n’est modifiée qu’après une vérification ou une évolution éditoriale substantielle. Une correction typographique isolée ne justifie pas de rajeunir artificiellement une page."],
  ["Prudence horticole", "Les besoins indiqués sont des repères, pas des garanties. Lumière, température, humidité, qualité de l’eau, état racinaire et acclimatation modifient la réaction d’une plante. Les seuils de froid ne doivent jamais être interprétés comme une promesse absolue de survie."],
  ["Responsabilité et correction", "Le contenu est édité par Studio Végétal – Tibaldo Jungle, 3 place de l’Arbonnoise à Lille. Une erreur factuelle ou une source devenue obsolète peut être signalée à jungle@tibaldo.fr ; elle sera vérifiée avant correction."],
] as const;

export default function MethodologieSourcesPage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${canonical}#article`, headline: "Méthodologie éditoriale et sources", description: metadata.description, datePublished: "2026-08-21", dateModified: "2026-08-21", mainEntityOfPage: canonical, author: { "@id": "https://jungle.tibaldo.fr/#organization" }, publisher: { "@id": "https://jungle.tibaldo.fr/#organization" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Méthodologie et sources", item: canonical }] },
    { "@type": "Organization", "@id": "https://jungle.tibaldo.fr/#organization", name: "Studio Végétal – Tibaldo Jungle", alternateName: "Tibaldo Jungle", url: "https://jungle.tibaldo.fr", email: "jungle@tibaldo.fr", address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressCountry: "FR" } },
  ] };
  return <main className="editorial-page methodology-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="inner-hero compact-inner-hero"><div className="inner-hero-shade" /><SiteHeader /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Encyclopédie · Transparence éditoriale</p><h1><span className="hero-line"><span>Méthodologie</span></span><span className="hero-line"><span><em>et sources.</em></span></span></h1><p>Comment Jungle vérifie, nuance et met à jour ses contenus botaniques et horticoles.</p></div></section>
    <article className="shell methodology-content"><header><p className="section-kicker">Responsabilité éditoriale</p><h2>Des informations vérifiables,<br /><em>des conseils toujours contextualisés.</em></h2><p>Publié et révisé le <time dateTime="2026-08-21">21 août 2026</time>.</p></header>{sections.map(([title, text], index) => <section key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}<aside><h2>Références privilégiées</h2><p><a href="https://powo.science.kew.org/" target="_blank" rel="noreferrer">Kew — Plants of the World Online</a> · <a href="https://www.worldfloraonline.org/" target="_blank" rel="noreferrer">World Flora Online</a> · <a href="https://www.rhs.org.uk/plants" target="_blank" rel="noreferrer">Royal Horticultural Society</a></p></aside></article><SiteFooter />
  </main>;
}
