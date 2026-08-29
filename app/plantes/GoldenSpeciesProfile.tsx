import Image from "next/image";
import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "@/lib/plants/types";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter } from "../SiteChrome";
import BotanicalFaq from "./BotanicalFaq";
import BotanicalPhotoBook from "./BotanicalPhotoBook";
import DeliciosaOwnerHero from "./DeliciosaOwnerHero";
import PlantNeedsVisualSystem from "./PlantNeedsVisualSystem";
import PlantSectionNav from "./PlantSectionNav";
import PlantShopBar from "./PlantShopBar";
import PlantSpeciesHero from "./PlantSpeciesHero";
import ScientificName from "./ScientificName";
import SpeciesLocalStudio from "./SpeciesLocalStudio";
import styles from "./GoldenSpeciesProfile.module.css";

function Snapshot({ label, value, level, tone }: { label: string; value: string; level?: number; tone: "light" | "water" | "humidity" | "temperature" | "difficulty" }) {
  return <article className={`${styles.snapshotItem} ${styles[tone]}`} data-reveal><span>{label}</span><strong>{value}</strong>{level ? <div aria-label={`${label} : ${level} sur 5`}>{[1, 2, 3, 4, 5].map((step) => <i className={step <= level ? styles.on : ""} key={step} />)}</div> : null}</article>;
}

export default function GoldenSpeciesProfile({ plant }: { plant: PlantEntry }) {
  const gallery = plant.gallery.filter((image, index, images) => !isPhotoProductionPlaceholder(image.src) && images.findIndex((candidate) => candidate.src === image.src) === index);
  const description = plant.description.filter((text) => !isInternalPhotoProductionCopy(text));
  const editorials = plant.editorialSections?.filter((section) => !isInternalPhotoProductionCopy(section.title)).map((section) => ({ ...section, paragraphs: section.paragraphs.filter((text) => !isInternalPhotoProductionCopy(text)) }));
  const advice = plant.tibaldoAdvice.filter((text) => !isInternalPhotoProductionCopy(text));
  const revealImage = gallery[1] ?? gallery[0];
  const bookImages = gallery.filter((image) => image.src !== revealImage?.src);
  const isDeliciosa = plant.genre === "monstera" && plant.slug === "deliciosa";
  const faq = [...plant.faq.filter((item) => !isInternalPhotoProductionCopy(item.question) && !isInternalPhotoProductionCopy(item.answer)), { question: `Quand rempoter ${plant.displayName} ?`, answer: plant.care.repotting }, { question: `Quelle température convient à ${plant.displayName} ?`, answer: plant.care.temperature }].filter((item, index, items) => items.findIndex((candidate) => candidate.question === item.question) === index);

  return <main className={`${styles.page} editorial-page plant-profile-page`} data-golden-species-v25={`${plant.genre}/${plant.slug}`}>
    <ScrollReveal />
    {isDeliciosa ? <DeliciosaOwnerHero /> : <PlantSpeciesHero plant={plant} />}
    <div className={`${styles.layout} shell`}><aside className={styles.chapterRail}><PlantSectionNav /></aside><div className={styles.story}>
      <section className={styles.intro} data-reveal><p className="section-kicker">Portrait botanique</p><div><h2>{plant.displayName}.<br /><em>Une présence à comprendre.</em></h2>{description.map((text) => <p key={text}>{text}</p>)}</div></section>

      <section className={styles.identity} id="identite" aria-labelledby="golden-identity-title"><header data-reveal><p className="section-kicker">01 · Identité</p><h2 id="golden-identity-title">Des repères précis.<br /><em>Sans surdimensionner les faits.</em></h2></header><div className={styles.identityEditorial} data-reveal><div className={styles.identityName}><span>Nom botanique</span><strong><ScientificName name={plant.botanicalName} /></strong>{plant.taxonomy.commonNames.length ? <small>{[...new Set(plant.taxonomy.commonNames)].join(" · ")}</small> : null}</div><dl className={styles.identityRows}><div><dt>Famille</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link></dd></div><div><dt>Genre</dt><dd><Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link></dd></div><div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div>{plant.taxonomy.cultivar ? <div><dt>Cultivar</dt><dd>‘{plant.taxonomy.cultivar}’</dd></div> : null}<div><dt>Port</dt><dd>{plant.growth.habit}</dd></div><div><dt>Croissance</dt><dd>{plant.growth.speed}</dd></div></dl></div><div className={styles.originBand} data-reveal><div><span>Origine documentée</span><strong>{plant.origin}</strong></div><p>{plant.habitat}</p></div><details className={styles.identityMore} data-reveal><summary>Taxonomie complète et synonymes <span aria-hidden="true">+</span></summary><dl><div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div><div><dt>Statut</dt><dd>{plant.hybridization}</dd></div><div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ") || "Aucun synonyme retenu dans cette fiche."}</dd></div></dl></details></section>

      <section className={styles.snapshot} aria-labelledby="golden-snapshot-title"><header data-reveal><p className="section-kicker">Lecture en dix secondes</p><h2 id="golden-snapshot-title">Les équilibres essentiels.</h2></header><div className={styles.snapshotGrid}><Snapshot tone="light" label="Lumière" value={`${plant.care.light}/5`} level={plant.care.light} /><Snapshot tone="water" label="Arrosage" value={`${plant.care.water}/5`} level={plant.care.water} /><Snapshot tone="humidity" label="Humidité" value={`${plant.care.humidity}/5`} level={plant.care.humidity} /><Snapshot tone="temperature" label="Température" value={`${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`} /><Snapshot tone="difficulty" label="Difficulté" value={`${plant.care.difficulty}/5`} level={plant.care.difficulty} /></div></section>

      <section className={styles.editorialStory} aria-labelledby="golden-story-title"><div data-reveal><p className="section-kicker">02 · Lire la plante</p><h2 id="golden-story-title">Une forme liée<br /><em>à son milieu.</em></h2></div><div data-reveal><p>{description[0] ?? plant.subtitle}</p><p>{plant.habitat}</p>{advice[0] ? <aside><span>À observer</span><p>{advice[0]}</p></aside> : null}</div></section>

      {revealImage ? <section className={styles.archChapter} aria-labelledby="golden-arch-title"><div className={styles.archGrid}><div className={styles.archCopy} data-reveal><p className="section-kicker">Reveal botanique</p><h2 id="golden-arch-title">Un portrait réel.<br /><em>Une transition signature.</em></h2><p>{plant.specimen.note}</p></div><figure className={styles.archFigure} data-reveal><div className={styles.archMedia}><Image unoptimized src={revealImage.src} alt={revealImage.alt} width={revealImage.width} height={revealImage.height} loading="lazy" /></div><figcaption><span>Photographie documentaire</span><p>{revealImage.caption}</p></figcaption></figure></div></section> : <section className={styles.mediaGap} data-reveal><p className="section-kicker">Portrait documentaire</p><h2>Une absence assumée.<br /><em>Aucune image fabriquée.</em></h2><p>Aucune photographie documentaire vérifiée n’est présentée pour {plant.botanicalName}. La structure éditoriale demeure identique et les informations botaniques restent accessibles.</p></section>}

      <section className={styles.needs} id="entretien" aria-labelledby="golden-needs-title"><header data-reveal><p className="section-kicker">03 · Les bons équilibres</p><h2 id="golden-needs-title">Comprendre ses besoins,<br /><em>puis observer.</em></h2></header><PlantNeedsVisualSystem plant={plant} /></section>
      {editorials?.length ? <section className={styles.deepDive} aria-labelledby="golden-deep-title"><header data-reveal><p className="section-kicker">04 · Culture approfondie</p><h2 id="golden-deep-title">Adapter le geste<br /><em>aux conditions.</em></h2></header><div>{editorials.map((section, index) => <details id={section.id} key={section.id} data-reveal><summary><span>0{index + 1}</span><strong>{section.title}</strong><i aria-hidden="true" /></summary><div>{section.paragraphs.map((text) => <p key={text}>{text}</p>)}{section.points?.length ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div></details>)}</div></section> : null}
      {bookImages.length ? <BotanicalPhotoBook plant={plant} images={bookImages} /> : <section className={styles.bookGap} data-reveal><p className="section-kicker">Carnet photographique</p><h2>Le carnet reste ouvert.</h2><p>Les vues documentaires disponibles ne sont pas dupliquées artificiellement. De nouvelles pages seront ajoutées uniquement avec des photographies distinctes et vérifiées.</p></section>}

      <section className={styles.diagnostic} id="problemes" aria-labelledby="golden-diagnostic-title"><header data-reveal><p className="section-kicker">05 · Diagnostic prudent</p><h2 id="golden-diagnostic-title">Lire ce que la plante raconte.</h2></header><div className={styles.diagnosticList}>{plant.problems.map((problem, index) => <details key={problem.title} data-reveal><summary><span>0{index + 1}</span><strong>{problem.title}</strong><i aria-hidden="true" /></summary><div><p><b>Cause probable.</b> {problem.cause}</p><p><b>Le bon réflexe.</b> {problem.advice}</p></div></details>)}</div><aside className={styles.sosBridge} data-reveal><p>Une photographie aide à documenter le problème ; elle ne remplace pas la validation humaine Tibaldo.</p><Link href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside></section>
      <section className={styles.related} id="comparaison" aria-labelledby="golden-related-title"><header data-reveal><p className="section-kicker">06 · Comparer</p><h2 id="golden-related-title">Des silhouettes proches.<br /><em>Des lectures distinctes.</em></h2></header><div className={styles.relatedTrack}>{plant.comparisons.map((item, index) => <article key={item.name} data-reveal><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.difference}</p></article>)}</div></section>
      <div className={styles.faq}><BotanicalFaq items={faq} title="Tout savoir avant de lui faire une place." /></div>
      <section className={styles.closing} id="conseils" data-reveal><div><p className="section-kicker">07 · Continuer au Studio</p><h2>Observer d’abord.<br /><em>Choisir ensuite.</em></h2><p>{advice[1] ?? advice[0] ?? plant.subtitle}</p></div><nav><Link href={`/plantes/${plant.genre}`}>Explorer les {plant.genreLabel} <Arrow /></Link><Link href="/sos-plantes">SOS Plantes <Arrow /></Link></nav></section>
    </div></div>
    {plant.genre === "anthurium" && plant.slug === "veitchii" ? <SpeciesLocalStudio speciesName="Anthurium veitchii" genusName="Anthurium" genusSlug="anthurium" /> : null}
    {plant.genre === "monstera" && plant.slug === "thai-constellation" ? <SpeciesLocalStudio speciesName="Monstera deliciosa ‘Thai Constellation’" genusName="Monstera" genusSlug="monstera" /> : null}
    <SiteFooter compactTransit />{plant.shopUrl ? <PlantShopBar shopUrl={plant.shopUrl} plantName={plant.botanicalName} /> : null}
  </main>;
}
