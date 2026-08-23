import Link from "next/link";
import type { CSSProperties } from "react";
import { deliciosaNextIdentity, deliciosaNextQuickFacts } from "@/lib/plants/deliciosa-next";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";

export type DeliciosaDirection = "a" | "b" | "c";

const morphology = [
  {
    number: "01",
    stage: "Juvénile",
    text: "Les premières feuilles sont plus petites et souvent entières. La plante cherche un appui et développe sa tige.",
  },
  {
    number: "02",
    stage: "Grimpante",
    text: "Les nœuds portent des racines aériennes qui participent à l’ancrage. Un support stable accompagne le port vertical.",
  },
  {
    number: "03",
    stage: "Adulte",
    text: "Les feuilles gagnent en taille et peuvent développer découpes puis perforations internes. Cette évolution n’est ni immédiate ni uniforme.",
  },
] as const;

function FrozenHero() {
  return (
    <section className="species-next-hero deliciosa-lab-frozen-hero">
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
  );
}

function DirectionMarker({ direction, title }: { direction: DeliciosaDirection; title: string }) {
  return (
    <div className="deliciosa-lab-marker" aria-label={`Prototype ${direction.toUpperCase()} — ${title}`}>
      <span>{direction.toUpperCase()}</span><strong>{title}</strong><small>Prototype local · non publié</small>
    </div>
  );
}

function MagazineDirection() {
  return (
    <div className="deliciosa-lab-content lab-magazine">
      <DirectionMarker direction="a" title="Magazine botanique" />
      <section className="lab-a-overview shell" aria-labelledby="lab-a-overview-title">
        <header><p>02 · En un coup d’œil</p><h2 id="lab-a-overview-title">Les repères<br/><em>essentiels.</em></h2><span>Six réponses rapides pour lire la plante avant d’entrer dans les nuances.</span></header>
        <dl>{deliciosaNextQuickFacts.map((fact, index) => <div key={fact.label} className={`metric-${index + 1}`}><dt>{fact.label}</dt><dd>{fact.value}</dd><small>{fact.detail}</small></div>)}</dl>
      </section>

      <section className="lab-a-identity shell" aria-labelledby="lab-a-identity-title">
        <div className="lab-a-folio"><span>03</span><small>Identité botanique</small></div>
        <header><p>Nom scientifique accepté</p><h2 id="lab-a-identity-title"><ScientificName name={deliciosaNextIdentity.acceptedName} /></h2><strong>{deliciosaNextIdentity.status}</strong></header>
        <dl>
          <div><dt>Famille</dt><dd>{deliciosaNextIdentity.family}</dd></div>
          <div><dt>Genre</dt><dd>{deliciosaNextIdentity.genus}</dd></div>
          <div><dt>Ordre</dt><dd>{deliciosaNextIdentity.order}</dd></div>
          <div><dt>Port</dt><dd>{deliciosaNextIdentity.habit}</dd></div>
          <div className="wide"><dt>Aire native</dt><dd>{deliciosaNextIdentity.nativeRange}</dd></div>
          <div className="wide"><dt>Habitat</dt><dd>{deliciosaNextIdentity.habitat}</dd></div>
        </dl>
        <aside><span>Note de nomenclature</span><p><ScientificName name={deliciosaNextIdentity.synonyms[0]} /> et <ScientificName name={deliciosaNextIdentity.synonyms[1]} /> figurent parmi les synonymes historiques retenus.</p></aside>
      </section>

      <section className="lab-a-morphology" aria-labelledby="lab-a-morphology-title">
        <div className="shell">
          <header><p>04 · Comprendre la plante</p><h2 id="lab-a-morphology-title">Du sol<br/><em>vers la canopée.</em></h2><span>La silhouette évolue avec le stade de développement. La reconnaissance passe autant par le port que par les perforations.</span></header>
          <ol>{morphology.map((item) => <li key={item.number}><span>{item.number}</span><strong>{item.stage}</strong><p>{item.text}</p></li>)}</ol>
          <p className="lab-a-note"><strong>À retenir.</strong> La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p>
        </div>
      </section>

      <section className="lab-a-cultivate shell"><p>05 · Cultiver</p><h2>Réponse courte.<br/><em>Puis la nuance.</em></h2><div><span>Lumière</span><strong>Vive, mais indirecte.</strong><p>La suite de la fiche prolongerait ce rythme éditorial sans revenir à une grille de cartes.</p></div></section>
    </div>
  );
}

function HerbariumDirection() {
  return (
    <div className="deliciosa-lab-content lab-herbarium">
      <DirectionMarker direction="b" title="Herbier contemporain" />
      <section className="lab-b-sheet shell" aria-labelledby="lab-b-title">
        <header className="lab-b-sheet-head"><span>Collection Jungle · Specimen 01</span><strong>Araceae / Monstera</strong><small>Planche d’étude contemporaine</small></header>
        <div className="lab-b-specimen" aria-hidden="true"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700"/><i>Fig. 01</i></div>
        <div className="lab-b-name"><p>03 · Identité botanique</p><h2 id="lab-b-title"><ScientificName name={deliciosaNextIdentity.acceptedName} /></h2><strong>{deliciosaNextIdentity.status}</strong></div>
        <dl className="lab-b-taxonomy">
          <div><dt>Famille</dt><dd>{deliciosaNextIdentity.family}</dd></div><div><dt>Genre</dt><dd>{deliciosaNextIdentity.genus}</dd></div><div><dt>Ordre</dt><dd>{deliciosaNextIdentity.order}</dd></div><div><dt>Port</dt><dd>{deliciosaNextIdentity.habit}</dd></div><div><dt>Origine</dt><dd>{deliciosaNextIdentity.nativeRange}</dd></div><div><dt>Habitat</dt><dd>{deliciosaNextIdentity.habitat}</dd></div>
        </dl>
        <aside className="lab-b-synonyms"><span>Annotation N° 03</span><p>Synonymes historiques : <ScientificName name={deliciosaNextIdentity.synonyms[0]} /> · <ScientificName name={deliciosaNextIdentity.synonyms[1]} />.</p></aside>
      </section>

      <section className="lab-b-measures shell" aria-labelledby="lab-b-measures-title"><header><p>02 · Lecture culturale</p><h2 id="lab-b-measures-title">Repères<br/>du spécimen.</h2></header><dl>{deliciosaNextQuickFacts.map((fact,index)=><div key={fact.label}><span>{String(index+1).padStart(2,"0")}</span><dt>{fact.label}</dt><dd>{fact.value}</dd><small>{fact.detail}</small></div>)}</dl></section>

      <section className="lab-b-morphology shell" aria-labelledby="lab-b-morphology-title"><header><span>Planche 02 / Morphologie</span><h2 id="lab-b-morphology-title">Trois états.<br/>Une même liane.</h2></header><ol>{morphology.map((item)=><li key={item.number}><span>{item.number}</span><div><small>État morphologique</small><strong>{item.stage}</strong></div><p>{item.text}</p></li>)}</ol><footer><span>Note</span><p>La maturité, la lumière et les conditions de croissance influencent la morphologie ; le support ne garantit pas seul les fenestrations.</p></footer></section>
    </div>
  );
}

function ImmersiveDirection() {
  return (
    <div className="deliciosa-lab-content lab-immersive">
      <DirectionMarker direction="c" title="Jungle immersive" />
      <section className="lab-c-overview" aria-labelledby="lab-c-overview-title"><div className="shell"><header><p>02 · En un coup d’œil</p><h2 id="lab-c-overview-title">Lire la plante<br/><em>en six signes.</em></h2></header><dl>{deliciosaNextQuickFacts.map((fact,index)=><div key={fact.label}><span>0{index+1}</span><dt>{fact.label}</dt><dd>{fact.value}</dd><small>{fact.detail}</small></div>)}</dl></div></section>

      <section className="lab-c-descent" aria-labelledby="lab-c-identity-title">
        <div className="lab-c-leaf" aria-hidden="true" />
        <div className="shell lab-c-identity"><header><p>03 · Identité botanique</p><h2 id="lab-c-identity-title"><ScientificName name={deliciosaNextIdentity.acceptedName} /></h2><strong>{deliciosaNextIdentity.status}</strong></header><div className="lab-c-taxonomy"><p><span>Famille</span>{deliciosaNextIdentity.family}</p><p><span>Genre</span>{deliciosaNextIdentity.genus}</p><p><span>Ordre</span>{deliciosaNextIdentity.order}</p><p><span>Port</span>{deliciosaNextIdentity.habit}</p></div><aside><span>Aire native</span><strong>{deliciosaNextIdentity.nativeRange}</strong><p>{deliciosaNextIdentity.habitat}</p><small>Synonymes historiques : {deliciosaNextIdentity.synonyms.join(" · ")}</small></aside></div>

        <div className="shell lab-c-morphology"><header><p>04 · Comprendre la plante</p><h2>Descendre<br/><em>dans la plante.</em></h2><span>De la feuille entière aux grandes fenêtres internes, la morphologie raconte une progression et non une recette.</span></header><ol>{morphology.map((item,index)=><li key={item.number}><span>{item.number}</span><div><strong>{item.stage}</strong><p>{item.text}</p></div><i aria-hidden="true" style={{"--growth":`${35+index*28}%`} as CSSProperties}/></li>)}</ol><footer><strong>À retenir.</strong><p>La maturité, la lumière et les conditions de croissance influencent la morphologie ; aucun support ne garantit à lui seul une feuille très fenêtrée.</p></footer></div>
      </section>
      <section className="lab-c-cultivate"><div className="shell"><p>05 · Cultiver</p><h2>Lumière vive.<br/><em>Geste mesuré.</em></h2><span>La suite poursuivrait cette immersion en conservant des réponses immédiatement lisibles, sans empiler de nouveaux panneaux.</span></div></section>
    </div>
  );
}

export default function DeliciosaVisualLab({ direction }: { direction: DeliciosaDirection }) {
  return (
    <main className={`species-next-page deliciosa-visual-lab direction-${direction}`}>
      <FrozenHero />
      {direction === "a" ? <MagazineDirection /> : direction === "b" ? <HerbariumDirection /> : <ImmersiveDirection />}
    </main>
  );
}
