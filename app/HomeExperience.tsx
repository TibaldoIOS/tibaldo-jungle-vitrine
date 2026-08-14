import { Arrow } from "./SiteChrome";

const universes = [
  {
    number: "01",
    title: "Plantes",
    copy: "Raretés végétales, plantes d’intérieur et encyclopédie pour choisir selon votre lumière et votre quotidien.",
    href: "/plantes",
    image: "/collection-plantes-rares-tibaldo-jungle-lille.jpg",
    alt: "Collection de plantes rares et tropicales chez Tibaldo Jungle à Lille",
  },
  {
    number: "02",
    title: "Substrats",
    copy: "Terreau, écorces, fibres et minéraux vendus en vrac, avec un mélange adapté aux besoins des racines.",
    href: "/substrats",
    image: "/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg",
    alt: "Substrats horticoles proposés en vrac à Lille",
  },
  {
    number: "03",
    title: "Le Studio",
    copy: "Découvrez la nouvelle adresse Tibaldo Jungle, ses plantes, ses matières et les conseils proposés sur place à Lille.",
    href: "/contact",
    image: "/facade-tibaldo-jungle-studio-vegetal-lille.jpg",
    alt: "Façade du Studio Végétal Tibaldo Jungle à Lille",
  },
];

const services = [
  { number: "01", title: "SOS Plantes", copy: "Comprendre les symptômes avant d’agir.", href: "/sos-plantes" },
  { number: "02", title: "Rempotage", copy: "Observer les racines et ajuster le mélange.", href: "/rempotage-plantes-lille" },
  { number: "03", title: "Livraison", copy: "Faire arriver votre plante à Lille et dans la MEL.", href: "/livraison-plantes-lille" },
];

export default function HomeExperience() {
  return (
    <>
      <section className="home-hub shell" aria-labelledby="home-hub-title">
        <header data-reveal>
          <div><p className="section-kicker">Explorer le Studio</p><h2 id="home-hub-title">Trois univers.<br /><em>Une même exigence.</em></h2></div>
          <p>Entrez directement dans la sélection qui vous intéresse. Chaque univers possède sa propre page, ses conseils et ses disponibilités.</p>
        </header>
        <div className="home-hub-grid">
          {universes.map((item) => (
            <a href={item.href} key={item.title} data-reveal>
              <img src={item.image} alt={item.alt} width="900" height="1100" loading="lazy" />
              <span className="home-hub-shade" aria-hidden="true" />
              <small>{item.number}</small><div><h3>{item.title}</h3><p>{item.copy}</p><strong>Découvrir <Arrow /></strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-core-services">
        <div className="shell home-core-services-inner">
          <header data-reveal><p className="section-kicker">Services essentiels · Lille</p><h2>Une réponse claire,<br /><em>au bon moment.</em></h2><a href="/services">Voir tous les services <Arrow /></a></header>
          <div>{services.map((service) => <a href={service.href} key={service.title} data-reveal><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p></div><Arrow /></a>)}</div>
        </div>
      </section>

      <section className="home-studio-compact shell" data-reveal>
        <figure><img src="/projet-boutique-tibaldo-jungle-lille.webp" alt="Création du Studio Végétal Tibaldo Jungle à Lille" width="1200" height="900" loading="lazy" /></figure>
        <div><p className="section-kicker">Le Studio Végétal</p><h2>À Lille,<br /><em>près de vos plantes.</em></h2><p>Tibaldo Jungle est une boutique de plantes rares et exotiques, mais aussi un lieu de conseil. La sélection, le rempotage et les substrats sont pensés ensemble pour éviter les achats inutiles et accompagner durablement chaque plante.</p><div className="home-studio-facts"><span><small>Adresse</small>3 place de l’Arbonnoise</span><span><small>Ouverture</small>26 septembre 2026</span></div><a className="button button-green" href="/contact">Préparer ma visite <Arrow /></a></div>
      </section>

      <section className="home-expertise-strip" aria-label="L’approche Tibaldo Jungle">
        <div className="shell" data-reveal><p className="section-kicker">L’expertise Tibaldo</p><h2>Observer. Comprendre.<br /><em>Conseiller sans sur-vendre.</em></h2><p>Une sélection passionnée, une culture suivie entre Lille et Wattignies et des conseils adaptés à la réalité de votre intérieur.</p><nav><a href="/conseils">Lire les conseils <Arrow /></a><a href="/plantes">Explorer l’encyclopédie <Arrow /></a><a href="/coulisses">Voir les coulisses <Arrow /></a></nav></div>
      </section>
    </>
  );
}
