import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Layers, MapPin } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";

import { fetchRolesFromApi } from '@/lib/data/careers'
import JobFilterList from './job-filter-list'
import JobFilterControls from './job-filter-controls'
import { CareersFilterProvider } from './careers-filter-context'

export const metadata = {
  title: "Careers",
  description:
    "Explore career opportunities across the Rothenbury Group portfolio of operating partners across the United States and Canada.",
  alternates: { canonical: "/careers/" },
};

const PILLARS = [
  {
    Icon: Users,
    eyebrow: "What We Look For",
    title: "Operators.",
    body: "People who run things end-to-end and care about outcomes more than process. We hire builders, not administrators.",
  },
  {
    Icon: Layers,
    eyebrow: "How We Work",
    title: "Independent brands.",
    body: "Each operating brand runs with its own leadership, identity, and culture. The parent provides governance, not management.",
  },
  {
    Icon: MapPin,
    eyebrow: "Where",
    title: "Across North America.",
    body: "Roles are based at operating partners across the United States and Canada, with select remote and hybrid arrangements depending on the operating brand.",
  },
];

export default async function CareersPage() {
  const allRoles = await fetchRolesFromApi()
  const totalRoles = allRoles.length

  return (
    <CareersFilterProvider allRoles={allRoles}>
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.rothenbury.com/" },
          { name: "Careers", url: "https://www.rothenbury.com/careers/" },
        ])}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.creativeWorkspace}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Careers
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.04] tracking-tightest text-balance">
              Build a career across <span className="italic text-bronze-200">enduring businesses.</span>
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md">
              Rothenbury Group's operating brands hire across real estate, services, media,
              staffing, and platform technology. We hire people who want to do excellent work
              over a long arc.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/careers/#positions" className="btn-gold group">
              View open positions
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
            <Link
              href="/portfolio/"
              className="inline-flex items-center justify-center gap-2 border border-bone/30 text-bone px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase font-medium hover:bg-bone hover:text-navy transition-all no-underline"
            >
              Explore the portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-b border-line py-8">
        <div className="container-wide">
          <JobFilterControls scrollToId="positions" />
        </div>
      </section>

      {/* PILLARS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">How We Hire</div>
            <h2 className="mt-5 display-2 text-balance">Three things we believe.</h2>
          </div>
          <div className="mt-14 grid gap-px bg-line lg:grid-cols-3 border border-line">
            {PILLARS.map(({ Icon, eyebrow, title, body }, idx) => (
              <div key={title} className="bg-bone p-8 lg:p-10">
                <div className="text-[11px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                  0{idx + 1} · {eyebrow}
                </div>
                <Icon className="mt-6 w-9 h-9 text-navy" strokeWidth={1.2} />
                <h3 className="mt-7 font-serif text-3xl text-navy leading-tight">{title}</h3>
                <p className="mt-4 text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="positions" className="bg-ivory py-16 md:py-24">
        <div className="container-wide">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
            Open positions
          </p>
          <h2 className="text-3xl font-serif leading-tight text-navy md:text-4xl">
            {totalRoles} {totalRoles === 1 ? 'role' : 'roles'} open right now.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink/70 mb-10">
            Filtered by province or state, then city. Click a role to read the
            full job description and apply.
          </p>

          <div className="mb-10">
            <JobFilterControls scrollToId="positions" />
          </div>

          <JobFilterList />
        </div>
      </section>

      <CTASection
        eyebrow="Don't see your role?"
        heading="We accept open applications for senior operators."
        body="Senior operator and leadership opportunities open across the portfolio throughout the year. Send us your background. If it's a fit, we'll route it to the right operating brand."
        primaryHref="/careers/#positions"
        primaryLabel="Explore Opportunities"
        secondaryHref="/contact/"
        secondaryLabel="Send open application"
      />
    </CareersFilterProvider>
  );
}
