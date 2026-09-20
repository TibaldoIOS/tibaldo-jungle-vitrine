const MIME_CONTROLLED_MEDIA_PREFIX = /^\/media\/(?:documentary-media\/|owner-media\/(?:strelitzia-alba|anthurium-silver-blush|ficus-elastica-abidjan|alocasia-platinum|dracaena-angolensis-straight|asparagus-plumosus|disocactus-anguliger|dicksonia-antarctica|dracaena-trifasciata-hahnii|monstera-obliqua-peru|echinocactus-grusonii|monstera-dubia)\/)/;

/**
 * Most historical API media URLs intentionally expose the bundled asset path
 * without the virtual /media prefix. Newly linked documentary media and the
 * bounded Owner batches listed above use the Worker-controlled route so Sites
 * returns their exact WebP MIME type.
 */
export function publicMediaContractPath(path: string) {
  return MIME_CONTROLLED_MEDIA_PREFIX.test(path)
    ? path
    : path.replace(/^\/media\//, "/");
}
