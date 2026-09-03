import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import ScrollReveal from "../ScrollReveal";
import GenusSpeciesCarousel from "./GenusSpeciesCarousel";
import type { FamilyHubContent } from "@/lib/plants/family-hub-content";
import styles from "./PlantFamilyDirectory.module.css";

export default function PlantFamilyDirectory({ family, plants, content }: { family: string; plants: readonly PlantEntry[]; content?: FamilyHubContent }) {
  const genera = [...new Set(plants.map((plant) => plant.taxonomy.genus))];
  return <main className={`${styles.page} editorial-page`} data-golden-family-v25={family.toLowerCase()}><ScrollReveal />
    <section className={styles.hero}><SiteHeader /><div className={`${styles.heroContent} shell`}><Link href="/plantes">Encyclopédie · Familles botaniques</Link><p>Répertoire botanique</p><h1 data-title-fit={family.length >= 15 ? "extra-long" : family.length >= 11 ? "long" : "default"}>Les <em>{family}.</em></h1><p>{genera.join(" · ")} : une famille, plusieurs écritures du vivant.</p></div></section>
    <section className={`${styles.intro} shell`} data-reveal><p className="section-kicker">Classification botanique</p><div><h2>{plants.length} fiches documentées.<br /><em>Un répertoire compact.</em></h2><p>{genera.length} {genera.length > 1 ? "genres sont reliés" : "genre est relié"} dans cette famille.</p><p>{content?.definition ?? `Cette page relie les espèces et cultivars de la famille ${family} sans confondre proximité taxonomique et besoins identiques.`}</p><p>{content?.distinction ?? "Chaque fiche reste l’autorité pour l’identification et la culture du taxon précis."}</p>{content?.traits?.length ? <ul className={styles.traits}>{content.traits.map((trait) => <li key={trait}>{trait}</li>)}</ul> : null}</div></section>
    <nav className={`${styles.genera} shell`} aria-label={`Genres de la famille ${family}`}>{genera.map((genus) => { const plant = plants.find((entry) => entry.taxonomy.genus === genus); return <Link href={`/plantes/${plant?.genre}`} key={genus}><span>Genre</span><strong>{genus}</strong><Arrow /></Link>; })}</nav>
    {content?.relatedLinks?.length ? <nav className={`${styles.genera} shell`} aria-label={`Continuer depuis la famille ${family}`}>{content.relatedLinks.map((item) => <Link href={item.href} key={item.href}><span>À découvrir</span><strong>{item.label}</strong><Arrow /></Link>)}</nav> : null}
    <section className={styles.grid} aria-label={`Plantes de la famille ${family}`}><GenusSpeciesCarousel genre={`famille-${family.toLowerCase()}`} genusName={family} plants={plants} /></section>
    <SiteFooter compactTransit />
  </main>;
}
