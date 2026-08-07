import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plants } from "@/lib/plants/catalog";
import ScrollReveal from "../../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../../SiteChrome";

type Props = { params: Promise<{ family: string }> };
const families = [...new Set(plants.map((plant) => plant.taxonomy.family))];
export const generateStaticParams = () => families.map((family) => ({ family: family.toLowerCase() }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: slug } = await params;
  const family = families.find((item) => item.toLowerCase() === slug);
  if (!family) return {};
  const title = `${family} : plantes, genres et conseils de culture`;
  const description = `Découvrez les plantes de la famille ${family} documentées par Tibaldo Jungle : genres, espèces, besoins de culture et fiches botaniques.`;
  const image = plants.find((plant) => plant.taxonomy.family === family)?.gallery[0];
  return {
    title,
    description,
    alternates: { canonical: `/plantes/famille/${slug}` },
    openGraph: { type: "website", locale: "fr_FR", url: `/plantes/famille/${slug}`, siteName: "Tibaldo Jungle — Studio Végétal", title, description, images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: image ? [image.src] : undefined },
  };
}

export default async function PlantFamilyPage({ params }: Props) {
  const { family: slug } = await params;
  const family = families.find((item) => item.toLowerCase() === slug);
  if (!family) notFound();
  const matches = plants.filter((plant) => plant.taxonomy.family === family);
  const genera = [...new Set(matches.map((plant) => plant.taxonomy.genus))];
  const pageUrl = `https://jungle.tibaldo.fr/plantes/famille/${slug}`;
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: `${family} : plantes et conseils de culture`, url: pageUrl, description: `Fiches botaniques des plantes de la famille ${family} documentées par Tibaldo Jungle.`, isPartOf: { "@id": "https://jungle.tibaldo.fr/plantes#page" }, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
    { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: `Plantes de la famille ${family}`, numberOfItems: matches.length, itemListElement: matches.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `https://jungle.tibaldo.fr/plantes/${plant.genre}/${plant.slug}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: "https://jungle.tibaldo.fr/plantes" }, { "@type": "ListItem", position: 3, name: family, item: pageUrl }] },
  ] };
  return <main className="editorial-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ScrollReveal /><section className="inner-hero compact-inner-hero"><div className="inner-hero-texture" /><div className="inner-hero-shade" /><SiteHeader /><div className="shell inner-hero-content"><a className="family-genre-breadcrumb" href="/plantes">Encyclopédie <span>·</span> Familles botaniques</a><p className="eyebrow"><span /> Famille botanique</p><h1><span className="hero-line"><span>Les</span></span><span className="hero-line"><span><em>{family}.</em></span></span></h1><p>{genera.join(" · ")} : découvrez les genres, espèces et cultivars documentés dans notre bibliothèque végétale.</p></div></section><section className="plant-index shell"><div data-reveal><p className="section-kicker">Classification botanique</p><h2>{family}.<br />Une famille, plusieurs écritures du vivant.</h2><p>Cette page rassemble volontairement les fiches de la famille {family}. Elle s’enrichira automatiquement à mesure que de nouvelles plantes seront documentées.</p></div><div className="plant-index-grid">{matches.map((plant) => <a href={`/plantes/${plant.genre}/${plant.slug}`} key={plant.slug} data-reveal><img src={plant.gallery[0].src} alt={plant.gallery[0].alt} width={plant.gallery[0].width} height={plant.gallery[0].height} /><span>{plant.taxonomy.genus} · {plant.taxonomy.species}</span><h2>{plant.botanicalName}</h2><p>{plant.subtitle}</p><strong>Lire la fiche <Arrow /></strong></a>)}</div></section><SiteFooter /></main>;
}
