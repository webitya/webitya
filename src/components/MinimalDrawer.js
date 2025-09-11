"use client"
import { useState, useEffect } from "react"
import { Sidebar, Close, ChevronRight, Clock } from "./icons/MinimalIcons" // Reverted to previous icon import
import { getRecentArticles, getPopularArticles } from "./data/blogData"
import Link from "next/link"

export default function MinimalDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [recentArticles, setRecentArticles] = useState([])
  const [popularArticles, setPopularArticles] = useState([])
  const [activeTab, setActiveTab] = useState("recent")

  useEffect(() => {
    setRecentArticles(getRecentArticles())
    setPopularArticles(getPopularArticles())
  }, [])

  return (
    <>
      {/* Minimal Floating Button */}
      <div className="fixed top-20 right-6 z-40 hidden lg:block">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-white border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Sidebar className="w-5 h-5 text-gray-600 group-hover:text-gray-900" /> {/* Reverted icon */}
          <span className="sr-only">Open Sidebar</span>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-200 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Minimal Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Latest Articles</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <Close className="w-5 h-5 text-gray-500 hover:text-gray-700" /> {/* Reverted icon */}
              <span className="sr-only">Close Sidebar</span>
            </button>
          </div>

          {/* Simple Tabs */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors relative group ${
                activeTab === "recent" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Recent
              {activeTab === "recent" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200 scale-x-100" />
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-gray-200 transition-all duration-200" />
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors relative group ${
                activeTab === "popular" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Popular
              {activeTab === "popular" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200 scale-x-100" />
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-gray-200 transition-all duration-200" />
            </button>
          </div>

          {/* Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {(activeTab === "recent" ? recentArticles : popularArticles).slice(0, 8).map((article, index) => (
                <Link key={article.id} href={`/blog/${article.slug}`} onClick={() => setIsOpen(false)}>
                  <div className="group cursor-pointer border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200 flex items-start gap-4">
                    {activeTab === "popular" && (
                      <div className="flex-shrink-0 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                        {index + 1}
                      </div>
                    )}
                    <img
                      src={article.image || "/placeholder.svg?height=64&width=64&query=article thumbnail"}
                      alt={article.imageAlt || article.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {/* Reverted icon */}
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />{" "}
                        {/* Reverted icon */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg text-base font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20">
                View All Articles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
