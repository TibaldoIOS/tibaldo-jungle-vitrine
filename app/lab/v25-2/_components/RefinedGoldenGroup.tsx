import Image from "next/image";
import Link from "next/link";
import { familyEditorials } from "@/lib/plants/family-editorials";
import { familyGuides } from "@/lib/plants/family-guides";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import ScrollReveal from "@/app/ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "@/app/SiteChrome";
import BotanicalFaq from "@/app/plantes/BotanicalFaq";
import GenusSpeciesCarousel from "@/app/plantes/GenusSpeciesCarousel";
import PlantCarePassport from "@/app/plantes/PlantCarePassport";
import golden from "../../v23/_golden-pilea/GoldenPilea.module.css";
import styles from "./RefinedGoldenGroup.module.css";

const pileaGuide = familyGuides.pilea;
const pileaEditorials = familyEditorials.pilea;

function HubChapterMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.chapterMarker} data-hub-chapter-marker>
      <span>{number}</span>
      <strong>{label}</strong>
      <i aria-hidden="true" />
    </div>
  );
}

export default function RefinedGoldenHubPilea() {
  const plants = getPlantsByGenre("pilea").map((plant) => plant.slug === "peperomioides" ? {
    ...plant,
    gallery: [{
      src: "/pilea-peperomioides-plante.jpg",
      alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles",
      caption: "Photographie réelle et réutilisable déjà créditée dans Jungle.",
      width: 1280,
      height: 1707,
    }],
  } : plant);

  return (
    <main className={`${golden.page} ${styles.groupPage} editorial-page`} data-corrected-golden-group-v25-2="pilea">
      <ScrollReveal />
      <section className={styles.plateHero} aria-labelledby="v25-2-pilea-title">
        <SiteHeader />
        <div className={styles.plateHeroMedia} aria-hidden="true">
          <Image unoptimized src="/pilea-planche-formes-textures.webp" alt="" width={972} height={1619} priority />
        </div>
        <div className={styles.plateHeroVeil} aria-hidden="true" />
        <div className={`${styles.plateHeroContent} shell`}>
          <p>Golden Group · Genre botanique</p>
          <h1 id="v25-2-pilea-title">Les <em>Pilea.</em></h1>
          <p>Formes & textures : une planche éditoriale pour lire la diversité du genre, sans la confondre avec un inventaire scientifique ni avec le stock du Shop.</p>
        </div>
      </section>

      <aside className={styles.prototypeFlag} aria-label="Statut de cette page">
        <span>Lab V25.2</span><strong>Corrected Golden Group · revue Owner</strong>
      </aside>

      <section className={`${golden.groupIntro} shell`} data-reveal>
        <HubChapterMarker number="01" label="Comprendre le groupe" />
        <div><h2>Un genre bien plus vaste<br /><em>qu’une plante à monnaie.</em></h2><div className={`${golden.groupIntroCopy} ${styles.bodyCopy}`}><p>{pileaGuide.lead}</p><p>{pileaGuide.origin}</p></div></div>
      </section>

      <section className={`${golden.groupPassport} ${styles.passport}`} aria-labelledby="v25-2-pilea-passport">
        <div className={`${golden.groupPassportHeading} shell`} data-reveal>
          <HubChapterMarker number="02" label="Passeport de culture" />
          <h2 id="v25-2-pilea-passport">Des repères communs.<br /><em>Des nuances selon l’espèce.</em></h2>
          <p className={styles.bodyText}>Le passeport donne un point de départ pour le genre ; chaque fiche affine ensuite les besoins.</p>
        </div>
        <PlantCarePassport indicators={[{ label: "Difficulté", value: pileaGuide.care.difficulty, tone: "coral" }, { label: "Lumière", value: pileaGuide.care.light, tone: "gold" }, { label: "Arrosage", value: pileaGuide.care.water, tone: "blue" }, { label: "Humidité", value: pileaGuide.care.humidity, tone: "sage" }]} substrate={pileaGuide.care.substrate} nutrition={pileaGuide.care.nutrition} />
      </section>

      <section className={`${golden.groupSpecies} ${styles.groupSpecies}`} aria-labelledby="v25-2-pilea-species">
        <div className="shell"><HubChapterMarker number="03" label="Explorer le genre" /></div>
        <div id="v25-2-pilea-species"><GenusSpeciesCarousel genre="pilea" genusName="Pilea" plants={plants} /></div>
        <p className={`${golden.indexNote} ${styles.indexNote} shell`} data-reveal>Deux fiches sont actuellement documentées. Pilea cadierei conserve volontairement son manque de photographie réelle plutôt que d’afficher une image non vérifiée.</p>
      </section>

      <section className={`${golden.groupStory} ${styles.groupStory}`} aria-labelledby="v25-2-pilea-story">
        <div className={`${golden.groupStoryHeading} shell`} data-reveal>
          <HubChapterMarker number="04" label="Histoire du groupe" />
          <h2 id="v25-2-pilea-story">Petites silhouettes.<br /><em>Grandes stratégies.</em></h2>
        </div>
        <div className={`${golden.groupStoryGrid} ${styles.storyGrid} shell`}>{pileaEditorials.map((section, index) => <article key={section.title} data-reveal><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div>
      </section>

      <section className={`${golden.groupDiagnostic} ${styles.diagnostic} shell`} id="problemes" aria-labelledby="v25-2-pilea-diagnostic">
        <header data-reveal><HubChapterMarker number="05" label="Observer" /><h2 id="v25-2-pilea-diagnostic">Lire les signaux<br /><em>avant d’agir.</em></h2></header>
        <div className={`${golden.groupDiagnosticList} ${styles.diagnosticList}`}>{pileaGuide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div>
        <Link className={golden.sosLink} href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link>
      </section>

      <section className={`${golden.groupFaq} ${styles.groupFaq} shell`} aria-label="Questions fréquentes sur les Pilea">
        <HubChapterMarker number="06" label="Questions du Studio" />
        <BotanicalFaq items={pileaGuide.faq} title="Les Pilea : les réponses essentielles." />
      </section>

      <section className={`${golden.groupClosing} ${styles.groupClosing}`} data-reveal>
        <div className="shell"><HubChapterMarker number="07" label="Continuer au Studio" /><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav></div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
