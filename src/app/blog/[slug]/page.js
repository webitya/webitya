import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowBack, Schedule, Tag, Share, Facebook, Twitter, LinkedIn } from "../../../components/icons/MinimalIcons"
import { getArticleBySlug, getRelatedArticles, allArticles } from "../../../components/data/blogData"
import SEOHead from "../../../components/SEOHead"
import YouTubeEmbed from "../../../components/YouTubeEmbed"
import MinimalDrawer from "../../../components/MinimalDrawer"
import NewsletterSection from "../../../components/NewsletterSection"
import Footer from "@/components/FooterEl"

// Generate static params for all articles
export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for each article
export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found | Webitya Blog",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.image],
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.image],
    },
  }
}

export default function BlogPost({ params }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article)
  const shareUrl = `https://webitya.com/blog/${article.slug}`

  return (
    <>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        image={article.image}
        url={`/blog/${article.slug}`}
        article={article}
        schema={article.schema}
      />

      <div className="min-h-screen bg-gray-50">
        <MinimalDrawer />

        {/* Full Width Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="w-full">
            {/* Navigation - with container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <ArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>

            {/* Hero Section - Full Width */}
            <div className="w-full bg-gradient-to-b from-white to-gray-50/50">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="text-center">
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      {article.category}
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
                    {article.title}
                  </h1>

                  <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">{article.excerpt}</p>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.authorImage || "/placeholder.svg"}
                        alt={article.author}
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <div className="text-left">
                        <div className="font-medium text-gray-700">{article.author}</div>
                        <div className="text-xs text-gray-500">Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Schedule className="w-4 h-4" />
                      <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Featured Image */}
        <div className="w-full bg-white">
          <div className="max-w-6xl mx-auto">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.imageAlt}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>

        {/* Article Content - Full Width Container */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* YouTube Video */}
                {article.youtubeUrl && (
                  <div className="mb-12">
                    <YouTubeEmbed url={article.youtubeUrl} title={article.title} />
                  </div>
                )}

                {/* Article Content */}
                <div className="minimal-card p-8 lg:p-12 mb-12">
                  <div className="prose-minimal max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>
                </div>

                {/* Tags Section */}
                <div className="minimal-card p-8 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <Tag className="w-6 h-6" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="minimal-card p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <Share className="w-6 h-6" />
                    Share this article
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                    >
                      <LinkedIn className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                {/* Author Info */}
                <div className="minimal-card p-8 sticky top-8">
                  <div className="text-center">
                    <img
                      src={article.authorImage || "/placeholder.svg"}
                      alt={article.author}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-200"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.author}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{article.authorBio}</p>

                    {/* Author Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">12</div>
                        <div className="text-sm text-gray-500">Articles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">5.2k</div>
                        <div className="text-sm text-gray-500">Readers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table of Contents */}
                {/* <div className="minimal-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contents</h3>
                  <nav className="space-y-3">
                    <a
                      href="#introduction"
                      className="block text-gray-600 hover:text-gray-900 transition-colors hover:translate-x-2 duration-200 py-1"
                    >
                      Introduction
                    </a>
                    <a
                      href="#key-points"
                      className="block text-gray-600 hover:text-gray-900 transition-colors hover:translate-x-2 duration-200 py-1"
                    >
                      Key Points
                    </a>
                    <a
                      href="#implementation"
                      className="block text-gray-600 hover:text-gray-900 transition-colors hover:translate-x-2 duration-200 py-1"
                    >
                      Implementation
                    </a>
                    <a
                      href="#best-practices"
                      className="block text-gray-600 hover:text-gray-900 transition-colors hover:translate-x-2 duration-200 py-1"
                    >
                      Best Practices
                    </a>
                    <a
                      href="#conclusion"
                      className="block text-gray-600 hover:text-gray-900 transition-colors hover:translate-x-2 duration-200 py-1"
                    >
                      Conclusion
                    </a>
                  </nav>
                </div> */}

                {/* Reading Progress */}
                {/* <div className="minimal-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-medium">0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full w-0 transition-all duration-300"
                        id="reading-progress"
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">Estimated reading time: {article.readTime}</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="w-full bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Continue exploring these related topics and insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`} className="group">
                    <article className="minimal-card overflow-hidden hover-lift h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.imageAlt}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-md">
                            {relatedArticle.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedArticle.author}</span>
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

        {/* Full Width Newsletter Section */}
        <NewsletterSection />

        {/* Full Width Footer */}
        <Footer />
      </div>
    </>
  )
}
