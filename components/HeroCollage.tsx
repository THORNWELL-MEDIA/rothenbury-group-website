"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES, ImageKey } from "@/lib/imagery";

type Props = {
  images: readonly [ImageKey, ImageKey, ImageKey];
  priority?: boolean;
  className?: string;
};

/**
 * Three-image collage for hero panels.
 * Layout: one tall left, two stacked right.
 * Subtle parallax on each tile via framer-motion (mouse-follow).
 */
export default function HeroCollage({ images, priority = false, className }: Props) {
  return (
    <div
      className={`relative grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4 ${className ?? ""}`}
      style={{ aspectRatio: "5 / 6" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative col-span-1 row-span-2 overflow-hidden border border-bone/15"
      >
        <Image
          src={IMAGES[images[0]]}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative col-span-1 row-span-1 overflow-hidden border border-bone/15"
      >
        <Image
          src={IMAGES[images[1]]}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/15 via-transparent to-navy/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative col-span-1 row-span-1 overflow-hidden border border-bone/15"
      >
        <Image
          src={IMAGES[images[2]]}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-navy/55 via-transparent to-transparent" />
      </motion.div>

      {/* Floating gold rule between hero text and collage */}
      <span
        aria-hidden="true"
        className="absolute -left-3 top-12 hidden lg:block w-12 h-px bg-bronze-300/80"
      />
    </div>
  );
}
