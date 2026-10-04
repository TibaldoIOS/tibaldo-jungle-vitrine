import AnthuriumWeekendLink from "../AnthuriumWeekendLink";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "../SiteChrome";
import { getPlant } from "@/lib/plants/catalog";
import { rareCollectionKeys } from "@/lib/plants/rare-collection";
import { isEditorialPlaceholder } from "@/lib/plants/types";
import { betaOnlyRobots } from "@/lib/deployment-mode";
import styles from "./rare.module.css";

const title = "Plantes rares et de collection à Lille | TIBALDO Jungle";
const description = "Découvrez les plantes rares et cultivars de collection sélectionnés par TIBALDO Jungle à Lille : Monstera, Colocasia, Anthurium et autres aroïdes remarquables.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/plantes-rares" },
  ...(betaOnlyRobots ? {robots: betaOnlyRobots} : {}),
  openGraph: { title, description, type: "website", url: "/plantes-rares", locale: "fr_FR", siteName: "TIBALDO Jungle" },
};
const collection = rareCollectionKeys.map(key => { const [genre,slug] = key.split("/"); return getPlant(genre,slug)!; });
export default function RarePlants() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: title, description, url: "https://jungle.tibaldo.fr/plantes-rares", inLanguage: "fr-FR",
      mainEntity: { "@type": "ItemList", itemListElement: collection.map((p,i) => ({ "@type": "ListItem", position: i+1, name: p.botanicalName, url: `https://jungle.tibaldo.fr/plantes/${p.genre}/${p.slug}` })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes rares", item: "https://jungle.tibaldo.fr/plantes-rares" }] }
  ] };
  return <><div className={styles.navigation}><SiteHeader /></div><main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
    <header className={`shell ${styles.intro}`}><p className={styles.eyebrow}>Le carnet de collection · Lille</p><h1>Plantes rares &amp;<br/><em>plantes de collection</em></h1>
      <p>Des feuillages singuliers, des histoires à documenter et le plaisir d’apprendre à les cultiver.</p>
      <p className={styles.context}>« Rare » désigne ici des cultivars, hybrides ou sélections horticoles à diffusion spécialisée ou limitée. Ce n’est ni une mesure de rareté dans la nature, ni un classement de valeur. Ce carnet accompagne les plantes présentes ou envisagées dans l’univers du Studio ; une fiche ne garantit pas une disponibilité à Lille.</p>
      <Link href="/plantes">Explorer toute l’encyclopédie →</Link>
    </header>
    <AnthuriumWeekendLink /><section className={`shell ${styles.collection}`} aria-label="Fiches de plantes rares">
      <fieldset className={styles.filters}><legend>Explorer par genre</legend>
        <input id="rare-all" type="radio" name="rare-genre" defaultChecked/><label htmlFor="rare-all">Toutes</label>
        <input id="rare-monstera" type="radio" name="rare-genre"/><label htmlFor="rare-monstera">Monstera</label>
        <input id="rare-anthurium" type="radio" name="rare-genre"/><label htmlFor="rare-anthurium">Anthurium</label>
        <input id="rare-colocasia" type="radio" name="rare-genre"/><label htmlFor="rare-colocasia">Colocasia</label>
      </fieldset>
      <div className={styles.grid}>{collection.map(p => {const image=p.gallery[0]; const gap=isEditorialPlaceholder(image?.src);return <article className={styles.card} data-genus={p.genre} key={p.slug}>
        <div className={styles.media}>{gap ? <div className={styles.placeholder}><Image unoptimized src="https://jungle.tibaldo.fr/media/photo-reelle-a-venir.svg" alt="" width={600} height={600}/><span>Portrait documentaire non disponible</span></div> : <Image unoptimized src={image.src.startsWith("http") ? image.src : `https://jungle.tibaldo.fr${image.src}`} alt={image.alt} width={image.width} height={image.height}/>}</div>
        <div className={styles.copy}><Link className={styles.genre} href={`/plantes/${p.genre}`}>{p.genreLabel}</Link><h2>{p.botanicalName}</h2><p>{p.subtitle}</p><small>{p.slug==='pharaohs-mask' ? 'Sélection documentée · Cophama' : 'Collection horticole · identité documentée avec prudence'}</small><Link className={styles.cta} href={`/plantes/${p.genre}/${p.slug}`}>Découvrir la plante <span aria-hidden="true">↗</span></Link></div>
      </article>})}</div>
    </section>
    <aside className={`shell ${styles.note}`}><h2>Un nom ne raconte pas tout.</h2><p>Chaque fiche distingue les sources botaniques, les appellations du commerce et les informations qui restent inconnues. Les photographies ne sont utilisées qu’avec une provenance et des droits établis.</p><Link href="/methodologie-sources">Notre méthode et nos sources →</Link></aside>
  </main><SiteFooter compactTransit/></>;
}
