import { jungleLocalIdentity } from '../jungle-local-identity.ts';
export const anthuriumWeekendPath = '/evenements/week-end-anthurium-octobre-2026';
export const anthuriumWeekendUrl = `https://jungle.tibaldo.fr${anthuriumWeekendPath}`;
export const anthuriumWeekendDays = [
  { date:'2026-10-10', label:'Samedi 10 octobre 2026', opens:'10:00', closes:'19:00' },
  { date:'2026-10-11', label:'Dimanche 11 octobre 2026', opens:'10:00', closes:'13:00' },
];
export const anthuriumWeekendStart = `${anthuriumWeekendDays[0].date}T${anthuriumWeekendDays[0].opens}:00+02:00`;
export const anthuriumWeekendEnd = `${anthuriumWeekendDays[1].date}T${anthuriumWeekendDays[1].closes}:00+02:00`;
export const anthuriumWeekendState = (now: number) => now >= Date.parse(anthuriumWeekendEnd) ? 'ended' : now >= Date.parse(anthuriumWeekendStart) ? 'current' : 'upcoming';
export const anthuriumArrival = [
  {slug:'luxurians', name:'Anthurium luxurians', pot:12, height:25, expected:6, characteristic:'Feuilles épaisses, relief gaufré et nuances changeantes à l’ouverture.'},
  {slug:'luxurians-radicans', name:'Anthurium luxurians × radicans', pot:6, height:15, expected:12, characteristic:'Un hybride horticole, à distinguer des espèces botaniques et de leurs formes adultes.'},
  {slug:'magnificum', name:'Anthurium magnificum', pot:12, height:35, expected:6, characteristic:'Grand limbe en cœur, velouté, souligné de nervures claires.'},
  {slug:'regale', name:'Anthurium regale', pot:6, height:15, expected:12, characteristic:'Des feuilles cordiformes qui prennent de l’ampleur avec la maturité.'},
  {slug:'veitchii', name:'Anthurium veitchii', pot:6, height:20, expected:12, characteristic:'De longues feuilles pendantes dont les ondulations s’affirment en grandissant.'},
] as const;
export type ValidatedWeekendOffer = { ownerApproved: true; regularPrice: number; weekendPrice: number; availability: string; validFrom: string; validUntil: string };
// Aucun tarif ni état de stock n'a été approuvé pour publication.
export const anthuriumWeekendOffers: Partial<Record<string, ValidatedWeekendOffer>> = {};
export function visibleWeekendOffer(offer: ValidatedWeekendOffer | undefined, now: number) {
  return offer?.ownerApproved === true && Number.isFinite(offer.regularPrice) && Number.isFinite(offer.weekendPrice) && offer.regularPrice > 0 && offer.weekendPrice > 0 && offer.weekendPrice <= offer.regularPrice && now >= Date.parse(offer.validFrom) && now < Date.parse(offer.validUntil) ? offer : null;
}
export function anthuriumEventSchema(image?: string) {
  const i=jungleLocalIdentity;
  return {'@context':'https://schema.org','@type':'Event','@id':`${anthuriumWeekendUrl}#event`,name:'Week-end Anthurium à Lille',url:anthuriumWeekendUrl,startDate:anthuriumWeekendStart,endDate:anthuriumWeekendEnd,eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',eventStatus:'https://schema.org/EventScheduled',description:`Rencontre en boutique autour de cinq Anthurium : découverte des feuillages, comparaison des morphologies et conseils de culture. ${anthuriumWeekendDays.map(day => `${day.label} : ${day.opens}–${day.closes}`).join(', ')}. Arrivage de 48 plantes prévu le 6 octobre ; achats sur place selon les disponibilités.`,...(image?{image:[image]}:{}),location:{'@type':'Place','@id':i.storeId,name:i.storeName,address:{'@type':'PostalAddress',streetAddress:i.streetAddress,postalCode:i.postalCode,addressLocality:i.city,addressCountry:i.countryCode},geo:{'@type':'GeoCoordinates',latitude:i.latitude,longitude:i.longitude}},organizer:{'@type':'Organization','@id':i.organizationId,name:i.brandName,url:i.canonicalStoreUrl}};
}
