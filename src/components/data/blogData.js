import { aiArticles } from "./AiArticles"
import { pythonArticles } from "./PythonArticles"
import { htmlArticles } from "./HtmlArticles"
import { javascriptArticles } from "./JavascriptArticles"
import { reactjsArticles } from "./ReactjsArticles"
import { nextjsArticles } from "./NextjsArticles"
import { digitalMarketingArticles } from "./DigitalMarketingArticles"

// Combine all articles from different categories
export const allArticles = [
  ...aiArticles,
  ...pythonArticles,
  ...htmlArticles,
  ...javascriptArticles,
  ...reactjsArticles,
  ...nextjsArticles,
  ...digitalMarketingArticles,
]

// Define categories here
export const categories = ["All", "AI", "Python", "HTML", "JavaScript", "ReactJS", "NextJS", "Digital Marketing"]

export const getArticleBySlug = (slug) => {
  return allArticles.find((article) => article.slug === slug)
}

export const getRecentArticles = () => {
  return allArticles
    .filter((article) => article.isRecent)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6)
}

export const getPopularArticles = () => {
  return allArticles
    .filter((article) => article.isPopular)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6)
}

export const getArticlesByCategory = (category) => {
  if (category === "All") return allArticles
  return allArticles.filter((article) => article.category === category)
}

export const searchArticles = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.author.toLowerCase().includes(lowercaseQuery) ||
      article.category.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export const getRelatedArticles = (currentArticle, limit = 3) => {
  return allArticles
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category || article.tags.some((tag) => currentArticle.tags.includes(tag))),
    )
    .slice(0, limit)
}
