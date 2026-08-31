import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plants } from "@/lib/plants/catalog";
import PlantFamilyDirectory from "../../PlantFamilyDirectory";
import { betaOnlyRobots, isPublicJungleDeployment } from "@/lib/deployment-mode";
import { familyHubContent } from "@/lib/plants/family-hub-content";
import { isFamilyIndexable } from "@/lib/seo/indexability";

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
  const robots = betaOnlyRobots ?? (isPublicJungleDeployment && !isFamilyIndexable(slug) ? { index: false, follow: true } : undefined);
  return { title, description, alternates: { canonical: `/plantes/famille/${slug}` }, ...(robots ? { robots } : {}), openGraph: { type: "website", locale: "fr_FR", url: `/plantes/famille/${slug}`, siteName: "Studio Végétal — Tibaldo Jungle", title, description, images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined } };
}

export default async function PlantFamilyPage({ params }: Props) {
  const { family: slug } = await params;
  const family = families.find((item) => item.toLowerCase() === slug);
  if (!family) notFound();
  const matches = plants.filter((plant) => plant.taxonomy.family === family);
  const pageUrl = `https://jungle.tibaldo.fr/plantes/famille/${slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: `${family} : plantes et conseils de culture`, url: pageUrl, description: `Fiches botaniques des plantes de la famille ${family} documentées par Tibaldo Jungle.`, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
    { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: `Plantes de la famille ${family}`, numberOfItems: matches.length, itemListElement: matches.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `https://jungle.tibaldo.fr/plantes/${plant.genre}/${plant.slug}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: "https://jungle.tibaldo.fr/plantes" }, { "@type": "ListItem", position: 3, name: family, item: pageUrl }] },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><PlantFamilyDirectory family={family} plants={matches} content={familyHubContent[slug]} /></>;
}
