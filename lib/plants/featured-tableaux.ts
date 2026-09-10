import { plantFamilies, plants } from './catalog.ts';
import { exactVerifiedPrimaryMedia } from './verified-media-api-contract.ts';

// Editorial selection references canonical identities, never independent media URLs.
export const tableauSelections = [
  ['monstera', 'thai-constellation', 'Fenestrations et silhouettes grimpantes.'],
  ['anthurium', 'veitchii', 'Nervures, textures et feuillages de collection.'],
  ['alocasia', 'cuprea', 'Reliefs, contrastes et feuillages architecturaux.'],
  ['philodendron', 'billietiae', 'Grimpants, rampants et ports multiples.'],
  ['colocasia', 'esculenta-eddo', 'Grandes feuilles et présence généreuse.'],
  ['epipremnum', 'marble-queen', 'Lianes souples et variations du feuillage.'],
  ['pilea', 'peperomioides', 'Feuilles rondes et silhouettes légères.'],
  ['calathea', '', 'Motifs, contrastes et rythmes du feuillage.'],
  ['maranta', 'lemon-lime', 'Nervures dessinées par la nature.'],
  ['musa', 'basjoo', 'Grandes limbes et renouvellement des feuilles.'],
  ['strelitzia', 'nicolai', 'Lignes dressées et ampleur tropicale.'],
  ['ficus', 'elastica', 'Feuilles épaisses et silhouettes structurées.'],
] as const;

export function resolveFeaturedTableaux() {
  return tableauSelections.map(([slug, species, signature]) => {
    const genre = plantFamilies.find((entry) => entry.slug === slug);
    if (!genre) throw new Error(`Unknown featured genus: ${slug}`);
    const plant = plants.find((entry) => entry.genre === slug && entry.slug === species);
    return {
      slug, name: genre.name, signature, description: genre.description,
      count: plants.filter((entry) => entry.genre === slug).length,
      image: plant ? exactVerifiedPrimaryMedia(plant) : null,
    };
  });
}
