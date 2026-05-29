/**
 * JSON-LD generators for Rothenbury Group.
 *
 * Where NAP fields are unconfirmed, the schema omits them rather than emitting
 * placeholder strings - populating LocalBusiness with [TBD] would be a structured
 * misrepresentation under MSA Section 11.2(f).
 */

import { BRAND, NAP, SOCIAL, TBD, HOURS } from "./constants";

const SOCIAL_URLS = Object.values(SOCIAL);

const isConfirmed = (value: string) => value !== TBD && value.length > 0;

export function organizationSchema() {
  const address =
    isConfirmed(NAP.street) && isConfirmed(NAP.city)
      ? {
          "@type": "PostalAddress",
          streetAddress: NAP.street,
          addressLocality: NAP.city,
          addressRegion: NAP.region,
          postalCode: NAP.postalCode,
          addressCountry: NAP.country,
        }
      : undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.rothenbury.com/#organization",
    name: BRAND.legalName,
    alternateName: BRAND.shortName,
    description: BRAND.shortDescription,
    url: "https://www.rothenbury.com/",
    sameAs: SOCIAL_URLS,
  };

  if (address) schema.address = address;
  if (isConfirmed(NAP.phoneE164)) schema.telephone = NAP.phoneE164;
  if (isConfirmed(NAP.email)) schema.email = NAP.email;

  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.rothenbury.com/#website",
    url: "https://www.rothenbury.com/",
    name: BRAND.publicName,
    publisher: { "@id": "https://www.rothenbury.com/#organization" },
    inLanguage: "en-CA",
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function placeSchema(opts: {
  name: string;
  region: string;
  country: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${opts.name}, ${opts.region}, ${opts.country}`,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: opts.region,
      containedInPlace: {
        "@type": "Country",
        name: opts.country,
      },
    },
  };
}

export function contactPageSchema() {
  const contactPoint: Record<string, unknown> = {
    "@type": "ContactPoint",
    contactType: "corporate",
    availableLanguage: ["en"],
  };
  if (isConfirmed(NAP.phoneE164)) contactPoint.telephone = NAP.phoneE164;
  if (isConfirmed(NAP.email)) contactPoint.email = NAP.email;

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${BRAND.publicName}`,
    url: "https://www.rothenbury.com/contact/",
    mainEntity: {
      "@id": "https://www.rothenbury.com/#organization",
    },
    contactPoint,
  };
}

export function openingHoursSpec() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ];
}

export const HOURS_NOTE = HOURS.note;
