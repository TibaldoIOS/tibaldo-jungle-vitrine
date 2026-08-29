import Image from "next/image";
import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { familyGuides } from "@/lib/plants/family-guides";
import { familyEditorials } from "@/lib/plants/family-editorials";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import ScrollReveal from "@/app/ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "@/app/SiteChrome";
import BotanicalFaq from "@/app/plantes/BotanicalFaq";
import GenusSpeciesCarousel from "@/app/plantes/GenusSpeciesCarousel";
import PlantCarePassport from "@/app/plantes/PlantCarePassport";
import PlantNeedsVisualSystem from "@/app/plantes/PlantNeedsVisualSystem";
import PlantSectionNav from "@/app/plantes/PlantSectionNav";
import PlantSpeciesHero from "@/app/plantes/PlantSpeciesHero";
import ScientificName from "@/app/plantes/ScientificName";
import styles from "./GoldenPilea.module.css";

const guide = familyGuides.pilea;
const editorials = familyEditorials.pilea;

const speciesFaqAdditions = (plant: PlantEntry) => [
  { question: "Quand rempoter un Pilea peperomioides ?", answer: plant.care.repotting },
  { question: "Quelle température lui convient ?", answer: plant.care.temperature },
  { question: "Que faut-il savoir de sa toxicité ?", answer: `${plant.toxicity.summary} ${plant.toxicity.details}` },
];

function PrototypeFlag({ kind }: { kind: "Group" | "Species" }) {
  return <aside className={styles.prototypeFlag} aria-label="Statut de cette page"><span>Lab V23</span><strong>Golden {kind} · choix visuel Owner</strong></aside>;
}

function SnapshotItem({ index, label, value, note, tone, level }: {
  index: number;
  label: string;
  value: string;
  note: string;
  tone: "light" | "water" | "humidity" | "temperature" | "difficulty";
  level?: number;
}) {
  return <article className={`${styles.snapshotItem} ${styles[`snapshot_${tone}`]}`} data-reveal>
    <header><span>0{index}</span><small>{label}</small><strong>{value}</strong></header>
    {level && <div className={styles.snapshotScale} aria-label={`${label} : ${level} sur 5`}>{[1, 2, 3, 4, 5].map((step) => <i className={step <= level ? styles.on : ""} key={step} />)}</div>}
    <p>{note}</p>
  </article>;
}

export function GoldenPileaHubPreview() {
  const plants = getPlantsByGenre("pilea").map((plant) => plant.slug === "peperomioides"
    ? {
        ...plant,
        gallery: [{
          src: "/pilea-peperomioides-plante.jpg",
          alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles",
          caption: "Photographie réelle et réutilisable déjà créditée dans Jungle.",
          width: 1280,
          height: 1707,
        }],
      }
    : plant);
  return <main className={`${styles.page} editorial-page`} data-golden-group-v23="pilea">
    <ScrollReveal />
    <section className={styles.groupHero}>
      <Image unoptimized className={styles.groupHeroImage} src="/pilea-collection-especes.webp" alt="Composition éditoriale contrôlée de formes de Pilea" width={1800} height={1200} priority />
      <div className={styles.groupHeroShade} aria-hidden="true" />
      <SiteHeader />
      <div className={`${styles.groupHeroContent} shell`}><p>Golden Group · Genre botanique</p><h1>Les <em>Pilea.</em></h1><p>Des feuilles rondes, gaufrées ou minuscules : un genre compact dont chaque forme raconte une autre manière d’habiter la lumière.</p></div>
    </section>
    <PrototypeFlag kind="Group" />

    <section className={`${styles.groupIntro} shell`} data-reveal>
      <p className="section-kicker">01 · Comprendre le groupe</p>
      <div><h2>Un genre bien plus vaste<br /><em>qu’une plante à monnaie.</em></h2><div className={styles.groupIntroCopy}><p>{guide.lead}</p><p>{guide.origin}</p></div></div>
    </section>

    <figure className={styles.groupComposition} data-reveal>
      <div className={`${styles.groupCompositionFrame} shell`}>
        <Image unoptimized src="/pilea-planche-formes-textures.webp" alt="Planche éditoriale contrôlée de formes et textures de Pilea" width={1800} height={1200} loading="eager" />
        <figcaption className={styles.groupCompositionCopy}><div><span>Formes · textures · ports</span><h2>Une diversité à lire par le feuillage.</h2></div><p>Cette planche éditoriale Jungle illustre la variété du genre. Elle ne constitue ni un inventaire taxonomique exhaustif ni une disponibilité boutique.</p></figcaption>
      </div>
    </figure>

    <section className={styles.groupPassport} aria-labelledby="group-passport-title">
      <div className={`${styles.groupPassportHeading} shell`} data-reveal><p className="section-kicker">02 · Passeport de culture</p><h2 id="group-passport-title">Des repères communs.<br /><em>Des nuances selon l’espèce.</em></h2><p>Le passeport donne un point de départ pour le genre ; chaque fiche affine ensuite les besoins.</p></div>
      <PlantCarePassport indicators={[
        { label: "Difficulté", value: guide.care.difficulty, tone: "coral" },
        { label: "Lumière", value: guide.care.light, tone: "gold" },
        { label: "Arrosage", value: guide.care.water, tone: "blue" },
        { label: "Humidité", value: guide.care.humidity, tone: "sage" },
      ]} substrate={guide.care.substrate} nutrition={guide.care.nutrition} />
    </section>

    <div className={styles.groupSpecies}>
      <GenusSpeciesCarousel genre="pilea" genusName="Pilea" plants={plants} />
      <p className={`${styles.indexNote} shell`} data-reveal>Deux fiches sont actuellement documentées. Pilea cadierei conserve volontairement son manque de photographie réelle plutôt que d’afficher une image non vérifiée.</p>
    </div>

    <section className={styles.groupStory} aria-labelledby="group-story-title">
      <div className={`${styles.groupStoryHeading} shell`} data-reveal><p className="section-kicker">04 · Histoire du groupe</p><h2 id="group-story-title">Petites silhouettes.<br /><em>Grandes stratégies.</em></h2></div>
      <div className={`${styles.groupStoryGrid} shell`}>
        {editorials.map((section, index) => <article key={section.title} data-reveal><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}
      </div>
    </section>

    <section className={`${styles.groupDiagnostic} shell`} id="problemes" aria-labelledby="group-diagnostic-title">
      <header data-reveal><p className="section-kicker">05 · Observer</p><h2 id="group-diagnostic-title">Lire les signaux<br /><em>avant d’agir.</em></h2></header>
      <div className={styles.groupDiagnosticList}>{guide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div>
      <Link className={styles.sosLink} href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link>
    </section>

    <div className={`${styles.groupFaq} shell`}><BotanicalFaq items={guide.faq} title="Les Pilea : les réponses essentielles." /></div>

    <section className={styles.groupClosing} data-reveal><div className="shell"><p className="section-kicker">06 · Continuer au Studio</p><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav></div></section>
    <SiteFooter compactTransit />
  </main>;
}

export function GoldenPileaSpeciesPreview({ plant }: { plant: PlantEntry }) {
  const faq = [...plant.faq, ...speciesFaqAdditions(plant)];
  return <main className={`${styles.page} editorial-page plant-profile-page ${styles.speciesHero}`} data-golden-species-v23="pilea-peperomioides">
    <ScrollReveal />
    <PlantSpeciesHero plant={plant} />
    <PrototypeFlag kind="Species" />

    <div className={`${styles.speciesLayout} shell`}>
      <aside className={styles.chapterRail}><PlantSectionNav /></aside>
      <div className={styles.speciesStory}>
        <section className={styles.speciesIntro} data-reveal><p className="section-kicker">Portrait botanique</p><div><h2>Des feuilles comme<br /><em>des pièces en équilibre.</em></h2>{plant.description.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</div></section>

        <section className={styles.identity} id="identite" aria-labelledby="species-identity-title">
          <header data-reveal><p className="section-kicker">01 · Identité</p><h2 id="species-identity-title">Une géométrie ronde.<br /><em>Une origine précise.</em></h2></header>
          <div className={styles.identityEditorial} data-reveal>
            <div className={styles.identityName}><span>Nom botanique</span><strong><ScientificName name={plant.botanicalName} /></strong><small>{plant.taxonomy.commonNames.join(" · ")}</small></div>
            <dl className={styles.identityRows}>
              <div><dt>Famille</dt><dd>{plant.taxonomy.family}</dd></div><div><dt>Genre</dt><dd>{plant.taxonomy.genus}</dd></div><div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div><div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div><div><dt>Port</dt><dd>{plant.growth.habit}</dd></div><div><dt>Croissance</dt><dd>{plant.growth.speed}</dd></div>
            </dl>
          </div>
          <div className={styles.originBand} data-reveal><div><span>Origine documentée</span><strong>{plant.origin}</strong></div><p>{plant.habitat}</p></div>
          <details className={styles.identityMore} data-reveal><summary>Statut, synonymes et observation <span aria-hidden="true">+</span></summary><dl><div><dt>Statut botanique</dt><dd>{plant.hybridization}</dd></div><div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div><div><dt>Observation</dt><dd>{plant.specimen.observedHeight}. {plant.specimen.note}</dd></div></dl></details>
        </section>

        <section className={styles.snapshot} aria-labelledby="species-snapshot-title"><header data-reveal><p className="section-kicker">Lecture en dix secondes</p><h2 id="species-snapshot-title">Les cinq repères essentiels.</h2></header><div className={styles.snapshotGrid}>
          <SnapshotItem index={1} tone="light" label="Lumière" value={`${plant.care.light}/5`} level={plant.care.light} note="Vive et indirecte" />
          <SnapshotItem index={2} tone="water" label="Arrosage" value={`${plant.care.water}/5`} level={plant.care.water} note="Après séchage de surface" />
          <SnapshotItem index={3} tone="humidity" label="Humidité" value={`${plant.care.humidity}/5`} level={plant.care.humidity} note="Une pièce normale suffit" />
          <SnapshotItem index={4} tone="temperature" label="Température" value={`${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`} note="Stable, sans courant froid" />
          <SnapshotItem index={5} tone="difficulty" label="Difficulté" value={`${plant.care.difficulty}/5`} level={plant.care.difficulty} note="Accessible et généreux" />
        </div></section>

        <section className={styles.speciesEditorial} aria-labelledby="species-story-title"><div data-reveal><p className="section-kicker">02 · Lire sa forme</p><h2 id="species-story-title">Le pétiole rejoint<br /><em>le cœur du disque.</em></h2></div><div data-reveal><p>{plant.description[0]}</p><p>{plant.habitat}</p><aside><span>À observer</span><strong>La couronne cherche naturellement la fenêtre.</strong><p>{plant.tibaldoAdvice[0]}</p></aside></div></section>

        <section className={styles.archChapter} aria-labelledby="species-arch-title"><div className={styles.archGrid}><div className={styles.archCopy} data-reveal><p className="section-kicker">Reveal botanique · 1,65 seconde</p><h2 id="species-arch-title">Une couronne ronde,<br /><em>toujours tournée vers la lumière.</em></h2><p>{plant.specimen.note}</p></div><figure className={styles.archFigure} data-reveal><div className={styles.archMedia}><Image unoptimized src="/pilea-peperomioides-plante.jpg" alt="Pilea peperomioides aux feuilles rondes portées par de longs pétioles" width={1280} height={1707} loading="eager" /></div><figcaption><span>Photographie réelle · Husky · CC0</span><p>La forme peltée relie le pétiole presque au centre du limbe. Source documentaire déjà créditée dans Jungle.</p></figcaption></figure></div></section>

        <section className={styles.needs} id="entretien" aria-labelledby="species-needs-title"><header data-reveal><p className="section-kicker">03 · Les bons équilibres</p><h2 id="species-needs-title">Comprendre ses besoins,<br /><em>puis observer.</em></h2><p>Chaque repère relie une action aux signes lisibles sur la plante.</p></header><PlantNeedsVisualSystem plant={plant} /></section>

        <section className={styles.photoBookGap} aria-labelledby="species-book-title" data-reveal><div><p className="section-kicker">04 · Carnet photographique</p><h2 id="species-book-title">Une vue réelle.<br /><em>Pas de doublon fabriqué.</em></h2></div><p>Une seule photographie documentaire de ce Pilea est aujourd’hui vérifiée dans Jungle ; elle est utilisée dans l’arche. Le carnet reste volontairement ouvert jusqu’aux futures photographies Owner du port, des rejets et du revers des feuilles.</p></section>

        <section className={styles.diagnostic} id="problemes" aria-labelledby="species-diagnostic-title"><header data-reveal><p className="section-kicker">05 · Diagnostic prudent</p><h2 id="species-diagnostic-title">Lire ce que la plante raconte.</h2></header><div className={styles.diagnosticList}>{plant.problems.map((problem, index)=><details key={problem.title} data-reveal><summary><span>0{index + 1}</span><strong>{problem.title}</strong><i aria-hidden="true" /></summary><div><p><b>Cause probable.</b> {problem.cause}</p><p><b>Le bon réflexe.</b> {problem.advice}</p></div></details>)}</div><aside className={styles.sosBridge} data-reveal><div><span>Un doute persiste ?</span><p>Une photographie aide à documenter le problème ; elle ne remplace pas la validation humaine Tibaldo.</p></div><Link href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside></section>

        <section className={styles.related} id="comparaison" aria-labelledby="species-related-title"><header data-reveal><p className="section-kicker">06 · Comparer</p><h2 id="species-related-title">Trois silhouettes proches.<br /><em>Trois lectures distinctes.</em></h2></header><div className={styles.relatedTrack}>{plant.comparisons.map((item, index)=><Link href={item.name.includes("cadierei") ? "/plantes/pilea/cadierei" : "/plantes/pilea"} key={item.name} data-reveal><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.difference}</p><b>Comparer <Arrow /></b></Link>)}</div></section>

        <div className={styles.speciesFaq}><BotanicalFaq items={faq} title="Tout savoir avant de lui faire une place." /></div>

        <section className={styles.speciesClosing} id="conseils" aria-labelledby="species-closing-title" data-reveal><div><p className="section-kicker">07 · Continuer au Studio</p><h2 id="species-closing-title">Tourner doucement.<br /><em>Partager les rejets.</em></h2><p>{plant.tibaldoAdvice[1]}</p></div><nav><Link href="/plantes/pilea">Explorer les Pilea <Arrow /></Link><Link href="/sos-plantes">SOS Plantes <Arrow /></Link><Link href="/credits-images">Crédit de la photographie <Arrow /></Link></nav></section>
      </div>
    </div>
    <SiteFooter compactTransit />
  </main>;
}
