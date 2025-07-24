"use client"

import { useState, useEffect } from "react"
import { Sidebar, Close, ChevronRight, Clock } from "./icons/MinimalIcons"
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
          className="group relative bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
        >
          <Sidebar className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Minimal Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white border-l border-gray-200 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Latest Articles</h2>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Close className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Simple Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "recent"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "popular"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Popular
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {(activeTab === "recent" ? recentArticles : popularArticles).slice(0, 8).map((article, index) => (
                <Link key={article.id} href={`/blog/${article.slug}`} onClick={() => setIsOpen(false)}>
                  <div className="group cursor-pointer border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                    <div className="flex gap-3">
                      {activeTab === "popular" && (
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                      )}
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.imageAlt || article.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-gray-700 transition-colors mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{article.category}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                View All Articles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
