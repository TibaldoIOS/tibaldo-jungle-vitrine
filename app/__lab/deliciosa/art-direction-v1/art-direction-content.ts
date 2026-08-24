import contentMaster from "@/botanical-evidence/pilots/monstera-deliciosa/v1/owner-decisions-content-master-final-v1/content-master-v1-final.json";

type ContentUnit = (typeof contentMaster.content_units)[number];
const byId = new Map(contentMaster.content_units.map((unit) => [unit.content_id, unit]));

export function artDirectionContent(id: string): ContentUnit {
  const unit = byId.get(id);
  if (!unit) throw new Error(`Missing frozen Content Master unit: ${id}`);
  if (unit.safety_flag || !unit.publication_eligibility.startsWith("V4_ELIGIBLE")) {
    throw new Error(`Ineligible Art Direction LAB unit: ${id}`);
  }
  return unit;
}

export const artDirectionContentIds = [
  "content.origin.range",
  "content.origin.habitat",
  "content.morphology.heteroblasty",
  "content.support.role",
  "content.aerial-roots.role",
  "content.rootzone.substrate",
  "content.rootzone.pot",
  "content.rootzone.repotting",
  "content.care.fertilisation",
] as const;

