"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NewsCard from "@/components/News/news/news-card"
import SponsoredCard from "@/components/News/news/sponsored-card"
import NewsBanner from "@/components/News/news/news-banner"
import NewsletterCTA from "@/components/News/news/newsletter-cta"
import newsData from "@/components/News/data/news-data"
import sponsoredData from "@/components/News/data/sponsored-data"

export default function LatestNewsPage() {
  const [latestNews, setLatestNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Sort news by date (newest first) and take the top 12
    const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 12)
    setLatestNews(sorted)

    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Get top 3 latest news for banner
  const bannerNews = latestNews.slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-600 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest News
          </motion.h1>
          <motion.p
            className="text-white/80 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with the most recent news and developments from around the world
          </motion.p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Breaking News</h2>
          <div className="text-sm text-slate-500">
            {latestNews.length} {latestNews.length === 1 ? "article" : "articles"} found
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
        ) : latestNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📰</div>
            <p className="text-slate-600 text-lg mb-2">No latest news available at the moment.</p>
            <p className="text-slate-500">Please check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {latestNews.map((news, index) => {
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
  )
}
