import Image from "next/image";
import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import {
  isInternalPhotoProductionCopy,
  isPhotoProductionPlaceholder,
} from "@/lib/plants/types";
import { Arrow, SiteFooter } from "../SiteChrome";
import DeliciosaOwnerHero from "./DeliciosaOwnerHero";
import PlantSpeciesHero from "./PlantSpeciesHero";
import ScientificName from "./ScientificName";
import SpeciesVisualNarrativeV2Motion from "./SpeciesVisualNarrativeV2Motion";

type VisualConfig = {
  theme: "canopy" | "velvet" | "coin";
  chapter: string;
  identityImage: string;
  identityAlt: string;
  breathingImage: string;
  breathingAlt: string;
  breathingCaption: string;
  comparisonImage: string;
  comparisonAlt: string;
  botanicalLine: string;
  closingLine: string;
};

const configs: Record<string, VisualConfig> = {
  "monstera/deliciosa": {
    theme: "canopy",
    chapter: "Une liane qui apprend à lire la lumière",
    identityImage: "/monstera-deliciosa-feuilles.jpg",
    identityAlt: "Détail de feuilles adultes découpées de Monstera deliciosa",
    breathingImage: "/monstera-herbier-feuilles.webp",
    breathingAlt: "Herbier de feuilles de Monstera aux silhouettes variées",
    breathingCaption: "La feuille raconte l’âge, la lumière et la manière dont la plante grimpe.",
    comparisonImage: "/monstera-planche-fenetres-panachures.webp",
    comparisonAlt: "Planche botanique comparant les formes et fenestrations de Monstera",
    botanicalLine: "Observer la métamorphose du limbe plutôt qu’une silhouette figée.",
    closingLine: "Laisser la plante grimper, puis regarder ses feuilles changer de langage.",
  },
  "anthurium/veitchii": {
    theme: "velvet",
    chapter: "Le relief comme mémoire de la forêt",
    identityImage: "/anthurium-veitchii-king.jpg",
    identityAlt: "Longue feuille gaufrée d’Anthurium veitchii",
    breathingImage: "/anthurium-planche-formes-nervures.webp",
    breathingAlt: "Planche botanique de formes et nervures d’Anthurium",
    breathingCaption: "Les nervures deviennent une architecture : elles accrochent la lumière sans réclamer d’effet artificiel.",
    comparisonImage: "/anthurium-crystallinum-feuille.jpg",
    comparisonAlt: "Feuille nervurée d’Anthurium crystallinum utilisée pour la comparaison botanique",
    botanicalLine: "Lire les côtes profondes, la longueur et la retombée avant de comparer les espèces.",
    closingLine: "Créer de la stabilité, puis laisser le King Anthurium prendre toute sa longueur.",
  },
  "pilea/peperomioides": {
    theme: "coin",
    chapter: "Une géométrie ronde faite pour circuler",
    identityImage: "/pilea-peperomioides-plante.jpg",
    identityAlt: "Pilea peperomioides aux feuilles rondes porté par de longs pétioles",
    breathingImage: "/pilea-planche-formes-textures.webp",
    breathingAlt: "Planche botanique des formes et textures de Pilea",
    breathingCaption: "Un port compact peut lui aussi créer un paysage : cercles, pétioles et rejets scandent l’espace.",
    comparisonImage: "/pilea-collection-especes.webp",
    comparisonAlt: "Collection de Pilea aux silhouettes et textures différentes",
    botanicalLine: "Tourner le pot, suivre les rejets et laisser la couronne chercher son équilibre.",
    closingLine: "Une plante qui grandit en se partageant — sans perdre sa silhouette graphique.",
  },
};

const difficultyLabels = ["", "Très facile", "Facile", "Intermédiaire", "Difficile", "Expert"];

const chapterLinks = [
  ["identite", "Identité"],
  ["entretien", "Milieu"],
  ["problemes", "Diagnostic"],
  ["comparaison", "Comparer"],
  ["faq", "Conseils"],
];

function CareSignal({ label, value, copy }: { label: string; value: number; copy: string }) {
  return (
    <article className="v19-care-signal" data-v19-reveal>
      <header>
        <span>{label}</span>
        <strong>{String(value).padStart(2, "0")}<small>/ 05</small></strong>
      </header>
      <div aria-label={`${label} : ${value} sur 5`}>
        {[1, 2, 3, 4, 5].map((level) => <i className={level <= value ? "is-on" : ""} key={level} />)}
      </div>
      <p>{copy}</p>
    </article>
  );
}

export default function SpeciesVisualNarrativeV2({ plant }: { plant: PlantEntry }) {
  const config = configs[`${plant.genre}/${plant.slug}`];
  if (!config) return null;

  const publicDescription = plant.description.filter((text) => !isInternalPhotoProductionCopy(text));
  const publicAdvice = plant.tibaldoAdvice.filter((text) => !isInternalPhotoProductionCopy(text));
  const publicFaq = plant.faq.filter((item) => !isInternalPhotoProductionCopy(item.question) && !isInternalPhotoProductionCopy(item.answer));
  const gallery = plant.gallery.filter((image, index, images) => !isPhotoProductionPlaceholder(image.src) && images.findIndex((candidate) => candidate.src === image.src) === index);

  return (
    <main className={`editorial-page plant-profile-page jungle-v19 v19-theme-${config.theme}`}>
      <SpeciesVisualNarrativeV2Motion />
      {plant.genre === "monstera" && plant.slug === "deliciosa" ? <DeliciosaOwnerHero /> : <PlantSpeciesHero plant={plant} />}

      <aside className="v19-prototype-flag" aria-label="Statut du prototype">
        <span>Prototype V19</span>
        <strong>Système visuel partagé · revue Owner</strong>
      </aside>

      <nav className="v19-story-nav" aria-label="Chapitres de la fiche">
        <div className="shell">
          <span>Lire la plante</span>
          {chapterLinks.map(([id, label], index) => (
            <a href={`#${id}`} className={index === 0 ? "is-active" : ""} key={id}>
              <small>0{index + 1}</small>{label}
            </a>
          ))}
        </div>
      </nav>

      <section className="v19-opening shell" aria-labelledby="v19-opening-title">
        <p className="v19-chapter-mark" data-v19-reveal><span>Chapitre I</span>{config.chapter}</p>
        <div className="v19-opening-copy" data-v19-reveal>
          <p className="section-kicker">Portrait botanique</p>
          <h2 id="v19-opening-title">Comprendre sa forme<br /><em>avant ses besoins.</em></h2>
          <div>{publicDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <figure className="v19-opening-portrait" data-v19-reveal>
          <div className="v19-image-mask"><Image unoptimized src={config.identityImage} alt={config.identityAlt} width={1200} height={1600} loading="eager" data-v19-depth="12" /></div>
          <figcaption><span>01 · Silhouette</span><p>{config.botanicalLine}</p></figcaption>
        </figure>
      </section>

      <section className="v19-identity" id="identite" aria-labelledby="v19-identity-title">
        <div className="shell">
          <header data-v19-reveal>
            <p className="section-kicker">Identité botanique</p>
            <h2 id="v19-identity-title">Un nom,<br /><em>un territoire.</em></h2>
          </header>
          <div className="v19-signature" data-v19-reveal>
            <span>Nom botanique</span>
            <strong><ScientificName name={plant.botanicalName} /></strong>
            <small>{plant.taxonomy.commonNames.join(" · ")}</small>
          </div>
          <dl className="v19-taxonomy" data-v19-reveal>
            <div><dt>Origine</dt><dd>{plant.origin}</dd></div>
            <div><dt>Famille</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link></dd></div>
            <div><dt>Genre</dt><dd><Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link></dd></div>
            <div><dt>Port</dt><dd>{plant.growth.habit}</dd></div>
            <div className="is-wide"><dt>Habitat</dt><dd>{plant.habitat}</dd></div>
            <div className="is-wide"><dt>Statut</dt><dd>{plant.hybridization}</dd></div>
          </dl>
          <aside className="v19-specimen-note" data-v19-reveal>
            <span>Observation Jungle</span><strong>{plant.specimen.observedHeight}</strong><p>{plant.specimen.note}</p>
          </aside>
        </div>
      </section>

      <section className="v19-care" id="entretien" aria-labelledby="v19-care-title">
        <div className="shell">
          <header data-v19-reveal>
            <p className="section-kicker">Chapitre II · Le milieu</p>
            <h2 id="v19-care-title">Quatre signaux<br /><em>à lire ensemble.</em></h2>
            <p>Les jauges donnent un rythme. L’observation de la lumière, du substrat et de la saison reste l’autorité.</p>
          </header>
          <div className="v19-care-signals">
            <CareSignal label="Lumière" value={plant.care.light} copy={plant.care.lightText} />
            <CareSignal label="Arrosage" value={plant.care.water} copy={plant.care.watering} />
            <CareSignal label="Humidité" value={plant.care.humidity} copy={plant.care.humidityText} />
            <CareSignal label={difficultyLabels[plant.care.difficulty]} value={plant.care.difficulty} copy={plant.care.difficultyText ?? "Une culture stable compte davantage qu’une succession de corrections brusques."} />
          </div>
        </div>
      </section>

      <figure className="v19-photo-breath" data-v19-reveal>
        <div className="v19-photo-breath-image"><Image unoptimized src={config.breathingImage} alt={config.breathingAlt} width={1800} height={1200} loading="lazy" data-v19-depth="18" /></div>
        <figcaption className="shell"><span>Pause photographique</span><strong>{config.breathingCaption}</strong></figcaption>
      </figure>

      <section className="v19-conditions shell" aria-labelledby="v19-conditions-title">
        <header data-v19-reveal>
          <p className="section-kicker">Construire un équilibre</p>
          <h2 id="v19-conditions-title">Des racines à<br /><em>la nouvelle feuille.</em></h2>
        </header>
        <div className="v19-condition-lead" data-v19-reveal>
          <span>Substrat</span><h3>Faire circuler l’air autour des racines.</h3><p>{plant.care.substrate}</p>
        </div>
        <div className="v19-condition-stream">
          <article data-v19-reveal><span>Température</span><strong>{plant.care.temperature}</strong></article>
          <article data-v19-reveal><span>Rempotage</span><p>{plant.care.repotting}</p></article>
          <article data-v19-reveal><span>Fertilisation</span><p>{plant.care.fertilizing}</p></article>
          <article data-v19-reveal><span>Multiplication</span><p>{plant.care.propagation}</p></article>
          <article data-v19-reveal><span>Croissance</span><strong>{plant.growth.speed}</strong><p>{plant.growth.adultSize}</p></article>
        </div>
        <aside className="v19-toxicity" data-v19-reveal><span>Toxicité · {plant.toxicity.level}</span><strong>{plant.toxicity.summary}</strong><p>{plant.toxicity.details}</p></aside>
      </section>

      <section className="v19-diagnostic" id="problemes" aria-labelledby="v19-diagnostic-title">
        <div className="shell">
          <header data-v19-reveal>
            <p className="section-kicker">Chapitre III · Diagnostic prudent</p>
            <h2 id="v19-diagnostic-title">Un signe n’est<br /><em>pas un verdict.</em></h2>
          </header>
          <div className="v19-problem-list">
            {plant.problems.map((problem, index) => (
              <details key={problem.title} data-v19-reveal>
                <summary><span>0{index + 1}</span><strong>{problem.title}</strong><i aria-hidden="true">+</i></summary>
                <div><p><b>Causes possibles</b>{problem.cause}</p><p><b>Bon réflexe</b>{problem.advice}</p></div>
              </details>
            ))}
          </div>
          <Link className="v19-sos-link" href="/sos-plantes" data-v19-reveal><span>Besoin d’un regard extérieur ?</span><strong>Ouvrir un dossier SOS Plantes</strong><Arrow /></Link>
        </div>
      </section>

      <section className="v19-compare" id="comparaison" aria-labelledby="v19-compare-title">
        <div className="shell">
          <header data-v19-reveal><p className="section-kicker">Chapitre IV · Comparer</p><h2 id="v19-compare-title">Regarder les écarts,<br /><em>pas seulement les noms.</em></h2></header>
          <figure data-v19-reveal><div className="v19-image-mask"><Image unoptimized src={config.comparisonImage} alt={config.comparisonAlt} width={1400} height={1600} loading="lazy" data-v19-depth="12" /></div><figcaption>Planche de comparaison botanique</figcaption></figure>
          <div className="v19-comparison-list">
            {plant.comparisons.map((comparison, index) => <article key={comparison.name} data-v19-reveal><span>0{index + 1}</span><h3>{comparison.name}</h3><p>{comparison.difference}</p></article>)}
          </div>
        </div>
      </section>

      {gallery.length > 1 && (
        <section className="v19-gallery shell" aria-label={`Photographies de ${plant.botanicalName}`}>
          {gallery.slice(0, 3).map((image, index) => <figure className={`is-${index + 1}`} key={image.src} data-v19-reveal><Image unoptimized src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}
        </section>
      )}

      <section className="v19-advice" id="faq" aria-labelledby="v19-advice-title">
        <div className="shell">
          <header data-v19-reveal><p className="section-kicker">Chapitre V · Au Studio</p><h2 id="v19-advice-title">Les gestes qui<br /><em>changent la suite.</em></h2></header>
          <ol>{publicAdvice.map((advice, index) => <li key={advice} data-v19-reveal><span>0{index + 1}</span><p>{advice}</p></li>)}</ol>
          <div className="v19-faq">
            {publicFaq.map((item) => <details key={item.question} data-v19-reveal><summary>{item.question}<i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="v19-closing">
        <div className="shell" data-v19-reveal>
          <p className="section-kicker">Fin du portrait</p><h2>{config.closingLine}</h2>
          <nav><Link href={`/plantes/${plant.genre}`}>Continuer dans les {plant.genreLabel}<Arrow /></Link><Link href="/plantes">Revenir à l’encyclopédie</Link></nav>
          <details><summary>Sources botaniques de la fiche</summary><ul>{plant.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></details>
        </div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
