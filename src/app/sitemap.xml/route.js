import { NextResponse } from "next/server"

export async function GET() {
  // Your site URL
  const baseUrl = "https://www.webitya.com"

  // Current date for lastmod
  const currentDate = new Date().toISOString()

  // Define your routes with priorities
  const routes = [
    // Main pages - priority 1.00
    { url: "/", lastmod: currentDate, priority: "1.00" },

    // Important sections - priority 0.80
    { url: "/about", lastmod: currentDate, priority: "0.80" },
    { url: "/services", lastmod: currentDate, priority: "0.80" },
    { url: "/portfolio", lastmod: currentDate, priority: "0.80" },
    { url: "/courses", lastmod: currentDate, priority: "0.80" },
    { url: "/courses/all-students", lastmod: currentDate, priority: "0.80" },
    { url: "/influencers", lastmod: currentDate, priority: "0.80" },
    { url: "/contact-us", lastmod: currentDate, priority: "0.80" },
    { url: "/tour&travells", lastmod: currentDate, priority: "0.80" },
    { url: "/tour&travells/char-dham-yatra", lastmod: currentDate, priority: "0.80" },
    { url: "/latest-tech-news", lastmod: currentDate, priority: "0.80" },
    { url: "/handi-sketch", lastmod: currentDate, priority: "0.80" },
    { url: "/email-marketing-software", lastmod: currentDate, priority: "0.80" },
    { url: "/essential-services-ranchi", lastmod: currentDate, priority: "0.80" },
    { url: "/legal/privacy-policy", lastmod: currentDate, priority: "0.80" },
    { url: "/legal/terms", lastmod: currentDate, priority: "0.80" },
    { url: "/legal/disclaimer", lastmod: currentDate, priority: "0.80" },
    { url: "/faqs", lastmod: currentDate, priority: "0.80" },

    // Subsections - priority 0.64
    { url: "/latest-tech-news/trends", lastmod: currentDate, priority: "0.64" },
    { url: "/latest-tech-news/gadgets", lastmod: currentDate, priority: "0.64" },
    { url: "/latest-tech-news/ai-updates", lastmod: currentDate, priority: "0.64" },

    // You can add more routes here as needed
    // For example, individual blog posts, product pages, etc.
  ]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Sitemap generated on ${new Date().toISOString()} -->

  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("")}
</urlset>`

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      // Add cache control headers if desired
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  })
}
