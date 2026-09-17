const MIME_CONTROLLED_OWNER_MEDIA_PREFIX = /^\/media\/owner-media\/(?:strelitzia-alba|anthurium-silver-blush)\//;

/**
 * Most historical API media URLs intentionally expose the bundled asset path
 * without the virtual /media prefix. These two newly linked Owner batches need
 * the Worker-controlled route so Sites can return their exact WebP MIME type.
 */
export function publicMediaContractPath(path: string) {
  return MIME_CONTROLLED_OWNER_MEDIA_PREFIX.test(path)
    ? path
    : path.replace(/^\/media\//, "/");
}
