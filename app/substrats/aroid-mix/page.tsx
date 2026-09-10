import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../../SiteChrome";
import styles from "./pilot.module.css";

const canonical = "https://jungle.tibaldo.fr/substrats/aroid-mix";
const pack = "/media/supplier-media/sybotanica/products/sybotanica-aroid-800.webp";
const texture = "/media/supplier-media/sybotanica/products/aroid-mix-texture-main.jpg";
const description = "Comprendre Aroid Mix : coco, perlite et structure pour Monstera, Philodendron et pothos. Rempotage, arrosage et conseils TIBALDO à Lille.";
export const metadata: Metadata = {
  title: "Aroid Mix : quel mélange pour les aroïdes ? | TIBALDO Jungle",
  description, alternates: { canonical },
  openGraph: { type: "article", title: "Aroid Mix — de l’air autour des racines", description, url: canonical, images: [{ url: pack, width: 800, height: 800, alt: "Sachet Sybotanica Aroid Mix" }] },
};
const faq = [
  ["Aroid Mix convient-il à mon Monstera ?", "C’est un point de départ pour une culture en pot. Vérifiez surtout le drainage du contenant, l’état des racines et votre rythme d’arrosage : le nom du mélange ne suffit pas à garantir un bon résultat."],
  ["Faut-il ajouter des billes d’argile au fond ?", "Le point essentiel est que l’eau puisse sortir du pot. Une couche de billes ne remplace pas les trous d’évacuation et ne corrige pas un mélange tassé."],
  ["Le sachet remplace-t-il un tuteur ?", "Non. Le substrat accompagne les racines dans le pot. Un support adapté répond à un autre besoin chez une plante grimpante."],
  ["Peut-on connaître le prix et le format disponibles ?", "Les offres seront consultables dans le Shop lorsqu’elles seront publiées. Le format visible sur une photographie fournisseur n’est pas une garantie de disponibilité à Lille."],
];

export default function AroidMixPage() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: "Aroid Mix : comprendre le mélange et adapter ses gestes", description, mainEntityOfPage: canonical, image: `https://jungle.tibaldo.fr${pack}`, author: { "@type": "Organization", name: "TIBALDO Jungle" } },
    { "@type": "BreadcrumbList", itemListElement: ["Accueil", "Substrats", "Aroid Mix"].map((name, i) => ({ "@type": "ListItem", position: i + 1, name, item: ["https://jungle.tibaldo.fr/", "https://jungle.tibaldo.fr/substrats", canonical][i] })) },
  ] };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className={styles.top}><SiteHeader /><section className={`shell ${styles.hero}`}>
      <div><Link href="/substrats" className={styles.back}>← Les substrats Jungle</Link><p className={styles.kicker}>SYBOTANICA · LE GUIDE TIBALDO</p><h1>Aroid Mix.<br /><em>Laisser respirer<br />les racines.</em></h1><p className={styles.intro}>Un mélange structuré pour les aroïdes en pot. Comprendre sa matière, puis adapter vos gestes à la plante.</p><a className={styles.button} href="#comprendre">Comprendre le mélange ↓</a></div>
      <figure className={styles.pack}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={pack} srcSet={`${pack.replace("800", "400")} 400w, ${pack} 800w`} sizes="(max-width: 700px) 85vw, 40vw" width={800} height={800} alt="Sachet Sybotanica Aroid Mix de 5 litres, illustré de feuilles de Monstera." fetchPriority="high" /><figcaption>Visuel fournisseur · format illustré, non garanti en stock</figcaption></figure>
    </section></div>
    <nav className={`shell ${styles.tags}`} aria-label="Plantes concernées"><span>POUR LES AROÏDES</span><Link href="/plantes/monstera">Monstera ↗</Link><Link href="/plantes/philodendron">Philodendron ↗</Link><Link href="/plantes/epipremnum">Pothos ↗</Link></nav>
    <section className={`shell ${styles.split}`} id="comprendre"><div><p className={styles.kicker}>01 · LIRE LA MATIÈRE</p><h2>Ni compact.<br /><em>Ni desséché.</em></h2></div><div><p>Le fabricant associe une base de coco, des fragments de coco, de la perlite et du lombricompost. Les particules grossières ménagent des espaces ; la fraction fibreuse garde une part d’humidité.</p><p>Le conseil Jungle : observez le mélange dans votre pot, pas seulement dans le sachet. Une petite motte dans un grand contenant et une plante bien enracinée ne sèchent pas au même rythme.</p></div></section>
    <section className={`shell ${styles.texture}`}><figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={texture} width={1200} height={1200} loading="lazy" alt="Une main tient Aroid Mix : fibres brunes, fragments de coco et grains blancs de perlite." /><figcaption>Photographies : Sybotanica · produit et texture</figcaption></figure><div><p className={styles.kicker}>LE MÉLANGE DE PRÈS</p><h2>Des morceaux.<br />Des fibres.<br /><em>De l’espace.</em></h2><p>Une matière grossière n’est pas une matière sèche. Soulevez le pot, observez la surface et vérifiez plus bas avant de décider d’arroser.</p><details><summary>Composition documentée</summary><p>Fibre de coco, chips de coco, perlite et lombricompost. La description fournisseur mentionne également du charbon actif. Liste non quantitative : aucune proportion n’est déduite des photographies.</p></details><p className={styles.small}>Les propriétés annoncées ne sont pas une garantie contre la pourriture. Aération, état racinaire et conduite de l’arrosage restent liés.</p></div></section>
    <section className={styles.dark}><div className={`shell ${styles.split}`}><div><p className={styles.kicker}>02 · LE GESTE JUSTE</p><h2>Rempoter.<br /><em>Sans comprimer.</em></h2><p>Un repère TIBALDO pour une plante déjà cultivée en substrat, à adapter à son état.</p></div><ol className={styles.steps}><li><h3>Observer la motte</h3><p>Choisissez un pot percé, proportionné aux racines. Dégagez doucement le substrat qui se détache ; ne déchirez pas des racines saines pour obtenir une motte parfaitement nue.</p></li><li><h3>Répartir le mélange</h3><p>Placez la plante, puis comblez les côtés sans enfouir davantage le collet. Faites descendre la matière avec de petits mouvements du pot plutôt qu’en la compactant fortement.</p></li><li><h3>Arroser, puis laisser égoutter</h3><p>Après le rempotage d’une plante aux racines saines, humidifiez le mélange et videz le cache-pot. Réévaluez ensuite le séchage : ne reconduisez pas automatiquement votre ancienne fréquence.</p></li></ol></div></section>
    <section className={`shell ${styles.split}`}><div><p className={styles.kicker}>03 · AU FIL DES ARROSAGES</p><h2>Le pot décide.<br /><em>Pas le calendrier.</em></h2></div><div><p>Votre pièce est fraîche, peu lumineuse ou votre pot reste lourd plusieurs jours ? Attendez et contrôlez l’humidité en profondeur. Une surface sèche n’indique pas toujours une motte sèche.</p><p>À l’inverse, dans un petit contenant très enraciné, surveillez plus souvent sans transformer cette surveillance en arrosage systématique. Le mélange ne compense ni une eau stagnante, ni une plante placée dans l’obscurité.</p><Link href="/conseils/arroser-plantes-interieur">Lire notre guide d’arrosage ↗</Link></div></section>
    <aside className={`shell ${styles.commerce}`} id="disponibilite"><div><p className={styles.kicker}>AU STUDIO · LILLE</p><h2>Choisir ici.<br /><em>Acheter dans le Shop.</em></h2></div><div><strong>Disponibilité à confirmer</strong><p>La sélection Sybotanica est en cours d’acheminement. Les formats, prix et possibilités de retrait seront indiqués dans le Shop pour les offres publiées.</p><p>Aucun stock n’est annoncé sur cette fiche. Pour préparer votre rempotage, appelez le Studio au 07 43 72 70 79.</p><a className={styles.button} href="tel:+33743727079">Demander conseil au Studio ↗</a></div></aside>
    <section className={`shell ${styles.faq}`}><p className={styles.kicker}>LES QUESTIONS UTILES</p><h2>Avant d’ouvrir le sachet.</h2>{faq.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</section>
    <nav className={`shell ${styles.related}`} aria-label="Continuer la lecture"><Link href="/rempotage">Faire rempoter au Studio ↗</Link><Link href="/substrats/ecorce-de-pin">Comprendre les écorces ↗</Link><Link href="/substrats">Comparer les mélanges ↗</Link></nav>
    <SiteFooter />
  </main>;
}
