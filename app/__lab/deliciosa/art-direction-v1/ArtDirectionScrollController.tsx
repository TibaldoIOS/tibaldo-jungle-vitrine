"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const reviewScenes = new Set(["origin", "leaf", "climb", "subsurface"]);

export default function ArtDirectionScrollController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".deliciosa-art-lab");
    if (!root) return;
    const scenes = [...root.querySelectorAll<HTMLElement>("[data-art-scene]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const params = new URLSearchParams(window.location.search);
    const reviewScene = params.get("scene") ?? "";
    const reviewProgress = clamp(Number(params.get("progress") ?? "100") / 100);
    const reviewMode = params.get("review") === "1" && reviewScenes.has(reviewScene);
    let frame = 0;

    const staticState = () => {
      root.classList.remove("artlab-motion-active");
      root.classList.add("artlab-motion-static");
      document.body.classList.remove("artlab-story-active");
      scenes.forEach((scene) => scene.style.setProperty("--art-p", "1"));
    };

    const inspectState = () => {
      const target = root.querySelector<HTMLElement>(`[data-art-scene-id="${reviewScene}"]`);
      if (!target) return staticState();
      root.classList.remove("artlab-motion-static");
      root.classList.add("artlab-motion-active", "artlab-review-mode");
      root.dataset.reviewScene = reviewScene;
      root.dataset.reviewProgress = String(Math.round(reviewProgress * 100));
      scenes.forEach((scene) => {
        const value = scene === target ? reviewProgress : 1;
        scene.style.setProperty("--art-p", value.toFixed(4));
        scene.dataset.artActive = String(scene === target);
      });
      document.body.classList.add("artlab-story-active");
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };

    const update = () => {
      frame = 0;
      let pinned = false;
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / distance);
        scene.style.setProperty("--art-p", progress.toFixed(4));
        scene.dataset.artActive = String(rect.top <= 12 && rect.bottom >= window.innerHeight - 12);
        if (scene.dataset.artActive === "true" && scene.dataset.artSticky === "true") pinned = true;
      }
      document.body.classList.toggle("artlab-story-active", pinned);
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      window.removeEventListener("scroll", schedule);
      if (reviewMode) return inspectState();
      if (reduced.matches) return staticState();
      root.classList.remove("artlab-motion-static");
      root.classList.add("artlab-motion-active");
      window.addEventListener("scroll", schedule, { passive: true });
      schedule();
    };

    configure();
    reduced.addEventListener("change", configure);
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pageshow", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      reduced.removeEventListener("change", configure);
      document.body.classList.remove("artlab-story-active");
      root.classList.remove("artlab-review-mode");
    };
  }, []);
  return null;
}
