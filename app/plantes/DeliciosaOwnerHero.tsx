import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteChrome";
import ScientificName from "./ScientificName";

/**
 * Owner KEEP: preserve the approved Monstera deliciosa hero structure and copy
 * while serving the current canonical Owner photograph.
 */
export default function DeliciosaOwnerHero() {
  return (
    <section className="species-next-hero">
      <Image
        unoptimized
        className="species-next-hero-image"
        src="/media/owner-media/monstera-deliciosa/monstera-deliciosa-jeune-feuille-fenestree.webp"
        alt="Jeune feuille vert clair de Monstera deliciosa, rétroéclairée et déjà découpée de nombreuses fenestrations."
        width="1330"
        height="2364"
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
