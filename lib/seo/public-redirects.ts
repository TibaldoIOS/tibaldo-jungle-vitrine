export const publicPermanentRedirects = {
  "/creation-boutique": "/coulisses",
  "/diagnostic-plante-lille": "/sos-plantes",
  "/traitement-thrips-lille": "/sos-plantes",
  "/conseils/thrips-plantes-interieur-lille": "/conseils/thrips-plantes-interieur",
  "/conseils/rempoter-plante-quand-comment": "/rempotage",
  "/rempotage-plantes-lille": "/rempotage",
  "/rempotage-monstera-lille": "/rempotage",
  "/substrat-alocasia-lille": "/plantes/alocasia",
  "/livraison-fleurs-coupees-lille": "/fleurs-sur-commande-lille",
  "/bouquets-fleurs-livraison-lille": "/fleurs-sur-commande-lille",
} as const;

export const publicRedirectSourcePaths = new Set<string>(
  Object.keys(publicPermanentRedirects),
);

