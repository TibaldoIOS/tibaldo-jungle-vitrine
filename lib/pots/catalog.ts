export type PotEditorialEntry = {
  repere: number;
  supplierReference: string;
  name: string;
  dimensions: string;
  image: string;
  alt: string;
  description: string;
  diameterCm: number;
  cropImage: string;
  cardWidthPercent: number;
};

const mediaRoot = "/media/pots/famiflora-lot1";

export const potEditorialCatalog: PotEditorialEntry[] = [
  { repere: 1, supplierReference: "201977867", name: "Pot Mystic Brown à côtes verticales", dimensions: "Ø22 × H18 cm", diameterCm: 22, cropImage: `${mediaRoot}/crops/pot-mystic-brown-cotes-verticales-d22-h18-crop.jpg`, cardWidthPercent: 46.3, image: `${mediaRoot}/01-creme-strie.jpg`, alt: "Pot strié crème Mystic de forme arrondie, diamètre 22 cm et hauteur 18 cm", description: "Une silhouette arrondie à finition crème, rythmée par un relief vertical régulier." },
  { repere: 2, supplierReference: "202014645", name: "Pot Emperor effet chêne foncé", dimensions: "Ø20 × H19 cm", diameterCm: 20, cropImage: `${mediaRoot}/crops/pot-emperor-effet-chene-fonce-d20-h19-crop.jpg`, cardWidthPercent: 42.1, image: `${mediaRoot}/02-effet-bois-droit.jpg`, alt: "Pot Emperor arrondi à finition effet chêne foncé, diamètre 20 cm et hauteur 19 cm", description: "Une silhouette ventrue aux lignes sobres, avec une finition effet chêne foncé." },
  { repere: 3, supplierReference: "17584", name: "Pot œuf émaillé bleu", dimensions: "Ø38 × H32 cm", diameterCm: 38, cropImage: `${mediaRoot}/crops/pot-oeuf-emaille-bleu-d38-h32-crop.jpg`, cardWidthPercent: 80, image: `${mediaRoot}/03-bleu-grand.jpg`, alt: "Grand pot arrondi bleu à finition émaillée, diamètre 38 cm et hauteur 32 cm", description: "Un grand format arrondi, bleu intense, à finition émaillée." },
  { repere: 4, supplierReference: "140979", name: "Pot Whitewash", dimensions: "Ø23 × H21 cm", diameterCm: 23, cropImage: `${mediaRoot}/crops/pot-whitewash-d23-h21-crop.jpg`, cardWidthPercent: 48.4, image: `${mediaRoot}/04-whitewash.jpg`, alt: "Pot arrondi à finition beige whitewash, diamètre 23 cm et hauteur 21 cm", description: "Un pot arrondi à finition beige whitewash, volontairement nuancée." },
  { repere: 5, supplierReference: "17582", name: "Pot œuf émaillé bleu", dimensions: "Ø22 × H21 cm", diameterCm: 22, cropImage: `${mediaRoot}/crops/pot-oeuf-emaille-bleu-d22-h21-crop.jpg`, cardWidthPercent: 46.3, image: `${mediaRoot}/05-bleu-petit.jpg`, alt: "Pot arrondi bleu à finition émaillée, diamètre 22 cm et hauteur 21 cm", description: "Le même bleu intense dans un format plus compact, à finition émaillée." },
  { repere: 6, supplierReference: "202051757", name: "Pot Bell rouge", dimensions: "Ø26 × H23 cm", diameterCm: 26, cropImage: `${mediaRoot}/crops/pot-bell-rouge-d26-h23-crop.jpg`, cardWidthPercent: 54.7, image: `${mediaRoot}/06-bell-rouge-petit.jpg`, alt: "Pot Bell rouge à motifs ovales clairs, diamètre 26 cm et hauteur 23 cm", description: "Un pot Bell rouge animé de motifs ovales clairs." },
  { repere: 7, supplierReference: "202051758", name: "Pot Bell rouge", dimensions: "Ø32 × H26 cm", diameterCm: 32, cropImage: `${mediaRoot}/crops/pot-bell-rouge-d32-h26-crop.jpg`, cardWidthPercent: 67.4, image: `${mediaRoot}/07-bell-rouge-grand.jpg`, alt: "Grand pot Bell rouge à motifs ovales clairs, diamètre 32 cm et hauteur 26 cm", description: "La version grand format du pot Bell rouge, animée de motifs ovales clairs." },
  { repere: 8, supplierReference: "201912171", name: "Pot œuf Falling Brown", dimensions: "Ø22 × H21 cm", diameterCm: 22, cropImage: `${mediaRoot}/crops/pot-oeuf-emaille-falling-brown-d22-h21-crop.jpg`, cardWidthPercent: 46.3, image: `${mediaRoot}/08-falling-brown.jpg`, alt: "Pot arrondi brun foncé à finition émaillée mouchetée, diamètre 22 cm et hauteur 21 cm", description: "Un pot arrondi brun foncé à finition émaillée mouchetée." },
  { repere: 9, supplierReference: "202051666", name: "Pot Cove multicolore horizontal", dimensions: "Ø13 × H11 cm", diameterCm: 13, cropImage: `${mediaRoot}/crops/pot-cove-multicolore-horizontal-d13-h11-crop.jpg`, cardWidthPercent: 27.4, image: `${mediaRoot}/09-cove-horizontal.jpg`, alt: "Petit pot Cove à bandes horizontales multicolores, diamètre 13 cm et hauteur 11 cm", description: "Des bandes horizontales multicolores et un intérieur blanc sur un petit format." },
  { repere: 10, supplierReference: "202051667", name: "Pot Cove multicolore bleu vertical", dimensions: "Ø13 × H11 cm", diameterCm: 13, cropImage: `${mediaRoot}/crops/pot-cove-multicolore-bleu-vertical-d13-h11-crop.jpg`, cardWidthPercent: 27.4, image: `${mediaRoot}/10-cove-vertical.jpg`, alt: "Petit pot Cove à bandes verticales bleues et multicolores, diamètre 13 cm et hauteur 11 cm", description: "Des bandes verticales bleues, turquoise, vert menthe et orange, avec intérieur blanc." },
  { repere: 11, supplierReference: "202031956", name: "Pot cylindre sur pied Falling Brown", dimensions: "Ø24 × H19 cm", diameterCm: 24, cropImage: `${mediaRoot}/crops/pot-cylindre-sur-pied-falling-brown-d24-h19-crop.jpg`, cardWidthPercent: 50.5, image: `${mediaRoot}/11-pedestal-brun.jpg`, alt: "Pot cylindrique brun et crème moucheté sur petit pied, diamètre 24 cm et hauteur 19 cm", description: "Un cylindre brun et crème à finition émaillée mouchetée, posé sur un petit pied." },
  { repere: 13, supplierReference: "201829952", name: "Pot cylindre rouge mat", dimensions: "Ø16,5 × H14,5 cm", diameterCm: 16.5, cropImage: `${mediaRoot}/crops/pot-cylindre-rouge-mat-d16-5-h14-5-crop.jpg`, cardWidthPercent: 34.7, image: `${mediaRoot}/13-rouge-mat.jpg`, alt: "Pot cylindrique rouge mat, diamètre 16,5 cm et hauteur 14,5 cm", description: "Un pot cylindrique compact à finition rouge mate." },
  { repere: 14, supplierReference: "201624708", name: "Pot cylindre noir brillant", dimensions: "Ø16,5 × H14,5 cm", diameterCm: 16.5, cropImage: `${mediaRoot}/crops/pot-cylindre-noir-brillant-d16-5-h14-5-crop.jpg`, cardWidthPercent: 34.7, image: `${mediaRoot}/14-noir-brillant.jpg`, alt: "Pot cylindrique noir brillant, diamètre 16,5 cm et hauteur 14,5 cm", description: "Un pot cylindrique compact à finition noire brillante." },
  { repere: 15, supplierReference: "201695169", name: "Pot Arizona Egg graphite", dimensions: "Ø25 × H25 cm", diameterCm: 25, cropImage: `${mediaRoot}/crops/pot-arizona-egg-graphite-d25-h25-crop.jpg`, cardWidthPercent: 52.6, image: `${mediaRoot}/15-graphite.jpg`, alt: "Pot Arizona arrondi graphite gris bleu texturé, diamètre 25 cm et hauteur 25 cm", description: "Un pot Arizona arrondi graphite gris bleu texturé." },
  { repere: 16, supplierReference: "201994901", name: "Pot rond Belly haut Oxblood", dimensions: "Ø21 cm · hauteur non documentée", diameterCm: 21, cropImage: `${mediaRoot}/crops/pot-rond-belly-haut-oxblood-d21-crop.jpg`, cardWidthPercent: 44.2, image: `${mediaRoot}/16-oxblood.jpg`, alt: "Pot haut arrondi rouge brun Oxblood à finition émaillée, diamètre 21 cm", description: "Un pot haut arrondi rouge brun Oxblood à finition émaillée." },
  { repere: 17, supplierReference: "CEPT00002706", name: "Pot MTerra rond à rebord", dimensions: "Ø33 × H31 cm", diameterCm: 33, cropImage: "/media/pots/kalyste/pot-rond-rebord-terre-cuite-d33-h31.png", cardWidthPercent: 69.5, image: "/media/pots/kalyste/pot-rond-rebord-terre-cuite-d33-h31.png", alt: "Grand pot MTerra rond en terre cuite patinée à rebord épais, diamètre 33 cm et hauteur 31 cm", description: "Un grand pot rond en terre cuite patinée de la collection MTerra, avec un rebord épais et une silhouette stable." },
];

export function potComparativeScale(pot: PotEditorialEntry) {
  return pot.cardWidthPercent / 100;
}

export const potEditorialGroups = [
  { id: "oeuf-emaille-bleu", reperes: [3, 5] },
  { id: "bell-rouge", reperes: [6, 7] },
] as const;
