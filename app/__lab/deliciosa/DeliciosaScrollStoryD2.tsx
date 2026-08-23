/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { deliciosaNextIdentity } from "@/lib/plants/deliciosa-next";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";
import ScrollStoryController from "./ScrollStoryController";

const secondaryFacts = [
  { label: "Humidité", value: "03/05", note: "Moyenne à élevée" },
  { label: "Difficulté", value: "02/05", note: "Accessible" },
  { label: "Toxicité", value: "Oui", note: "Irritante si ingérée" },
  { label: "Croissance", value: "Grimpante", note: "Vigoureuse avec support" },
] as const;

export default function DeliciosaScrollStoryD2() {
  return (
    <main className="editorial-page plant-profile-page species-next-page deliciosa-scroll-story-d2">
      <ScrollStoryController />

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

      <div className="d2-hero-bridge" aria-hidden="true"><i /><span>02</span></div>

      <section className="d2-scene d2-facts" data-story-sequence="facts" aria-labelledby="d2-facts-title">
        <div className="d2-stage">
          <header className="d2-scene-heading">
            <span>02 · En un coup d’œil</span>
            <h2 id="d2-facts-title">Les repères<br /><em>essentiels.</em></h2>
          </header>

          <div className="d2-fact-primary">
            <span>Lumière</span><strong>04<small>/05</small></strong><p>Vive · indirecte</p>
          </div>
          <div className="d2-fact-secondary">
            <span>Arrosage</span><strong>02<small>/05</small></strong><p>Après séchage partiel</p>
          </div>
          <dl className="d2-fact-supporting">
            {secondaryFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd><small>{fact.note}</small></div>)}
          </dl>
          <div className="d2-continuous-line" aria-hidden="true"><i /></div>
          <p className="d2-scene-count" aria-hidden="true">01 / 04</p>
        </div>
      </section>

      <section className="d2-scene d2-identity" data-story-sequence="identity" aria-labelledby="d2-identity-title">
        <div className="d2-stage">
          <p className="d2-specimen-mark" aria-hidden="true">SPECIMEN · 001</p>
          <header className="d2-identity-focus">
            <span>03 · Identité botanique</span>
            <h2 id="d2-identity-title"><i>Monstera</i><i>deliciosa</i></h2>
          </header>
          <div className="d2-identity-authority">
            <strong>LIEBM.</strong><span>{deliciosaNextIdentity.status}</span>
          </div>
          <dl className="d2-taxonomy-line">
            <div><dt>Famille</dt><dd>{deliciosaNextIdentity.family}</dd></div>
            <div><dt>Genre</dt><dd>{deliciosaNextIdentity.genus}</dd></div>
            <div><dt>Ordre</dt><dd>{deliciosaNextIdentity.order}</dd></div>
          </dl>
          <dl className="d2-identity-context">
            <div><dt>Aire native retenue</dt><dd>{deliciosaNextIdentity.nativeRange}</dd></div>
            <div><dt>Habitat</dt><dd>{deliciosaNextIdentity.habitat}</dd></div>
            <div><dt>Port</dt><dd>{deliciosaNextIdentity.habit}</dd></div>
          </dl>
          <aside className="d2-identity-synonyms">
            <span>Synonymes historiques</span>
            <p><ScientificName name="Monstera borsigiana" /> · <ScientificName name="Philodendron pertusum" /></p>
            <small>« borsigiana » n’est pas présentée ici comme une espèce concurrente.</small>
          </aside>
          <svg className="d2-nomenclature-axis" viewBox="0 0 1000 120" aria-hidden="true" focusable="false"><path d="M0 60H1000M175 48v24M500 48v24M825 48v24" /></svg>
          <p className="d2-scene-count" aria-hidden="true">02 / 04</p>
        </div>
      </section>

      <section className="d2-scene d2-morphology" data-story-sequence="morphology" aria-labelledby="d2-morphology-title">
        <div className="d2-stage">
          <header className="d2-morphology-heading">
            <span>04 · Comprendre la plante</span>
            <h2 id="d2-morphology-title">Du sol vers<br /><em>la canopée.</em></h2>
          </header>
          <div className="d2-morph-figure">
            <div className="d2-morph-photo"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" loading="lazy" /></div>
            <i className="d2-morph-support" />
            <span className="d2-morph-node">Nœud</span>
            <span className="d2-morph-root">Racine aérienne</span>
            <span className="d2-morph-measure d2-morph-measure-a">01</span>
            <span className="d2-morph-measure d2-morph-measure-b">02</span>
            <span className="d2-morph-measure d2-morph-measure-c">03</span>
          </div>
          <ol className="d2-morph-copy">
            <li className="d2-morph-copy-one"><span>01</span><div><strong>Juvénile</strong><p>Les premières feuilles sont plus petites et souvent entières. La plante cherche un appui et développe sa tige.</p></div></li>
            <li className="d2-morph-copy-two"><span>02</span><div><strong>Elle grimpe</strong><p>Les nœuds portent des racines aériennes qui participent à l’ancrage. Un support stable accompagne le port vertical.</p></div></li>
            <li className="d2-morph-copy-three"><span>03</span><div><strong>Adulte</strong><p>Les feuilles gagnent en taille et peuvent développer découpes puis perforations internes. Cette évolution n’est ni immédiate ni uniforme.</p></div></li>
          </ol>
          <p className="d2-morph-caption">Schéma de lecture · interprétation éditoriale</p>
          <p className="d2-morph-nuance"><b>À retenir.</b> La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p>
          <p className="d2-scene-count" aria-hidden="true">03 / 04</p>
        </div>
      </section>

      <section className="d2-scene d2-cultivate" data-story-sequence="cultivate" aria-labelledby="d2-cultivate-title">
        <div className="d2-stage">
          <header className="d2-cultivate-heading">
            <span>05 · Cultiver</span>
            <h2 id="d2-cultivate-title">Observer,<br /><em>puis ajuster.</em></h2>
          </header>
          <div className="d2-light-focus">
            <span>Lumière</span><strong>04<small>/05</small></strong>
            <p><b>Vive, mais indirecte.</b> Placez la plante près d’une fenêtre lumineuse. Un soleil doux peut être introduit progressivement ; évitez le soleil chaud concentré par une vitre.</p>
            <i aria-hidden="true" />
          </div>
          <div className="d2-water-process">
            <span>Arrosage · un geste en trois temps</span>
            <ol>
              <li><b>01</b><strong>Observer</strong><small>Laisser sécher la partie supérieure du mélange.</small></li>
              <li><b>02</b><strong>Arroser</strong><small>Humidifier toute la motte lorsque les conditions le demandent.</small></li>
              <li><b>03</b><strong>Égoutter</strong><small>Laisser l’excédent s’évacuer complètement.</small></li>
            </ol>
            <p>La fréquence change avec la lumière, la saison et le volume du pot.</p>
          </div>
          <div className="d2-continuous-line" aria-hidden="true"><i /></div>
          <p className="d2-scene-count" aria-hidden="true">04 / 04</p>
        </div>
      </section>

      <section className="d2-prototype-end shell" aria-label="Fin du prototype D2">
        <span>Fin du prototype D2</span><h2>Le récit est posé.<br /><em>La suite attend votre regard.</em></h2><p>Diagnostic, comparaison et FAQ ne sont volontairement pas construits dans ce laboratoire.</p>
      </section>
    </main>
  );
}
