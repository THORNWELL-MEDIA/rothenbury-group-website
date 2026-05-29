import Link from "next/link";
import Image from "next/image";
import { FileText, BookOpen, ArrowUpRight } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";
import { INSIGHTS } from "@/lib/insights";

export const metadata = {
  title: "Insights",
  description:
    "Perspectives on holding-company strategy, multi-entity operations, and portfolio management from Rothenbury Group.",
  alternates: { canonical: "/insights/" },
};

const TOPICS = [
  {
    Icon: FileText,
    title: "Holding-company strategy",
    body: "How parent-level governance shapes operating outcomes across a multi-entity portfolio.",
  },
  {
    Icon: BookOpen,
    title: "Operator playbooks",
    body: "Lessons from operators inside the portfolio on building durable businesses.",
  },
  {
    Icon: ArrowUpRight,
    title: "Cross-border discipline",
    body: "Operating and governing across the United States and Canada under a single standard.",
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InsightsPage() {
  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Insights", url: "https://www.rothenbury.com/insights/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Rothenbury Group Insights",
            url: "https://www.rothenbury.com/insights/",
            description:
              "Perspectives on holding-company strategy, multi-entity operations, and portfolio management.",
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.marbleTexture}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Insights
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[36px] sm:text-[52px] lg:text-[76px] leading-[1.06] sm:leading-[1.04] tracking-tightest text-balance">
              Perspectives on <span className="italic text-bronze-200">long-duration ownership.</span>
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md">
              Articles, frameworks, and observations on holding-company strategy and
              multi-entity portfolio management, published as written and approved.
            </p>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Subject areas</div>
            <h2 className="mt-5 display-2 text-balance">What we write about.</h2>
          </div>
          <div className="mt-14 grid gap-px bg-line lg:grid-cols-3 border border-line">
            {TOPICS.map(({ Icon, title, body }, idx) => (
              <div key={title} className="bg-bone p-8 lg:p-10">
                <div className="text-[11px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
                  Topic 0{idx + 1}
                </div>
                <Icon className="mt-6 w-9 h-9 text-navy" strokeWidth={1.2} />
                <h3 className="mt-7 font-serif text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="section bg-cream/40 border-y border-line">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Latest letters & notes</div>
            <h2 className="mt-5 display-3 text-balance">
              Recent perspectives from the Office of the Group.
            </h2>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}/`}
                className="block no-underline group"
              >
                <article className="surface surface-hover overflow-hidden h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={IMAGES[article.imageKey]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/45" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-bone/95 text-navy px-3 py-1.5">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                      {formatDate(article.date)}
                    </div>
                    <h3 className="mt-4 font-serif text-xl text-navy leading-snug group-hover:text-bronze-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-bronze-700">
                      Read note
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
