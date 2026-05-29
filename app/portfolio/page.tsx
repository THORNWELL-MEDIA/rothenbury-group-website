import Image from "next/image";
import Link from "next/link";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { SECTOR_ENTRIES } from "@/lib/services";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "Portfolio",
  description:
    "Rothenbury Group's holdings span real estate, property services, maintenance, staffing, media, and technology across operating partners in the United States and Canada.",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Portfolio", url: "https://www.rothenbury.com/portfolio/" },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.glassFacadeAbstract}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Portfolio
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.04] tracking-tightest text-balance">
              Holdings across <span className="italic text-bronze-200">six sectors</span>, governed as one portfolio.
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md">
              Specific portfolio detail is held in investor and counterparty materials.
              Public-facing description is by sector of activity.
            </p>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-bone">
        <div className="container-wide py-20 lg:py-28">
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line">
            {SECTOR_ENTRIES.map((entry, idx) => (
              <article key={entry.slug} className="bg-bone p-8 lg:p-10">
                <div className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                  Sector · 0{idx + 1}
                </div>
                <h2 className="mt-5 font-serif text-3xl text-navy tracking-tight">
                  {entry.name}
                </h2>
                <p className="mt-5 text-sm text-ink-soft leading-relaxed">
                  {entry.shortDescription}
                </p>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  {entry.longDescription}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-xs text-ink-soft italic leading-relaxed">
            For inquiries about specific portfolio companies, please contact the office
            directly. Detailed portfolio information is shared with qualified
            counterparties under appropriate non-disclosure terms.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Portfolio inquiries"
        heading="Speak with us about the portfolio."
        body="For inquiries from operators, allocators, or counterparties, please use the contact form below. Our office responds to qualified inquiries within two business days."
      />
    </>
  );
}
