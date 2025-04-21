'use client';

import React, { useState, useEffect } from 'react';
import LatestTechNewsData from '../../components/LatestTechNews/Data/LatestTechNewsData';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/FooterEl';
import FilterNews from '../../components/LatestTechNews/FilterNews';
import { Button } from '@mui/material';

const LatestTechNewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    if (Array.isArray(LatestTechNewsData)) {
      setFilteredNews(LatestTechNewsData);
    } else {
      console.error("LatestTechNewsData is not an array or is undefined");
    }
  }, []);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const latestNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const previousNews = filteredNews.slice(1);

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = previousNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(previousNews.length / newsPerPage);

  return (
    <>
      <div className="px-4 py-6  mx-auto space-y-10">
        {/* Filter */}
        <FilterNews
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterNewsData={LatestTechNewsData}
          setFilteredData={setFilteredNews}
        />

        {/* Latest News */}
        {latestNews ? (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Latest Tech News</h2>
            <Link href={`/latest-tech-news/${latestNews.slug}`}>
              <div className="cursor-pointer">
                <Image
                  src={latestNews.image}
                  alt={latestNews.heading}
                  width={800}
                  height={400}
                  className="rounded-xl w-full object-cover"
                />
                <h3 className="text-xl font-semibold mt-4">{latestNews.heading}</h3>
                <p className="text-gray-600 mt-2">{latestNews.subtitle}</p>
              </div>
            </Link>
          </div>
        ) : (
          <p>No news found based on your filters.</p>
        )}

        {/* Ad Section */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center shadow">
          <h4 className="text-lg font-semibold text-yellow-700">Sponsored Ad</h4>
          <p className="text-sm text-yellow-600 mt-2">
            Your Ad Here – Reach Thousands of Tech Enthusiasts!
          </p>
        </div>

        {/* Previous News Grid */}
        {currentNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentNews.map((news, index) => (
              <Link href={`/latest-tech-news/${news.slug}`} key={index}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer transition">
                  <Image
                    src={news.image}
                    alt={news.heading}
                    width={400}
                    height={250}
                    className="rounded-md w-full object-cover"
                  />
                  <h3 className="mt-4 font-bold text-lg text-gray-800">{news.heading}</h3>
                  <p className="text-sm text-gray-600 mt-1">{news.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No previous news found based on your filters.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              variant="outlined"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default LatestTechNewsPage;
