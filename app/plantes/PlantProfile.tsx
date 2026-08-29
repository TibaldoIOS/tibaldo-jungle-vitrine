import Link from "next/link";
import Image from "next/image";
import type { PlantEntry } from "@/lib/plants/types";
import {
  isInternalPhotoProductionCopy,
  isPhotoProductionPlaceholder,
} from "@/lib/plants/types";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter } from "../SiteChrome";
import PlantSectionNav from "./PlantSectionNav";
import ScientificName from "./ScientificName";
import PlantShopBar from "./PlantShopBar";
import PlantSpeciesHero from "./PlantSpeciesHero";
import ThaiConstellationProfileV3 from "./ThaiConstellationProfileV3";
import DeliciosaOwnerHero from "./DeliciosaOwnerHero";
import SpeciesLocalStudio from "./SpeciesLocalStudio";
import PlantNeedsVisualSystem from "./PlantNeedsVisualSystem";
import BotanicalPhotoBook from "./BotanicalPhotoBook";
import BotanicalFaq from "./BotanicalFaq";

export default function PlantProfile({ plant }: { plant: PlantEntry }) {
  const gallery = plant.gallery.filter(
    (image, index, images) =>
      !isPhotoProductionPlaceholder(image.src) &&
      images.findIndex((candidate) => candidate.src === image.src) === index,
  );
  const publicDescription = plant.description.filter(
    (text) => !isInternalPhotoProductionCopy(text),
  );
  const publicEditorialSections = plant.editorialSections
    ?.filter((section) => !isInternalPhotoProductionCopy(section.title))
    .map((section) => ({
      ...section,
      paragraphs: section.paragraphs.filter(
        (paragraph) => !isInternalPhotoProductionCopy(paragraph),
      ),
      points: section.points?.filter(
        (point) => !isInternalPhotoProductionCopy(point),
      ),
    }));
  const publicAdvice = plant.tibaldoAdvice.filter(
    (advice) => !isInternalPhotoProductionCopy(advice),
  );
  const publicFaq = plant.faq.filter(
    (item) =>
      !isInternalPhotoProductionCopy(item.question) &&
      !isInternalPhotoProductionCopy(item.answer),
  );
  const hasPublicSpecimenObservation =
    !isInternalPhotoProductionCopy(plant.specimen.observedHeight) ||
    !isInternalPhotoProductionCopy(plant.specimen.note);
  const isVisualP1Species =
    (plant.genre === "cycas" && plant.slug === "revoluta") ||
    (plant.genre === "dicksonia" && plant.slug === "antarctica");
  const isDeliciosa =
    plant.genre === "monstera" && plant.slug === "deliciosa";
  if (plant.genre === "monstera" && plant.slug === "thai-constellation")
    return (
      <main className="editorial-page plant-profile-page thai-profile-v3">
        <ScrollReveal />
        <PlantSpeciesHero plant={plant} />
        <ThaiConstellationProfileV3 plant={plant} gallery={gallery} />
        <SpeciesLocalStudio
          speciesName="Monstera deliciosa ‘Thai Constellation’"
          genusName="Monstera"
          genusSlug="monstera"
        />
        <SiteFooter compactTransit />
        {plant.shopUrl && (
          <PlantShopBar
            shopUrl={plant.shopUrl}
            plantName={plant.botanicalName}
          />
        )}
      </main>
    );
  const isVeitchii = plant.genre === "anthurium" && plant.slug === "veitchii";
  const revealImage = gallery[1] ?? gallery[0];
  return (
    <main
      className={`editorial-page plant-profile-page canonical-species-v22${isDeliciosa ? " species-next-page deliciosa-next deliciosa-standard-species" : ""}${isVeitchii ? " canonical-species-veitchii" : ""}${isVisualP1Species ? ` p1-species-compact p1-species-${plant.genre}` : ""}`}
    >
      <ScrollReveal />
      {isDeliciosa ? (
        <DeliciosaOwnerHero />
      ) : (
        <PlantSpeciesHero plant={plant} />
      )}
      <div className="plant-profile-layout shell">
        <aside>
          <PlantSectionNav />
        </aside>
        <div className="plant-profile-content">
          <section
            className="plant-profile-section plant-identity-section"
            id="identite"
            data-reveal
          >
            <header className="plant-identity-intro">
              <div>
                <p className="section-kicker">Identité botanique</p>
                <h2>
                  Une identité végétale
                  <br />
                  <em>singulière.</em>
                </h2>
              </div>
              <div>
                {publicDescription.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </header>
            <div className="plant-identity-signature">
              <article>
                <span>Nom botanique</span>
                <strong>
                  <ScientificName name={plant.botanicalName} />
                </strong>
                <small>{plant.taxonomy.commonNames.join(" · ")}</small>
              </article>
              <article>
                <span>Origine</span>
                <strong>{plant.origin}</strong>
                <small>{plant.growth.habit}</small>
              </article>
            </div>
            <dl className="plant-facts plant-taxonomy canonical-taxonomy">
              <div>
                <dt>Famille</dt>
                <dd>
                  <Link
                    href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}
                  >
                    {plant.taxonomy.family}
                  </Link>
                </dd>
              </div>
              <div>
                <dt>Genre</dt>
                <dd>
                  <Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link>
                </dd>
              </div>
              <div>
                <dt>Espèce</dt>
                <dd>
                  {plant.taxonomy.species.includes(" ") ? (
                    <ScientificName name={plant.taxonomy.species} />
                  ) : (
                    plant.taxonomy.species
                  )}
                </dd>
              </div>
              {plant.taxonomy.cultivar && (
                <div>
                  <dt>Cultivar</dt>
                  <dd>‘{plant.taxonomy.cultivar}’</dd>
                </div>
              )}
              <div className="is-wide">
                <dt>Habitat naturel</dt>
                <dd>{plant.habitat}</dd>
              </div>
              <div>
                <dt>Croissance</dt>
                <dd>{plant.growth.speed}</dd>
              </div>
              <div>
                <dt>Taille adulte</dt>
                <dd>{plant.growth.adultSize}</dd>
              </div>
            </dl>
            <details className="canonical-taxonomy-more">
              <summary>Taxonomie complète et synonymes <span aria-hidden="true">+</span></summary>
              <dl>
                <div><dt>Ordre botanique</dt><dd>{plant.taxonomy.order}</dd></div>
                <div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div>
                <div><dt>Statut botanique</dt><dd>{plant.hybridization}</dd></div>
              </dl>
            </details>
            {hasPublicSpecimenObservation && (
              <aside className="specimen-note">
                <span>Observation Tibaldo Jungle</span>
                {!isInternalPhotoProductionCopy(plant.specimen.observedHeight) && (
                  <strong>{plant.specimen.observedHeight}</strong>
                )}
                {!isInternalPhotoProductionCopy(plant.specimen.note) && (
                  <p>{plant.specimen.note}</p>
                )}
              </aside>
            )}
          </section>
          {revealImage && (
            <figure className="canonical-species-photo-reveal" data-reveal>
              <div>
                <Image
                  unoptimized
                  src={revealImage.src}
                  alt={revealImage.alt}
                  width={revealImage.width}
                  height={revealImage.height}
                  loading="lazy"
                />
              </div>
              <figcaption><span>Lecture photographique</span>{revealImage.caption}</figcaption>
            </figure>
          )}
          <section className="plant-profile-section" id="entretien">
            <header className="plant-section-heading" data-reveal>
              <p className="section-kicker">Les bons équilibres</p>
              <h2>Comprendre ses besoins.</h2>
            </header>
            <PlantNeedsVisualSystem plant={plant} />
          </section>
          {plant.localSpotlight && (
            <aside className="plant-local-spotlight" data-reveal>
              <p className="section-kicker">Culture locale</p>
              <h2>{plant.localSpotlight.title}</h2>
              <p>{plant.localSpotlight.text}</p>
            </aside>
          )}
          {publicEditorialSections &&
            (isVisualP1Species ? (
              <section
                className="plant-profile-section p1-editorial-chapters"
                aria-labelledby="p1-editorial-title"
              >
                <header className="plant-section-heading" data-reveal>
                  <p className="section-kicker">Culture approfondie</p>
                  <h2 id="p1-editorial-title">
                    Adapter le geste
                    <br />
                    <em>aux conditions.</em>
                  </h2>
                </header>
                <div>
                  {publicEditorialSections.map((section, index) => (
                    <details id={section.id} key={section.id} data-reveal>
                      <summary>
                        <span>0{index + 1}</span>
                        <strong>{section.title}</strong>
                        <i aria-hidden="true" />
                      </summary>
                      <div>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.points && (
                          <ul>
                            {section.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : (
              publicEditorialSections.map((section) => (
                <section
                  className="plant-profile-section plant-editorial-deep-dive"
                  id={section.id}
                  key={section.id}
                  data-reveal
                >
                  <header>
                    <p className="section-kicker">{section.eyebrow}</p>
                    <h2>{section.title}</h2>
                  </header>
                  <div>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.points && (
                      <ul>
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))
            ))}
          <section className="plant-profile-section" id="problemes">
            <header className="plant-section-heading" data-reveal>
              <p className="section-kicker">Diagnostic</p>
              <h2>Lire ce que la plante raconte.</h2>
            </header>
            <div className="plant-problem-list">
              {plant.problems.map((problem, index) => (
                <details key={problem.title} data-reveal>
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{problem.title}</strong>
                    <i aria-hidden="true" />
                  </summary>
                  <div>
                    <p>
                      <b>Cause probable.</b> {problem.cause}
                    </p>
                    <p>
                      <b>Le bon réflexe.</b> {problem.advice}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          <section className="plant-profile-section" id="comparaison">
            <header className="plant-section-heading" data-reveal>
              <p className="section-kicker">Plantes proches</p>
              <h2>Ne plus les confondre.</h2>
            </header>
            <div className="plant-comparison-grid">
              {plant.comparisons.map((item) => (
                <article key={item.name} data-reveal>
                  <span>À comparer</span>
                  <h3>{item.name}</h3>
                  <p>{item.difference}</p>
                </article>
              ))}
            </div>
          </section>
          <BotanicalPhotoBook plant={plant} images={gallery} />
          <section
            className="tibaldo-advice plant-profile-section"
            id="conseils"
            data-reveal
          >
            <p className="section-kicker">Conseils Tibaldo Jungle</p>
            <h2>
              Notre regard
              <br />
              au Studio.
            </h2>
            <ol>
              {publicAdvice.map((advice, index) => (
                <li key={advice}>
                  <span>0{index + 1}</span>
                  <p>{advice}</p>
                </li>
              ))}
            </ol>
            <div className="plant-availability">
              <span>
                {plant.shopUrl
                  ? "Disponibilité en boutique"
                  : "Poursuivre l’exploration"}
              </span>
              <p>
                {plant.shopUrl
                  ? "Consultez la fiche marchande pour connaître le stock actuel. Cette encyclopédie reste indépendante du catalogue de vente."
                  : "Cette fiche appartient à la bibliothèque végétale Tibaldo Jungle. Explorez les plantes du même genre ou de la même famille botanique."}
              </p>
              <a
                className="button button-light"
                href={plant.shopUrl || `/plantes/${plant.genre}`}
              >
                {plant.shopUrl
                  ? "Voir en boutique"
                  : `Découvrir les ${plant.genreLabel}`}{" "}
                <Arrow />
              </a>
            </div>
          </section>
          <BotanicalFaq items={publicFaq} title="Tout savoir avant de l’accueillir." />
          <section className="plant-sources" data-reveal>
            <p className="section-kicker">Sources & prudence</p>
            <p>
              Fiche croisée avec des références botaniques et horticoles
              identifiées. Les conditions de chaque intérieur peuvent modifier
              le comportement de la plante.
            </p>
            <div>
              {plant.sources.map((source) => (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  key={source.url}
                >
                  {source.label} <Arrow />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      {isVeitchii && (
        <SpeciesLocalStudio
          speciesName="Anthurium veitchii"
          genusName="Anthurium"
          genusSlug="anthurium"
        />
      )}
      <SiteFooter />
      {plant.shopUrl && (
        <PlantShopBar shopUrl={plant.shopUrl} plantName={plant.botanicalName} />
      )}
    </main>
  );
}
