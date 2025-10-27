"use client"
import { useState, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import PersonIcon from "@mui/icons-material/Person"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CloseIcon from "@mui/icons-material/Close"
import { searchArticles } from "../data/blogData" // Only searchArticles is needed here
import MinimalDrawer from "../MinimalDrawer"
import NewsletterSection from "../NewsletterSection"
import Link from "next/link"
import Footer from "@/components/FooterEl"

export default function BlogMain({ initialArticles, categories }) {
  const [articles, setArticles] = useState(initialArticles)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 9 // Display 9 articles per page

  useEffect(() => {
    let filteredArticles = initialArticles

    if (searchQuery) {
      filteredArticles = searchArticles(searchQuery)
    }

    if (selectedCategory !== "All") {
      filteredArticles = filteredArticles.filter((article) => article.category === selectedCategory)
    }

    setArticles(filteredArticles)
    setCurrentPage(1) // Reset to first page on search/filter change
    // Removed: setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, 0);
  }, [searchQuery, selectedCategory, initialArticles]) // Add initialArticles to dependencies

  // Effect to handle pagination when articles change
  const paginatedArticles = articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top smoothly on category change
    }, 0)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-13">
        <MinimalDrawer />

        {/* Compact Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Webitya <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover insights on AI, Web Development, and Digital Marketing
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className={`relative transition-all duration-300`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:shadow-lg ${
                    isSearchFocused
                      ? "border-blue-500 ring-4 ring-blue-500/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors"
                  >
                    <CloseIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Search Results Count */}
              {searchQuery && (
                <div className="mt-3 text-sm text-gray-500">
                  {articles.length} {articles.length === 1 ? "article" : "articles"} found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          {" "}
          {/* Reduced padding for spacing */}
          <div className="mb-2">
            {" "}
            {/* Reduced mb from mb-8 to mb-2 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FilterListIcon className="w-4 h-4" />
                <span className="font-medium">Filter by Category</span>
                <span className={`ml-1 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}>▼</span>
              </button>

              {selectedCategory !== "All" && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium shadow-sm">
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors ml-1"
                  >
                    <CloseIcon className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            {/* Category Filter */}
            {isFilterOpen && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {" "}
          {/* Reduced py from py-6 sm:py-8 to py-4 sm:py-6 */}
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-gray-300 transition-all duration-300 group h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg?height=200&width=400"}
                      alt={article.imageAlt || article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-lg shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <PersonIcon className="w-3.5 h-3.5" />
                          <span className="font-medium">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarTodayIcon className="w-3.5 h-3.5" />
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AccessTimeIcon className="w-3.5 h-3.5" />
                        <span className="font-medium">{article.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
                      Read Article
                      <ArrowForwardIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          {articles.length > articlesPerPage && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top smoothly
                  }, 0)
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => {
                    setCurrentPage(i + 1)
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top smoothly
                    }, 0)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  } transition-colors`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(articles.length / articlesPerPage)))
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top smoothly
                  }, 0)
                }}
                disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
          {/* No Results State */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white border border-gray-200 rounded-2xl p-12 max-w-md mx-auto shadow-sm">
                <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">No articles found</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  We couldn't find any articles matching your search criteria. Try adjusting your search terms or browse
                  different categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
