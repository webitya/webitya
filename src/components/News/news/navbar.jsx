"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || ""

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname, searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/news?search=${encodeURIComponent(searchTerm)}`
    }
  }

  const navItems = [
    { name: "All News", href: "/news" },
    { name: "Latest", href: "/news/latest" },
    { name: "Technology", href: "/news/category/technology" },
    { name: "Business", href: "/news/category/business" },
    { name: "Sports", href: "/news/category/sports" },
    { name: "Global", href: "/news/category/global" },
  ]

  const isActive = (href) => {
    if (href === "/news" && pathname === "/news" && !currentCategory) {
      return true
    }
    return pathname === href
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/news" className="flex items-center">
              <span className="text-xl font-bold">
                <span className="text-emerald-600">Webitya</span>
                <span className="text-slate-800">News</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu Buttons */}
          <div className="flex items-center">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-50 focus:outline-none"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-3 border-t border-slate-100">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 border-t border-slate-100 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
