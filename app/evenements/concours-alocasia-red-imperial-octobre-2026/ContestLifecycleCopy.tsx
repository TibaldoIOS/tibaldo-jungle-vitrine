'use client';
import { useEffect, useState } from 'react';
import { alocasiaContestState } from '@/lib/events/alocasia-red-imperial-contest';
export function ContestLifecycleCopy({ slot }: { slot: 'hero-kicker' | 'hero-copy' | 'hero-action' | 'participation-kicker' }) {
  const [ended, setEnded] = useState(false);
  useEffect(() => { const refresh = () => setEnded(alocasiaContestState(Date.now()) === 'ended'); refresh(); const timer = setInterval(refresh, 60000); return () => clearInterval(timer); }, []);
  if (slot === 'hero-kicker') return ended ? <>Concours terminé · archive éditoriale</> : <>Concours végétal · Lille</>;
  if (slot === 'hero-copy') return ended ? <>Les participations sont closes depuis le dimanche 11 octobre 2026 à 13 h. Cette page conserve les modalités annoncées.</> : <>Participez sur Instagram ou Facebook avant le dimanche 11 octobre 2026 à 13 h, heure de Lille.</>;
  if (slot === 'hero-action') return ended ? <>Revoir les modalités ↓</> : <>Comment participer ↓</>;
  return ended ? <>Modalités archivées</> : <>Participer maintenant</>;
}
