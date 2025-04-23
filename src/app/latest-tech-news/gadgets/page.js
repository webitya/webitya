import React from "react";
import Link from "next/link";
import LatestTechNewsData from "@/components/LatestTechNews/Data/LatestTechNewsData";
import Footer from "@/components/FooterEl";
import SponsoredAds from "@/components/LatestTechNews/SponsoredAds"; // Import SponsoredAds component

// ✅ SEO Metadata
export async function generateMetadata() {
  return {
    title: "Gadgets News | Latest Tech News",
    description: "Explore the latest in gadgets – from smartphones and wearables to smart home devices. Stay ahead with the newest product launches and reviews.",
    keywords: "gadgets, tech news, smartphones, wearables, tech reviews, smart devices",
    openGraph: {
      title: "Gadgets News | Latest Tech News",
      description: "Explore the latest in gadgets – from smartphones and wearables to smart home devices. Stay ahead with the newest product launches and reviews.",
      url: "https://yourwebsite.com/latest-tech-news/gadgets",
      type: "article",
      images: [
        {
          url: "https://yourwebsite.com/images/gadgets-thumbnail.jpg", // Replace this with your real image
          width: 800,
          height: 600,
          alt: "Gadgets News",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gadgets News | Latest Tech News",
      description: "Explore the latest in gadgets – from smartphones and wearables to smart home devices. Stay ahead with the newest product launches and reviews.",
      images: ["https://yourwebsite.com/images/gadgets-thumbnail.jpg"],
    },
    robots: "index, follow",
  };
}

const Gadgets = () => {
  const gadgetsData = LatestTechNewsData.filter(item =>
    item.categories.includes("Gadgets")
  );

  const [topNews, ...otherNews] = gadgetsData;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">Gadgets</h1>

        {/* Top News Section */}
        {topNews && (
          <Link href={`/latest-tech-news/${topNews.slug}`}>
            <div className="bg-blue-50 p-5 rounded-xl shadow-md mb-8 cursor-pointer hover:bg-blue-100 transition-all">
              <img
                src={topNews.image}
                alt={topNews.heading}
                className="w-full h-48 object-cover rounded-md mb-4"
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
          content="Check out the latest gadgets at GadgetStore.com! Don't miss out on the newest tech."
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
          content="Get the best deals on smart wearables at WearablesHub.com!"
          link="https://www.webitya.com/"
        />
       </div>
      </div>

      <Footer />
    </>
  );
};

export default Gadgets;
