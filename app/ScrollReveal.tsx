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

    const observer = reducedMotion.matches || !("IntersectionObserver" in window) ? null : new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    const registered = new WeakSet<HTMLElement>();
    const register = (element: HTMLElement) => {
      if (registered.has(element)) return;
      registered.add(element);
      if (observer) observer.observe(element);
      else element.classList.add("is-visible");
    };
    const registerWithin = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      const added = [
        ...(node.matches("[data-reveal]") ? [node] : []),
        ...node.querySelectorAll<HTMLElement>("[data-reveal]"),
      ];
      added.forEach((element) => {
        registered.add(element);
        element.classList.add("is-visible");
      });
    };

    elements.forEach(register);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(registerWithin));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    if (!observer) {
      return () => {
        mutationObserver.disconnect();
        root.classList.remove("reveal-ready");
      };
    }

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

        const strength = Math.abs(Number(element.dataset.parallax) || 18);
        const direction = element.dataset.parallaxDirection === "down" ? -1 : 1;
        const position =
          (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const shift = direction * Math.max(
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
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleMotion);
      window.removeEventListener("resize", scheduleMotion);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
