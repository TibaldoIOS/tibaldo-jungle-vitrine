import type { PlantEntry } from "@/lib/plants/types";
import { isEditorialPlaceholder } from "@/lib/plants/types";
import Link from "next/link";
import { SiteHeader } from "../SiteChrome";
import ScientificName from "./ScientificName";

export default function PlantSpeciesHero({ plant }: { plant: PlantEntry }) {
  const image = plant.gallery[0];
  const hasPhoto = !isEditorialPlaceholder(image?.src);
  return <section className={`plant-profile-hero ${hasPhoto ? "has-photo" : "has-editorial-fallback"}`}>
    {hasPhoto
      ? <img className="plant-profile-hero-image" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="eager" fetchPriority="high" decoding="async" />
      : <div className="plant-profile-hero-fallback" role="img" aria-label={`Photographie de ${plant.botanicalName} à ajouter`}><span aria-hidden="true">{plant.taxonomy.genus.slice(0, 1)}<i>{plant.taxonomy.species.slice(0, 1)}</i></span><small>Photographie Tibaldo à venir</small></div>}
    <div className="plant-profile-hero-shade" aria-hidden="true" />
    <SiteHeader />
    <div className="shell plant-profile-hero-content">
      <nav className="plant-profile-breadcrumb" aria-label="Fil d’Ariane"><Link href="/plantes">Plantes</Link><span>·</span><Link href={`/plantes/${plant.genre}`}>{plant.genreLabel}</Link><span>·</span><strong>{plant.displayName}</strong></nav>
      <p className="eyebrow"><span /> Encyclopédie végétale · {plant.genreLabel}</p>
      <h1><ScientificName name={plant.botanicalName} className="scientific-name-hero" /></h1>
      <p>{plant.subtitle}</p>
      <div className="plant-profile-hero-meta"><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link><Link href={`/plantes/${plant.genre}`}>{plant.taxonomy.genus}</Link><span>{plant.specimen.observedHeight}</span></div>
    </div>
  </section>;
}
