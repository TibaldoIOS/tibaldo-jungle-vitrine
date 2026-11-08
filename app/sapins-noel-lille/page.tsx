import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { SiteHeader, SiteFooter } from "../SiteChrome";
import { jungleLocalIdentity, jungleStoreStructuredData } from "@/lib/jungle-local-identity";
import { christmasTreeCities, christmasTreeFaq, christmasTrees, christmasTreeBase } from "./data";
import styles from "./sapins.module.css";

const canonical = "https://jungle.tibaldo.fr/sapins-noel-lille";

export const metadata: Metadata = {
  title: "Sapins de Noël à Lille | Nordmann & Épicéa · Livraison MEL",
  description: "Nordmann et Épicéa naturels à Lille : comprendre les différences, choisir un sapin et préparer une livraison incluse dans la métropole lilloise avec TIBALDO Jungle. Sous réserve de disponibilité.",
  alternates: { canonical: christmasTreeBase },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: christmasTreeBase,
    siteName: "TIBALDO Jungle",
    title: "Sapins de Noël naturels à Lille · Nordmann et Épicéa",
    description: "Deux essences, des conseils botaniques et une livraison saisonnière incluse dans les communes éligibles de la MEL après confirmation.",
  },
  twitter: { card: "summary", title: "Sapins de Noël à Lille | TIBALDO Jungle", description: "Nordmann et Épicéa : guide, réservation et livraison dans la métropole lilloise." },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    jungleStoreStructuredData(),
    {
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: "Sapins de Noël naturels à Lille : Nordmann et Épicéa",
      description: "Conseils pour choisir, conserver et faire livrer un sapin de Noël dans la Métropole Européenne de Lille.",
      inLanguage: "fr-FR",
      isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" },
      about: [{ "@type": "Thing", name: "Sapins de Noël naturels" }, { "@type": "Place", name: "Métropole Européenne de Lille" }],
      mainEntity: { "@id": `${canonical}#essences` },
      publisher: { "@id": jungleLocalIdentity.storeId },
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#essences`,
      name: "Les deux essences de sapins de Noël",
      numberOfItems: christmasTrees.length,
      itemListElement: christmasTrees.map((tree, index) => ({
        "@type": "ListItem", position: index + 1, name: tree.botanicalName, url: `${canonical}/${tree.slug}`,
      })),
    },
    {
      "@type": "Service",
      "@id": `${canonical}#livraison`,
      name: "Livraison locale saisonnière de sapins de Noël",
      serviceType: "Livraison saisonnière de sapins naturels coupés",
      provider: { "@id": jungleLocalIdentity.storeId },
      areaServed: { "@type": "AdministrativeArea", name: "Métropole Européenne de Lille" },
      description: "Livraison incluse dans le prix des sapins de Noël aux adresses éligibles de la MEL, sous réserve de confirmation de disponibilité et de créneau. Offre distincte des autres livraisons de plantes.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
        { "@type": "ListItem", position: 2, name: "Encyclopédie végétale", item: "https://jungle.tibaldo.fr/plantes" },
        { "@type": "ListItem", position: 3, name: "Sapins de Noël à Lille", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: christmasTreeFaq.map(({ question, answer }) => ({
        "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function SapinsNoelLille() {
  return (
    <main className={styles.seasonalPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollReveal />
      <section className={styles.hero}>
        <SiteHeader />
        <div className={`shell ${styles.heroInner}`}>
          <nav className={styles.breadcrumbs} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link><span>/</span><Link href="/plantes">Encyclopédie</Link><span>/</span><span>Sapins de Noël</span>
          </nav>
          <span className={styles.kicker}>Édition de Noël · Studio Végétal de Lille</span>
          <h1>Sapins de Noël <em>à Lille.</em></h1>
          <p>Le Nordmann pour sa tenue, l’Épicéa pour son parfum. Deux conifères authentiques, des conseils précis pour bien les choisir et une offre de <strong>livraison incluse dans la métropole lilloise</strong>, selon disponibilité et créneau confirmé.</p>
          <div className={styles.actions}>
            <a className={styles.mainCta} href="#choisir">Choisir mon sapin ↗</a>
            <a className={styles.outlineCta} href="#livraison">Livraison et retrait</a>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.content}`} id="choisir">
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Deux espèces · Une même exigence</span>
          <h2>Nordmann ou Épicéa : quel sapin choisir pour Noël ?</h2>
          <p>La fraîcheur de coupe, les conditions de conservation et la température du logement comptent autant que l’essence. Notre guide botanique vous aide à choisir sans promesses de durée irréalistes.</p>
        </div>
        <div className={styles.grid}>
          {christmasTrees.map((tree, index) => (
            <article className={styles.card} key={tree.slug}>
              <Image className={styles.treeArt} unoptimized src={`/sapins-noel-lille/${tree.slug}.svg`} alt={`Illustration botanique du ${tree.commonName.toLowerCase()}, conifère de Noël non décoré`} width={960} height={760} />
              <span className={styles.number}>0{index + 1} · {tree.family}</span>
              <h3>{tree.commonName}</h3>
              <small>{tree.botanicalName}</small>
              <p><strong>{tree.tagline}</strong></p>
              <p>{tree.selection}</p>
              <Link href={`${christmasTreeBase}/${tree.slug}`}>Lire la fiche botanique et les conseils d’entretien ↗</Link>
            </article>
          ))}
        </div>
        <hr className={styles.divider} />

        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Comparatif pratique</span>
          <h2>Deux silhouettes, deux façons de vivre les fêtes.</h2>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th scope="col">Critère</th><th scope="col">Nordmann</th><th scope="col">Épicéa commun</th></tr></thead>
            <tbody>
              <tr><th scope="row">Nom botanique</th><td><em>Abies nordmanniana</em></td><td><em>Picea abies</em></td></tr>
              <tr><th scope="row">Aiguilles</th><td>Souples et moins piquantes</td><td>Fines, rigides et piquantes</td></tr>
              <tr><th scope="row">Parfum</th><td>Plutôt discret</td><td>Résineux et plus marqué</td></tr>
              <tr><th scope="row">Tenue en intérieur</th><td>Généralement meilleure</td><td>Plus sensible au dessèchement</td></tr>
              <tr><th scope="row">Pour quel usage ?</th><td>Décoration anticipée ou séjour prolongé</td><td>Ambiance traditionnelle, installation proche des fêtes</td></tr>
            </tbody>
          </table>
        </div>
        <hr className={styles.divider} />

        <div className={styles.twoCol}>
          <div className={styles.prose}>
            <span className={styles.kicker}>Conserver la fraîcheur</span>
            <h2>Un sapin coupé reste un végétal vivant quelques temps.</h2>
            <p>Lorsqu’un sapin est coupé, il continue à perdre de l’eau. Pour ralentir son dessèchement, stockez-le temporairement dans un garage frais et ombragé, si possible avec la base du tronc dans l’eau, puis installez-le dans un pied avec réserve.</p>
            <p>Avant l’installation, une coupe droite et fraîche de la base du tronc facilite la reprise d’absorption. Vérifiez ensuite chaque jour que le réservoir contient de l’eau, particulièrement les premières 24 heures. N’ajoutez ni sucre ni produits ménagers.</p>
            <p>À Lille et dans les Hauts-de-France, un garage non chauffé peut convenir pendant une période froide, mais il faut éviter le gel de l’eau, les courants d’air desséchants et les redoux. Aucun sapin coupé ne peut être garanti frais pendant un nombre fixe de semaines.</p>
          </div>
          <div className={styles.prose}>
            <span className={styles.kicker}>Sécurité & animaux</span>
            <h2>Noël, enfants, chats et chiens : les bons réflexes.</h2>
            <p>Stabilisez le pied pour éviter un basculement. Tenez les guirlandes électriques en bon état, éteignez-les en votre absence et éloignez l’arbre des radiateurs et cheminées. Un sapin sec présente davantage de risques à proximité d’une source de chaleur.</p>
            <p>Les chats et chiens peuvent mordiller les aiguilles ou jouer avec les décorations. Les aiguilles et la résine peuvent provoquer des irritations ou des troubles digestifs lorsqu’elles sont ingérées ; les guirlandes, crochets et rubans présentent aussi des risques mécaniques. Couvrez l’accès à l’eau du pied pour que les animaux ne la boivent pas.</p>
            <p>En cas d’ingestion importante, de vomissements persistants ou de comportement inhabituel, contactez votre vétérinaire.</p>
          </div>
        </div>
        <hr className={styles.divider} />

        <section id="livraison">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Service saisonnier · Métropole Européenne de Lille</span>
            <h2>Votre sapin livré dans la métropole lilloise.</h2>
            <p>Notre sélection de sapins de Noël prévoit la <strong>livraison incluse dans les communes éligibles de la MEL</strong>, à une adresse accessible, après validation du sapin disponible et d’un créneau. Les conditions sont confirmées avant toute réservation. Cette formule de Noël est distincte de la <Link href="/livraison-plantes-lille">livraison ordinaire des plantes</Link>.</p>
          </div>
          <div className={styles.note}>
            <strong>Livraison comprise · Offre sapins de Noël</strong>
            La sélection, les tailles, les dates et les créneaux restent soumis aux arrivages. Contactez-nous pour confirmer la commune, l’accès et la disponibilité avant de réserver. L’offre saisonnière ne modifie pas les tarifs applicables aux autres produits.
          </div>
          <ul className={styles.cityList} aria-label="Exemples de communes de la métropole lilloise">
            {christmasTreeCities.map((city) => <li key={city}>{city}</li>)}
          </ul>
          <p className={styles.prose}>Cette liste illustre des communes du territoire et n’est pas une liste limitative de toutes les communes. Pour une autre adresse dans la Métropole Européenne de Lille, demandez une confirmation personnalisée.</p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.number}>01 · Livraison de Noël</span>
              <h3>À votre porte, sur créneau confirmé.</h3>
              <p>Indiquez la commune, la hauteur souhaitée et l’essence. Nous confirmons ensuite les possibilités de livraison avant la validation de votre demande.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.number}>02 · Retrait au Studio</span>
              <h3>Au cœur de Lille, sur demande.</h3>
              <p>Un retrait est envisageable au <strong>3 place de l’Arbonnoise, 59000 Lille</strong>, près de Cormontaigne, selon les modalités précisées lors de la réservation. Ne vous déplacez pas avant confirmation du sapin.</p>
            </div>
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.prose}>
          <span className={styles.kicker}>Après Noël · Gestion responsable</span>
          <h2>Recycler son sapin à Lille et dans les Hauts-de-France.</h2>
          <p>Un arbre coupé ne repart pas en terre, même si sa base a été conservée dans l’eau. Retirez guirlandes, boules, neige artificielle et filet, puis privilégiez les points de collecte et de valorisation autorisés par votre commune. Le broyage peut permettre un réemploi sous forme de paillage selon les filières locales.</p>
          <p>Les dispositifs de collecte de Lille, de Roubaix, de Tourcoing ou d’autres communes de la MEL peuvent différer chaque année. Consultez toujours la <a href="https://www.lille.fr/" target="_blank" rel="noreferrer">Ville de Lille</a> ou la <a href="https://www.lillemetropole.fr/" target="_blank" rel="noreferrer">Métropole Européenne de Lille</a> pour les règles à jour.</p>
        </section>
        <hr className={styles.divider} />
        <section aria-labelledby="faq-sapins">
          <div className={styles.sectionHeading}><span className={styles.kicker}>FAQ · Réponses directes</span><h2 id="faq-sapins">Tout savoir avant d’acheter un sapin naturel.</h2></div>
          <div className={styles.faq}>
            {christmasTreeFaq.map(({ question, answer }) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.prose}>
          <span className={styles.kicker}>TIBALDO Jungle · Lille Vauban-Esquermes</span>
          <h2>Réserver ou demander conseil.</h2>
          <p>Vous recherchez un Nordmann pour un appartement à Lambersart, un Épicéa pour une maison à Villeneuve-d’Ascq ou un sapin à offrir près de Lille ? Nous pouvons vous orienter vers l’essence adaptée, sous réserve d’arrivages disponibles.</p>
          <div className={styles.actions}>
            <Link className={styles.mainCta} style={{ background: "#194b3e", color: "#fff" }} href="/contact">Contacter le Studio ↗</Link>
            <a className={styles.mainCta} style={{ background: "#e5ede2" }} href={`tel:${jungleLocalIdentity.phoneE164}`}>Appeler le 07 43 72 70 79</a>
          </div>
        </section>
        <hr className={styles.divider} />
        <nav className={styles.links} aria-label="Explorer TIBALDO Jungle">
          <Link href="/plantes">Encyclopédie des plantes ↗</Link>
          <Link href="/boutique-plantes-lille">Notre boutique de plantes à Lille ↗</Link>
          <Link href="/livraison-plantes-lille">Conditions des livraisons classiques ↗</Link>
          <Link href="/conseils">Tous nos guides d’entretien ↗</Link>
          <Link href="/contact">Contact et localisation ↗</Link>
        </nav>
        <p className={styles.sources}>Pour comparer les caractéristiques des essences : <a href="https://www.rhs.org.uk/plants/types/trees/christmas-trees" target="_blank" rel="noreferrer">Royal Horticultural Society — guide des sapins de Noël</a>. Illustrations botaniques originales non contractuelles. Dossier éditorial saisonnier mis à jour en novembre 2026. Les conseils botaniques ne constituent pas une garantie de conservation ; l’offre et les disponibilités sont à confirmer auprès du Studio.</p>
      </section>
      <SiteFooter compactTransit />
    </main>
  );
}
