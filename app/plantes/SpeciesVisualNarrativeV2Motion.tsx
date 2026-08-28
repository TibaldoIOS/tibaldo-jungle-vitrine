"use client";

import { useEffect } from "react";

const sectionIds = ["identite", "entretien", "problemes", "comparaison", "faq"];

export default function SpeciesVisualNarrativeV2Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".jungle-v19");
    if (!page) return;

    const revealElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-v19-reveal]"),
    );
    const depthElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-v19-depth]"),
    );
    const navLinks = Array.from(
      page.querySelectorAll<HTMLAnchorElement>(".v19-story-nav a"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    root.classList.add("v19-motion-ready");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    const revealObserver = reducedMotion.matches
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -9% 0px" },
        );

    revealElements.forEach((element) => revealObserver?.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active?.target.id) return;
        navLinks.forEach((link) => {
          const selected = link.hash === `#${active.target.id}`;
          link.classList.toggle("is-active", selected);
          if (selected) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { threshold: [0.05, 0.3], rootMargin: "-23% 0px -63% 0px" },
    );

    sectionIds.forEach((id) => {
      const section = page.querySelector<HTMLElement>(`#${id}`);
      if (section) sectionObserver.observe(section);
    });

    let animationFrame = 0;
    const updateDepth = () => {
      animationFrame = 0;
      if (reducedMotion.matches || window.innerWidth < 720) return;
      const viewportHeight = window.innerHeight;
      depthElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > viewportHeight + 160) return;
        const center = rect.top + rect.height / 2;
        const progress = (center - viewportHeight / 2) / viewportHeight;
        const strength = Number(element.dataset.v19Depth) || 14;
        const offset = Math.max(-strength, Math.min(strength, progress * -strength));
        element.style.setProperty("--v19-depth-y", `${offset.toFixed(2)}px`);
      });
    };
    const scheduleDepth = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateDepth);
    };

    scheduleDepth();
    window.addEventListener("scroll", scheduleDepth, { passive: true });
    window.addEventListener("resize", scheduleDepth);

    return () => {
      revealObserver?.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", scheduleDepth);
      window.removeEventListener("resize", scheduleDepth);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.classList.remove("v19-motion-ready");
    };
  }, []);

  return null;
}
