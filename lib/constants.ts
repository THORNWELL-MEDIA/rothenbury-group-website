/**
 * Single source of truth for Rothenbury Group NAP and brand constants.
 *
 * Public-facing values use realistic stand-ins. Specific phone, address, and
 * email lines are deliberately not surfaced on the site. Inquiries are routed
 * through the contact form, which is the institutional standard for a holding
 * company at this scale.
 */

export const TBD = "[TBD - awaiting Client confirmation]" as const;

export const BRAND = {
  legalName: "Rothenbury Group",
  shortName: "Rothenbury",
  publicName: "Rothenbury Group",
  tagline: "A privately held diversified holding company. Operating across the United States and Canada.",
  shortDescription:
    "Rothenbury Group is a privately held diversified holding company operating across the United States and Canada, deploying patient capital and shared infrastructure to operator-led businesses.",
  longDescription:
    "Rothenbury Group is a privately held diversified holding company operating across the United States and Canada. The Group deploys patient capital, shared services, governance, and brand integrity to operator-led businesses with durable customer relationships in fragmented markets.",
  positioning: "A privately held diversified holding group, operating across the United States and Canada.",
} as const;

/**
 * Public NAP. The Group does not publish a phone line. Email is routed through
 * the Office of the Group. Address is held at the city level only.
 *
 * Typed as plain strings (not const-literal) so equality checks against TBD
 * narrow correctly across components.
 */
export const NAP: {
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  website: string;
} = {
  name: "Rothenbury Group",
  street: "Office of the Group",
  city: "Toronto",
  region: "Ontario",
  postalCode: "",
  country: "Canada",
  // Phone is intentionally not published. Institutional inquiries route through
  // the contact form. Keep TBD so the visibility check in the header / footer
  // / sticky-CTA hides the phone affordance entirely.
  phoneE164: TBD,
  phoneDisplay: TBD,
  email: "office@rothenbury.com",
  website: "https://www.rothenbury.com",
};

export const HOURS = {
  monday: "9:00 AM - 5:00 PM",
  tuesday: "9:00 AM - 5:00 PM",
  wednesday: "9:00 AM - 5:00 PM",
  thursday: "9:00 AM - 5:00 PM",
  friday: "9:00 AM - 5:00 PM",
  saturday: "Closed",
  sunday: "Closed",
  timezone: "America/Toronto",
  note: "Office hours observed in Eastern Time. Operating partners maintain their own hours by jurisdiction.",
} as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/rothenbury-group",
  facebook: "https://www.facebook.com/rothenburygroup",
  instagram: "https://www.instagram.com/rothenburygroup",
  x: "https://x.com/rothenburygroup",
  youtube: "https://www.youtube.com/@rothenburygroup",
  tiktok: "https://www.tiktok.com/@rothenburygroup",
  pinterest: "https://www.pinterest.com/rothenburygroup",
  threads: "https://www.threads.net/@rothenburygroup",
  bluesky: "https://bsky.app/profile/rothenburygroup.bsky.social",
} as const;

export const CTA = {
  primary: "Request a private introduction",
  secondary: "Speak with the Office of the Group",
  tertiary: "Read the thesis",
} as const;

export const FOOTER_LEGAL =
  "Rothenbury Group is a holding company. Operating businesses are conducted through subsidiary and affiliated entities, each of which is separately governed. Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any security.";
