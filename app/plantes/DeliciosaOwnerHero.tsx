import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteChrome";
import ScientificName from "./ScientificName";

/**
 * Owner KEEP: this is the approved Monstera deliciosa hero extracted from the
 * archived V6 page. Its structure, copy and media remain intentionally stable
 * while the active body uses the shared species system.
 */
export default function DeliciosaOwnerHero() {
  return (
    <section className="species-next-hero">
      <Image
        unoptimized
        className="species-next-hero-image"
        src="/media/final-media-v35/monstera-deliciosa-jonathan-borba-pexels.webp"
        alt="Feuilles adultes découpées et fenêtrées de Monstera deliciosa"
        width="1600"
        height="2400"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="species-next-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell species-next-hero-content">
        <nav className="plant-profile-breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/plantes">Plantes</Link>
          <span>·</span>
          <Link href="/plantes/monstera">Monstera</Link>
          <span>·</span>
          <strong>Deliciosa</strong>
        </nav>
        <p className="eyebrow">
          <span /> 01 · Reconnaître · Encyclopédie végétale
        </p>
        <h1>
          <ScientificName
            name="Monstera deliciosa"
            className="scientific-name-hero"
          />
        </h1>
        <p>
          La grande liane tropicale dont les feuilles changent de silhouette en
          mûrissant.
        </p>
        <div className="species-next-hero-meta">
          <Link href="/plantes/famille/araceae">Araceae</Link>
          <span>·</span>
          <Link href="/plantes/monstera">Monstera</Link>
        </div>
      </div>
    </section>
  );
}
