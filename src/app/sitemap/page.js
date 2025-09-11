import Link from "next/link"
import { allArticles, categories } from "@/components/data/blogData"
import { Home, Folder, BookOpen, ChevronRight, FileText } from "lucide-react"
import Footer from "@/components/FooterEl"

// Define static metadata for the sitemap page
export const metadata = {
  title: "Webitya Sitemap: Explore All Pages, Categories & Articles",
  description:
    "Navigate the complete structure of Webitya.com. Find links to all our main pages, blog categories (AI, Python, HTML, JavaScript, ReactJS, NextJS, Digital Marketing), and individual articles.",
  openGraph: {
    title: "Webitya Sitemap: Explore All Pages, Categories & Articles",
    description:
      "Navigate the complete structure of Webitya.com. Find links to all our main pages, blog categories (AI, Python, HTML, JavaScript, ReactJS, NextJS, Digital Marketing), and individual articles.",
    url: "https://www.webitya.com/sitemap",
    siteName: "Webitya",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200", // Placeholder image for Open Graph
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
      "Navigate the complete structure of Webitya.com. Find links to all our main pages, blog categories (AI, Python, HTML, JavaScript, ReactJS, NextJS, Digital Marketing), and individual articles.",
    images: ["/placeholder.svg?height=675&width=1200"], // Placeholder image for Twitter
  },
}

export default function SitemapPage() {
  // Define main navigation links for the sitemap
  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "Our Students", path: "/courses/all-students" },
    { name: "Pay Online", path: "/pay-online" },
    { name: "Schedule Meeting", path: "/schedule-meeting" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact-us" },
  ]

  return (
   <>
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6 leading-tight tracking-tight">
          Webitya <span className="text-blue-600">Sitemap</span>
        </h1>

        {/* Sitemap.xml Link Button */}
        <div className="text-center mb-10">
          <Link href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-block cursor-pointer">
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white">
              <FileText className="w-4 h-4" />
              Click To XML Sitemap
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Navigation Section */}
          <div className="bg-black/5 backdrop-blur-lg rounded-xl p-5 shadow-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
              <Home className="w-5 h-5 text-blue-600" />
              Main Navigation
            </h2>
            <ul className="space-y-2">
              {mainNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-base transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Categories Section */}
          <div className="bg-black/5 backdrop-blur-lg rounded-xl p-5 shadow-2xl border border-gray-200 hover:border-green-500 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
              <Folder className="w-5 h-5 text-green-600" />
              Blog Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 text-base transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-green-600 group-hover:translate-x-0.5 transition-transform" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Blog Articles Section */}
          <div className="bg-black/5 backdrop-blur-lg rounded-xl p-5 shadow-2xl border border-gray-200 hover:border-purple-500 transition-all duration-300 lg:col-span-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
              <BookOpen className="w-5 h-5 text-purple-600" />
              All Blog Articles
            </h2>
            <ul className="space-y-2 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
              {allArticles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="flex items-start gap-2 text-gray-700 hover:text-purple-600 text-base transition-colors group cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform mt-0.5" />
                    <span className="line-clamp-2">{article.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  )
}
