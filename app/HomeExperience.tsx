import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./SiteChrome";
import HomeUniverseCarousel from "./HomeUniverseCarousel";

const services = [
  { number: "01", title: "SOS Plantes", copy: "Comprendre les symptômes avant d’agir.", href: "/sos-plantes" },
  { number: "02", title: "Rempotage", copy: "Observer les racines et ajuster le mélange.", href: "/rempotage" },
  { number: "03", title: "Livraison", copy: "Faire arriver votre plante à Lille et dans la MEL.", href: "/livraison-plantes-lille" },
  { number: "04", title: "Mur végétal naturel", copy: "Créer un paysage vivant sur mesure, avec ou sans entretien.", href: "/mur-vegetal-naturel-lille" },
];

export default function HomeExperience() {
  return (
    <>
      <section className="home-hub shell" aria-labelledby="home-hub-title">
        <header data-reveal>
          <div><p className="section-kicker">Explorer le Studio</p><h2 id="home-hub-title">Trois univers.<br /><em>Une même exigence.</em></h2></div>
          <p>Entrez directement dans la sélection qui vous intéresse. Chaque univers possède sa propre page, ses conseils et ses disponibilités.</p>
        </header>
        <HomeUniverseCarousel />
      </section>

      <section className="home-core-services">
        <div className="shell home-core-services-inner">
          <header data-reveal><p className="section-kicker">Services essentiels · Lille</p><h2>Une réponse claire,<br /><em>au bon moment.</em></h2><Link href="/services">Voir tous les services <Arrow /></Link></header>
          <div>{services.map((service) => <a href={service.href} key={service.title} data-reveal><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p></div><Arrow /></a>)}</div>
        </div>
      </section>

      <section className="home-studio-compact shell" data-reveal>
        <figure><Image unoptimized src="/media/projet-boutique-tibaldo-jungle-lille.webp" alt="Création du Studio Végétal Tibaldo Jungle à Lille" width="1200" height="900" loading="lazy" /></figure>
        <div><p className="section-kicker">Le Studio Végétal</p><h2>À Lille,<br /><em>près de vos plantes.</em></h2><p>Tibaldo Jungle est une boutique de plantes rares et exotiques, mais aussi un lieu de conseil. La sélection, le rempotage et les substrats sont pensés ensemble pour éviter les achats inutiles et accompagner durablement chaque plante.</p><div className="home-studio-facts"><span><small>Adresse</small>3 place de l’Arbonnoise</span><span><small>Ouverture</small>26 septembre 2026</span></div><Link className="button button-green" href="/contact">Préparer ma visite <Arrow /></Link></div>
      </section>

      <section className="home-expertise-strip" aria-label="L’approche Tibaldo Jungle">
        <div className="shell" data-reveal><p className="section-kicker">L’expertise Tibaldo</p><h2>Observer. Comprendre.<br /><em>Conseiller sans sur-vendre.</em></h2><p>Une sélection passionnée, une culture suivie entre Lille et Wattignies et des conseils adaptés à la réalité de votre intérieur.</p><nav><Link href="/conseils">Lire les conseils <Arrow /></Link><Link href="/plantes">Explorer l’encyclopédie <Arrow /></Link><Link href="/coulisses">Voir les coulisses <Arrow /></Link></nav></div>
      </section>
    </>
  );
}
