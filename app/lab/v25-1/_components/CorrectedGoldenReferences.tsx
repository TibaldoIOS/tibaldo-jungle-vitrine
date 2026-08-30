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
import golden from "../../v23/_golden-pilea/GoldenPilea.module.css";
import styles from "./CorrectedGoldenReferences.module.css";

const pileaGuide = familyGuides.pilea;
const pileaEditorials = familyEditorials.pilea;

function PrototypeFlag({ kind }: { kind: "Species" | "Group" }) {
  return (
    <aside className={golden.prototypeFlag} aria-label="Statut de cette page">
      <span>Lab V25.1</span><strong>Corrected Golden {kind} · revue Owner</strong>
    </aside>
  );
}

function SnapshotItem({ index, label, value, note, tone, level }: {
  index: number;
  label: string;
  value: string;
  note: string;
  tone: "light" | "water" | "humidity" | "temperature" | "difficulty";
  level?: number;
}) {
  return (
    <article className={`${golden.snapshotItem} ${golden[`snapshot_${tone}`]}`} data-reveal>
      <header><span>0{index}</span><small>{label}</small><strong>{value}</strong></header>
      {level && <div className={golden.snapshotScale} aria-label={`${label} : ${level} sur 5`}>
        {[1, 2, 3, 4, 5].map((step) => <i className={step <= level ? golden.on : ""} key={step} />)}
      </div>}
      <p>{note}</p>
    </article>
  );
}

const veitchiiFaq = (plant: PlantEntry) => [
  ...plant.faq,
  { question: "Quelle place prévoir pour ses feuilles retombantes ?", answer: `${plant.growth.adultSize}. ${plant.specimen.note}` },
  { question: "Quelle humidité lui convient sans enfermer la plante ?", answer: `${plant.care.humidityText} Une circulation d’air constante reste utile autour des racines.` },
  { question: "Quand rempoter un Anthurium veitchii ?", answer: plant.care.repotting },
  { question: "Que peuvent indiquer des bords bruns ?", answer: `${plant.problems[0].cause} ${plant.problems[0].advice}` },
  { question: "Quelle température faut-il préserver ?", answer: plant.care.temperature },
];

export function CorrectedGoldenSpeciesVeitchii({ plant }: { plant: PlantEntry }) {
  const controlledImage = plant.gallery.find((image) => !image.src.includes("photo-reelle-a-venir"));

  return (
    <main className={`${golden.page} ${styles.speciesScope} editorial-page plant-profile-page ${golden.speciesHero}`} data-corrected-golden-species="anthurium-veitchii">
      <ScrollReveal />
      <PlantSpeciesHero plant={plant} />
      <PrototypeFlag kind="Species" />

      <div className={`${golden.speciesLayout} shell`}>
        <aside className={golden.chapterRail}><PlantSectionNav /></aside>
        <div className={golden.speciesStory}>
          <section className={golden.speciesIntro} data-reveal>
            <p className="section-kicker">Portrait botanique</p>
            <div><h2>Le relief comme<br /><em>mémoire de la forêt.</em></h2>{plant.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          <section className={golden.identity} id="identite" aria-labelledby="corrected-identity-title">
            <header data-reveal><p className="section-kicker">01 · Identité</p><h2 id="corrected-identity-title">Un nom précis.<br /><em>Un territoire humide.</em></h2></header>
            <div className={golden.identityEditorial} data-reveal>
              <div className={golden.identityName}><span>Nom botanique</span><strong><ScientificName name={plant.botanicalName} /></strong><small>{plant.taxonomy.commonNames.join(" · ")}</small></div>
              <dl className={golden.identityRows}>
                <div><dt>Famille</dt><dd>{plant.taxonomy.family}</dd></div>
                <div><dt>Genre</dt><dd>{plant.taxonomy.genus}</dd></div>
                <div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div>
                <div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div>
                <div><dt>Port</dt><dd>{plant.growth.habit}</dd></div>
                <div><dt>Croissance</dt><dd>{plant.growth.speed}</dd></div>
              </dl>
            </div>
            <div className={golden.originBand} data-reveal><div><span>Origine documentée</span><strong>{plant.origin}</strong></div><p>{plant.habitat}</p></div>
            <details className={golden.identityMore} data-reveal>
              <summary>Statut, synonymes et observation <span className={styles.plusMark} aria-hidden="true" /></summary>
              <dl><div><dt>Statut botanique</dt><dd>{plant.hybridization}</dd></div><div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div><div><dt>Observation documentée</dt><dd>{plant.specimen.observedHeight}. {plant.specimen.note}</dd></div></dl>
            </details>
          </section>

          <section className={golden.snapshot} aria-labelledby="corrected-snapshot-title">
            <header data-reveal><p className="section-kicker">Lecture en dix secondes</p><h2 id="corrected-snapshot-title">Les cinq repères essentiels.</h2></header>
            <div className={golden.snapshotGrid}>
              <SnapshotItem index={1} tone="light" label="Lumière" value={`${plant.care.light}/5`} level={plant.care.light} note="Vive et filtrée" />
              <SnapshotItem index={2} tone="water" label="Arrosage" value={`${plant.care.water}/5`} level={plant.care.water} note="Mesuré, puis drainé" />
              <SnapshotItem index={3} tone="humidity" label="Humidité" value={`${plant.care.humidity}/5`} level={plant.care.humidity} note="Élevée et ventilée" />
              <SnapshotItem index={4} tone="temperature" label="Température" value={`${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`} note="Stable, sans courant froid" />
              <SnapshotItem index={5} tone="difficulty" label="Difficulté" value={`${plant.care.difficulty}/5`} level={plant.care.difficulty} note="La stabilité avant tout" />
            </div>
          </section>

          <section className={golden.speciesEditorial} aria-labelledby="corrected-story-title">
            <div data-reveal><p className="section-kicker">02 · Lire sa forme</p><h2 id="corrected-story-title">Une feuille longue,<br /><em>côtelée par la lumière.</em></h2></div>
            <div data-reveal><p>{plant.description[0]}</p><p>{plant.habitat}</p><aside><span>À lui réserver</span><strong>De la hauteur et de l’air autour des racines.</strong><p>{plant.tibaldoAdvice[0]}</p></aside></div>
          </section>

          {controlledImage && <section className={golden.archChapter} aria-labelledby="corrected-arch-title">
            <div className={golden.archGrid}>
              <div className={golden.archCopy} data-reveal><p className="section-kicker">Portail botanique · 1,65 seconde</p><h2 id="corrected-arch-title">Une feuille sculptée,<br /><em>ouverte par la lumière.</em></h2><p>{plant.specimen.note}</p></div>
              <figure className={golden.archFigure} data-reveal>
                <div className={golden.archMedia}><Image unoptimized src={controlledImage.src} alt={controlledImage.alt} width={controlledImage.width} height={controlledImage.height} loading="eager" /></div>
                <figcaption><span>Photographie réelle contrôlée</span><p>{controlledImage.caption}</p></figcaption>
              </figure>
            </div>
          </section>}

          <section className={golden.needs} id="entretien" aria-labelledby="corrected-needs-title">
            <header data-reveal><p className="section-kicker">03 · Les bons équilibres</p><h2 id="corrected-needs-title">Comprendre ses besoins,<br /><em>puis observer.</em></h2><p>Chaque besoin relie une méthode concrète aux signes lisibles sur la plante.</p></header>
            <PlantNeedsVisualSystem plant={plant} />
          </section>

          <section className={golden.photoBookGap} aria-labelledby="corrected-book-title" data-reveal>
            <div><p className="section-kicker">04 · Carnet photographique</p><h2 id="corrected-book-title">Une vue vérifiée.<br /><em>Pas de galerie fabriquée.</em></h2></div>
            <p>Une seule photographie documentaire distincte est actuellement contrôlée pour ce Veitchii. Elle soutient le Hero et l’arche ; le Photo Book reste volontairement ouvert jusqu’à de nouvelles vues Owner du port, des nervures et de la croissance.</p>
          </section>

          <section className={golden.diagnostic} id="problemes" aria-labelledby="corrected-diagnostic-title">
            <header data-reveal><p className="section-kicker">05 · Diagnostic prudent</p><h2 id="corrected-diagnostic-title">Lire ce que la plante raconte.</h2></header>
            <div className={golden.diagnosticList}>{plant.problems.map((problem, index) => <details key={problem.title} data-reveal><summary><span>0{index + 1}</span><strong>{problem.title}</strong><i className={styles.plusMark} aria-hidden="true" /></summary><div><p><b>Cause probable.</b> {problem.cause}</p><p><b>Le bon réflexe.</b> {problem.advice}</p></div></details>)}</div>
            <aside className={golden.sosBridge} data-reveal><div><span>Un doute persiste ?</span><p>Une photographie aide à documenter le problème ; elle ne remplace pas la validation humaine Tibaldo.</p></div><Link href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside>
          </section>

          <section className={golden.related} id="comparaison" aria-labelledby="corrected-related-title">
            <header data-reveal><p className="section-kicker">06 · Comparer</p><h2 id="corrected-related-title">Des silhouettes proches.<br /><em>Des lectures distinctes.</em></h2></header>
            <div className={golden.relatedTrack}>{plant.comparisons.map((item, index) => <Link href={item.name.includes("warocqueanum") ? "/plantes/anthurium/warocqueanum" : item.name.includes("pallidiflorum") ? "/plantes/anthurium/pallidiflorum" : "/plantes/anthurium"} key={item.name} data-reveal><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.difference}</p><b>Comparer <Arrow /></b></Link>)}</div>
          </section>

          <div className={golden.speciesFaq}><BotanicalFaq items={veitchiiFaq(plant)} title="Tout savoir avant de lui faire une place." /></div>
          <section className={golden.speciesClosing} id="conseils" data-reveal><div><p className="section-kicker">07 · Continuer au Studio</p><h2>Observer longtemps.<br /><em>Corriger doucement.</em></h2><p>{plant.tibaldoAdvice[1]}</p></div><nav aria-label="Continuer après le prototype Veitchii"><Link href="/plantes/anthurium">Explorer les Anthurium <Arrow /></Link><Link href="/sos-plantes">SOS Plantes <Arrow /></Link><Link href="/credits-images">Crédit de la photographie <Arrow /></Link></nav></section>
        </div>
      </div>
      <SiteFooter compactTransit />
    </main>
  );
}

export function CorrectedGoldenHubPilea() {
  const plants = getPlantsByGenre("pilea").map((plant) => plant.slug === "peperomioides" ? { ...plant, gallery: [{ src: "/pilea-peperomioides-plante.jpg", alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles", caption: "Photographie réelle et réutilisable déjà créditée dans Jungle.", width: 1280, height: 1707 }] } : plant);

  return (
    <main className={`${golden.page} editorial-page`} data-corrected-golden-group="pilea">
      <ScrollReveal />
      <section className={styles.plateHero}>
        <SiteHeader />
        <div className={styles.plateHeroMedia} aria-hidden="true"><Image unoptimized src="/pilea-planche-formes-textures.webp" alt="" width={972} height={1619} priority /></div>
        <div className={styles.plateHeroVeil} aria-hidden="true" />
        <div className={`${styles.plateHeroContent} shell`}>
          <p>Golden Group · Genre botanique</p>
          <h1>Les <em>Pilea.</em></h1>
          <p>Formes & textures : une planche éditoriale pour lire la diversité du genre, sans la confondre avec un inventaire scientifique ni avec le stock du Shop.</p>
        </div>
      </section>
      <PrototypeFlag kind="Group" />

      <section className={`${golden.groupIntro} shell`} data-reveal><p className="section-kicker">01 · Comprendre le groupe</p><div><h2>Un genre bien plus vaste<br /><em>qu’une plante à monnaie.</em></h2><div className={golden.groupIntroCopy}><p>{pileaGuide.lead}</p><p>{pileaGuide.origin}</p></div></div></section>

      <section className={golden.groupPassport} aria-labelledby="corrected-pilea-passport"><div className={`${golden.groupPassportHeading} shell`} data-reveal><p className="section-kicker">02 · Passeport de culture</p><h2 id="corrected-pilea-passport">Des repères communs.<br /><em>Des nuances selon l’espèce.</em></h2><p>Le passeport donne un point de départ pour le genre ; chaque fiche affine ensuite les besoins.</p></div><PlantCarePassport indicators={[{ label: "Difficulté", value: pileaGuide.care.difficulty, tone: "coral" }, { label: "Lumière", value: pileaGuide.care.light, tone: "gold" }, { label: "Arrosage", value: pileaGuide.care.water, tone: "blue" }, { label: "Humidité", value: pileaGuide.care.humidity, tone: "sage" }]} substrate={pileaGuide.care.substrate} nutrition={pileaGuide.care.nutrition} /></section>

      <div className={golden.groupSpecies}><GenusSpeciesCarousel genre="pilea" genusName="Pilea" plants={plants} /><p className={`${golden.indexNote} shell`} data-reveal>Deux fiches sont actuellement documentées. Pilea cadierei conserve volontairement son manque de photographie réelle plutôt que d’afficher une image non vérifiée.</p></div>

      <section className={golden.groupStory} aria-labelledby="corrected-pilea-story"><div className={`${golden.groupStoryHeading} shell`} data-reveal><p className="section-kicker">04 · Histoire du groupe</p><h2 id="corrected-pilea-story">Petites silhouettes.<br /><em>Grandes stratégies.</em></h2></div><div className={`${golden.groupStoryGrid} shell`}>{pileaEditorials.map((section, index) => <article key={section.title} data-reveal><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div></section>

      <section className={`${golden.groupDiagnostic} shell`} id="problemes" aria-labelledby="corrected-pilea-diagnostic"><header data-reveal><p className="section-kicker">05 · Observer</p><h2 id="corrected-pilea-diagnostic">Lire les signaux<br /><em>avant d’agir.</em></h2></header><div className={golden.groupDiagnosticList}>{pileaGuide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div><Link className={golden.sosLink} href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link></section>

      <div className={`${golden.groupFaq} shell`}><BotanicalFaq items={pileaGuide.faq} title="Les Pilea : les réponses essentielles." /></div>
      <section className={golden.groupClosing} data-reveal><div className="shell"><p className="section-kicker">06 · Continuer au Studio</p><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav></div></section>
      <SiteFooter compactTransit />
    </main>
  );
}
