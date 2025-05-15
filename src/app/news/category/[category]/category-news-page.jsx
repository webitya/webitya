"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import NewsCard from "@/components/News/news/news-card"
import SponsoredCard from "@/components/News/news/sponsored-card"
import NewsBanner from "@/components/News/news/news-banner"
import NewsletterCTA from "@/components/News/news/newsletter-cta"
import newsData from "@/components/News/data/news-data"
import sponsoredData from "@/components/News/data/sponsored-data"

export default function CategoryNewsPage({ params }) {
  const { category } = params
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryNews, setCategoryNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter news by category
  useEffect(() => {
    // Filter news by category (case insensitive)
    const filtered = newsData.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    setCategoryNews(filtered)
    setFilteredNews(filtered)

    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [category])

  // Filter news based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = categoryNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNews(filtered)
    } else {
      setFilteredNews(categoryNews)
    }
  }, [searchTerm, categoryNews])

  // Get top 3 category news for banner
  const bannerNews = categoryNews.slice(0, 3)

  // Get sponsored content related to this category if available
  const categorySponsoredData = sponsoredData.filter((item) => item.category.toLowerCase() === category.toLowerCase())

  // If no category-specific sponsored content, use general sponsored content
  const sponsoredContent = categorySponsoredData.length > 0 ? categorySponsoredData : sponsoredData

  // Get background gradient based on category
  const getCategoryGradient = () => {
    switch (category.toLowerCase()) {
      case "technology":
        return "from-blue-800 to-indigo-600"
      case "business":
        return "from-emerald-800 to-teal-600"
      case "sports":
        return "from-red-800 to-orange-600"
      case "global":
        return "from-purple-800 to-violet-600"
      case "design":
        return "from-pink-800 to-rose-600"
      case "marketing":
        return "from-amber-800 to-yellow-600"
      case "security":
        return "from-slate-800 to-gray-600"
      default:
        return "from-emerald-800 to-teal-600"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${getCategoryGradient()} py-16 md:py-20`}>
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formattedCategory} News
          </motion.h1>
          <motion.p
            className="text-white/80 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with the latest {formattedCategory.toLowerCase()} news, trends, and insights
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${formattedCategory} news...`}
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      {!isLoading && bannerNews.length > 0 && (
        <div className="container mx-auto px-4 -mt-8">
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NewsBanner news={bannerNews} />
          </motion.div>
        </div>
      )}

      {/* News Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{formattedCategory} Articles</h2>
          <div className="text-sm text-slate-500">
            {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"} found
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-slate-200 animate-pulse"></div>
                <div className="p-5">
                  <div className="h-4 bg-slate-200 animate-pulse mb-3 w-1/3"></div>
                  <div className="h-6 bg-slate-200 animate-pulse mb-3"></div>
                  <div className="h-4 bg-slate-200 animate-pulse mb-2 w-full"></div>
                  <div className="h-4 bg-slate-200 animate-pulse mb-2 w-5/6"></div>
                  <div className="h-4 bg-slate-200 animate-pulse mb-4 w-4/6"></div>
                  <div className="h-4 bg-slate-200 animate-pulse w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-600 text-lg mb-2">
              No {formattedCategory.toLowerCase()} news found matching your search criteria.
            </p>
            <p className="text-slate-500">Try adjusting your search or check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredNews.map((news, index) => {
                // Insert sponsored content after every 5th news item
                const shouldInsertSponsored = (index + 1) % 5 === 0 && sponsoredContent.length > 0
                const sponsoredIndex = Math.floor(index / 5) % sponsoredContent.length

                return (
                  <React.Fragment key={`fragment-${news.id}`}>
                    <motion.div
                      key={news.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NewsCard news={news} />
                    </motion.div>

                    {shouldInsertSponsored && (
                      <motion.div
                        key={`sponsored-${sponsoredContent[sponsoredIndex].id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SponsoredCard sponsored={sponsoredContent[sponsoredIndex]} />
                      </motion.div>
                    )}
                  </React.Fragment>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  )
}
