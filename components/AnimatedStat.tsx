"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

type Props = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  caption?: string;
  /** Pad to N digits, e.g. 13 -> "13", with padTo=2; 7 with padTo=2 -> "07". */
  padTo?: number;
  /** Optional unit-of-measure printed under the figure (e.g. "operating brands"). */
  unit?: string;
  inverse?: boolean;
};

export default function AnimatedStat({
  value,
  label,
  suffix = "",
  prefix = "",
  caption,
  padTo,
  unit,
  inverse = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      // Slow, deliberate count-up — Berkshire annual letter pacing.
      // ~4s for headline figures distinguishes Rothenbury from faster peers.
      duration: 4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        setDisplay(padTo ? String(rounded).padStart(padTo, "0") : String(rounded));
      },
    });
    return () => controls.stop();
  }, [inView, value, padTo, count]);

  const accent = inverse ? "text-bone" : "text-navy";
  const labelTone = inverse ? "text-ivory/85" : "text-ink-soft";
  const captionTone = inverse ? "text-ivory/80" : "text-ink-soft";
  const unitTone = inverse ? "text-bronze-200" : "text-bronze-700";

  return (
    <div ref={ref} className="relative">
      <div className={`font-serif ${accent} text-5xl sm:text-6xl lg:text-[68px] leading-none tracking-tightest tabular-nums`}>
        {prefix}
        {display}
        {suffix}
      </div>
      {unit && (
        <div className={`mt-3 text-[10px] uppercase tracking-[0.24em] font-medium ${unitTone}`}>
          {unit}
        </div>
      )}
      <div className={`mt-3 text-sm uppercase tracking-[0.16em] ${labelTone}`}>{label}</div>
      {caption && (
        <p className={`mt-3 text-[12px] leading-relaxed italic ${captionTone}`}>{caption}</p>
      )}
    </div>
  );
}

/** Container that staggers entrance for a row of stats. */
export function StatRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StatItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
