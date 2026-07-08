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

// Direct subsidiaries of Rothenbury Group (parent holding co).
// Northstone holds the operating brands; Thornwell Media is the independent
// agency subsidiary.
const SUB_ORGS = [
  {
    "@type": "Organization",
    "@id": "https://northstoneholdings.com/#organization",
    name: "Northstone Holdings",
    url: "https://northstoneholdings.com",
  },
  {
    "@type": "Organization",
    "@id": "https://thornwellmedia.com/#organization",
    name: "Thornwell Media",
    url: "https://thornwellmedia.com",
  },
];

// Toll-free corporate line confirmed in the master NAP sheet 2026-05-15.
const ROTH_TEL = "+1-877-867-4555";

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
    logo: "https://www.rothenbury.com/og-default.png",
    telephone: ROTH_TEL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ROTH_TEL,
        contactType: "corporate office",
        availableLanguage: ["en"],
        areaServed: ["US", "CA"],
      },
    ],
    subOrganization: SUB_ORGS,
    sameAs: SOCIAL_URLS,
  };

  if (address) schema.address = address;
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
    alternateName: BRAND.shortName,
    publisher: { "@id": "https://www.rothenbury.com/#organization" },
    inLanguage: "en-CA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.rothenbury.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Sitelinks engineering: primary nav SiteNavigationElement ItemList.
// Helps Google identify the canonical 5-6 pages we want as sitelinks.
export function siteNavigationSchema() {
  const base = "https://www.rothenbury.com";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}/#sitenav`,
    name: `${BRAND.publicName} primary navigation`,
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Portfolio", url: `${base}/portfolio` },
      { "@type": "SiteNavigationElement", position: 2, name: "About", url: `${base}/about` },
      { "@type": "SiteNavigationElement", position: 3, name: "Leadership", url: `${base}/leadership` },
      { "@type": "SiteNavigationElement", position: 4, name: "Insights", url: `${base}/insights` },
      { "@type": "SiteNavigationElement", position: 5, name: "Contact", url: `${base}/contact` },
    ],
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
