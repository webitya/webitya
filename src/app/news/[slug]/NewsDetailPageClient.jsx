"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Bookmark, ChevronRight } from "lucide-react"
import RelatedNews from "@/components/News/news/related-news"
import CategoryList from "@/components/News/news/category-list"
import SponsoredSidebar from "@/components/News/news/sponsored-sidebar"
import NewsletterCTA from "@/components/News/news/newsletter-cta"
import SocialShare from "@/components/News/news/social-share"

export default function NewsDetailPageClient({
  params,
  serverArticle,
  isServerSponsored,
  allNewsData,
  allSponsoredData,
}) {
  const { slug } = params
  const [article, setArticle] = useState(serverArticle || null)
  const [isSponsored, setIsSponsored] = useState(isServerSponsored || false)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [sidebarSponsored, setSidebarSponsored] = useState(null)
  const [readingTime, setReadingTime] = useState("5 min read")
  const [isLoading, setIsLoading] = useState(!serverArticle)

  useEffect(() => {
    // If we already have the article from the server, skip fetching
    if (serverArticle) {
      processArticleData(serverArticle, isServerSponsored, allNewsData, allSponsoredData)
      return
    }

    // Only run this if we don't have server data
    // Find article in either regular or sponsored data
    let foundArticle = allNewsData.find((item) => item.slug === slug)
    let sponsored = false

    if (!foundArticle) {
      foundArticle = allSponsoredData.find((item) => item.slug === slug)
      sponsored = true
    }

    if (foundArticle) {
      processArticleData(foundArticle, sponsored, allNewsData, allSponsoredData)
    } else {
      // No article found, end loading state
      setIsLoading(false)
    }
  }, [slug, serverArticle, isServerSponsored, allNewsData, allSponsoredData])

  // Helper function to process article data
  function processArticleData(foundArticle, sponsored, newsData, sponsoredData) {
    setArticle(foundArticle)
    setIsSponsored(sponsored)

    // Calculate reading time (rough estimate)
    const contentLength = foundArticle.content.join(" ").split(" ").length
    const time = Math.ceil(contentLength / 200) // Assuming 200 words per minute
    setReadingTime(`${time} min read`)

    // Find related articles with the same category
    const related = newsData
      .filter((item) => item.category === foundArticle.category && item.id !== foundArticle.id)
      .slice(0, 4)
    setRelatedArticles(related)

    // Get random sponsored content for sidebar
    const randomSponsoredIndex = Math.floor(Math.random() * sponsoredData.length)
    setSidebarSponsored(sponsoredData[randomSponsoredIndex])

    // Get all categories
    const uniqueCategories = ["All", ...new Set(newsData.map((item) => item.category))]
    setCategories(uniqueCategories)

    // End loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="h-8 w-32 bg-slate-200 animate-pulse mb-8 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-[50vh] bg-slate-200 animate-pulse mb-6 rounded-xl"></div>
              <div className="h-10 bg-slate-200 animate-pulse mb-4 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 animate-pulse mb-8 rounded w-1/2"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 bg-slate-200 animate-pulse rounded w-2/3"></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-[400px] bg-slate-200 animate-pulse rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
          <p className="text-slate-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/news"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-slate-500">
          <Link href="/news" className="hover:text-emerald-600 transition-colors">
            News
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href={`/news?category=${article.category}`} className="hover:text-emerald-600 transition-colors">
            {article.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-slate-700 truncate max-w-[200px]">{article.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            {isSponsored && (
              <span className="inline-block bg-amber-400 text-amber-900 font-semibold px-3 py-1 rounded-full text-sm mb-4">
                Sponsored
              </span>
            )}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-emerald-600" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-emerald-600" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-2 text-emerald-600" />
                  {article.category}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-emerald-600" />
                  {readingTime}
                </div>
              </div>

              {/* Social Share */}
              <SocialShare title={article.title} />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">{article.summary}</p>

                {article.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="mb-6 text-slate-700 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-700 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/news?category=${article.category}`}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                  >
                    {article.category}
                  </Link>
                  {article.title
                    .split(" ")
                    .slice(0, 3)
                    .map((word, index) => (
                      <Link
                        key={index}
                        href={`/news?search=${word.toLowerCase()}`}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                      >
                        {word.toLowerCase()}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=100&width=100`}
                      alt={article.author}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{article.author}</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Content writer specializing in {article.category.toLowerCase()} topics. Passionate about
                      delivering valuable insights and staying on top of industry trends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="mt-10">
                <NewsletterCTA />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Sidebar Sticky Container */}
            <div className="lg:sticky lg:top-24">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Categories</h3>
                <CategoryList categories={categories} />
              </div>

              {/* Related News */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Related News</h3>
                <RelatedNews articles={relatedArticles} />
              </div>

              {/* Sponsored Content */}
              {sidebarSponsored && (
                <div className="mb-6">
                  <SponsoredSidebar sponsored={sidebarSponsored} />
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="font-medium text-slate-700">Save Article</span>
                    <Bookmark size={18} className="text-emerald-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="font-medium text-slate-700">Share Article</span>
                    <Share2 size={18} className="text-emerald-600" />
                  </button>
                  <Link
                    href="/news"
                    className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-medium text-slate-700">Back to News</span>
                    <ArrowLeft size={18} className="text-emerald-600" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
