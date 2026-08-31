import { readFileSync } from "node:fs";

const certifiedMediaInventory = JSON.parse(
  readFileSync(new URL("../reports/species-media-inventory-after-expansion-v1.json", import.meta.url), "utf8"),
);

// The non-family baseline is stable. Family hub inclusion comes from the same
// explicit policy consumed by page metadata; species growth comes from the
// certified inventory. The sitemap total therefore follows both contracts.
import { familyHubDecisions } from "../lib/seo/family-indexability-contract.ts";

export const certifiedPublicNonFamilyNonSpeciesUrlCount = 77;
export const certifiedPublicFamilyHubUrlCount = Object.values(
  familyHubDecisions,
).filter((decision) => decision === "INDEX_KEEP").length;
export const certifiedPublicNonSpeciesUrlCount =
  certifiedPublicNonFamilyNonSpeciesUrlCount + certifiedPublicFamilyHubUrlCount;
export const certifiedPublicSpeciesUrlCount = certifiedMediaInventory.after.species;
export const expectedPublicSitemapUrlCount =
  certifiedPublicNonSpeciesUrlCount + certifiedPublicSpeciesUrlCount;
