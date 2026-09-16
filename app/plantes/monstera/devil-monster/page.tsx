import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../../SiteChrome";
import styles from "../../../dream-plants.module.css";
import { betaOnlyRobots } from "@/lib/deployment-mode";

export const metadata: Metadata = {
  title: "Monstera « Devil Monster » : identité et statut du nom | TIBALDO Jungle",
  description: "Dossier prudent sur l’appellation commerciale « Devil Monster », rattachée à Monstera deliciosa, avec les faits établis et les incertitudes conservées.",
  alternates: { canonical: "/plantes/monstera/devil-monster" },
  ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}),
};

export default function DevilMonsterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Monstera « Devil Monster » : identité et statut du nom",
        description: "Fiche botanique prudente de l’appellation commerciale « Devil Monster », rattachée à Monstera deliciosa.",
        url: "https://jungle.tibaldo.fr/plantes/monstera/devil-monster",
        about: { "@type": "Thing", name: "Monstera deliciosa Liebm." },
        author: { "@type": "Organization", name: "TIBALDO Jungle" },
        publisher: { "@type": "Organization", name: "TIBALDO Jungle", url: "https://jungle.tibaldo.fr" },
        image: "https://jungle.tibaldo.fr/owner-media/monstera-devil-monster/monstera-deliciosa-devil-monster-feuille-panachee.webp",
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
          { "@type": "ListItem", position: 2, name: "Plantes", item: "https://jungle.tibaldo.fr/plantes" },
          { "@type": "ListItem", position: 3, name: "Monstera", item: "https://jungle.tibaldo.fr/plantes/monstera" },
          { "@type": "ListItem", position: 4, name: "Devil Monster", item: "https://jungle.tibaldo.fr/plantes/monstera/devil-monster" },
        ],
      },
    ],
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className={`${styles.hero} ${styles.dossierHero}`}>
        <SiteHeader />
        <div className={`shell ${styles.heroContent}`}>
          <div>
            <p className={styles.eyebrow}>Encyclopédie végétale · Monstera</p>
            <h1><span>Monstera deliciosa</span>« Devil Monster »</h1>
          </div>
          <div>
            <p className={styles.status}>Un rêve de culture — pas encore dans la collection du Studio.</p>
            <p className={styles.heroIntro}>Fiche botanique d’une appellation rencontrée dans le commerce des plantes de collection, documentée sans lui attribuer un statut non établi.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.ownerPhoto} plant-profile-hero`} data-arch-contract="owner-devil-monster-v1" aria-label="Photographie Owner de Monstera Devil Monster">
        <Image
          unoptimized
          src="/media/owner-media/monstera-devil-monster/monstera-deliciosa-devil-monster-feuille-panachee.webp"
          alt="Grande feuille fenêtrée de Monstera deliciosa ‘Devil Monster’, fortement marbrée de blanc crème et de vert."
          width={1024}
          height={1280}
          priority
        />
        <div className="shell"><p>Feuille adulte documentée par l’Owner. Le motif visible ne constitue pas une promesse de panachure identique sur les prochaines feuilles.</p><small>Photo : TIBALDO</small></div>
      </section>

      <section className={`shell ${styles.identity}`}>
        <div className={styles.identityLead}>
          <h2>Ce que le nom<br /><em>permet d’affirmer.</em></h2>
          <p>Monstera deliciosa Liebm. est une espèce acceptée par Plants of the World Online. Elle est originaire du sud du Mexique jusqu’au Guatemala et pousse principalement dans le biome tropical humide. « Devil Monster » est, dans les sources consultées, un nom employé par le marché horticole : aucune autorité taxonomique consultée ne l’établit comme taxon distinct ni ne permet d’affirmer ici un cultivar formellement établi.</p>
        </div>
        <div className={styles.facts}>
          <article><span>Espèce botanique</span><h3>Monstera deliciosa Liebm.</h3><p>Nom d’espèce accepté par Kew — Plants of the World Online.</p></article>
          <article><span>Nom étudié</span><h3>« Devil Monster »</h3><p>Appellation commerciale ou horticole rencontrée chez des vendeurs spécialisés.</p></article>
          <article><span>Statut prudent</span><h3>Cultivar non établi</h3><p>Les sources consultées ne suffisent pas à démontrer un statut de cultivar reconnu ou enregistré.</p></article>
          <article><span>Provenance</span><h3>Non certifiée</h3><p>Les récits commerciaux disponibles divergent. Aucun lieu d’origine précis n’est retenu comme fait botanique.</p></article>
        </div>
      </section>

      <section className={styles.notes} aria-label="Lecture critique des informations disponibles">
        <article><p className={styles.label}>01 · Établi</p><h2>L’espèce de rattachement</h2><p>Le nom est commercialisé sous Monstera deliciosa. La fiche canonique de l’espèce reste la référence pour son identité botanique générale.</p></article>
        <article><p className={styles.label}>02 · Incertain</p><h2>L’histoire du nom</h2><p>Des sources commerciales évoquent des histoires différentes entre Chine et Thaïlande. Elles témoignent de l’usage du nom, pas d’une provenance botanique certifiée.</p></article>
        <article><p className={styles.label}>03 · Non affirmé</p><h2>Les caractères futurs</h2><p>Aucune parenté, stabilité de panachure ou morphologie adulte particulière n’est promise. La photographie Owner documente cette feuille précise, sans prédire les pousses suivantes.</p></article>
      </section>

      <section className={`shell ${styles.culture}`} aria-labelledby="devil-monster-culture">
        <p className={styles.label}>Repères de culture</p>
        <h2 id="devil-monster-culture">Cultiver l’espèce,<br /><em>sans inventer la sélection.</em></h2>
        <div><p>En l’absence de documentation fiable propre à « Devil Monster », cette fiche ne lui attribue aucun besoin particulier. Les repères de lumière, d’arrosage, de substrat et de support restent ceux de Monstera deliciosa.</p><p>La fiche canonique de l’espèce rassemble ces conseils. Elle permet de préparer une culture prudente sans transformer un nom commercial en différence botanique supposée.</p></div>
        <Link className={styles.secondaryLink} href="/plantes/monstera/deliciosa">Lire la fiche Monstera deliciosa <span aria-hidden="true">→</span></Link>
      </section>

      <section className={`shell ${styles.sources}`}>
        <p className={styles.label}>Sources et niveau de preuve</p>
        <h2>Documenter sans<br /><em>transformer l’incertain en fait.</em></h2>
        <ul>
          <li><a href="https://powo.science.kew.org/taxon/87478-1" target="_blank" rel="noreferrer">Kew · POWO</a><span>Source botanique primaire pour le nom accepté, l’aire native et le biome de Monstera deliciosa.</span></li>
          <li><a href="https://shop.rareplantsjapan.jp/products/7-57devil" target="_blank" rel="noreferrer">Rare Plants Japan</a><span>Preuve d’usage commercial du nom « Devil Monster ». Le vendeur précise lui-même reprendre le nom de la pépinière sans garantir la variété.</span></li>
          <li><a href="https://prettyingreen.com/blogs/plant-tea/devil-monster-circuit-monstera-origin-40k-plant" target="_blank" rel="noreferrer">Pretty in Green</a><span>Récit secondaire sur la circulation commerciale du nom ; conservé comme contexte de marché, pas comme autorité taxonomique.</span></li>
        </ul>
        <div className={styles.backLinks}>
          <Link className={styles.primaryLink} href="/coulisses/mes-plantes-de-reve">Revenir à Mes plantes de rêve <span aria-hidden="true">→</span></Link>
          <Link className={styles.secondaryLink} href="/plantes/monstera/deliciosa">Voir Monstera deliciosa <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
