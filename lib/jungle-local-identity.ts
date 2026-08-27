export const jungleLocalIdentity = {
  brandName: "TIBALDO Jungle",
  storeName: "Studio Végétal — TIBALDO Jungle",
  streetAddress: "3 place de l’Arbonnoise",
  postalCode: "59000",
  city: "Lille",
  region: "Hauts-de-France",
  country: "France",
  countryCode: "FR",
  phoneDisplay: "07 43 72 70 79",
  phoneE164: "+33743727079",
  email: "jungle@tibaldo.fr",
  storeId: "https://jungle.tibaldo.fr/#store",
  organizationId: "https://jungle.tibaldo.fr/#organization",
  canonicalStoreUrl: "https://jungle.tibaldo.fr/",
  logoUrl: "https://jungle.tibaldo.fr/tibaldo-jungle-logo.webp",
} as const;

export const jungleOpeningHours = [
  { dayOfWeek: "Monday", closed: true },
  { dayOfWeek: "Tuesday", opens: "14:00", closes: "19:00" },
  { dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  { dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
] as const;

export const jungleOpeningHoursSchema = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:00", closes: "19:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
] as const;

export function jungleStoreStructuredData() {
  const identity = jungleLocalIdentity;
  return {
    "@type": ["GardenStore", "Florist", "LocalBusiness"],
    "@id": identity.storeId,
    name: identity.storeName,
    alternateName: identity.brandName,
    url: identity.canonicalStoreUrl,
    logo: identity.logoUrl,
    email: identity.email,
    telephone: identity.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.streetAddress,
      postalCode: identity.postalCode,
      addressLocality: identity.city,
      addressRegion: identity.region,
      addressCountry: identity.countryCode,
    },
    openingHoursSpecification: jungleOpeningHoursSchema,
    parentOrganization: { "@id": identity.organizationId },
  };
}

export function jungleOrganizationStructuredData() {
  const identity = jungleLocalIdentity;
  return {
    "@type": "Organization",
    "@id": identity.organizationId,
    name: identity.brandName,
    alternateName: identity.storeName,
    url: identity.canonicalStoreUrl,
    logo: identity.logoUrl,
  };
}
