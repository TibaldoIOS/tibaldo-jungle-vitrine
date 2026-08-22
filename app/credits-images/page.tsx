import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Crédits photographiques | Tibaldo Jungle",
  description: "Crédits et licences des photographies botaniques utilisées dans l’encyclopédie Tibaldo Jungle.",
  alternates: { canonical: "/credits-images" },
  robots: { index: false, follow: false },
};

const credits = [
  ["Herbier du genre Alocasia · Alocasia reginula", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_reginula_(Philippines)_02.jpg"],
  ["Herbier du genre Alocasia · Alocasia portei", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_portei_(Philippines)_young_plant_01.jpg"],
  ["Herbier du genre Alocasia · Alocasia nycteris", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_nycteris_(Philippines)_Batwing_alocasia_0004.jpg"],
  ["Herbier du genre Alocasia · Alocasia sinuata", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_sinuata_(Philippines)_0003.jpg"],
  ["Herbier du genre Alocasia · Alocasia zebrina", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_zebrina_(Philippines)_0006.jpg"],
  ["Alocasia cuprea", "Frank Schulenburg", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Alocasia_cuprea_(portrait_orientation).jpg"],
  ["Anthurium crystallinum", "David J. Stang", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Anthurium_crystallinum_6zz.jpg"],
  ["Anthurium veitchii", "Supertita", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Anthurium_veitchii-King_Anthurium.jpg"],
  ["Monstera deliciosa", "Aarón González", "Licence Unsplash", "https://unsplash.com/photos/green-leaves-on-white-background-TV5xD50MZJo"],
  ["Philodendron hastatum", "Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Philodendron_hastatum_kz2.jpg"],
  ["Epipremnum aureum", "Filo gèn’", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Golden_pothos).jpg"],
  ["Colocasia esculenta", "Forest & Kim Starr", "CC BY 3.0 US", "https://commons.wikimedia.org/wiki/File:Starr-090519-8057-Colocasia_esculenta-leaves-Native_Nursery_Kula-Maui_(24325097844).jpg"],
  ["Pilea peperomioides", "Husky", "CC0", "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg"],
  ["Peperomia argyreia", "Mokkie", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Watermelon_Peperomia_(Peperomia_argyreia).jpg"],
  ["Collection de cactus en serre", "Anita Austvika", "Licence Unsplash", "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE"],
  ["Station Cormontaigne · accès et place (vue 1)", "Floflo62", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lille_-_M%C3%A9tro_Cormontaigne_-_1.JPG"],
  ["Station Cormontaigne · accès et place (vue 2)", "Floflo62", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lille_-_M%C3%A9tro_Cormontaigne_-_2.JPG"],
  ["Bus Ilévia · Iveco Urbanway", "Kevin.B", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Il%C3%A9via_Iveco_Bus_Urbanway_12_Gaz_naturel_(1).jpg"],
  ["Station V’Lille", "Chabe01", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Station_V%27Lille_face_Piscine_Roubaix_2.jpg"],
] as const;

export default function ImageCreditsPage() {
  return <main className="editorial-page"><section className="inner-hero compact-inner-hero"><div className="inner-hero-image services-hero-image" /><div className="inner-hero-shade" /><SiteHeader /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Tibaldo Jungle</p><h1>Crédits<br /><em>photographiques.</em></h1><p>Sources et licences des visuels botaniques de l’encyclopédie.</p></div></section><section className="shell legal-credits"><h2>Photographies végétales</h2>{credits.map(([plant, author, license, url]) => <p key={plant}><strong>{plant}</strong> — {author} · {license} · <a href={url} target="_blank" rel="noreferrer">Voir la source</a></p>)}</section><SiteFooter /></main>;
}
