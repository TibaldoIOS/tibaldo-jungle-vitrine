export type LinksOpenAlertPayload = {
  event_id: string;
  kind: "visit" | "test";
  occurred_at: string;
  path: "/liens";
};

export function isLinksOpenAlertPayload(value: unknown): value is LinksOpenAlertPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some((key) => !["event_id", "kind", "occurred_at", "path"].includes(key))) return false;
  return typeof input.event_id === "string"
    && /^(?:links-open-|links-test-)[A-Za-z0-9-]{1,100}$/.test(input.event_id)
    && (input.kind === "visit" || input.kind === "test")
    && input.path === "/liens"
    && typeof input.occurred_at === "string"
    && Number.isFinite(Date.parse(input.occurred_at));
}
