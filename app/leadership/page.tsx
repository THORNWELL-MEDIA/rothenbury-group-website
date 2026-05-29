import Link from "next/link";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "Leadership",
  description:
    "Meet the leadership team behind Rothenbury Group's multi-entity holding operation.",
  alternates: { canonical: "/leadership/" },
};

type Member = {
  name: string;
  title: string;
  bio: string;
  status: "approved" | "private" | "directory";
};

const MEMBERS: Member[] = [
  {
    name: "Office of the Founder",
    title: "Founder, President & COO",
    bio: "Day-to-day governance of the Group is led by the founder and a small leadership team. The founder operates between the Toronto and New York offices and is reachable via the Office of the Group for board, investor, and counterparty correspondence.",
    status: "private",
  },
  {
    name: "Office of the Chief of Staff",
    title: "Chief of Staff",
    bio: "Cross-portfolio coordination, board cadence, and operating-partner enablement are managed by the Chief of Staff. Operating partners receive direct support through this office across reporting, governance, and shared-services delivery.",
    status: "private",
  },
  {
    name: "Senior operating partners",
    title: "Operating Partner Bench",
    bio: "Senior operators across finance, talent, procurement, technology, and integration sit at the Group level and are deployed across the portfolio. Specific assignments are confidential to operating partners and counterparties.",
    status: "directory",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.rothenbury.com/" },
          { name: "Leadership", url: "https://www.rothenbury.com/leadership/" },
        ])}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.officeInterior}
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
            <span className="mx-2">/</span> Leadership
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.04] tracking-tightest text-balance">
              The team responsible for governance, capital, and the long view.
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md">
              Each line of business within the portfolio is led independently. The roster
              below covers parent-level governance.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((member, idx) => {
              return (
                <article
                  key={idx}
                  className="surface p-7 lg:p-8 flex flex-col"
                >
                  <div className="aspect-[4/5] relative bg-walnut/10 border border-line overflow-hidden flex items-center justify-center">
                    {member.status === "private" ? (
                      <div className="text-center px-6">
                        <Lock className="mx-auto w-7 h-7 text-bronze-700" strokeWidth={1.25} />
                        <div className="mt-4 font-serif italic text-2xl text-navy">
                          Office of the Group
                        </div>
                        <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-bronze-700">
                          Toronto · New York
                        </div>
                      </div>
                    ) : (
                      <div className="text-center px-6">
                        <User className="mx-auto w-10 h-10 text-bronze-700" strokeWidth={1.1} />
                        <div className="mt-4 font-serif italic text-xl text-navy">
                          Operating bench
                        </div>
                        <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-bronze-700">
                          Cross-portfolio
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                      {member.title}
                    </div>
                    <h2 className="mt-3 font-serif text-2xl text-navy">
                      {member.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {member.bio}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-ink-soft italic leading-relaxed">
            Rothenbury Group keeps leadership identification private as a matter of
            operating policy. Board introductions and named-leadership engagements are
            arranged directly through the Office of the Group.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Speak with leadership"
        heading="Direct lines for board introductions and media."
        body="For board introductions, governance inquiries, or media requests directed to leadership, please contact us through the corporate office."
      />
    </>
  );
}
