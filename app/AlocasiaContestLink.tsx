'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {alocasiaContestPath,alocasiaContestState} from '@/lib/events/alocasia-red-imperial-contest';
import styles from './AlocasiaContestLink.module.css';
export default function AlocasiaContestLink({archive=false,compact=false}:{archive?:boolean;compact?:boolean}){const [state,setState]=useState<ReturnType<typeof alocasiaContestState>|null>(null);useEffect(()=>{const refresh=()=>setState(alocasiaContestState(Date.now()));refresh();const timer=setInterval(refresh,60000);return()=>clearInterval(timer)},[]);if(state==='ended'&&!archive)return null;return <aside className={`${styles.banner} ${compact?styles.compact:''}`} aria-label="Concours Alocasia Red Imperial"><div className={`shell ${styles.inner}`}><div className={styles.date}><p>{state==='ended'?'Concours terminé':'Concours · Lille'}</p><strong>Jusqu’au 11 octobre · 13 h</strong></div><div className={styles.copy}><h2>Gagnez un Alocasia XXL</h2><p>Environ 1,60 m · valeur 100 €</p></div><Link className={styles.cta} href={alocasiaContestPath}>{state==='ended'?'Revoir le concours':'Participer'} →</Link></div></aside>}
