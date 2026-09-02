import Image from "next/image";
import Link from "next/link";
import type { PlantEntry, Level } from "@/lib/plants/types";
import { isInternalPhotoProductionCopy } from "@/lib/plants/types";
import { documentaryGallery, isDocumentaryPlantImage } from "@/lib/plants/documentary-media";
import { verifiedGroupMediaByGenre } from "@/lib/plants/verified-group-media";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import BotanicalFaq from "./BotanicalFaq";
import GenusSpeciesCarousel from "./GenusSpeciesCarousel";
import PlantCarePassport from "./PlantCarePassport";
import golden from "./GoldenBaseline.module.css";
import body from "./GoldenGroupBodyBaseline.module.css";
import hero from "./GoldenGroupHeroBaseline.module.css";
import mobile from "./GoldenGroupMobileBaseline.module.css";
import canonical from "./GoldenGroupCanonical.module.css";
import BotanicalHubLeafPlate from "./BotanicalHubLeafPlate";
import { botanicalHubLeafPlates } from "@/lib/plants/botanical-hub-leaf-plates";

export type GoldenGroupGuide = {
  name: string;
  image: string;
  imageAlt: string;
  heroSubtitle: string;
  lead: string;
  origin: string;
  care: { difficulty: number; light: number; water: number; humidity: number; substrate: string; nutrition: string };
  facts: { label: string; value: string }[];
  sections: { title: string; text: string }[];
  problems: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
};

type GroupMedia = PlantEntry["gallery"][number] & { rights: "verified" | "controlled-beta" };

const pileaHeroCopy = "Les Pilea forment un genre de la famille des Urticaceae bien plus vaste que la seule plante à monnaie chinoise. Rampants, compacts ou texturés, ils déploient des feuilles rondes, gaufrées, argentées ou minuscules : une diversité graphique adaptée aux petits espaces et aux étagères lumineuses. Pour leur culture en intérieur, placez-les dans une lumière douce à vive, tournez régulièrement les formes dressées et arrosez sans saturer le substrat, après un léger séchage en surface. Ce guide Tibaldo Jungle aide à ajuster leur entretien selon l’espèce. À Lille, l’hiver moins lumineux ralentit notamment le Pilea peperomioides : ses arrosages doivent alors s’espacer.";

const safeSentence = (value: string) => {
  const cleaned = value
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !/stock|disponib|proposera|boutique|shop|prix/i.test(sentence))
    .slice(0, 1)
    .join(" ")
    .trim();
  return cleaned;
};

const groupHeroCopy = (genre: string, guide: GoldenGroupGuide) => {
  if (genre === "pilea") return pileaHeroCopy;
  return [safeSentence(guide.lead), safeSentence(guide.origin), safeSentence(guide.heroSubtitle)]
    .filter((sentence, index, sentences) => sentence && sentences.indexOf(sentence) === index)
    .join(" ");
};

const firstGroupMedia = (genre: string, plants: readonly PlantEntry[]): GroupMedia | null => {
  const override = verifiedGroupMediaByGenre[genre];
  if (override) return override;
  const image = plants.flatMap((plant) => plant.gallery).find(isDocumentaryPlantImage);
  return image ? { ...image, rights: image.license?.status === "verified" ? "verified" : "controlled-beta" } : null;
};

const preparedPlants = (genre: string, plants: readonly PlantEntry[]) => plants.map((plant) => {
  return { ...plant, gallery: documentaryGallery(plant) };
});

function HubChapterMarker({ number, label }: { number: string; label: string }) {
  return <div className={body.chapterMarker} data-hub-chapter-marker><span>{number}</span><strong>{label}</strong><i aria-hidden="true" /></div>;
}

export default function GoldenGenusHub({ genre, guide, plants, editorials = [], label = "Genre végétal", title = guide.name, additionalStory = [] }: {
  genre: string;
  guide: GoldenGroupGuide;
  plants: readonly PlantEntry[];
  editorials?: readonly { title: string; text: string }[];
  label?: string;
  title?: string;
  additionalStory?: readonly { title: string; text: string }[];
}) {
  const displayPlants = preparedPlants(genre, plants);
  const media = firstGroupMedia(genre, plants);
  const sections = guide.sections.filter((section) => !isInternalPhotoProductionCopy(`${section.title} ${section.text}`));
  const facts = guide.facts.filter((fact) => !isInternalPhotoProductionCopy(`${fact.label} ${fact.value}`));
  const faq = guide.faq.filter((item) => !isInternalPhotoProductionCopy(`${item.question} ${item.answer}`));
  const stories = [...editorials, ...additionalStory, ...sections]
    .filter((section, index, all) => all.findIndex((candidate) => candidate.title === section.title) === index)
    .slice(0, 6);
  const navigationGenres = [...new Map(plants.map((plant) => [plant.genre, plant.genreLabel])).entries()];
  const gapCount = displayPlants.filter((plant) => !plant.gallery.length).length;
  const heroCopy = groupHeroCopy(genre, guide);
  const leafPlate = botanicalHubLeafPlates[genre];

  return (
    <main className={`${golden.page} ${body.groupPage} editorial-page`} data-golden-group-v25={genre} data-golden-group-v1={genre}>
      <ScrollReveal />
      <section className={`${hero.landscapeHero} ${mobile.mobileHero}`} aria-labelledby={`golden-group-title-${genre}`} data-group-media-state={media ? media.rights : "honest-gap"} data-pilea-public-media-gate={genre === "pilea" ? "resolved-with-verified-cc0-species-photo" : undefined}>
        <SiteHeader />
        <div className={`${hero.landscapeMedia} ${mobile.mobileMedia}`} aria-hidden="true">
          {media ? <Image unoptimized src={media.src} alt="" width={media.width} height={media.height} priority /> : <div className={canonical.groupMediaGap}><span>{title.slice(0, 1)}</span><small>Photographie collective<br />à documenter</small></div>}
        </div>
        <div className={`${hero.forestFade} ${mobile.mobileFade}`} aria-hidden="true" />
        <div className={`${hero.heroContent} ${mobile.mobileContent} shell`}>
          <div className={`${hero.heroCopy} ${mobile.mobileCopy}`}>
            <p className={`${hero.heroEyebrow} ${mobile.mobileEyebrow}`}>{label} · Univers botanique</p>
            <h1 className={mobile.mobileTitle} data-title-fit={title.length >= 15 ? "extra-long" : title.length >= 9 ? "long" : "default"} id={`golden-group-title-${genre}`}>Les <em>{title}.</em></h1>
            <p className={`${hero.heroIntroduction} ${mobile.mobileIntroduction}`}>{heroCopy}</p>
            <p className={`${hero.heroNote} ${mobile.mobileNote}`}>{media ? "Une photographie documentaire contrôlée ouvre le groupe sans prétendre représenter toutes ses formes." : "Un manque de média reste explicite : aucun spécimen documentaire n’est fabriqué pour compléter la page."}</p>
          </div>
        </div>
      </section>

      <section className={`${golden.groupIntro} ${mobile.introTransition} shell`} data-reveal>
        <HubChapterMarker number="01" label="Comprendre le groupe" />
        <div><h2>Un langage commun.<br /><em>Des formes singulières.</em></h2><div className={`${golden.groupIntroCopy} ${body.bodyCopy}`}><p>{guide.lead}</p><p>{guide.origin}</p></div>{facts.length ? <dl className={canonical.factBand}>{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl> : null}</div>
      </section>

      {leafPlate ? <BotanicalHubLeafPlate data={leafPlate} /> : null}

      <section className={`${golden.groupPassport} ${body.passport} ${mobile.passportTransition}`} aria-labelledby={`golden-group-passport-${genre}`}>
        <div className={`${golden.groupPassportHeading} shell`} data-reveal>
          <HubChapterMarker number="02" label="Passeport de culture" />
          <h2 id={`golden-group-passport-${genre}`}>Des repères communs.<br /><em>Des nuances selon l’espèce.</em></h2>
          <p className={body.bodyText}>Le passeport donne un point de départ pour le groupe ; chaque fiche affine ensuite les besoins.</p>
        </div>
        <PlantCarePassport indicators={[{ label: "Difficulté", value: guide.care.difficulty as Level, tone: "coral" }, { label: "Lumière", value: guide.care.light as Level, tone: "gold" }, { label: "Arrosage", value: guide.care.water as Level, tone: "blue" }, { label: "Humidité", value: guide.care.humidity as Level, tone: "sage" }]} substrate={guide.care.substrate} nutrition={guide.care.nutrition} />
      </section>

      {navigationGenres.length > 1 ? <nav className={`${canonical.subgroups} shell`} aria-label={`Sous-groupes ${title}`}>{navigationGenres.map(([slug, name]) => <Link href={`/plantes/${slug}`} key={slug}><span>Genre botanique</span><strong>{name}</strong><Arrow /></Link>)}</nav> : null}

      <section className={`${golden.groupSpecies} ${body.groupSpecies}`} aria-labelledby={`golden-group-species-${genre}`}>
        <div className="shell"><HubChapterMarker number="03" label={genre === "bananiers" ? "Explorer les genres" : "Explorer le genre"} /></div>
        <div id={`golden-group-species-${genre}`}><GenusSpeciesCarousel genre={genre} genusName={title} plants={displayPlants} /></div>
        <p className={`${golden.indexNote} ${body.indexNote} shell`} data-reveal>{displayPlants.length ? `${displayPlants.length} ${displayPlants.length > 1 ? "fiches sont documentées" : "fiche est documentée"}. ${gapCount ? `${gapCount} ${gapCount > 1 ? "fiches conservent" : "fiche conserve"} un manque de photographie réelle plutôt qu’un visuel non vérifié.` : "Les médias présentés restent distincts du stock du Shop."}` : "Aucune fiche spécifique n’est encore publiée ; le guide de groupe reste accessible sans inventer de plante ni de photographie."}</p>
      </section>

      <section className={`${golden.groupStory} ${body.groupStory}`} aria-labelledby={`golden-group-story-${genre}`}>
        <div className={`${golden.groupStoryHeading} shell`} data-reveal><HubChapterMarker number="04" label="Histoire du groupe" /><h2 id={`golden-group-story-${genre}`}>Observer les stratégies.<br /><em>Adapter la culture.</em></h2></div>
        <div className={`${golden.groupStoryGrid} ${body.storyGrid} shell`}>{stories.map((section, index) => <article key={`${section.title}-${index}`} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div>
      </section>

      <section className={`${golden.groupDiagnostic} ${body.diagnostic} shell`} id="problemes" aria-labelledby={`golden-group-diagnostic-${genre}`}>
        <header data-reveal><HubChapterMarker number="05" label="Observer" /><h2 id={`golden-group-diagnostic-${genre}`}>Lire les signaux<br /><em>avant d’agir.</em></h2></header>
        <div className={`${golden.groupDiagnosticList} ${body.diagnosticList}`}>{guide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div>
        <Link className={golden.sosLink} href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link>
      </section>

      <section className={`${golden.groupFaq} ${body.groupFaq} shell`} aria-label={`Questions fréquentes sur les ${title}`}>
        <HubChapterMarker number="06" label="Questions du Studio" />
        <BotanicalFaq items={faq} title={`${title} : les réponses essentielles.`} />
      </section>

      <section className={`${golden.groupClosing} ${body.groupClosing}`} data-reveal>
        <div className="shell"><HubChapterMarker number="07" label="Continuer au Studio" /><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav>{guide.sources.length ? <small className={canonical.sources}>Sources : {guide.sources.map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</small> : null}</div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
