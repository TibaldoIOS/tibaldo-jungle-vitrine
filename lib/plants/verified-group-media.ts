import type { PlantEntry } from "./types.ts";

export type VerifiedGroupMedia = PlantEntry["gallery"][number] & {
  rights: "verified";
};

export const verifiedGroupMediaByGenre: Readonly<Record<string, VerifiedGroupMedia>> = {
  pilea: {
    src: "/pilea-peperomioides-plante.jpg",
    alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles",
    caption: "Pilea peperomioides · Husky · CC0 1.0.",
    width: 1280,
    height: 1707,
    rights: "verified",
    license: {
      status: "verified",
      creator: "Husky",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg",
      registryPath: "/credits-images",
      note: "Média déjà conservé localement et présent dans le registre de crédits Jungle ; réutilisation hub vérifiée le 31 août 2026.",
    },
  },
  peperomia: {
    src: "/peperomia-argyreia-feuillage.jpg",
    alt: "Feuillage argenté et rayé de Peperomia argyraea",
    caption: "Peperomia argyraea, publié sous son synonyme Peperomia argyreia · Mokkie · CC BY-SA 4.0.",
    width: 1280,
    height: 720,
    rights: "verified",
    license: {
      status: "verified",
      creator: "Mokkie",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Watermelon_Peperomia_(Peperomia_argyreia).jpg",
      registryPath: "/credits-images",
      note: "Média déjà conservé localement et présent dans le registre de crédits Jungle ; nom accepté Peperomia argyraea vérifié le 31 août 2026.",
    },
  },
  cactus: {
    src: "/cactus-collection-serre.jpg",
    alt: "Collection de Cactaceae globulaires et colonnaires en serre",
    caption: "Collection de cactus en serre · Anita Austvika · Licence Unsplash.",
    width: 1800,
    height: 2700,
    rights: "verified",
    license: {
      status: "verified",
      creator: "Anita Austvika",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      sourceUrl: "https://unsplash.com/photos/a-variety-of-cactus-plants-in-a-greenhouse-Ip9vn5h-aSE",
      registryPath: "/credits-images",
      note: "Média de collection Cactaceae déjà conservé localement et présent dans le registre de crédits Jungle ; usage limité au hub familial.",
    },
  },
  epipremnum: {
    src: "/epipremnum-aureum-pothos.jpg",
    alt: "Epipremnum aureum grimpant au feuillage panaché jaune et vert",
    caption: "Epipremnum aureum · Filo gèn’ · CC BY-SA 4.0.",
    width: 1280,
    height: 1707,
    rights: "verified",
    license: {
      status: "verified",
      creator: "Filo gèn’",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Golden_pothos).jpg",
      registryPath: "/credits-images",
      note: "Média déjà conservé localement et présent dans le registre de crédits Jungle ; réutilisation hub vérifiée le 31 août 2026.",
    },
  },
};
