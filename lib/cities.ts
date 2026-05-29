/**
 * City-level location pages for Rothenbury Group.
 *
 * Each city page carries unique, non-duplicative copy describing the Group's
 * presence in the abstract - operating brand identities are not surfaced here.
 */

import type { ImageKey } from "./imagery";

export type City = {
  slug: string;
  name: string;
  region: string;
  country: "Canada" | "United States";
  intro: string;
  presence: string;
  imageKey: ImageKey;
};

export const CITIES: City[] = [
  {
    slug: "toronto",
    name: "Toronto",
    region: "Ontario",
    country: "Canada",
    intro:
      "Toronto is the centre of Rothenbury Group's Canadian governance and operations. Real-estate-services and contracting interests are concentrated here.",
    presence:
      "Day-to-day delivery extends across the Greater Toronto Area, with parent-level governance coordinated from a downtown Toronto office.",
    imageKey: "torontoSkyline",
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    region: "Ontario",
    country: "Canada",
    intro:
      "Ottawa is part of Rothenbury Group's Ontario service footprint, supported through the Group's residential real-estate-services interests.",
    presence:
      "Coverage in Ottawa is delivered through the Group's Ontario operations. Specific service availability varies by line of business.",
    imageKey: "torontoFinancial",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Ontario",
    country: "Canada",
    intro:
      "Mississauga sits within the Greater Toronto Area service footprint of Rothenbury Group's residential real-estate-services and contracting interests.",
    presence:
      "Mississauga residents and property owners are served through the Group's Ontario operations.",
    imageKey: "modernHouseExterior",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Ontario",
    country: "Canada",
    intro:
      "Hamilton is part of Rothenbury Group's broader Ontario service footprint.",
    presence:
      "Service delivery in Hamilton is handled through the Group's Ontario real-estate-services and contracting operations.",
    imageKey: "residentialBuilding",
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "Ontario",
    country: "Canada",
    intro:
      "Brampton is included in the GTA service area covered by Rothenbury Group's residential real-estate-services and contracting interests.",
    presence:
      "Brampton operations are delivered through the Group's Ontario footprint.",
    imageKey: "apartmentInterior",
  },
  {
    slug: "new-york",
    name: "New York",
    region: "New York",
    country: "United States",
    intro:
      "New York anchors Rothenbury Group's United States operations, including media, staffing, and platform-technology interests.",
    presence:
      "United States operations within the portfolio are coordinated from New York under U.S. commercial code, with service delivery extending across the Northeast corridor.",
    imageKey: "torontoFinancialAlt",
  },
];
