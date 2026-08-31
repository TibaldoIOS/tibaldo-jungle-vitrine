import { readFileSync } from "node:fs";

const certifiedMediaInventory = JSON.parse(
  readFileSync(new URL("../reports/species-media-inventory-after-expansion-v1.json", import.meta.url), "utf8"),
);

// The 80 non-species canonical URLs are unchanged by the certified expansion.
// Species growth is derived from the authoritative regenerated inventory so a
// future species-only expansion cannot leave another duplicated total behind.
export const certifiedPublicNonSpeciesUrlCount = 80;
export const certifiedPublicSpeciesUrlCount = certifiedMediaInventory.after.species;
export const expectedPublicSitemapUrlCount =
  certifiedPublicNonSpeciesUrlCount + certifiedPublicSpeciesUrlCount;
