import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../../SiteChrome";
import { supplierMedia } from "../../substrats/supplier-media";
import { jungleLocalIdentity, jungleStoreStructuredData, jungleOrganizationStructuredData } from "@/lib/jungle-local-identity";
import styles from "./promo.module.css";

export const dynamic = "force-dynamic";
const path = "/evenements/week-end-sybotanica-octobre-2026";
const url = `https://jungle.tibaldo.fr${path}`;
const title = "Week-end Sybotanica à Lille — 20 % crédités sur votre Passeport Jungle";
const description = "Les 3 et 4 octobre 2026 à Lille et sur le Shop : payez le prix normal, recevez 20 % en avoir pour un prochain achat. 2 articles Sybotanica par compte.";
const shop = "https://shop.tibaldo.fr/produits?q=sybotanica";
export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  openGraph: { type: "website", locale: "fr_FR", url, title, description, siteName: "TIBALDO Jungle", images: [{ url: supplierMedia.collection.src, width: 1000, height: 560, alt: supplierMedia.collection.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [supplierMedia.collection.src] },
};
const faq = [
  ["Est-ce une remise immédiate de 20 % ?", "Non. Vous payez le prix normal. Après paiement, 20 % du montant éligible est crédité sur votre Passeport Jungle sous forme d’avoir pour un prochain achat."],
  ["Combien d’articles peuvent bénéficier de l’offre ?", "Deux articles Sybotanica maximum par compte client sur l’ensemble du week-end, achats en boutique et sur le Shop cumulés. Deux exemplaires d’une même référence comptent comme deux articles."],
  ["Comment utiliser SYBOTANICA20 sur le Shop ?", "Connectez-vous à votre compte client, choisissez vos produits Sybotanica et saisissez le code SYBOTANICA20 dans le panier. Le prix payé reste le prix normal. L’avoir est crédité après confirmation du paiement éligible."],
  ["Puis-je payer avec un avoir Passeport Jungle ?", "La partie réglée avec un avoir existant ne génère pas de nouvel avoir SYBOTANICA20. Les 20 % portent uniquement sur le montant éligible réellement financé par un autre moyen de paiement, après remises."],
  ["Où retirer ma commande ?", "Le retrait s’effectue uniquement au Studio Végétal — TIBALDO Jungle, 3 place de l’Arbonnoise, 59000 Lille. Attendez le message confirmant que la commande est prête avant de vous déplacer."],
  ["Tous les produits sont-ils garantis disponibles ?", "Non. L’offre porte uniquement sur les produits Sybotanica éligibles, dans la limite des stocks disponibles. Les prix et disponibilités sont indiqués sur le Shop et vérifiés avant le paiement. Le panier seul ne réserve pas les articles."],
];
export default function SybotanicaWeekend() {
  const ended = Date.now() >= Date.parse("2026-10-04T22:00:00Z");
  const schema = { "@context": "https://schema.org", "@graph": [
    jungleOrganizationStructuredData(), jungleStoreStructuredData(),
    { "@type": "WebPage", "@id": `${url}#page`, url, name: title, description, inLanguage: "fr-FR", datePublished: "2026-10-03", dateModified: "2026-10-03", isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@id": jungleLocalIdentity.storeId }, primaryImageOfPage: { "@type": "ImageObject", url: `https://jungle.tibaldo.fr${supplierMedia.collection.src}`, caption: supplierMedia.collection.alt } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Événements", item: "https://jungle.tibaldo.fr/evenements" }, { "@type": "ListItem", position: 3, name: "Week-end Sybotanica", item: url }] },
  ] };
  return <main className={`editorial-page ${styles.page}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className={styles.top}><SiteHeader /></div>
    <article className="shell">
      <nav className={styles.breadcrumb} aria-label="Fil d’Ariane"><Link href="/">Accueil</Link> / <Link href="/evenements">Événements</Link> / Week-end Sybotanica</nav>
      <header className={styles.hero}>
        <div><p className="section-kicker">3 & 4 octobre 2026 · Lille + Shop</p><h1>Week-end Sybotanica à Lille</h1><p className={styles.lead}>20 % crédités sur votre Passeport Jungle.</p><p>Vos substrats et soins Sybotanica préparent aussi votre prochain achat : vous payez le prix normal et recevez, après paiement, un avoir de 20 % du montant éligible.</p><p><strong>2 articles maximum par compte client · stocks limités.</strong></p>{ended ? <p className={styles.notice}>Cette campagne est terminée. Cette page en conserve les conditions des 3 et 4 octobre 2026.</p> : <p className={styles.notice}>Code Shop : <strong>SYBOTANICA20</strong><br />Un avoir pour plus tard, aucune remise immédiate.</p>}<a className="button button-green" href={shop}>Voir les produits Sybotanica du Shop →</a></div>
        <figure><Image unoptimized src={supplierMedia.collection.src} width={1000} height={560} alt={supplierMedia.collection.alt} priority /><figcaption>Photographie Sybotanica — kit presse officiel.</figcaption></figure>
      </header>
      <section className={styles.section}><h2>Comment profiter de l’offre ?</h2><ol className={styles.steps}><li><strong>Choisissez vos produits Sybotanica.</strong><p>Samedi 3 et dimanche 4 octobre 2026, au magasin ou sur le Shop, avec votre compte client.</p></li><li><strong>Payez le prix normal.</strong><p>Sur le Shop, utilisez SYBOTANICA20. L’offre concerne au maximum deux articles par compte, boutique et Shop cumulés.</p></li><li><strong>Retrouvez votre avoir après paiement.</strong><p>20 % du montant éligible est crédité sur le Passeport Jungle pour un prochain achat. La partie payée avec un avoir existant ne génère pas de nouveau crédit.</p></li></ol><p>Exemple : pour 20 € d’articles éligibles réglés sans avoir ni remise, vous payez 20 € et recevez 4 € d’avoir. Cet exemple illustre le calcul ; les prix réels figurent sur les fiches du Shop.</p></section>
      <section className={styles.section}><h2>Substrats Sybotanica et soins des plantes à Lille</h2><p>Mélanges prêts à l’emploi pour aracées, Anthurium, Alocasia, orchidées ou terrariums, composants pour le drainage, engrais et soins : choisissez selon votre plante et les références réellement disponibles. Le <Link href="/substrats">guide des substrats Sybotanica</Link> aide à comprendre les mélanges ; le Shop indique les prix, formats et stocks actuels.</p><p>L’offre est réservée aux produits Sybotanica éligibles. Elle ne s’applique pas à toute la boutique, ni automatiquement aux substrats vendus en vrac.</p><a className="button button-green" href={shop}>Choisir mes produits Sybotanica →</a></section>
      <section className={`${styles.section} ${styles.visit}`}><div><p className="section-kicker">Achat en magasin · retrait boutique</p><h2>Rendez-vous au Studio de Lille</h2><p><strong>{jungleLocalIdentity.storeName}</strong><br />{jungleLocalIdentity.streetAddress}<br />{jungleLocalIdentity.postalCode} {jungleLocalIdentity.city}</p><p>Samedi 3 octobre : <strong>10 h–19 h</strong><br />Dimanche 4 octobre : <strong>10 h–13 h</strong></p><p>Sur le Shop : offre du 3 octobre à 00 h au 4 octobre à 23 h 59, heure de Paris. Paiement en ligne et retrait au Studio de Lille uniquement, dans la limite des stocks disponibles.</p></div><div><h3>Avant votre déplacement</h3><p>Pour une commande Shop, attendez la confirmation « commande prête ». Le simple ajout au panier ne réserve pas les articles.</p><p>Besoin d’un conseil sur un substrat ou un engrais ? Venez avec le nom de votre plante et les dimensions de son pot.</p><Link href="/boutique-plantes-lille">Découvrir la boutique de plantes à Lille →</Link><br /><Link href="/contact#horaires">Horaires et itinéraire →</Link><br /><Link href="/programme-fidelite">Découvrir le Passeport Jungle →</Link></div></section>
      <section className={styles.section}><h2>Vos questions sur SYBOTANICA20</h2>{faq.map(([q,a])=><details className={styles.faq} key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    </article><SiteFooter />
  </main>;
}
