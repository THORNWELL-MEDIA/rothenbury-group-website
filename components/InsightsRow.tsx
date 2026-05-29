import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/lib/imagery";
import { INSIGHTS } from "@/lib/insights";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

/**
 * Editorial-style insights row.
 * Sources article metadata from lib/insights.ts (single source of truth).
 */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InsightsRow() {
  return (
    <section className="section bg-bone">
      <div className="container-wide">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="eyebrow">Insights</div>
              <h2 className="mt-5 display-2 text-balance">
                Letters and notes from the holding company.
              </h2>
            </div>
            <Link href="/insights/" className="btn-secondary group whitespace-nowrap">
              All insights
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((item) => (
            <StaggerItem key={item.slug}>
              <Link
                href={`/insights/${item.slug}/`}
                className="block no-underline"
              >
                <article className="group surface surface-hover overflow-hidden h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={IMAGES[item.imageKey]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/45" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-bone/95 text-navy px-3 py-1.5">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                      <span>{formatDate(item.date)}</span>
                      <span className="italic text-bronze-700/80">Read</span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl text-ink-soft italic leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">{item.excerpt}</p>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
