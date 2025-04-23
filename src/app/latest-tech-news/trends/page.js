import React from "react";
import Link from "next/link";
import LatestTechNewsData from "@/components/LatestTechNews/Data/LatestTechNewsData";
import Footer from "@/components/FooterEl";
import SponsoredAds from "@/components/LatestTechNews/SponsoredAds"; // Import SponsoredAds component

// ✅ SEO Metadata
export async function generateMetadata() {
  return {
    title: "Tech Trends | Latest Tech News",
    description: "Catch up on the latest trends in technology — from innovations to industry insights. Stay informed with curated tech stories.",
    keywords: "tech trends, latest technology, innovation news, future tech, digital news",
    openGraph: {
      title: "Tech Trends | Latest Tech News",
      description: "Catch up on the latest trends in technology — from innovations to industry insights. Stay informed with curated tech stories.",
      url: "https://yourwebsite.com/latest-tech-news/tech-trends",
      type: "article",
      images: [
        {
          url: "https://yourwebsite.com/images/tech-trends-thumbnail.jpg", // Replace with your image
          width: 800,
          height: 600,
          alt: "Tech Trends",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tech Trends | Latest Tech News",
      description: "Catch up on the latest trends in technology — from innovations to industry insights. Stay informed with curated tech stories.",
      images: ["https://yourwebsite.com/images/tech-trends-thumbnail.jpg"],
    },
    robots: "index, follow",
  };
}

// ✅ Server Component
const TechTrends = () => {
  const techTrendsData = LatestTechNewsData.filter(item =>
    item.categories.includes("Tech")
  );

  const [topNews, ...otherNews] = techTrendsData;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">Tech Trends</h1>

        {/* Top News Section */}
        {topNews && (
          <Link href={`/latest-tech-news/${topNews.slug}`}>
            <div className="bg-blue-50 p-5 rounded-xl shadow-md mb-8 cursor-pointer hover:bg-blue-100 transition-all">
              <img
                src={topNews.image}
                alt={topNews.heading}
                className="w-full h-56 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h2 className="text-2xl font-semibold text-blue-900">{topNews.heading}</h2>
              <p className="text-sm text-gray-700 mt-2">{topNews.subtitle}</p>
            </div>
          </Link>
        )}

        {/* Sponsored Ad 1 - Between Top News and Other News */}
       <div className="my-3">
       <SponsoredAds
          size="banner"
          content="Stay ahead with the latest in technology. Explore cutting-edge innovations at TechInnovations.com!"
          link="https://www.webitya.com/"
        />
       </div>

        {/* Other News Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherNews.map((news, index) => (
            <Link key={index} href={`/latest-tech-news/${news.slug}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                <img
                  src={news.image}
                  alt={news.heading}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h3 className="text-xl font-medium text-blue-800">{news.heading}</h3>
                <p className="text-sm text-gray-600 mt-1">{news.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Sponsored Ad 2 - Bottom Banner Before Footer */}
       <div className="my-3">
       <SponsoredAds
          size="banner"
          content="Discover the latest tech products and innovations at TechProductsHub.com!"
          link="https://www.webitya.com/"
        />
       </div>
      </div>

      <Footer />
    </>
  );
};

export default TechTrends;
