export type HomeUniverseMedia = {
  slot: "HOME_UNIVERSE_PLANTS" | "HOME_UNIVERSE_SUBSTRATES" | "HOME_UNIVERSE_STUDIO";
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition: string;
  provenance: "OWNER_PROVIDED_MEDIA" | "CURRENT_JUNGLE_MEDIA";
  ownerMediaRequired: boolean;
};

export const homeUniverseMedia = {
  plants: {
    slot: "HOME_UNIVERSE_PLANTS",
    src: "/collection-plantes-rares-tibaldo-jungle-lille.jpg",
    alt: "Collection de plantes rares et tropicales chez Tibaldo Jungle à Lille",
    width: 900,
    height: 1100,
    objectPosition: "center center",
    provenance: "CURRENT_JUNGLE_MEDIA",
    ownerMediaRequired: true,
  },
  substrates: {
    slot: "HOME_UNIVERSE_SUBSTRATES",
    src: "/owner-media/home-universes/home-universe-substrates-owner-v1.avif",
    alt: "Matières et substrats horticoles Tibaldo Jungle disposés en couches",
    width: 1200,
    height: 2467,
    objectPosition: "center 54%",
    provenance: "OWNER_PROVIDED_MEDIA",
    ownerMediaRequired: false,
  },
  studio: {
    slot: "HOME_UNIVERSE_STUDIO",
    src: "/media/projet-boutique-tibaldo-jungle-lille.webp",
    alt: "Façade du Studio Végétal Tibaldo Jungle à Lille",
    width: 900,
    height: 1100,
    objectPosition: "center center",
    provenance: "CURRENT_JUNGLE_MEDIA",
    ownerMediaRequired: false,
  },
} as const satisfies Record<string, HomeUniverseMedia>;
