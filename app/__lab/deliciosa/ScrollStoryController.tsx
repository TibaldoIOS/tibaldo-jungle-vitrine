"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function ScrollStoryController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".deliciosa-scroll-story-d");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedReducedMotion = new URLSearchParams(window.location.search).has("reduced-motion");
    const sequences = Array.from(root.querySelectorAll<HTMLElement>("[data-story-sequence]"));
    let frame = 0;

    const setFinalState = () => {
      root.classList.remove("scroll-story-active");
      root.classList.add("scroll-story-reduced");
      sequences.forEach((sequence) => sequence.style.setProperty("--story-progress", "1"));
    };

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const reads = sequences.map((sequence) => {
        const rect = sequence.getBoundingClientRect();
        const distance = Math.max(1, rect.height - viewportHeight);
        return { sequence, progress: clamp(-rect.top / distance) };
      });

      reads.forEach(({ sequence, progress }) => {
        sequence.style.setProperty("--story-progress", progress.toFixed(4));
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const configure = () => {
      if (reducedMotion.matches || forcedReducedMotion) {
        if (frame) window.cancelAnimationFrame(frame);
        setFinalState();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        return;
      }

      root.classList.remove("scroll-story-reduced");
      root.classList.add("scroll-story-active");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
    };

    configure();
    reducedMotion.addEventListener("change", configure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", configure);
    };
  }, []);

  return null;
}
