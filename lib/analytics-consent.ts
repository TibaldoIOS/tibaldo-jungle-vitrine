export const JUNGLE_GTM_CONTAINER_ID = "GTM-PHFLQD3Z";
export const JUNGLE_GA4_MEASUREMENT_ID = "G-JTF12TGBJX";
export const ANALYTICS_CONSENT_STORAGE_KEY = "tibaldo_analytics_consent_v1";
export const ANALYTICS_CONSENT_VERSION = "2026-09-17";

export type AnalyticsConsentChoice = "granted" | "denied";

export const isAnalyticsConsentChoice = (value: string | null): value is AnalyticsConsentChoice =>
  value === "granted" || value === "denied";
