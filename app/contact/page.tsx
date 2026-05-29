import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Building, Users, Newspaper, Briefcase } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import ContactForm from "@/components/ContactForm";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import { NAP, HOURS, TBD } from "@/lib/constants";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "Contact",
  description:
    "Contact Rothenbury Group by phone, email, or form. Corporate inquiries, portfolio questions, and media requests welcome.",
  alternates: { canonical: "/contact/" },
};

const INQUIRY_LANES = [
  {
    Icon: Building,
    title: "Corporate",
    note: "Governance, partnerships, and parent-level inquiries.",
  },
  {
    Icon: Users,
    title: "Portfolio",
    note: "Operating brand introductions and portfolio questions.",
  },
  {
    Icon: Newspaper,
    title: "Media",
    note: "Press inquiries, interviews, and statements.",
  },
  {
    Icon: Briefcase,
    title: "Careers",
    note: "Senior operator and leadership opportunities.",
  },
];

export default function ContactPage() {
  const phoneVisible = NAP.phoneDisplay !== TBD;
  const emailVisible = NAP.email !== TBD;
  const addressVisible = NAP.street !== TBD;

  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Contact", url: "https://www.rothenbury.com/contact/" },
          ]),
          contactPageSchema(),
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.boardroomDark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/65" />
        <div className="container-wide relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Contact
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[38px] sm:text-[56px] lg:text-[88px] leading-[1.06] sm:leading-[1.02] tracking-tightest text-balance">
              <span className="italic text-bronze-200">A private introduction</span> through the Office of the Group.
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md font-serif italic">
              Inquiries from operators, allocators, counterparties, and the
              press are received and routed by our office. We respond to
              qualified introductions within two business days.
            </p>
          </div>
        </div>
      </section>

      {/* INQUIRY LANES */}
      <section className="bg-bone border-b border-line">
        <div className="container-wide py-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
          {INQUIRY_LANES.map(({ Icon, title, note }) => (
            <div key={title} className="bg-bone p-7 lg:p-8">
              <Icon className="w-7 h-7 text-bronze-700" strokeWidth={1.25} />
              <h3 className="mt-5 font-serif text-xl text-navy">{title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + DETAILS */}
      <section className="bg-bone">
        <div className="container-wide py-20 lg:py-24 grid gap-14 lg:grid-cols-[1.3fr_1fr] items-start">
          <div>
            <div className="eyebrow">Request a private introduction</div>
            <h2 className="mt-5 display-3 text-balance">
              Confidential, by design.
            </h2>
            <p className="mt-5 body-md max-w-xl">
              Submissions are received privately by the Office of the Group and
              routed to the appropriate member of leadership. Specific portfolio
              detail and named-leadership engagements are arranged by direct
              correspondence after a first introduction.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-32">
            <div className="border border-line bg-cream/30 p-7 lg:p-8">
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                Office of the Group
              </h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-ink-soft mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    {addressVisible ? (
                      <address className="not-italic text-navy leading-relaxed">
                        {NAP.street}
                        <br />
                        {NAP.city}, {NAP.region} {NAP.postalCode}
                        <br />
                        {NAP.country}
                      </address>
                    ) : (
                      <span className="text-navy leading-relaxed">
                        Office of the Group
                        <br />
                        Toronto · New York
                      </span>
                    )}
                  </div>
                </li>
                {phoneVisible ? (
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-ink-soft flex-shrink-0" strokeWidth={1.5} />
                    <a href={`tel:${NAP.phoneE164}`} className="text-navy no-underline">
                      {NAP.phoneDisplay}
                    </a>
                  </li>
                ) : null}
                {emailVisible ? (
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-ink-soft flex-shrink-0" strokeWidth={1.5} />
                    <a href={`mailto:${NAP.email}`} className="text-navy no-underline">
                      {NAP.email}
                    </a>
                  </li>
                ) : null}
                {!phoneVisible && !emailVisible ? (
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-ink-soft mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-navy leading-relaxed">
                      Use the form to reach the corporate office. We respond to qualified
                      inquiries within two business days.
                    </span>
                  </li>
                ) : null}
              </ul>

              <div className="mt-7 pt-6 border-t border-line">
                <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.5} /> Office Hours
                </h4>
                <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm">
                  <dt className="text-ink-soft">Mon-Fri</dt>
                  <dd className="text-navy text-right">{HOURS.monday}</dd>
                  <dt className="text-ink-soft">Sat-Sun</dt>
                  <dd className="text-navy text-right">Closed</dd>
                </dl>
                <p className="mt-3 text-[11px] text-ink-mute italic leading-relaxed">
                  Time zone: {HOURS.timezone}.
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative aspect-[4/3] bg-navy/5 border border-line overflow-hidden">
              <Image
                src={IMAGES.aerialCity}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-bone">
                <div className="text-[10px] uppercase tracking-[0.22em]">
                  Toronto · New York · Across North America
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-bronze-200">
                  Office of the Group
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
