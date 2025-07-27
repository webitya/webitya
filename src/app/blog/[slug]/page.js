// This file is a Server Component.
// It handles data fetching and metadata generation on the server.
import { notFound } from "next/navigation"
import { getArticleBySlug, allArticles, getRelatedArticles } from "../../../components/data/blogData"
import BlogPostClient from "../../../components/BlogClient"

// Generate static params for all articles
export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

// generateMetadata runs on the server to set the page's metadata
// This is the primary mechanism for SEO and social sharing metadata.
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
  // Fetch article data on the server
  const article = getArticleBySlug(params.slug)
  if (!article) {
    notFound()
  }
  const relatedArticles = getRelatedArticles(article)

  // Pass data to the Client Component for rendering and interactivity
  return <BlogPostClient article={article} relatedArticles={relatedArticles} />
}
