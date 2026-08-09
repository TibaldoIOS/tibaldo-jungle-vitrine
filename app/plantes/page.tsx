import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants } from "@/lib/plants/catalog";
import PlantExplorer from "./PlantExplorer";

export const metadata: Metadata = {
  title: "Plantes rares et d’intérieur à Lille | Tibaldo Jungle",
  description:
    "Explorez les genres et espèces de plantes rares et d’intérieur documentés par Tibaldo Jungle, Studio Végétal à Lille.",
  alternates: { canonical: "/plantes" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/plantes",
    siteName: "Tibaldo Jungle — Studio Végétal",
    title: "Encyclopédie des plantes rares et d’intérieur à Lille",
    description: "Recherchez une plante par son nom, sa famille botanique ou ses besoins et consultez les guides Tibaldo Jungle.",
    images: [{ url: "/alocasia-imperial-red.png", width: 1024, height: 1536, alt: "Encyclopédie végétale Tibaldo Jungle à Lille" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encyclopédie végétale Tibaldo Jungle",
    description: "Genres, espèces, cultivars et conseils de culture pour trouver une plante adaptée à votre intérieur.",
    images: ["/alocasia-imperial-red.png"],
  },
};

export default function PlantsPage() {
  const pageUrl = "https://jungle.tibaldo.fr/plantes";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: "Encyclopédie des plantes rares et d’intérieur", url: pageUrl, description: metadata.description, isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@id": "https://jungle.tibaldo.fr/#store" }, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
      { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: "Fiches botaniques Tibaldo Jungle", numberOfItems: plants.length, itemListElement: plants.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `${pageUrl}/${plant.genre}/${plant.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: pageUrl }] },
    ],
  };
  return (
    <main className="editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="inner-hero compact-inner-hero plants-directory-hero">
        <div className="inner-hero-texture" />
        <div className="inner-hero-shade" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <p className="eyebrow"><span /> Encyclopédie végétale · Lille</p>
          <h1>
            <span className="hero-line"><span>Comprendre</span></span>
            <span className="hero-line"><span><em>le vivant.</em></span></span>
          </h1>
          <p>Explorez les grands genres végétaux, identifiez leurs besoins essentiels et descendez jusqu’aux espèces et cultivars. Chaque fiche rassemble lumière, arrosage, substrat, croissance, toxicité et conseils Tibaldo Jungle.</p>
        </div>
      </section>

      <nav className="plant-explorer" aria-label="Explorer les plantes">
        <div className="shell plant-explorer-inner">
          <div>
            <span>01 · Univers botaniques</span>
            <div className="plant-explorer-links">
              {plantFamilies.map((family) => (
                <a href={`/plantes/${family.slug}`} key={family.slug}>{family.name}</a>
              ))}
            </div>
          </div>
          <div>
            <span>02 · Espèces & cultivars</span>
            <div className="plant-explorer-links">
              {plants.map((plant) => (
                <a href={`/plantes/${plant.genre}/${plant.slug}`} key={`${plant.genre}-${plant.slug}`}>
                  {plant.botanicalName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <PlantExplorer plants={plants} />

      <section className="plant-family-index shell">
        <header data-reveal>
          <p className="section-kicker">L’encyclopédie Tibaldo</p>
          <h2>Choisir un genre.<br /><em>Entrer dans son univers.</em></h2>
          <p>Chaque univers rassemble les espèces et variétés observées, cultivées ou présentées au Studio. L’encyclopédie s’enrichira progressivement.</p>
        </header>
        <div className="plant-family-list">
          {plantFamilies.map((family, index) => (
            <a className="plant-family-card" href={`/plantes/${family.slug}`} key={family.slug} data-reveal>
              <div className="plant-family-visual">
                <img src={family.image} alt={family.imageAlt} width="900" height="1100" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="plant-family-copy">
                <p>{family.eyebrow}</p>
                <h2>{family.name}</h2>
                <span>{family.description}</span>
                <strong>Découvrir le genre <Arrow /></strong>
              </div>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
