import Link from "next/link";
import { mixGroups, readyMixes, plantMixMapping, selectedComponents, mineral, nutrition, sourceRegistry, sourceReviewedAt } from "./selection";
import styles from "./selection.module.css";

export default function SubstrateSelection() {
  return <div className={styles.guide} data-substrate-guide>
    <section id="trouver" className={`${styles.section} ${styles.finder}`} aria-labelledby="finder-title">
      <div className="shell">
        <p className="section-kicker">01 · Partir du vivant</p>
        <h2 id="finder-title">Quelle plante voulez-vous <em>rempoter ?</em></h2>
        <p>Choisissez une plante pour rejoindre son mélange. Un premier repère, à ajuster à votre pot, à votre lumière et à votre manière d’arroser.</p>
        <nav className={styles.choices} aria-label="Trouver un mélange par plante">
          {plantMixMapping.map(item => <a key={item.plant} href={`#mix-${item.mixId}`}>{item.plant}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <p className={styles.note}>Bonsaï et terrarium désignent des modes de culture, pas des familles botaniques. Pour une plante spécialisée, vérifiez toujours l’espèce.</p>
      </div>
    </section>

    <section id="melanges" className={styles.section} aria-labelledby="mixes-title">
      <div className="shell">
        <p className="section-kicker">02 · Notre sélection SYBASoil</p>
        <h2 id="mixes-title">Le bon mélange.<br /><em>Une raison de le choisir.</em></h2>
        <p className={styles.lead}>Treize mélanges Sybotanica, relus par Jungle pour comprendre leurs différences. Ils ne sont pas fabriqués par Tibaldo. Ce guide n’annonce ni disponibilité, ni prix.</p>
        {mixGroups.map((group, index) => <div className={styles.group} key={group.id}>
          <header className={styles.groupHeading}><span className={styles.number}>0{index + 1}</span><div><p className="section-kicker">{group.label}</p><h3>{group.title}</h3><p>{group.intro}</p></div></header>
          <div className={styles.mixList}>
            {readyMixes.filter(mix => mix.group === group.id).map(mix => <article id={`mix-${mix.id}`} key={mix.id} className={styles.mix} tabIndex={-1}>
              <div><p className={styles.profile}>{mix.profile}</p><h4>{mix.name}</h4><p className={styles.plants}>Pour {mix.plants.join(" · ")}</p></div>
              <div><p>{mix.why}</p><details><summary>Lire les composants & la source</summary><p>{mix.ingredients}. Liste indicative, non exhaustive.</p><a href={mix.source}>Fiche fabricant — {mix.name} ↗</a></details>
                <div className={styles.hubLinks}>{mix.hubs.map(hub => <Link key={hub} href={`/plantes/${hub}`}>Explorer {hub === "fougeres" ? "les fougères" : hub} ↗</Link>)}</div>
              </div>
            </article>)}
          </div>
        </div>)}
      </div>
    </section>

    <section className={`${styles.section} ${styles.interlude}`} aria-labelledby="questions-title"><div className="shell">
      <p className="section-kicker">Observer avant de rempoter</p><h2 id="questions-title">Quatre questions.<br /><em>Moins d’automatismes.</em></h2>
      <ol className={styles.questions}>{["De combien d’air les racines ont-elles besoin ?", "À quelle vitesse le mélange doit-il sécher ?", "La plante apprécie-t-elle une humidité régulière ?", "Cherche-t-on structure, rétention ou nutrition ?"].map(question => <li key={question}>{question}</li>)}</ol>
      <div className={styles.universal}><h3>Et le terreau universel ?</h3><p>Il peut convenir à de nombreuses plantes. Mais un mélange fin, des fragments d’écorce ou une forte part minérale ne retiennent pas l’eau de la même façon. La taille des particules, le tassement et le rapport organique / minéral changent la place disponible pour l’air et l’eau. Le bon choix dépend aussi du pot et des conditions de culture : « universel » n’est ni une garantie, ni un défaut.</p></div>
    </div></section>

    <section id="selection-composants" className={styles.section} aria-labelledby="components-title"><div className="shell">
      <p className="section-kicker">03 · La fonction avant la recette</p><h2 id="components-title">Composer<br /><em>son propre mélange.</em></h2>
      <div className={styles.components}>{selectedComponents.map((item, index) => <article key={item.id}><span className={styles.number}>0{index + 1}</span><p className={styles.profile}>{item.role}</p><h3>{item.name}</h3><p>{item.text}</p><a href={item.source}>Lire la fiche fabricant ↗</a></article>)}</div>
      <a className={styles.textLink} href="#composants">Retrouver les neuf guides de matières Jungle ↓</a>
    </div></section>

    <section id="mineral" className={`${styles.section} ${styles.mineral}`} aria-labelledby="mineral-title"><div className={`shell ${styles.mineralInner}`}>
      <div><p className="section-kicker">04 · Changer de milieu</p><h2 id="mineral-title">Passer<br /><em>au minéral.</em></h2><p className={styles.mineralNames}>{mineral.name}</p></div>
      <div><p className={styles.profile}>{mineral.currentName}</p><p>{mineral.text}</p><p className={styles.note}>La nutrition se gère séparément dans cette base non fertilisée. Une transition de culture se prépare : elle n’est pas un remède universel à une plante en difficulté.</p><a href={mineral.source}>Comprendre la base minérale ↗</a></div>
    </div></section>

    <section id="nutrition" className={styles.section} aria-labelledby="nutrition-title"><div className="shell">
      <p className="section-kicker">05 · Accompagner la croissance</p><h2 id="nutrition-title">Nourrir,<br /><em>sans surcharger.</em></h2>
      <p className={styles.lead}>Le substrat porte les racines ; la fertilisation apporte des éléments nutritifs. Avant tout ajout, vérifiez ce que contient déjà le mélange et suivez la notice du produit exact.</p>
      <div className={styles.nutrition}>{["slow", "liquid"].map(mode => <div key={mode}><h3>{mode === "slow" ? "Libération lente" : "Nutrition liquide"}</h3><p>{mode === "slow" ? "Un apport progressif dans le substrat." : "Un apport dilué dans l’eau d’arrosage."}</p>{nutrition.filter(item => item.mode === mode).map(item => <article key={item.id}><p className={styles.profile}>{item.for}</p><h4>{item.name}</h4><p>{item.text}</p><a href={item.source}>Consulter la notice ↗</a></article>)}</div>)}</div>
      <p className={styles.note}>Ne cumulez pas les apports par défaut. Certains mélanges sont déjà fertilisés ; le fabricant prévoit une période sans ajout après rempotage. Les plantes carnivores ne relèvent pas automatiquement de ces programmes de nutrition. Aucun dosage universel n’est proposé ici.</p>
    </div></section>

    <section className={`${styles.section} ${styles.matching}`} aria-labelledby="matching-title"><div className="shell">
      <p className="section-kicker">Le mémo Jungle</p><h2 id="matching-title">De la plante<br /><em>au mélange.</em></h2>
      <div className={styles.matchList}>{plantMixMapping.map(item => <a key={item.plant} href={`#mix-${item.mixId}`}><span>{item.plant}</span><span>{item.mixName} ↗</span></a>)}</div>
      <details className={styles.sources}><summary>Sources & méthode éditoriale · {sourceRegistry.length} fiches</summary><p>Fiches fabricant consultées le {sourceReviewedAt}. Synthèses originales en français ; ingrédients principaux uniquement. Les noms commerciaux peuvent évoluer. Les promesses absolues de prévention des maladies ne sont pas reprises. Les photographies de produits ne sont pas utilisées, faute de droits établis.</p><ul>{sourceRegistry.map(item => <li key={item.url}><a href={item.url}>{item.name} ↗</a></li>)}</ul></details>
    </div></section>
  </div>;
}
