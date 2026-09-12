// Genus introductions share the canonical GoldenGroupGuide shape, without invented media.
import { stockIdentityPlants } from "./stock-identities-v1";

const guide = (genre: "asplenium" | "nephrolepis", name: string, lead: string, origin: string) => {
  const children = stockIdentityPlants.filter((plant) => plant.genre === genre);
  const first = children[0];
  return {
    name, image: "/photo-reelle-a-venir.svg", imageAlt: `Photographie de ${name} à documenter`,
    heroSubtitle: lead, lead, origin,
    care: { difficulty: 3, light: 3, water: 4, humidity: 4, substrate: "Humifère et drainant", nutrition: "Légère en croissance" },
    facts: [{ label: "Famille", value: first.family }, { label: "Reproduction", value: "Spores, sans fleurs" }, { label: "Fiches documentées", value: String(children.length) }, { label: "Culture", value: "Selon l’espèce et le cultivar" }],
    sections: [
      { title: "Lire la silhouette", text: genre === "asplenium" ? "Nidus forme une rosette de frondes entières. Cette silhouette n’est pas celle de tous les Asplenium : le genre comprend également des frondes divisées et des espèces de milieux très différents." : "Les frondes de Nephrolepis sont divisées. Leur taille, leur tenue et leur retombée varient selon l’espèce et la sélection horticole ; un nom de cultivar n’est pas une nouvelle espèce." },
      { title: "Humidité et respiration", text: "Les fiches réunies ici concernent des fougères d’intérieur. Le mélange doit rester aéré ; un cache-pot rempli d’eau n’apporte pas une humidité utile aux racines." },
      { title: "Nom botanique et nom horticole", text: genre === "asplenium" ? "Le nom commun nid-d’oiseau est partagé par plusieurs espèces. Une étiquette indiquant seulement Asplenium n’autorise pas à attribuer nidus." : "Le classement familial suit Kew, qui place ici Nephrolepis dans les Polypodiaceae. Les noms Nephrolepidaceae et Lomariopsidaceae se rencontrent dans d’autres référentiels." },
    ],
    problems: first.problems.map(({ title, advice }) => ({ title, text: advice })),
    faq: [{ question: "Toutes les fougères se cultivent-elles de la même façon ?", answer: "Non. Le port et l’habitat de chaque espèce guident la lumière, l’eau et les températures ; les conseils d’une fougère tropicale ne s’appliquent pas à toutes les fougères rustiques." }],
    sources: [...new Map(children.flatMap((plant) => plant.sources).map((item) => [item.url, item])).values()],
  };
};

export const stockFernGuides = {
  asplenium: guide("asplenium", "Asplenium", "Une lecture des fougères nid-d’oiseau, à commencer par Asplenium nidus et sa rosette de frondes lustrées.", "Asplenium appartient aux Aspleniaceae. La fiche nidus concerne une espèce tropicale, sans généraliser sa culture au genre entier."),
  nephrolepis: guide("nephrolepis", "Nephrolepis", "Des frondes souples et divisées : comprendre les fougères de Boston et leurs sélections horticoles.", "Nephrolepis exaltata est l’espèce de référence des sélections présentées ici. Le cultivar reste une identité horticole, distincte de sa distribution sauvage."),
};
