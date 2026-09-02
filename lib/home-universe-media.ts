export type HomeUniverseMedia = {
  slot: "HOME_UNIVERSE_PLANTS" | "HOME_UNIVERSE_SUBSTRATES" | "HOME_UNIVERSE_STUDIO";
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition: string;
  provenance: "TIBALDO_OWNER_MEDIA" | "CURRENT_JUNGLE_MEDIA";
  ownerMediaRequired: boolean;
};

export const homeUniverseMedia = {
  plants: {
    slot: "HOME_UNIVERSE_PLANTS",
    src: "/owner-media/home-universes/home-universe-plants-owner-v1.avif",
    alt: "Mur végétal Tibaldo composé de feuillages tropicaux à Lille",
    width: 1536,
    height: 1024,
    objectPosition: "center center",
    provenance: "TIBALDO_OWNER_MEDIA",
    ownerMediaRequired: false,
  },
  substrates: {
    slot: "HOME_UNIVERSE_SUBSTRATES",
    src: "/owner-media/home-universes/home-universe-substrates-owner-v1.avif",
    alt: "Matières et substrats horticoles Tibaldo Jungle disposés en couches",
    width: 1200,
    height: 2467,
    objectPosition: "center 54%",
    provenance: "TIBALDO_OWNER_MEDIA",
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
