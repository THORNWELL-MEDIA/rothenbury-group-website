"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

export type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
  eyebrow?: string;
  heading?: string;
  description?: string;
};

export default function FAQAccordion({
  items,
  eyebrow = "Frequently Asked",
  heading = "Questions about Rothenbury Group.",
  description,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-cream/40 border-y border-line">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-32">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="mt-5 display-3 text-balance">{heading}</h2>
          {description && <p className="mt-6 body-md max-w-md">{description}</p>}
        </Reveal>

        <div className="border-t border-line">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            const Icon = isOpen ? Minus : Plus;
            return (
              <Reveal key={idx} delay={idx * 0.04}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-6 py-6 lg:py-7 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                        Q · {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 font-serif text-xl lg:text-2xl text-navy leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <span
                      className={`grid place-items-center w-9 h-9 mt-1 border transition-colors flex-shrink-0 ${
                        isOpen
                          ? "bg-navy border-navy text-bone"
                          : "border-navy/25 text-navy group-hover:bg-navy group-hover:text-bone group-hover:border-navy"
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 lg:pb-8 pr-12 text-ink-soft leading-relaxed max-w-3xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
