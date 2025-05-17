'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FilterNews from '../FilterNews';
import Footer from '@/components/FooterEl';
import SponsoredAds from '../SponsoredAds';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function MainPage({ newsData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => setCurrentPage(1), [searchQuery, selectedCategory]);
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [currentPage]);

  const topNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = remainingNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(remainingNews.length / newsPerPage);

  const handleShare = (platform, news) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(news.heading);
    const endpoints = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      instagram: `https://www.instagram.com/?url=${url}`,
    };
    window.open(endpoints[platform], '_blank');
  };

  return (
    <>
    <div className="mx-auto px-2 lg:px-2 py-14 space-y-16 bg-gray-50">
      <FilterNews
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filterNewsData={newsData}
        setFilteredData={setFilteredNews}
      />

      {/* Featured News */}
      {topNews && (
        <motion.section
          className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={topNews.image}
            alt={topNews.heading}
            loading="lazy"
            className="rounded-2xl object-cover w-full lg:w-1/2 max-h-[460px]"
          />
          <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-4">
            <h2 className="text-4xl font-bold text-indigo-800">🔥 Featured Article</h2>
            <Link href={`/latest-tech-news/${topNews.slug}`} className="space-y-3">
              <h3 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition">
                {topNews.heading}
              </h3>
              <p className="text-gray-600">{topNews.subtitle}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AccessTimeIcon fontSize="small" />
                5 min read
              </div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} className="w-fit">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition">
                Read More
              </button>
            </motion.div>
          </div>
        </motion.section>
      )}

      <SponsoredAds
        size="medium"
        content="📢 Promote your tech here. Reach 10K+ monthly readers!"
        link="https://www.webitya.com/"
      />

      {/* News Cards */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentNews.map((news, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 relative group"
                whileHover={{ y: -4 }}
              >
                {/* Share Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleShare('whatsapp', news)}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                    title="Share on WhatsApp"
                  >
                    <WhatsAppIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleShare('instagram', news)}
                    className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2"
                    title="Share on Instagram"
                  >
                    <InstagramIcon fontSize="small" />
                  </button>
                </div>

                <Link href={`/latest-tech-news/${news.slug}`} className="flex flex-col h-full">
                  <img src={news.image} alt={news.heading} className="w-full h-52 object-cover" />
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition">
                      {news.heading}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{news.subtitle}</p>
                    <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                      <AccessTimeIcon fontSize="small" />
                      Estimated 3 min read
                    </div>
                    <button className="mt-4 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 font-medium px-4 py-2 rounded-xl self-start">
                      Read More
                    </button>
                  </div>
                </Link>
              </motion.div>

              {/* Inline Sponsored Ad */}
              {(idx + 1) % 3 === 0 && (
                <motion.div
                  className="relative rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Sponsored
                  </div>
                  <a href="https://webitya.com/courses" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://res.cloudinary.com/dxqthnbx7/image/upload/v1745427100/whatsapp-image-2025-04-23-at-222040-7840184c-68091a7c365c5_ezeb3b.webp"
                      alt="Sponsored Ad"
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-5 bg-white">
                      <h4 className="text-lg font-semibold text-gray-900">Skill Up Fast</h4>
                      <p className="mt-2 text-sm text-gray-600">
                        Learn AI, Digital Marketing, Web Dev & more. Join 100K+ learners.
                      </p>
                    </div>
                  </a>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Bottom Sponsored */}
      <div className="pt-10 border-t border-gray-200">
        <SponsoredAds
          size="banner"
          content="👀 Hire top developers at RemoteHirePro!"
          link="https://www.webitya.com/"
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-xl font-medium transition ${
              currentPage === 1
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-xl font-medium transition ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

    
    </div>
      <Footer />
    </>
  );
}
