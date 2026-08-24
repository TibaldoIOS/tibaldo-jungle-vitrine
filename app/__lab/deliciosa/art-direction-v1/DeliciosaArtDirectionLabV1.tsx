/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";
import ArtDirectionScrollController from "./ArtDirectionScrollController";
import { artDirectionContent as K } from "./art-direction-content";

const Chapter = ({ number, title, kicker }: { number: string; title: string; kicker: string }) => (
  <header className="artlab-heading"><span>{number} · {kicker}</span><h2>{title}</h2></header>
);

export default function DeliciosaArtDirectionLabV1() {
  const origin = K("content.origin.range");
  const habitat = K("content.origin.habitat");
  const morphology = K("content.morphology.heteroblasty");
  const support = K("content.support.role");
  const aerialRoots = K("content.aerial-roots.role");
  const substrate = K("content.rootzone.substrate");
  const pot = K("content.rootzone.pot");
  const repotting = K("content.rootzone.repotting");
  const fertilisation = K("content.care.fertilisation");

  return <main className="editorial-page plant-profile-page species-next-page deliciosa-art-lab">
    <ArtDirectionScrollController />
    <div className="artlab-review-badge" aria-hidden="true"><span>LAB REVIEW</span><b /><i /></div>

    {/* PAGE 1 OWNER APPROVED — markup intentionally identical to D3. */}
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

    <nav className="artlab-index" aria-label="Scènes du prototype Art Direction">
      <a href="#art-origin"><span>01</span>Origine</a><a href="#art-leaf"><span>02</span>Feuille</a><a href="#art-climb"><span>03</span>Grimper</a><a href="#art-roots"><span>04</span>Racines</a>
    </nav>

    <section className="artlab-portal" data-art-scene style={{ "--art-p": 1 } as React.CSSProperties}>
      <div className="artlab-stage"><p>Après la silhouette,</p><strong>regarder<br />la plante <em>vivre.</em></strong><i aria-hidden="true" /></div>
    </section>

    <section id="art-origin" className="artlab-scene artlab-origin" data-art-scene data-art-scene-id="origin" data-art-sticky="true" style={{ "--art-p": 1 } as React.CSSProperties}>
      <div className="artlab-stage">
        <div className="artlab-origin-photo" aria-hidden="true"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" /></div>
        <Chapter number="01" kicker="Origine / liane" title="Une liane, avant d’être une plante en pot." />
        <div className="artlab-origin-facts" data-lab-visual-excerpt="true" data-content-id="content.origin.range content.origin.habitat">
          <p><span>Aire native POWO</span>{origin.short_answer}</p>
          <p><span>Port</span>{habitat.short_answer}</p>
          <small>Hémiépiphytisme qualifié · contexte sauvage uniquement.</small>
        </div>
        <p className="artlab-source">Source directe · Kew / POWO</p>
      </div>
    </section>

    <section id="art-leaf" className="artlab-scene artlab-leaf" data-art-scene data-art-scene-id="leaf" data-art-sticky="true" style={{ "--art-p": 1 } as React.CSSProperties}>
      <div className="artlab-stage">
        <Chapter number="02" kicker="Morphologie" title="Une feuille qui change." />
        <div className="artlab-leaf-cinema" aria-hidden="true">
          <figure className="artlab-leaf-crop is-juvenile"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" /></figure>
          <figure className="artlab-leaf-crop is-developing"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" /></figure>
          <figure className="artlab-leaf-crop is-adult"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" /></figure>
        </div>
        <ol className="artlab-leaf-labels" data-lab-visual-excerpt="true" data-content-id="content.morphology.heteroblasty">
          <li><span>01</span><b>Juvénile</b><p>Une silhouette plus entière.</p></li>
          <li><span>02</span><b>Développement</b><p>La morphologie évolue.</p></li>
          <li><span>03</span><b>Adulte</b><p>Découpes et perforations internes peuvent apparaître.</p></li>
        </ol>
        <p className="artlab-leaf-answer">{morphology.short_answer}</p>
        <p className="artlab-diagram-note">Lecture morphologique · pas une séquence photographique de croissance.</p>
      </div>
    </section>

    <div className="artlab-chapter-portal" aria-hidden="true"><span>Elle change.</span><strong>Elle grimpe.</strong></div>

    <section id="art-climb" className="artlab-scene artlab-climb" data-art-scene data-art-scene-id="climb" data-art-sticky="true" style={{ "--art-p": 1 } as React.CSSProperties}>
      <div className="artlab-stage">
        <Chapter number="03" kicker="Port" title="Elle grimpe." />
        <div className="artlab-climb-visual" aria-hidden="true"><img src="/monstera-deliciosa-feuilles.jpg" alt="" width="1800" height="2700" /><i /></div>
        <div className="artlab-climb-copy">
          <article data-content-id="content.support.role"><span>Support</span><h3>{support.short_answer}</h3><p>{support.long_answer}</p></article>
          <article data-content-id="content.aerial-roots.role"><span>Racines aériennes</span><h3>{aerialRoots.short_answer}</h3><p>{aerialRoots.long_answer}</p></article>
        </div>
        <p className="artlab-asset-note">REMOTE REVIEW · crop de l’asset Jungle autorisé déjà servi.</p>
      </div>
    </section>

    <section id="art-roots" className="artlab-scene artlab-roots" data-art-scene data-art-scene-id="subsurface" data-art-sticky="true" style={{ "--art-p": 1 } as React.CSSProperties}>
      <div className="artlab-stage">
        <Chapter number="04" kicker="Milieu racinaire" title="Sous la surface." />
        <div className="artlab-cutaway" role="img" aria-label="Schéma éditorial en coupe d’un contenant, du substrat, des racines et du drainage">
          <div className="artlab-pot-rim" /><div className="artlab-soil"><i /><i /><i /><i /><i /></div><div className="artlab-root-network"><i /><i /><i /><i /></div><div className="artlab-drainage"><i /><i /><i /><i /><i /><i /></div>
        </div>
        <div className="artlab-root-story">
          <p className="is-substrate" data-content-id="content.rootzone.substrate"><span>01 · Milieu</span>{substrate.short_answer}</p>
          <p className="is-container" data-content-id="content.rootzone.pot"><span>02 · Contenant</span>{pot.short_answer}</p>
          <p className="is-repot" data-content-id="content.rootzone.repotting"><span>03 · Rempotage</span>{repotting.short_answer}</p>
          <p className="is-feed" data-content-id="content.care.fertilisation"><span>04 · Nourrir</span>{fertilisation.short_answer}<small>Guidance minimale et qualitative uniquement.</small></p>
        </div>
        <p className="artlab-diagram-note">Schéma éditorial · aucune recette universelle en pourcentages.</p>
      </div>
    </section>

    <section className="artlab-review-end"><span>Prototype LAB · 4 scènes</span><h2>Le mouvement doit aider à <em>voir</em>, puis à comprendre.</h2><p>Owner art direction review required. Aucun passage BÊTA.</p></section>
  </main>;
}
