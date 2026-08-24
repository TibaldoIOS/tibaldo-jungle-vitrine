"use client";
import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function KnowledgeScrollController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".deliciosa-knowledge-v4");
    if (!root) return;
    const scenes = [...root.querySelectorAll<HTMLElement>("[data-knowledge-scene]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedReduced = new URLSearchParams(window.location.search).has("reduced-motion");
    let frame = 0;
    const staticState = () => { root.classList.remove("v4-motion-active"); root.classList.add("v4-motion-static"); scenes.forEach((scene) => scene.style.setProperty("--v4-progress", "1")); };
    const update = () => {
      frame = 0;
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        scene.style.setProperty("--v4-progress", clamp(-rect.top / distance).toFixed(4));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      window.removeEventListener("scroll", schedule);
      if (reduced.matches || forcedReduced) return staticState();
      root.classList.remove("v4-motion-static"); root.classList.add("v4-motion-active");
      window.addEventListener("scroll", schedule, { passive: true }); schedule();
    };
    configure(); reduced.addEventListener("change", configure); window.addEventListener("resize", schedule, { passive: true }); window.addEventListener("pageshow", schedule);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.removeEventListener("pageshow", schedule); reduced.removeEventListener("change", configure); };
  }, []);
  return null;
}
