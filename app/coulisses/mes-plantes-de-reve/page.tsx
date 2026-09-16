import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../SiteChrome";
import styles from "../../dream-plants.module.css";
import { betaOnlyRobots } from "@/lib/deployment-mode";

export const metadata: Metadata = {
  title: "Mes plantes de rêve | Carnet du fondateur — TIBALDO Jungle",
  description: "Les plantes que le fondateur de TIBALDO Jungle rêve un jour de cultiver, présentées avec leur identité botanique et les incertitudes connues.",
  alternates: { canonical: "/coulisses/mes-plantes-de-reve" },
  ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}),
};

export default function DreamPlantsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Mes plantes de rêve",
        description: "Le carnet personnel des plantes que le fondateur de TIBALDO Jungle rêve un jour de cultiver.",
        url: "https://jungle.tibaldo.fr/coulisses/mes-plantes-de-reve",
        author: { "@type": "Person", name: "Romain Pruvost" },
        publisher: { "@type": "Organization", name: "TIBALDO Jungle", url: "https://jungle.tibaldo.fr" },
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
          { "@type": "ListItem", position: 2, name: "Les coulisses", item: "https://jungle.tibaldo.fr/coulisses" },
          { "@type": "ListItem", position: 3, name: "Mes plantes de rêve", item: "https://jungle.tibaldo.fr/coulisses/mes-plantes-de-reve" },
        ],
      },
    ],
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className={styles.hero}>
        <SiteHeader />
        <div className={`shell ${styles.heroContent}`}>
          <div>
            <p className={styles.eyebrow}>Carnet personnel · Projets futurs</p>
            <h1>Mes plantes<em>de rêve.</em></h1>
          </div>
          <p className={styles.heroIntro}>Des plantes qui donnent envie d’apprendre, d’attendre et de préparer de nouvelles cultures. Ce carnet rassemble les envies du fondateur, sans les confondre avec les plantes déjà présentes au Studio.</p>
        </div>
      </section>

      <section className={`shell ${styles.portrait}`} aria-labelledby="dream-devil-monster">
        <aside className={styles.typePlate} aria-label="Composition typographique, aucun média documentaire disponible">
          <strong>Devil</strong>
          <strong>Monster</strong>
          <small>Monstera deliciosa · appellation commerciale étudiée<br />Média documentaire autorisé à venir</small>
        </aside>
        <article className={styles.portraitCopy}>
          <p className={styles.label}>Rêve 01 · Monstera deliciosa</p>
          <h2 id="dream-devil-monster">Je l’adore.<em>C’est un rêve.</em></h2>
          <p className={styles.status}>Un rêve de culture — pas encore dans la collection du Studio.</p>
          <blockquote className={styles.ownerVoice}>C’est une plante que je rêverais d’avoir. J’aimerais commencer avec un petit sujet pour le faire pousser. Mais je suis aussi impatient : un beau sujet déjà bien développé, assez mature, me ferait rêver aussi.</blockquote>
          <p>« Devil Monster » circule dans le commerce spécialisé comme nom d’une Monstera deliciosa de collection. En l’absence de référence botanique autoritaire établissant un cultivar distinct, Jungle conserve cette appellation entre guillemets et la présente comme un nom commercial.</p>
          <p>Son origine précise, sa parenté, la stabilité de ses caractères et son apparence adulte ne sont pas affirmées ici. Le projet reste un désir de culture, pas une acquisition annoncée.</p>
          <Link className={styles.primaryLink} href="/plantes/monstera/devil-monster">Découvrir sa fiche botanique <span aria-hidden="true">→</span></Link>
        </article>
      </section>

      <section className={styles.future}>
        <div className="shell">
          <h2>Le carnet<br /><em>reste ouvert.</em></h2>
          <p>D’autres projets pourront rejoindre cette page lorsque le fondateur les aura nommés. La structure est prête à les accueillir, sans inventer de plante, d’acquisition ou de calendrier.</p>
        </div>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
