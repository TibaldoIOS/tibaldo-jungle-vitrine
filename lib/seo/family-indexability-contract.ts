export type FamilyHubDecision = "INDEX_KEEP" | "NOINDEX_FOLLOW";

/** Canonical family policy shared by metadata, sitemap generation and tests. */
export const familyHubDecisions = {
  apocynaceae: "NOINDEX_FOLLOW",
  araceae: "INDEX_KEEP",
  araliaceae: "NOINDEX_FOLLOW",
  asparagaceae: "INDEX_KEEP",
  asphodelaceae: "NOINDEX_FOLLOW",
  cactaceae: "NOINDEX_FOLLOW",
  cycadaceae: "NOINDEX_FOLLOW",
  dicksoniaceae: "NOINDEX_FOLLOW",
  equisetaceae: "NOINDEX_FOLLOW",
  marantaceae: "NOINDEX_FOLLOW",
  moraceae: "NOINDEX_FOLLOW",
  musaceae: "INDEX_KEEP",
  nephrolepidaceae: "NOINDEX_FOLLOW",
  piperaceae: "NOINDEX_FOLLOW",
  strelitziaceae: "NOINDEX_FOLLOW",
  urticaceae: "NOINDEX_FOLLOW",
} as const satisfies Record<string, FamilyHubDecision>;

export const familyHubDecision = (family: string): FamilyHubDecision => {
  const slug = family.toLowerCase() as keyof typeof familyHubDecisions;
  return familyHubDecisions[slug] ?? "NOINDEX_FOLLOW";
};

export const isFamilyIndexable = (family: string) => familyHubDecision(family) === "INDEX_KEEP";

export const isRouteIndexable = (pathname: string) => {
  const familyMatch = pathname.match(/^\/plantes\/famille\/([^/]+)\/?$/);
  if (familyMatch) return isFamilyIndexable(familyMatch[1]);
  return true;
};
