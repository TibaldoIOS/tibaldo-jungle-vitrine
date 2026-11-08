import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "../../ScrollReveal";
import { SiteHeader, SiteFooter } from "../../SiteChrome";
import { jungleLocalIdentity, jungleStoreStructuredData } from "@/lib/jungle-local-identity";
import { christmasTreeBase, christmasTrees, getChristmasTree } from "../data";
import styles from "../sapins.module.css";

export function generateStaticParams() {
  return christmasTrees.map((tree) => ({ slug: tree.slug }));
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tree = getChristmasTree((await params).slug);
  if (!tree) return {};
  const canonical = `${christmasTreeBase}/${tree.slug}`;
  const title = `${tree.commonName} à Lille | ${tree.botanicalName} · Livraison MEL`;
  const description = `${tree.commonName} (${tree.botanicalName}) : reconnaissance, aiguilles, parfum, conservation et entretien d’un sapin de Noël coupé. Conseils locaux à Lille, livraison MEL sous réserve de confirmation.`;
  return {
    title, description,
    alternates: { canonical },
    openGraph: { type: "article", locale: "fr_FR", url: canonical, siteName: "TIBALDO Jungle", title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function SapinSpeciesPage({ params }: Props) {
  const tree = getChristmasTree((await params).slug);
  if (!tree) notFound();
  const other = christmasTrees.find((entry) => entry.slug !== tree.slug)!;
  const url = `https://jungle.tibaldo.fr${christmasTreeBase}/${tree.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      jungleStoreStructuredData(),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${tree.commonName} : fiche botanique, entretien et livraison à Lille`,
        description: tree.tagline,
        inLanguage: "fr-FR",
        mainEntityOfPage: url,
        dateModified: "2026-11-08",
        author: { "@id": jungleLocalIdentity.organizationId },
        publisher: { "@id": jungleLocalIdentity.storeId },
        about: { "@id": `${url}#taxon` },
      },
      {
        "@type": "Taxon",
        "@id": `${url}#taxon`,
        name: tree.botanicalName,
        alternateName: tree.commonName,
        taxonRank: "https://www.wikidata.org/wiki/Q7432",
        parentTaxon: { "@type": "Taxon", name: tree.genus },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
          { "@type": "ListItem", position: 2, name: "Encyclopédie", item: "https://jungle.tibaldo.fr/plantes" },
          { "@type": "ListItem", position: 3, name: "Sapins de Noël", item: `https://jungle.tibaldo.fr${christmasTreeBase}` },
          { "@type": "ListItem", position: 4, name: tree.commonName, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: tree.faq.map(({ question, answer }) => ({
          "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <main className={styles.seasonalPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollReveal />
      <section className={styles.hero}>
        <SiteHeader />
        <div className={`shell ${styles.heroInner}`}>
          <nav className={styles.breadcrumbs} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link><span>/</span><Link href="/plantes">Encyclopédie</Link><span>/</span><Link href={christmasTreeBase}>Sapins de Noël</Link><span>/</span><span>{tree.commonName}</span>
          </nav>
          <span className={styles.kicker}>Fiche botanique · {tree.family} · Lille</span>
          <h1>{tree.commonName} <em>à Lille.</em></h1>
          <p><em>{tree.botanicalName}</em> — {tree.tagline} Un guide de choix, de conservation et d’entretien conçu pour les logements de Lille, de la métropole lilloise et des Hauts-de-France.</p>
          <div className={styles.actions}>
            <Link href={christmasTreeBase} className={styles.mainCta}>Comparer les deux sapins ↗</Link>
            <Link href="/contact" className={styles.outlineCta}>Demander une disponibilité</Link>
          </div>
        </div>
      </section>

      <div className={`shell ${styles.content}`}>
        <section className={styles.twoCol}>
          <div className={styles.prose}>
            <span className={styles.kicker}>01 · Carte d’identité</span>
            <h2>Reconnaître le {tree.commonName.toLowerCase()}.</h2>
            <p><strong>Nom scientifique :</strong> <em>{tree.botanicalName}</em></p>
            <p><strong>Famille botanique :</strong> {tree.family} · <strong>Genre :</strong> <em>{tree.genus}</em> · <strong>Espèce :</strong> <em>{tree.species}</em></p>
            <p>{tree.identification}</p>
            <p><strong>Origine naturelle :</strong> {tree.origin}</p>
          </div>
          <div className={styles.prose}>
            <span className={styles.kicker}>02 · Choisir son arbre</span>
            <h2>À qui convient cette essence ?</h2>
            <p>{tree.selection}</p>
            <p>{tree.atmosphere}</p>
            <p>Pour une livraison de sapin de Noël à Lille, Lambersart, La Madeleine, Villeneuve-d’Ascq, Loos, Wattignies et ailleurs dans la MEL, indiquez la hauteur souhaitée et les conditions d’accès. Tailles et disponibilité sont à confirmer.</p>
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.prose}>
          <span className={styles.kicker}>03 · De l’arrivage à l’installation</span>
          <h2>Stockage, eau et conservation en hiver dans le Nord.</h2>
          <p>{tree.before}</p>
          <p>Un sapin coupé peut bénéficier d’une recoupe droite de 1 à 2 cm à sa base juste avant la mise en eau, particulièrement s’il a été conservé hors de l’eau. Placez-le rapidement dans un support stable dont la réserve contient de l’eau du robinet et surveillez son niveau quotidiennement.</p>
          <p>{tree.indoor}</p>
          <p>Le climat lillois peut offrir un lieu de stockage naturel frais dans un garage non chauffé, mais ce n’est pas une chambre froide régulée. Le gel de l’eau, le soleil direct et un redoux prolongé restent à éviter. La fraîcheur initiale et la température du logement influent fortement sur la tenue des aiguilles.</p>
          <div className={styles.note}><strong>Conseil du Studio</strong>Ne laissez jamais la base du tronc se retrouver au-dessus de la ligne d’eau du pied. Évitez les additifs : l’eau claire convient.</div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.twoCol}>
          <div className={styles.prose}>
            <span className={styles.kicker}>04 · Co-habiter avec des animaux</span>
            <h2>Chats, chiens et décorations de Noël.</h2>
            <p>Le principal risque vient des aiguilles avalées, de la résine, des guirlandes ou des objets décoratifs. Placez l’arbre sur un pied stable, évitez les petits éléments faciles à ingérer et empêchez l’accès à l’eau stagnante du support.</p>
            <p>Les aiguilles et la résine peuvent irriter la bouche ou l’appareil digestif. Si votre animal ingère beaucoup d’aiguilles ou présente des signes inhabituels, contactez un vétérinaire.</p>
          </div>
          <div className={styles.prose}>
            <span className={styles.kicker}>05 · Après les fêtes</span>
            <h2>Un arbre coupé ne se replante pas.</h2>
            <p>{tree.after}</p>
            <p>Dans la métropole lilloise, vérifiez le calendrier et les points de collecte de votre commune. Lille, Roubaix, Tourcoing, Marcq-en-Barœul ou Villeneuve-d’Ascq peuvent avoir des dispositifs spécifiques, annoncés en fin d’année.</p>
          </div>
        </section>
        <hr className={styles.divider} />
        <section className={styles.prose}>
          <span className={styles.kicker}>06 · Livraison saisonnière</span>
          <h2>{tree.commonName} livré dans la métropole lilloise.</h2>
          <p>La sélection de sapins de Noël de TIBALDO Jungle prévoit une <strong>livraison incluse dans les communes éligibles de la Métropole Européenne de Lille</strong>, après confirmation de la disponibilité, de l’adresse et du créneau. L’offre est spécifique aux sapins de Noël et ne modifie pas les <Link href="/livraison-plantes-lille">frais de livraison des autres plantes et accessoires</Link>.</p>
          <p>Un retrait est également envisageable sur demande au Studio Végétal, <strong>3 place de l’Arbonnoise, 59000 Lille</strong>, près de Cormontaigne ; les conditions sont précisées avant la réservation.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.mainCta} style={{ background: "#194b3e", color: "#fff" }}>Demander un sapin ↗</Link>
            <Link href={christmasTreeBase} className={styles.mainCta} style={{ background: "#e5ede2" }}>Comparer avec {other.commonName.toLowerCase()}</Link>
          </div>
        </section>
        <hr className={styles.divider} />
        <section aria-labelledby="faq-espece">
          <div className={styles.sectionHeading}>
            <span className={styles.kicker}>Questions fréquentes</span>
            <h2 id="faq-espece">Tout savoir sur le {tree.commonName.toLowerCase()}.</h2>
          </div>
          <div className={styles.faq}>{tree.faq.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
        <hr className={styles.divider} />
        <nav className={styles.links} aria-label="Poursuivre votre recherche">
          <Link href={christmasTreeBase}>Tous les sapins de Noël à Lille ↗</Link>
          <Link href={`${christmasTreeBase}/${other.slug}`}>Fiche : {other.commonName} ↗</Link>
          <Link href="/plantes">Encyclopédie végétale ↗</Link>
          <Link href="/boutique-plantes-lille">Studio Végétal à Lille ↗</Link>
          <Link href="/contact">Nous contacter ↗</Link>
        </nav>
        <p className={styles.sources}>Références botaniques : <a href="https://www.rhs.org.uk/plants/types/trees/christmas-trees" target="_blank" rel="noreferrer">Royal Horticultural Society, guide des sapins de Noël</a> et <a href={tree.slug === "nordmann" ? "https://www.rhs.org.uk/plants/53/abies-nordmanniana/details" : "https://www.rhs.org.uk/plants/12899/picea-abies/details"} target="_blank" rel="noreferrer">fiche botanique RHS de l’espèce</a>. Dossier éditorial du Studio, novembre 2026. Disponibilités, tailles et créneaux à confirmer.</p>
      </div>
      <SiteFooter compactTransit />
    </main>
  );
}
