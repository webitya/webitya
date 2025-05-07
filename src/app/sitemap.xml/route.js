import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseUrl = "https://www.webitya.com";
const currentDate = new Date().toISOString();

/**
 * 🔁 Recursively get all static route paths inside src/app/
 */
function getAllStaticRoutes(dir = "src/app", base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    const routePath = `${base}/${entry.name === "page.tsx" || entry.name === "page.js" ? "" : entry.name}`;

    if (entry.isDirectory()) {
      return getAllStaticRoutes(fullPath, routePath);
    }

    if (entry.name === "page.tsx" || entry.name === "page.js") {
      return { url: routePath.replace(/\/index$/, "") || "/", priority: "0.80" };
    }

    return [];
  });
}

/**
 * 🧠 Reads all blog slugs + frontmatter dates from content/latest-tech-news/blogs/
 */
function getAllBlogRoutes() {
  const blogDir = path.join(process.cwd(), "content/latest-tech-news/blogs");
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.mdx?$/, "");

      return {
        url: `/latest-tech-news/blogs/${slug}`,
        lastmod: new Date(data.date || currentDate).toISOString(),
        priority: "0.70",
      };
    });
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
    .replace(/'/g, "&apos;");
}

/**
 * 🚀 Main GET handler
 */
export async function GET() {
  const staticRoutes = getAllStaticRoutes();
  const blogRoutes = getAllBlogRoutes();

  const allRoutes = [
    ...staticRoutes.map((r) => ({ ...r, lastmod: currentDate })),
    ...blogRoutes,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Sitemap generated on ${currentDate} -->

  ${allRoutes
    .map(
      (route) => `  <url>
    <loc>${escapeXml(baseUrl + route.url)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
