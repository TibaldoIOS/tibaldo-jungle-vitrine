import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Crédits photographiques | Tibaldo Jungle",
  description: "Crédits et licences des photographies botaniques utilisées dans l’encyclopédie Tibaldo Jungle.",
  alternates: { canonical: "/credits-images" },
  robots: { index: false, follow: false },
};

const credits: readonly [string, string, string, string, string?][] = [
  ["Herbier du genre Alocasia · Alocasia reginula", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_reginula_(Philippines)_02.jpg"],
  ["Herbier du genre Alocasia · Alocasia portei", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_portei_(Philippines)_young_plant_01.jpg"],
  ["Herbier du genre Alocasia · Alocasia nycteris", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_nycteris_(Philippines)_Batwing_alocasia_0004.jpg"],
  ["Herbier du genre Alocasia · Alocasia sinuata", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_sinuata_(Philippines)_0003.jpg"],
  ["Herbier du genre Alocasia · Alocasia zebrina", "Obsidian Soul", "CC0", "https://commons.wikimedia.org/wiki/File:Alocasia_zebrina_(Philippines)_0006.jpg"],
  ["Alocasia cuprea", "Frank Schulenburg", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Alocasia_cuprea_(portrait_orientation).jpg"],
  ["Alocasia tandurusa ‘Jacklyn’ · vues 1 et 2", "Cephas", "CC BY-SA 4.0 · conversions WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Alocasia_Tandurusa_%27Jacklyn%27_JRVdH_02.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Alocasia × mortfontanensis ‘Polly’", "Tim Kortekamp", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Alocasia_x_amazonica_%27Polly%27.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Anthurium crystallinum", "David J. Stang", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Anthurium_crystallinum_6zz.jpg"],
  ["Anthurium veitchii", "Supertita", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Anthurium_veitchii-King_Anthurium.jpg"],
  ["Anthurium wendlingeri · port", "Steve Fitzgerald", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Anthurium-wendlingeri-SF24277-01.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Anthurium wendlingeri · inflorescence", "Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Anthurium_wendlingeri_kz01.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Monstera deliciosa", "Aarón González", "Licence Unsplash", "https://unsplash.com/photos/green-leaves-on-white-background-TV5xD50MZJo"],
  ["Monstera deliciosa · vue documentaire complémentaire", "Jonathan Borba / Pexels", "Licence Pexels · conversion WebP sans recadrage", "https://www.pexels.com/fr-fr/photo/feuilles-de-monstera-d-un-vert-luxuriant-a-la-texture-naturelle-37181425/", "https://www.pexels.com/fr-fr/license/"],
  ["Monstera deliciosa ‘Albo-Variegata’", "Mokkie", "CC BY-SA 3.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Fruit_Salad_Plant_(Monstera_deliciosa_%27Albo-Variegata%27)_1.jpg", "https://creativecommons.org/licenses/by-sa/3.0/"],
  ["Monstera sp. ‘Esqueleto’ · morphologie horticole mature", "Janadume", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Monstera_%27Esqueleto%27.png", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Philodendron hederaceum · port", "Moheen Reeyad", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Philodendron_hederaceum,_Singapore_Botanic_Gardens_(141542).jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Philodendron hederaceum · feuillage", "Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Philodendron_hederaceum_kz01.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Philodendron ‘Pink Princess’", "Srikandi73", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Philodendron_Pink_Princess.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Ficus elastica · port", "Karlfonza", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Ficus_elastica_(rubber_plant).jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Ficus elastica · nervation", "Julian Herzog", "CC BY 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Backlit_ficus_elastica_leaf_texture_2014_02.jpg", "https://creativecommons.org/licenses/by/4.0/"],
  ["Hoya carnosa · port", "Daderot", "CC0 1.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Hoya_carnosa_-_Begonia_House_-_Wellington_Botanic_Garden_-_Wellington,_NZ_-_DSC09338.jpg", "https://creativecommons.org/publicdomain/zero/1.0/"],
  ["Hoya carnosa · fleurs", "Franz van Duns", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Hoya_carnosa_-_umbel_with_nectar_droplets.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Syngonium podophyllum · feuillage", "David J. Stang", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Syngonium_podophyllum_10zz.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Syngonium podophyllum · port", "Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Syngonium_podophyllum_kz02.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Dracaena trifasciata · port", "Fanti Salms", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:Dracaena_Trifasciata_Plant.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Dracaena trifasciata · jardin botanique", "Rudolphous", "CC BY-SA 4.0 · conversion WebP sans recadrage", "https://commons.wikimedia.org/wiki/File:20210623_Hortus_botanicus_Leiden_-_Sansevieria_trifasciata_v2.jpg", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ["Philodendron hastatum", "Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Philodendron_hastatum_kz2.jpg"],
  ["Epipremnum aureum", "Filo gèn’", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Golden_pothos).jpg"],
  ["Colocasia esculenta", "Forest & Kim Starr", "CC BY 3.0 US", "https://commons.wikimedia.org/wiki/File:Starr-090519-8057-Colocasia_esculenta-leaves-Native_Nursery_Kula-Maui_(24325097844).jpg", "https://creativecommons.org/licenses/by/3.0/us/"],
  ["Pilea peperomioides", "Husky", "CC0", "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg"],
  ["Peperomia argyreia", "Mokkie", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Watermelon_Peperomia_(Peperomia_argyreia).jpg"],
  ["Collection de cactus en serre", "Anita Austvika", "Licence Unsplash", "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE"],
  ["Station Cormontaigne · accès et place (vue 1)", "Floflo62", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lille_-_M%C3%A9tro_Cormontaigne_-_1.JPG"],
  ["Station Cormontaigne · accès et place (vue 2)", "Floflo62", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lille_-_M%C3%A9tro_Cormontaigne_-_2.JPG"],
  ["Bus Ilévia · Iveco Urbanway", "Kevin.B", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Il%C3%A9via_Iveco_Bus_Urbanway_12_Gaz_naturel_(1).jpg"],
  ["Station V’Lille", "Chabe01", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Station_V%27Lille_face_Piscine_Roubaix_2.jpg"],
];

export default function ImageCreditsPage() {
  return <main className="editorial-page"><section className="inner-hero compact-inner-hero"><div className="inner-hero-image services-hero-image" /><div className="inner-hero-shade" /><SiteHeader /><div className="shell inner-hero-content"><p className="eyebrow"><span /> Tibaldo Jungle</p><h1>Crédits<br /><em>photographiques.</em></h1><p>Sources et licences des visuels botaniques de l’encyclopédie.</p></div></section><section className="shell legal-credits"><h2>Photographies végétales</h2>{credits.map(([plant, author, license, url, licenseUrl]) => <p key={plant}><strong>{plant}</strong> — {author} · {license} · <a href={url} target="_blank" rel="noreferrer">Voir la source</a>{licenseUrl ? <> · <a href={licenseUrl} target="_blank" rel="noreferrer">Lire la licence</a></> : null}</p>)}</section><SiteFooter /></main>;
}
