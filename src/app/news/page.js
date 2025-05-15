"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, Filter } from "lucide-react"
import NewsCard from "@/components/News/news/news-card"
import SponsoredCard from "@/components/News/news/sponsored-card"
import NewsBanner from "@/components/News/news/news-banner"
import NewsletterCTA from "@/components/News/news/newsletter-cta"
import newsData from "@/components/News/data/news-data"
import sponsoredData from "@/components/News/data/sponsored-data"
import Footer from "@/components/FooterEl"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState(["All"])
  const [filteredNews, setFilteredNews] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Extract unique categories from news data
  useEffect(() => {
    const uniqueCategories = ["All", ...new Set(newsData.map((item) => item.category))]
    setCategories(uniqueCategories)
    setFilteredNews(newsData)

    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Filter news based on search term and category
  useEffect(() => {
    let filtered = [...newsData]

    if (searchTerm) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((news) => news.category === selectedCategory)
    }

    setFilteredNews(filtered)
  }, [searchTerm, selectedCategory])

  // Get latest news for banner (top 3 by date)
  const latestNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
<>
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-600 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest News & Updates
          </motion.h1>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>

            <div className="relative">
              <button
                className="w-full md:w-auto px-6 py-3 bg-white rounded-lg flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Filter size={16} className="text-emerald-600 mr-1" />
                <span>{selectedCategory}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform text-emerald-600 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <motion.div
                  className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg py-2 max-h-60 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`px-4 py-2 cursor-pointer hover:bg-slate-100 ${selectedCategory === category ? "bg-emerald-50 text-emerald-700 font-medium" : ""}`}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="container mx-auto px-4 -mt-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NewsBanner news={latestNews} />
        </motion.div>
      </div>

      {/* News Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            {selectedCategory === "All" ? "All News" : selectedCategory}
          </h2>
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
            <p className="text-slate-600 text-lg mb-2">No news found matching your search criteria.</p>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredNews.map((news, index) => {
                // Insert sponsored content after every 5th news item
                const shouldInsertSponsored = (index + 1) % 5 === 0 && sponsoredData.length > 0
                const sponsoredIndex = Math.floor(index / 5) % sponsoredData.length

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
                        key={`sponsored-${sponsoredData[sponsoredIndex].id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SponsoredCard sponsored={sponsoredData[sponsoredIndex]} />
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
    <Footer/>
</>
  )
}
