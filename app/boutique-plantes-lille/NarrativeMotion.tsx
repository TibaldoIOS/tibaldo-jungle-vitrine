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
    const selectionScene = document.querySelector<HTMLElement>('#selection');
    const choice = document.querySelector<HTMLElement>('#chez-vous');
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const paint = () => {
      frame = 0;
      const desktop = window.innerWidth > 700;
      selectionScene?.toggleAttribute('data-scroll-scenes', desktop && !reduced.matches);
      chapters.forEach((chapter, index) => {
        const element = chapter as HTMLElement;
        const next = chapters[index + 1]?.getBoundingClientRect();
        const progress = desktop && next ? clamp((420 - next.top) / 320) : 0;
        element.style.setProperty('--handover', String(progress));
      });
      if (choice) {
        const progress = clamp((window.innerHeight - choice.getBoundingClientRect().top) / (window.innerHeight * .8));
        choice.style.setProperty('--arrival', String(reduced.matches ? 1 : progress));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    paint();
    return () => {
      observer.disconnect(); journey.disconnect(); selection.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
      selectionScene?.removeAttribute('data-scroll-scenes');
      chapters.forEach(chapter => (chapter as HTMLElement).style.removeProperty('--handover'));
      choice?.style.removeProperty('--arrival');
    };
  }, []);
  return null;
}
