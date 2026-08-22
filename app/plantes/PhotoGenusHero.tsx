import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "../SiteChrome";
import { photoGenusHeroRegistry, type PhotoGenusHeroKey } from "@/lib/plants/photo-genus-heroes";

type Props = {
  genre: PhotoGenusHeroKey;
  label: string;
  title: string;
  subtitle: string;
  titleLead?: string;
};

type PhotoHeroStyle = CSSProperties & {
  "--photo-genus-desktop-position": string;
  "--photo-genus-mobile-position": string;
};

export default function PhotoGenusHero({ genre, label, title, subtitle, titleLead = "Les" }: Props) {
  const photo = photoGenusHeroRegistry[genre];
  const style: PhotoHeroStyle = {
    "--photo-genus-desktop-position": photo.desktopPosition,
    "--photo-genus-mobile-position": photo.mobilePosition,
  };

  return <section className="inner-hero compact-inner-hero family-genre-hero photo-genus-hero" data-genus={genre} style={style}>
    <img className="photo-genus-hero-image" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="100vw" loading="eager" fetchPriority="high" decoding="async" />
    <div className="photo-genus-hero-shade" aria-hidden="true" />
    <SiteHeader />
    <div className="shell inner-hero-content">
      <Link className="family-genre-breadcrumb" href="/plantes">Encyclopédie <span>·</span> Tous les univers</Link>
      <p className="eyebrow"><span /> {label}</p>
      <h1><span className="hero-line"><span>{titleLead}</span></span><span className="hero-line"><span><em>{title}.</em></span></span></h1>
      <p>{subtitle}</p>
    </div>
  </section>;
}
