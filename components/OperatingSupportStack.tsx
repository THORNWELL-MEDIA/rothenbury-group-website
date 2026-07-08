"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Banknote, ShieldCheck, Layers, Gavel } from "lucide-react";

/**
 * Operating Support Stack diagram.
 *
 * Renders a four-pillar SVG diagram visualising what the parent provides to
 * operating partners: Capital, Brand Governance, Shared Services, Operating
 * Oversight. Pillars rise on scroll, with bronze caps and walnut bases. Built
 * to evoke private-bank stationery rather than dashboard chrome.
 */

type Pillar = {
  Icon: typeof Banknote;
  title: string;
  body: string;
  height: number; // 0..1, relative bar height
};

const PILLARS: Pillar[] = [
  {
    Icon: Banknote,
    title: "Capital",
    body: "Patient equity. No fund-life clock. Funded through cycles, not optimised for an exit window.",
    height: 0.92,
  },
  {
    Icon: Gavel,
    title: "Brand Governance",
    body: "Each operating brand is held intact. Identity, customers, and reputation stay with the operator. The Group invests behind the brand.",
    height: 0.84,
  },
  {
    Icon: Layers,
    title: "Shared Services",
    body: "Finance, technology, procurement, and talent infrastructure consolidated at the parent. Operators inherit scale they could not afford alone.",
    height: 1.0,
  },
  {
    Icon: ShieldCheck,
    title: "Operating Oversight",
    body: "Board-level governance, reporting standards, and capital-allocation discipline applied consistently across every operating partner.",
    height: 0.78,
  },
];

export default function OperatingSupportStack({ stacked = false }: { stacked?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={stacked ? "border border-line bg-cream/40 p-6 lg:p-7" : "border border-line bg-cream/40 p-8 lg:p-12"}
    >
      <div className={stacked ? "space-y-7" : "grid gap-10 lg:grid-cols-[1.05fr_1fr] items-stretch"}>
        {/* Diagram */}
        <div className="relative">
          <svg
            viewBox="0 0 600 360"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Ground line */}
            <line x1="20" y1="320" x2="580" y2="320" stroke="#D4C9B5" strokeWidth="1" />
            {/* Roof line - the parent */}
            <line x1="20" y1="40" x2="580" y2="40" stroke="#8C6A3F" strokeWidth="1.25" />
            <line x1="20" y1="46" x2="580" y2="46" stroke="rgba(140,106,63,0.45)" strokeWidth="0.6" />

            {/* Roof label */}
            <text
              x="300"
              y="28"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontSize="16"
              fill="#5A1A2B"
              letterSpacing="0.5"
            >
              The Parent · Office of the Group
            </text>

            {/* Ground label */}
            <text
              x="300"
              y="346"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="11"
              fill="#5C4F45"
              letterSpacing="2"
            >
              OPERATING PARTNERS · NORTH AMERICA
            </text>

            {/* Pillars */}
            {PILLARS.map((pillar, idx) => {
              const slot = (560 - 40) / PILLARS.length;
              const cx = 60 + slot * idx + slot / 2;
              const w = 70;
              const x = cx - w / 2;
              const maxH = 250;
              const finalH = pillar.height * maxH;
              const finalY = 320 - finalH;

              return (
                <g key={pillar.title}>
                  {/* Pillar shaft */}
                  <motion.rect
                    initial={{ y: 320, height: 0 }}
                    animate={inView ? { y: finalY, height: finalH } : { y: 320, height: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + idx * 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    x={x}
                    width={w}
                    fill="#3B2418"
                    opacity="0.92"
                  />
                  {/* Bronze cap */}
                  <motion.rect
                    initial={{ opacity: 0, y: 320 }}
                    animate={
                      inView
                        ? { opacity: 1, y: finalY - 6 }
                        : { opacity: 0, y: 320 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.16 + 1.0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    x={x - 4}
                    width={w + 8}
                    height={6}
                    fill="#8C6A3F"
                  />
                  {/* Walnut base */}
                  <rect
                    x={x - 4}
                    y={320}
                    width={w + 8}
                    height={6}
                    fill="#553F26"
                  />
                  {/* Pillar label */}
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + idx * 0.16 + 1.2,
                    }}
                    x={cx}
                    y={finalY + finalH / 2}
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize="14"
                    fill="#FBF7F0"
                    transform={`rotate(-90 ${cx} ${finalY + finalH / 2})`}
                  >
                    {pillar.title}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="grid gap-5 content-center">
          {PILLARS.map(({ Icon, title, body }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + idx * 0.12,
              }}
              className="flex gap-4 pb-5 last:pb-0 last:border-0 border-b border-line"
            >
              <div className="grid place-items-center w-10 h-10 border border-bronze/30 text-bronze-700 shrink-0">
                <Icon className="w-4 h-4" strokeWidth={1.4} />
              </div>
              <div>
                <div className="font-serif text-xl text-navy">{title}</div>
                <p className="mt-1 text-[13.5px] text-ink-soft leading-relaxed">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
