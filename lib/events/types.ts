export type EventCategory = "atelier" | "ouverture" | "promotion" | "special";
export type EventStatus = "draft" | "published" | "archived";

export type EventProgramItem = { time: string; title: string; description: string };
export type EventFaqItem = { question: string; answer: string };
export type EventGalleryItem = { src: string; alt: string; caption?: string };

export type JungleEvent = {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  status: EventStatus;
  startAt: string;
  endAt: string | null;
  venueName: string;
  address: string;
  postalCode: string;
  city: string;
  excerpt: string;
  description: string;
  program: EventProgramItem[];
  faq: EventFaqItem[];
  gallery: EventGalleryItem[];
  coverImage: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
  mapsUrl: string | null;
  registrationUrl: string | null;
  videoUrl: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  publishedAt: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
};
