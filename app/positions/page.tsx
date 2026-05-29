import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Briefcase, ChevronLeft } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "Open Positions",
  description:
    "Current openings across Rothenbury Group and its portfolio companies. Open applications welcome.",
  alternates: { canonical: "/positions/" },
};

const TRACKS = [
  {
    track: "Operator track",
    title: "General Manager, Operating Brand",
    body:
      "We accept ongoing applications for senior operator roles across the portfolio. If you have run an operating business at scale and want to step into a brand within the Rothenbury portfolio, we'd like to hear from you.",
    location: "Toronto / New York / Remote (varies by brand)",
  },
  {
    track: "Functional track",
    title: "Finance, Operations & Technology",
    body:
      "We accept open applications for senior finance, operations, and technology leaders across the operating brands. Specific openings are posted as they are confirmed by individual brands.",
    location: "Toronto / New York / Remote (varies by brand)",
  },
];

export default function PositionsPage() {
  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Careers", url: "https://www.rothenbury.com/careers/" },
            { name: "Open Positions", url: "https://www.rothenbury.com/positions/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Open Positions",
            url: "https://www.rothenbury.com/positions/",
            numberOfItems: 0,
            description:
              "Rothenbury Group is currently accepting open applications. Specific roles will be posted with structured JobPosting schema as openings are confirmed.",
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.glassFacadeMinimal}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/65" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/careers/" className="hover:text-bone no-underline">Careers</Link>
            <span className="mx-2">/</span> Open Positions
          </nav>
          <h1 className="mt-6 font-serif text-bone text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.04] tracking-tightest text-balance max-w-5xl">
            Open positions across the portfolio.
          </h1>
          <p className="mt-7 text-ivory/90 text-lg sm:text-xl leading-relaxed max-w-3xl">
            Rothenbury Group is accepting open applications across the portfolio. As specific
            roles are confirmed by our operating brands, they will be published here with
            full role details and JobPosting structured data.
          </p>
        </div>
      </section>

      {/* TRACKS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="flex items-end justify-between flex-wrap gap-6 pb-10 border-b border-line">
            <div>
              <div className="eyebrow">Currently Accepting</div>
              <h2 className="mt-5 display-3">Open application tracks.</h2>
            </div>
            <Link
              href="/careers/"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink-soft hover:text-navy no-underline"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Careers
            </Link>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {TRACKS.map((t) => (
              <article key={t.title} className="surface p-8 lg:p-10 group flex flex-col">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                  <Briefcase className="w-4 h-4" strokeWidth={1.5} />
                  {t.track}
                </div>
                <h3 className="mt-6 font-serif text-3xl text-navy leading-tight">
                  {t.title}
                </h3>
                <p className="mt-4 text-ink-soft leading-relaxed flex-1">{t.body}</p>
                <div className="mt-6 pt-6 border-t border-line flex items-center gap-2 text-[12px] text-ink-soft">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {t.location}
                </div>
                <Link href="/contact/" className="mt-6 btn-secondary w-full group">
                  Submit application
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-xs text-ink-soft italic leading-relaxed">
            Note: This page lists open application tracks rather than confirmed postings.
            Live JobPosting structured data is added as roles are confirmed by individual
            operating brands.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
