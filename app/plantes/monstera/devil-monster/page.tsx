import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../../SiteChrome";
import styles from "../../../dream-plants.module.css";
import { betaOnlyRobots } from "@/lib/deployment-mode";

const canonical = "https://jungle.tibaldo.fr/plantes/monstera/devil-monster";
const base = "/media/owner-media/monstera-devil-monster";
const hero = `${base}/monstera-devil-monster-feuille-panachee-mature-illustration.webp`;

export const metadata: Metadata = {
  title: "Monstera « Devil Monster » : guide et acclimatation | TIBALDO Jungle",
  description: "Guide prudent de la Monstera commercialisée sous le nom Devil Monster : identité, culture, tissue culture, acclimatation et évolution du feuillage.",
  alternates: { canonical: "/plantes/monstera/devil-monster" },
  openGraph: { title: "Monstera « Devil Monster » : guide de culture", description: "Identité commerciale, culture et acclimatation, sans promesse botanique non établie.", url: canonical, images: [{ url: hero, width: 960, height: 1280 }] },
  ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}),
};

const photos = [
  ["jeune-feuillage-angle-01", "Jeune sujet en contenant d’acclimatation, vue 1"], ["jeune-feuillage-angle-02", "Jeune sujet au feuillage vert, vue 2"],
  ["feuille-panachee-detail-01", "Feuille panachée mature, détail 1"], ["jeune-feuillage-angle-03", "Jeune sujet vert, vue 3"],
  ["jeune-feuillage-angle-04", "Jeune sujet vert, vue 4"], ["jeune-feuillage-angle-05", "Jeune feuillage entier, vue 5"],
  ["jeune-feuillage-angle-06", "Jeune sujet vert, vue 6"], ["feuille-panachee-detail-02", "Feuille panachée mature, détail 2"],
  ["feuille-panachee-mature-illustration", "Feuillage panaché mature, vue d’ensemble"], ["feuille-panachee-detail-03", "Feuille panachée mature, détail 3"],
  ["jeune-feuillage-angle-07", "Jeune sujet vert, vue 7"], ["jeune-feuillage-angle-08", "Jeune sujet vert, vue 8"],
] as const;
const youngPhotos = [photos[0], photos[1], photos[3], photos[4], photos[5], photos[6], photos[10], photos[11]];
const developedPhotos = [photos[2], photos[7], photos[8], photos[9]];

const care = [
  ["Lumière", "Vive et indirecte ; éviter le soleil brûlant, surtout après un changement d’environnement."],
  ["Arrosage", "Observer le séchage dans tout le volume du pot plutôt que suivre un calendrier fixe ; arroser lorsque le mélange commence à sécher, puis laisser tout l’excès s’écouler."],
  ["Température", "Maintenir une ambiance stable autour de 18 à 25 °C, sans courant d’air froid."],
  ["Humidité", "Une humidité de l’air régulière peut aider les jeunes plants, à condition de conserver une bonne ventilation."],
  ["Substrat", "Choisir un mélange aéré pour aracées, structuré et à rétention mesurée."],
  ["Drainage", "Utiliser un pot percé ; ne jamais laisser les racines durablement dans l’eau."],
  ["Fertilisation", "Nourrir modérément pendant la croissance active, sur substrat déjà humide."],
  ["Support", "Installer tôt un support stable et guider la tige avec des attaches souples, sans étrangler les pétioles."],
  ["Rempotage", "Rempoter lorsque les racines occupent le volume, sans surdimensionner brutalement."],
  ["Observation", "Attendre le déploiement complet d’une feuille avant de l’évaluer."],
] as const;

const faq = [
  ["La Monstera « Devil Monster » est-elle rare ?", "Le nom circule dans un marché spécialisé, mais la rareté varie selon les pays, les périodes et les vendeurs."],
  ["Est-ce une vraie variété botanique ?", "Les sources documentent un nom commercial ou horticole rattaché à Monstera deliciosa. Elles n’établissent pas un cultivar officiel."],
  ["Que signifie TC ?", "TC signifie tissue culture, une multiplication in vitro. La méthode ne prouve à elle seule ni identité morphologique parfaite ni absence de tout problème sanitaire."],
  ["Comment acclimater une plantule TC ?", "Procéder progressivement : humidité maîtrisée, lumière douce, chaleur stable, substrat aéré et surveillance des racines."],
  ["Plantule TC ou plante acclimatée : quelle différence ?", "Une plantule sortie du laboratoire adapte encore ses échanges d’eau et sa photosynthèse. Une plante acclimatée depuis plusieurs mois a déjà franchi une partie de cette transition."],
  ["Comment les feuilles évoluent-elles ?", "Les feuilles juvéniles sont généralement entières. Avec la maturité, une lumière adaptée et un support, elles peuvent gagner en taille et se découper."],
  ["La croissance est-elle rapide ?", "Elle dépend des racines, de la lumière, de la température, du support et de la saison. Aucun calendrier n’est garanti."],
  ["Faut-il un tuteur ?", "Oui. Un support vertical aide cette plante grimpante à s’ancrer et à structurer son feuillage."],
  ["Quel substrat choisir ?", "Un mélange aéré pour aracées, avec écorces, fraction minérale et juste assez de rétention d’eau."],
  ["Peut-on la trouver en France ?", "Le nom apparaît chez quelques vendeurs spécialisés ; il faut vérifier identité annoncée et acclimatation réelle."],
  ["Peut-on l’acheter à Lille ?", "Aucune offre n’est publiée par TIBALDO Jungle. Selon le Studio, ces plantes sont déjà acclimatées depuis plusieurs mois en France ; leur arrivée au Studio est encore à venir, sans garantie absolue de reprise."],
] as const;

export default function DevilMonsterPage() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: "Monstera « Devil Monster » : guide de culture et d’acclimatation", url: canonical, about: { "@type": "Thing", name: "Monstera deliciosa Liebm." }, image: `https://jungle.tibaldo.fr${hero}`, author: { "@type": "Organization", name: "TIBALDO Jungle" }, inLanguage: "fr-FR" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: "https://jungle.tibaldo.fr/plantes" }, { "@type": "ListItem", position: 3, name: "Monstera", item: "https://jungle.tibaldo.fr/plantes/monstera" }, { "@type": "ListItem", position: 4, name: "Devil Monster", item: canonical }] },
    { "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ] };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={`${styles.hero} ${styles.guideHero}`}><SiteHeader />
      <Image unoptimized className={styles.guideHeroImage} src={hero} alt="Feuillage panaché mature illustrant le dossier Devil Monster" width={960} height={1280} priority />
      <div className={styles.guideHeroShade}/><div className={`shell ${styles.guideHeroContent}`}><p className={styles.eyebrow}>Guide de collection · Monstera · Lille</p><h1><span>Monstera</span>« Devil Monster »</h1><p className={styles.heroIntro}>De la culture in vitro à la plante acclimatée : comprendre le nom, la reprise et la construction d’un feuillage spectaculaire — sans transformer une promesse commerciale en certitude botanique.</p><p className={styles.heroProof}>Photographie fournie au Studio. Feuillage développé présenté à titre illustratif ; aucun lien de filiation avec les jeunes sujets n’est affirmé.</p></div>
    </section>
    <nav className={styles.chapterNav} aria-label="Chapitres"><div className="shell"><a href="#identite">Identité</a><a href="#acclimatation">Acclimatation</a><a href="#formes">Formes</a><a href="#culture">Culture</a><a href="#faq">FAQ</a></div></nav>
    <section id="identite" className={`shell ${styles.identity}`}><div className={styles.identityLead}><h2>Un nom fort.<br/><em>Un statut à nuancer.</em></h2><p>« Devil Monster » est documenté dans le commerce spécialisé comme une appellation rattachée à <i>Monstera deliciosa</i>. Les sources retenues n’établissent ni cultivar officiel, ni obtenteur, ni génétique, ni provenance précise. Le dossier conserve donc le nom utile à la recherche tout en séparant l’espèce botanique de l’usage commercial.</p></div><div className={styles.facts}>
        <article><span>Rattachement commercial</span><h3>Monstera deliciosa</h3><p>Les vendeurs consultés rattachent ce nom à l’espèce ; ce dossier ne transforme pas cet usage en certification taxonomique.</p></article><article><span>Appellation</span><h3>Commerciale / horticole</h3><p>L’usage est documenté ; son statut officiel comme cultivar ne l’est pas.</p></article><article><span>Panachure</span><h3>Observée, non promise</h3><p>Les images ne garantissent ni stabilité, ni motif, ni progression identique.</p></article><article><span>Préparation Studio</span><h3>Déjà acclimatées en France</h3><p>Selon la déclaration du Studio, ces plantes sont déjà acclimatées depuis plusieurs mois en France ; leur arrivée au Studio est encore à venir.</p></article>
    </div></section>
    <section id="acclimatation" className={styles.labSection}><div className="shell"><div><p className={styles.label}>Du laboratoire à la maison</p><h2>De la culture in vitro<br/><em>à la plante acclimatée.</em></h2></div><div className={styles.labCopy}><p>La tissue culture est une méthode de multiplication. À la sortie du milieu contrôlé, la jeune plante doit adapter sa gestion de l’eau, ses échanges gazeux et sa photosynthèse.</p><p>Selon la déclaration du Studio, ces plantes sont déjà acclimatées depuis plusieurs mois en France ; leur arrivée au Studio est encore à venir. Après achat, il n’y aura donc pas lieu de recommencer automatiquement un protocole de sortie de laboratoire : on observera d’abord le substrat, les racines et le rythme de séchage.</p><Link href="/rempotage">Comprendre le rempotage <span aria-hidden="true">→</span></Link></div></div></section>
    <section id="formes" className={`shell ${styles.visualStudy}`}><header><p className={styles.label}>Photographies fournies au Studio</p><h2>Observer les feuillages,<br/><em>sans inventer une chronologie.</em></h2><p>Les jeunes sujets verts et les feuillages développés panachés ne sont pas reliés par une filiation démontrée. Ces images comparent des formes observables ; aucune ne représente une plante actuellement vendue par TIBALDO.</p></header><h3 className={styles.galleryTitle}>Jeunes sujets · feuillage encore entier</h3><div className={styles.gallery}>{youngPhotos.map(([name, alt], i) => <figure key={name}><Image unoptimized src={`${base}/monstera-devil-monster-${name}.webp`} alt={alt} width={960} height={1280}/><figcaption><span>{String(i+1).padStart(2,"0")}</span>{alt}</figcaption></figure>)}</div><h3 className={styles.galleryTitle}>Feuillages développés · découpes et panachure observées</h3><div className={styles.gallery}>{developedPhotos.map(([name, alt], i) => <figure key={name} className={i === 2 ? styles.galleryFeature : undefined}><Image unoptimized src={`${base}/monstera-devil-monster-${name}.webp`} alt={alt} width={960} height={1280}/><figcaption><span>{String(i+1).padStart(2,"0")}</span>{alt}</figcaption></figure>)}</div></section>
    <section className={styles.growthSection}><div className="shell"><div><p className={styles.label}>Évolution du feuillage</p><h2>Grandir,<br/><em>sans calendrier promis.</em></h2></div><div className={styles.growthGrid}><article><b>01</b><h3>Jeune</h3><p>Les premières feuilles sont entières ; la plante peut d’abord investir dans ses racines.</p></article><article><b>02</b><h3>S’installer</h3><p>Lumière, support et stabilité permettent au limbe de gagner en dimension.</p></article><article><b>03</b><h3>Découpe ≠ panachure</h3><p>Les découpes accompagnent la maturité. La panachure relève d’un autre caractère et une feuille ne prédit pas exactement la suivante.</p></article></div></div></section>
    <section id="culture" className={`shell ${styles.careSection}`}><header><p className={styles.label}>Guide complet</p><h2>Créer les conditions.<br/><em>Observer la réponse.</em></h2><p>Ces repères s’appuient sur la culture de <i>Monstera deliciosa</i>, pas sur des besoins spéciaux inventés pour un nom commercial.</p></header><div className={styles.careGrid}>{care.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className={styles.careLinks}><Link href="/substrats">Substrats →</Link><Link href="/substrats/sphaigne-sechee">Sphaigne →</Link><Link href="/pots-cache-pots-lille">Pots et cache-pots →</Link></div></section>
    <section className={styles.aftercare}><div className="shell"><div><p className={styles.label}>Après l’achat</p><h2>Moins intervenir.<br/><em>Mieux observer.</em></h2></div><div className={styles.aftercareList}><p><b>Plante déjà acclimatée.</b> Ne pas reprendre automatiquement un protocole de sortie de TC : stabiliser d’abord son nouvel emplacement.</p><p><b>Premières semaines.</b> Observer racines et vitesse de séchage dans tout le pot avant d’ajuster l’arrosage.</p><p><b>Signaux d’alerte.</b> Substrat détrempé, odeur ou tissus mous demandent un diagnostic.</p><p><b>Erreurs fréquentes.</b> Confondre humidité de l’air et substrat constamment humide, ou serrer les attaches autour des pétioles.</p></div></div></section>
    <section id="faq" className={`shell ${styles.faqSection}`}><header><p className={styles.label}>Questions fréquentes</p><h2>Avant de rêver,<br/><em>bien comprendre.</em></h2></header><div>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className={`shell ${styles.sources}`}><p className={styles.label}>Pour aller plus loin</p><h2>Les références<br/><em>du dossier.</em></h2><ul>
      <li><a href="https://ask.ifas.ufl.edu/publication/EP520" target="_blank" rel="noreferrer">UF/IFAS</a><span>Acclimatation des plantules in vitro.</span></li><li><a href="https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants" target="_blank" rel="noreferrer">RHS</a><span>Culture générale de Monstera.</span></li><li><a href="https://gelliesclub.com/products/monstera-devil-monster-tissue-culture" target="_blank" rel="noreferrer">Gellie’s Club</a><span>Usage commercial du nom.</span></li><li><a href="https://www.pkplants.de/en/product-page/monstera-devil-1-pcs" target="_blank" rel="noreferrer">PK Plants</a><span>Usage commercial du nom.</span></li>
    </ul><div className={styles.backLinks}><Link className={styles.primaryLink} href="/contact">Parler du projet au Studio →</Link><Link className={styles.secondaryLink} href="/plantes/monstera">Explorer les Monstera →</Link><Link className={styles.secondaryLink} href="/boutique-plantes-lille">Studio à Lille →</Link></div></section>
    <SiteFooter compactTransit/>
  </main>;
}
