import Link from "next/link";
import { shopUrl } from "@/lib/environment";
import { jungleLocalIdentity as studio } from "@/lib/jungle-local-identity";
import { Arrow } from "../SiteChrome";
import { substrateLocalCommerce as local } from "./local-commerce";
import styles from "./selection.module.css";

export default function LocalSubstrateVisit() {
  return <section className={`${styles.guide} ${styles.localVisit}`} id="acheter-a-lille" aria-labelledby="substrats-lille-title">
    <div className="shell">
      <header className={styles.localHeading}>
        <div><p className="section-kicker">{local.retailer}</p><h2 id="substrats-lille-title">Le bon mélange.<br /><em>Le conseil, à Lille.</em></h2></div>
        <div><p>Explorez les mélanges ici, préparez votre achat avec nous. Le Studio Végétal ouvre le {local.openingDate} : une adresse pour choisir, poser vos questions et retirer votre substrat.</p><p className={styles.note}>{studio.streetAddress} · {studio.postalCode} {studio.city}<br />Métro Cormontaigne · Hauts-de-France</p></div>
      </header>
      <div className={styles.purchasePaths}>
        <article><span className={styles.number}>01</span><h3>Au Studio</h3><p>À partir de l’ouverture, choisissez sur place le mélange et le volume adaptés, selon les références disponibles.</p><Link href="/contact">Préparer ma visite <Arrow /></Link></article>
        <article><span className={styles.number}>02</span><h3>Par téléphone</h3><p>Un doute sur votre plante ou un déplacement à organiser ? Parlons de votre besoin et vérifions la disponibilité.</p><a href={`tel:${studio.phoneE164}`}>Appeler le {studio.phoneDisplay} <Arrow /></a></article>
        <article><span className={styles.number}>03</span><h3>Click & collect</h3><p>{local.shopNotice}</p><a href={shopUrl()}>Consulter le Shop <Arrow /></a></article>
      </div>
      <p className={styles.localFootnote}>Métropole lilloise, Nord ou Pas-de-Calais : un seul point de retrait, à Lille. <Link href="/substrats-en-vrac-lille">Disponibilités, achat et retrait au Studio <Arrow /></Link></p>
    </div>
  </section>;
}
