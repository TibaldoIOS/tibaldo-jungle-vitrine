import type { PlantEntry } from "./types.ts";
import {
  isEditorialPlaceholder,
  isInternalPhotoProductionCopy,
  isPhotoProductionPlaceholder,
} from "./types.ts";

export type PlantImage = PlantEntry["gallery"][number];

const pileaVerifiedOverride: PlantImage = {
  src: "/pilea-peperomioides-plante.jpg",
  alt: "Pilea peperomioides aux feuilles rondes portées par de longs pétioles",
  caption: "Photographie réelle de Pilea peperomioides · Husky · CC0 1.0.",
  width: 1280,
  height: 1707,
  license: {
    status: "verified",
    creator: "Husky",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pilea_peperomioides_Chinese_money_plant.jpg",
    registryPath: "/credits-images",
    note: "Photographie réelle et identité botanique contrôlées dans le registre média Jungle.",
  },
};

const documentaryOverrides: Readonly<Record<string, readonly PlantImage[]>> = {
  "pilea/peperomioides": [pileaVerifiedOverride],
};

export const isDocumentaryPlantImage = (image?: PlantImage): image is PlantImage =>
  Boolean(
    image &&
    !isPhotoProductionPlaceholder(image.src) &&
    !isEditorialPlaceholder(image.src) &&
    image.license?.status !== "media-gap" &&
    !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`) &&
    !/interprétation éditoriale|illustration générée|image générée/i.test(`${image.alt} ${image.caption}`),
  );

export const documentaryGallery = (plant: PlantEntry): PlantImage[] => {
  const source = documentaryOverrides[`${plant.genre}/${plant.slug}`] ?? plant.gallery;
  return source.filter(
    (image, index, images) =>
      isDocumentaryPlantImage(image) &&
      images.findIndex((candidate) => candidate.src === image.src) === index,
  );
};
