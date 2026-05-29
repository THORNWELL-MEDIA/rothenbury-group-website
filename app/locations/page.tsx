import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { CITIES } from "@/lib/cities";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "Locations",
  description:
    "Rothenbury Group operates across the United States and Canada, with operating partners coordinated between Toronto and New York.",
  alternates: { canonical: "/locations/" },
};

export default function LocationsPage() {
  const canada = CITIES.filter((c) => c.country === "Canada");
  const unitedStates = CITIES.filter((c) => c.country === "United States");

  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Locations", url: "https://www.rothenbury.com/locations/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Locations",
            url: "https://www.rothenbury.com/locations/",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: CITIES.map((c, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: `${c.name}, ${c.country}`,
                url: `https://www.rothenbury.com/locations/${c.slug}/`,
              })),
            },
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.aerialCity}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Locations
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
            <h1 className="font-serif text-bone text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.04] tracking-tightest text-balance">
              Across North America. <span className="italic text-bronze-200">One operating discipline.</span>
            </h1>
            <p className="text-ivory/90 text-lg leading-relaxed max-w-md">
              Rothenbury Group operates with partners across the United States and
              Canada. Specific service-area details are managed at the operating level.
            </p>
          </div>
        </div>
      </section>

      {/* COUNTRY: CANADA */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-end pb-10 border-b border-line">
            <div>
              <div className="eyebrow">Canada · Operating Footprint</div>
              <h2 className="mt-5 display-2">Canada</h2>
            </div>
            <p className="body-lg max-w-xl">
              Canadian operations are concentrated in Ontario, with day-to-day delivery
              extending across the Greater Toronto Area and beyond.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {canada.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}/`}
                className="group relative block aspect-[4/5] overflow-hidden no-underline surface-hover"
              >
                <Image
                  src={IMAGES[city.imageKey]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/30" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bronze-200">
                    <MapPin className="w-3 h-3" strokeWidth={2} />
                    {city.region}, {city.country}
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <h3 className="font-serif text-3xl text-bone">{city.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-bone transition-transform group-hover:rotate-45" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRY: UNITED STATES */}
      <section className="section bg-cream/40 border-t border-line">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-end pb-10 border-b border-line">
            <div>
              <div className="eyebrow">United States · Operating Footprint</div>
              <h2 className="mt-5 display-2">United States</h2>
            </div>
            <p className="body-lg max-w-xl">
              U.S. operations cover media, staffing, and platform-technology interests,
              anchored in New York with delivery extending across the Northeast and
              beyond.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unitedStates.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}/`}
                className="group relative block aspect-[4/5] overflow-hidden no-underline"
              >
                <Image
                  src={IMAGES[city.imageKey]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/30" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bronze-200">
                    <MapPin className="w-3 h-3" strokeWidth={2} />
                    {city.region}, {city.country}
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <h3 className="font-serif text-3xl text-bone">{city.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-bone transition-transform group-hover:rotate-45" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
