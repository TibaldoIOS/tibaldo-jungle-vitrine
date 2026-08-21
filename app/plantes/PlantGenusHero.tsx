import { SiteHeader } from "../SiteChrome";
import Link from "next/link";
import { GenusPrototypeIllustration, hasGenusPrototypeIllustration } from "./GenusPrototypeIllustrations";

type LineArtKind =
  | "aroid" | "monstera" | "sagittate" | "rosette" | "palmate"
  | "banana" | "fern" | "pinnate" | "round" | "linear"
  | "succulent" | "cactus" | "vine" | "frangipani" | "horsetail";

const lineArtKinds: Record<string, LineArtKind> = {
  agave: "rosette", fatsia: "palmate", strelitzia: "banana", aloe: "succulent",
  chlorophytum: "linear", yucca: "rosette", cycas: "pinnate", dicksonia: "fern",
  plumeria: "frangipani", equisetum: "horsetail", ficus: "round", syngonium: "sagittate",
  hoya: "vine", sansevieria: "linear", fougeres: "fern", bananiers: "banana",
  musa: "banana", ensete: "banana", alocasia: "sagittate", anthurium: "aroid",
  monstera: "monstera", philodendron: "aroid", epipremnum: "aroid", asparagus: "fern",
  colocasia: "sagittate", pilea: "round", peperomia: "round", maranta: "palmate",
  calathea: "palmate", cactus: "cactus", epiphyllum: "succulent",
};

const leafPaths: Record<LineArtKind, string[]> = {
  aroid: ["M75 250C28 172 38 76 122 40c84 36 94 132 47 210-20 33-47 59-47 59S95 283 75 250Z", "M122 43v266", "M121 111 70 79m52 72 69-49m-69 96-74-40m74 0 75-44m-75 85-61 31m61 5 59-29"],
  monstera: ["M73 258C13 162 44 62 128 34c78 37 97 131 45 218-20 34-48 61-48 61S94 286 73 258Z", "M126 39v274", "M124 101 75 73m51 66 67-42m-67 91-77-35m77-8 76-40m-77 91-63 31m63 1 58-30", "M86 116c-26 3-37 16-42 38m118-35c25 2 36 14 41 34M76 193c-22 8-30 20-31 37m126-35c21 7 28 18 29 35"],
  sagittate: ["M122 34c32 49 88 83 92 153l-68-33-23 159-25-159-69 34c7-70 62-105 93-154Z", "M122 40v273", "M120 111 66 150m56-39 56 38m-57 36-61 3m62-3 60 2m-61 55-45 25m47-25 44 24"],
  rosette: ["M124 301 104 47l26-24 19 279", "M122 301 45 79l31-14 72 238", "M122 301 17 139l35-6 97 170", "M124 301 205 78l-31-12-26 237", "M124 301 229 139l-35-6-46 170", "M122 301 82 35l28 8 39 260"],
  palmate: ["M123 309V112", "M123 119 58 42c-22 37-3 83 65 77Z", "M124 119 111 20c45 5 68 43 13 99Z", "M125 119 196 47c17 43-7 80-71 72Z", "M123 130 35 139c9 44 47 59 88-9Z", "M125 130 216 143c-13 43-54 55-91-13Z"],
  banana: ["M119 310C83 223 59 128 73 37c53 28 73 105 46 273Z", "M125 310c16-119 52-205 101-248 19 91-20 183-101 248Z", "M122 310C73 250 34 194 18 126c64 18 100 77 104 184Z", "M126 310c38-73 78-123 119-145-4 69-45 119-119 145Z", "M75 39c25 91 37 181 44 271M225 63c-46 74-78 156-100 247"],
  fern: ["M123 314C128 208 143 110 177 28", "M141 174c-43-54-72-60-99-51 22 41 53 59 99 51Zm7-44c-28-47-52-58-79-55 14 36 40 53 79 55Zm-1 91c-45-35-77-35-101-19 30 29 63 35 101 19Zm4 44c-38-20-67-15-85 4 30 18 58 18 85-4Z", "M143 174c55-37 88-34 111-14-34 31-69 36-111 14Zm7-47c43-30 71-27 92-10-27 25-57 30-92 10Zm-3 93c49-18 80-9 96 14-38 19-70 16-96-14Zm-2 45c40-5 65 8 75 31-32 9-58-1-75-31Z"],
  pinnate: ["M123 314C124 203 129 106 151 29", "M132 232 57 181m77 13-84-83m88 45-62-98m68 62-31-98m25 211 80-48m-77 11 88-77m-84 38 69-94m-62 57 43-91", "M124 314C88 238 48 190 17 168m110 146c42-69 83-111 119-127"],
  round: ["M122 311V154", "M122 166C71 146 43 101 61 60c52 1 82 43 61 106Z", "M124 166c48-25 74-70 51-108-51 6-75 50-51 108Z", "M121 228c-39-22-66-18-84 6 32 29 61 27 84-6Zm4 1c42-25 72-20 89 5-34 30-65 27-89-5Z", "M61 61l61 105m53-108-51 108"],
  linear: ["M124 311 72 31c38 17 58 102 52 280Z", "M126 311 133 23c29 38 25 131-7 288Z", "M123 311 197 54c17 49-5 135-74 257Z", "M123 311 37 94c38 31 71 103 86 217Z", "M124 311 225 114c4 55-31 124-101 197Z"],
  succulent: ["M122 310 75 64c48 25 68 104 47 246Z", "M125 310 171 58c35 42 24 127-46 252Z", "M122 310 32 137c47 15 80 71 90 173Z", "M125 310 219 138c-1 55-37 111-94 172Z"],
  cactus: ["M123 310V64c0-33 49-33 49 0v82c0 26 37 26 37 0v-34", "M123 178c0 30-39 30-39 0v-51c0-29-43-29-43 0v78", "M148 35v272M56 99v110m137-124v70"],
  vine: ["M44 307c112-54 158-146 167-278", "M82 272c-37-6-55-30-52-61 39-1 62 20 52 61Zm48-53c-35-8-50-34-43-63 38 2 57 25 43 63Zm42-62c-31-13-40-39-29-65 34 8 48 34 29 65Zm20-67c-26-16-31-40-17-62 30 12 38 37 17 62Z", "M87 271c36 1 58-18 61-46-35-6-60 9-61 46Zm49-58c33 2 54-16 57-43-32-6-55 8-57 43Z"],
  frangipani: ["M123 311V154c0-59 22-99 57-126m-57 135c-9-51-39-84-80-102m81 158c26-42 61-59 101-52", "M180 29c-30-13-44 23-20 39-23 17-5 51 24 34 12 28 48 17 42-14 31-4 31-42 1-48-5-30-42-35-47-11Z", "M43 61c-27-3-36 29-14 40-17 18 6 43 28 24 15 21 43 5 32-20 24-8 17-39-8-38-10-24-40-29-38-6Z"],
  horsetail: ["M67 311V59m55 252V22m57 289V83M46 101h42m-42 54h42m-42 54h42m13-136h43m-43 56h43m-43 56h43m35-58h42m-42 58h42m-42 58h42", "M67 59 43 35m24 24 23-27m32-10-22-20m22 20 22-20m35 81-20-19m20 19 21-18"],
};

function GenusLineArt({ genre }: { genre: string }) {
  if (hasGenusPrototypeIllustration(genre)) return <GenusPrototypeIllustration genre={genre} />;
  const kind = lineArtKinds[genre] ?? "aroid";
  return <svg className="plant-genus-line-art" viewBox="0 0 270 340" aria-hidden="true" focusable="false">
    <g>{leafPaths[kind].map((path, index) => <path d={path} key={`${kind}-${index}`} />)}</g>
    <g className="plant-genus-line-art-echo" transform="translate(58 22) scale(.72)">{leafPaths[kind].slice(0, Math.min(3, leafPaths[kind].length)).map((path, index) => <path d={path} key={`${kind}-echo-${index}`} />)}</g>
  </svg>;
}

type Props = {
  genre: string;
  label: string;
  title: string;
  subtitle: string;
  isFamily?: boolean;
  titleLead?: string;
};

export default function PlantGenusHero({ genre, label, title, subtitle, isFamily = false, titleLead = "Les" }: Props) {
  return <section className="inner-hero compact-inner-hero family-genre-hero plant-genus-hero" data-genus={genre}>
    <div className="plant-genus-art-field"><GenusLineArt genre={genre} /></div>
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

export const genusLineArtGenres = Object.keys(lineArtKinds);
