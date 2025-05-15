import { Suspense } from "react"
import CategoryNewsPage from "../[category]/category-news-page"

export const metadata = {
  title: "Business News | Webitya News",
  description: "Stay updated with the latest business news, market trends, and economic insights from Webitya News.",
  keywords: "business news, market trends, economic insights, financial news, Webitya news",
}

export default function Page() {
  return (
    <Suspense fallback={<BusinessNewsLoading />}>
      <CategoryNewsPage params={{ category: "business" }} />
    </Suspense>
  )
}

function BusinessNewsLoading() {
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
