import React from "react";
import Link from "next/link";
import LatestTechNewsData from "@/components/LatestTechNews/Data/LatestTechNewsData";
import Footer from "@/components/FooterEl";
import SponsoredAds from "@/components/LatestTechNews/SponsoredAds"; // Import SponsoredAds component

// ✅ SEO Metadata
export async function generateMetadata() {
  return {
    title: "AI Updates | Latest Tech News",
    description:
      "Get the latest updates in Artificial Intelligence – from cutting-edge models to real-world AI applications. Stay ahead with expert insights and news.",
    keywords:
      "AI news, artificial intelligence, machine learning, tech updates, AI models, deep learning",
    openGraph: {
      title: "AI Updates | Latest Tech News",
      description:
        "Get the latest updates in Artificial Intelligence – from cutting-edge models to real-world AI applications. Stay ahead with expert insights and news.",
      url: "https://yourwebsite.com/latest-tech-news/ai-updates",
      type: "article",
      images: [
        {
          url: "https://yourwebsite.com/images/ai-thumbnail.jpg", // Replace this
          width: 800,
          height: 600,
          alt: "AI Updates",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Updates | Latest Tech News",
      description:
        "Get the latest updates in Artificial Intelligence – from cutting-edge models to real-world AI applications. Stay ahead with expert insights and news.",
      images: ["https://yourwebsite.com/images/ai-thumbnail.jpg"],
    },
    robots: "index, follow",
  };
}

const AIUpdates = () => {
  const aiUpdatesData = LatestTechNewsData.filter((item) =>
    item.categories.includes("AI")
  );

  const [topNews, ...otherNews] = aiUpdatesData;

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">AI Updates</h1>

        {/* Top News Section */}
        {topNews && (
          <Link href={`/latest-tech-news/${topNews.slug}`}>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-8 cursor-pointer hover:bg-blue-100 transition-all">
              <img
                src={topNews.image}
                alt={topNews.heading}
                className="w-full h-48 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h2 className="text-xl font-semibold text-blue-900">{topNews.heading}</h2>
              <p className="text-sm text-gray-700 mt-2">{topNews.subtitle}</p>
            </div>
          </Link>
        )}

        {/* Ad 1 - Between Top News and Other News */}
       <div className="my-3">
       <SponsoredAds
          size="banner"
          content="Want to stay ahead in AI? Explore the top AI courses at Webitya.com!"
          link="https://www.webitya.com/"
        />
       </div>

        {/* Other News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherNews.map((news, index) => (
            <Link key={index} href={`/latest-tech-news/${news.slug}`}>
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition cursor-pointer">
                <img
                  src={news.image}
                  alt={news.heading}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h3 className="text-lg font-medium text-blue-800">{news.heading}</h3>
                <p className="text-xs text-gray-600 mt-1">{news.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Ad 2 - Bottom Banner Before Footer */}
       <div className="my-3">
       <SponsoredAds
          size="banner"
          content="Discover AI products for your business at AIProductsHub.com!"
          link="https://www.webitya.com/"
        />
       </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AIUpdates;
