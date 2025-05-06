export async function GET() {
  const baseUrl = "https://www.webitya.com";

  // Full list of static and dynamic URLs
  const urls = [
    "", // Homepage
    "about",
    "services",
    "portfolio",
    "courses",
    "courses/all-students",
    "influencers",
    "contact-us",
    "tour&travells",
    "tour&travells/char-dham-yatra",
    "latest-tech-news",
    "latest-tech-news/trends",
    "latest-tech-news/gadgets",
    "latest-tech-news/ai-updates",
    "handi-sketch",
    "email-marketing-software",
    "essential-services-ranchi",
    "legal/privacy-policy",
    "legal/terms",
    "legal/disclaimer",
    "faqs",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (path) => `
      <url>
        <loc>${baseUrl}/${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${
          path === "" ? "1.0" :
          ["about", "services", "portfolio", "courses", "contact-us", "faqs"].includes(path) ? "0.9" :
          "0.7"
        }</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
