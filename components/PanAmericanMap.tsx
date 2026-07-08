"use client";

/**
 * North American footprint map.
 *
 * Real Canada + United States + Mexico boundaries, projected from Natural Earth
 * `ne_50m_admin_0_countries` GeoJSON via d3-geo (geoAlbers). Berkshire-letter
 * editorial styling: parchment cream land, slate hairline borders, burgundy
 * markers with gold-leaf inner ring on hub points, thin burgundy operating
 * spine between Toronto and New York.
 *
 * The component remains exported as PanAmericanMap for backwards-compatibility
 * with existing imports.
 */

import { useMemo } from "react";
import { geoAlbers, geoPath, type GeoPermissibleObjects } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import northAmericaRaw from "@/lib/data/north-america.json";

type Country = "us" | "ca" | "mx";

type Marker = {
  /** Geographic longitude */
  lon: number;
  /** Geographic latitude */
  lat: number;
  label: string;
  country: Country;
  /** Hub markers get the burgundy ring + gold-leaf inner. */
  hub?: boolean;
  /** Optional caption rendered under the label in italic small caps. */
  caption?: string;
};

type Props = {
  /** Override default markers. */
  markers?: Marker[];
  /** Optional pair of [from, to] longitude/latitude points to draw a hairline accent connector ("operating spine"). */
  accentConnector?: [
    { lon: number; lat: number },
    { lon: number; lat: number }
  ];
  /** Optional bottom-of-map source caption. Defaults to the editorial line. */
  caption?: string;
};

const VIEW_W = 1000;
const VIEW_H = 600;

// Default operating geometry — Toronto · NY operating spine plus secondary hubs.
const DEFAULT_MARKERS: Marker[] = [
  { lon: -79.3832, lat: 43.6532, label: "Toronto", country: "ca", hub: true, caption: "Office of the Group" },
  { lon: -74.006, lat: 40.7128, label: "New York", country: "us", hub: true, caption: "U.S. anchor" },
  // Canada secondaries
  { lon: -75.6972, lat: 45.4215, label: "Ottawa", country: "ca" },
  { lon: -73.5673, lat: 45.5017, label: "Montreal", country: "ca" },
  { lon: -114.0719, lat: 51.0447, label: "Calgary", country: "ca" },
  { lon: -123.1207, lat: 49.2827, label: "Vancouver", country: "ca" },
  // U.S. secondaries
  { lon: -71.0589, lat: 42.3601, label: "Boston", country: "us" },
  { lon: -87.6298, lat: 41.8781, label: "Chicago", country: "us" },
  { lon: -84.388, lat: 33.749, label: "Atlanta", country: "us" },
  { lon: -80.1918, lat: 25.7617, label: "Miami", country: "us" },
  { lon: -96.797, lat: 32.7767, label: "Dallas", country: "us" },
  { lon: -104.9903, lat: 39.7392, label: "Denver", country: "us" },
  { lon: -118.2437, lat: 34.0522, label: "Los Angeles", country: "us" },
];

const DEFAULT_ACCENT: [
  { lon: number; lat: number },
  { lon: number; lat: number }
] = [
  { lon: -79.3832, lat: 43.6532 }, // Toronto
  { lon: -74.006, lat: 40.7128 }, // New York
];

// Subset cities that get a thin secondary hairline back to the U.S. anchor
// (operational support spokes, very faint — Berkshire restraint).
const SECONDARY_SPOKES: Array<{ lon: number; lat: number }> = [
  { lon: -118.2437, lat: 34.0522 }, // LA
  { lon: -80.1918, lat: 25.7617 }, // Miami
  { lon: -87.6298, lat: 41.8781 }, // Chicago
  { lon: -114.0719, lat: 51.0447 }, // Calgary
];

export default function PanAmericanMap({
  markers = DEFAULT_MARKERS,
  accentConnector = DEFAULT_ACCENT,
  caption = "Operating coverage across the Americas.",
}: Props) {
  const { countryPaths, projectPoint } = useMemo(() => {
    const fc = northAmericaRaw as unknown as FeatureCollection<Geometry, { name: string; iso: string }>;

    // Albers projection tuned for North America. Center near the geographic
    // mean of US/Canada/Mexico, parallels per Natural Earth/USGS convention.
    const projection = geoAlbers()
      .rotate([96, 0])
      .center([-0.6, 38])
      .parallels([29.5, 45.5])
      .scale(720)
      .translate([VIEW_W / 2, VIEW_H / 2 + 30]);

    const path = geoPath(projection);

    const paths: Array<{ iso: string; name: string; d: string }> = [];
    for (const feature of fc.features) {
      const f = feature as Feature<Geometry, { name: string; iso: string }>;
      const d = path(f as unknown as GeoPermissibleObjects);
      if (!d) continue;
      paths.push({ iso: f.properties.iso, name: f.properties.name, d });
    }

    const project = (lon: number, lat: number): [number, number] | null => {
      const p = projection([lon, lat]);
      if (!p) return null;
      return p as [number, number];
    };

    return { countryPaths: paths, projectPoint: project };
  }, []);

  const accent = useMemo(() => {
    const a = projectPoint(accentConnector[0].lon, accentConnector[0].lat);
    const b = projectPoint(accentConnector[1].lon, accentConnector[1].lat);
    if (!a || !b) return null;
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2 - 14;
    return { a, b, mx, my };
  }, [accentConnector, projectPoint]);

  const projectedMarkers = useMemo(() => {
    return markers
      .map((m) => {
        const p = projectPoint(m.lon, m.lat);
        if (!p) return null;
        return { ...m, x: p[0], y: p[1] };
      })
      .filter((m): m is Marker & { x: number; y: number } => m !== null);
  }, [markers, projectPoint]);

  const projectedSpokes = useMemo(() => {
    if (!accent) return [];
    return SECONDARY_SPOKES.map((s) => projectPoint(s.lon, s.lat))
      .filter((p): p is [number, number] => p !== null);
  }, [accent, projectPoint]);

  // U.S. – Canada border hint: rather than re-cut the geometry, we render
  // Canada and the United States as separate paths with the same slate stroke,
  // so the border between them naturally appears at full stroke. We layer a
  // subtle dashed slate line along the 49th parallel for editorial clarity.
  const borderDashY49 = projectPoint(-100, 49)?.[1] ?? null;
  const borderDashX1 = projectPoint(-123, 49)?.[0] ?? null;
  const borderDashX2 = projectPoint(-95, 49)?.[0] ?? null;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Parchment paper-grain — very faint multiplicative noise via SVG turbulence */}
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed="3"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.18
                    0 0 0 0 0.18
                    0 0 0 0 0.20
                    0 0 0 0.06 0"
          />
        </filter>

        <pattern id="rb-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="rgba(47, 48, 51, 0.06)"
            strokeWidth="0.5"
          />
        </pattern>

        <radialGradient id="rb-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="60%" stopColor="rgba(248, 244, 236, 0)" />
          <stop offset="100%" stopColor="rgba(232, 223, 204, 0.55)" />
        </radialGradient>

        <linearGradient id="rb-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A1A2B" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#5A1A2B" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#5A1A2B" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Parchment base */}
      <rect width={VIEW_W} height={VIEW_H} fill="#F8F4EC" />

      {/* Faint grid (Berkshire restraint) */}
      <rect width={VIEW_W} height={VIEW_H} fill="url(#rb-grid)" />

      {/* Editorial latitude reference hairlines */}
      <g stroke="rgba(47, 48, 51, 0.12)" strokeDasharray="2 5" strokeWidth="0.4">
        {[150, 270, 390, 510].map((y) => (
          <line key={y} x1="0" y1={y} x2={VIEW_W} y2={y} />
        ))}
      </g>

      {/* Real Natural Earth country paths */}
      <g>
        {countryPaths.map((c) => (
          <path
            key={c.iso}
            d={c.d}
            fill={c.iso === "MEX" ? "#E9DCC2" : "#E2D2AE"}
            stroke="#2F3033"
            strokeWidth={0.8}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={c.iso === "MEX" ? 0.7 : 1}
          />
        ))}
      </g>

      {/* Subtle US–Canada 49th parallel hint (dashed slate) */}
      {borderDashY49 !== null && borderDashX1 !== null && borderDashX2 !== null && (
        <line
          x1={borderDashX1}
          y1={borderDashY49}
          x2={borderDashX2}
          y2={borderDashY49}
          stroke="#2F3033"
          strokeOpacity="0.35"
          strokeDasharray="3 4"
          strokeWidth="0.5"
        />
      )}

      {/* Vignette to settle the corners */}
      <rect width={VIEW_W} height={VIEW_H} fill="url(#rb-vignette)" pointerEvents="none" />

      {/* Paper grain over land */}
      <rect
        width={VIEW_W}
        height={VIEW_H}
        filter="url(#paper-grain)"
        pointerEvents="none"
        opacity="0.5"
      />

      {/* Country labels — serif, deep slate, small caps tracked */}
      {(() => {
        const can = projectPoint(-100, 58);
        const usa = projectPoint(-99, 39.5);
        const mex = projectPoint(-102, 23.5);
        return (
          <g
            fontFamily="var(--font-serif), 'Cormorant Garamond', Georgia, serif"
            fill="#2F3033"
            fillOpacity="0.6"
            fontSize="11"
            letterSpacing="6"
            textAnchor="middle"
            style={{ textTransform: "uppercase" }}
          >
            {can && (
              <text x={can[0]} y={can[1]} fontWeight="500">
                Canada
              </text>
            )}
            {usa && (
              <text x={usa[0]} y={usa[1]} fontWeight="500">
                United States
              </text>
            )}
            {mex && (
              <text x={mex[0]} y={mex[1]} fontWeight="500" fillOpacity="0.45">
                Mexico
              </text>
            )}
          </g>
        );
      })()}

      {/* Secondary hairline spokes from the U.S. anchor */}
      {accent &&
        projectedSpokes.map((s, i) => (
          <line
            key={`spoke-${i}`}
            x1={accent.b[0]}
            y1={accent.b[1]}
            x2={s[0]}
            y2={s[1]}
            stroke="rgba(90, 26, 43, 0.22)"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
        ))}

      {/* Operating spine — Toronto · New York */}
      {accent && (
        <>
          <path
            d={`M${accent.a[0]} ${accent.a[1]} Q ${accent.mx} ${accent.my} ${accent.b[0]} ${accent.b[1]}`}
            stroke="url(#rb-spine)"
            strokeWidth="1.2"
            fill="none"
          />
          <text
            x={accent.mx}
            y={accent.my - 8}
            fill="#5A1A2B"
            fontSize="9"
            letterSpacing="3"
            fontFamily="var(--font-serif), 'Cormorant Garamond', Georgia, serif"
            fontStyle="italic"
            textAnchor="middle"
            fontWeight="500"
            style={{ textTransform: "uppercase" }}
          >
            Operating spine
          </text>
        </>
      )}

      {/* Markers */}
      {projectedMarkers.map((m) => {
        if (m.hub) {
          return (
            <g key={`m-${m.label}`}>
              {/* Outer slate halo */}
              <circle
                cx={m.x}
                cy={m.y}
                r="11"
                fill="none"
                stroke="rgba(47, 48, 51, 0.18)"
                strokeWidth="0.5"
              />
              {/* Burgundy ring */}
              <circle
                cx={m.x}
                cy={m.y}
                r="7"
                fill="#5A1A2B"
                stroke="#8C6A3F"
                strokeWidth="0.75"
              />
              {/* Gold-leaf inner */}
              <circle cx={m.x} cy={m.y} r="3" fill="#B89968" />
              {/* Label */}
              <text
                x={m.x + 13}
                y={m.y - 4}
                fontSize="13"
                fontFamily="var(--font-serif), 'Cormorant Garamond', Georgia, serif"
                fontStyle="italic"
                fill="#15100C"
                fontWeight="500"
              >
                {m.label}
              </text>
              <text
                x={m.x + 13}
                y={m.y + 9}
                fontSize="8.5"
                fontFamily="var(--font-serif), 'Source Serif 4', Georgia, serif"
                fill="rgba(47, 48, 51, 0.7)"
                letterSpacing="2"
                fontWeight="500"
                style={{ textTransform: "uppercase" }}
              >
                {m.caption ?? "Hub · Office"}
              </text>
            </g>
          );
        }
        return (
          <g key={`m-${m.label}`}>
            <circle
              cx={m.x}
              cy={m.y}
              r="5"
              fill="#5A1A2B"
              stroke="#E2D2AE"
              strokeWidth="1.1"
            />
            <text
              x={m.x + 8}
              y={m.y + 3.5}
              fontSize="10.5"
              fontFamily="var(--font-serif), 'Source Serif 4', Georgia, serif"
              fill="#241712"
              fontWeight="500"
              letterSpacing="0.3"
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {/* Compass — slate, restrained */}
      <g transform={`translate(48, ${VIEW_H - 60})`}>
        <circle r="13" fill="none" stroke="rgba(47, 48, 51, 0.4)" strokeWidth="0.5" />
        <line x1="0" y1="-11" x2="0" y2="11" stroke="rgba(47, 48, 51, 0.5)" strokeWidth="0.5" />
        <line x1="-11" y1="0" x2="11" y2="0" stroke="rgba(47, 48, 51, 0.3)" strokeWidth="0.5" />
        <polygon points="0,-11 -2.2,-3 2.2,-3" fill="#2F3033" fillOpacity="0.55" />
        <text
          y="-17"
          fontSize="8"
          fill="rgba(47, 48, 51, 0.65)"
          textAnchor="middle"
          fontFamily="var(--font-serif), 'Source Serif 4', Georgia, serif"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          N
        </text>
      </g>

      {/* Source caption */}
      <text
        x={VIEW_W - 24}
        y={VIEW_H - 22}
        fontSize="9"
        fill="rgba(47, 48, 51, 0.55)"
        textAnchor="end"
        fontFamily="var(--font-serif), 'Source Serif 4', Georgia, serif"
        fontStyle="italic"
      >
        {caption}
      </text>
    </svg>
  );
}
