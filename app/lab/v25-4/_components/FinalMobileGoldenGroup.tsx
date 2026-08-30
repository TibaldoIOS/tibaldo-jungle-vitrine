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
import base from "../../v25-2/_components/RefinedGoldenGroup.module.css";
import heroBase from "../../v25-3/_components/FinalGoldenGroup.module.css";
import styles from "./FinalMobileGoldenGroup.module.css";

const pileaGuide = familyGuides.pilea;
const pileaEditorials = familyEditorials.pilea;

function HubChapterMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className={base.chapterMarker} data-hub-chapter-marker>
      <span>{number}</span>
      <strong>{label}</strong>
      <i aria-hidden="true" />
    </div>
  );
}

export default function FinalMobileGoldenHubPilea() {
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
    <main className={`${golden.page} ${base.groupPage} editorial-page`} data-golden-group-v25-4="pilea">
      <ScrollReveal />
      <section className={`${heroBase.landscapeHero} ${styles.mobileHero}`} aria-labelledby="v25-4-pilea-title">
        <SiteHeader />
        <div className={`${heroBase.landscapeMedia} ${styles.mobileMedia}`} aria-hidden="true">
          <Image unoptimized src="/pilea-planche-formes-textures.webp" alt="" width={972} height={1619} priority />
        </div>
        <div className={`${heroBase.forestFade} ${styles.mobileFade}`} aria-hidden="true" />
        <div className={`${heroBase.heroContent} ${styles.mobileContent} shell`}>
          <div className={`${heroBase.heroCopy} ${styles.mobileCopy}`}>
            <p className={`${heroBase.heroEyebrow} ${styles.mobileEyebrow}`}>Golden Group · Genre botanique</p>
            <h1 className={styles.mobileTitle} id="v25-4-pilea-title">Les <em>Pilea.</em></h1>
            <p className={`${heroBase.heroIntroduction} ${styles.mobileIntroduction}`} data-hero-editorial-copy>
              Les Pilea forment un genre de la famille des Urticaceae bien plus vaste que la seule plante à monnaie chinoise. Rampants, compacts ou texturés, ils déploient des feuilles rondes, gaufrées, argentées ou minuscules : une diversité graphique adaptée aux petits espaces et aux étagères lumineuses. Pour leur culture en intérieur, placez-les dans une lumière douce à vive, tournez régulièrement les formes dressées et arrosez sans saturer le substrat, après un léger séchage en surface. Ce guide Tibaldo Jungle aide à ajuster leur entretien selon l’espèce. À Lille, l’hiver moins lumineux ralentit notamment le Pilea peperomioides : ses arrosages doivent alors s’espacer.
            </p>
            <p className={`${heroBase.heroNote} ${styles.mobileNote}`}>Une planche éditoriale pour lire les formes et textures, pas un inventaire scientifique.</p>
          </div>
        </div>
      </section>

      <aside className={base.prototypeFlag} aria-label="Statut de cette page">
        <span>Lab V25.4</span><strong>Golden Group · correction Hero mobile Owner</strong>
      </aside>

      <section className={`${golden.groupIntro} ${styles.introTransition} shell`} data-reveal>
        <HubChapterMarker number="01" label="Comprendre le groupe" />
        <div><h2>Un genre bien plus vaste<br /><em>qu’une plante à monnaie.</em></h2><div className={`${golden.groupIntroCopy} ${base.bodyCopy}`}><p>{pileaGuide.lead}</p><p>{pileaGuide.origin}</p></div></div>
      </section>

      <section className={`${golden.groupPassport} ${base.passport} ${styles.passportTransition}`} aria-labelledby="v25-4-pilea-passport">
        <div className={`${golden.groupPassportHeading} shell`} data-reveal>
          <HubChapterMarker number="02" label="Passeport de culture" />
          <h2 id="v25-4-pilea-passport">Des repères communs.<br /><em>Des nuances selon l’espèce.</em></h2>
          <p className={base.bodyText}>Le passeport donne un point de départ pour le genre ; chaque fiche affine ensuite les besoins.</p>
        </div>
        <PlantCarePassport indicators={[{ label: "Difficulté", value: pileaGuide.care.difficulty, tone: "coral" }, { label: "Lumière", value: pileaGuide.care.light, tone: "gold" }, { label: "Arrosage", value: pileaGuide.care.water, tone: "blue" }, { label: "Humidité", value: pileaGuide.care.humidity, tone: "sage" }]} substrate={pileaGuide.care.substrate} nutrition={pileaGuide.care.nutrition} />
      </section>

      <section className={`${golden.groupSpecies} ${base.groupSpecies}`} aria-labelledby="v25-4-pilea-species">
        <div className="shell"><HubChapterMarker number="03" label="Explorer le genre" /></div>
        <div id="v25-4-pilea-species"><GenusSpeciesCarousel genre="pilea" genusName="Pilea" plants={plants} /></div>
        <p className={`${golden.indexNote} ${base.indexNote} shell`} data-reveal>Deux fiches sont actuellement documentées. Pilea cadierei conserve volontairement son manque de photographie réelle plutôt que d’afficher une image non vérifiée.</p>
      </section>

      <section className={`${golden.groupStory} ${base.groupStory}`} aria-labelledby="v25-4-pilea-story">
        <div className={`${golden.groupStoryHeading} shell`} data-reveal>
          <HubChapterMarker number="04" label="Histoire du groupe" />
          <h2 id="v25-4-pilea-story">Petites silhouettes.<br /><em>Grandes stratégies.</em></h2>
        </div>
        <div className={`${golden.groupStoryGrid} ${base.storyGrid} shell`}>{pileaEditorials.map((section, index) => <article key={section.title} data-reveal><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div>
      </section>

      <section className={`${golden.groupDiagnostic} ${base.diagnostic} shell`} id="problemes" aria-labelledby="v25-4-pilea-diagnostic">
        <header data-reveal><HubChapterMarker number="05" label="Observer" /><h2 id="v25-4-pilea-diagnostic">Lire les signaux<br /><em>avant d’agir.</em></h2></header>
        <div className={`${golden.groupDiagnosticList} ${base.diagnosticList}`}>{pileaGuide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div>
        <Link className={golden.sosLink} href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link>
      </section>

      <section className={`${golden.groupFaq} ${base.groupFaq} shell`} aria-label="Questions fréquentes sur les Pilea">
        <HubChapterMarker number="06" label="Questions du Studio" />
        <BotanicalFaq items={pileaGuide.faq} title="Les Pilea : les réponses essentielles." />
      </section>

      <section className={`${golden.groupClosing} ${base.groupClosing}`} data-reveal>
        <div className="shell"><HubChapterMarker number="07" label="Continuer au Studio" /><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav></div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
