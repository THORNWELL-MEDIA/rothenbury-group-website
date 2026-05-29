/**
 * Sector framing for Rothenbury Group.
 *
 * Operating-brand identities are kept off the public site. Public-facing
 * content describes sectors of activity in the abstract; specific portfolio
 * details are held in investor and counterparty materials.
 */

export const PORTFOLIO_STATS = [
  { value: "6", label: "Sectors of activity" },
  { value: "2", label: "Operating regions across North America" },
  { value: "∞", label: "Default holding horizon" },
] as const;

export const SECTORS = [
  "Real Estate",
  "Services",
  "Media",
  "Technology",
  "Staffing",
  "Philanthropy",
] as const;

export type Sector = (typeof SECTORS)[number];

export type SectorEntry = {
  slug: string;
  name: Sector;
  shortDescription: string;
  longDescription: string;
};

export const SECTOR_ENTRIES: SectorEntry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    shortDescription:
      "Residential leasing and boutique property management within the Group's portfolio.",
    longDescription:
      "The Group holds residential real-estate-services interests focused on Canadian markets, with operations in residential leasing and boutique property management. Holdings are managed for long-duration income with conservative leverage.",
  },
  {
    slug: "services",
    name: "Services",
    shortDescription:
      "Contracting, maintenance, and corporate services held across the portfolio.",
    longDescription:
      "Services holdings cover contracting, maintenance, and corporate services anchored in the Greater Toronto Area. The Group capitalizes durable, recurring-revenue service businesses that pair steady cash flow with operator-led execution.",
  },
  {
    slug: "media",
    name: "Media",
    shortDescription: "Marketing and creative-services interests within the portfolio.",
    longDescription:
      "Media holdings include marketing and creative-services interests serving both internal and external clients across North American markets.",
  },
  {
    slug: "technology",
    name: "Technology",
    shortDescription:
      "SaaS and platform-technology interests within the portfolio.",
    longDescription:
      "Technology holdings are concentrated in SaaS and platform businesses. Capital is deployed for long-duration ownership rather than venture exits.",
  },
  {
    slug: "staffing",
    name: "Staffing",
    shortDescription:
      "Staffing-sector interests within the portfolio, anchored in North America.",
    longDescription:
      "Staffing holdings cover talent placement and workforce-services businesses, with cross-border deployment capability across the United States and Canada.",
  },
  {
    slug: "philanthropy",
    name: "Philanthropy",
    shortDescription:
      "Philanthropic activity coordinated at the parent level, governed under separate approval workflow.",
    longDescription:
      "Philanthropic activity is coordinated at the parent level under a separate governance and approval workflow. Public detail is published only with the explicit approval of the relevant parties.",
  },
];
