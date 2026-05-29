import SchemaJsonLd from "@/components/SchemaJsonLd";
import LegalLayout from "@/components/LegalLayout";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Terms of Use",
  description:
    "Rothenbury Group terms of use governing access to and use of this website.",
  alternates: { canonical: "/terms/" },
};

const TOC = [
  { id: "no-offer", label: "No offer or solicitation" },
  { id: "structure", label: "Holding company structure" },
  { id: "ip", label: "Intellectual property" },
  { id: "third-party", label: "Third-party links" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.rothenbury.com/" },
          { name: "Terms of Use", url: "https://www.rothenbury.com/terms/" },
        ])}
      />
      <LegalLayout
        title="Terms of Use"
        intro="These Terms of Use govern your access to and use of the Rothenbury Group website. By accessing or using the site, you agree to be bound by these terms."
        toc={TOC}
        breadcrumbLabel="Terms of Use"
      >
        <h2 id="no-offer" className="font-serif text-2xl text-navy">No offer or solicitation</h2>
        <p>
          The information on this site is for general informational purposes only. Nothing
          on this site constitutes an offer to sell, or a solicitation of an offer to buy,
          any security, interest, or service. Investment-related and commercial activities
          of operating brands within the Rothenbury Group portfolio are conducted through
          those entities directly and are subject to their own terms and disclosures.
        </p>

        <h2 id="structure" className="font-serif text-2xl text-navy">Holding company structure</h2>
        <p>
          Rothenbury Group is a holding company. Operating businesses are conducted through
          subsidiary and affiliated entities, each of which is separately governed.
          References on this site to operating brands within the portfolio are descriptive
          and do not imply joint liability between Rothenbury Group and any operating
          brand.
        </p>

        <h2 id="ip" className="font-serif text-2xl text-navy">Intellectual property</h2>
        <p>
          All content on this site, including text, graphics, logos, and trademarks, is
          owned by or licensed to Rothenbury Group and is protected by applicable
          intellectual property laws. You may not reproduce, modify, or distribute content
          from this site without prior written permission.
        </p>

        <h2 id="third-party" className="font-serif text-2xl text-navy">Third-party links</h2>
        <p>
          This site may link to third-party websites operated by our portfolio brands or
          unaffiliated parties. We do not control and are not responsible for the content
          of those websites.
        </p>

        <h2 id="disclaimers" className="font-serif text-2xl text-navy">Disclaimers</h2>
        <p>
          The site is provided on an "as is" and "as available" basis. To the fullest
          extent permitted by law, Rothenbury Group disclaims all warranties, express or
          implied, regarding the site and its content.
        </p>

        <h2 id="law" className="font-serif text-2xl text-navy">Governing law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction in which Rothenbury
          Group is incorporated, without regard to conflict-of-laws principles.
        </p>

        <h2 id="contact" className="font-serif text-2xl text-navy">Contact</h2>
        <p>Questions about these Terms can be directed through our Contact page.</p>
      </LegalLayout>
    </>
  );
}
