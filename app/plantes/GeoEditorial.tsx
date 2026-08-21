import type { GeoBrief } from "@/lib/geo/editorial";
import Link from "next/link";

const formatDate = (date: string) => new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

export function GeoBriefSection({ brief }: { brief: GeoBrief }) {
  return <section className="geo-brief plant-profile-section" aria-labelledby="geo-brief-title" data-reveal>
    <header><p className="section-kicker">En bref</p><h2 id="geo-brief-title">La réponse essentielle.</h2></header>
    <p className="geo-brief-answer">{brief.answer}</p>
    <dl>{brief.points.map((point) => <div key={point.label}><dt>{point.label}</dt><dd>{point.value}</dd></div>)}</dl>
  </section>;
}

export function EditorialProvenance({ publishedAt, updatedAt }: { publishedAt: string; updatedAt: string }) {
  return <aside className="editorial-provenance" aria-label="Responsabilité et méthode éditoriales" data-reveal>
    <div><span>Éditeur responsable</span><strong>Studio Végétal – Tibaldo Jungle</strong><p>Contenu encyclopédique publié par Tibaldo Jungle à Lille.</p></div>
    <div><span>Repères éditoriaux</span><p><b>Fait botanique</b> : vérifié auprès de références identifiées. <b>Conseil horticole</b> : à adapter au climat, au pot et aux conditions réelles. <b>Information commerciale</b> : séparée de l’identité botanique durable.</p></div>
    <div><span>Dates</span><p>Publié le <time dateTime={publishedAt}>{formatDate(publishedAt)}</time><br />Révisé le <time dateTime={updatedAt}>{formatDate(updatedAt)}</time></p></div>
    <Link href="/methodologie-sources">Consulter notre méthodologie éditoriale →</Link>
  </aside>;
}
