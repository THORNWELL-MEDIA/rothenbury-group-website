"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __samConvWired?: boolean;
  }
}

type GtagArgs = unknown[];

function fire(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window;
  if (typeof w.gtag === "function") {
    (w.gtag as (...a: GtagArgs) => void)("event", event, params);
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...params });
  }
}

export function trackLead(source: string): void {
  fire("generate_lead", { source });
}

export function trackViewPricing(): void {
  fire("view_pricing");
}

export function trackViewReviews(): void {
  fire("view_reviews");
}

export function trackScroll75(): void {
  fire("scroll_75");
}

export function trackOutboundPhone(href: string): void {
  fire("outbound_click_phone", { link_url: href });
}

export function trackOutboundEmail(href: string): void {
  fire("outbound_click_email", { link_url: href });
}

/**
 * Mounts global listeners for:
 *   - scroll_75 (once per page-load)
 *   - outbound_click_phone (tel: clicks)
 *   - outbound_click_email (mailto: clicks)
 *   - view_pricing / view_reviews (path-based, on mount)
 * Idempotent via window.__samConvWired guard.
 */
export default function Analytics(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__samConvWired) return;
    window.__samConvWired = true;

    let fired75 = false;
    const onScroll = (): void => {
      if (fired75) return;
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        fired75 = true;
        trackScroll75();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClick = (ev: MouseEvent): void => {
      const target = ev.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackOutboundPhone(href);
      else if (href.startsWith("mailto:")) trackOutboundEmail(href);
    };
    document.addEventListener("click", onClick, true);

    const path = window.location.pathname || "";
    if (/^\/pricing\/?$/.test(path)) trackViewPricing();
    if (/^\/reviews\/?$/.test(path)) trackViewReviews();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
