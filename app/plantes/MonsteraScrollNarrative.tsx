"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./MonsteraScrollNarrative.module.css";

const chapters = ["Entières", "Fenêtrées", "Découpées", "Panachées"];

export default function MonsteraScrollNarrative() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const range = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-scene.getBoundingClientRect().top / range, 0), 1);
      scene.style.setProperty("--narrative-progress", progress.toFixed(3));
      scene.dataset.phase = String(Math.min(Math.floor(progress * chapters.length), chapters.length - 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <section ref={sceneRef} className={styles.scene} data-phase="0" aria-labelledby="monstera-narrative-title">
    <div className={styles.stickyFrame}>
      <Image className={styles.image} src="/monstera-collection-feuilles-tibaldo.webp" alt="" width={1254} height={1254} sizes="100vw" loading="lazy" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`${styles.content} shell`}>
        <p className={styles.eyebrow}>01 · Lire le feuillage</p>
        <h2 id="monstera-narrative-title">Un genre,<br /><em>plusieurs architectures.</em></h2>
        <p className={styles.intro}>Les feuilles évoluent avec l’âge, la lumière et le support. Leurs silhouettes racontent une même stratégie de croissance.</p>
        <div className={styles.chapters} aria-label="Quatre formes de feuillage chez les Monstera">
          {chapters.map((chapter, index) => <span key={chapter} data-index={index}>{chapter}</span>)}
        </div>
        <p className={styles.reducedSummary}>Feuilles entières, fenêtrées, découpées et panachées : une diversité de formes au sein du genre.</p>
      </div>
    </div>
  </section>;
}
