"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowBack,
  CalendarToday,
  Person,
  LocalOffer,
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  Star,
  ArrowForward,
  Share,
  WhatsApp,
  Pinterest,
  ContentCopy,
  Email,
} from "@mui/icons-material"

// Import blog data
import { getBlogBySlug, getRelatedBlogs } from "@/components/BlogsData/blog-data"

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

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : `https://webitya.com${url}`

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
      name: "Pinterest",
      icon: <Pinterest className="text-red-600" />,
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}`,
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
        className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share"
      >
        <Share className="text-gray-600" />
        <span className="text-gray-600">Share</span>
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

export default function BlogPost({ params }) {
  const { slug } = params
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const blogData = await getBlogBySlug(slug)
      const related = await getRelatedBlogs(blogData.category, blogData.id)

      setBlog(blogData)
      setRelatedBlogs(related)
      setLoading(false)

      // Scroll to top when blog changes
      window.scrollTo(0, 0)
    }

    fetchData()
  }, [slug])

  // Reading progress indicator
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight

      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener("scroll", updateReadingProgress)

    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <Link href="/blogs" className="text-purple-600 hover:text-purple-800">
          Return to Blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-purple-600"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={blog.coverImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blog.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center text-white gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                <CalendarToday className="w-4 h-4 mr-2" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <Person className="w-4 h-4 mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <LocalOffer className="w-4 h-4 mr-2" />
                <span className="bg-purple-600 bg-opacity-70 px-2 py-1 rounded-full text-sm">{blog.category}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Blogs */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/blogs" className="inline-flex items-center text-purple-600 hover:text-purple-800">
          <ArrowBack className="w-4 h-4 mr-1" /> Back to Blogs
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Social Share */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <ShareMenu url={`/blogs/${blog.slug}`} title={blog.title} />
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <Facebook />
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
                      <Twitter />
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      <LinkedIn />
                    </button>
                    <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                      <WhatsApp />
                    </button>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">{blog.readTime} min read</div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">{blog.excerpt}</p>

                {blog.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section.type === "heading" && (
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">{section.content}</h2>
                    )}
                    {section.type === "paragraph" && (
                      <p className="mb-4 text-gray-700 leading-relaxed">{section.content}</p>
                    )}
                    {section.type === "image" && (
                      <div className="my-8">
                        <Image
                          src={section.src || "/placeholder.svg"}
                          alt={section.alt || "Blog image"}
                          width={800}
                          height={450}
                          className="rounded-lg w-full"
                        />
                        {section.caption && <p className="text-sm text-center text-gray-500 mt-2">{section.caption}</p>}
                      </div>
                    )}
                    {section.type === "list" && (
                      <ul className="list-disc pl-6 mb-6 space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.type === "quote" && (
                      <blockquote className="border-l-4 border-purple-500 pl-4 italic my-6 text-gray-700">
                        {section.content}
                      </blockquote>
                    )}
                    {section.type === "youtube" && (
                      <div className="my-8">
                        <div className="relative pb-[56.25%] h-0">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${section.videoId}?rel=0`}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        {section.caption && <p className="text-sm text-center text-gray-500 mt-2">{section.caption}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-start gap-4">
                  <Image
                    src={blog.authorImage || "/placeholder.svg?height=80&width=80"}
                    alt={blog.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{blog.author}</h3>
                    <p className="text-gray-600 mb-2">{blog.authorBio}</p>
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600">
                        <Facebook fontSize="small" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-400">
                        <Twitter fontSize="small" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-700">
                        <LinkedIn fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Section */}
            {blog.youtubeVideos && blog.youtubeVideos.length > 0 && (
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <YouTube className="text-red-600 mr-2" />
                  <h2 className="text-xl font-bold">Related Videos</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.youtubeVideos.map((video, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="relative pb-[56.25%] h-0">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-800">{video.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Sponsored Content */}
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-yellow-400 mb-6"
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
                  src="/placeholder.svg?height=300&width=600"
                  alt="Sponsored Content"
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Sponsored
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Boost Your Digital Marketing ROI</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover how our tools can help you maximize your digital marketing return on investment.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="https://webitya.com/services/digital-marketing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Learn More
                  </a>
                  <a
                    href="https://webitya.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Visit Us <ArrowForward className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Related Posts</h3>
              <div className="space-y-4">
                {relatedBlogs.map((related) => (
                  <Link key={related.id} href={`/blogs/${related.slug}`} className="flex gap-3 group">
                    <Image
                      src={related.coverImage || "/placeholder.svg"}
                      alt={related.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-500">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
              <div className="space-y-2">
                {["SEO", "Content Marketing", "Social Media", "Email Marketing", "PPC", "Analytics"].map((category) => (
                  <Link
                    key={category}
                    href={`/blogs?category=${category}`}
                    className="flex items-center justify-between py-2 border-b border-gray-100 hover:text-purple-600"
                  >
                    <span>{category}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {Math.floor(Math.random() * 20) + 1}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-md p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-purple-100 mb-4">
                Get the latest digital marketing tips and trends delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-purple-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Image
                src={`/placeholder.svg?height=200&width=400&text=Article+${item}`}
                alt={`Article ${item}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Digital Marketing Strategy {item}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn how to create an effective digital marketing strategy for your business.
                </p>
                <Link
                  href={`/blogs/digital-marketing-strategy-${item}`}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
