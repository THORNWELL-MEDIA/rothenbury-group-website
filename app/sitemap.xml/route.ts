import { CITIES } from "@/lib/cities";
import { INSIGHTS } from "@/lib/insights";

export const dynamic = "force-static";

const SITE = "https://www.rothenbury.com";

const STATIC_PATHS = [
  "/",
  "/about/",
  "/leadership/",
  "/portfolio/",
  "/locations/",
  "/careers/",
  "/positions/",
  "/insights/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/thesis/",
  "/blog/",
  "/reviews/",
];

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE}${path}`, changefreq: "monthly", priority: path === "/" ? "1.0" : "0.8" })),
    ...CITIES.map((c) => ({
      loc: `${SITE}/locations/${c.slug}/`,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...INSIGHTS.map((a) => ({
      loc: `${SITE}/insights/${a.slug}/`,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
