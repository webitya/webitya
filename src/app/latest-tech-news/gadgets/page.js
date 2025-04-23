"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LatestTechNewsData from "../../../components/LatestTechNews/Data/LatestTechNewsData";
import Footer from "@/components/FooterEl";

const Gadgets = () => {
  const router = useRouter();

  // Get all news items related to "Gadgets"
  const gadgetsData = LatestTechNewsData.filter(item =>
    item.categories.includes("Gadgets")
  );

  // Separate the first news item
  const [topNews, ...otherNews] = gadgetsData;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Gadgets</h1>

        {topNews && (
          <div
            className="bg-blue-50 p-6 rounded-xl shadow-lg mb-10 cursor-pointer hover:bg-blue-100 transition-all"
            onClick={() => router.push(`/latest-tech-news/${topNews.slug}`)}
          >
            <img
              src={topNews.image}
              alt={topNews.heading}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-3xl font-bold text-blue-900">{topNews.heading}</h2>
            <p className="text-gray-700 mt-2">{topNews.subtitle}</p>
          </div>
        )}

        {/* Cards for remaining news */}
        <div className="grid gap-6 md:grid-cols-2">
          {otherNews.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => router.push(`/latest-tech-news/${news.slug}`)}
            >
              <img
                src={news.image}
                alt={news.heading}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-blue-800">
                {news.heading}
              </h3>
              <p className="text-gray-600 mt-1">{news.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gadgets;
