/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";
import D3ScrollStoryController from "./D3ScrollStoryController";

const morphologyStates = [
  {
    className: "d3-state-juvenile",
    number: "01",
    title: "Juvénile",
    copy: "Les premières feuilles sont plus petites et souvent entières. La plante cherche un appui et développe sa tige.",
  },
  {
    className: "d3-state-climbing",
    number: "02",
    title: "Elle grimpe",
    copy: "Les nœuds portent des racines aériennes qui participent à l’ancrage. Un support stable accompagne le port vertical.",
  },
  {
    className: "d3-state-adult",
    number: "03",
    title: "Adulte",
    copy: "Les feuilles gagnent en taille et peuvent développer découpes puis perforations internes. Cette évolution n’est ni immédiate ni uniforme.",
  },
] as const;

export default function DeliciosaScrollStoryD3() {
  return (
    <main className="editorial-page plant-profile-page species-next-page deliciosa-scroll-story-d3">
      <D3ScrollStoryController />

      <section className="species-next-hero">
        <img className="species-next-hero-image" src="/monstera-deliciosa-feuilles.jpg" alt="Feuilles adultes découpées et fenêtrées de Monstera deliciosa" width="1800" height="2700" loading="eager" fetchPriority="high" decoding="async" />
        <div className="species-next-hero-shade" aria-hidden="true" />
        <SiteHeader />
        <div className="shell species-next-hero-content">
          <nav className="plant-profile-breadcrumb" aria-label="Fil d’Ariane">
            <Link href="/plantes">Plantes</Link><span>·</span><Link href="/plantes/monstera">Monstera</Link><span>·</span><strong>Deliciosa</strong>
          </nav>
          <p className="eyebrow"><span /> 01 · Reconnaître · Encyclopédie végétale</p>
          <h1><ScientificName name="Monstera deliciosa" className="scientific-name-hero" /></h1>
          <p>La grande liane tropicale dont les feuilles changent de silhouette en mûrissant.</p>
          <div className="species-next-hero-meta"><Link href="/plantes/famille/araceae">Araceae</Link><span>·</span><Link href="/plantes/monstera">Monstera</Link></div>
        </div>
      </section>

      <div className="d3-hero-exit" aria-hidden="true"><span>02</span><i /></div>

      <section className="d3-morphology-scene" data-d3-morphology aria-labelledby="d3-morphology-title">
        <div className="d3-stage">
          <div className="d3-atmosphere" aria-hidden="true" />
          <div className="d3-photo-field" aria-hidden="true">
            <img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" loading="lazy" decoding="async" />
            <i className="d3-photo-shade" />
          </div>

          <header className="d3-intro">
            <span>02 · Morphologie</span>
            <h2 id="d3-morphology-title">Comprendre<br /><em>la plante.</em></h2>
            <p>La silhouette de <ScientificName name="Monstera deliciosa" /> évolue avec son stade de développement. La reconnaissance passe autant par son port que par ses perforations.</p>
          </header>

          <p className="d3-transition-word d3-transition-ascension" aria-hidden="true">Ascension</p>
          <p className="d3-transition-word d3-transition-maturation" aria-hidden="true">Maturation</p>

          <ol className="d3-story-copy">
            {morphologyStates.map((state) => (
              <li className={state.className} key={state.number}>
                <span>{state.number}</span>
                <div><h3>{state.title}</h3><p>{state.copy}</p></div>
              </li>
            ))}
          </ol>

          <div className="d3-support-line" aria-hidden="true"><i /></div>
          <div className="d3-annotations" aria-hidden="true">
            <span className="d3-annotation-node">Nœud<i /></span>
            <span className="d3-annotation-root">Racine aérienne<i /></span>
            <span className="d3-annotation-cut">Découpe<i /></span>
            <span className="d3-annotation-window">Fenestration<i /></span>
          </div>

          <p className="d3-reading-label">Photographie locale · recadrage éditorial</p>
          <p className="d3-nuance"><b>À retenir.</b> La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p>
          <div className="d3-progress" aria-hidden="true"><span /><i /></div>
        </div>
      </section>

      <section className="d3-prototype-end shell" aria-label="Fin du prototype D3">
        <span>D3 · Prototype Morphology</span>
        <h2>Une plante.<br /><em>Une transformation.</em></h2>
        <p>Le reste de la fiche n’est volontairement pas construit dans ce laboratoire.</p>
      </section>
    </main>
  );
}
