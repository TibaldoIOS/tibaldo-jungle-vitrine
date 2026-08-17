import { existsSync } from "node:fs";
import { plants } from "../lib/plants/catalog.ts";

const markers = ["photo-reelle-a-venir", "placeholder"];
console.log("| URL | Plante | Fichier principal | Image définitive |\n|---|---|---|---|");
for (const plant of plants) {
  const image = plant.gallery[0];
  const temporary = !image?.src || markers.some((marker) => image.src.toLowerCase().includes(marker));
  const exists = image?.src ? existsSync(new URL(`../public${image.src}`, import.meta.url)) : false;
  console.log(`| /plantes/${plant.genre}/${plant.slug} | ${plant.botanicalName} | ${image?.src ?? "—"} | ${!temporary && exists ? "oui" : "non"} |`);
}
