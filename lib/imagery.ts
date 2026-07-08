/**
 * Curated Unsplash imagery for Rothenbury Group.
 *
 * Each image is a verified Unsplash photo ID. We use direct image URLs with
 * Unsplash's image-CDN parameters (w, q, fit, auto=format) which are stable
 * and do not require an API key.
 *
 * Selection rationale (see DESIGN-RESEARCH.md): institutional holding companies
 * lean on architectural and abstract imagery, not stock people. Tones are
 * cool/desaturated to pair with the navy + bone palette.
 *
 * Curation principles for the level-up pass:
 * - Architectural over editorial. Abstracted over literal.
 * - No handshakes, no smiling teams, no SaaS gradients, no globe-with-lines.
 * - Toronto + New York coverage doubled. Subsidiary detail pages now
 *   draw from sector-specific photo pools (4-6 per sector).
 */

const UNSPLASH_BASE = "https://images.unsplash.com/photo-";

/**
 * Build a Unsplash image URL.
 *
 * Rothenbury house style: institutional black-and-white treatment dominant.
 * Pass `bw: false` to opt out (e.g. for textures used as overlays where BW
 * would flatten them further than desired).
 */
function build(id: string, w = 1920, h?: number, opts: { bw?: boolean } = {}) {
  const { bw = true } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: "80",
  });
  if (h) params.set("h", String(h));
  if (bw) params.set("sat", "-100");
  return `${UNSPLASH_BASE}${id}?${params.toString()}`;
}

export const IMAGES = {
  // Locally generated brand photos (Rothenbury-original)
  brandHero: "/hero.webp",
  // Retained as a generic skyline asset; no longer surfaced as a Panama signal.
  brandPanamaSkyline: "/panama-skyline.png",

  // Toronto skyline and financial district (premium)
  // 2026-05-01 audit: torontoSkyline previously surfaced tourists on benches.
  // 2026-05-02 audit: prior ID 1486325212027 carried a faint "TRUMP" wordmark
  // on a building face (visible even in BW). Replaced with a clean dusk
  // waterfront skyline (CN Tower + Rogers Centre dome, no political branding).
  torontoSkyline: build("1756135154174-add625f8721a", 2400, 1400),
  torontoFinancial: build("1756135154174-add625f8721a", 1600, 1100),
  torontoArchitecture: build("1507992781348-310259076fe0", 1600, 1100),
  torontoCnTower: build("1756135154174-add625f8721a", 1600, 2000),
  torontoStreet: build("1756135154174-add625f8721a", 1600, 1100),
  torontoNight: build("1756135154174-add625f8721a", 1800, 1200),

  // New York skyline and architecture (US anchor)
  // 2026-05-01 audit: newYorkSkyline previously surfaced Times Square billboards
  // (Vitamin Water, Wonder Woman, Chase) which clashed with institutional tone.
  // Replaced with Chrysler-Building view down a tree-lined street.
  newYorkSkyline: build("1500916434205-0c77489c6cf7", 2400, 1400),
  newYorkAerial: build("1480714378408-67cf0d13bc1b", 1800, 1200),
  newYorkArchitecture: build("1485871981521-5b1fd3805eee", 1600, 1100),
  newYorkBridge: build("1518391846015-55a9cc003b25", 1600, 1100),

  // Legacy keys retained as aliases to avoid build breakage. These now resolve
  // to North American architectural imagery rather than Panamanian scenes.
  panamaSkyline: build("1500916434205-0c77489c6cf7", 2400, 1400),
  panamaArchitecture: build("1485871981521-5b1fd3805eee", 1600, 1100),
  panamaWaterfront: build("1518391846015-55a9cc003b25", 1600, 1100),
  panamaOldTown: build("1480714378408-67cf0d13bc1b", 1600, 1100),

  // Modern corporate architecture, glass facades, abstract
  // 2026-05-01 audit: glassFacadeAbstract / boardroomDark previously rendered
  // a sterile bright modern boardroom. Glass-facade swapped for an institutional
  // glass tower; boardroom keys keep the empty-room frame which reads well in BW.
  glassFacadeAbstract: build("1604328471151-b52226907017", 2000, 1300),
  // 2026-05-02 audit: glassFacadeMinimal swapped off the Trump-wordmark ID;
  // now uses the clean dusk waterfront skyline.
  glassFacadeMinimal: build("1756135154174-add625f8721a", 1600, 1100),
  architectureMinimal: build("1604328471151-b52226907017", 1800, 1200),
  concreteArchitecture: build("1494522358652-f30e61a60313", 1600, 1100),
  // marbleTexture previously rendered a hipster Edison-bulb-lit library; replaced
  // with antique book-spine shelves which match the Berkshire-letter aesthetic.
  marbleTexture: build("1521587760476-6c12a4b040da", 1600, 900),
  brutalistFacade: build("1494522358652-f30e61a60313", 1600, 1100),
  facadeRepeat: build("1604328471151-b52226907017", 1800, 1200),
  // 2026-05-02 audit: abstractGeometry swapped off Trump-wordmark ID.
  abstractGeometry: build("1756135154174-add625f8721a", 1600, 1100),

  // Boardroom / corporate interior (heritage / executive)
  // 2026-05-01 audit: officeInterior previously rendered a startup-style
  // Eames-and-lightbulbs meeting room; replaced with the curved Stockholm
  // public-library archive (institutional/archival mood).
  boardroomDark: build("1431540015161-0bf868a2d407", 1800, 1200),
  emptyBoardroom: build("1431540015161-0bf868a2d407", 1800, 1200),
  officeInterior: build("1568667256549-094345857637", 1600, 1100),
  archiveLibrary: build("1568667256549-094345857637", 1600, 1100),
  modernLobby: build("1604328471151-b52226907017", 1600, 1100),

  // Real estate / residential
  // 2026-05-01 audit: prior keys rendered a CGI condo, a suburban tract home
  // at twilight, and a modern apt block with bright accent panels. Replaced
  // with heritage-estate and timeless-apartment imagery rendered in BW.
  residentialBuilding: build("1571939228382-b2f2b585ce15", 1600, 1100),
  modernHouseExterior: build("1571939228382-b2f2b585ce15", 1600, 1100),
  apartmentInterior: build("1583847268964-b28dc8f51f92", 1600, 1100),
  condoTower: build("1604328471151-b52226907017", 1600, 1100),
  livingSpace: build("1583847268964-b28dc8f51f92", 1600, 1100),
  rowhouses: build("1571939228382-b2f2b585ce15", 1600, 1100),

  // Maintenance / contracting
  toolsLayflat: build("1572981779307-38b8cabb2407", 1200, 800),
  contractingDetail: build("1581244277943-fe4a9c777189", 1600, 1100),

  // Marketing / agency (sophisticated meeting room)
  // 2026-05-01 audit: previously surfaced the same bright Eames boardroom as
  // officeInterior. Replaced with a tasteful walnut-table boardroom in BW.
  creativeWorkspace: build("1571624436279-b272aff752b5", 1600, 1100),
  studioDesk: build("1455390582262-044cdead277a", 1600, 1100),

  // Staffing / professional
  professionalMeeting: build("1573164713714-d95e436ab8d6", 1600, 1100),
  professionalCorridor: build("1517502884422-41eaead166d4", 1600, 1100),

  // SaaS / data abstract
  dataAbstract: build("1518770660439-4636190af475", 1600, 1100),
  techDashboard: build("1551288049-bebda4e38f71", 1600, 1100),
  serverDetail: build("1558494949-ef010cbdcc31", 1600, 1100),

  // Technology page - platform, dashboards, code, networking
  platformHero: build("1551288049-bebda4e38f71", 2400, 1300),
  codeOnScreen: build("1517694712202-14dd9538aa97", 1600, 1100),
  laptopDashboard: build("1460925895917-afdab827c52f", 1600, 1100),
  abstractNetwork: build("1451187580459-43490279c0fa", 1600, 1100),
  serverRoom: build("1573164713988-8665fc963095", 1600, 1100),
  fiberOptic: build("1526374965328-7f61d4dc18c5", 1600, 1100),
  controlRoom: build("1581090464777-f3220bbe1b8b", 1600, 1100),
  monitorWall: build("1504384308090-c894fdcc538d", 1600, 1100),
  blueprintTech: build("1581094794329-c8112a89af12", 1600, 1100),
  workstationDual: build("1498050108023-c5249f4df085", 1600, 1100),
  mobileApp: build("1611162617213-7d7a39e9b1d7", 1200, 1500),
  audit: build("1554224155-6726b3ff858f", 1600, 1100),
  cloudCircuit: build("1591405351990-4726e331f141", 1600, 1100),
  uiClose: build("1542831371-29b0f74f9713", 1600, 1100),
  techMeetingDark: build("1556761175-5973dc0f32e7", 1600, 1100),

  // More city / neighborhood variety
  // 2026-05-01 audit: vancouverSkyline / ottawaParliament previously pulled a
  // tourist-bench photo; calgarySkyline pulled a CASINO ROULETTE table.
  // 2026-05-02 audit: vancouverSkyline / ottawaParliament swapped off the
  // Trump-wordmark Toronto ID and now resolve to the clean dusk waterfront.
  vancouverSkyline: build("1756135154174-add625f8721a", 1600, 1100),
  calgarySkyline: build("1444084316824-dc26d6657664", 1600, 1100),
  montrealOldPort: build("1565008447742-97f6f38c985c", 1600, 1100),
  ottawaParliament: build("1756135154174-add625f8721a", 1600, 1100),
  generalCanadianStreet: build("1565008447742-97f6f38c985c", 1600, 1100),

  // Service-specific extras
  applicationDocs: build("1450101499163-c8848c66ca85", 1600, 1100),
  keysExchange: build("1582407947304-fd86f028f716", 1600, 1100),
  inspectorOnSite: build("1581244277943-fe4a9c777189", 1600, 1100),
  dispatchTablet: build("1591696205602-2f950c417cb9", 1600, 1100),
  signedContract: build("1554224155-1696413565d3", 1600, 1100),

  // Philanthropy / community (no faces)
  communityAbstract: build("1532629345422-7515f3d16bb6", 1600, 1100),

  // Aerial / texture / dividers
  // 2026-05-02 audit: prior aerialCity ID surfaced an "Allianz" signed tower
  // (real-world brand contamination, visible in BW) on /locations and the
  // /contact map. Replaced with a clean dusk aerial — no brand signage.
  aerialCity: build("1444723121867-7a241cacace9", 2400, 900),
  aerialDusk: build("1444723121867-7a241cacace9", 2400, 900),
  brushedMetal: build("1615529182904-14819c35db37", 2000, 800),
  paperTexture: build("1494522358652-f30e61a60313", 2000, 800),

  // Documents / archival (institutional signal)
  archivalDocuments: build("1568667256549-094345857637", 1600, 1100),
  legalSpine: build("1453928582365-b6ad33cbcf64", 1600, 1100),

  // Open Graph
  // 2026-05-01 audit: ogHero was a CASINO ROULETTE table photo (would have
  // surfaced anywhere the site was shared on social). Replaced with timeless
  // heritage skyline.
  ogHero: build("1444084316824-dc26d6657664", 1200, 630),

  // V2 expansion - heritage / editorial / institutional imagery
  // Boardroom / heritage interiors
  // 2026-05-01 audit: oakBoardTable was rendering a startup-style coworking
  // space (men in casual shirts, code on monitors, beer can on table). Used
  // on the homepage "Built for permanence" band and the /thesis hero. Replaced
  // with a tasteful walnut-table boardroom in BW.
  heritageLibrary: build("1507842217343-583bb7270b66", 1600, 1100),
  oakBoardTable: build("1571624436279-b272aff752b5", 1600, 1100),
  bookshelfArchive: build("1521587760476-6c12a4b040da", 1600, 1100),
  // 2026-05-02 audit: marbleColumn / arches keys deleted. The IDs they pointed
  // to were mislabeled (paint smears and a modernist tower respectively) which
  // would have been embarrassing if anyone referenced them. Removed entirely
  // rather than re-sourced — better than carrying landmines.
  signedDocument: build("1450101499163-c8848c66ca85", 1600, 1100),

  // Editorial city / dusk
  // 2026-05-01 audit: torontoFinancialAlt was rendering a CASINO ROULETTE
  // table (used on /locations/new-york). Replaced with a heritage Saint Paul
  // skyline which renders as timeless cityscape in BW. newYorkDusk previously
  // pulled the Times-Square billboards image; replaced with Chrysler-Building.
  torontoDusk: build("1507992781348-310259076fe0", 2000, 1100),
  newYorkDusk: build("1500916434205-0c77489c6cf7", 1600, 1100),
  torontoFinancialAlt: build("1444084316824-dc26d6657664", 1800, 1100),
  bayStreetSign: build("1565008447742-97f6f38c985c", 1600, 1100),
  newYorkNight: build("1485871981521-5b1fd3805eee", 1800, 1100),
  // Legacy aliases retained for backwards compatibility.
  panamaCanal: build("1518391846015-55a9cc003b25", 1600, 1100),
  panamaCityNight: build("1485871981521-5b1fd3805eee", 1800, 1100),

  // Institutional textures
  walnutGrain: build("1602810318383-e386cc2a3ccf", 2000, 800),
  parchmentTexture: build("1614849963640-9cc74b2a826f", 2000, 800),
  brassPlate: build("1606830733744-0ad778449672", 1600, 600),
  embossedSeal: build("1581090700227-1e37b190418e", 1200, 1200),
  redLeatherBound: build("1456513080510-7bf3a84b82f8", 1600, 1100),

  // Working scenes (no faces) - operator energy
  // 2026-05-02 audit: desklamp key deleted. The ID it pointed to was a tabby
  // cat on a couch — a landmine if anyone referenced it. Removed entirely.
  ledgerClose: build("1554224155-8d04cb21cd6c", 1600, 1100),
  contractSigning: build("1554224154-26032ffc0d07", 1600, 1100),
  coffeeAndPaper: build("1497032628192-86f99bcd76bc", 1600, 1100),
  fountainPenDetail: build("1455390582262-044cdead277a", 1600, 1100),

  // Aerial / wide format dividers
  aerialMidtown: build("1519681393784-d120267933ba", 2400, 800),
  northAmericaAerial: build("1480714378408-67cf0d13bc1b", 2400, 800),
  // Legacy alias retained for backwards compatibility.
  panamaAerial: build("1480714378408-67cf0d13bc1b", 2400, 800),
  riverbed: build("1469474968028-56623f02e42e", 2400, 800),
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Hero collage triplets for multi-image hero grids.
 * Used on home and major landing pages. Order: large left, small top-right, small bottom-right.
 */
export const HERO_COLLAGES = {
  home: [
    "torontoFinancial",
    "newYorkSkyline",
    "glassFacadeMinimal",
  ],
  about: [
    "boardroomDark",
    "torontoArchitecture",
    "archivalDocuments",
  ],
  portfolio: [
    "glassFacadeAbstract",
    "residentialBuilding",
    "creativeWorkspace",
  ],
  locations: [
    "torontoSkyline",
    "newYorkArchitecture",
    "aerialDusk",
  ],
  contact: [
    "boardroomDark",
    "modernLobby",
    "torontoStreet",
  ],
  leadership: [
    "officeInterior",
    "archiveLibrary",
    "torontoArchitecture",
  ],
} as const satisfies Record<string, [ImageKey, ImageKey, ImageKey]>;
