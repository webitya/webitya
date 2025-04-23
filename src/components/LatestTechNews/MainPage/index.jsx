'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import FilterNews from '../FilterNews';
import Footer from '@/components/FooterEl';
import SponsoredAds from '../SponsoredAds';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const MainPage = ({ newsData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const topNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = remainingNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(remainingNews.length / newsPerPage);

  const handleShare = (platform, news) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(news.heading);
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, '_blank');
    } else if (platform === 'instagram') {
      window.open(`https://www.instagram.com/?url=${shareUrl}`, '_blank');
    }
  };

  return (
  <>
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-screen-xl mx-auto space-y-12">
      {/* Filter Section */}
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
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="md:text-3xl text-2xl font-bold mb-6 text-indigo-600">Latest News</h2>
          <Link href={`/latest-tech-news/${topNews.slug}`}>
            <div className="cursor-pointer space-y-4">
              <img
                src={topNews.image}
                alt={topNews.heading}
                loading="lazy"
                className="rounded-2xl w-full object-cover max-h-[450px]"
              />
              <h3 className="text-2xl font-semibold">{topNews.heading}</h3>
              <p className="text-gray-600 text-lg">{topNews.subtitle}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Mid-Page Ad */}
      <SponsoredAds
        size="medium"
        content="📢 Promote your tech here. Reach 10K+ monthly readers!"
        link="https://www.webitya.com/"
      />

      {/* News Cards Grid with inline Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentNews.map((news, index) => (
          <React.Fragment key={index}>
            <div className="relative group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              {/* Share Icons */}
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-white/80 backdrop-blur-md p-1.5 rounded-md shadow">
                <IconButton
                  onClick={() => handleShare('whatsapp', news)}
                  className="!bg-green-500 !text-white !p-1 hover:!bg-green-600"
                  size="small"
                >
                  <WhatsAppIcon style={{ fontSize: '18px' }} />
                </IconButton>
                <IconButton
                  onClick={() => handleShare('instagram', news)}
                  className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white !p-1 hover:!from-purple-600 hover:!to-pink-600"
                  size="small"
                >
                  <InstagramIcon style={{ fontSize: '18px' }} />
                </IconButton>
              </div>

              <Link href={`/latest-tech-news/${news.slug}`}>
                <div className="bg-white rounded-2xl p-4 pb-6 cursor-pointer h-full">
                  <img
                    src={news.image}
                    alt={news.heading}
                    loading="lazy"
                    className="rounded-xl w-full object-cover max-h-[220px]"
                  />
                  <h3 className="mt-4 text-lg font-bold text-gray-800">{news.heading}</h3>
                  <p className="text-sm text-gray-600 mt-1">{news.subtitle}</p>
                </div>
              </Link>
            </div>

            {/* Insert Ad Card After Every 3rd News */}
            {(index + 1) % 3 === 0 && (
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white p-4"
                initial={{ border: '4px solid teal' }}
                animate={{
                  border: ['4px solid #C338CF', '4px solid #CE39C3', '4px solid #EF35A1', '4px solid #8a2be2', '4px solid #C338CF'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                {/* Sponsored Badge in Left Corner */}
                <div className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-full shadow-md">
                  Sponsored
                </div>
                <a href="https://webitya.com/courses" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://res.cloudinary.com/dxqthnbx7/image/upload/v1745427100/whatsapp-image-2025-04-23-at-222040-7840184c-68091a7c365c5_ezeb3b.webp"
                    alt="Sponsored Ad"
                    className="rounded-xl w-full object-cover max-h-[220px]"
                  />
                  <h3 className="mt-4 text-lg font-bold text-gray-800">Sponsored: Skill Up Fast</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Learn AI, Digital Marketing, Web Dev & more at SkillMasterPro. Join 100K+ tech learners.
                  </p>
                </a>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Banner Ad */}
      <div className="mt-12">
        <SponsoredAds
          size="banner"
          content="👀 Hire top developers at RemoteHirePro!"
          link="https://www.webitya.com/"
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600 font-medium">
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

export default MainPage;
