export type PotEditorialEntry = {
  repere: number;
  supplierReference: string;
  name: string;
  dimensions: string;
  image: string;
  alt: string;
  description: string;
};

const mediaRoot = "/media/pots/famiflora-lot1";

export const potEditorialCatalog: PotEditorialEntry[] = [
  { repere: 1, supplierReference: "201977867", name: "Pot Mystic Brown à côtes verticales", dimensions: "Ø22 × H18 cm", image: `${mediaRoot}/01-creme-strie.webp`, alt: "Pot strié crème Mystic de forme arrondie, diamètre 22 cm et hauteur 18 cm", description: "Une silhouette arrondie à finition crème, rythmée par un relief vertical régulier." },
  { repere: 2, supplierReference: "202014645", name: "Pot Emperor effet chêne foncé", dimensions: "Ø20 × H19 cm", image: `${mediaRoot}/02-effet-bois-droit.webp`, alt: "Pot Emperor arrondi à finition effet chêne foncé, diamètre 20 cm et hauteur 19 cm", description: "Une silhouette ventrue aux lignes sobres, avec une finition effet chêne foncé." },
  { repere: 3, supplierReference: "17584", name: "Pot œuf émaillé bleu", dimensions: "Ø38 × H32 cm", image: `${mediaRoot}/03-bleu-grand.webp`, alt: "Grand pot arrondi bleu à finition émaillée, diamètre 38 cm et hauteur 32 cm", description: "Un grand format arrondi, bleu intense, à finition émaillée." },
  { repere: 4, supplierReference: "140979", name: "Pot Whitewash", dimensions: "Ø23 × H21 cm", image: `${mediaRoot}/04-whitewash.webp`, alt: "Pot arrondi à finition beige whitewash, diamètre 23 cm et hauteur 21 cm", description: "Un pot arrondi à finition beige whitewash, volontairement nuancée." },
  { repere: 5, supplierReference: "17582", name: "Pot œuf émaillé bleu", dimensions: "Ø22 × H21 cm", image: `${mediaRoot}/05-bleu-petit.webp`, alt: "Pot arrondi bleu à finition émaillée, diamètre 22 cm et hauteur 21 cm", description: "Le même bleu intense dans un format plus compact, à finition émaillée." },
  { repere: 6, supplierReference: "202051757", name: "Pot Bell rouge", dimensions: "Ø26 × H23 cm", image: `${mediaRoot}/06-bell-rouge-petit.webp`, alt: "Pot Bell rouge à motifs ovales clairs, diamètre 26 cm et hauteur 23 cm", description: "Un pot Bell rouge animé de motifs ovales clairs." },
  { repere: 7, supplierReference: "202051758", name: "Pot Bell rouge", dimensions: "Ø32 × H26 cm", image: `${mediaRoot}/07-bell-rouge-grand.webp`, alt: "Grand pot Bell rouge à motifs ovales clairs, diamètre 32 cm et hauteur 26 cm", description: "La version grand format du pot Bell rouge, animée de motifs ovales clairs." },
  { repere: 8, supplierReference: "201912171", name: "Pot œuf Falling Brown", dimensions: "Ø22 × H21 cm", image: `${mediaRoot}/08-falling-brown.webp`, alt: "Pot arrondi brun foncé à finition émaillée mouchetée, diamètre 22 cm et hauteur 21 cm", description: "Un pot arrondi brun foncé à finition émaillée mouchetée." },
  { repere: 9, supplierReference: "202051666", name: "Pot Cove multicolore horizontal", dimensions: "Ø13 × H11 cm", image: `${mediaRoot}/09-cove-horizontal.webp`, alt: "Petit pot Cove à bandes horizontales multicolores, diamètre 13 cm et hauteur 11 cm", description: "Des bandes horizontales multicolores et un intérieur blanc sur un petit format." },
  { repere: 10, supplierReference: "202051667", name: "Pot Cove multicolore bleu vertical", dimensions: "Ø13 × H11 cm", image: `${mediaRoot}/10-cove-vertical.webp`, alt: "Petit pot Cove à bandes verticales bleues et multicolores, diamètre 13 cm et hauteur 11 cm", description: "Des bandes verticales bleues, turquoise, vert menthe et orange, avec intérieur blanc." },
  { repere: 11, supplierReference: "202031956", name: "Pot cylindre sur pied Falling Brown", dimensions: "Ø24 × H19 cm", image: `${mediaRoot}/11-pedestal-brun.webp`, alt: "Pot cylindrique brun et crème moucheté sur petit pied, diamètre 24 cm et hauteur 19 cm", description: "Un cylindre brun et crème à finition émaillée mouchetée, posé sur un petit pied." },
  { repere: 13, supplierReference: "201829952", name: "Pot cylindre rouge mat", dimensions: "Ø16,5 × H14,5 cm", image: `${mediaRoot}/13-rouge-mat.webp`, alt: "Pot cylindrique rouge mat, diamètre 16,5 cm et hauteur 14,5 cm", description: "Un pot cylindrique compact à finition rouge mate." },
  { repere: 14, supplierReference: "201624708", name: "Pot cylindre noir brillant", dimensions: "Ø16,5 × H14,5 cm", image: `${mediaRoot}/14-noir-brillant.webp`, alt: "Pot cylindrique noir brillant, diamètre 16,5 cm et hauteur 14,5 cm", description: "Un pot cylindrique compact à finition noire brillante." },
  { repere: 15, supplierReference: "201695169", name: "Pot Arizona Egg graphite", dimensions: "Ø25 × H25 cm", image: `${mediaRoot}/15-graphite.webp`, alt: "Pot Arizona arrondi graphite gris bleu texturé, diamètre 25 cm et hauteur 25 cm", description: "Un pot Arizona arrondi à finition graphite gris bleu texturée." },
  { repere: 16, supplierReference: "201994901", name: "Pot rond Belly haut Oxblood", dimensions: "Ø21 cm · hauteur non documentée", image: `${mediaRoot}/16-oxblood.webp`, alt: "Pot haut arrondi rouge brun Oxblood à finition émaillée, diamètre 21 cm", description: "Un pot haut arrondi rouge brun Oxblood à finition émaillée." },
];
