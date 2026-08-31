export type FamilyHubContent = {
  definition: string;
  distinction: string;
  traits: readonly string[];
};

export const familyHubContent: Record<string, FamilyHubContent> = {
  araceae: {
    definition: "Les Araceae réunissent des plantes herbacées reconnaissables notamment à leur inflorescence formée d’un spadice associé à une spathe. Jungle y documente des formes terrestres, grimpantes et parfois épiphytes.",
    distinction: "Alocasia, Anthurium, Philodendron, Epipremnum, Monstera, Colocasia et Syngonium partagent une famille, mais pas une recette de culture unique : chaque fiche précise son port, ses racines et son milieu.",
    traits: ["Spadice et spathe", "Ports terrestres ou grimpants", "Feuillages très divers"],
  },
  asparagaceae: {
    definition: "Les Asparagaceae forment une vaste famille de monocotylédones. La sélection Jungle en montre plusieurs architectures : rosettes succulentes, touffes stolonifères, tiges dressées et feuillages rubanés.",
    distinction: "Agave, Asparagus, Chlorophytum, Dracaena et Yucca illustrent une diversité qui interdit les conseils uniformes. Lumière, réserve d’eau et système racinaire doivent être lus genre par genre.",
    traits: ["Monocotylédones", "Rosettes, touffes ou tiges", "Réserves d’eau variables"],
  },
  musaceae: {
    definition: "Les Musaceae regroupent de grandes herbes à feuilles engainantes dont les bases forment un pseudotronc. Jungle documente ici Musa et Ensete, deux genres proches mais aux stratégies de croissance distinctes.",
    distinction: "Leur silhouette spectaculaire ne doit pas masquer les différences de rusticité, de multiplication et d’hivernage. Les fiches précisent ces écarts sans transformer le mot « bananier » en conseil universel.",
    traits: ["Grandes feuilles engainantes", "Pseudotronc herbacé", "Musa et Ensete comparés"],
  },
};
