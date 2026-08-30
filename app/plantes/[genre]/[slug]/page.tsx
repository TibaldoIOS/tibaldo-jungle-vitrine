import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlant, plants } from "@/lib/plants/catalog";
import PlantProfile from "../../PlantProfile";
import PlantFamilyPage, {
  generateMetadata as generateFamilyMetadata,
} from "../../famille/[family]/page";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "@/lib/plants/types";
import { deliciosaNextFaq } from "@/lib/plants/deliciosa-next";
import { betaOnlyRobots } from "@/lib/deployment-mode";

type Props = { params: Promise<{ genre: string; slug: string }> };

const families = [
  ...new Set(plants.map((plant) => plant.taxonomy.family.toLowerCase())),
];

const localPilotTitles: Record<string, string> = {
  "anthurium/veitchii":
    "Anthurium veitchii : entretien et conseils | TIBALDO Jungle",
  "monstera/thai-constellation":
    "Monstera deliciosa ‘Thai Constellation’ : entretien et conseils | TIBALDO Jungle",
};

const isLocalSpeciesPilot = (genre: string, slug: string) =>
  `${genre}/${slug}` in localPilotTitles;

const isDocumentaryImage = (image: (typeof plants)[number]["gallery"][number]) =>
  !isPhotoProductionPlaceholder(image.src) &&
  !isEditorialPlaceholder(image.src) &&
  image.license?.status !== "media-gap" &&
  !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
  !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`);

export const generateStaticParams = () => [
  ...plants.map(({ genre, slug }) => ({ genre, slug })),
  ...families.map((slug) => ({ genre: "famille", slug })),
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre, slug } = await params;
  if (genre === "famille")
    return generateFamilyMetadata({ params: Promise.resolve({ family: slug }) });
  const plant = getPlant(genre, slug);
  if (!plant) return {};
  const url = `/plantes/${genre}/${slug}`;
  const image = plant.gallery.find(isDocumentaryImage);
  const title = localPilotTitles[`${genre}/${slug}`] ?? plant.seo.title;
  const description = isLocalSpeciesPilot(genre, slug)
    ? `${plant.seo.description.replace(/\s*(Découvrez|Disponibilité)[^.]*\.?$/i, "")} Fiche botanique indépendante des disponibilités du Studio Végétal — TIBALDO Jungle à Lille.`
    : plant.seo.description;
  const socialImages = image
    ? [
        {
          url: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ]
    : [];
  return {
    title,
    description,
    keywords: plant.seo.keywords,
    alternates: { canonical: url },
    ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}),
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      siteName: "TIBALDO Jungle",
      title,
      description,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages.map(({ url: imageUrl }) => imageUrl),
    },
  };
}

export default async function Page({ params }: Props) {
  const { genre, slug } = await params;
  if (genre === "famille")
    return PlantFamilyPage({ params: Promise.resolve({ family: slug }) });
  const plant = getPlant(genre, slug);
  if (!plant) notFound();
  const url = `https://jungle.tibaldo.fr/plantes/${genre}/${slug}`;
  const gallery = plant.gallery.filter(
    (image, index, images) =>
      isDocumentaryImage(image) &&
      images.findIndex((candidate) => candidate.src === image.src) === index,
  );
  const faq =
    genre === "monstera" && slug === "deliciosa"
      ? deliciosaNextFaq
      : plant.faq;
  const localPilot = isLocalSpeciesPilot(genre, slug);
  const organization = localPilot
    ? {
        "@type": "Organization",
        "@id": "https://jungle.tibaldo.fr/#organization",
        name: "TIBALDO Jungle",
        alternateName: "Studio Végétal — TIBALDO Jungle",
        url: "https://jungle.tibaldo.fr",
      }
    : {
        "@type": "Organization",
        "@id": "https://jungle.tibaldo.fr/#organization",
        name: "Studio Végétal – Tibaldo Jungle",
        alternateName: "Tibaldo Jungle",
        url: "https://jungle.tibaldo.fr",
      };
  const localStudio = localPilot
    ? {
        "@type": ["GardenStore", "LocalBusiness"],
        "@id": "https://jungle.tibaldo.fr/#store",
        name: "Studio Végétal — TIBALDO Jungle",
        url: "https://jungle.tibaldo.fr/boutique-plantes-lille",
        parentOrganization: { "@id": "https://jungle.tibaldo.fr/#organization" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "3 place de l’Arbonnoise",
          postalCode: "59000",
          addressLocality: "Lille",
          addressCountry: "FR",
        },
      }
    : null;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: plant.botanicalName,
        description: plant.seo.description,
        datePublished: plant.publishedAt,
        dateModified: plant.updatedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": "https://jungle.tibaldo.fr/#organization" },
        publisher: { "@id": "https://jungle.tibaldo.fr/#organization" },
        image: gallery.map(({ src }) => `https://jungle.tibaldo.fr${src}`),
        about: {
          "@type": "Thing",
          name: plant.botanicalName,
          alternateName: plant.synonyms,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://jungle.tibaldo.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Plantes",
            item: "https://jungle.tibaldo.fr/plantes",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: plant.genreLabel,
            item: `https://jungle.tibaldo.fr/plantes/${genre}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: plant.displayName,
            item: url,
          },
        ],
      },
      ...gallery.map((image) => ({
        "@type": "ImageObject",
        contentUrl: `https://jungle.tibaldo.fr${image.src}`,
        caption: image.caption,
        width: image.width,
        height: image.height,
      })),
      organization,
      ...(localStudio ? [localStudio] : []),
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <PlantProfile plant={plant} />
    </>
  );
}
