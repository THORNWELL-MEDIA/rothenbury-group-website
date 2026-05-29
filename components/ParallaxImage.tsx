"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** How much vertical movement to apply (px), default 80. */
  intensity?: number;
  priority?: boolean;
  /** opacity of the image (used when overlay text is on top). */
  opacity?: number;
  sizes?: string;
};

export default function ParallaxImage({
  src,
  alt = "",
  className,
  intensity = 80,
  priority = false,
  opacity = 1,
  sizes = "100vw",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-12 inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ opacity }}
        />
      </motion.div>
    </div>
  );
}
