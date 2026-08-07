"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const hero = document.querySelector<HTMLElement>(".hero");
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    root.classList.add("reveal-ready");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    let animationFrame = 0;

    const updateMotion = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;

      if (hero) {
        const progress = Math.min(
          Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0),
          1,
        );

        hero.style.setProperty("--hero-photo-y", `${progress * 34}px`);
        hero.style.setProperty("--hero-photo-scale", `${1.04 + progress * 0.025}`);
        hero.style.setProperty("--hero-content-y", `${progress * -42}px`);
        hero.style.setProperty(
          "--hero-content-opacity",
          `${Math.max(0, 1 - progress * 1.35)}`,
        );
      }

      parallaxElements.forEach((element) => {
        const frame = element.parentElement ?? element;
        const rect = frame.getBoundingClientRect();

        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

        const strength = Number(element.dataset.parallax) || 18;
        const position =
          (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const shift = Math.max(
          -strength,
          Math.min(strength, -position * strength),
        );

        element.style.setProperty("--parallax-y", `${shift.toFixed(2)}px`);
      });
    };

    const scheduleMotion = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateMotion);
    };

    scheduleMotion();
    window.addEventListener("scroll", scheduleMotion, { passive: true });
    window.addEventListener("resize", scheduleMotion);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleMotion);
      window.removeEventListener("resize", scheduleMotion);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
