"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Clock, User, Calendar, ArrowRight } from "../../components/icons/MinimalIcons"
import { allArticles, searchArticles } from "../../components/data/blogData"
import MinimalDrawer from "../../components/MinimalDrawer"
import NewsletterSection from "../../components/NewsletterSection"
import Link from "next/link"
import Footer from "@/components/FooterEl"

const categories = ["All", "AI", "Python", "HTML", "JavaScript", "ReactJS", "NextJS", "Digital Marketing"]

export default function BlogPage() {
  const [articles, setArticles] = useState(allArticles)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    let filteredArticles = allArticles

    if (searchQuery) {
      filteredArticles = searchArticles(searchQuery)
    }

    if (selectedCategory !== "All") {
      filteredArticles = filteredArticles.filter((article) => article.category === selectedCategory)
    }

    setArticles(filteredArticles)
  }, [searchQuery, selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
  <>
    <div className="min-h-screen bg-gray-50">
      <MinimalDrawer />

      {/* Minimal Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Webitya <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover insights on AI, Web Development, and Digital Marketing
          </p>

          {/* Minimal Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Minimal Filter Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="minimal-button focus-ring group">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </div>
            </button>

            {selectedCategory !== "All" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <span className="text-xs">×</span>
                </button>
              </div>
            )}
          </div>

          {/* Category Filter */}
          {isFilterOpen && (
            <div className="minimal-card p-6 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all focus-ring ${
                      selectedCategory === category
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <article className="minimal-card overflow-hidden cursor-pointer hover-lift group">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.imageAlt || article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-900 text-sm font-medium group-hover:text-gray-700 transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <div className="minimal-card p-12 max-w-md mx-auto">
              <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  <Footer/>
  </>
  )
}
