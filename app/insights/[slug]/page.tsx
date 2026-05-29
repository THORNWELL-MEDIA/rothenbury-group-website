import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import Flourish from "@/components/Flourish";
import PullQuote from "@/components/PullQuote";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";
import { INSIGHTS } from "@/lib/insights";
import { BRAND } from "@/lib/constants";

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = INSIGHTS.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Insight Not Found" };
  }
  return {
    title: `${article.title} | ${BRAND.publicName} Insights`,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}/` },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Estimated reading time at ~230 wpm.
 */
function estimateReadTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

/**
 * Render article body with simple paragraph and markdown-bold support.
 * Bodies in lib/insights.ts use \n\n paragraph breaks and **bold** spans.
 *
 * The first paragraph receives a drop-cap. A pull-quote is inserted at a
 * mid-article paragraph break for editorial rhythm.
 */
function renderBody(body: string) {
  const paragraphs = body.split(/\n\n+/);
  const total = paragraphs.length;
  const pullQuoteIdx = total > 4 ? Math.floor(total / 2) : -1;

  // Pick a candidate sentence from the article for the pull quote - first short
  // sentence around the mid point that starts plain (avoid bullets / bold-heavy).
  let pullQuoteText: string | null = null;
  if (pullQuoteIdx >= 0) {
    const para = paragraphs[pullQuoteIdx]
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/^\s*-\s+/gm, "");
    const sentences = para.split(/(?<=\.)\s+/);
    const candidate = sentences.find((s) => {
      const len = s.length;
      return len >= 60 && len <= 220 && !s.startsWith("-");
    });
    if (candidate) pullQuoteText = candidate.trim();
  }

  const out: React.ReactNode[] = [];
  paragraphs.forEach((para, idx) => {
    // Bullet list block: lines starting with "- "
    if (para.split("\n").every((line) => line.trim().startsWith("- "))) {
      const items = para.split("\n").map((line) => line.replace(/^\s*-\s+/, ""));
      out.push(
        <ul
          key={`ul-${idx}`}
          className="my-6 space-y-3 list-disc pl-6 text-ink-soft leading-relaxed text-[17px]"
        >
          {items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      return;
    }

    const isFirst = idx === 0;
    out.push(
      <p
        key={`p-${idx}`}
        className={`my-5 text-ink-soft leading-[1.78] text-[17.5px] ${
          isFirst ? "dropcap first-letter:font-serif first-letter:text-burgundy" : ""
        }`}
      >
        {renderInline(para)}
      </p>
    );

    // Inject pull quote and a flourish after the chosen paragraph
    if (idx === pullQuoteIdx && pullQuoteText) {
      out.push(
        <PullQuote key={`pq-${idx}`} attribution={`From the Office of the Group`}>
          {pullQuoteText}
        </PullQuote>
      );
    }
  });

  return out;
}

function renderInline(text: string) {
  // Split on **bold** segments while preserving them.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={idx} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const article = INSIGHTS.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const readTime = estimateReadTime(article.body);
  const related = INSIGHTS.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Insights", url: "https://www.rothenbury.com/insights/" },
            {
              name: article.title,
              url: `https://www.rothenbury.com/insights/${article.slug}/`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { "@type": "Organization", name: BRAND.publicName },
            publisher: { "@type": "Organization", name: BRAND.publicName },
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES[article.imageKey]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.22em] text-ivory/80"
          >
            <Link href="/" className="hover:text-bone no-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/insights/" className="hover:text-bone no-underline">
              Insights
            </Link>
            <span className="mx-2">/</span>
            <span className="text-bronze-200">{article.category}</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
              <span>{article.category}</span>
              <span className="opacity-50">·</span>
              <span>{formatDate(article.date)}</span>
              <span className="opacity-50">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                {readTime} min read
              </span>
            </div>
            <h1 className="mt-6 font-serif text-bone text-[34px] sm:text-[50px] lg:text-[80px] leading-[1.06] sm:leading-[1.02] tracking-tightest text-balance">
              {article.title}
            </h1>
            <p className="mt-7 text-ivory/90 text-xl lg:text-2xl leading-relaxed max-w-3xl font-serif italic text-balance">
              {article.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-ivory/70">
              <span className="h-px w-10 bg-bronze-200/70" />
              By the Office of the Group · Rothenbury
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-[2.4fr_1fr]">
            <article className="max-w-3xl">
              <div className="prose prose-lg">{renderBody(article.body)}</div>
              <Flourish className="my-14" />
              <div className="text-xs uppercase tracking-[0.22em] text-ink-mute italic">
                Published by the Office of the Group · {formatDate(article.date)}
              </div>
            </article>
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700">
                Related notes
              </div>
              <div className="mt-6 space-y-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}/`}
                    className="block group no-underline border border-line hover:border-burgundy/40 hover:shadow-heritage-sm transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={IMAGES[r.imageKey]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/40" />
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.22em] bg-bone/95 text-navy px-2.5 py-1">
                        {r.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                        {formatDate(r.date)}
                      </div>
                      <div className="mt-2 font-serif text-xl text-navy italic leading-snug group-hover:text-bronze-700 transition-colors text-balance">
                        {r.title}
                      </div>
                      <div className="mt-3 text-[13px] text-ink-soft leading-relaxed">
                        {r.excerpt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/insights/"
                className="mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-navy hover:text-bronze-700 no-underline"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                All insights
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
