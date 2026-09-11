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
    return () => observer.disconnect();
  }, []);
  return null;
}
