import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants, studioCollection } from "@/lib/plants/catalog";
import PlantExplorer from "./PlantExplorer";
import StudioAccessCompact from "./StudioAccessCompact";
import EssentialUniversesV3 from "./EssentialUniversesV3";
import BotanicalDirectoryV3 from "./BotanicalDirectoryV3";
import BotanicalMotif from "./BotanicalMotif";
import { isInternalPhotoProductionCopy } from "@/lib/plants/types";

const SearchIcon = () => <svg className="plants-search-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="4.75"/><path d="m12 12 4 4"/></svg>;

export const metadata: Metadata = {
  title: "Encyclopédie des plantes d’intérieur et tropicales",
  description:
    "Explorez les genres, familles, espèces et cultivars de plantes d’intérieur et tropicales avec des fiches de culture détaillées.",
  alternates: { canonical: "/plantes" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/plantes",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Encyclopédie des plantes d’intérieur et tropicales",
    description: "Recherchez une plante par son nom, sa famille botanique ou ses besoins et consultez les guides Tibaldo Jungle.",
    images: [{ url: "/alocasia-imperial-red.webp", width: 1024, height: 1536, alt: "Encyclopédie végétale Tibaldo Jungle à Lille" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encyclopédie végétale Tibaldo Jungle",
    description: "Genres, espèces, cultivars et conseils de culture pour trouver une plante adaptée à votre intérieur.",
    images: ["/alocasia-imperial-red.webp"],
  },
};

export default function PlantsPage() {
  const pageUrl = "https://jungle.tibaldo.fr/plantes";
  const primaryPlantFamilies = plantFamilies;
  const featuredSlugs = ["monstera", "anthurium", "alocasia", "philodendron", "strelitzia", "bananiers"];
  const featuredFamilies = featuredSlugs
    .map((slug) => primaryPlantFamilies.find((family) => family.slug === slug))
    .filter((family): family is (typeof primaryPlantFamilies)[number] => Boolean(family));
  const speciesCount = (slug: string) => {
    if (slug === "bananiers") return plants.filter((plant) => ["musa", "ensete"].includes(plant.genre)).length;
    return plants.filter((plant) => plant.genre === slug).length;
  };
  const essentialUniverses = featuredFamilies.map((family) => ({ slug: family.slug, name: family.name, descriptor: family.eyebrow, count: speciesCount(family.slug) }));
  const directoryItems = primaryPlantFamilies.map((family) => ({ slug: family.slug, name: family.name, descriptor: family.eyebrow, description: family.description, count: speciesCount(family.slug) }));
  const publicStudioCollection = studioCollection.map((group) => ({
    ...group,
    plants: group.plants.filter(
      (plant) => !isInternalPhotoProductionCopy(plant),
    ),
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: "Encyclopédie des plantes d’intérieur et tropicales", url: pageUrl, description: metadata.description, isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@type": "Thing", name: "Plantes d’intérieur et tropicales" }, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
      { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: "Fiches botaniques Tibaldo Jungle", numberOfItems: plants.length, itemListElement: plants.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `${pageUrl}/${plant.genre}/${plant.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: pageUrl }] },
    ],
  };
  return (
    <main className="editorial-page plants-library-page" id="haut-plantes">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="inner-hero compact-inner-hero plants-hub-hero">
        <div className="inner-hero-texture" />
        <div className="inner-hero-shade" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <div>
            <p className="eyebrow"><span /> Encyclopédie végétale</p>
            <h1>Les plantes.</h1>
            <p>Explorez les grands genres végétaux et ouvrez leurs fiches botaniques.</p>
          </div>
          <div className="plants-hub-hero-actions">
            <a className="plants-hub-search-jump" href="#recherche-plantes" aria-label="Aller à la recherche de plantes"><SearchIcon />Rechercher par nom</a>
            <a className="plants-hub-index-jump" href="#index-botanique">31 genres · index botanique <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="shell plants-hub-manifesto" data-reveal>
        <p className="section-kicker">On prend le vivant au sérieux</p>
        <div><h2>Une encyclopédie<br /><em>faite pour explorer.</em></h2><p>Chaque plante est rattachée à son genre, sa famille et ses besoins réels. Entrez par un univers ou recherchez directement un nom.</p></div>
      </section>

      <section className="shell plants-quick-explore" aria-labelledby="quick-explore-title">
        <header data-reveal><p className="section-kicker">Explorer les plantes</p><h2 id="quick-explore-title">Les univers<br /><em>essentiels.</em></h2><p>Les grandes portes d’entrée de l’encyclopédie, accessibles en un geste.</p></header>
        <EssentialUniversesV3 items={essentialUniverses} />
      </section>

      <section className="plants-hub-sos-v3" data-reveal>
        <BotanicalMotif genre="chlorophytum" />
        <div className="shell plants-hub-sos-v3-inner"><div><p className="section-kicker">Une plante vous inquiète ?</p><h2>Observer.<br/><em>Puis agir.</em></h2><p>Partez du signe réellement observé pour éviter les gestes inutiles.</p></div><div className="plants-sos-signs"><span>01 · Feuilles jaunes</span><span>02 · Parasites</span><span>03 · Racines</span></div><Link className="button button-light" href="/sos-plantes">Ouvrir SOS Plantes <Arrow /></Link></div>
      </section>

      <section className="plants-all-genera-v3" id="index-botanique" aria-labelledby="all-genera-title">
        <div className="shell"><header data-reveal><p className="section-kicker">Botanical Directory</p><h2 id="all-genera-title">Trente et un genres.<br/><em>Un index vivant.</em></h2><p>Tous les univers restent présents dans le HTML et accessibles sans mosaïque répétitive.</p></header><BotanicalDirectoryV3 items={directoryItems} /></div>
      </section>

      <section className="studio-collection plants-hub-collection shell" aria-labelledby="studio-collection-title">
        <header data-reveal><p className="section-kicker">Cultivées et observées par TIBALDO Jungle</p><h2 id="studio-collection-title">La collection<br /><em>du Studio.</em></h2><p>Les plantes suivies par TIBALDO Jungle nourrissent progressivement l’encyclopédie ; cette liste n’est pas un état du stock.</p></header>
        <details><summary>Voir la collection complète <span>{studioCollection.length} groupes</span></summary>
          <div className="studio-collection-list">{publicStudioCollection.map((group, index) => <article key={group.genre}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><a href={group.href}>{group.genre} <Arrow /></a></h3>{group.plants.length > 0 && <ul>{group.plants.map((plant) => <li key={plant}>{plant}</li>)}</ul>}</div></article>)}</div>
        </details>
      </section>

      <PlantExplorer plants={plants} />
      <div className="shell plants-back-top"><a href="#haut-plantes">↑ Retour en haut</a></div>

      <StudioAccessCompact showOpeningEvent />
      <SiteFooter compactTransit />
    </main>
  );
}
