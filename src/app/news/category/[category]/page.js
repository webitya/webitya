import { Suspense } from "react"
import CategoryNewsPage from "./category-news-page"
import newsData from "@/components/News/data/news-data"

export async function generateMetadata({ params }) {
  const { category } = params
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} News | Webitya News`,
    description: `Stay updated with the latest ${category} news, trends, and insights from Webitya News.`,
    keywords: `${category} news, ${category} updates, ${category} trends, Webitya news`,
  }
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<CategoryNewsLoading />}>
      <CategoryNewsPage params={params} />
    </Suspense>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = [...new Set(newsData.map((item) => item.category.toLowerCase()))]

  return categories.map((category) => ({
    category,
  }))
}

function CategoryNewsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="h-10 w-48 bg-slate-200 animate-pulse mb-8 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-slate-200 animate-pulse"></div>
              <div className="p-5">
                <div className="h-4 bg-slate-200 animate-pulse mb-3 w-1/3"></div>
                <div className="h-6 bg-slate-200 animate-pulse mb-3"></div>
                <div className="h-4 bg-slate-200 animate-pulse mb-2 w-full"></div>
                <div className="h-4 bg-slate-200 animate-pulse mb-2 w-5/6"></div>
                <div className="h-4 bg-slate-200 animate-pulse mb-4 w-4/6"></div>
                <div className="h-4 bg-slate-200 animate-pulse w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
