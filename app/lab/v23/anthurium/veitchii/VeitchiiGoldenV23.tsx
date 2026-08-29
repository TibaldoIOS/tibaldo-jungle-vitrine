import Image from "next/image";
import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import ScrollReveal from "@/app/ScrollReveal";
import { Arrow, SiteFooter } from "@/app/SiteChrome";
import BotanicalFaq from "@/app/plantes/BotanicalFaq";
import PlantNeedsVisualSystem from "@/app/plantes/PlantNeedsVisualSystem";
import PlantSectionNav from "@/app/plantes/PlantSectionNav";
import PlantSpeciesHero from "@/app/plantes/PlantSpeciesHero";
import ScientificName from "@/app/plantes/ScientificName";
import styles from "./VeitchiiGoldenV23.module.css";

const faqAdditions = (plant: PlantEntry) => [
  {
    question: "Quelle place prévoir pour ses feuilles retombantes ?",
    answer: `${plant.growth.adultSize}. ${plant.specimen.note}`,
  },
  {
    question: "Quelle humidité lui convient sans enfermer la plante ?",
    answer: `${plant.care.humidityText} ${plant.habitat.split(".")[1]?.trim() ?? "Une circulation d’air constante reste utile autour des racines."}`,
  },
  {
    question: "Quand rempoter un Anthurium veitchii ?",
    answer: plant.care.repotting,
  },
  {
    question: "Que peuvent indiquer des bords bruns ?",
    answer: `${plant.problems[0].cause} ${plant.problems[0].advice}`,
  },
  {
    question: "Quelle température faut-il préserver ?",
    answer: plant.care.temperature,
  },
];

function SnapshotItem({
  index,
  label,
  value,
  note,
  tone,
  level,
}: {
  index: number;
  label: string;
  value: string;
  note: string;
  tone: "light" | "water" | "humidity" | "temperature" | "difficulty";
  level?: number;
}) {
  return (
    <article className={`${styles.snapshotItem} ${styles[`snapshot_${tone}`]}`} data-reveal>
      <header><span>0{index}</span><small>{label}</small><strong>{value}</strong></header>
      {level && <div className={styles.snapshotScale} aria-label={`${label} : ${level} sur 5`}>
        {[1, 2, 3, 4, 5].map((step) => <i className={step <= level ? styles.on : ""} key={step} />)}
      </div>}
      <p>{note}</p>
    </article>
  );
}

export default function VeitchiiGoldenV23({ plant }: { plant: PlantEntry }) {
  const realImages = plant.gallery.filter((image, index, images) =>
    !image.src.includes("photo-reelle-a-venir") &&
    images.findIndex((candidate) => candidate.src === image.src) === index,
  );
  const revealImage = realImages[0];
  const faq = [...plant.faq, ...faqAdditions(plant)];

  return (
    <main className={`${styles.page} editorial-page plant-profile-page`} data-golden-species-v23="anthurium-veitchii">
      <ScrollReveal />
      <PlantSpeciesHero plant={plant} />

      <aside className={styles.prototypeFlag} aria-label="Statut de cette page">
        <span>Lab V23</span><strong>Golden Species · revue Owner</strong>
      </aside>

      <div className={`${styles.layout} shell`}>
        <aside className={styles.chapterRail}><PlantSectionNav /></aside>
        <div className={styles.story}>
          <section className={styles.intro} aria-labelledby="v23-intro-title" data-reveal>
            <p className="section-kicker">Portrait botanique</p>
            <div>
              <h2 id="v23-intro-title">Le relief comme<br /><em>mémoire de la forêt.</em></h2>
              {plant.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className={styles.identity} id="identite" aria-labelledby="v23-identity-title">
            <header data-reveal>
              <p className="section-kicker">01 · Identité</p>
              <h2 id="v23-identity-title">Un nom précis.<br /><em>Un territoire humide.</em></h2>
            </header>
            <div className={styles.identityEditorial} data-reveal>
              <div className={styles.identityName}>
                <span>Nom botanique</span>
                <strong><ScientificName name={plant.botanicalName} /></strong>
                <small>{plant.taxonomy.commonNames.join(" · ")}</small>
              </div>
              <dl className={styles.identityRows}>
                <div><dt>Famille</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link></dd></div>
                <div><dt>Genre</dt><dd><Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link></dd></div>
                <div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div>
                <div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div>
                <div><dt>Port</dt><dd>{plant.growth.habit}</dd></div>
                <div><dt>Croissance</dt><dd>{plant.growth.speed}</dd></div>
              </dl>
            </div>
            <div className={styles.originBand} data-reveal>
              <div><span>Origine documentée</span><strong>{plant.origin}</strong></div>
              <p>{plant.habitat}</p>
            </div>
            <details className={styles.identityMore} data-reveal>
              <summary>Statut, synonymes et observation <span aria-hidden="true">+</span></summary>
              <dl>
                <div><dt>Statut botanique</dt><dd>{plant.hybridization}</dd></div>
                <div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div>
                <div><dt>Observation documentée</dt><dd>{plant.specimen.observedHeight}. {plant.specimen.note}</dd></div>
              </dl>
            </details>
          </section>

          <section className={styles.snapshot} aria-labelledby="v23-snapshot-title">
            <header data-reveal><p className="section-kicker">Lecture en dix secondes</p><h2 id="v23-snapshot-title">Les cinq repères essentiels.</h2></header>
            <div className={styles.snapshotGrid}>
              <SnapshotItem index={1} tone="light" label="Lumière" value={`${plant.care.light}/5`} level={plant.care.light} note="Vive et filtrée" />
              <SnapshotItem index={2} tone="water" label="Arrosage" value={`${plant.care.water}/5`} level={plant.care.water} note="Mesuré, puis drainé" />
              <SnapshotItem index={3} tone="humidity" label="Humidité" value={`${plant.care.humidity}/5`} level={plant.care.humidity} note="Élevée et ventilée" />
              <SnapshotItem index={4} tone="temperature" label="Température" value={`${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`} note="Stable, sans courant froid" />
              <SnapshotItem index={5} tone="difficulty" label="Difficulté" value={`${plant.care.difficulty}/5`} level={plant.care.difficulty} note="La stabilité avant tout" />
            </div>
          </section>

          <section className={styles.editorialStory} aria-labelledby="v23-story-title">
            <div data-reveal>
              <p className="section-kicker">02 · Lire sa forme</p>
              <h2 id="v23-story-title">Une feuille longue,<br /><em>côtelée par la lumière.</em></h2>
            </div>
            <div className={styles.storyCopy} data-reveal>
              <p>{plant.description[0]}</p>
              <p>{plant.habitat}</p>
              <aside><span>À lui réserver</span><strong>De la hauteur et de l’air autour des racines.</strong><p>{plant.tibaldoAdvice[0]}</p></aside>
            </div>
          </section>

          {revealImage && <figure className={styles.photoReveal} data-reveal>
            <div className={styles.photoRevealMedia}>
              <Image unoptimized src={revealImage.src} alt={revealImage.alt} width={revealImage.width} height={revealImage.height} loading="lazy" />
            </div>
            <figcaption><span>Respiration photographique</span><p>{revealImage.caption}</p></figcaption>
          </figure>}

          <section className={styles.needs} id="entretien" aria-labelledby="v23-needs-title">
            <header data-reveal>
              <p className="section-kicker">03 · Les bons équilibres</p>
              <h2 id="v23-needs-title">Comprendre ses besoins,<br /><em>puis observer.</em></h2>
              <p>Le résumé ouvre la lecture. Ici, chaque besoin retrouve sa méthode et les signes à surveiller.</p>
            </header>
            <PlantNeedsVisualSystem plant={plant} />
          </section>

          {realImages.length > 0 && <section className={`${styles.photoBook} plant-profile-section`} aria-labelledby="v23-book-title" data-reveal>
            <header>
              <p className="section-kicker">04 · Carnet photographique</p>
              <h2 id="v23-book-title">Une page réelle.<br /><em>Aucune vue fabriquée.</em></h2>
              <p>Une seule photographie de Veitchii est aujourd’hui vérifiée dans le catalogue. Le carnet l’assume, sans recadrage présenté comme un nouveau document.</p>
            </header>
            <div className={styles.photoBookPage} role="list" aria-label={`Photographie vérifiée de ${plant.botanicalName}`}>
              {realImages.map((image, index) => <figure key={image.src} role="listitem">
                <div><Image unoptimized src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" /></div>
                <figcaption><span>0{index + 1}</span><p>{image.caption}</p></figcaption>
              </figure>)}
            </div>
          </section>}

          <section className={styles.diagnostic} id="problemes" aria-labelledby="v23-diagnostic-title">
            <header data-reveal><p className="section-kicker">05 · Diagnostic prudent</p><h2 id="v23-diagnostic-title">Lire ce que la plante raconte.</h2></header>
            <div className={styles.diagnosticList}>
              {plant.problems.map((problem, index) => <details key={problem.title} data-reveal>
                <summary><span>0{index + 1}</span><strong>{problem.title}</strong><i aria-hidden="true" /></summary>
                <div><p><b>Cause probable.</b> {problem.cause}</p><p><b>Le bon réflexe.</b> {problem.advice}</p></div>
              </details>)}
            </div>
            <aside className={styles.sosBridge} data-reveal><div><span>Un doute persiste ?</span><p>Une photographie aide à documenter le problème ; elle ne remplace pas la validation humaine Tibaldo.</p></div><Link href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside>
          </section>

          <section className={styles.related} id="comparaison" aria-labelledby="v23-related-title">
            <header data-reveal><p className="section-kicker">06 · Comparer</p><h2 id="v23-related-title">Trois silhouettes proches.<br /><em>Trois lectures distinctes.</em></h2></header>
            <div className={styles.relatedTrack}>
              {plant.comparisons.map((item, index) => {
                const href = item.name.includes("warocqueanum") ? "/plantes/anthurium/warocqueanum" : item.name.includes("pallidiflorum") ? "/plantes/anthurium/pallidiflorum" : "/plantes/anthurium";
                return <Link href={href} key={item.name} data-reveal><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.difference}</p><b>Comparer <Arrow /></b></Link>;
              })}
            </div>
          </section>

          <div className={styles.faq}>
            <BotanicalFaq items={faq} title="Tout savoir avant de lui faire une place." />
          </div>

          <section className={styles.closing} id="conseils" aria-labelledby="v23-closing-title" data-reveal>
            <div><p className="section-kicker">07 · Continuer au Studio</p><h2 id="v23-closing-title">Observer longtemps.<br /><em>Corriger doucement.</em></h2><p>{plant.tibaldoAdvice[1]}</p></div>
            <nav aria-label="Continuer après le prototype Veitchii">
              <Link href="/plantes/anthurium">Explorer les Anthurium <Arrow /></Link>
              <Link href="/sos-plantes">SOS Plantes <Arrow /></Link>
              <Link href="/credits-images">Crédit de la photographie <Arrow /></Link>
            </nav>
          </section>
        </div>
      </div>
      <SiteFooter compactTransit />
    </main>
  );
}

