"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Bar = {
  label: string;
  years: number;
  max: number;
  note: string;
  highlight?: boolean;
};

const BARS: Bar[] = [
  { label: "Typical PE fund", years: 5, max: 30, note: "Raise · invest · exit" },
  { label: "Strategic acquirer", years: 10, max: 30, note: "Until next reorg" },
  { label: "Family office", years: 15, max: 30, note: "Generational, but liquid" },
  {
    label: "Rothenbury Group",
    years: 30,
    max: 30,
    note: "Permanent capital · indefinite",
    highlight: true,
  },
];

export default function HoldingHorizonChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="border border-bronze-200/20 bg-walnut/40 p-8 lg:p-12"
    >
      <div className="space-y-7">
        {BARS.map((bar, idx) => {
          const widthPct = (bar.years / bar.max) * 100;
          const isInfinite = bar.years === bar.max;
          const fillColor = bar.highlight
            ? "bg-bronze-200"
            : bar.label === "Family office"
            ? "bg-bone/70"
            : bar.label === "Strategic acquirer"
            ? "bg-bronze-200/60"
            : "bg-bronze-300/50";

          return (
            <div key={bar.label}>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div
                    className={`font-serif text-2xl ${
                      bar.highlight ? "text-bronze-200" : "text-ivory"
                    }`}
                  >
                    {bar.label}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 mt-1">
                    {bar.note}
                  </div>
                </div>
                <div
                  className={`font-serif text-3xl ${
                    bar.highlight ? "text-bronze-200" : "text-ivory"
                  }`}
                >
                  {isInfinite ? "∞" : `${bar.years} yrs`}
                </div>
              </div>
              <div className="mt-3 h-2 bg-ivory/10 relative overflow-visible">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.18 + idx * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute inset-y-0 left-0 ${fillColor}`}
                />
                {/* Bronze accent endpoint dot */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + idx * 0.18 + 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-walnut"
                  style={{
                    left: `calc(${widthPct}% - 6px)`,
                    backgroundColor: bar.highlight ? "#E9DBC2" : "#8C6A3F",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 grid grid-cols-7 text-[10px] uppercase tracking-[0.2em] text-ivory/55 font-mono">
        <span>0</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>25</span>
        <span className="text-right">30+ years</span>
      </div>
    </div>
  );
}
