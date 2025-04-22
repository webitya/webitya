import React from 'react';
import Head from 'next/head';
import MainPage from '../../components/LatestTechNews/MainPage'; // Import the client-side component
import LatestTechNewsData from '../../components/LatestTechNews/Data/LatestTechNewsData'; // Static data

// ✅ SEO metadata generator
export async function generateMetadata({ params }) {
  // Find the news article based on the slug
  const news = LatestTechNewsData.find((item) => item.slug === params.slug);
  
  // Default SEO metadata
  const defaultMetadata = {
    title: 'Latest Tech News | Stay Updated with Technology',
    description: 'Get the latest updates and trends in the world of technology. Read articles about the newest gadgets, software, and tech breakthroughs.',
    keywords: 'latest tech news, technology updates, tech trends, gadget news, software news',
    openGraph: {
      title: 'Latest Tech News | Stay Updated with Technology',
      description: 'Get the latest updates and trends in the world of technology. Read articles about the newest gadgets, software, and tech breakthroughs.',
      images: [
        {
          url: '/path-to-your-image.jpg', // Default image URL
          width: 800,
          height: 600,
          alt: 'Latest Tech News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Latest Tech News | Stay Updated with Technology',
      description: 'Get the latest updates and trends in the world of technology.',
      images: ['/path-to-your-image.jpg'], // Default image URL
    },
  };

  // If no news article is found, return default metadata
  if (!news) {
    return defaultMetadata;
  }

  // Generate SEO metadata based on the article data if available
  return {
    title: news.seo.title || news.heading,
    description: news.seo.description || news.subtitle,
    keywords: news.seo.keywords.join(', '),
    openGraph: {
      title: news.seo.title || news.heading,
      description: news.seo.description || news.subtitle,
      images: [
        {
          url: news.image,
          width: 800,
          height: 600,
          alt: news.heading,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.seo.title || news.heading,
      description: news.seo.description || news.subtitle,
      images: [news.image],
    },
  };
}

// ✅ Page component
const LatestTechNewsPage = () => {
  // Fetch the static data (or dynamic data from API)
  const newsData = LatestTechNewsData;

  return (
    <div>
      {/* SEO metadata */}
      <Head>
        <title>Latest Tech News | Stay Updated with Technology</title>
        <meta name="description" content="Get the latest updates and trends in the world of technology. Read articles about the newest gadgets, software, and tech breakthroughs." />
        <meta name="keywords" content="latest tech news, technology updates, tech trends, gadget news, software news" />
        <meta property="og:title" content="Latest Tech News | Stay Updated with Technology" />
        <meta property="og:description" content="Get the latest updates and trends in the world of technology. Read articles about the newest gadgets, software, and tech breakthroughs." />
        <meta property="og:url" content="https://yourdomain.com/latest-tech-news" />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Tech News | Stay Updated with Technology" />
        <meta name="twitter:description" content="Get the latest updates and trends in the world of technology." />
        <meta name="twitter:image" content="/path-to-your-image.jpg" />
      </Head>

      {/* Main Content */}
      <MainPage newsData={newsData} />
    </div>
  );
};

export default LatestTechNewsPage;
