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

export const cycasRevolutaVerifiedApiMedia: PlantImage = {
  src: "/documentary-media-wave-6-v1/cycas-revoluta-documentaire.webp",
  alt: "Cycas revoluta adulte montrant sa couronne dense de frondes pennées et son caudex",
  caption: "Cycas revoluta · photographie documentaire d’Ayyuha Sideeq · CC0 1.0.",
  width: 1600,
  height: 2134,
  license: {
    status: "verified",
    creator: "Ayyuha Sideeq",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cycas_revoluta_plant.jpg",
    registryPath: "/credits-images",
    note: "Wave 6 V1 · identité Cycas revoluta, source, auteur et licence contrôlés le 1er septembre 2026 ; conversion WebP et réduction sans modification morphologique.",
  },
};

const philodendronBrasilVerifiedOverride: PlantImage = {
  src: "/documentary-media-wave-6-v1/philodendron-hederaceum-brasil.webp",
  alt: "Philodendron hederaceum ‘Brasil’ aux feuilles cordiformes marquées d’une bande jaune citron",
  caption: "Philodendron hederaceum ‘Brasil’ au New York Botanical Garden · photographie de David J. Stang · CC BY-SA 4.0.",
  width: 1000,
  height: 665,
  license: {
    status: "verified",
    creator: "David J. Stang",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_hederaceum_hederaceum_Brasil_0zz.jpg",
    registryPath: "/credits-images",
    note: "Wave 6 V1 · cultivar Brasil explicitement nommé par la source du New York Botanical Garden ; conversion WebP sans recadrage ni modification morphologique.",
  },
};

const documentaryOverrides: Readonly<Record<string, readonly PlantImage[]>> = {
  "pilea/peperomioides": [pileaVerifiedOverride],
  "philodendron/brasil": [philodendronBrasilVerifiedOverride],
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
