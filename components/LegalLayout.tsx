import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { ScrollText } from "lucide-react";
import { IMAGES } from "@/lib/imagery";

type Props = {
  title: string;
  intro: string;
  reviewNote?: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
  breadcrumbLabel: string;
};

export default function LegalLayout({
  title,
  intro,
  reviewNote,
  toc,
  children,
  breadcrumbLabel,
}: Props) {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.marbleTexture}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/75" />
        <div className="container-wide relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Legal
            <span className="mx-2">/</span> {breadcrumbLabel}
          </nav>
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
            <ScrollText className="w-3.5 h-3.5" strokeWidth={1.5} /> Legal Notice
          </div>
          <h1 className="mt-5 font-serif text-bone text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.04] tracking-tightest text-balance max-w-3xl">
            {title}
          </h1>
          <p className="mt-6 text-ivory/90 text-base sm:text-lg leading-relaxed max-w-3xl">
            {intro}
          </p>
          {reviewNote && (
            <p className="mt-5 inline-flex items-center gap-2 px-3 py-2 border border-gold-300/30 bg-gold-300/5 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
              {reviewNote}
            </p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-bone">
        <div className="container-wide py-16 lg:py-24 grid gap-14 lg:grid-cols-[1fr_3fr] items-start">
          <aside className="lg:sticky lg:top-32 border-l border-line pl-6">
            <h2 className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
              On this page
            </h2>
            <nav className="mt-5 space-y-2.5">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-ink-soft hover:text-navy no-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
          <article className="max-w-3xl space-y-8 text-ink-soft leading-relaxed text-[15.5px]">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
