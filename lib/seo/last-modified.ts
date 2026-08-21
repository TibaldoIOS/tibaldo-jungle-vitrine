// Dates éditoriales stables. Elles ne doivent être modifiées que lorsqu'un contenu
// public change réellement, jamais automatiquement pendant le build.
export const editorialLastModified = {
  "/": "2026-08-15",
  "/plantes": "2026-08-17",
  "/fleurs": "2026-08-15",
  "/substrats": "2026-08-21",
  "/rempotage": "2026-08-21",
  "/evenements": "2026-08-17",
  "/services": "2026-08-15",
  "/coulisses": "2026-08-15",
  "/contact": "2026-08-15",
  "/boutique-plantes-lille": "2026-08-17",
  "/rempotage-plantes-lille": "2026-08-17",
  "/substrats-en-vrac-lille": "2026-08-15",
  "/pots-cache-pots-lille": "2026-08-15",
  "/fleurs-sur-commande-lille": "2026-08-15",
  "/fleurs-mariage-lille": "2026-08-15",
  "/fleurs-evenement-lille": "2026-08-15",
  "/livraison-plantes-lille": "2026-08-15",
  "/mur-vegetal-naturel-lille": "2026-08-15",
  "/sos-plantes": "2026-08-21",
  "/conseils": "2026-08-17",
} as const;

export const lastModifiedDefaults = {
  guides: "2026-08-17",
  flowers: "2026-08-12",
  substrates: "2026-08-21",
  taxonomy: "2026-08-17",
} as const;
