import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, SiteFooter, SiteHeader } from '../SiteChrome';
import ScrollReveal from '../ScrollReveal';
import LocalPresence from '../LocalPresence';
import { jungleLocalIdentity as studio, jungleStoreStructuredData } from '@/lib/jungle-local-identity';
import { jungleOrigin, betaOnlyRobots } from '@/lib/deployment-mode';
import styles from './boutique.module.css';

const title = 'Boutique de plantes tropicales et vertes à Lille | TIBALDO Jungle';
const description = 'Trouvez des plantes tropicales, vertes et de collection à Lille, avec conseils, substrats en vrac et rempotage au Studio Végétal — TIBALDO Jungle.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/boutique-plantes-lille' }, robots: betaOnlyRobots,
  openGraph: { siteName: 'TIBALDO Jungle', title, description, url: '/boutique-plantes-lille', images: [{ url: '/media/tibaldo-jungle-logo.webp', width: 700, height: 700, alt: 'Logo officiel Studio Végétal — TIBALDO Jungle à Lille' }] },
  twitter: { card: 'summary', title, description, images: ['/media/tibaldo-jungle-logo.webp'] },
};
const services = [
  ['Conseils & choix', 'Choisir selon votre lumière, votre espace et vos habitudes.', '/conseils'],
  ['Rempotage', 'Observer les racines et choisir un contenant et un mélange cohérents avec la plante.', '/rempotage'],
  ['Substrats en vrac', 'Composer un mélange adapté aux besoins de votre plante.', '/substrats-en-vrac-lille'],
  ['Pots & cache-pots', 'Associer drainage, dimensions et esthétique. Les modèles suivent les arrivages.', '/pots-cache-pots-lille'],
  ['SOS plantes', 'Observer les symptômes et trouver le bon geste.', '/sos-plantes'],
  ['Livraison locale', 'À Lille, selon faisabilité : contactez le Studio pour les modalités.', '/livraison-plantes-lille'],
];
const questions = [
  ['Où trouver des plantes tropicales, vertes ou exotiques à Lille ?', 'Au Studio Végétal — TIBALDO Jungle, boutique physique à Lille ouverte dès le 26 septembre 2026. La sélection, jusqu’aux plantes de collection, évolue selon les arrivages : appelez pour une recherche précise.'],
  ['Puis-je venir avec une plante à rempoter ?', 'Oui, le Studio vous accompagne dans le choix du pot et du substrat. Pour plusieurs plantes ou un sujet lourd, contactez-nous avant de venir.'],
];
export default function BoutiquePlantesLille() {
  const schema = { '@context': 'https://schema.org', '@graph': [jungleStoreStructuredData(), {
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${jungleOrigin}/` },
      { '@type': 'ListItem', position: 2, name: 'Boutique de plantes à Lille', item: `${jungleOrigin}/boutique-plantes-lille` },
    ],
  }] };
  return <main className={`${styles.page} editorial-page`}>
    <ScrollReveal/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <section className={styles.hero}><SiteHeader/>
      <div className={`shell ${styles.heroCopy}`}>
        <p className={styles.kicker}>Studio Végétal — TIBALDO Jungle · Lille</p>
        <h1>Une boutique de plantes <em>tropicales, vertes et rares</em> à Lille.</h1>
        <p className={styles.lead}>TIBALDO Jungle est une boutique physique de plantes d’intérieur à Lille, dont le Studio ouvre le 26 septembre 2026. Plantes vertes, tropicales, exotiques et de collection y sont sélectionnées selon les arrivages, avec conseils, rempotage et substrats pour les accompagner.</p>
        <div className={styles.actions}><a className="button button-light" href="#informations">Préparer ma visite <Arrow/></a><a href="#selection">Découvrir la sélection ↓</a></div>
        <p className={styles.opening}>3 place de l’Arbonnoise · Métro Cormontaigne<br/>Ouverture le 26 septembre · 10 h–19 h</p>
      </div>
    </section>
    <section className={`shell ${styles.section}`} id="selection">
      <header><p className={styles.kicker}>01 · La sélection</p><h2>Du premier feuillage<br/><em>à la plante de collection.</em></h2></header>
      <div className={styles.selection}>
        <article><span>Le quotidien</span><h3>Des plantes vertes à vivre.</h3><p>Une première plante, un feuillage généreux ou un grand sujet pour structurer une pièce : le choix commence par votre intérieur. Des plantes accessibles côtoient des formats plus imposants, selon les arrivages.</p></article>
        <article><span>L’envie d’explorer</span><h3>Une sensibilité tropicale.</h3><p>Monstera, Anthurium, Alocasia et Philodendron : des formes et des besoins variés, à découvrir sans confondre l’attrait d’une plante exotique avec sa facilité de culture.</p></article>
        <article><span>Le regard du collectionneur</span><h3>Des plantes singulières.</h3><p>Port, enracinement, feuillage et qualité du sujet guident la sélection. Les plantes rares ou de collection ne sont pas promises en permanence : renseignez-vous pour une recherche précise.</p></article>
      </div>
    </section>
    <section className={styles.choose}><div className={`shell ${styles.split}`}>
      <header><p className={styles.kicker}>02 · Chez vous</p><h2>La bonne plante.<br/><em>Au bon endroit.</em></h2></header>
      <div><p>Lumière, espace, humidité, expérience : apportez une photo de votre pièce pour choisir une plante à l’aise chez vous.</p><Link href="/plantes" className={styles.textLink}>Comprendre ses besoins dans l’Encyclopédie <Arrow/></Link></div>
    </div></section>
    <section className={`shell ${styles.section}`} id="services-studio">
      <header><p className={styles.kicker}>03 · Au Studio</p><h2>Le conseil ne s’arrête pas<br/><em>au choix de la plante.</em></h2></header>
      <div className={styles.services}>{services.map(([name,copy,href],i)=><Link href={href} key={href}><span>0{i+1}</span><h3>{name} <Arrow/></h3><p>{copy}</p></Link>)}</div>
    </section>
    <section className={styles.visit} id="informations"><div className={`shell ${styles.split}`}>
      <div><p className={styles.kicker}>04 · Préparer votre visite</p><h2>Une adresse.<br/><em>Une rencontre.</em></h2><address><strong>{studio.storeName}</strong><br/>{studio.streetAddress}<br/>{studio.postalCode} {studio.city}</address><p>À quelques pas du métro Cormontaigne.<br/>Métro, bus, vélo ou voiture :<br/><Link href="/contact" className={styles.textLink}>Préparer mon itinéraire <Arrow/></Link></p><p><strong>Ouverture : samedi 26 septembre 2026, 10 h–19 h.</strong><br/>Entrée libre, sans réservation.</p><Link href="/evenements/ouverture-tibaldo-jungle-lille" className={styles.textLink}>Le programme de l’ouverture <Arrow/></Link></div>
      <div><h3>Les horaires du Studio</h3><p>À partir de l’ouverture<br/>Mardi · 14 h–19 h<br/>Mercredi–samedi · 10 h–19 h<br/>Dimanche · 10 h–13 h<br/>Lundi · fermé</p><p>Une recherche précise ou un sujet difficile à transporter ? Appelez-nous avant de venir.</p><a className={styles.textLink} href={`tel:${studio.phoneE164}`}>{studio.phoneDisplay} <Arrow/></a><LocalPresence/></div>
    </div></section>
    <section className={`shell ${styles.section}`} id="questions-locales"><header><p className={styles.kicker}>05 · Vos questions</p><h2>Avant de pousser<br/><em>la porte.</em></h2></header><div className={styles.questions}>{questions.map(([question,answer],i)=><article key={question}><h3>{question}</h3><p>{answer}</p>{i===1&&<Link href="/rempotage" className={styles.textLink}>Le service de rempotage <Arrow/></Link>}</article>)}</div></section>
    <aside className={`shell ${styles.related}`} aria-label="Encyclopédie"><Link href="/plantes">Approfondir dans l’Encyclopédie <Arrow/></Link><p>Des repères de culture, pas un catalogue de stock.</p></aside>
    <SiteFooter compactTransit/>
  </main>;
}
