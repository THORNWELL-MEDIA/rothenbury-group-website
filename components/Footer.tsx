import Link from "next/link";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "@/components/Logo";
import PrincipalSignup from "@/components/PrincipalSignup";
import { BRAND, FOOTER_LEGAL, NAP, SOCIAL, TBD } from "@/lib/constants";

const COL_GROUP = [
  { href: "/about/", label: "About" },
  { href: "/thesis/", label: "Thesis" },
  { href: "/portfolio/", label: "Operating Companies" },
  { href: "/insights/", label: "Insights" },
  { href: "/leadership/", label: "Leadership" },
  { href: "/contact/", label: "Private introduction" },
];

const COL_LEGAL = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

const CITIES_CANADA = ["Toronto", "Vancouver", "Montreal", "Calgary"];
const CITIES_US = [
  "New York",
  "Boston",
  "Atlanta",
  "Miami",
  "Chicago",
  "Dallas",
  "Los Angeles",
  "Phoenix",
  "Austin",
  "Denver",
];

const SOCIALS = [
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL.youtube, label: "YouTube", Icon: Youtube },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const phoneVisible = NAP.phoneDisplay !== TBD;
  const emailVisible = NAP.email !== TBD;

  return (
    <footer className="bg-navy text-bone mt-32 grain">
      {/* Bronze hairline divider above footer */}
      <div
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, rgba(140, 106, 63, 0.65), rgba(233, 219, 194, 0.95), rgba(140, 106, 63, 0.65), transparent)",
        }}
      />
      <div className="container-wide pt-24 pb-12">
        {/* Lead-in: tagline + headquarter statement */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-end pb-16 border-b border-bronze-200/15">
          <div>
            <Logo variant="bone" />
            <p className="mt-6 max-w-xl font-serif text-2xl lg:text-3xl text-ivory leading-snug text-balance">
              A privately-held diversified holding group,
              <span className="text-bronze-200"> operating across the United States and Canada.</span>
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <Link href="/contact/" className="btn-gold">
              Request a private introduction
            </Link>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze-200">
              Office of the Group
            </p>
          </div>
        </div>

        {/* Geographic footprint */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 pt-14 pb-12 border-b border-bone/10">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
              Canada
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ivory/85 leading-relaxed">
              {CITIES_CANADA.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
              United States
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ivory/85 leading-relaxed">
              {CITIES_US.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
              Group
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COL_GROUP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/90 hover:text-bronze-200 no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal + Connect */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 pt-12">
          <div className="lg:col-span-2 space-y-3 text-sm text-ivory/80 leading-relaxed max-w-2xl">
            {phoneVisible ? (
              <a
                href={`tel:${NAP.phoneE164}`}
                className="block text-ivory/95 hover:text-bone no-underline"
              >
                {NAP.phoneDisplay}
              </a>
            ) : null}
            {emailVisible ? (
              <a
                href={`mailto:${NAP.email}`}
                className="block text-ivory/95 hover:text-bone no-underline"
              >
                {NAP.email}
              </a>
            ) : null}
            <p>
              Operating partners across the United States and Canada. The Office of
              the Group coordinates correspondence between Toronto and New York.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
                Connect
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    rel="me noopener"
                    target="_blank"
                    aria-label={label}
                    className="grid place-items-center w-10 h-10 border border-bone/20 hover:bg-bone hover:text-navy text-ivory/90 transition-colors no-underline"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {COL_LEGAL.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ivory/90 hover:text-bronze-200 no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Principal-only updates */}
      <div className="container-wide pt-14 pb-12 border-t border-bone/10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-end max-w-5xl">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
              Principal-only updates
            </div>
            <p className="mt-5 font-serif text-2xl lg:text-3xl text-ivory leading-snug max-w-2xl text-balance">
              Quarterly notes from the Office of the Group.
              <span className="text-bronze-200">
                {" "}
                Distributed privately, by name only.
              </span>
            </p>
            <p className="mt-4 text-[13px] text-ivory/75 leading-relaxed max-w-xl">
              Two to four notes a year. Operator letters, market observations,
              and structural commentary on permanent-capital ownership. No
              marketing.
            </p>
          </div>
          <PrincipalSignup />
        </div>
      </div>

      {/* Heritage seal - bronze italic mark */}
      <div className="container-wide pt-12 pb-10 border-t border-bone/10">
        <div className="flex items-center justify-center gap-5">
          <span className="h-px w-20 bg-bronze-200/35" />
          <span className="font-serif italic text-bronze-200 text-base sm:text-lg tracking-wide text-center">
            Established &middot; Operating across North America
          </span>
          <span className="h-px w-20 bg-bronze-200/35" />
        </div>
      </div>

      <div className="border-t border-bronze-200/15">
        <div className="container-wide py-8 text-[12px] text-ivory/80 leading-relaxed grid gap-4 lg:grid-cols-[3fr_1fr] items-start">
          <div className="space-y-2 max-w-4xl">
            <p>{FOOTER_LEGAL}</p>
            <p>
              {BRAND.publicName} operates across the United States and Canada.
              Operating partners conduct activities under local law in their respective
              jurisdictions.
            </p>
            <p className="text-ivory/55 text-[11px]">
              Office of the Group · Toronto, Ontario · New York, NY.
            </p>
          </div>
          <p className="lg:text-right">© {year} {BRAND.publicName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
