import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import ScrollReveal from "../ScrollReveal";
import styles from "./PlantFamilyDirectory.module.css";

export default function PlantFamilyDirectory({ family, plants }: { family: string; plants: readonly PlantEntry[] }) {
  const genera = [...new Set(plants.map((plant) => plant.taxonomy.genus))];
  return <main className={`${styles.page} editorial-page`} data-golden-family-v25={family.toLowerCase()}><ScrollReveal />
    <section className={styles.hero}><SiteHeader /><div className={`${styles.heroContent} shell`}><Link href="/plantes">Encyclopédie · Familles botaniques</Link><p>Répertoire botanique</p><h1>Les <em>{family}.</em></h1><p>{genera.join(" · ")} : une famille, plusieurs écritures du vivant.</p></div></section>
    <section className={`${styles.intro} shell`} data-reveal><p className="section-kicker">Classification botanique</p><div><h2>{plants.length} fiches documentées.<br /><em>Un répertoire compact.</em></h2><p>Cette page rassemble les espèces et cultivars de la famille {family}. Elle privilégie la lecture et les liens sémantiques sans répéter une grande carte pour chaque taxon.</p></div></section>
    <section className={`${styles.directory} shell`} aria-label={`Plantes de la famille ${family}`}>
      {genera.map((genus) => <section key={genus} data-reveal><header><p>Genre</p><h2>{genus}</h2><Link href={`/plantes/${plants.find((plant) => plant.taxonomy.genus === genus)?.genre}`}>Voir le hub <Arrow /></Link></header><div>{plants.filter((plant) => plant.taxonomy.genus === genus).map((plant) => <Link href={`/plantes/${plant.genre}/${plant.slug}`} key={`${plant.genre}/${plant.slug}`}><span>{plant.taxonomy.cultivar ? "Cultivar" : "Espèce"}</span><strong>{plant.listingName ?? plant.botanicalName}</strong><small>{plant.subtitle}</small><b>Lire la fiche <Arrow /></b></Link>)}</div></section>)}
    </section>
    <SiteFooter compactTransit />
  </main>;
}
