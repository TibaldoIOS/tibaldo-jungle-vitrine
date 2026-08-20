import type { PlantEntry } from "@/lib/plants/types";
import { isEditorialPlaceholder } from "@/lib/plants/types";
import Link from "next/link";
import { SiteHeader } from "../SiteChrome";
import ScientificName from "./ScientificName";
import { localizedPath, type TranslatedLocale } from "@/lib/i18n/config";

type LocalizedHeroCopy = {
  encyclopedia: string;
  plants: string;
  photoPending: string;
};

export default function PlantSpeciesHero({ plant, locale, currentPath, copy }: { plant: PlantEntry; locale?: TranslatedLocale; currentPath?: string; copy?: LocalizedHeroCopy }) {
  const image = plant.gallery[0];
  const hasPhoto = !isEditorialPlaceholder(image?.src);
  const pathFor = (path: string) => locale ? localizedPath(path, locale) : path;
  const plantsLabel = copy?.plants ?? "Plantes";
  const encyclopediaLabel = copy?.encyclopedia ?? "Encyclopédie végétale";
  const photoPending = copy?.photoPending ?? `Photographie de ${plant.botanicalName} à ajouter`;
  return <section className={`plant-profile-hero ${hasPhoto ? "has-photo" : "has-editorial-fallback"}`}>
    {hasPhoto
      ? <img className="plant-profile-hero-image" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="eager" fetchPriority="high" decoding="async" />
      : <div className="plant-profile-hero-fallback" role="img" aria-label={photoPending}><span aria-hidden="true">{plant.taxonomy.genus.slice(0, 1)}<i>{plant.taxonomy.species.slice(0, 1)}</i></span><small>{photoPending}</small></div>}
    <div className="plant-profile-hero-shade" aria-hidden="true" />
    <SiteHeader locale={locale} currentPath={currentPath} />
    <div className="shell plant-profile-hero-content">
      <nav className="plant-profile-breadcrumb" aria-label={locale === "en" ? "Breadcrumb" : locale === "es" ? "Migas de pan" : "Fil d’Ariane"}><Link href={pathFor("/plantes")}>{plantsLabel}</Link><span>·</span><Link href={pathFor(`/plantes/${plant.genre}`)}>{plant.genreLabel}</Link><span>·</span><strong>{plant.displayName}</strong></nav>
      <p className="eyebrow"><span /> {encyclopediaLabel} · {plant.genreLabel}</p>
      <h1><ScientificName name={plant.botanicalName} className="scientific-name-hero" /></h1>
      <p>{plant.subtitle}</p>
      <div className="plant-profile-hero-meta"><Link href={pathFor(`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`)}>{plant.taxonomy.family}</Link><Link href={pathFor(`/plantes/${plant.genre}`)}>{plant.taxonomy.genus}</Link><span>{plant.specimen.observedHeight}</span></div>
    </div>
  </section>;
}
