import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/imagery";

type Props = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CTASection({
  eyebrow = "Speak with our team",
  heading = "Direct lines to the holding company.",
  body = "For corporate inquiries, portfolio questions, board introductions, or media requests, contact our office. We respond to qualified inquiries within two business days.",
  primaryHref = "/contact/",
  primaryLabel = CTA.primary,
  secondaryHref = "/portfolio/",
  secondaryLabel = CTA.tertiary,
}: Props) {
  return (
    <section className="relative bg-navy text-bone overflow-hidden grain">
      <Image
        src={IMAGES.glassFacadeAbstract}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
      <div className="container-wide relative section grid gap-12 lg:grid-cols-[1.4fr_1fr] items-end">
        <div>
          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
            <span className="h-px w-8 bg-gold-300/60" />
            {eyebrow}
          </div>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.05] tracking-tight text-balance">
            {heading}
          </h2>
          <p className="mt-7 max-w-2xl text-ivory/90 text-lg leading-relaxed">{body}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <Link href={primaryHref} className="btn-gold w-full lg:w-auto group">
            {primaryLabel}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 border border-bone/30 text-bone px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase font-medium hover:bg-bone hover:text-navy transition-all no-underline w-full lg:w-auto"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
