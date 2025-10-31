"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube, Instagram, Mail, Send, CheckCircle, XCircle } from "lucide-react" // Removed Users icon
import { allArticles } from "../data/blogData" // Import allArticles
import SitemapInlineDynamic from "../FooterSitemap/SitemapInlineDynamic"

const footerData = [
  {
    title: "About us",
    links: [
      { name: "Privacy", href: "/legal/privacy-policy" },
      { name: "Terms of service", href: "/legal/terms" },
      { name: "Refund Policy", href: "/legal/refund-policy" },
      { name: "Disclaimer", href: "/legal/disclaimer" },
      { name: "FAQS", href: "/faqs" },
      { name: "Blog", href: "/blog" },
      { name: "Book Influencer", href: "/influencers#collection" },
      { name: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "SEO", href: "/services" },
      { name: "Social Media Marketing", href: "/services" },
      { name: "PPC Advertising", href: "/services" },
      { name: "Email Marketing", href: "/services" },
      { name: "Content Marketing", href: "/services" },
      { name: "Web Design", href: "/services" },
    ],
  },
  // Blogs section will be dynamically generated
  {
    title: "Courses",
    links: [
      { name: "Social Media Marketing", href: "/courses" },
      { name: "Our Students", href: "/courses/all-students" },
    ],
  },
]

const Footer = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // 'idle', 'subscribing', 'success', 'error'
  const [message, setMessage] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState(new Date()) // State for live time

  // Update current date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(timer) // Cleanup on unmount
  }, [])

  // Sort all articles by publish date to get the most recent ones
  const sortedArticles = [...allArticles].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  )

  const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  const formattedDate = currentDateTime.toLocaleDateString("en-US", optionsDate)

  const hours = currentDateTime.getHours()
  const minutes = currentDateTime.getMinutes()
  const seconds = currentDateTime.getSeconds()

  // Format time with leading zeros and separate seconds for styling
  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = seconds.toString().padStart(2, "0")

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setStatus("subscribing")
    setMessage("")

    try {
      const response = await fetch("/api/footerNewsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message || "Thank you for subscribing to our newsletter! Check your inbox for a welcome email.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.message || "Subscription failed. Please try again later.")
      }
    } catch (error) {
      console.error("Error during subscription:", error)
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      // Clear status message after a few seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
 <>
 <SitemapInlineDynamic/>
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1: Logo + Description + Newsletter */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col">
          <div className="mb-4">
            <Link href="/">
              <img src="/brand/logo2.png" alt="WEBITYA Logo" className="w-40 cursor-pointer" />
            </Link>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            WEBITYA is your trusted digital marketing agency
            <br />
            specializing in SEO, Social Media, <br /> and Content Marketing.
          </p>
          {/* Newsletter */}
          <p className="text-base font-bold mb-2">Subscribe to our Newsletter</p>
          <p className="text-sm mb-4">Get the latest tips, news & insights from WEBITYA.</p>
          <form onSubmit={handleSubscribe} className="max-w-xs">
            <div className="relative mb-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={status === "subscribing"}
            >
              {status === "subscribing" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
            {/* Status Messages */}
            {status === "success" && message && (
              <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>{message}</span>
              </div>
            )}
            {status === "error" && message && (
              <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                <XCircle className="w-4 h-4" />
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Dynamic Link Columns */}
        {footerData.map((section, idx) => (
          <div key={idx} className="flex flex-col">
            <p className="text-base font-bold mb-4">{section.title}</p>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Dynamic Blogs Column */}
        <div className="flex flex-col">
          <p className="text-base font-bold mb-4">Blogs</p>
          <ul
            className="space-y-2 max-h-[250px] overflow-y-auto pr-2
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-800
            [&::-webkit-scrollbar-thumb]:bg-gray-600
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-gray-500
            [scrollbar-width:thin]
            [scrollbar-color:theme(colors.gray.600)_theme(colors.gray.800)]
            "
          >
            {sortedArticles.map((article, index) => (
              <li key={article.id}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="flex items-start gap-2 text-sm hover:text-white transition-colors"
                >
                  <span className="text-gray-500 font-semibold w-4 flex-shrink-0">{index + 1}.</span>
                  <span className="flex-grow">{article.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-700" />

      {/* Bottom Text + Social */}
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WEBITYA Digital Marketing Agency. All rights reserved.
          <br />
          <span className="text-gray-500 text-xs mt-1 block">
            {formattedDate}, {formattedHours}:{formattedMinutes}:
            <span className="text-blue-400">{formattedSeconds}</span>
          </span>
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="https://github.com/webitya" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </button>
          </Link>
          <Link href="https://x.com/webitya" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </button>
          </Link>
          <Link href="https://www.linkedin.com/in/aditya-kumar-webitya/" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </button>
          </Link>
          <Link href="https://www.youtube.com/@webitya" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
              <Youtube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </button>
          </Link>
          <Link href="https://www.instagram.com/webitya.in/" target="_blank" rel="noopener noreferrer">
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </button>
          </Link>
        </div>
      </div>
    </footer>
 </>
  )
}

export default Footer
