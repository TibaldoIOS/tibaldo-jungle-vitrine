import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  JUNGLE_GA4_MEASUREMENT_ID,
  JUNGLE_GTM_CONTAINER_ID,
} from "../lib/analytics-consent.ts";

const component = readFileSync(new URL("../app/AnalyticsConsent.tsx", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const privacy = readFileSync(new URL("../app/politique-confidentialite/page.tsx", import.meta.url), "utf8");
const worker = readFileSync(new URL("../worker/index.ts", import.meta.url), "utf8");
const linksTracking = readFileSync(new URL("../lib/links-open-tracking.ts", import.meta.url), "utf8");

test("Jungle loads only the approved GTM container after explicit consent", () => {
  assert.equal(JUNGLE_GTM_CONTAINER_ID, "GTM-PHFLQD3Z");
  assert.equal(JUNGLE_GA4_MEASUREMENT_ID, "G-JTF12TGBJX");
  assert.equal(ANALYTICS_CONSENT_STORAGE_KEY, "tibaldo_analytics_consent_v1");
  assert.match(component, /googletagmanager\.com\/gtm\.js\?id=/);
  assert.doesNotMatch(component, /googletagmanager\.com\/gtag\/js/);
  assert.match(component, /consentCommand\("denied", "default"\)/);
  assert.match(component, /if \(next === "granted"\) loadGtm\(\)/);
  assert.match(component, /site_surface: "jungle"/);
  assert.match(component, /site_hostname: window\.location\.hostname/);
  assert.match(layout, /isPublicJungleDeployment \? <AnalyticsConsent \/>/);
});

test("consent remains reversible, documented and CSP-bounded", () => {
  assert.match(component, /Gérer les cookies/);
  assert.match(component, /Continuer sans mesure/);
  assert.match(privacy, /Google Tag Manager/);
  assert.match(privacy, /Google Analytics 4/);
  assert.match(worker, /https:\/\/www\.googletagmanager\.com/);
  assert.match(worker, /https:\/\/www\.google-analytics\.com/);
});

test("the independent links counter contract remains present", () => {
  assert.match(linksTracking, /LINKS_OPEN_ACTION = "links_open"/);
  assert.match(linksTracking, /LINKS_OPEN_TEST_ACTION = "links_open_test"/);
  assert.match(linksTracking, /LINKS_OPEN_PATH = "\/liens"/);
});
