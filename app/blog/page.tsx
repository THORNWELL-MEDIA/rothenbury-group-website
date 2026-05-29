import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Rothenbury Group's blog has moved to /insights/. Visit the Insights section for our latest perspectives.",
  alternates: { canonical: "/insights/" },
};

export default function BlogPage() {
  return (
    <section className="container-wide py-32 lg:py-40 text-center">
      <div className="eyebrow-plain">Notice</div>
      <h1 className="mt-6 font-serif text-4xl lg:text-5xl text-navy text-balance">
        Our blog has moved to <span className="italic text-bronze-700">Insights.</span>
      </h1>
      <p className="mt-6 max-w-xl mx-auto text-ink-soft leading-relaxed">
        Rothenbury Group's editorial content is now published in our Insights section,
        where we share perspectives on holding-company strategy and operations.
      </p>
      <Link href="/insights/" className="btn-primary mt-10 group">
        Visit Insights
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
      </Link>
    </section>
  );
}
