import Image from 'next/image';
import styles from './AnthuriumLeafTable.module.css';

export const anthuriumBoard = {
  src: '/owner-media/anthurium-board/anthurium-leaf-table-owner-reference-v1.webp',
  width: 1427,
  height: 1102,
  alt: 'Tableau comparatif de feuilles de plusieurs espèces d’Anthurium',
};

export default function AnthuriumLeafTable() {
  return <section className={`${styles.table} shell`} aria-labelledby="anthurium-leaf-table-title">
    <p className={styles.eyebrow}>Le feuillage, en regard</p>
    <h2 id="anthurium-leaf-table-title">Les Anthurium.<br/><em>Une diversité de silhouettes.</em></h2>
    <figure><a href={anthuriumBoard.src} aria-label="Ouvrir le tableau des feuilles d’Anthurium en grand">
      <Image unoptimized {...anthuriumBoard} alt={anthuriumBoard.alt} loading="lazy" sizes="(max-width: 700px) 100vw, 1200px"/>
    </a><figcaption>Planche illustrative · <a href={anthuriumBoard.src}>Voir en grand ↗</a></figcaption></figure>
  </section>;
}
