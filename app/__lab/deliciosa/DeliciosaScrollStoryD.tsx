/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { deliciosaNextIdentity } from "@/lib/plants/deliciosa-next";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";
import ScrollStoryController from "./ScrollStoryController";

const facts = [
  { number: "01", label: "Lumière", value: "04/05", note: "Vive · indirecte" },
  { number: "02", label: "Arrosage", value: "02/05", note: "Après séchage partiel" },
  { number: "03", label: "Humidité", value: "03/05", note: "Moyenne à élevée" },
  { number: "04", label: "Difficulté", value: "02/05", note: "Accessible" },
  { number: "05", label: "Toxicité", value: "Oui", note: "Irritante si ingérée" },
  { number: "06", label: "Croissance", value: "Grimpante", note: "Vigoureuse avec support" },
] as const;

const identityNotes = [
  { label: "Famille", value: deliciosaNextIdentity.family },
  { label: "Genre", value: deliciosaNextIdentity.genus },
  { label: "Ordre", value: deliciosaNextIdentity.order },
  { label: "Statut", value: deliciosaNextIdentity.status },
  { label: "Aire native retenue", value: deliciosaNextIdentity.nativeRange },
  { label: "Habitat", value: deliciosaNextIdentity.habitat },
  { label: "Port", value: deliciosaNextIdentity.habit },
] as const;

export default function DeliciosaScrollStoryD() {
  return (
    <main className="editorial-page plant-profile-page species-next-page deliciosa-scroll-story-d">
      <ScrollStoryController />

      <section className="species-next-hero">
        <img
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

      <p className="scroll-story-lab-label" aria-label="Prototype de laboratoire non publié">
        <span>LAB D</span> Jungle Scroll Story · prototype local
      </p>

      <section className="scroll-story-sequence story-facts" data-story-sequence="facts" aria-labelledby="story-facts-title">
        <div className="scroll-story-stage">
          <header className="story-chapter-heading">
            <span>02 · En un coup d’œil</span>
            <h2 id="story-facts-title">Les repères<br /><em>essentiels.</em></h2>
            <p>Six réponses rapides se composent en un seul paysage de lecture.</p>
          </header>
          <dl className="story-facts-composition">
            {facts.map((fact, index) => (
              <div className={`story-fact story-fact-${index + 1}`} key={fact.label}>
                <span aria-hidden="true">{fact.number}</span>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
                <small>{fact.note}</small>
              </div>
            ))}
          </dl>
          <div className="story-progress" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="scroll-story-sequence story-identity" data-story-sequence="identity" aria-labelledby="story-identity-title">
        <div className="scroll-story-stage">
          <div className="story-specimen-number" aria-hidden="true">SPECIMEN · 001</div>
          <header className="story-identity-name">
            <span>03 · Identité botanique</span>
            <h2 id="story-identity-title"><ScientificName name={deliciosaNextIdentity.acceptedName} /></h2>
            <p>Nom scientifique accepté</p>
          </header>
          <dl className="story-identity-annotations">
            {identityNotes.map((item, index) => (
              <div className={`story-identity-note story-identity-note-${index + 1}`} key={item.label}>
                <dt>{item.label}</dt><dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <aside className="story-synonyms">
            <span>Synonymes historiques</span>
            {deliciosaNextIdentity.synonyms.map((synonym) => <p key={synonym}><ScientificName name={synonym} /></p>)}
            <small>« borsigiana » n’est pas présentée ici comme une espèce concurrente.</small>
          </aside>
          <svg className="story-identity-lines" viewBox="0 0 1000 700" aria-hidden="true" focusable="false">
            <path d="M500 350 165 168M500 350 822 130M500 350 124 470M500 350 860 485M500 350 505 650" />
            <circle cx="500" cy="350" r="9" />
          </svg>
        </div>
      </section>

      <section className="scroll-story-sequence story-morphology" data-story-sequence="morphology" aria-labelledby="story-morphology-title">
        <div className="scroll-story-stage">
          <header className="story-morphology-heading">
            <span>04 · Comprendre la plante</span>
            <h2 id="story-morphology-title">Du sol vers<br /><em>la canopée.</em></h2>
          </header>
          <div className="story-morphology-visual" aria-hidden="true">
            <div className="story-morphology-image"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" loading="lazy" /></div>
            <i className="story-support-line" />
            <i className="story-aerial-root story-aerial-root-one" />
            <i className="story-aerial-root story-aerial-root-two" />
            <span className="story-visual-note story-visual-note-one">Nœud</span>
            <span className="story-visual-note story-visual-note-two">Racine aérienne</span>
          </div>
          <ol className="story-morphology-steps">
            <li className="story-morph-step story-morph-step-1">
              <span>01</span><div><strong>Juvénile</strong><p>Les premières feuilles sont plus petites et souvent entières. La plante cherche un appui et développe sa tige.</p></div>
            </li>
            <li className="story-morph-step story-morph-step-2">
              <span>02</span><div><strong>Elle grimpe</strong><p>Les nœuds portent des racines aériennes qui participent à l’ancrage. Un support stable accompagne le port vertical.</p></div>
            </li>
            <li className="story-morph-step story-morph-step-3">
              <span>03</span><div><strong>Adulte</strong><p>Les feuilles gagnent en taille et peuvent développer découpes puis perforations internes. Cette évolution n’est ni immédiate ni uniforme.</p></div>
            </li>
          </ol>
          <p className="story-morphology-nuance"><strong>À retenir.</strong> La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p>
        </div>
      </section>

      <section className="scroll-story-sequence story-cultivate" data-story-sequence="cultivate" aria-labelledby="story-cultivate-title">
        <div className="scroll-story-stage">
          <header className="story-cultivate-heading">
            <span>05 · Cultiver</span>
            <h2 id="story-cultivate-title">Observer,<br /><em>puis ajuster.</em></h2>
          </header>
          <div className="story-light-chapter">
            <span>Lumière</span>
            <strong>04<small>/05</small></strong>
            <p><b>Vive, mais indirecte.</b> Placez la plante près d’une fenêtre lumineuse. Un soleil doux peut être introduit progressivement ; évitez le soleil chaud concentré par une vitre.</p>
          </div>
          <div className="story-water-chapter">
            <span>Arrosage · un geste en trois temps</span>
            <ol>
              <li><b>01</b><strong>Observer</strong><small>Laisser sécher la partie supérieure du mélange.</small></li>
              <li><b>02</b><strong>Arroser</strong><small>Humidifier toute la motte lorsque les conditions le demandent.</small></li>
              <li><b>03</b><strong>Égoutter</strong><small>Laisser l’excédent s’évacuer complètement.</small></li>
            </ol>
            <p>La fréquence change avec la lumière, la saison et le volume du pot.</p>
          </div>
          <div className="story-cultivate-transition" aria-hidden="true"><span>Cultiver</span><i /></div>
        </div>
      </section>

      <section className="scroll-story-end shell" aria-label="Fin du prototype">
        <span>Fin du prototype D</span>
        <h2>Le langage est posé.<br /><em>La suite attend votre regard.</em></h2>
        <p>Diagnostic, comparaison et FAQ ne sont volontairement pas construits dans ce laboratoire.</p>
      </section>
    </main>
  );
}
