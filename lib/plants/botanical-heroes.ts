export type BotanicalHeroProvenance =
  | "OWNER_APPROVED"
  | "OWNER_PROVIDED"
  | "OWNER_PHOTO_DERIVED"
  | "LICENSED";

type BotanicalHeroPlacement = {
  scale: number;
  x: string;
  y: string;
  opacity?: number;
};

export type BotanicalHeroConfig = {
  render: "strelitzia-svg" | "alpha-mask";
  asset?: string;
  provenance: BotanicalHeroProvenance;
  desktop: BotanicalHeroPlacement;
  mobile: BotanicalHeroPlacement;
};

export const botanicalHeroRegistry = {
  strelitzia: {
    render: "strelitzia-svg",
    provenance: "OWNER_APPROVED",
    desktop: { scale: 1, x: "0px", y: "8px", opacity: 0.74 },
    mobile: { scale: 1, x: "0%", y: "72px", opacity: 0.18 },
  },
  chlorophytum: {
    render: "alpha-mask",
    asset: "/images/botanical-heroes/chlorophytum-owner-lineart.png",
    provenance: "OWNER_PROVIDED",
    desktop: { scale: 1.03, x: "-1vw", y: "18px", opacity: 0.72 },
    mobile: { scale: 0.94, x: "16%", y: "72px", opacity: 0.2 },
  },
} satisfies Record<string, BotanicalHeroConfig>;

export type BotanicalHeroKey = keyof typeof botanicalHeroRegistry;

export function hasBotanicalHero(genre: string): genre is BotanicalHeroKey {
  return genre in botanicalHeroRegistry;
}

