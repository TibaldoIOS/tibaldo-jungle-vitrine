"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./AnalyticsConsent.module.css";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_CONSENT_VERSION,
  isAnalyticsConsentChoice,
  JUNGLE_GA4_MEASUREMENT_ID,
  JUNGLE_GTM_CONTAINER_ID,
  type AnalyticsConsentChoice,
} from "@/lib/analytics-consent";

declare global {
  interface Window { dataLayer?: unknown[]; }
}

const gtmScriptId = "tibaldo-gtm-consented";

function dataLayer() {
  window.dataLayer ??= [];
  return window.dataLayer;
}

function consentCommand(state: AnalyticsConsentChoice, mode: "default" | "update") {
  const queue = dataLayer();
  function gtag(
    _command: "consent",
    _mode: "default" | "update",
    _parameters: Record<string, string>,
  ) {
    void _command;
    void _mode;
    void _parameters;
    // GTM's consent API expects the native arguments object, not a custom event.
    // eslint-disable-next-line prefer-rest-params
    queue.push(arguments);
  }
  gtag("consent", mode, {
    analytics_storage: state,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

function loadGtm() {
  if (document.getElementById(gtmScriptId)) return;
  const script = document.createElement("script");
  script.id = gtmScriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${JUNGLE_GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsConsentChoice | "unset">("unset");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    consentCommand("denied", "default");
    dataLayer().push({
      event: "tibaldo_site_context",
      site_surface: "jungle",
      site_hostname: window.location.hostname,
      ga4_measurement_id: JUNGLE_GA4_MEASUREMENT_ID,
      consent_version: ANALYTICS_CONSENT_VERSION,
    });
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (!isAnalyticsConsentChoice(stored)) return;
    window.queueMicrotask(() => setChoice(stored));
    if (stored === "granted") {
      consentCommand("granted", "update");
      loadGtm();
    }
  }, []);

  useEffect(() => {
    if (choice !== "granted") return;
    const currentPath = `${pathname}${window.location.search}`;
    if (lastTrackedPath.current === currentPath) return;
    lastTrackedPath.current = currentPath;
    dataLayer().push({
      event: "tibaldo_virtual_page_view",
      page_path: currentPath,
      page_hostname: window.location.hostname,
      site_surface: "jungle",
    });
  }, [choice, pathname]);

  const save = (next: AnalyticsConsentChoice) => {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, next);
    consentCommand(next, "update");
    setChoice(next);
    setPreferencesOpen(false);
    if (next === "granted") loadGtm();
  };

  if (choice !== "unset" && !preferencesOpen) {
    return <button className={styles.manage} type="button" onClick={() => setPreferencesOpen(true)}>Gérer les cookies</button>;
  }

  return <aside className={styles.banner} aria-label="Choix de mesure d’audience">
    <strong>Votre visite, votre choix.</strong>
    <p>Avec votre accord, une mesure d’audience Google Analytics nous aide à comprendre les pages consultées. Aucun traceur de mesure n’est chargé avant votre acceptation. <Link href="/politique-confidentialite#cookies">En savoir plus</Link>.</p>
    <div className={styles.actions}>
      <button type="button" onClick={() => save("granted")}>Accepter la mesure</button>
      <button type="button" onClick={() => save("denied")}>Continuer sans mesure</button>
    </div>
  </aside>;
}
