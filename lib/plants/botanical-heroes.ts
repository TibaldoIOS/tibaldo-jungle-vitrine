export type BotanicalHeroProvenance =
  | "OWNER_APPROVED"
  | "OWNER_PROVIDED"
  | "OWNER_GENERATED_PROTOTYPE"
  | "OWNER_PHOTO_DERIVED"
  | "LICENSED";

export type BotanicalHeroStatus =
  | "APPROVED_STYLE_MASTER"
  | "APPROVED"
  | "AWAITING_OWNER_VISUAL_VALIDATION"
  | "PROTOTYPE_REJECTED";

type BotanicalHeroPlacement = {
  scale: number;
  x: string;
  y: string;
  opacity?: number;
};

export type BotanicalHeroConfig = {
  render: "strelitzia-svg" | "alpha-mask";
  asset?: string;
  prototypeId?: string;
  provenance: BotanicalHeroProvenance;
  status: BotanicalHeroStatus;
  desktop: BotanicalHeroPlacement;
  mobile: BotanicalHeroPlacement;
};

export const botanicalHeroRegistry = {
  strelitzia: {
    render: "strelitzia-svg",
    provenance: "OWNER_APPROVED",
    status: "APPROVED_STYLE_MASTER",
    desktop: { scale: 0.94, x: "3vw", y: "-6px", opacity: 0.74 },
    mobile: { scale: 1, x: "0%", y: "72px", opacity: 0.18 },
  },
  chlorophytum: {
    render: "alpha-mask",
    asset: "/images/botanical-heroes/prototypes/chlorophytum-v2.svg",
    prototypeId: "chlorophytum-v2",
    provenance: "OWNER_GENERATED_PROTOTYPE",
    status: "APPROVED",
    desktop: { scale: 1.08, x: "-1vw", y: "14px", opacity: 0.72 },
    mobile: { scale: 0.98, x: "16%", y: "72px", opacity: 0.2 },
  },
  alocasia: {
    render: "alpha-mask",
    asset: "/images/botanical-heroes/prototypes/alocasia-v31.svg",
    prototypeId: "alocasia-v31",
    provenance: "OWNER_GENERATED_PROTOTYPE",
    status: "AWAITING_OWNER_VISUAL_VALIDATION",
    desktop: { scale: 1, x: "1vw", y: "72px", opacity: 0.72 },
    mobile: { scale: 0.92, x: "19%", y: "72px", opacity: 0.2 },
  },
  monstera: {
    render: "alpha-mask",
    asset: "/images/botanical-heroes/prototypes/monstera-prototype.svg",
    prototypeId: "monstera-prototype",
    provenance: "OWNER_GENERATED_PROTOTYPE",
    status: "PROTOTYPE_REJECTED",
    desktop: { scale: 1.03, x: "-1vw", y: "12px", opacity: 0.72 },
    mobile: { scale: 0.97, x: "12%", y: "72px", opacity: 0.2 },
  },
  dicksonia: {
    render: "alpha-mask",
    asset: "/images/botanical-heroes/prototypes/dicksonia-prototype.svg",
    prototypeId: "dicksonia-prototype",
    provenance: "OWNER_GENERATED_PROTOTYPE",
    status: "PROTOTYPE_REJECTED",
    desktop: { scale: 1.25, x: "-1vw", y: "96px", opacity: 0.72 },
    mobile: { scale: 0.86, x: "35%", y: "96px", opacity: 0.2 },
  },
} satisfies Record<string, BotanicalHeroConfig>;

export type BotanicalHeroKey = keyof typeof botanicalHeroRegistry;

export function hasBotanicalHero(genre: string): genre is BotanicalHeroKey {
  return genre in botanicalHeroRegistry;
}
