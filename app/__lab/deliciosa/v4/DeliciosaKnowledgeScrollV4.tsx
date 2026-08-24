/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteHeader } from "@/app/SiteChrome";
import ScientificName from "@/app/plantes/ScientificName";
import KnowledgeScrollController from "./KnowledgeScrollController";
import { DiagnosticInvestigations, KnowledgeFaq } from "./KnowledgeAccordions";
import { knowledge, v4Scenes, v4Sources } from "./knowledge-scenes";

const K = (id: string) => knowledge(id)[0];
const SourceMark = ({ unit, label }: { unit: ReturnType<typeof K>; label: string }) => <p className="v4-source-mark"><span>{unit.source_proximity === "DIRECT" ? "Source directe" : "Données croisées"}</span>{label}</p>;
const Act = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => <header className="v4-act-heading"><span>Acte {number}</span><h2>{title}</h2>{children}</header>;

export default function DeliciosaKnowledgeScrollV4() {
  const origin = K("content.origin.range"), habitat = K("content.origin.habitat"), morphology = K("content.morphology.heteroblasty"), fenestrations = K("content.morphology.fenestrations");
  const light = K("content.care.light"), humidity = K("content.care.humidity"), temperature = K("content.care.temperature"), water = K("content.care.watering");
  const substrate = K("content.rootzone.substrate"), pot = K("content.rootzone.pot"), repot = K("content.rootzone.repotting"), fertilizer = K("content.care.fertilisation");
  const support = K("content.support.role"), roots = K("content.aerial-roots.role"), dimensions = K("content.dimensions.context"), cleaning = K("content.pruning.cleaning"), pests = K("content.pests.documented"), studio = K("content.studio.observation");
  const groupedSources = [
    ["Taxonomie & aire native", ["source.kew.powo.monstera-deliciosa"]],
    ["Horticulture", ["source.rhs.monstera-growing-guide", "source.ncsu.monstera-deliciosa", "source.uconn.monstera-deliciosa"]],
    ["Morphologie & écologie", ["source.croat.1988.araceae-ecology", "source.frontiers.2022.aerial-roots"]],
    ["Publication scientifique", ["source.muir.2013.fenestration"]],
  ] as const;
  return <main className="editorial-page plant-profile-page species-next-page deliciosa-knowledge-v4">
    <KnowledgeScrollController />

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

    <nav className="v4-rail" aria-label="Actes de l’expérience Knowledge Scroll">{v4Scenes.map((scene) => <a key={scene.id} href={`#v4-${scene.id}`}><span>{scene.act}</span>{scene.id}</a>)}</nav>

    <section id="v4-identity" className="v4-scene v4-identity" data-knowledge-scene style={{ "--v4-viewports": 2.2 } as React.CSSProperties}>
      <div className="v4-sticky-stage"><Act number="I" title="Une liane, avant d’être une plante en pot."><p>{habitat.short_answer}</p></Act><div className="v4-map" aria-hidden="true"><i /><b>Mexique</b><b>Guatemala</b></div><div className="v4-identity-notes"><p><span>Aire native</span>{origin.short_answer}</p><p><span>Port</span>{habitat.long_answer}</p><SourceMark unit={origin} label="Kew · POWO" /></div><div className="v4-vine-axis" aria-hidden="true" /></div>
    </section>

    <section id="v4-leaf" className="v4-scene v4-leaf" data-knowledge-scene style={{ "--v4-viewports": 3 } as React.CSSProperties}>
      <div className="v4-sticky-stage"><Act number="II" title="Une feuille qui change."><p>{morphology.short_answer}</p></Act><div className="v4-leaf-diagram" aria-hidden="true"><i className="v4-leaf-shape" /><i className="v4-leaf-vein" /><span>Schéma éditorial</span></div><ol className="v4-leaf-states"><li><span>01</span><b>Juvénile</b><p>Feuille plus entière.</p></li><li><span>02</span><b>Développement</b><p>La silhouette évolue.</p></li><li><span>03</span><b>Adulte</b><p>Découpes et perforations internes peuvent apparaître.</p></li></ol><SourceMark unit={morphology} label="Croat · Muir · institutions horticoles" /></div>
    </section>

    <section id="v4-fenestrations" className="v4-calm v4-fenestrations"><Act number="III" title="Pourquoi ces trous ?"><p>La réponse n’est pas aussi simple.</p></Act><div className="v4-epistemic"><article><span>Observé</span><h3>La morphologie change avec la maturité.</h3></article><article><span>Associé</span><h3>Lumière et support accompagnent, sans garantir.</h3></article><article className="is-hypothesis"><span>Hypothèse scientifique</span><h3>{fenestrations.long_answer}</h3><SourceMark unit={fenestrations} label="Muir 2013" /></article></div></section>

    <section id="v4-environment" className="v4-calm v4-environment"><Act number="IV" title="Composer son environnement."><p>Des repères qualitatifs, pas de faux tableau de bord.</p></Act><div className="v4-atmosphere"><div><span>Lumière</span><strong>Lumineuse à modérée.</strong><p>{light.long_answer}</p><SourceMark unit={light} label="RHS · NC State · UConn" /></div><div><span>Humidité</span><strong>Modérément à assez humide.</strong><p>{humidity.long_answer}</p></div><div><span>Température</span><strong>Chaleur stable.</strong><p>{temperature.long_answer}</p></div></div></section>

    <section id="v4-water" className="v4-scene v4-water" data-knowledge-scene style={{ "--v4-viewports": 2.4 } as React.CSSProperties}><div className="v4-sticky-stage"><Act number="V" title="Avant d’arroser, regardez."><p>{water.short_answer}</p></Act><div className="v4-waterline" aria-hidden="true"><i /></div><ol className="v4-process"><li><span>01</span><b>Observer</b><p>La partie supérieure a-t-elle nettement séché ?</p></li><li><span>02</span><b>Arroser</b><p>Humidifier complètement.</p></li><li><span>03</span><b>Égoutter</b><p>Laisser l’excédent s’écouler.</p></li></ol><SourceMark unit={water} label="Données croisées · RHS + NC State + UConn" /></div></section>

    <section id="v4-rootzone" className="v4-scene v4-rootzone" data-knowledge-scene style={{ "--v4-viewports": 2.6 } as React.CSSProperties}><div className="v4-sticky-stage"><Act number="VI" title="Sous la surface."><p>La santé commence dans un volume que l’on voit peu.</p></Act><div className="v4-soil-cut" aria-hidden="true"><i /><i /><i /><span>Schéma éditorial · milieu racinaire</span></div><div className="v4-root-notes"><article><span>Milieu</span><h3>{substrate.short_answer}</h3><p>{substrate.long_answer}</p></article><article><span>Contenant</span><h3>{pot.short_answer}</h3><p>{pot.long_answer}</p></article><article><span>Rempotage</span><h3>{repot.short_answer}</h3><p>{repot.long_answer}</p></article><article><span>Nourrir</span><h3>{fertilizer.short_answer}</h3><p>Aucune fréquence ni dilution universelle.</p></article></div></div></section>

    <section id="v4-climb" className="v4-scene v4-climb" data-knowledge-scene style={{ "--v4-viewports": 2.2 } as React.CSSProperties}><div className="v4-sticky-stage"><Act number="VII" title="Elle grimpe."><p>Le mouvement est vertical parce que le port l’est.</p></Act><div className="v4-climb-axis" aria-hidden="true"><i /><i /><i /></div><div className="v4-climb-copy"><article><span>Support</span><h3>{support.short_answer}</h3><p>{support.long_answer}</p></article><article><span>Racines aériennes</span><h3>{roots.short_answer}</h3><p>{roots.long_answer}</p></article></div><p className="v4-no-guarantee">Association horticole ≠ causalité garantie.</p></div></section>

    <section id="v4-scale" className="v4-calm v4-scale"><Act number="VIII" title="Prendre de l’ampleur."><p>{dimensions.short_answer}</p></Act><div className="v4-scale-lines"><div><span>Intérieur domestique</span><strong>1,8–2,4 m</strong></div><div><span>Profil horticole</span><strong>4–8 m</strong></div><div><span>Extérieur favorable</span><strong>+ de 21 m</strong></div></div><p className="v4-context">Ces mesures proviennent de contextes différents et ne sont pas fusionnées.</p><aside><h3>Taille & inspection</h3><p>{cleaning.short_answer} {cleaning.long_answer}</p></aside></section>

    <section id="v4-diagnostic" className="v4-calm v4-diagnostic"><Act number="IX" title="Quand quelque chose change."><p>{pests.short_answer} Commencez par vérifier, jamais par conclure.</p></Act><DiagnosticInvestigations /><SourceMark unit={pests} label="RHS · UConn · UMN" /></section>

    <section id="v4-studio" className="v4-studio"><p>Jungle editorial guidance</p><h2>Observer la plante.<br /><em>Pas le calendrier.</em></h2><strong>{studio.short_answer}</strong><p>{studio.long_answer}</p></section>

    <section id="v4-faq" className="v4-calm v4-faq"><Act number="XI" title="La réponse d’abord."><p>La nuance ensuite. Safety n’est pas publiée dans ce prototype.</p></Act><KnowledgeFaq /></section>

    <section id="v4-sources" className="v4-sources"><Act number="XII" title="Ce que l’on sait. Et d’où cela vient."><p>Pas de badge global de vérité : chaque source a un rôle.</p></Act><div>{groupedSources.map(([group, ids]) => <section key={group}><h3>{group}</h3>{ids.map((id) => { const source = v4Sources.find((item) => item.source_id === id); return source ? <a href={source.url} target="_blank" rel="noreferrer" key={id}><span>{source.organisation}</span><strong>{source.title}</strong><i>↗</i></a> : null; })}</section>)}</div><p className="v4-end">Fin du prototype LAB · Owner interactive review required.</p></section>
  </main>;
}

