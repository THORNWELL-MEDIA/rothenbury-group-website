import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Analytics from "@/components/Analytics";
import { organizationSchema, websiteSchema, siteNavigationSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// Body serif - Source Serif 4 (Tiempos / Berkshire annual report register).
// Pairs with Cormorant for serif-dominant editorial voice that distinguishes
// Rothenbury from sans-serif sibling holding brands.
const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rothenbury.com"),
  title: {
    default: `${BRAND.publicName} | Multi-Entity Holding Company`,
    template: `%s | ${BRAND.publicName}`,
  },
  description: BRAND.shortDescription,
  openGraph: {
    type: "website",
    siteName: BRAND.publicName,
    title: `${BRAND.publicName} | Multi-Entity Holding Company`,
    description: BRAND.shortDescription,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.publicName} | Multi-Entity Holding Company`,
    description: BRAND.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "https://www.rothenbury.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isPreview = process.env.VERCEL_ENV === "preview";
  return (
    <html lang="en-CA" className={`${sans.variable} ${serif.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {isPreview && <meta name="robots" content="noindex, nofollow" />}
        <SchemaJsonLd data={[organizationSchema(), websiteSchema(), siteNavigationSchema()]} />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W8W5XFZ5');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* GA4 gtag.js fallback for direct event firing (Analytics.tsx) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0PM57X4W7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S0PM57X4W7');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8W5XFZ5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-burgundy focus:text-ivory focus:px-3 focus:py-2 focus:z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
