// Dates éditoriales stables. Elles ne doivent être modifiées que lorsqu'un contenu
// public change réellement, jamais automatiquement pendant le build.
export const editorialLastModified = {
  "/evenements/concours-alocasia-red-imperial-octobre-2026": "2026-10-09",
  "/evenements/week-end-anthurium-octobre-2026": "2026-10-04",
  "/plantes-rares": "2026-10-04",
  "/evenements/week-end-sybotanica-octobre-2026": "2026-10-03",
  "/": "2026-10-09",
  "/plantes": "2026-10-04",
  "/fleurs": "2026-08-15",
  "/substrats": "2026-10-03",
  "/rempotage": "2026-08-30",
  "/evenements": "2026-10-09",
  "/services": "2026-08-15",
  "/coulisses": "2026-10-07",
  "/coulisses/tibaldo-jungle-actu-fr": "2026-10-07",
  "/coulisses/tibaldo-jungle-la-voix-du-nord": "2026-10-07",
  "/coulisses/mes-plantes-de-reve": "2026-09-16",
  "/plantes/monstera/devil-monster": "2026-10-04",
  "/contact": "2026-08-15",
  "/boutique-plantes-lille": "2026-10-07",
  "/rempotage-plantes-lille": "2026-08-17",
  "/substrats-en-vrac-lille": "2026-08-15",
  "/pots-cache-pots-lille": "2026-09-20",
  "/fleurs-sur-commande-lille": "2026-08-15",
  "/fleurs-mariage-lille": "2026-08-15",
  "/fleurs-evenement-lille": "2026-08-15",
  "/livraison-plantes-lille": "2026-08-15",
  "/mur-vegetal-naturel-lille": "2026-08-15",
  "/sos-plantes": "2026-08-17",
  "/conseils": "2026-08-17",
} as const;

export const lastModifiedDefaults = {
  guides: "2026-08-17",
  flowers: "2026-08-12",
  substrates: "2026-08-15",
  taxonomy: "2026-08-17",
} as const;

export const octoberTaxonomyLastModified: Record<string,string> = Object.fromEntries(["begonia","spathiphyllum","dieffenbachia","euphorbia","howea","alocasia","anthurium","sansevieria"].map(g=>[`/plantes/${g}`,"2026-10-04"]));

// Render restored after the public crawl found a missing optional introduction.
octoberTaxonomyLastModified["/plantes/platycerium"] = "2026-10-05";
