"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Decades-long ownership timeline.
 *
 * A horizontal multigenerational timeline. Eight decade markers with
 * ownership-stage milestones below the line. The line itself is a continuous
 * burgundy rule with a bronze hairline. Built to read as a heritage chronology
 * rather than a marketing roadmap.
 */

type Phase = {
  decade: string;
  label: string;
  body: string;
};

const PHASES: Phase[] = [
  {
    decade: "Year 0",
    label: "Acquisition",
    body: "Capital deployed. Operator retains brand, P&L, and decision rights. Governance standard installed.",
  },
  {
    decade: "Years 1-5",
    label: "Compounding",
    body: "Reinvestment, not extraction. Shared services bedded in. Reporting cadence established.",
  },
  {
    decade: "Years 5-15",
    label: "Maturation",
    body: "Operator scales without an exit clock. Capital expansions funded from the parent balance sheet.",
  },
  {
    decade: "Years 15+",
    label: "Permanence",
    body: "Ownership continues. Leadership transitions are planned, not forced. Continuity is the asset.",
  },
];

export default function OwnershipTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="border border-line bg-bone p-8 lg:p-12"
    >
      <div className="grid gap-2 sm:grid-cols-[1fr_1.2fr] mb-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
            Holding chronology
          </div>
          <div className="mt-2 font-serif text-2xl text-navy leading-snug">
            Decades, not quarters.
          </div>
        </div>
        <p className="text-[14px] text-ink-soft leading-relaxed self-end">
          The default holding horizon at Rothenbury is multigenerational.
          Operating partners are evaluated against compounding outcomes, not
          quarterly resale value.
        </p>
      </div>

      {/* Timeline rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-[26px] h-px bg-line" />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-[24px] h-[5px] bg-burgundy"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-[22px] h-[1px] bg-bronze"
        />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, idx) => (
            <motion.div
              key={phase.decade}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pt-14"
            >
              {/* Marker */}
              <div className="absolute left-0 top-[18px] w-4 h-4 rounded-full bg-bronze ring-4 ring-bone" />
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
                {phase.decade}
              </div>
              <div className="mt-2 font-serif text-xl text-navy">
                {phase.label}
              </div>
              <p className="mt-3 text-[13.5px] text-ink-soft leading-relaxed">
                {phase.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-line text-[12px] text-ink-mute italic leading-relaxed">
        Built for permanence. Not for exits.
      </div>
    </div>
  );
}
