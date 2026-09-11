'use client';

import { useEffect } from 'react';

/** Progressive enhancement: nothing is hidden while JS or observation is absent. */
export default function NarrativeMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-entered', 'true');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-narrative]').forEach(el => observer.observe(el));
    const scene = document.querySelector<HTMLElement>('#services-studio');
    const steps = [...(scene?.querySelectorAll('article') ?? [])];
    const journey = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * .35) - Math.abs(b.boundingClientRect.top - window.innerHeight * .35))[0];
      if (!current || !scene) return;
      scene.dataset.activeService = String(steps.findIndex(step => step === current.target) + 1);
      steps.forEach(step => step.toggleAttribute('data-current', step === current.target));
    }, { rootMargin: '-20% 0px -45% 0px', threshold: 0 });
    steps.forEach(step => journey.observe(step));
    const chapters = [...document.querySelectorAll('#selection article')];
    const selection = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * .35) - Math.abs(b.boundingClientRect.top - window.innerHeight * .35))[0];
      if (current) chapters.forEach(chapter => chapter.toggleAttribute('data-current', chapter === current.target));
    }, { rootMargin: '-15% 0px -40% 0px', threshold: 0 });
    chapters.forEach(chapter => selection.observe(chapter));
    return () => { observer.disconnect(); journey.disconnect(); selection.disconnect(); };
  }, []);
  return null;
}
