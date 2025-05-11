"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, FilterList, YouTube, Star, ArrowForward, LocalOffer } from "@mui/icons-material"
import { Share, WhatsApp, Facebook, Email, Twitter, LinkedIn, ContentCopy } from "@mui/icons-material"

// Import blog data
import { getAllBlogs, getCategories } from "../blog-data"
import Footer from "@/components/FooterEl"

// Add this Toast component at the top of the file, after the imports but before the ShareMenu component
const Toast = ({ message, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 50 }}
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center ${
        open ? "block" : "hidden"
      }`}
    >
      <ContentCopy className="mr-2 text-gray-300" fontSize="small" />
      {message}
    </motion.div>
  )
}

// Replace the ShareMenu component with this updated version
const ShareMenu = ({ url, title }) => {
  const [open, setOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/blogs/${url}` : `https://webitya.com/blogs/${url}`

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <WhatsApp className="text-green-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="text-blue-400" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn className="text-blue-700" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Email",
      icon: <Email className="text-gray-600" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`,
    },
    {
      name: "Copy Link",
      icon: <ContentCopy className="text-gray-600" />,
      action: () => {
        navigator.clipboard.writeText(shareUrl)
        setToastOpen(true)
        setOpen(false)
      },
    },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share"
      >
        <Share className="text-gray-600" />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1"
        >
          {shareOptions.map((option, index) => (
            <div key={index} className="px-1 py-0.5">
              {option.action ? (
                <button
                  onClick={option.action}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {option.icon}
                  <span className="ml-3">{option.name}</span>
                </button>
              ) : (
                <a
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {option.icon}
                  <span className="ml-3">{option.name}</span>
                </a>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <Toast message="Link copied to clipboard!" open={toastOpen} onClose={() => setToastOpen(false)} />
    </div>
  )
}

export default function BlogsPageLayout() {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const allBlogs = await getAllBlogs()
      const allCategories = await getCategories()

      setBlogs(allBlogs)
      setFilteredBlogs(allBlogs)
      setCategories(["All", ...allCategories])
    }

    fetchData()
  }, [])

  useEffect(() => {
    let results = blogs

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((blog) => blog.category === selectedCategory)
    }

    setFilteredBlogs(results)

    // Update URL with query params without page reload
    const params = new URLSearchParams(window.location.search)

    if (selectedCategory && selectedCategory !== "All") {
      params.set("category", selectedCategory)
    } else {
      params.delete("category")
    }

    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "")
    window.history.replaceState({ path: newUrl }, "", newUrl)
  }, [searchTerm, selectedCategory, blogs])

  // Read URL parameters on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const categoryParam = params.get("category")
      const searchParam = params.get("search")

      if (categoryParam && categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam)
      }

      if (searchParam) {
        setSearchTerm(searchParam)
      }
    }
  }, [categories])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
<>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Marketing Insights</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Explore the latest trends, strategies, and tips to boost your digital marketing efforts.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <FilterList />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "result" : "results"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBlogs.map((blog, index) => {
            // Insert sponsored content after every 5th post
            const isSponsored = blog.sponsored

            return (
              <motion.div key={blog.id} variants={itemVariants}>
                {isSponsored ? (
                  // Sponsored Card
                  <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden h-full border-2 border-yellow-400"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    animate={{
                      borderColor: ["#FBBF24", "#9333EA", "#FBBF24"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={blog.coverImage || "/placeholder.svg"}
                        alt={blog.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" /> Sponsored
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{blog.category}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                        >
                          Read More <ArrowForward className="ml-1 w-4 h-4" />
                        </Link>
                        <a
                          href={blog.sponsorLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                        >
                          Visit Us <ArrowForward className="ml-1 w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Regular Card
                  <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden h-full"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={blog.coverImage || "/placeholder.svg"}
                        alt={blog.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{blog.category}</span>
                        <ShareMenu url={blog.slug} title={blog.title} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                        >
                          Read More <ArrowForward className="ml-1 w-4 h-4" />
                        </Link>
                        <div className="text-sm text-gray-500">{blog.date}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* YouTube Videos Section */}
        <div className="mt-16">
          <div className="flex items-center mb-6">
            <YouTube className="text-red-600 mr-2 text-3xl" />
            <h2 className="text-2xl font-bold">Latest Video Content</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((video) => (
              <div key={video} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0`}
                    title={`Digital Marketing Video ${video}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">Digital Marketing Strategy {video}</h3>
                  <p className="text-gray-600 text-sm">
                    Learn the latest digital marketing strategies to grow your business online.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Section */}
        <div className="mt-16 mb-8">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center mb-4">
                  <LocalOffer className="text-yellow-300 mr-2" />
                  <span className="text-yellow-300 font-medium">Special Offer</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Master Digital Marketing with Our Comprehensive Course
                </h3>
                <p className="text-purple-100 mb-6">
                  Learn SEO, SEM, Social Media Marketing, Content Strategy, and more from industry experts. Limited-time
                  30% discount available now!
                </p>
                <Link
                  href="/courses/digital-marketing"
                  className="inline-block bg-white text-purple-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Digital Marketing Course"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer/>
</>
  )
}
