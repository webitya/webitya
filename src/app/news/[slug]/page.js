import NewsDetailPageClient from "./NewsDetailPageClient"
import newsData from "@/components/News/data/news-data"
import sponsoredData from "@/components/News/data/sponsored-data"

export default function NewsDetailPage({ params }) {
  // Find the article data on the server side
  const { slug } = params
  let article = newsData.find((item) => item.slug === slug)
  let isSponsored = false

  if (!article) {
    article = sponsoredData.find((item) => item.slug === slug)
    isSponsored = true
  }

  // Pass the pre-fetched data to the client component
  return (
    <NewsDetailPageClient
      params={params}
      serverArticle={article}
      isServerSponsored={isSponsored}
      allNewsData={newsData}
      allSponsoredData={sponsoredData}
    />
  )
}

// Keep the generateMetadata function as is
export async function generateMetadata({ params }) {
  const { slug } = params

  // Find article in either regular or sponsored data
  let article = newsData.find((item) => item.slug === slug)

  if (!article) {
    article = sponsoredData.find((item) => item.slug === slug)
  }

  if (!article) {
    return {
      title: "Article Not Found | Webitya News",
      description: "The article you are looking for could not be found.",
    }
  }

  return {
    title: `${article.title} | Webitya News`,
    description: article.summary,
    keywords: `${article.category}, Webitya, news, ${article.title.toLowerCase().split(" ").slice(0, 3).join(", ")}`,
    openGraph: {
      title: `${article.title} | Webitya News`,
      description: article.summary,
      images: [article.image],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Webitya News`,
      description: article.summary,
      images: [article.image],
    },
  }
}
