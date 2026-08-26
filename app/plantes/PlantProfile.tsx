import type { Level, PlantEntry } from "@/lib/plants/types";
import {
  isInternalPhotoProductionCopy,
  isPhotoProductionPlaceholder,
} from "@/lib/plants/types";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter } from "../SiteChrome";
import PlantSectionNav from "./PlantSectionNav";
import PlantCarePassport from "./PlantCarePassport";
import ScientificName from "./ScientificName";
import PlantShopBar from "./PlantShopBar";
import PlantSpeciesHero from "./PlantSpeciesHero";
import VeitchiiProfileV2 from "./VeitchiiProfileV2";
import ThaiConstellationProfileV3 from "./ThaiConstellationProfileV3";
import DeliciosaProfileNext from "./DeliciosaProfileNext";
import SpeciesLocalStudio from "./SpeciesLocalStudio";

function Meter({
  label,
  value,
  copy,
}: {
  label: string;
  value: Level;
  copy: string;
}) {
  return (
    <article className="care-meter" data-reveal>
      <header>
        <span>{label}</span>
        <strong>
          <b>{value}</b>/5
        </strong>
      </header>
      <div
        className="care-meter-track"
        aria-label={`${label} : ${value} sur 5`}
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <i className={level <= value ? "is-filled" : ""} key={level} />
        ))}
      </div>
      <p>{copy}</p>
    </article>
  );
}

export default function PlantProfile({ plant }: { plant: PlantEntry }) {
  const difficultyLabels = [
    "",
    "Très facile",
    "Facile",
    "Intermédiaire",
    "Difficile",
    "Expert",
  ];
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
  if (plant.genre === "monstera" && plant.slug === "deliciosa")
    return <DeliciosaProfileNext />;
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
  if (plant.genre === "anthurium" && plant.slug === "veitchii")
    return (
      <main className="editorial-page plant-profile-page veitchii-profile-v2">
        <ScrollReveal />
        <PlantSpeciesHero plant={plant} />
        <PlantCarePassport
          indicators={[
            {
              label: `Difficulté · ${difficultyLabels[plant.care.difficulty]}`,
              value: plant.care.difficulty,
              tone: "coral",
            },
            { label: "Lumière", value: plant.care.light, tone: "gold" },
            { label: "Arrosage", value: plant.care.water, tone: "blue" },
            { label: "Humidité", value: plant.care.humidity, tone: "sage" },
          ]}
          substrate={plant.care.substrate}
          nutrition={plant.care.fertilizing}
        />
        <VeitchiiProfileV2 plant={plant} gallery={gallery} />
        <SpeciesLocalStudio
          speciesName="Anthurium veitchii"
          genusName="Anthurium"
          genusSlug="anthurium"
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
  return (
    <main
      className={`editorial-page plant-profile-page${isVisualP1Species ? ` p1-species-compact p1-species-${plant.genre}` : ""}`}
    >
      <ScrollReveal />
      <PlantSpeciesHero plant={plant} />
      <PlantCarePassport
        indicators={[
          {
            label: `Difficulté · ${difficultyLabels[plant.care.difficulty]}`,
            value: plant.care.difficulty,
            tone: "coral",
          },
          { label: "Lumière", value: plant.care.light, tone: "gold" },
          { label: "Arrosage", value: plant.care.water, tone: "blue" },
          { label: "Humidité", value: plant.care.humidity, tone: "sage" },
        ]}
        substrate={plant.care.substrate}
        nutrition={plant.care.fertilizing}
      />
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
            <dl className="plant-facts plant-taxonomy">
              <div>
                <dt>Famille</dt>
                <dd>
                  <a
                    href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}
                  >
                    {plant.taxonomy.family}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Genre</dt>
                <dd>
                  <a href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</a>
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
              <div className="is-secondary">
                <dt>Ordre botanique</dt>
                <dd>{plant.taxonomy.order}</dd>
              </div>
              <div>
                <dt>Synonymes</dt>
                <dd>{plant.synonyms.join(" · ")}</dd>
              </div>
              <div className="is-wide">
                <dt>Habitat naturel</dt>
                <dd>{plant.habitat}</dd>
              </div>
              <div className="is-wide">
                <dt>Statut botanique</dt>
                <dd>{plant.hybridization}</dd>
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
          <section className="plant-profile-section" id="entretien">
            <header className="plant-section-heading" data-reveal>
              <p className="section-kicker">Les bons équilibres</p>
              <h2>Comprendre ses besoins.</h2>
            </header>
            <div className="care-meter-grid">
              <Meter
                label="Lumière"
                value={plant.care.light}
                copy={plant.care.lightText}
              />
              <Meter
                label="Arrosage"
                value={plant.care.water}
                copy={plant.care.watering}
              />
              <Meter
                label="Humidité"
                value={plant.care.humidity}
                copy={plant.care.humidityText}
              />
              <Meter
                label="Difficulté"
                value={plant.care.difficulty}
                copy={
                  plant.care.difficultyText ??
                  "Vigoureuse lorsque lumière, chaleur et drainage restent cohérents."
                }
              />
            </div>
            <div className="care-details" data-reveal>
              {[
                ["Température", plant.care.temperature],
                ["Substrat", plant.care.substrate],
                ["Rempotage", plant.care.repotting],
                ["Fertilisation", plant.care.fertilizing],
                ["Multiplication", plant.care.propagation],
              ].map(([title, text]) => (
                <article key={title}>
                  <span>{title}</span>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <aside className="toxicity-card" data-reveal>
              <div>
                <span>Toxicité · {plant.toxicity.level}</span>
                <strong>{plant.toxicity.summary}</strong>
              </div>
              <p>{plant.toxicity.details}</p>
            </aside>
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
          {gallery.length > 0 && (
            <section
              className="plant-gallery plant-profile-section"
              data-reveal
            >
              <p className="section-kicker">Galerie végétale</p>
              <div>
                {gallery.map((image) => (
                  <figure key={image.src}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                    />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
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
          <section className="plant-faq plant-profile-section" id="faq">
            <header className="plant-section-heading" data-reveal>
              <p className="section-kicker">Questions fréquentes</p>
              <h2>Tout savoir avant de l’accueillir.</h2>
            </header>
            <div>
              {publicFaq.map((item) => (
                <details key={item.question} data-reveal>
                  <summary>
                    <strong>{item.question}</strong>
                    {isVisualP1Species ? (
                      <i className="p1-faq-indicator" aria-hidden="true" />
                    ) : (
                      <span>+</span>
                    )}
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
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
      <SiteFooter />
      {plant.shopUrl && (
        <PlantShopBar shopUrl={plant.shopUrl} plantName={plant.botanicalName} />
      )}
    </main>
  );
}
