"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Permanence vs PE Cycle comparison chart.
 *
 * Two stacked timelines: a private-equity hold pattern that resets every five
 * to seven years, and a Rothenbury permanent-capital line that runs flat past
 * the chart edge. Bronze flag marks each PE exit. Single bronze arrow trails
 * off the right edge for the permanent line.
 */

export default function PermanenceVsCycleChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Each "hold" is 5 years on a 30 year axis: 6 cycles
  const peCycles = [
    { from: 0, to: 5 },
    { from: 5, to: 10 },
    { from: 10, to: 15 },
    { from: 15, to: 20 },
    { from: 20, to: 25 },
    { from: 25, to: 30 },
  ];

  const yearTicks = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div
      ref={ref}
      className="border border-line bg-bone p-8 lg:p-12"
    >
      <div className="grid gap-2 sm:grid-cols-2 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
            Comparison
          </div>
          <div className="mt-2 font-serif text-2xl text-navy leading-snug">
            Permanence vs the private-equity cycle.
          </div>
        </div>
        <p className="text-[14px] text-ink-soft leading-relaxed self-end">
          Most institutional capital resets every five to seven years. A
          permanent capital balance sheet does not. Continuity is the entire
          intervention.
        </p>
      </div>

      <svg
        viewBox="0 0 800 220"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Y-axis labels */}
        <text x="0" y="60" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#3D332C">
          PE cycle
        </text>
        <text x="0" y="160" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#5A1A2B">
          Rothenbury
        </text>

        {/* Axis */}
        <line x1="100" y1="200" x2="780" y2="200" stroke="#D4C9B5" strokeWidth="1" />

        {/* Year ticks */}
        {yearTicks.map((y) => {
          const x = 100 + (y / 30) * 680;
          return (
            <g key={y}>
              <line x1={x} y1="200" x2={x} y2="206" stroke="#D4C9B5" strokeWidth="0.75" />
              <text
                x={x}
                y="218"
                textAnchor="middle"
                fontFamily="Menlo, monospace"
                fontSize="9"
                fill="#5C4F45"
                letterSpacing="1"
              >
                {y === 30 ? "30+" : `Y${y}`}
              </text>
            </g>
          );
        })}

        {/* PE cycles - segmented bars with exit flags */}
        {peCycles.map((cyc, idx) => {
          const x1 = 100 + (cyc.from / 30) * 680;
          const x2 = 100 + (cyc.to / 30) * 680;
          const w = x2 - x1 - 4;
          return (
            <g key={idx}>
              <motion.rect
                initial={{ width: 0 }}
                animate={inView ? { width: w } : { width: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                x={x1 + 2}
                y={50}
                height={20}
                fill="#A88774"
                opacity="0.7"
              />
              {/* Exit flag */}
              <motion.line
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + idx * 0.08 + 0.5,
                }}
                x1={x2}
                y1={42}
                x2={x2}
                y2={78}
                stroke="#8C6A3F"
                strokeWidth="1.25"
              />
              <motion.circle
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + idx * 0.08 + 0.55,
                }}
                cx={x2}
                cy={42}
                r="3"
                fill="#8C6A3F"
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + idx * 0.08 + 0.6,
                }}
                x={x2}
                y={36}
                textAnchor="middle"
                fontFamily="Menlo, monospace"
                fontSize="8"
                fill="#705432"
                letterSpacing="1"
              >
                EXIT
              </motion.text>
            </g>
          );
        })}

        {/* Permanent capital line - solid bronze rule */}
        <motion.rect
          initial={{ width: 0 }}
          animate={inView ? { width: 680 } : { width: 0 }}
          transition={{
            duration: 1.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          x={100}
          y={150}
          height={20}
          fill="#5A1A2B"
        />
        {/* Bronze accent strip on top */}
        <motion.rect
          initial={{ width: 0 }}
          animate={inView ? { width: 680 } : { width: 0 }}
          transition={{
            duration: 1.6,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          x={100}
          y={148}
          height={2}
          fill="#8C6A3F"
        />
        {/* Trailing arrow off right edge */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          <path
            d="M780 160 L795 160 L788 152 M795 160 L788 168"
            stroke="#5A1A2B"
            strokeWidth="1.5"
            fill="none"
          />
        </motion.g>
      </svg>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 pt-8 border-t border-line">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 inline-block w-3 h-3 bg-walnut/60" />
          <div>
            <div className="font-serif text-base text-navy">PE cycle</div>
            <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
              Raise, invest, exit. Every five to seven years the operator faces
              a new owner, a new thesis, and a new clock.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1.5 inline-block w-3 h-3 bg-burgundy" />
          <div>
            <div className="font-serif text-base text-navy">
              Rothenbury permanent capital
            </div>
            <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
              One owner. One thesis. Continuity that runs past the chart edge.
              The default holding horizon is generational.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
