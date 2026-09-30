import type { JungleEvent } from "./types";

/** Requalify the opening archive without rewriting stored event data or dates. */
export function publicEventCopy(event: JungleEvent, now = Date.now()): JungleEvent {
  if (event.slug !== "ouverture-tibaldo-jungle-lille" || new Date(event.endAt ?? event.startAt).getTime() >= now) return event;
  return {
    ...event,
    excerpt: "Événement passé · Ouverture du Studio Végétal – Tibaldo Jungle à Lille le 26 septembre 2026.",
    description: "Cette page conserve l’annonce de l’ouverture du Studio Végétal – Tibaldo Jungle du 26 septembre 2026, au 3 place de l’Arbonnoise à Lille. L’événement est terminé. Le Studio vous accueille désormais aux horaires habituels indiqués sur la page Contact.",
    seoTitle: "Archive de l’ouverture du Studio Végétal à Lille — 26 septembre 2026",
    seoDescription: "Archive de l’ouverture de Tibaldo Jungle à Lille le 26 septembre 2026. L’événement est terminé ; retrouvez l’adresse et les horaires actuels du Studio.",
    faq: [
      { question: "L’événement est-il terminé ?", answer: "Oui. Cette page est l’archive de l’événement du 26 septembre 2026. Il n’est plus possible de s’y inscrire." },
      { question: "Comment visiter le Studio aujourd’hui ?", answer: "Retrouvez l’adresse, les horaires habituels et les itinéraires sur la page Contact du Studio Végétal – Tibaldo Jungle." },
    ],
  };
}
