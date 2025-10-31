import SitemapPageClient from "@/components/sitemap/SitemapPageClient"
import { dynamicKeywords } from "@/data/dynamicKeywords"
import { allArticles, categories } from "@/components/data/blogData"

export const metadata = {
  title: "Webitya Sitemap: Explore All Pages, Categories & Articles",
  description:
    "Navigate the complete structure of Webitya.com. Find links to all our main pages, services, blog categories (AI, Python, HTML, JavaScript, ReactJS, NextJS, Digital Marketing), and individual articles.",
  openGraph: {
    title: "Webitya Sitemap: Explore All Pages, Categories & Articles",
    description:
      "Navigate the complete structure of Webitya.com. Find links to all our main pages, services, blog categories, and individual articles.",
    url: "https://www.webitya.com/sitemap",
    siteName: "Webitya",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Webitya Sitemap - All Website Pages and Articles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webitya Sitemap: Explore All Pages, Categories & Articles",
    description:
      "Navigate the complete structure of Webitya.com. Find links to all our main pages, services, blog categories, and individual articles.",
    images: ["/placeholder.svg?height=675&width=1200"],
  },
}

// ✅ Server-rendered wrapper
export default function SitemapPage() {
  return (
    <SitemapPageClient
      dynamicKeywords={dynamicKeywords}
      allArticles={allArticles}
      categories={categories}
    />
  )
}
