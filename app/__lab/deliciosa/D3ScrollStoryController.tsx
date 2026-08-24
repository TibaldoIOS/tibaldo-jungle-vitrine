"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function D3ScrollStoryController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".deliciosa-scroll-story-d3");
    const scene = root?.querySelector<HTMLElement>("[data-d3-morphology]");
    if (!root || !scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedReducedMotion = new URLSearchParams(window.location.search).has("reduced-motion");
    let frame = 0;

    const setStaticState = () => {
      root.classList.remove("d3-story-active");
      root.classList.add("d3-story-static");
      scene.style.setProperty("--d3-progress", "1");
    };

    const update = () => {
      frame = 0;
      const rect = scene.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      scene.style.setProperty("--d3-progress", clamp(-rect.top / distance).toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onVisibilityChange = () => {
      if (!document.hidden) schedule();
    };

    const configure = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);

      if (reducedMotion.matches || forcedReducedMotion) {
        if (frame) window.cancelAnimationFrame(frame);
        setStaticState();
        return;
      }

      root.classList.remove("d3-story-static");
      root.classList.add("d3-story-active");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      window.addEventListener("orientationchange", schedule, { passive: true });
      schedule();
    };

    configure();
    reducedMotion.addEventListener("change", configure);
    window.addEventListener("pageshow", schedule);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("pageshow", schedule);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", configure);
    };
  }, []);

  return null;
}
