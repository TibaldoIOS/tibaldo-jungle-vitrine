import Image from "next/image";
import Link from "next/link";
import {
  deliciosaNextDiagnostics,
  deliciosaNextFaq,
  deliciosaNextIdentity,
  deliciosaNextQuickFacts,
  deliciosaNextSources,
} from "@/lib/plants/deliciosa-next";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { CompactFaq } from "./GenusRhythmInteractions";
import ScientificName from "./ScientificName";
import {
  SpeciesNextDiagnostic,
  SpeciesNextMotion,
  SpeciesNextSectionNav,
} from "./SpeciesNextInteractions";

const cultivation = [
  {
    label: "Lumière",
    answer: "Vive, mais indirecte.",
    detail:
      "Placez la plante près d’une fenêtre lumineuse. Un soleil doux peut être introduit progressivement ; évitez le soleil chaud concentré par une vitre.",
  },
  {
    label: "Arrosage",
    answer: "Observer avant d’arroser.",
    detail:
      "Laissez sécher la partie supérieure du mélange, arrosez toute la motte, puis laissez l’excédent s’évacuer. La fréquence change avec la lumière, la saison et le volume du pot.",
  },
  {
    label: "Température",
    answer: "Une chaleur stable.",
    detail:
      "Cette espèce tropicale préfère une pièce chaude et stable. Protégez-la des courants d’air froid et des chutes durables de température.",
  },
  {
    label: "Humidité",
    answer: "Moyenne à élevée, avec de l’air.",
    detail:
      "Une humidité régulière aide les nouvelles feuilles, mais elle ne remplace ni un bon arrosage ni une circulation d’air suffisante.",
  },
] as const;

const rootZone = [
  {
    number: "01",
    label: "Le milieu racinaire",
    title: "Respirant avant tout.",
    text: "Choisissez un mélange grossier qui retient un peu d’eau tout en laissant circuler l’air. Un pot percé permet à l’excédent de s’évacuer.",
  },
  {
    number: "02",
    label: "Le rempotage",
    title: "Quand les racines le demandent.",
    text: "Rempotez lorsque les racines occupent le contenant ou que le mélange sèche anormalement vite, dans un pot seulement légèrement plus grand.",
  },
  {
    number: "03",
    label: "La nutrition",
    title: "Accompagner la croissance.",
    text: "Pendant la période de croissance active, un engrais équilibré et dilué peut être apporté sur un mélange déjà humide. Évitez de fertiliser une plante en difficulté.",
  },
  {
    number: "04",
    label: "La multiplication",
    title: "Toujours partir d’un nœud.",
    text: "Une bouture de tige doit comporter au moins un nœud viable. Une feuille isolée, sans nœud, ne peut pas reformer une nouvelle liane complète.",
  },
] as const;

/**
 * ARCHIVE V6 — preserved for possible future reuse. This component is no
 * longer mounted by the public BETA species route; the active route keeps its
 * approved hero and uses the shared PlantProfile body.
 */
export default function DeliciosaProfileNext() {
  return (
    <main className="editorial-page plant-profile-page species-next-page deliciosa-next">
      <SpeciesNextMotion />
      <section className="species-next-hero">
        <Image unoptimized
          className="species-next-hero-image"
          src="/monstera-deliciosa-feuilles.jpg"
          alt="Feuilles adultes découpées et fenêtrées de Monstera deliciosa"
          width="1800"
          height="2700"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="species-next-hero-shade" aria-hidden="true" />
        <SiteHeader />
        <div className="shell species-next-hero-content">
          <nav className="plant-profile-breadcrumb" aria-label="Fil d’Ariane">
            <Link href="/plantes">Plantes</Link><span>·</span>
            <Link href="/plantes/monstera">Monstera</Link><span>·</span>
            <strong>Deliciosa</strong>
          </nav>
          <p className="eyebrow"><span /> 01 · Reconnaître · Encyclopédie végétale</p>
          <h1><ScientificName name="Monstera deliciosa" className="scientific-name-hero" /></h1>
          <p>La grande liane tropicale dont les feuilles changent de silhouette en mûrissant.</p>
          <div className="species-next-hero-meta">
            <Link href="/plantes/famille/araceae">Araceae</Link><span>·</span><Link href="/plantes/monstera">Monstera</Link>
          </div>
        </div>
      </section>

      <div className="species-next-layout shell">
        <aside><SpeciesNextSectionNav /></aside>
        <div className="species-next-content">
          <section className="species-next-section species-next-overview" id="apercu" aria-labelledby="deliciosa-overview-title" data-next-reveal>
            <header className="species-next-heading">
              <p className="section-kicker">02 · En un coup d’œil</p>
              <h2 id="deliciosa-overview-title">Les repères essentiels.</h2>
              <p>Six réponses rapides. Les nuances et les gestes viennent ensuite.</p>
            </header>
            <dl className="species-next-quick-facts">
              {deliciosaNextQuickFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd><small>{fact.detail}</small></div>)}
            </dl>
          </section>

          <section className="species-next-section species-next-identity" id="identite" aria-labelledby="deliciosa-identity-title" data-next-reveal>
            <header className="species-next-heading is-split">
              <div><p className="section-kicker">03 · Identité botanique</p><h2 id="deliciosa-identity-title">Une espèce,<br /><em>une identité lisible.</em></h2></div>
              <p>Les noms courants restent secondaires. Le nom accepté et les relations taxonomiques structurent la fiche.</p>
            </header>
            <div className="species-next-identity-sheet">
              <div className="species-next-identity-name"><span>Nom scientifique accepté</span><strong><ScientificName name={deliciosaNextIdentity.acceptedName} /></strong><small>{deliciosaNextIdentity.status}</small></div>
              <dl>
                <div><dt>Famille</dt><dd><Link href="/plantes/famille/araceae">{deliciosaNextIdentity.family}</Link></dd></div>
                <div><dt>Genre</dt><dd><Link href="/plantes/monstera">{deliciosaNextIdentity.genus}</Link></dd></div>
                <div><dt>Ordre</dt><dd>{deliciosaNextIdentity.order}</dd></div>
                <div><dt>Port</dt><dd>{deliciosaNextIdentity.habit}</dd></div>
                <div className="is-wide"><dt>Aire native retenue</dt><dd>{deliciosaNextIdentity.nativeRange}</dd></div>
                <div className="is-wide"><dt>Habitat</dt><dd>{deliciosaNextIdentity.habitat}</dd></div>
              </dl>
              <aside><span>Synonymes historiques</span>{deliciosaNextIdentity.synonyms.map((synonym) => <p key={synonym}><ScientificName name={synonym} /></p>)}<small>« borsigiana » n’est pas présentée ici comme une espèce concurrente.</small></aside>
            </div>
          </section>

          <section className="species-next-section species-next-morphology" id="comprendre" aria-labelledby="deliciosa-morphology-title" data-next-reveal>
            <header className="species-next-heading is-split"><div><p className="section-kicker">04 · Comprendre la plante</p><h2 id="deliciosa-morphology-title">Du sol vers<br /><em>la canopée.</em></h2></div><p>La silhouette de Monstera deliciosa évolue avec son stade de développement. La reconnaissance passe autant par son port que par ses perforations.</p></header>
            <ol className="species-next-morphology-story">
              <li><span>01</span><div><strong>Juvénile</strong><p>Les premières feuilles sont plus petites et souvent entières. La plante cherche un appui et développe sa tige.</p></div></li>
              <li><span>02</span><div><strong>Grimpante</strong><p>Les nœuds portent des racines aériennes qui participent à l’ancrage. Un support stable accompagne le port vertical.</p></div></li>
              <li><span>03</span><div><strong>Adulte</strong><p>Les feuilles gagnent en taille et peuvent développer découpes puis perforations internes. Cette évolution n’est ni immédiate ni uniforme.</p></div></li>
            </ol>
            <p className="species-next-nuance"><strong>À retenir.</strong> La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p>
          </section>

          <section className="species-next-section species-next-cultivation" id="cultiver" aria-labelledby="deliciosa-cultivation-title" data-next-reveal>
            <header className="species-next-heading"><p className="section-kicker">05 · Cultiver</p><h2 id="deliciosa-cultivation-title">Réponse courte.<br /><em>Puis la nuance.</em></h2></header>
            <div className="species-next-cultivation-grid">
              {cultivation.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.answer}</strong><p>{item.detail}</p></article>)}
            </div>
            <aside className="species-next-toxicity"><span>Précaution · toxicité</span><strong>À tenir hors de portée.</strong><p>Les tissus contiennent des cristaux d’oxalate de calcium irritants en cas de mastication ou d’ingestion.</p></aside>
          </section>

          <section className="species-next-section species-next-root-zone" id="racines" aria-labelledby="deliciosa-root-title" data-next-reveal>
            <header className="species-next-heading is-split"><div><p className="section-kicker">06 · Substrat & rempotage</p><h2 id="deliciosa-root-title">De l’air autour<br /><em>des racines.</em></h2></div><p>Les propriétés du milieu racinaire comptent davantage qu’une recette universelle en pourcentages.</p></header>
            <div className="species-next-root-grid">{rootZone.map((item) => <article key={item.number}><span>{item.number} · {item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <nav className="species-next-root-links" aria-label="Ressources sur le substrat et le rempotage"><Link href="/substrats">Comprendre les substrats <Arrow /></Link><Link href="/rempotage">Découvrir le Bar à rempotage <Arrow /></Link></nav>
          </section>

          <section className="species-next-section species-next-diagnostic" id="diagnostic" aria-labelledby="deliciosa-diagnostic-title" data-next-reveal>
            <header className="species-next-heading is-split"><div><p className="section-kicker">07 · Diagnostic</p><h2 id="deliciosa-diagnostic-title">Un signe.<br /><em>Plusieurs pistes.</em></h2></div><p>Un symptôme n’est pas un diagnostic. Observez, vérifiez le contexte, puis agissez sur la cause réellement plausible.</p></header>
            <SpeciesNextDiagnostic items={deliciosaNextDiagnostics} />
            <aside className="species-next-sos"><div><span>Vous hésitez sur ce que vous observez ?</span><p>Une photographie est une pièce du dossier, pas une conclusion automatique.</p></div><Link className="button button-light" href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></Link></aside>
          </section>

          <section className="species-next-section species-next-comparison" id="comparer" aria-labelledby="deliciosa-comparison-title" data-next-reveal>
            <header className="species-next-heading"><p className="section-kicker">08 · Ne plus la confondre</p><h2 id="deliciosa-comparison-title">Un nom historique.<br /><em>Une autre liane.</em></h2></header>
            <article className="species-next-borsigiana"><span>Clarification taxonomique</span><h3>« Monstera borsigiana »</h3><p>Ce nom circule encore dans le commerce pour désigner certaines formes de Monstera. Kew le traite comme un synonyme de <ScientificName name="Monstera deliciosa" />, et non comme une espèce distincte à comparer par des règles morphologiques absolues.</p></article>
            <div className="species-next-comparison-matrix" role="group" aria-label="Comparaison entre Monstera deliciosa et Rhaphidophora tetrasperma">
              <div className="is-heading"><span>Critère</span><strong>Monstera deliciosa</strong><strong>Rhaphidophora tetrasperma</strong></div>
              <div><span>Genre</span><p>Monstera</p><p>Rhaphidophora</p></div>
              <div><span>Aire native</span><p>Mexique à Guatemala</p><p>Thaïlande péninsulaire à Malaisie péninsulaire</p></div>
              <div><span>Feuilles adultes</span><p>Grandes, avec découpes externes et perforations internes possibles.</p><p>Plus petites, profondément divisées ; perforations internes seulement occasionnelles.</p></div>
              <div><span>Port</span><p>Grande liane vigoureuse.</p><p>Liane plus fine et généralement plus compacte en intérieur.</p></div>
              <div><span>Indice discriminant</span><p>Dimensions adultes et combinaison découpes + fenêtres internes.</p><p>Silhouette plus petite, segments profonds et absence habituelle de grandes fenêtres internes.</p></div>
            </div>
          </section>

          <section className="species-next-section species-next-studio" id="regard" aria-labelledby="deliciosa-studio-title" data-next-reveal>
            <div><p className="section-kicker">09 · Conseil du Studio</p><h2 id="deliciosa-studio-title">Observer la plante.<br /><em>Pas le calendrier.</em></h2><p>Ce module relève du conseil horticole Tibaldo ; il n’est pas présenté comme une observation propriétaire d’un spécimen documenté.</p></div>
            <ol><li><span>01</span><p>Avant d’arroser, contrôlez la motte plus profondément que sa seule surface.</p></li><li><span>02</span><p>Fixez la tige, pas les pétioles, contre un support suffisamment stable pour accompagner la croissance.</p></li></ol>
          </section>

          <section className="species-next-section species-next-faq" id="faq" aria-labelledby="deliciosa-faq-title" data-next-reveal>
            <header className="species-next-heading"><p className="section-kicker">10 · Questions fréquentes</p><h2 id="deliciosa-faq-title">La réponse d’abord.<br /><em>La nuance ensuite.</em></h2></header>
            <CompactFaq items={deliciosaNextFaq} name="Monstera deliciosa" />
          </section>

          <section className="species-next-section species-next-sources" id="sources" aria-labelledby="deliciosa-sources-title" data-next-reveal>
            <header><p className="section-kicker">11 · Sources</p><h2 id="deliciosa-sources-title">Vérifier sans alourdir.</h2></header>
            <div>{deliciosaNextSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.group}</span><strong>{source.label}</strong><Arrow /></a>)}</div>
          </section>

          <section className="species-next-section species-next-explore" id="explorer" aria-labelledby="deliciosa-explore-title" data-next-reveal>
            <header className="species-next-heading"><p className="section-kicker">12 · Continuer l’exploration</p><h2 id="deliciosa-explore-title">D’autres Monstera,<br /><em>d’autres caractères.</em></h2></header>
            <div><Link href="/plantes/monstera/thai-constellation"><span>01</span><strong>Thai Constellation</strong><small>Panachure crème ponctuée.</small><Arrow /></Link><Link href="/plantes/monstera/mint"><span>02</span><strong>Mint</strong><small>Marbrure pâle et diffuse.</small><Arrow /></Link><Link href="/plantes/monstera/adansonii"><span>03</span><strong>Adansonii</strong><small>Une autre espèce, plus fine et très perforée.</small><Arrow /></Link></div>
            <nav><Link href="/plantes/monstera">Voir le genre Monstera</Link><Link href="/plantes">Retour aux plantes</Link></nav>
          </section>
        </div>
      </div>
      <SiteFooter compactTransit />
    </main>
  );
}
