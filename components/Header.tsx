"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { NAP, TBD } from "@/lib/constants";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/about/", label: "About" },
  { href: "/thesis/", label: "Thesis" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/leadership/", label: "Leadership" },
  { href: "/insights/", label: "Insights" },
  { href: "/reviews/", label: "Reviews" },
  { href: "/careers/", label: "Careers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const phoneVisible = NAP.phoneDisplay !== TBD;

  return (
    <header className="sticky top-0 z-40 bg-bone/90 backdrop-blur supports-[backdrop-filter]:bg-bone/70 border-b border-line">
      {/* Top utility strip */}
      <div className="hidden md:block border-b border-line/60 text-[11px] tracking-[0.18em] uppercase">
        <div className="container-wide flex items-center justify-between py-2 text-ink-soft">
          <div className="flex items-center gap-6">
            <span>Toronto · New York</span>
            <span className="opacity-50">|</span>
            <span>Private Holding Group · Operating Across North America</span>
          </div>
          <div className="flex items-center gap-6">
            {phoneVisible && (
              <a href={`tel:${NAP.phoneE164}`} className="hover:text-navy no-underline">
                {NAP.phoneDisplay}
              </a>
            )}
            <Link href="/contact/" className="hover:text-navy no-underline">
              Request a private introduction
            </Link>
          </div>
        </div>
      </div>

      {/* Primary bar */}
      <div className="container-wide flex items-center justify-between py-5">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] uppercase tracking-[0.16em] text-ink-soft hover:text-navy no-underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact/"
            className="hidden sm:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-navy hover:text-bronze no-underline transition-colors"
          >
            Contact <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 border border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-ivory transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav
        aria-label="Mobile"
        className={cn(
          "lg:hidden border-t border-line overflow-hidden transition-[max-height] duration-500 ease-out bg-bone",
          open ? "max-h-[640px]" : "max-h-0",
        )}
      >
        <div className="container-wide py-4 flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-4 min-h-[44px] border-b border-line/60 text-[15px] uppercase tracking-[0.18em] text-burgundy hover:text-bronze-700 no-underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-6 mb-2 btn-primary w-full"
          >
            Request a private introduction
          </Link>
        </div>
      </nav>
    </header>
  );
}
