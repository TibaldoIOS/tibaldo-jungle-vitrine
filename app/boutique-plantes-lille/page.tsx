import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow, SiteFooter, SiteHeader } from '../SiteChrome';
import ScrollReveal from '../ScrollReveal';
import LocalPresence from '../LocalPresence';
import { jungleLocalIdentity as studio, jungleStoreStructuredData } from '@/lib/jungle-local-identity';
import { jungleOrigin, betaOnlyRobots } from '@/lib/deployment-mode';
import { homeUniverseMedia } from '@/lib/home-universe-media';
import styles from './boutique.module.css';

const title = 'Boutique de plantes tropicales et vertes à Lille | TIBALDO Jungle';
const description = 'Trouvez des plantes tropicales, vertes et de collection à Lille, avec conseils, substrats en vrac et rempotage au Studio Végétal — TIBALDO Jungle.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/boutique-plantes-lille' }, robots: betaOnlyRobots,
  openGraph: { siteName: 'TIBALDO Jungle', title, description, url: '/boutique-plantes-lille', images: [{ url: '/media/tibaldo-jungle-logo.webp', width: 700, height: 700, alt: 'Logo officiel Studio Végétal — TIBALDO Jungle à Lille' }] },
  twitter: { card: 'summary', title, description, images: ['/media/tibaldo-jungle-logo.webp'] },
};
const services = [
  ['Conseils & choix', 'Partir de votre lumière, de votre espace et de vos habitudes, plutôt que d’une simple envie de feuillage.', '/conseils'],
  ['Rempotage', 'Observer les racines et choisir un contenant et un mélange cohérents avec la plante.', '/rempotage'],
  ['Substrats en vrac', 'Comprendre les matières et préparer le mélange adapté, sans multiplier les sacs inutiles.', '/substrats-en-vrac-lille'],
  ['Pots & cache-pots', 'Associer drainage, dimensions et esthétique. Les modèles suivent les arrivages.', '/pots-cache-pots-lille'],
  ['SOS plantes', 'Faire relire un doute et observer les symptômes avant de décider d’un geste.', '/sos-plantes'],
  ['Livraison locale', 'Préparer une livraison de plantes à Lille : contactez le Studio pour les modalités et la faisabilité.', '/livraison-plantes-lille'],
];
const questions = [
  ['Où acheter des plantes vertes à Lille ?', 'Le Studio Végétal — TIBALDO Jungle vous accueille au 3 place de l’Arbonnoise, près du métro Cormontaigne, à partir du 26 septembre 2026. Apportez une photo de votre pièce : la lumière et l’espace disponibles aident à choisir une plante adaptée.'],
  ['Où trouver des plantes tropicales ou exotiques à Lille ?', 'TIBALDO Jungle prépare une sélection de plantes d’intérieur tropicales et exotiques, des sujets accessibles aux plantes de collection. Elle évolue selon les arrivages. Avant de venir pour une plante précise, appelez le Studio ou consultez sa disponibilité sur le Shop.'],
  ['Quelle boutique propose des Monstera, Anthurium ou Alocasia à Lille ?', 'Ces genres, ainsi que les Philodendron, font partie de l’univers de TIBALDO Jungle. Les espèces, formats et quantités disponibles varient : une fiche de l’Encyclopédie décrit une plante, mais ne vaut pas confirmation de stock en boutique.'],
  ['Puis-je venir avec une plante à rempoter ?', 'Le bar à rempotage permet de regarder les racines, le pot et le substrat. Consultez les conditions du service ; pour plusieurs plantes, un grand sujet ou un pot très lourd, contactez-nous avant de vous déplacer.'],
];
export default function BoutiquePlantesLille() {
  const photo = homeUniverseMedia.plants;
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
      <div><p>Une photo de la pièce et quelques indications suffisent pour commencer la discussion : où se trouve la fenêtre, quelle place reste disponible, l’air est-il sec, et combien de temps souhaitez-vous consacrer aux soins ?</p><p>Nous croisons lumière, espace, humidité et expérience pour orienter votre choix. Une grande feuille ne demande pas les mêmes conditions qu’une plante de sous-bois : mieux vaut anticiper que corriger ensuite.</p><Link href="/plantes" className={styles.textLink}>Comprendre les besoins dans l’Encyclopédie <Arrow/></Link></div>
    </div></section>
    <section className={`shell ${styles.section}`} id="services-studio">
      <header><p className={styles.kicker}>03 · Au Studio</p><h2>Le conseil ne s’arrête pas<br/><em>au choix de la plante.</em></h2></header>
      <div className={styles.services}>{services.map(([name,copy,href],i)=><Link href={href} key={href}><span>0{i+1}</span><h3>{name}</h3><p>{copy}</p><strong>Découvrir le service <Arrow/></strong></Link>)}</div>
    </section>
    <section className={`shell ${styles.proof}`} id="regard-vegetal">
      <figure><picture><source type="image/avif" srcSet={`/local-studio/mur-vegetal-tibaldo-640.avif 640w, ${photo.src} 1200w`} sizes="(max-width: 700px) calc(100vw - 32px), 50vw"/><Image unoptimized src={photo.src} width={photo.width} height={photo.height} alt="Feuillages tropicaux et grandes feuilles au premier plan du mur végétal TIBALDO" sizes="(max-width: 700px) 100vw, 50vw" loading="lazy"/></picture><figcaption>Mur végétal TIBALDO · Photo : TIBALDO. <Link href="/credits-images">Crédits photographiques</Link></figcaption></figure>
      <div><p className={styles.kicker}>04 · Notre regard sur le végétal</p><h2>Observer le vivant.<br/><em>Choisir avec attention.</em></h2><p>Cette photographie de notre mur végétal montre le goût de TIBALDO pour les feuillages, leurs textures et leurs volumes. Elle illustre notre univers ; ce n’est pas une photographie du stock disponible.</p><p>Les plantes sont préparées et cultivées à Wattignies. Votre adresse commerciale et votre lieu de visite sont le Studio Végétal, à Lille.</p><Link className={styles.textLink} href="/coulisses">Découvrir les coulisses <Arrow/></Link></div>
    </section>
    <section className={styles.visit} id="informations"><div className={`shell ${styles.split}`}>
      <div><p className={styles.kicker}>05 · Préparer votre visite</p><h2>Une adresse.<br/><em>Une rencontre.</em></h2><address><strong>{studio.storeName}</strong><br/>{studio.streetAddress}<br/>{studio.postalCode} {studio.city}</address><p>Métro Cormontaigne · Ligne 2</p><p><strong>Ouverture : samedi 26 septembre 2026, 10 h–19 h.</strong><br/>Entrée libre, sans réservation.</p><Link href="/evenements/ouverture-tibaldo-jungle-lille" className={styles.textLink}>Le programme de l’ouverture <Arrow/></Link></div>
      <div><h3>Les horaires du Studio</h3><p>À partir de l’ouverture<br/>Mardi · 14 h–19 h<br/>Mercredi–samedi · 10 h–19 h<br/>Dimanche · 10 h–13 h<br/>Lundi · fermé</p><p>Une recherche précise ou un sujet difficile à transporter ? Appelez-nous avant de venir.</p><a className={styles.textLink} href={`tel:${studio.phoneE164}`}>{studio.phoneDisplay} <Arrow/></a><LocalPresence/></div>
    </div></section>
    <section className={`shell ${styles.section}`} id="questions-locales"><header><p className={styles.kicker}>06 · Vos questions</p><h2>Avant de pousser<br/><em>la porte.</em></h2></header><div className={styles.questions}>{questions.map(([question,answer])=><article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
    <section className={`shell ${styles.related}`}><p className={styles.kicker}>Pour continuer</p><h2>Une plante à mieux connaître ?</h2><p>Ces guides sont des repères de culture, pas un catalogue de stock.</p><div>{[['monstera','Monstera'],['anthurium','Anthurium'],['alocasia','Alocasia'],['philodendron','Philodendron']].map(([slug,name])=><Link key={slug} href={`/plantes/${slug}`}>Le guide des {name} <Arrow/></Link>)}</div></section>
    <SiteFooter/>
  </main>;
}
