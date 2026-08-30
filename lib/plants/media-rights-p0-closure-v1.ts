import type { PlantEntry, PlantMediaLicense } from "./types";

type PlantImage = PlantEntry["gallery"][number];

type RightsDecision = {
  route: `/plantes/${string}`;
  decision: "RIGHTS_PROVEN_KEEP" | "REMOVE_AND_USE_HONEST_MEDIA_GAP";
  source: string;
  license: string;
  botanicalIdentity: string;
  finalMediaStatus: "VERIFIED_MEDIA" | "HONEST_MEDIA_GAP";
};

const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";

const verifiedLicense = ({
  creator,
  license,
  licenseUrl,
  sourceUrl,
  note,
}: Omit<PlantMediaLicense, "status" | "registryPath">): PlantMediaLicense => ({
  status: "verified",
  creator,
  license,
  licenseUrl,
  sourceUrl,
  registryPath: "/credits-images",
  note,
});

const mediaGapLicense = (route: string): PlantMediaLicense => ({
  status: "media-gap",
  registryPath: "/credits-images",
  note: `P0 droits média du 30 août 2026 : l’ancien média de ${route} a été retiré du rendu, faute de preuve de droits réutilisables et d’identité botanique suffisamment documentée.`,
});

const honestGapImage = (plant: PlantEntry): PlantImage => ({
  src: "/photo-reelle-a-venir.svg",
  alt: `Aucune photographie documentaire vérifiée de ${plant.botanicalName} n’est publiée`,
  caption: "Manque média explicite : aucune photographie sans preuve de droits n’est affichée.",
  width: 1200,
  height: 1500,
  license: mediaGapLicense(`/plantes/${plant.genre}/${plant.slug}`),
});

const verifiedLicensesByRoute: Readonly<Record<string, readonly PlantMediaLicense[]>> = {
  "/plantes/anthurium/veitchii": [
    verifiedLicense({
      creator: "Supertita",
      license: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Anthurium_veitchii-King_Anthurium.jpg",
      note: "Preuve contrôlée le 30 août 2026. La version source du dépôt avant compression est identique au dérivé Commons 1920 px (SHA-256 0b84cf9e23c49c006e950a64f0b4876e0bb3435adc1db1ee15f8375baca9ef6f). La fiche Commons nomme explicitement Anthurium veitchii et publie l’œuvre de Supertita sous CC BY-SA 4.0. Adaptation locale : redimensionnement et compression JPEG, sans transformation morphologique.",
    }),
  ],
  "/plantes/philodendron/billietiae": [
    verifiedLicense({
      creator: "David J. Stang",
      license: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_billietiae_0zz.jpg",
      note: "Preuve contrôlée le 30 août 2026. Le fichier local est strictement identique au dérivé Commons 1280 px (SHA-256 bd0cd113823ba55fda5a17fa7ebe277dece0feef5aa967ea4a105b1b00e28bd0). La description Commons identifie Philodendron billietiae au Fairchild Tropical Botanic Garden.",
    }),
    verifiedLicense({
      creator: "David J. Stang",
      license: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_billietiae_1zz.jpg",
      note: "Preuve contrôlée le 30 août 2026. Le fichier local est strictement identique au dérivé Commons 1920 px (SHA-256 282423a06b1df50f86bb39ed55295defaf2ff8b77a18d024774083e8aeb3d5ae). La description Commons identifie Philodendron billietiae au Fairchild Tropical Botanic Garden.",
    }),
    verifiedLicense({
      creator: "David J. Stang",
      license: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Philodendron_billietiae_2zz.jpg",
      note: "Preuve contrôlée le 30 août 2026. Le fichier local est strictement identique au dérivé Commons 1920 px (SHA-256 7c0af434b918d518831c1426fd9985acb8c1a61872860c13dbf5cfe2a66dbc1f). La description Commons identifie Philodendron billietiae au Fairchild Tropical Botanic Garden.",
    }),
  ],
  "/plantes/philodendron/melanochrysum": [
    verifiedLicense({
      creator: "Chhe",
      license: "Domaine public",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-user",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PhilodendronMelanochrysum.jpg",
      note: "Preuve contrôlée le 30 août 2026. Le fichier local est strictement identique au dérivé Commons 1920 px (SHA-256 7aef20c3c5d362e123962f60cf4e80d190295fe654565e31c1c1b3dc02d199b1). L’auteur Chhe a dédié l’œuvre au domaine public et la fiche Commons identifie Philodendron melanochrysum.",
    }),
  ],
};

const honestGapRoutes = new Set([
  "/plantes/anthurium/pallidiflorum",
  "/plantes/asparagus/plumosus",
  "/plantes/epipremnum/marble-queen",
  "/plantes/epiphyllum/anguliger",
  "/plantes/monstera/thai-constellation",
  "/plantes/monstera/mint",
  "/plantes/monstera/adansonii",
  "/plantes/anthurium/delta-force",
]);

export const mediaRightsP0ClosureRegistry: readonly RightsDecision[] = [
  { route: "/plantes/anthurium/pallidiflorum", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancien asset local sans provenance démontrée", license: "Aucune preuve réutilisable", botanicalIdentity: "Non retenue sans provenance ni preuve d’identité", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/anthurium/veitchii", decision: "RIGHTS_PROVEN_KEEP", source: "Wikimedia Commons — File:Anthurium veitchii-King Anthurium.jpg", license: "CC BY-SA 4.0", botanicalIdentity: "Fichier et catégorie Commons : Anthurium veitchii", finalMediaStatus: "VERIFIED_MEDIA" },
  { route: "/plantes/philodendron/billietiae", decision: "RIGHTS_PROVEN_KEEP", source: "Wikimedia Commons — Philodendron billietiae 0zz, 1zz et 2zz", license: "CC BY-SA 4.0", botanicalIdentity: "Trois vues nommées Philodendron billietiae au Fairchild Tropical Botanic Garden", finalMediaStatus: "VERIFIED_MEDIA" },
  { route: "/plantes/asparagus/plumosus", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancien asset local sans provenance démontrée", license: "Aucune preuve réutilisable", botanicalIdentity: "Non retenue sans provenance ni preuve d’identité", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/epipremnum/marble-queen", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancien asset local sans provenance démontrée", license: "Aucune preuve réutilisable", botanicalIdentity: "Identité cultivar non prouvée", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/epiphyllum/anguliger", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancien asset local sans provenance démontrée", license: "Aucune preuve réutilisable", botanicalIdentity: "Non retenue sans correspondance source exacte", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/monstera/thai-constellation", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancienne composition locale issue d’une photographie fournie sans preuve de droits archivée", license: "Aucune preuve réutilisable", botanicalIdentity: "Identité cultivar non prouvée par une source licenciée", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/monstera/mint", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancienne composition locale issue d’une photographie fournie sans preuve de droits archivée", license: "Aucune preuve réutilisable", botanicalIdentity: "Nom horticole et clone non prouvés", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/monstera/adansonii", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancienne composition locale sans provenance démontrée", license: "Aucune preuve réutilisable", botanicalIdentity: "Non retenue sans correspondance source exacte", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/anthurium/delta-force", decision: "REMOVE_AND_USE_HONEST_MEDIA_GAP", source: "Ancienne composition locale issue d’une photographie fournie sans preuve de droits archivée", license: "Aucune preuve réutilisable", botanicalIdentity: "Traçabilité clonale de ‘Delta Force’ non prouvée par le média", finalMediaStatus: "HONEST_MEDIA_GAP" },
  { route: "/plantes/philodendron/melanochrysum", decision: "RIGHTS_PROVEN_KEEP", source: "Wikimedia Commons — File:PhilodendronMelanochrysum.jpg", license: "Domaine public", botanicalIdentity: "Fichier et catégorie Commons : Philodendron melanochrysum", finalMediaStatus: "VERIFIED_MEDIA" },
];

export const applyMediaRightsP0Closure = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => {
  const route = `/plantes/${plant.genre}/${plant.slug}`;
  if (honestGapRoutes.has(route)) return { ...plant, gallery: [honestGapImage(plant)] };

  const licenses = verifiedLicensesByRoute[route];
  if (!licenses) return plant;
  if (licenses.length !== plant.gallery.length) {
    throw new Error(`Registre média P0 incomplet pour ${route}`);
  }
  return {
    ...plant,
    gallery: plant.gallery.map((image, index) => ({ ...image, license: licenses[index] })),
  };
});
