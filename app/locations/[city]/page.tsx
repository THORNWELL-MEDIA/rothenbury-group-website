import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema, placeSchema } from "@/lib/schema";
import { CITIES } from "@/lib/cities";
import { IMAGES } from "@/lib/imagery";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }) {
  const city = CITIES.find((c) => c.slug === params.city);
  if (!city) return {};
  return {
    title: `Rothenbury Group in ${city.name}`,
    description: `Rothenbury Group maintains an operational presence in ${city.name}, ${city.country}.`,
    alternates: { canonical: `/locations/${city.slug}/` },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = CITIES.find((c) => c.slug === params.city);
  if (!city) notFound();
  const url = `https://www.rothenbury.com/locations/${city.slug}/`;

  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Locations", url: "https://www.rothenbury.com/locations/" },
            { name: city.name, url },
          ]),
          placeSchema({ name: city.name, region: city.region, country: city.country }),
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES[city.imageKey]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations/" className="hover:text-bone no-underline">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-bone">{city.name}</span>
          </nav>
          <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bronze-200">
            <MapPin className="w-3 h-3" strokeWidth={2} />
            {city.country} · {city.region}
          </div>
          <h1 className="mt-6 font-serif text-bone text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.02] tracking-tightest text-balance max-w-5xl">
            Rothenbury in <span className="italic text-bronze-200">{city.name}</span>
          </h1>
          <p className="mt-7 text-ivory/90 text-lg sm:text-xl leading-relaxed max-w-3xl">
            {city.intro}
          </p>
        </div>
      </section>

      {/* PRESENCE */}
      <section className="section bg-bone">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <div className="eyebrow">Operating Presence</div>
            <h2 className="mt-5 display-3 text-balance">
              How Rothenbury operates in {city.name}.
            </h2>
            <div className="mt-8 space-y-6 body-md max-w-prose">
              <p>{city.presence}</p>
              <p>
                Specific service availability, pricing, and customer relationships are
                managed at the operating level. The parent does not engage directly in
                commercial transactions in {city.name}. Those are handled entirely below
                the parent.
              </p>
            </div>
          </div>
          <aside className="border border-line bg-cream/30 p-7 lg:p-8">
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-bronze-700 font-medium">
              Footprint Detail
            </h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div className="pb-5 border-b border-line">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">City</dt>
                <dd className="mt-1 font-serif text-2xl text-navy">{city.name}</dd>
              </div>
              <div className="pb-5 border-b border-line">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">Region</dt>
                <dd className="mt-1 text-navy">{city.region}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">Country</dt>
                <dd className="mt-1 text-navy">{city.country}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <CTASection
        eyebrow={`${city.name} Inquiries`}
        heading={`Inquiries about ${city.name} operations.`}
        body="For corporate-level inquiries, reach out to our office directly. Operating-level inquiries are handled below the parent."
      />
    </>
  );
}
