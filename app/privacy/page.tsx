import SchemaJsonLd from "@/components/SchemaJsonLd";
import LegalLayout from "@/components/LegalLayout";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Rothenbury Group privacy policy. Learn how we collect, use, and protect personal information.",
  alternates: { canonical: "/privacy/" },
};

const TOC = [
  { id: "information", label: "Information we collect" },
  { id: "use", label: "How we use information" },
  { id: "pipeda", label: "Canadian privacy law (PIPEDA)" },
  { id: "casl", label: "CASL (Anti-Spam Legislation)" },
  { id: "us", label: "United States privacy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.rothenbury.com/" },
          { name: "Privacy Policy", url: "https://www.rothenbury.com/privacy/" },
        ])}
      />
      <LegalLayout
        title="Privacy Policy"
        intro="Rothenbury Group respects your privacy. This policy describes the personal information we collect, how we use it, and the choices you have. It applies to information collected through this website and through direct corporate interactions."
        toc={TOC}
        breadcrumbLabel="Privacy Policy"
      >
        <h2 id="information" className="font-serif text-2xl text-navy">Information we collect</h2>
        <p>
          We may collect personal information that you voluntarily provide to us when you
          contact us through this site, including your name, email address, organization,
          and the contents of your message. We may also collect technical information
          automatically (for example, IP address, device type, and pages viewed) through
          standard analytics tools.
        </p>

        <h2 id="use" className="font-serif text-2xl text-navy">How we use information</h2>
        <p>
          We use information you provide to respond to your inquiries, to communicate with
          you about Rothenbury Group, and to operate and improve this website. We do not
          sell personal information.
        </p>

        <h2 id="pipeda" className="font-serif text-2xl text-navy">Canadian privacy law</h2>
        <p>
          We handle personal information in accordance with the Personal Information
          Protection and Electronic Documents Act (PIPEDA). You have the right to access
          and correct your personal information, and to withdraw consent at any time,
          subject to legal or contractual restrictions.
        </p>

        <h2 id="casl" className="font-serif text-2xl text-navy">CASL (Canada's Anti-Spam Legislation)</h2>
        <p>
          We send commercial electronic messages only with appropriate consent and in
          compliance with CASL. Every commercial message includes our identification and
          an unsubscribe mechanism.
        </p>

        <h2 id="us" className="font-serif text-2xl text-navy">United States privacy</h2>
        <p>
          For United States residents, we process personal information in accordance
          with applicable state privacy laws, including disclosure, access, correction,
          and deletion rights where they apply.
        </p>

        <h2 id="contact" className="font-serif text-2xl text-navy">Contact</h2>
        <p>
          For privacy questions or to exercise your rights, contact us through our Contact
          page. Written privacy requests are routed through the Office of the Group.
        </p>
      </LegalLayout>
    </>
  );
}
