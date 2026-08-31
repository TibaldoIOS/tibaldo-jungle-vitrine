import type { PlantEntry, PlantMediaLicense } from "./types.ts";

export const set1RequiredMediaFields = [
  "identity",
  "rights",
  "creator",
  "sourceUrl",
  "license",
  "licenseUrl",
  "alt",
  "dimensions",
  "role",
] as const;

type RequiredMediaField = (typeof set1RequiredMediaFields)[number];
type CandidateDecision =
  | "NO_CONTROLLED_CANDIDATE"
  | "REJECTED_UNPROVEN_ARCHIVE"
  | "REJECTED_LOCAL_CANDIDATE"
  | "OWNER_REPLACEMENT_REQUIRED"
  | "VERIFY_ONLY";

export type Set1MediaAudit = {
  route: `/plantes/${string}`;
  candidateDecision: CandidateDecision;
  publication: "JUNGLE_DOCUMENTARY_ONLY" | "CAISSE_ONLY_NO_SHOP";
  missingRequiredFields: readonly RequiredMediaField[];
  reason: string;
};

const allRequiredFields = set1RequiredMediaFields;

/**
 * Registre d'admission Set 1. Un média ne peut être rendu comme documentaire
 * que lorsqu'il a toutes les preuves listées dans `set1RequiredMediaFields`.
 * Aucun candidat de ce lot ne les remplit au 31 août 2026.
 */
export const set1MediaRightsRegistry: readonly Set1MediaAudit[] = [
  {
    route: "/plantes/asparagus/plumosus",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancien asset retiré : aucune provenance locale contrôlée ni preuve de droits réutilisables.",
  },
  {
    route: "/plantes/epipremnum/marble-queen",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancien asset retiré : l'identité exacte du cultivar et les droits ne sont pas prouvés.",
  },
  {
    route: "/plantes/agave/americana-variegata",
    candidateDecision: "NO_CONTROLLED_CANDIDATE",
    publication: "CAISSE_ONLY_NO_SHOP",
    missingRequiredFields: allRequiredFields,
    reason: "Aucun média local contrôlé. Une future photo peut servir Caisse, sans publication Shop.",
  },
  {
    route: "/plantes/monstera/thai-constellation",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancienne composition retirée : ni source licenciée ni identité cultivar exacte démontrées.",
  },
  {
    route: "/plantes/monstera/esqueleto",
    candidateDecision: "OWNER_REPLACEMENT_REQUIRED",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: ["identity", "role"],
    reason: "Le fichier Janadume sous CC BY-SA 4.0 est exclu : personne visible et identité horticole non résolue. Recadrage Owner ou remplacement, avec preuve d'identité, requis.",
  },
  {
    route: "/plantes/monstera/mint",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancienne composition retirée : clone, source et droits non prouvés.",
  },
  {
    route: "/plantes/monstera/adansonii",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancien asset retiré : provenance et droits réutilisables non démontrés.",
  },
  {
    route: "/plantes/monstera/burle-marx-flame",
    candidateDecision: "NO_CONTROLLED_CANDIDATE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Aucun média local contrôlé ; le clone requiert sujet, étiquette et provenance documentés.",
  },
  {
    route: "/plantes/anthurium/pallidiflorum",
    candidateDecision: "REJECTED_UNPROVEN_ARCHIVE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Ancien asset retiré : provenance, droits et correspondance taxonomique non démontrées.",
  },
  {
    route: "/plantes/alocasia/imperial-red",
    candidateDecision: "REJECTED_LOCAL_CANDIDATE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: ["identity", "rights", "creator", "sourceUrl", "license", "licenseUrl", "role"],
    reason: "Les fichiers locaux 1024 × 1536 sont une interprétation éditoriale, non une photographie documentaire sourcée.",
  },
  {
    route: "/plantes/philodendron/royal-queen",
    candidateDecision: "NO_CONTROLLED_CANDIDATE",
    publication: "JUNGLE_DOCUMENTARY_ONLY",
    missingRequiredFields: allRequiredFields,
    reason: "Aucun média local contrôlé ; l'identité de cultivar doit être visible sur l'étiquette ou la preuve de provenance.",
  },
] as const;

export const set1MarantaVerifyOnly: Set1MediaAudit = {
  route: "/plantes/maranta/lemon-lime",
  candidateDecision: "VERIFY_ONLY",
  publication: "JUNGLE_DOCUMENTARY_ONLY",
  missingRequiredFields: ["identity", "rights", "creator", "sourceUrl", "license", "licenseUrl", "role"],
  reason: "Le fichier local 1024 × 1536 montre des nervures rouges incompatibles avec ‘Lemon Lime’. Ne pas relier sans identité et provenance structurées.",
};

export const set1RejectedMediaExclusions = [
  {
    route: "/plantes/alocasia/gageana" as const,
    decision: "REJECTED_DO_NOT_REINTRODUCE",
    reason: "Le candidat de jardin avec visiteurs et sujet insuffisamment isolé reste exclu du rendu documentaire.",
  },
] as const;

const blockedRoutes = new Set([
  ...set1MediaRightsRegistry.map(({ route }) => route),
  set1MarantaVerifyOnly.route,
]);

const set1MediaGapLicense = (plant: PlantEntry): PlantMediaLicense => ({
  status: "media-gap",
  registryPath: "/credits-images",
  note: `Set 1 média du 31 août 2026 : aucune photographie documentaire de ${plant.botanicalName} ne satisfait simultanément identité, droits, attribution, source, licence, texte alternatif, dimensions et rôle.`,
});

const honestSet1MediaGap = (plant: PlantEntry): PlantEntry["gallery"][number] => ({
  src: "/photo-reelle-a-venir.svg",
  alt: `Aucune photographie documentaire vérifiée de ${plant.botanicalName} n’est publiée`,
  caption: "Manque média explicite : aucun candidat incomplet n’est rendu comme photographie documentaire.",
  width: 1200,
  height: 1500,
  license: set1MediaGapLicense(plant),
});

export const applySet1MediaRightsGate = (plants: PlantEntry[]): PlantEntry[] =>
  plants.map((plant) => {
    const route = `/plantes/${plant.genre}/${plant.slug}` as const;
    if (!blockedRoutes.has(route)) return plant;
    return { ...plant, gallery: [honestSet1MediaGap(plant)] };
  });
