import Image from "next/image";
import Link from "next/link";
import type { PlantEntry, Level } from "@/lib/plants/types";
import { isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "@/lib/plants/types";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import BotanicalFaq from "./BotanicalFaq";
import GenusSpeciesCarousel from "./GenusSpeciesCarousel";
import PlantCarePassport from "./PlantCarePassport";
import styles from "./GoldenGenusHub.module.css";

export type GoldenGroupGuide = {
  name: string; image: string; imageAlt: string; heroSubtitle: string; lead: string; origin: string;
  care: { difficulty: number; light: number; water: number; humidity: number; substrate: string; nutrition: string };
  facts: { label: string; value: string }[];
  sections: { title: string; text: string }[];
  problems: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
};

export default function GoldenGenusHub({ genre, guide, plants, editorials = [], label = "Genre végétal", title = guide.name, additionalStory = [] }: {
  genre: string; guide: GoldenGroupGuide; plants: readonly PlantEntry[];
  editorials?: readonly { title: string; text: string }[]; label?: string; title?: string;
  additionalStory?: readonly { title: string; text: string }[];
}) {
  const media = [{ src: guide.image, alt: guide.imageAlt, width: 1800, height: 1200 }, ...plants.map((plant) => plant.gallery[0])]
    .filter((image, index, images) => image && !isPhotoProductionPlaceholder(image.src) && images.findIndex((candidate) => candidate?.src === image.src) === index)
    .slice(0, 4);
  const sections = guide.sections.filter((section) => !isInternalPhotoProductionCopy(`${section.title} ${section.text}`));
  const facts = guide.facts.filter((fact) => !isInternalPhotoProductionCopy(`${fact.label} ${fact.value}`));
  const faq = guide.faq.filter((item) => !isInternalPhotoProductionCopy(`${item.question} ${item.answer}`));
  const stories = [...editorials, ...additionalStory, ...sections.slice(0, 4)];
  const navigationGenres = [...new Map(plants.map((plant) => [plant.genre, plant.genreLabel])).entries()];

  return <main className={`${styles.page} editorial-page`} data-golden-group-v25={genre}>
    <ScrollReveal />
    <section className={`${styles.hero} ${media.length < 2 ? styles.heroSparse : ""}`}>
      <div className={styles.heroMosaic} aria-label={`Formes et textures documentées du groupe ${title}`}>
        {media.length ? media.map((image, index) => <div className={styles[`tile${index + 1}`]} key={image.src}><Image unoptimized src={image.src} alt={image.alt} width={image.width} height={image.height} priority={index === 0} /></div>) : <div className={styles.heroFallback} aria-hidden="true"><span>{title.slice(0, 1)}</span></div>}
      </div>
      <div className={styles.heroShade} aria-hidden="true" /><SiteHeader />
      <div className={`${styles.heroContent} shell`}><Link href="/plantes">Encyclopédie · Tous les univers</Link><p>{label} · formes & textures</p><h1>Les <em>{title}.</em></h1><p>{guide.heroSubtitle}</p><small>Composition éditoriale issue des médias contrôlés Jungle — ni planche taxonomique exhaustive, ni stock boutique.</small></div>
    </section>

    <section className={`${styles.intro} shell`} data-reveal><p className="section-kicker">01 · Comprendre le groupe</p><div><h2>Un langage commun.<br /><em>Des formes singulières.</em></h2><p>{guide.lead}</p><p>{guide.origin}</p></div></section>

    <section className={styles.passport} aria-labelledby={`passport-${genre}`}><div className={`${styles.passportTitle} shell`} data-reveal><p className="section-kicker">02 · Passeport de culture</p><h2 id={`passport-${genre}`}>Des repères communs.<br /><em>Des nuances par espèce.</em></h2></div><PlantCarePassport indicators={[{ label: "Difficulté", value: guide.care.difficulty as Level, tone: "coral" }, { label: "Lumière", value: guide.care.light as Level, tone: "gold" }, { label: "Arrosage", value: guide.care.water as Level, tone: "blue" }, { label: "Humidité", value: guide.care.humidity as Level, tone: "sage" }]} substrate={guide.care.substrate} nutrition={guide.care.nutrition} /></section>

    {navigationGenres.length > 1 ? <nav className={`${styles.subgroups} shell`} aria-label={`Sous-groupes ${title}`}>{navigationGenres.map(([slug, name]) => <Link href={`/plantes/${slug}`} key={slug}><span>Genre botanique</span><strong>{name}</strong><Arrow /></Link>)}</nav> : null}
    <GenusSpeciesCarousel genre={genre} genusName={title} plants={plants} />

    <section className={`${styles.facts} shell`} aria-label={`Repères ${title}`}>{facts.map((fact) => <div key={fact.label} data-reveal><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section>

    <section className={styles.story} aria-labelledby={`story-${genre}`}><div className={`${styles.storyTitle} shell`} data-reveal><p className="section-kicker">04 · Histoire du groupe</p><h2 id={`story-${genre}`}>Observer les stratégies.<br /><em>Adapter la culture.</em></h2></div><div className={`${styles.storyGrid} shell`}>{stories.map((section, index) => <article key={`${section.title}-${index}`} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div></section>

    <section className={`${styles.diagnostic} shell`} aria-labelledby={`diagnostic-${genre}`}><header data-reveal><p className="section-kicker">05 · Observer</p><h2 id={`diagnostic-${genre}`}>Lire les signaux<br /><em>avant d’agir.</em></h2></header><div>{guide.problems.map((problem, index) => <article key={problem.title} data-reveal><span>0{index + 1}</span><div><h3>{problem.title}</h3><p>{problem.text}</p></div></article>)}</div><Link href="/sos-plantes">Faire relire un doute · SOS Plantes <Arrow /></Link></section>
    <div className={`${styles.faq} shell`}><BotanicalFaq items={faq} title={`${title} : les réponses essentielles.`} /></div>
    <section className={styles.closing} data-reveal><div className="shell"><p className="section-kicker">06 · Continuer au Studio</p><h2>Observer les formes.<br /><em>Choisir ensuite.</em></h2><p>Une fiche Jungle documente une plante ; elle ne prétend jamais qu’elle est disponible en boutique. Le stock reste autoritaire côté Shop.</p><nav><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/contact">Venir au Studio <Arrow /></Link></nav><small>Sources : {guide.sources.map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</small></div></section>
    <SiteFooter compactTransit />
  </main>;
}
