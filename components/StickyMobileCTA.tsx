"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { NAP, TBD } from "@/lib/constants";
import { cn } from "@/lib/cn";

/**
 * Persistent mobile CTA bar. Pinned to the bottom on small viewports only.
 * If a phone number is published, shows tap-to-call alongside Contact.
 * Hidden on lg+ where the header CTA already serves the purpose.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  const phoneVisible = NAP.phoneDisplay !== TBD;

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 lg:hidden transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="border-t border-bronze-200/20 bg-burgundy/95 backdrop-blur supports-[backdrop-filter]:bg-burgundy/90 grain">
        <div className="container-wide flex items-stretch py-2 gap-2">
          {phoneVisible ? (
            <a
              href={`tel:${NAP.phoneE164}`}
              className="flex-1 flex items-center justify-center gap-2 border border-bronze-200/30 text-ivory text-[12px] uppercase tracking-[0.18em] min-h-[44px] py-3 no-underline hover:bg-ivory hover:text-burgundy transition-colors"
              aria-label="Call Rothenbury Group"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
              Call
            </a>
          ) : null}
          <Link
            href="/contact/"
            className="flex-1 flex items-center justify-center gap-2 bg-bronze text-ivory text-[12px] uppercase tracking-[0.18em] min-h-[44px] py-3 font-medium no-underline hover:bg-bronze-600 transition-colors"
          >
            Request a private introduction
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
