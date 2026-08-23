"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { deliciosaNextDiagnostics } from "@/lib/plants/deliciosa-next";

const sections = [
  ["apercu", "Aperçu"],
  ["identite", "Identité"],
  ["cultiver", "Cultiver"],
  ["diagnostic", "Diagnostic"],
  ["comparer", "Comparer"],
  ["faq", "FAQ"],
] as const;

export function SpeciesNextMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".species-next-page");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-next-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.classList.add("next-motion-ready");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function SpeciesNextSectionNav() {
  const [active, setActive] = useState("apercu");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -66% 0px", threshold: [0.05, 0.25] });
    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);

  return (
    <div className="species-next-nav-shell">
      <p>Dans cette fiche</p>
      <nav ref={navRef} className="species-next-nav" aria-label="Sommaire de la fiche Monstera deliciosa">
        {sections.map(([id, label], index) => (
          <a aria-current={active === id ? "location" : undefined} className={active === id ? "is-active" : undefined} href={`#${id}`} key={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
          </a>
        ))}
      </nav>
    </div>
  );
}
type DiagnosticItem = (typeof deliciosaNextDiagnostics)[number];

export function SpeciesNextDiagnostic({ items }: { items: readonly DiagnosticItem[] }) {
  const groupId = useId();
  const [active, setActive] = useState(0);
  return (
    <div className="species-next-diagnostic-system">
      <div className="species-next-diagnostic-index" aria-label="Signes observés">
        {items.map((item, index) => {
          const selected = active === index;
          return (
            <button aria-controls={`${groupId}-diagnostic-${index}`} aria-expanded={selected} className={selected ? "is-active" : undefined} key={item.title} onClick={() => setActive(selected ? -1 : index)} type="button">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <i aria-hidden="true">{selected ? "−" : "+"}</i>
            </button>
          );
        })}
      </div>
      <div className="species-next-diagnostic-panels">
        {items.map((item, index) => {
          const selected = active === index;
          return (
            <article aria-hidden={!selected} className={selected ? "is-active" : undefined} id={`${groupId}-diagnostic-${index}`} key={item.title}>
              <div><span>Symptôme</span><p>{item.symptom}</p></div>
              <div><span>Causes possibles</span><p>{item.causes}</p></div>
              <div><span>Comment vérifier</span><p>{item.verify}</p></div>
              <div><span>Action conseillée</span><p>{item.action}</p></div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
