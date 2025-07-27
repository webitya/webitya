"use client"
// This file is a Client Component.
// It handles client-side interactivity and receives data as props.
import { useState } from "react"
import Link from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import ShareIcon from "@mui/icons-material/Share"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import TelegramIcon from "@mui/icons-material/Telegram"
import RedditIcon from "@mui/icons-material/Reddit"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import YouTubeEmbed from "../YouTubeEmbed"
import MinimalDrawer from "../MinimalDrawer"
import NewsletterSection from "../NewsletterSection"
import Footer from "@/components/FooterEl"
import { Instagram } from "lucide-react" // Correct import for Lucide Instagram icon

// BlogPostClient now receives article and relatedArticles as props
export default function BlogPostClient({ article, relatedArticles }) {
  const [copiedLink, setCopiedLink] = useState(false)
  const shareUrl = `https://webitya.com/blog/${article.slug}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareButtons = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`,
      color: "bg-sky-500",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: "bg-blue-700",
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      url: `https://wa.me/?text=${article.title} ${shareUrl}`,
      color: "bg-green-500",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      url: `https://t.me/share/url?url=${shareUrl}&text=${article.title}`,
      color: "bg-blue-500",
    },
    {
      name: "Reddit",
      icon: RedditIcon,
      url: `https://reddit.com/submit?url=${shareUrl}&title=${article.title}`,
      color: "bg-orange-500",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <MinimalDrawer />

        {/* Compact Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="w-full">
            {/* Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowBackIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>

            {/* Compact Hero Section */}
            <div className="w-full bg-gradient-to-br from-blue-50 to-white">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="text-center">
                  <div className="mb-3">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight max-w-4xl mx-auto">
                    {article.title}
                  </h1>
                  <p className="text-base text-gray-600 mb-5 leading-relaxed max-w-3xl mx-auto">{article.excerpt}</p>

                  {/* Compact Author Info */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.authorImage || "/placeholder.svg?height=32&width=32&query=author profile picture"}
                        alt={article.author}
                        className="w-8 h-8 rounded-full border-1 border-white shadow-sm"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">{article.author}</div>
                        <div className="text-xs text-gray-500">Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <AccessTimeIcon className="w-3.5 h-3.5" />
                      <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Featured Image */}
        <div className="w-full bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-t-xl mx-3 sm:mx-5 lg:mx-7 mt-6">
              <img
                src={article.image || "/placeholder.svg?height=300&width=600&query=blog post featured image"}
                alt={article.imageAlt}
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* YouTube Video */}
                {article.youtubeUrl && (
                  <div className="mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <YouTubeEmbed url={article.youtubeUrl} title={article.title} />
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7 lg:p-8 mb-6">
                  <div className="prose prose-base max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>
                </div>

                {/* Compact Tags Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <LocalOfferIcon className="w-5 h-5 text-blue-600" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compact Share Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShareIcon className="w-5 h-5 text-blue-600" />
                    Share this article
                  </h3>

                  {/* Copy Link Button */}
                  <div className="mb-5">
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        copiedLink
                          ? "bg-green-100 text-green-700 border-1 border-green-200"
                          : "bg-gray-100 text-gray-700 border-1 border-gray-200"
                      }`}
                    >
                      {copiedLink ? (
                        <>
                          <CheckIcon className="w-4 h-4" />
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <ContentCopyIcon className="w-4 h-4" />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>

                  {/* Social Share Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {shareButtons.map((button) => {
                      const IconComponent = button.icon
                      return (
                        <a
                          key={button.name}
                          href={button.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-white rounded-lg font-medium text-sm ${button.color}`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="hidden sm:inline">{button.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Compact Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Author Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
                  <div className="text-center">
                    <div className="relative inline-block mb-3">
                      <img
                        src={article.authorImage || "/placeholder.svg?height=64&width=64&query=author profile picture"}
                        alt={article.author}
                        className="w-16 h-16 rounded-full border-3 border-blue-100"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-1.5 border-white"></div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">{article.author}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{article.authorBio}</p>

                    {/* Author Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-500">Articles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">5.2k</div>
                        <div className="text-sm text-gray-500">Readers</div>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <a
                      href={`https://instagram.com/${article.author.toLowerCase().replace(/\s/g, "")}`} // Placeholder Instagram link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-5 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      Follow Author
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Continue Reading</h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">Explore more articles on similar topics</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`} className="group">
                    <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            relatedArticle.image || "/placeholder.svg?height=180&width=360&query=related article image"
                          }
                          alt={relatedArticle.imageAlt}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-md shadow-sm">
                            {relatedArticle.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors text-base">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3 leading-relaxed">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="font-medium">{relatedArticle.author}</span>
                          <span>{relatedArticle.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <NewsletterSection />
        <Footer />
      </div>
    </>
  )
}
