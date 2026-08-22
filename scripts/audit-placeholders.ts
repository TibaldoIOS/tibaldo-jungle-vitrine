import { existsSync } from "node:fs";
import { plants } from "../lib/plants/catalog.ts";
import { isEditorialPlaceholder } from "../lib/plants/types.ts";

console.log("| URL | Plante | Fichier principal | Image définitive |\n|---|---|---|---|");
for (const plant of plants) {
  const image = plant.gallery[0];
  const temporary = isEditorialPlaceholder(image?.src);
  const exists = image?.src ? existsSync(new URL(`../public${image.src}`, import.meta.url)) : false;
  console.log(`| /plantes/${plant.genre}/${plant.slug} | ${plant.botanicalName} | ${image?.src ?? "—"} | ${!temporary && exists ? "oui" : "non"} |`);
}
