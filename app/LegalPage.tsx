import ScrollReveal from "./ScrollReveal";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export type LegalSection = { id: string; title: string; content: React.ReactNode };

export default function LegalPage({ eyebrow, title, intro, updated, warning, sections }: { eyebrow: string; title: string; intro: string; updated: string; warning?: React.ReactNode; sections: LegalSection[] }) {
  return <main className="editorial-page legal-page">
    <ScrollReveal />
    <section className="legal-hero">
      <div className="legal-hero-texture" aria-hidden="true" />
      <SiteHeader />
      <div className="shell legal-hero-copy">
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <small>Dernière mise à jour : {updated}</small>
      </div>
    </section>
    <div className="shell legal-layout">
      <aside className="legal-summary">
        <span>Sommaire</span>
        <nav aria-label={`Sommaire — ${title}`}>{sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a>)}</nav>
      </aside>
      <article className="legal-document">
        {warning && <div className="legal-warning">{warning}</div>}
        {sections.map((section, index) => <section id={section.id} key={section.id} data-reveal><span>Article {index + 1}</span><h2>{section.title}</h2><div>{section.content}</div></section>)}
      </article>
    </div>
    <SiteFooter />
  </main>;
}

export const CompanyIdentity = () => <>
  <p><strong>Pruvost Romain, Entrepreneur individuel</strong>, exerçant sous le nom commercial <strong>Tibaldo Jungle</strong> et présenté sous la signature <strong>Studio Végétal — Tibaldo Jungle</strong>.</p>
  <ul><li>Adresse actuellement inscrite au RNE : 16 rue Voltaire, 59139 Wattignies</li><li>Boutique : 3 place de l’Arbonnoise, 59000 Lille</li><li>SIRET Tibaldo Jungle : 518 102 603 00074</li><li>SIREN / RNE : 518 102 603</li><li>TVA intracommunautaire : FR94 518 102 603</li><li>Téléphone : 07 43 72 70 79</li><li>E-mail : <a href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a></li></ul>
  <p>Ci-après désigné « Tibaldo Jungle » ou « le Vendeur ».</p>
</>;
