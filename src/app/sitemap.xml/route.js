import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { allArticles } from "../../components/data/blogData" // Import allArticles

const baseUrl = "https://www.webitya.com"
const currentDate = new Date().toISOString()

/**
 * 🔁 Recursively get all static route paths inside src/app/
 */
function getAllStaticRoutes(dir = "src/app", base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    const routePath = `${base}/${entry.name === "page.tsx" || entry.name === "page.js" ? "" : entry.name}`
    if (entry.isDirectory()) {
      return getAllStaticRoutes(fullPath, routePath)
    }
    if (entry.name === "page.tsx" || entry.name === "page.js") {
      return { url: routePath.replace(/\/index$/, "") || "/", priority: "0.80" }
    }
    return []
  })
}

/**
 * 🧠 Reads all blog slugs + frontmatter dates from allArticles
 */
function getAllBlogRoutes() {
  return allArticles.map((article) => {
    return {
      url: `/blog/${article.slug}`, // Assuming your blog articles are under /blog/
      lastmod: new Date(article.updatedDate || article.publishDate || currentDate).toISOString(),
      priority: "0.70",
    }
  })
}

/**
 * ✨ Escape XML characters
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/**
 * 🚀 Main GET handler
 */
export async function GET() {
  const staticRoutes = getAllStaticRoutes()
  const blogRoutes = getAllBlogRoutes()
  const allRoutes = [...staticRoutes.map((r) => ({ ...r, lastmod: currentDate })), ...blogRoutes]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.w3.org/2001/XMLSchema-instance">
  <!-- Sitemap generated on ${currentDate} -->
  ${allRoutes
    .map(
      (route) => `  <url>
    <loc>${escapeXml(baseUrl + route.url)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n")}
</urlset>`
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
