import Image from "next/image";
import Link from "next/link";
import { plants } from "@/lib/plants/catalog";
import type { PlantEntry } from "@/lib/plants/types";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "@/lib/plants/types";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter } from "../SiteChrome";
import BotanicalFaq from "./BotanicalFaq";
import BotanicalPhotoBook from "./BotanicalPhotoBook";
import CycasLocalGuide from "./CycasLocalGuide";
import DeliciosaOwnerHero from "./DeliciosaOwnerHero";
import PlantNeedsVisualSystem from "./PlantNeedsVisualSystem";
import PlantSectionNav from "./PlantSectionNav";
import PlantShopBar from "./PlantShopBar";
import PlantSpeciesHero from "./PlantSpeciesHero";
import ScientificName from "./ScientificName";
import SpeciesLocalStudio from "./SpeciesLocalStudio";
import golden from "./GoldenBaseline.module.css";
import canonical from "./GoldenSpeciesCanonical.module.css";

type SnapshotTone = "light" | "water" | "humidity" | "temperature" | "difficulty";
type PlantImage = PlantEntry["gallery"][number];

const mediaOverrides: Record<string, PlantImage[]> = {
  "pilea/peperomioides": [{
    src: "/pilea-peperomioides-plante.jpg",
    alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles",
    caption: "Photographie réelle réutilisable, créditée dans le registre média Jungle.",
    width: 1280,
    height: 1707,
    license: {
      status: "verified",
      creator: "Husky",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      registryPath: "/credits-images",
      note: "Photographie réelle déjà contrôlée dans Jungle.",
    },
  }],
};

const isDocumentaryImage = (image: PlantImage) =>
  !isPhotoProductionPlaceholder(image.src) &&
  !isEditorialPlaceholder(image.src) &&
  image.license?.status !== "media-gap" &&
  !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
  !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`);

const documentaryGallery = (plant: PlantEntry) => {
  const source = mediaOverrides[`${plant.genre}/${plant.slug}`] ?? plant.gallery;
  return source.filter((image, index, images) => isDocumentaryImage(image) && images.findIndex((candidate) => candidate.src === image.src) === index);
};

const firstSentence = (value: string, fallback: string) => {
  const sentence = value.trim().match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return sentence || value.trim() || fallback;
};

function SnapshotItem({ index, label, value, note, tone, level }: {
  index: number;
  label: string;
  value: string;
  note: string;
  tone: SnapshotTone;
  level?: number;
}) {
  return (
    <article className={`${golden.snapshotItem} ${golden[`snapshot_${tone}`]}`} data-reveal>
      <header><span>0{index}</span><small>{label}</small><strong>{value}</strong></header>
      {level ? <div className={golden.snapshotScale} aria-label={`${label} : ${level} sur 5`}>
        {[1, 2, 3, 4, 5].map((step) => <i className={step <= level ? golden.on : ""} key={step} />)}
      </div> : null}
      <p>{note}</p>
    </article>
  );
}

const normalized = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const comparisonHref = (plant: PlantEntry, name: string) => {
  const needle = normalized(name);
  const match = plants.find((candidate) => {
    const names = [candidate.botanicalName, candidate.displayName, candidate.listingName ?? ""].map(normalized).filter(Boolean);
    return names.some((candidateName) => candidateName.includes(needle) || needle.includes(candidateName));
  });
  return match ? `/plantes/${match.genre}/${match.slug}` : `/plantes/${plant.genre}`;
};

export default function GoldenSpeciesProfile({ plant }: { plant: PlantEntry }) {
  const gallery = documentaryGallery(plant);
  const displayPlant = gallery.length ? { ...plant, gallery } : { ...plant, gallery: [] };
  const description = plant.description.filter((text) => !isInternalPhotoProductionCopy(text));
  const editorials = plant.editorialSections
    ?.filter((section) => !isInternalPhotoProductionCopy(section.title))
    .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((text) => !isInternalPhotoProductionCopy(text)) }))
    .filter((section) => section.paragraphs.length || section.points?.length);
  const advice = plant.tibaldoAdvice.filter((text) => !isInternalPhotoProductionCopy(text));
  const specimenNote = isInternalPhotoProductionCopy(plant.specimen.note) ? plant.subtitle : plant.specimen.note;
  const observedHeight = isInternalPhotoProductionCopy(plant.specimen.observedHeight) ? "" : plant.specimen.observedHeight;
  const revealImage = gallery[0];
  const bookImages = gallery.slice(1);
  const isDeliciosa = plant.genre === "monstera" && plant.slug === "deliciosa";
  const isCycasRevoluta = plant.genre === "cycas" && plant.slug === "revoluta";
  const faq = [
    ...plant.faq.filter((item) => !isInternalPhotoProductionCopy(item.question) && !isInternalPhotoProductionCopy(item.answer)),
    { question: `Quand rempoter ${plant.displayName} ?`, answer: plant.care.repotting },
    { question: `Quelle température convient à ${plant.displayName} ?`, answer: plant.care.temperature },
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.question === item.question) === index);

  return (
    <main className={`${golden.page} ${canonical.speciesScope} editorial-page plant-profile-page ${golden.speciesHero}`} data-golden-species-v25={`${plant.genre}/${plant.slug}`} data-golden-species-v1={`${plant.genre}/${plant.slug}`}>
      <ScrollReveal />
      {isDeliciosa ? <DeliciosaOwnerHero /> : <PlantSpeciesHero plant={displayPlant} />}

      <div className={`${golden.speciesLayout} shell`}>
        <aside className={golden.chapterRail}><PlantSectionNav /></aside>
        <div className={golden.speciesStory}>
          <section className={golden.speciesIntro} data-reveal>
            <p className="section-kicker">Portrait botanique</p>
            <div><h2>{plant.displayName}.<br /><em>Une présence à comprendre.</em></h2>{description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          <section className={golden.identity} id="identite" aria-labelledby={`golden-identity-${plant.genre}-${plant.slug}`}>
            <header data-reveal><p className="section-kicker">01 · Identité</p><h2 id={`golden-identity-${plant.genre}-${plant.slug}`}>Un nom précis.<br /><em>Un milieu à respecter.</em></h2></header>
            <div className={golden.identityEditorial} data-reveal>
              <div className={golden.identityName}><span>Nom botanique</span><strong><ScientificName name={plant.botanicalName} /></strong>{plant.taxonomy.commonNames.length ? <small>{[...new Set(plant.taxonomy.commonNames)].join(" · ")}</small> : null}</div>
              <dl className={golden.identityRows}>
                <div><dt>Famille</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link></dd></div>
                <div><dt>Genre</dt><dd><Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link></dd></div>
                <div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div>
                <div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div>
                <div><dt>Port</dt><dd>{plant.growth.habit}</dd></div>
                <div><dt>Croissance</dt><dd>{plant.growth.speed}</dd></div>
              </dl>
            </div>
            <div className={golden.originBand} data-reveal><div><span>Origine documentée</span><strong>{plant.origin}</strong></div><p>{plant.habitat}</p></div>
            <details className={`${golden.identityMore} ${canonical.identityMore}`} data-reveal>
              <summary>Statut, synonymes et observation <span className={canonical.plusMark} aria-hidden="true" /></summary>
              <dl>
                <div><dt>Statut botanique</dt><dd>{plant.hybridization}</dd></div>
                <div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ") || "Aucun synonyme retenu dans cette fiche."}</dd></div>
                <div><dt>Observation documentée</dt><dd>{[observedHeight, specimenNote].filter(Boolean).join(". ")}</dd></div>
              </dl>
            </details>
          </section>

          <section className={golden.snapshot} aria-labelledby={`golden-snapshot-${plant.genre}-${plant.slug}`}>
            <header data-reveal><p className="section-kicker">Lecture en dix secondes</p><h2 id={`golden-snapshot-${plant.genre}-${plant.slug}`}>Les cinq repères essentiels.</h2></header>
            <div className={golden.snapshotGrid}>
              <SnapshotItem index={1} tone="light" label="Lumière" value={`${plant.care.light}/5`} level={plant.care.light} note={firstSentence(plant.care.lightText, "Lumière adaptée au taxon.")} />
              <SnapshotItem index={2} tone="water" label="Arrosage" value={`${plant.care.water}/5`} level={plant.care.water} note={firstSentence(plant.care.watering, "Observer le substrat avant d’arroser.")} />
              <SnapshotItem index={3} tone="humidity" label="Humidité" value={`${plant.care.humidity}/5`} level={plant.care.humidity} note={firstSentence(plant.care.humidityText, "Humidité stable et ventilée.")} />
              <SnapshotItem index={4} tone="temperature" label="Température" value={`${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`} note={firstSentence(plant.care.temperature, "Température stable.")} />
              <SnapshotItem index={5} tone="difficulty" label="Difficulté" value={`${plant.care.difficulty}/5`} level={plant.care.difficulty} note={plant.care.difficultyText ?? "La régularité des gestes fait la différence."} />
            </div>
          </section>

          <section className={golden.speciesEditorial} aria-labelledby={`golden-story-${plant.genre}-${plant.slug}`}>
            <div data-reveal><p className="section-kicker">02 · Lire sa forme</p><h2 id={`golden-story-${plant.genre}-${plant.slug}`}>Une forme liée<br /><em>à son milieu.</em></h2></div>
            <div data-reveal><p>{description[0] ?? plant.subtitle}</p><p>{plant.habitat}</p>{advice[0] ? <aside><span>À observer</span><strong>{plant.growth.habit}</strong><p>{advice[0]}</p></aside> : null}</div>
          </section>

          {revealImage ? (
            <section className={golden.archChapter} aria-labelledby={`golden-arch-${plant.genre}-${plant.slug}`} data-arch-contract="moss-cover-scale-x">
              <div className={golden.archGrid}>
                <div className={golden.archCopy} data-reveal><p className="section-kicker">Portail botanique · 1,65 seconde</p><h2 id={`golden-arch-${plant.genre}-${plant.slug}`}>Un portrait réel.<br /><em>Une transition signature.</em></h2><p>{specimenNote}</p></div>
                <figure className={golden.archFigure} data-reveal>
                  <div className={golden.archMedia}><Image unoptimized src={revealImage.src} alt={revealImage.alt} width={revealImage.width} height={revealImage.height} loading="eager" /></div>
                  <figcaption><span>Photographie réelle contrôlée</span><p>{revealImage.caption}</p></figcaption>
                </figure>
              </div>
            </section>
          ) : (
            <section className={golden.photoBookGap} data-media-state="honest-gap" data-reveal>
              <div><p className="section-kicker">Portrait documentaire</p><h2>Une absence assumée.<br /><em>Aucune image fabriquée.</em></h2></div>
              <p>Aucune photographie documentaire vérifiée n’est présentée pour {plant.botanicalName}. La génération Golden demeure intacte et les informations botaniques restent accessibles.</p>
            </section>
          )}

          <section className={golden.needs} id="entretien" aria-labelledby={`golden-needs-${plant.genre}-${plant.slug}`}>
            <header data-reveal><p className="section-kicker">03 · Les bons équilibres</p><h2 id={`golden-needs-${plant.genre}-${plant.slug}`}>Comprendre ses besoins,<br /><em>puis observer.</em></h2><p>Chaque besoin relie une méthode concrète aux signes lisibles sur la plante.</p></header>
            <PlantNeedsVisualSystem plant={plant} />
          </section>

          {editorials?.length ? (
            <section className={canonical.editorialChapters} aria-labelledby={`golden-editorial-${plant.genre}-${plant.slug}`}>
              <header data-reveal><p className="section-kicker">04 · Culture approfondie</p><h2 id={`golden-editorial-${plant.genre}-${plant.slug}`}>Adapter le geste<br /><em>aux conditions.</em></h2></header>
              <div>{editorials.map((section, index) => <article id={section.id} key={section.id} data-reveal><span>0{index + 1}</span><div><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points?.length ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div></article>)}</div>
            </section>
          ) : null}

          {bookImages.length ? <BotanicalPhotoBook plant={plant} images={bookImages} /> : (
            <section className={golden.photoBookGap} aria-labelledby={`golden-book-${plant.genre}-${plant.slug}`} data-reveal>
              <div><p className="section-kicker">Carnet photographique</p><h2 id={`golden-book-${plant.genre}-${plant.slug}`}>Une vue vérifiée.<br /><em>Pas de galerie fabriquée.</em></h2></div>
              <p>Les vues documentaires disponibles ne sont pas dupliquées artificiellement. De nouvelles pages seront ajoutées uniquement avec des photographies distinctes et vérifiées.</p>
            </section>
          )}

          <section className={golden.diagnostic} id="problemes" aria-labelledby={`golden-diagnostic-${plant.genre}-${plant.slug}`}>
            <header data-reveal><p className="section-kicker">05 · Diagnostic prudent</p><h2 id={`golden-diagnostic-${plant.genre}-${plant.slug}`}>Lire ce que la plante raconte.</h2></header>
            <div className={golden.diagnosticList}>{plant.problems.map((problem, index) => <details key={problem.title} data-reveal><summary><span>0{index + 1}</span><strong>{problem.title}</strong><i className={canonical.plusMark} aria-hidden="true" /></summary><div><p><b>Cause probable.</b> {problem.cause}</p><p><b>Le bon réflexe.</b> {problem.advice}</p></div></details>)}</div>
            <aside className={golden.sosBridge} data-reveal><div><span>Un doute persiste ?</span><p>Une photographie aide à documenter le problème ; elle ne remplace pas la validation humaine Tibaldo.</p></div><Link href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside>
          </section>

          <section className={golden.related} id="comparaison" aria-labelledby={`golden-related-${plant.genre}-${plant.slug}`}>
            <header data-reveal><p className="section-kicker">06 · Comparer</p><h2 id={`golden-related-${plant.genre}-${plant.slug}`}>Des silhouettes proches.<br /><em>Des lectures distinctes.</em></h2></header>
            <div className={golden.relatedTrack}>{plant.comparisons.map((item, index) => <Link href={comparisonHref(plant, item.name)} key={item.name} data-reveal><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.difference}</p><b>Comparer <Arrow /></b></Link>)}</div>
          </section>

          {isCycasRevoluta ? <CycasLocalGuide plant={plant} /> : null}

          <div className={golden.speciesFaq}><BotanicalFaq items={faq} title="Tout savoir avant de lui faire une place." /></div>
          <section className={golden.speciesClosing} id="conseils" data-reveal><div><p className="section-kicker">07 · Continuer au Studio</p><h2>Observer longtemps.<br /><em>Corriger doucement.</em></h2><p>{advice[1] ?? advice[0] ?? plant.subtitle}</p></div><nav aria-label={`Continuer après la fiche ${plant.displayName}`}><Link href={`/plantes/${plant.genre}`}>Explorer les {plant.genreLabel} <Arrow /></Link><Link href="/sos-plantes">SOS Plantes <Arrow /></Link>{revealImage ? <Link href="/credits-images">Crédits photographiques <Arrow /></Link> : null}</nav></section>
        </div>
      </div>

      {plant.genre === "anthurium" && plant.slug === "veitchii" ? <SpeciesLocalStudio speciesName="Anthurium veitchii" genusName="Anthurium" genusSlug="anthurium" /> : null}
      {plant.genre === "monstera" && plant.slug === "thai-constellation" ? <SpeciesLocalStudio speciesName="Monstera deliciosa ‘Thai Constellation’" genusName="Monstera" genusSlug="monstera" /> : null}
      {isCycasRevoluta ? <SpeciesLocalStudio speciesName="Cycas revoluta" genusName="Cycas" genusSlug="cycas" /> : null}
      <SiteFooter compactTransit />
      {plant.shopUrl ? <PlantShopBar shopUrl={plant.shopUrl} plantName={plant.botanicalName} /> : null}
    </main>
  );
}
