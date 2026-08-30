import type { PlantEntry, PlantMediaLicense } from "./types.ts";

type MediaSafetyDecision = {
  route: `/plantes/${string}`;
  previousAsset: string;
  classification: "PHOTO_DOUBTFUL" | "PHOTO_WRONG";
  reason: string;
  finalState: "HONEST_MEDIA_GAP";
};

const decisions: readonly MediaSafetyDecision[] = [
  {
    route: "/plantes/monstera/esqueleto",
    previousAsset: "/media/monstera-esqueleto-feuille-mature-fenestrations.webp",
    classification: "PHOTO_DOUBTFUL",
    reason: "La licence est documentée, mais la photographie montre une personne derrière la feuille et ne constitue pas une preuve suffisante de l’identité horticole non établie ‘Esqueleto’.",
    finalState: "HONEST_MEDIA_GAP",
  },
  {
    route: "/plantes/maranta/lemon-lime",
    previousAsset: "/media/maranta-leuconeura-tibaldo.webp",
    classification: "PHOTO_WRONG",
    reason: "Le visuel montre des nervures rouges incompatibles avec le cultivar ‘Lemon Lime’ annoncé et ne possède pas de provenance média structurée dans la fiche.",
    finalState: "HONEST_MEDIA_GAP",
  },
] as const;

const byRoute = new Map(decisions.map((decision) => [decision.route, decision]));

const mediaGapLicense = (decision: MediaSafetyDecision): PlantMediaLicense => ({
  status: "media-gap",
  registryPath: "/credits-images",
  note: `Audit média nocturne du 31 août 2026 : ${decision.classification}. ${decision.reason} L’ancien fichier reste archivé mais n’est plus rendu comme photographie documentaire.`,
});

export const nightMediaSafetyRegistry = decisions;

export const applyNightMediaSafety = (plants: PlantEntry[]): PlantEntry[] =>
  plants.map((plant) => {
    const route = `/plantes/${plant.genre}/${plant.slug}` as const;
    const decision = byRoute.get(route);
    if (!decision) return plant;
    return {
      ...plant,
      gallery: [{
        src: "/photo-reelle-a-venir.svg",
        alt: `Aucune photographie documentaire vérifiée de ${plant.botanicalName} n’est publiée`,
        caption: "Manque média explicite : aucune photographie incertaine ou mal identifiée n’est affichée.",
        width: 1200,
        height: 1500,
        license: mediaGapLicense(decision),
      }],
    };
  });
