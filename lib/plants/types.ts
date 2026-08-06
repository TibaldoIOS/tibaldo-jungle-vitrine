export type Level = 1 | 2 | 3 | 4 | 5;
export type PlantEntry = {
  slug: string; genre: string; genreLabel: string; botanicalName: string; displayName: string; subtitle: string;
  family: string; origin: string; hybridization: string; synonyms: string[]; description: string[];
  specimen: { observedHeight: string; note: string };
  growth: { adultSize: string; speed: string; habit: string };
  care: { light: Level; water: Level; humidity: Level; difficulty: Level; lightText: string; watering: string; humidityText: string; temperature: string; substrate: string; repotting: string; fertilizing: string; propagation: string };
  toxicity: { level: string; summary: string; details: string };
  problems: { title: string; cause: string; advice: string }[];
  comparisons: { name: string; difference: string }[];
  faq: { question: string; answer: string }[];
  tibaldoAdvice: string[];
  gallery: { src: string; alt: string; caption: string; width: number; height: number }[];
  availability: { label: string; note: string };
  seo: { title: string; description: string; keywords: string[] };
  sources: { label: string; url: string }[];
  publishedAt: string; updatedAt: string;
};
