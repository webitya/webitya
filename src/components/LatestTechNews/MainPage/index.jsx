'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FilterNews from '../FilterNews';
import Footer from '@/components/FooterEl';
import SponsoredAds from '../SponsoredAds';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

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
    <div className="container mx-auto px-6 lg:px-8 py-12 space-y-12">
      {/* Filter */}
      <FilterNews
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filterNewsData={newsData}
        setFilteredData={setFilteredNews}
      />

      {/* Featured */}
      {topNews && (
        <motion.section
          className="bg-gradient-to-r from-indigo-50 to-white rounded-3xl shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={topNews.image}
            alt={topNews.heading}
            loading="lazy"
            className="rounded-2xl object-cover w-full lg:w-1/2 max-h-[450px]"
          />
          <div className="flex flex-col justify-between w-full lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Latest News</h2>
            <Link
              href={`/latest-tech-news/${topNews.slug}`}
              className="space-y-4 cursor-pointer"
            >
              <div>
                <h3 className="text-3xl font-semibold text-gray-900 hover:text-indigo-600 transition">
                  {topNews.heading}
                </h3>
                <p className="text-lg text-gray-600">{topNews.subtitle}</p>
                <Button variant="contained" color="primary" className="mt-4 self-start">
                  Read More
                </Button>
              </div>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Mid Ad */}
      <SponsoredAds size="medium" content="📢 Promote your tech here. Reach 10K+ monthly readers!" link="https://www.webitya.com/" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentNews.map((news, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 relative group"
              whileHover={{ y: -4 }}
            >
              {/* Share */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition">
                <IconButton
                  onClick={() => handleShare('whatsapp', news)}
                  className="!bg-green-500 !text-white p-2 hover:!bg-green-600"
                  size="small"
                >
                  <WhatsAppIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleShare('instagram', news)}
                  className="!bg-gradient-to-tr from-purple-500 to-pink-500 !text-white p-2 hover:from-purple-600 hover:to-pink-600"
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </div>

              <Link
                href={`/latest-tech-news/${news.slug}`}
                className="flex flex-col h-full"
              >
                <div>
                  <img
                    src={news.image}
                    alt={news.heading}
                    loading="lazy"
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition">
                        {news.heading}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{news.subtitle}</p>
                    </div>
                    <Button variant="outlined" className="mt-4 self-start text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                      Read More
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Inline Ad */}
            {(idx + 1) % 3 === 0 && (
              <motion.div
                className="relative rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
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
                  <div className="p-6 bg-white">
                    <h4 className="text-lg font-semibold text-gray-900">Skill Up Fast</h4>
                    <p className="mt-2 text-sm text-gray-600">
                      Learn AI, Digital Marketing, Web Dev & more at SkillMasterPro. Join 100K+ tech learners.
                    </p>
                  </div>
                </a>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Ad */}
      <div className="mt-16">
        <SponsoredAds size="banner" content="👀 Hire top developers at RemoteHirePro!" link="https://www.webitya.com/" />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <Button
            variant="outlined"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Previous
          </Button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Next
          </Button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}