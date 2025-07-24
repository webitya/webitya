"use client"

import { useState, useEffect } from "react"
import { Menu, Close, Clock, Fire, ChevronRight } from "./icons/MuiIcons"
import { getRecentArticles, getPopularArticles } from "./data/blogData"
import Link from "next/link"

export default function NewsDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [recentArticles, setRecentArticles] = useState([])
  const [popularArticles, setPopularArticles] = useState([])
  const [activeTab, setActiveTab] = useState("recent")

  useEffect(() => {
    setRecentArticles(getRecentArticles())
    setPopularArticles(getPopularArticles())
  }, [])

  const getCategoryColor = (category) => {
    const colors = {
      AI: "from-blue-400 to-purple-500",
      Python: "from-green-400 to-blue-400",
      HTML: "from-orange-400 to-red-400",
      JavaScript: "from-yellow-400 to-orange-400",
      ReactJS: "from-cyan-400 to-blue-400",
      NextJS: "from-gray-600 to-gray-800",
      "Digital Marketing": "from-pink-400 to-purple-400",
    }
    return colors[category] || "from-gray-400 to-gray-500"
  }

  return (
    <>
      {/* Floating Drawer Button */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 hidden lg:block">
        <button
          onClick={() => setIsOpen(true)}
          className="glass-card rounded-l-2xl p-4 shadow-glass hover:glass-hover transition-all duration-300 hover-lift group"
        >
          <div className="flex flex-col items-center gap-2">
            <Menu className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
            <div className="text-xs font-medium text-slate-600 group-hover:text-slate-800 writing-mode-vertical transform rotate-180">
              News
            </div>
          </div>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full glass-strong shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-slate-800">Latest News</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors focus-ring"
            >
              <Close className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50/50"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/30"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Recent
              </div>
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "popular"
                  ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50/50"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/30"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Fire className="w-4 h-4" />
                Popular
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {(activeTab === "recent" ? recentArticles : popularArticles).slice(0, 8).map((article, index) => (
                <Link key={article.id} href={`/blog/${article.slug}`} onClick={() => setIsOpen(false)}>
                  <div className="group cursor-pointer glass-subtle rounded-xl p-4 hover:glass-hover transition-all duration-300 hover-lift">
                    <div className="flex gap-4">
                      {activeTab === "popular" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-minimal">
                          {index + 1}
                        </div>
                      )}
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.imageAlt || article.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-minimal"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-md text-white bg-gradient-to-r ${getCategoryColor(article.category)}`}
                          >
                            {article.category}
                          </span>
                          <span className="text-xs text-slate-500">{article.readTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-minimal hover:shadow-minimal-lg">
                View All Articles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
