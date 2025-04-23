'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mui/material';
import FilterNews from '../FilterNews';
import Footer from '@/components/FooterEl';

const MainPage = ({ newsData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  // Reset to page 1 on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const topNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  // Pagination logic (after removing topNews)
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = remainingNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(remainingNews.length / newsPerPage);

  return (
  <>
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-10">
      {/* Filter */}
      <FilterNews
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filterNewsData={newsData}
        setFilteredData={setFilteredNews}
      />

      {/* Latest News */}
      {filteredNews.length > 0 ? (
        <>
          {/* Highlighted Top News */}
          {topNews && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Latest Tech News</h2>
              <Link href={`/latest-tech-news/${topNews.slug}`}>
                <div className="cursor-pointer">
                  <Image
                    src={topNews.image}
                    alt={`News image: ${topNews.heading}`}
                    width={800}
                    height={400}
                    className="rounded-xl w-full object-cover"
                  />
                  <h3 className="text-xl font-semibold mt-4">{topNews.heading}</h3>
                  <p className="text-gray-600 mt-2">{topNews.subtitle}</p>
                </div>
              </Link>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentNews.map((news, index) => (
              <Link href={`/latest-tech-news/${news.slug}`} key={index}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer transition">
                  <Image
                    src={news.image}
                    alt={`Thumbnail of ${news.heading}`}
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

          {/* Pagination Controls */}
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
        </>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg font-medium">No news matched your filters or search.</p>
        </div>
      )}

      
    </div>
    {/* Footer */}
    <Footer />
  </>
  );
};

export default MainPage;
