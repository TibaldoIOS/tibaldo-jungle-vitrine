import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "../SiteChrome";
import { botanicalHeroRegistry, type BotanicalHeroKey } from "@/lib/plants/botanical-heroes";
import { StrelitziaBotanicalIllustration } from "./BotanicalHeroIllustrations";

type Props = {
  genre: BotanicalHeroKey;
  label: string;
  title: string;
  subtitle: string;
  isFamily?: boolean;
  titleLead?: string;
};

type BotanicalHeroStyle = CSSProperties & Record<`--botanical-${string}`, string | number | undefined>;

export default function BotanicalGenusHero({ genre, label, title, subtitle, isFamily = false, titleLead = "Les" }: Props) {
  const config = botanicalHeroRegistry[genre];
  const style: BotanicalHeroStyle = {
    "--botanical-desktop-scale": config.desktop.scale,
    "--botanical-desktop-x": config.desktop.x,
    "--botanical-desktop-y": config.desktop.y,
    "--botanical-desktop-opacity": config.desktop.opacity,
    "--botanical-mobile-scale": config.mobile.scale,
    "--botanical-mobile-x": config.mobile.x,
    "--botanical-mobile-y": config.mobile.y,
    "--botanical-mobile-opacity": config.mobile.opacity,
    "--botanical-mask": "asset" in config ? `url("${config.asset}")` : undefined,
  };

  return <section className="inner-hero compact-inner-hero family-genre-hero botanical-genus-hero" data-genus={genre} style={style}>
    <div className="botanical-genus-art-field" aria-hidden="true">
      {config.render === "strelitzia-svg"
        ? <StrelitziaBotanicalIllustration />
        : <span className="botanical-genus-mask" />}
    </div>
    <div className="inner-hero-shade" />
    <SiteHeader />
    <div className="shell inner-hero-content">
      <Link className="family-genre-breadcrumb" href="/plantes">Encyclopédie <span>·</span> Tous les univers</Link>
      <p className="eyebrow"><span /> {isFamily ? "Famille botanique" : label}</p>
      <h1><span className="hero-line"><span>{titleLead}</span></span><span className="hero-line"><span><em>{title}.</em></span></span></h1>
      <p>{subtitle}</p>
    </div>
  </section>;
}
