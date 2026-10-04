'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { anthuriumWeekendPath, anthuriumWeekendState } from '@/lib/events/anthurium-weekend';
import styles from './HomeOpeningBanner.module.css';
export default function AnthuriumWeekendLink({archive=false}: {archive?:boolean}) {
  const [state,setState]=useState<ReturnType<typeof anthuriumWeekendState>|null>(null);
  useEffect(()=>{const refresh=()=>setState(anthuriumWeekendState(Date.now()));refresh();const timer=setInterval(refresh,60000);return()=>clearInterval(timer)},[]);
  // Sans JavaScript : lien daté neutre, jamais une promesse d’événement à venir.
  if(state==='ended'&&!archive)return null;
  return <aside className={styles.banner} aria-label="Week-end Anthurium"><div className={`shell ${styles.inner}`}><div className={styles.date}><p className={styles.kicker}>{state==='ended'?'Événement terminé':'Au Studio Végétal · Lille'}</p><strong>10–11 octobre 2026</strong></div><div className={styles.copy}><h2>Week-end Anthurium</h2><p>Feuillages de collection, cinq références et conseils de culture.</p></div><Link className={styles.cta} href={anthuriumWeekendPath}>{state==='ended'?'Revoir le week-end Anthurium':'Découvrir le week-end Anthurium'} →</Link></div></aside>;
}
