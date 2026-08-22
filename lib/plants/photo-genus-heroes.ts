export type PhotoGenusHeroConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  desktopPosition: string;
  mobilePosition: string;
  status: "OWNER_AUTHORIZED" | "PHOTO_REQUIRED";
};

export const photoGenusHeroRegistry = {
  monstera: {
    src: "/monstera-deliciosa-feuilles.jpg",
    alt: "Feuillage réel, découpé et fenêtré de Monstera deliciosa",
    width: 1800,
    height: 2700,
    desktopPosition: "68% 47%",
    mobilePosition: "63% 48%",
    status: "OWNER_AUTHORIZED",
  },
} satisfies Record<string, PhotoGenusHeroConfig>;

export type PhotoGenusHeroKey = keyof typeof photoGenusHeroRegistry;

export function hasPhotoGenusHero(genre: string): genre is PhotoGenusHeroKey {
  return genre in photoGenusHeroRegistry && photoGenusHeroRegistry[genre as PhotoGenusHeroKey].status === "OWNER_AUTHORIZED";
}
