import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { familyEditorials } from "@/lib/plants/family-editorials";
import { genreHerbiers } from "@/lib/plants/genre-herbiers";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import PlantCarePassport from "../PlantCarePassport";
import type { Level } from "@/lib/plants/types";
import {
  isInternalPhotoProductionCopy,
  publicPlantImageAlt,
} from "@/lib/plants/types";
import BotanicalGenusHero from "../BotanicalGenusHero";
import { hasBotanicalHero } from "@/lib/plants/botanical-heroes";
import AnthuriumGenusV2 from "../AnthuriumGenusV2";
import GenusPilotV21 from "../GenusPilotV21";
import PhotoGenusHero from "../PhotoGenusHero";
import { hasPhotoGenusHero } from "@/lib/plants/photo-genus-heroes";

type Props = { params: Promise<{ genre: string }> };
type GuideKey = keyof typeof familyGuides;
const listingNameOf = (plant: { botanicalName: string; listingName?: string }) => plant.listingName ?? plant.botanicalName;

export const generateStaticParams = () => Object.keys(familyGuides).map((genre) => ({ genre }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) return {};
  const title = genre === "anthurium"
    ? "Anthurium : entretien, espèces et variétés | TIBALDO Jungle"
    : `${guide.name} : entretien, espèces et variétés`;
  return {
    title,
    description: `Guide complet des ${guide.name} : taxonomie, lumière, arrosage, humidité, substrat, rempotage, espèces et cultivars documentés.`,
    keywords: [`${guide.name}`, `${guide.name} entretien`, `${guide.name} lumière`, `${guide.name} arrosage`, `${guide.name} substrat`, `${guide.name} variétés`],
    alternates: { canonical: `/plantes/${genre}` },
    robots: { index: false, follow: false },
    openGraph: {
      siteName: "TIBALDO Jungle",
      title: genre === "anthurium" ? title : `${guide.name} — Guide de culture et variétés`,
      description: guide.lead,
      url: `/plantes/${genre}`,
      type: "article",
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) notFound();
  const isFamily = "rank" in guide && guide.rank === "family";
  const botanicalName = "botanicalName" in guide ? guide.botanicalName : guide.name;
  const editorials = familyEditorials[genre as keyof typeof familyEditorials] ?? [];
  const herbier = genreHerbiers[genre as keyof typeof genreHerbiers];
  const list = getPlantsByGenre(genre);
  const publicFacts = guide.facts.filter(
    (fact) => !isInternalPhotoProductionCopy(`${fact.label} ${fact.value}`),
  );
  const publicSections = guide.sections.filter(
    (section) =>
      !isInternalPhotoProductionCopy(section.title) &&
      !isInternalPhotoProductionCopy(section.text),
  );
  const publicFaq = guide.faq.filter(
    (item) =>
      !isInternalPhotoProductionCopy(item.question) &&
      !isInternalPhotoProductionCopy(item.answer),
  );
  const isV21Pilot = genre === "alocasia" || genre === "chlorophytum" || genre === "dicksonia";
  const genrePortraits = list
    .map((plant) => ({
      src: plant.gallery[0].src,
      alt: publicPlantImageAlt(
        plant.gallery[0].src,
        plant.botanicalName,
        plant.gallery[0].alt,
      ),
      name: ("listingName" in plant ? plant.listingName : undefined) ?? plant.botanicalName,
      href: `/plantes/${genre}/${plant.slug}`,
    }))
    .filter((portrait, index, portraits) => portraits.findIndex((item) => item.src === portrait.src) === index)
    .slice(0, 4);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${guide.name} : guide de culture, espèces et variétés`,
        description: guide.lead,
        image: guide.image,
        author: {
          "@type": "Organization",
          name: genre === "anthurium" ? "TIBALDO Jungle" : "Studio Végétal – Tibaldo Jungle",
        },
        publisher: {
          "@type": "Organization",
          name: genre === "anthurium" ? "TIBALDO Jungle" : "Studio Végétal – Tibaldo Jungle",
          alternateName: genre === "anthurium" ? "Studio Végétal — TIBALDO Jungle" : "Tibaldo Jungle",
          url: "https://jungle.tibaldo.fr",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: publicFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
            name: guide.name,
            item: `https://jungle.tibaldo.fr/plantes/${genre}`,
          },
        ],
      },
    ],
  };
  return (
    <main className="editorial-page">
      <ScrollReveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {hasPhotoGenusHero(genre) ? (
        <PhotoGenusHero genre={genre} label="Genre végétal" title={guide.name} subtitle={guide.heroSubtitle} />
      ) : hasBotanicalHero(genre) ? (
        <BotanicalGenusHero genre={genre} label="Genre végétal" title={genre === "strelitzia" ? "Oiseaux de paradis" : isFamily ? botanicalName : guide.name} titleLead={genre === "strelitzia" ? "Strelitzia" : "Les"} subtitle={guide.heroSubtitle} isFamily={isFamily} />
      ) : (
        <section className="inner-hero compact-inner-hero family-genre-hero">
          {herbier && (
            <div
              className="family-genre-image is-herbier"
              role="img"
              aria-label={herbier.alt}
              style={{
                backgroundImage: `url(${herbier.image})`,
                backgroundPosition: herbier.position,
              }}
            />
          )}
          <div className="inner-hero-shade" />
          <SiteHeader />
          <div className="shell inner-hero-content">
            <Link className="family-genre-breadcrumb" href="/plantes">
              Encyclopédie <span>·</span> Tous les univers
            </Link>
            <p className="eyebrow">
              <span /> {isFamily ? "Famille botanique" : "Genre végétal"}
            </p>
            <h1>
              <span className="hero-line">
                <span>Les</span>
              </span>
              <span className="hero-line">
                <span>
                  <em>{isFamily ? botanicalName : guide.name}.</em>
                </span>
              </span>
            </h1>
            <p>{guide.heroSubtitle}</p>
          </div>
        </section>
      )}
      <PlantCarePassport
        indicators={[
          {
            label: "Difficulté",
            value: guide.care.difficulty as Level,
            tone: "coral",
          },
          { label: "Lumière", value: guide.care.light as Level, tone: "gold" },
          { label: "Arrosage", value: guide.care.water as Level, tone: "blue" },
          {
            label: "Humidité",
            value: guide.care.humidity as Level,
            tone: "sage",
          },
        ]}
        substrate={guide.care.substrate}
        nutrition={guide.care.nutrition}
      />
      {genre !== "anthurium" && (
        <>
          <section className="genre-portrait shell" aria-labelledby="genre-portrait-title" data-reveal>
            <header>
              <p className="section-kicker">Reconnaître le genre</p>
              <h2 id="genre-portrait-title">
                Plusieurs silhouettes,
                <br />
                <em>un même univers.</em>
              </h2>
              <p>Feuilles, ports et textures varient d’une espèce à l’autre. Parcourez les spécimens déjà présents dans l’encyclopédie.</p>
            </header>
            <div className={`genre-portrait-grid count-${genrePortraits.length}`}>
              {genrePortraits.map((portrait, index) => {
                const visual = (
                  <>
                    <Image unoptimized src={portrait.src} alt={portrait.alt} width="900" height="1100" />
                    <span>0{index + 1}</span>
                    <strong>{portrait.name}</strong>
                    {portrait.href && <small>Voir la fiche <Arrow /></small>}
                  </>
                );
                return portrait.href ? (
                  <a href={portrait.href} key={portrait.src}>
                    {visual}
                  </a>
                ) : (
                  <figure key={portrait.src}>{visual}</figure>
                );
              })}
            </div>
          </section>
          <nav className="plant-explorer is-compact" aria-label={`Espèces et cultivars de ${guide.name}`}>
            <div className="shell plant-explorer-inner">
              <div>
                <span>Explorer les espèces & cultivars</span>
                <div className="plant-explorer-links">
                  {list.length ? (
                    list.map((plant) => (
                      <Link href={`/plantes/${genre}/${plant.slug}`} key={plant.slug}>
                        {listingNameOf(plant)}
                      </Link>
                    ))
                  ) : (
                    <span className="is-disabled">Premières fiches à venir</span>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
      {genre === "anthurium" ? (
        <AnthuriumGenusV2 guide={guide} editorials={editorials} plants={list} />
      ) : isV21Pilot ? (
        <GenusPilotV21
          genre={genre}
          guide={{
            ...guide,
            facts: publicFacts,
            sections: publicSections,
            faq: publicFaq,
          }}
          editorials={editorials}
          plants={list}
        />
      ) : (
        <>
          <article className="family-guide">
            <section className="shell family-guide-intro" data-reveal>
              <div>
                <p className="section-kicker">Guide de culture · Lille</p>
                <h2>
                  Comprendre
                  <br />
                  <em>les {guide.name}.</em>
                </h2>
              </div>
              <div>
                <p>{guide.lead}</p>
                <p>{guide.origin}</p>
              </div>
            </section>
            <section className="family-editorial shell">
              {editorials.map((section, index) => (
                <article key={section.title} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </article>
              ))}
            </section>
            <section className="family-guide-facts shell">
              {publicFacts.map((fact) => (
                <div key={fact.label} data-reveal>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </section>
            {genre === "strelitzia" && (
              <section className="shell strelitzia-comparison" data-reveal>
                <p className="section-kicker">Comparer les cinq espèces</p>
                <h2>
                  Des oiseaux de paradis
                  <br />
                  <em>vraiment différents.</em>
                </h2>
                <div className="strelitzia-comparison-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Espèce</th>
                        <th>Port</th>
                        <th>Feuillage</th>
                        <th>Floraison</th>
                        <th>Culture</th>
                        <th>Particularité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>reginae</th>
                        <td>Touffe compacte</td>
                        <td>Limbe large</td>
                        <td>Orange et bleu</td>
                        <td>Intérieur très lumineux, pot</td>
                        <td>La plus florifère en culture</td>
                      </tr>
                      <tr>
                        <th>juncea</th>
                        <td>Touffe verticale</td>
                        <td>Limbe très réduit à maturité</td>
                        <td>Orange et bleu</td>
                        <td>Soleil, pot drainant</td>
                        <td>Silhouette de jonc</td>
                      </tr>
                      <tr>
                        <th>nicolai</th>
                        <td>Arborescent</td>
                        <td>Très grandes feuilles</td>
                        <td>Blanche et bleu sombre</td>
                        <td>Grand intérieur, extérieur estival</td>
                        <td>Très courant dans le commerce</td>
                      </tr>
                      <tr>
                        <th>alba</th>
                        <td>Arborescent</td>
                        <td>Grand éventail</td>
                        <td>Blanche</td>
                        <td>Grand volume, hors gel</td>
                        <td>Augusta est son synonyme botanique</td>
                      </tr>
                      <tr>
                        <th>caudata</th>
                        <td>Arborescent montagnard</td>
                        <td>Grandes feuilles</td>
                        <td>Pâle</td>
                        <td>Collection, hors gel prudent</td>
                        <td>Rare en culture</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            <section className="family-guide-sections shell">
              {publicSections.map((section, index) => (
                <article key={section.title} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </div>
                </article>
              ))}
            </section>
            <section className="family-guide-problems">
              <div className="shell">
                <header data-reveal>
                  <p className="section-kicker">Diagnostic rapide</p>
                  <h2>Observer avant d’agir.</h2>
                </header>
                <div>
                  {guide.problems.map((problem) => (
                    <article key={problem.title} data-reveal>
                      <h3>{problem.title}</h3>
                      <p>{problem.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <section className="family-guide-local shell" data-reveal>
              <p className="section-kicker">Tibaldo Jungle · Lille</p>
              <h2>Voir, choisir et rempoter votre {guide.name} au Studio.</h2>
              <p>Retrouvez nos conseils personnalisés au 3 place de l’Arbonnoise. Nous adaptons le choix de la plante à votre lumière et proposons le rempotage gratuit toute l’année.</p>
              <Link className="button" href="/contact">
                Nous trouver <Arrow />
              </Link>
            </section>
            <section className="family-guide-faq shell">
              <header data-reveal>
                <p className="section-kicker">Questions fréquentes</p>
                <h2>{guide.name} : les réponses essentielles.</h2>
              </header>
              {publicFaq.map((item) => (
                <details key={item.question} data-reveal>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
              <p className="family-guide-sources">
                Sources botaniques :{" "}
                {guide.sources.map((source, index) => (
                  <span key={source.url}>
                    {index > 0 && " · "}
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            </section>
          </article>
          <section className="plant-index shell">
            <div data-reveal>
              <p className="section-kicker">Espèces et variétés documentées</p>
              <h2>
                {list.length ? (
                  <>
                    Une famille.
                    <br />
                    Des caractères singuliers.
                  </>
                ) : (
                  <>
                    La collection
                    <br />
                    se prépare.
                  </>
                )}
              </h2>
              <p>{list.length ? "Chaque fiche repose sur l’observation, la culture et des sources botaniques identifiées." : `Les premières fiches ${guide.name} seront ajoutées au fil des plantes observées et proposées au Studio.`}</p>
            </div>
            {list.length > 0 && (
              <div className="plant-index-grid">
                {list.map((plant) => (
                  <Link href={`/plantes/${genre}/${plant.slug}`} key={plant.slug} data-reveal>
                    <Image unoptimized src={plant.gallery[0].src} alt={publicPlantImageAlt(plant.gallery[0].src, plant.botanicalName, plant.gallery[0].alt)} width={plant.gallery[0].width} height={plant.gallery[0].height} />
                    <span>
                      {plant.family} · {isInternalPhotoProductionCopy(plant.specimen.observedHeight) ? plant.growth.habit : plant.specimen.observedHeight}
                    </span>
                    <h2>{listingNameOf(plant)}</h2>
                    <p>{plant.subtitle}</p>
                    <strong>
                      Lire la fiche <Arrow />
                    </strong>
                  </Link>
                ))}
              </div>
            )}
          </section>
          <nav className="shell plant-back-link">
            <Link href="/plantes">← Tous les genres</Link>
          </nav>
        </>
      )}
      <SiteFooter compactTransit={genre === "anthurium" || hasPhotoGenusHero(genre)} />
    </main>
  );
}
