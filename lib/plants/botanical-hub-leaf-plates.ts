export type BotanicalLeafShape =
  | "cordate"
  | "pendant"
  | "lanceolate"
  | "sagittate"
  | "shield"
  | "palmate"
  | "lobed"
  | "fenestrated"
  | "perforated"
  | "pinnate";

export type BotanicalLeafPlateEntry = {
  botanicalName: string;
  canonicalRoute: `/plantes/${string}/${string}`;
  identityStatus: "canonical-reference";
  shape: BotanicalLeafShape;
  tone: "forest" | "moss" | "sage" | "bronze" | "velvet";
  note: string;
};

export type BotanicalHubLeafPlateData = {
  genus: "monstera" | "anthurium" | "philodendron" | "alocasia";
  title: string;
  description: string;
  plateAsset: `/media/hub-leaf-plates-v1/${string}.webp`;
  altText: string;
  caption: string;
  leaves: readonly BotanicalLeafPlateEntry[];
};

export const botanicalHubLeafPlates: Partial<Record<string, BotanicalHubLeafPlateData>> = {
  monstera: {
    genus: "monstera",
    title: "Fenêtres, découpes, élancements.",
    description: "Du limbe juvénile entier aux feuilles adultes profondément ouvertes, le genre Monstera fait évoluer sa silhouette avec l’âge et les conditions de croissance.",
    plateAsset: "/media/hub-leaf-plates-v1/monstera-leaf-plate-v1.webp",
    altText: "Planche illustrée de six silhouettes de feuilles du genre Monstera, entières, perforées, découpées et allongées.",
    caption: "Interprétations botaniques originales d’après les morphologies documentées par les fiches Jungle ; les proportions restent illustratives.",
    leaves: [
      { botanicalName: "Monstera deliciosa", canonicalRoute: "/plantes/monstera/deliciosa", identityStatus: "canonical-reference", shape: "fenestrated", tone: "forest", note: "limbe adulte fenestré" },
      { botanicalName: "Monstera adansonii", canonicalRoute: "/plantes/monstera/adansonii", identityStatus: "canonical-reference", shape: "perforated", tone: "moss", note: "perforations internes" },
      { botanicalName: "Monstera dubia", canonicalRoute: "/plantes/monstera/dubia", identityStatus: "canonical-reference", shape: "cordate", tone: "sage", note: "forme juvénile entière" },
      { botanicalName: "Monstera standleyana", canonicalRoute: "/plantes/monstera/standleyana", identityStatus: "canonical-reference", shape: "lanceolate", tone: "velvet", note: "silhouette étroite" },
      { botanicalName: "Monstera pinnatipartita", canonicalRoute: "/plantes/monstera/pinnatipartita", identityStatus: "canonical-reference", shape: "lobed", tone: "forest", note: "divisions profondes" },
      { botanicalName: "Monstera subpinnata", canonicalRoute: "/plantes/monstera/subpinnata", identityStatus: "canonical-reference", shape: "pinnate", tone: "moss", note: "segments disposés le long de la nervure" },
    ],
  },
  anthurium: {
    genus: "anthurium",
    title: "Velours, nervures, longues chutes.",
    description: "Les Anthurium ne se résument pas à une feuille en cœur : le genre rassemble des limbes gaufrés, pendants, palmés et fortement nervurés.",
    plateAsset: "/media/hub-leaf-plates-v1/anthurium-leaf-plate-v1.webp",
    altText: "Planche illustrée de six silhouettes de feuilles d’Anthurium, cordiformes, pendantes, gaufrées et palmées.",
    caption: "Une lecture morphologique volontairement sobre : texture, proportion et nervation distinguent les références canoniques.",
    leaves: [
      { botanicalName: "Anthurium clarinervium", canonicalRoute: "/plantes/anthurium/clarinervium", identityStatus: "canonical-reference", shape: "cordate", tone: "velvet", note: "cœur velouté, nervures claires" },
      { botanicalName: "Anthurium warocqueanum", canonicalRoute: "/plantes/anthurium/warocqueanum", identityStatus: "canonical-reference", shape: "pendant", tone: "forest", note: "limbe long et pendant" },
      { botanicalName: "Anthurium veitchii", canonicalRoute: "/plantes/anthurium/veitchii", identityStatus: "canonical-reference", shape: "lanceolate", tone: "moss", note: "surface plissée et allongée" },
      { botanicalName: "Anthurium pedatoradiatum", canonicalRoute: "/plantes/anthurium/pedatoradiatum", identityStatus: "canonical-reference", shape: "palmate", tone: "sage", note: "divisions palmées" },
      { botanicalName: "Anthurium luxurians", canonicalRoute: "/plantes/anthurium/luxurians", identityStatus: "canonical-reference", shape: "shield", tone: "bronze", note: "texture bullée" },
      { botanicalName: "Anthurium forgetii", canonicalRoute: "/plantes/anthurium/forgetii", identityStatus: "canonical-reference", shape: "shield", tone: "velvet", note: "limbe arrondi, sinus fermé" },
    ],
  },
  philodendron: {
    genus: "philodendron",
    title: "Cœurs, lances, lobes libres.",
    description: "Grimpants ou rampants, les Philodendron composent un vocabulaire de feuilles cordiformes, sagittées, allongées et profondément découpées.",
    plateAsset: "/media/hub-leaf-plates-v1/philodendron-leaf-plate-v1.webp",
    altText: "Planche illustrée de six silhouettes de feuilles de Philodendron, en cœur, en lance et plus ou moins lobées.",
    caption: "La planche compare des silhouettes repères sans prétendre résumer toute la variabilité d’un individu adulte.",
    leaves: [
      { botanicalName: "Philodendron hederaceum", canonicalRoute: "/plantes/philodendron/hederaceum", identityStatus: "canonical-reference", shape: "cordate", tone: "moss", note: "cœur souple de grimpante" },
      { botanicalName: "Philodendron hastatum", canonicalRoute: "/plantes/philodendron/hastatum", identityStatus: "canonical-reference", shape: "sagittate", tone: "sage", note: "silhouette en fer de lance" },
      { botanicalName: "Philodendron billietiae", canonicalRoute: "/plantes/philodendron/billietiae", identityStatus: "canonical-reference", shape: "lanceolate", tone: "forest", note: "limbe étiré" },
      { botanicalName: "Philodendron gloriosum", canonicalRoute: "/plantes/philodendron/gloriosum", identityStatus: "canonical-reference", shape: "cordate", tone: "velvet", note: "large cœur nervuré" },
      { botanicalName: "Philodendron squamiferum", canonicalRoute: "/plantes/philodendron/squamiferum", identityStatus: "canonical-reference", shape: "lobed", tone: "moss", note: "limbe profondément lobé" },
      { botanicalName: "Philodendron grazielae", canonicalRoute: "/plantes/philodendron/grazielae", identityStatus: "canonical-reference", shape: "cordate", tone: "bronze", note: "petit cœur épais" },
    ],
  },
  alocasia: {
    genus: "alocasia",
    title: "Boucliers, flèches, matières.",
    description: "Chez les Alocasia, la géométrie sagittée se nuance par la largeur du bouclier, la tension des bords, la texture et le contraste des nervures.",
    plateAsset: "/media/hub-leaf-plates-v1/alocasia-leaf-plate-v1.webp",
    altText: "Planche illustrée de six silhouettes de feuilles d’Alocasia, sagittées, en bouclier, étroites et découpées.",
    caption: "Les détails de surface sont stylisés ; les identités citées correspondent uniquement à des routes canoniques Jungle.",
    leaves: [
      { botanicalName: "Alocasia micholitziana", canonicalRoute: "/plantes/alocasia/micholitziana", identityStatus: "canonical-reference", shape: "sagittate", tone: "forest", note: "flèche veloutée et nervurée" },
      { botanicalName: "Alocasia reginula", canonicalRoute: "/plantes/alocasia/reginula", identityStatus: "canonical-reference", shape: "shield", tone: "velvet", note: "petit bouclier sombre" },
      { botanicalName: "Alocasia cuprea", canonicalRoute: "/plantes/alocasia/cuprea", identityStatus: "canonical-reference", shape: "shield", tone: "bronze", note: "limbe cuivré et bombé" },
      { botanicalName: "Alocasia baginda", canonicalRoute: "/plantes/alocasia/baginda", identityStatus: "canonical-reference", shape: "shield", tone: "sage", note: "bouclier texturé" },
      { botanicalName: "Alocasia longiloba", canonicalRoute: "/plantes/alocasia/longiloba", identityStatus: "canonical-reference", shape: "sagittate", tone: "moss", note: "lobes étroits et prolongés" },
      { botanicalName: "Alocasia portei", canonicalRoute: "/plantes/alocasia/portei", identityStatus: "canonical-reference", shape: "lobed", tone: "forest", note: "bords profondément découpés" },
    ],
  },
};
