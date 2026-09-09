import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { familyEditorials } from "@/lib/plants/family-editorials";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "@/lib/plants/types";
import GoldenGenusHub, { type GoldenGroupGuide } from "../GoldenGenusHub";
import { betaOnlyRobots } from "@/lib/deployment-mode";

type Props = { params: Promise<{ genre: string }> };
type GuideKey = keyof typeof familyGuides;
export const generateStaticParams = () => Object.keys(familyGuides).map((genre) => ({ genre }));

const firstDocumentaryImage = (genre: string) => {
  if (genre === "pilea") return undefined;
  return getPlantsByGenre(genre).flatMap((plant) => plant.gallery).find((image) =>
    !isPhotoProductionPlaceholder(image.src) &&
    !isEditorialPlaceholder(image.src) &&
    image.license?.status !== "media-gap" &&
    !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
    !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`),
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) return {};
  const title = genre === "anthurium" ? "Anthurium : entretien, espèces et variétés | TIBALDO Jungle" : `${guide.name} : entretien, espèces et variétés`;
  const image = firstDocumentaryImage(genre);
  return { title, description: `Guide complet des ${guide.name} : taxonomie, lumière, arrosage, humidité, substrat, rempotage, espèces et cultivars documentés.`, keywords: [`${guide.name}`, `${guide.name} entretien`, `${guide.name} lumière`, `${guide.name} arrosage`, `${guide.name} variétés`], alternates: { canonical: `/plantes/${genre}` }, ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}), openGraph: { siteName: "TIBALDO Jungle", title, description: guide.lead, url: `/plantes/${genre}`, type: "article", images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined } };
}

export default async function Page({ params }: Props) {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) notFound();
  const editorials = familyEditorials[genre as keyof typeof familyEditorials] ?? [];
  const list = getPlantsByGenre(genre);
  const documentaryImage = firstDocumentaryImage(genre);
  const publicFaq = guide.faq.filter((item) => !item.question.toLowerCase().includes("photograph"));
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: `${guide.name} : guide de culture, espèces et variétés`, description: guide.lead, ...(documentaryImage ? { image: documentaryImage.src } : {}), author: { "@type": "Organization", name: "TIBALDO Jungle" }, publisher: { "@type": "Organization", name: "TIBALDO Jungle", alternateName: "Studio Végétal — TIBALDO Jungle", url: "https://jungle.tibaldo.fr" } },
    { "@type": "FAQPage", mainEntity: publicFaq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: "https://jungle.tibaldo.fr/plantes" }, { "@type": "ListItem", position: 3, name: guide.name, item: `https://jungle.tibaldo.fr/plantes/${genre}` }] },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><GoldenGenusHub genre={genre} guide={guide as GoldenGroupGuide} plants={list} editorials={editorials} /></>;
}
