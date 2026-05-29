import { MapPin } from "lucide-react";
import Reveal from "./Reveal";

/**
 * SVG-driven dual-country map (Canada + United States).
 * Uses simplified, hand-tuned outlines - no external map dependency, no
 * postal-rights issues, scales infinitely without raster blur.
 *
 * Coordinates are normalized to a 1000x600 viewbox. They're decorative
 * approximations - not suitable for navigation, just for institutional signal.
 */

const CANADA_PATH =
  "M85,178 L120,160 L180,150 L240,148 L300,150 L360,152 L420,156 L460,160 L500,164 L540,170 L580,178 L605,188 L600,210 L578,220 L540,220 L500,222 L460,224 L420,224 L380,222 L340,220 L300,218 L260,216 L220,214 L180,212 L140,208 L110,200 L90,190 Z";

const USA_PATH =
  "M180,260 L260,250 L340,248 L420,250 L500,254 L560,260 L590,272 L610,290 L605,320 L580,348 L530,370 L460,380 L380,380 L300,372 L240,358 L200,340 L180,310 Z";

type MapPoint = {
  x: number;
  y: number;
  label: string;
  country: string;
  region: string;
  primary?: boolean;
};

const POINTS: MapPoint[] = [
  { x: 295, y: 188, label: "Toronto", country: "Canada", region: "Ontario", primary: true },
  { x: 318, y: 188, label: "Ottawa", country: "Canada", region: "Ontario" },
  { x: 268, y: 192, label: "Mississauga", country: "Canada", region: "Ontario" },
  { x: 525, y: 295, label: "New York", country: "United States", region: "New York", primary: true },
];

export default function GeographicMap() {
  return (
    <section className="relative bg-navy text-bone overflow-hidden grain">
      <div className="container-wide section grid gap-14 lg:grid-cols-[1fr_1.4fr] items-start">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
              <span className="h-px w-8 bg-gold-300/60" />
              Geographic Presence
            </div>
            <h2 className="mt-6 font-serif text-4xl lg:text-5xl text-bone leading-[1.1] tracking-tight text-balance">
              Two countries. One operating discipline.
            </h2>
            <p className="mt-7 text-ivory/90 leading-relaxed max-w-md">
              Rothenbury Group's portfolio operates across the United States and Canada,
              anchored from Toronto and New York. Operating partners deliver real-estate,
              leasing, contracting, marketing, staffing, and technology services under
              their own jurisdiction's commercial code.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md">
              <div className="border-l border-bone/15 pl-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-bronze-200">Canada</dt>
                <dd className="mt-2 font-serif text-3xl text-bone leading-none">5</dd>
                <dd className="mt-2 text-[11px] text-ivory/80 leading-snug">
                  Toronto, Ottawa, Mississauga, Hamilton, Brampton
                </dd>
              </div>
              <div className="border-l border-bone/15 pl-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-bronze-200">United States</dt>
                <dd className="mt-2 font-serif text-3xl text-bone leading-none">1</dd>
                <dd className="mt-2 text-[11px] text-ivory/80 leading-snug">
                  New York - anchor for U.S. operations
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[5/3] border border-bone/15 bg-navy-700/40 overflow-hidden">
            <svg
              viewBox="0 0 1000 600"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label="Map showing Rothenbury Group offices across the United States and Canada"
            >
              {/* Latitude/longitude reference lines */}
              <g stroke="rgba(250,250,247,0.06)" strokeWidth="1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={(i + 1) * 75} x2="1000" y2={(i + 1) * 75} />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`v-${i}`} x1={(i + 1) * 90} y1="0" x2={(i + 1) * 90} y2="600" />
                ))}
              </g>

              {/* Continent outlines (decorative, simplified) */}
              <path
                d={CANADA_PATH}
                fill="rgba(184,147,90,0.08)"
                stroke="rgba(184,147,90,0.45)"
                strokeWidth="1.2"
              />
              <path
                d={USA_PATH}
                fill="rgba(184,147,90,0.08)"
                stroke="rgba(184,147,90,0.45)"
                strokeWidth="1.2"
              />

              {/* Country labels */}
              <text
                x={300}
                y={130}
                fill="rgba(250,250,247,0.55)"
                fontSize="11"
                letterSpacing="3"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                CANADA
              </text>
              <text
                x={395}
                y={325}
                fill="rgba(250,250,247,0.55)"
                fontSize="11"
                letterSpacing="3"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                UNITED STATES
              </text>

              {/* City markers */}
              {POINTS.map((p) => (
                <g key={p.label}>
                  {p.primary && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="14"
                      fill="rgba(184,147,90,0.18)"
                      stroke="rgba(184,147,90,0.55)"
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="r"
                        values="10;18;10"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.primary ? 4 : 2.5}
                    fill={p.primary ? "#D6BB78" : "rgba(250,250,247,0.7)"}
                  />
                  <text
                    x={p.x + 10}
                    y={p.y - 8}
                    fill={p.primary ? "#FAFAF7" : "rgba(250,250,247,0.7)"}
                    fontSize={p.primary ? 13 : 10}
                    fontFamily="serif"
                    fontStyle={p.primary ? "italic" : "normal"}
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Caption */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ivory/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Operating Footprint
              </span>
              <span className="italic">Decorative · not to scale</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
