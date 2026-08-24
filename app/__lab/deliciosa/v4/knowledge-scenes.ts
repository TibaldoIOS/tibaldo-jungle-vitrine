import contentMaster from "@/botanical-evidence/pilots/monstera-deliciosa/v1/human-review-content-master-v1/content-master-v1.json";
import diagnosticsData from "@/botanical-evidence/pilots/monstera-deliciosa/v1/human-review-content-master-v1/diagnostics-v1.json";
import faqData from "@/botanical-evidence/pilots/monstera-deliciosa/v1/human-review-content-master-v1/faq-v1.json";

export type KnowledgeUnit = (typeof contentMaster.content_units)[number];
const byId = new Map(contentMaster.content_units.map((unit) => [unit.content_id, unit]));

export const knowledge = (...ids: string[]) => ids.map((id) => {
  const unit = byId.get(id);
  if (!unit) throw new Error(`Missing Content Master unit: ${id}`);
  if (unit.safety_flag || unit.publication_status === "INTERNAL_ONLY") throw new Error(`Ineligible V4 unit: ${id}`);
  return unit;
});

export const v4Scenes = [
  { id: "identity", act: "I", contentIds: ["content.origin.range", "content.origin.habitat"], motionLevel: 4, sticky: true, viewports: 2.2 },
  { id: "leaf", act: "II", contentIds: ["content.morphology.heteroblasty"], motionLevel: 5, sticky: true, viewports: 3 },
  { id: "fenestrations", act: "III", contentIds: ["content.morphology.fenestrations"], motionLevel: 3, sticky: false, viewports: 1 },
  { id: "environment", act: "IV", contentIds: ["content.care.light", "content.care.humidity", "content.care.temperature"], motionLevel: 3, sticky: false, viewports: 1.2 },
  { id: "water", act: "V", contentIds: ["content.care.watering"], motionLevel: 4, sticky: true, viewports: 2.4 },
  { id: "rootzone", act: "VI", contentIds: ["content.rootzone.substrate", "content.rootzone.pot", "content.rootzone.repotting", "content.care.fertilisation"], motionLevel: 5, sticky: true, viewports: 2.6 },
  { id: "climb", act: "VII", contentIds: ["content.support.role", "content.aerial-roots.role"], motionLevel: 4, sticky: true, viewports: 2.2 },
  { id: "scale", act: "VIII", contentIds: ["content.dimensions.context", "content.pruning.cleaning"], motionLevel: 3, sticky: false, viewports: 1 },
  { id: "diagnostic", act: "IX", contentIds: ["content.pests.documented"], motionLevel: 1, sticky: false, viewports: 1 },
  { id: "studio", act: "X", contentIds: ["content.studio.observation"], motionLevel: 2, sticky: false, viewports: 1 },
  { id: "faq", act: "XI", contentIds: [], motionLevel: 1, sticky: false, viewports: 1 },
  { id: "sources", act: "XII", contentIds: [], motionLevel: 0, sticky: false, viewports: 1 },
] as const;

const diagnosticIds = ["diagnostic.md.yellow-leaves", "diagnostic.md.brown-tips-patches", "diagnostic.md.slow-growth-small-leaves", "diagnostic.md.no-fenestrations", "diagnostic.md.spider-mites", "diagnostic.md.scale-mealybugs"];
export const v4Diagnostics = diagnosticsData.diagnostics.filter((item) => diagnosticIds.includes(item.diagnostic_id) && item.publication_status !== "INTERNAL_ONLY");
export const v4Faq = faqData.faq.filter((item) => !item.safety_flag && item.publication_status !== "INTERNAL_ONLY");
export const v4Sources = contentMaster.sources.filter((source) => contentMaster.content_units.some((unit) => !unit.safety_flag && unit.publication_status !== "INTERNAL_ONLY" && (unit.supporting_source_ids as string[]).includes(source.source_id)));
