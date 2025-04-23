import LatestTechNewsData from '../../../components/LatestTechNews/Data/LatestTechNewsData';
import { notFound } from 'next/navigation';
import Footer from '@/components/FooterEl';

// ✅ SEO metadata generator (server-side)
export async function generateMetadata({ params }) {
  const news = LatestTechNewsData.find((item) => item.slug === params.slug);
  if (!news) {
    return {
      title: 'News Not Found',
      description: 'The news article you are looking for does not exist.',
    };
  }
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

// ✅ Page component (server-side rendering)
const NewsDetailPage = ({ params }) => {
  const news = LatestTechNewsData.find((item) => item.slug === params.slug);
  if (!news) return notFound();

  const moreNews = LatestTechNewsData
    .filter((item) => item.slug !== params.slug)
    .slice(0, 6);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* News Header */}
        <h1 className="text-3xl font-semibold text-blue-800 mb-4">{news.heading}</h1>
        <p className="text-sm text-gray-600 mb-4">{news.subtitle}</p>

        {/* Header Image */}
        <img
          src={news.image}
          alt={news.heading}
          className="rounded-lg w-full object-cover mb-6"
          width={1000}
          height={500}
        />

        {/* Article Body */}
        <div className="space-y-4 text-gray-800 leading-relaxed">
          {news.articleBody.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index} className="text-sm">{block.content}</p>;
            } else if (block.type === 'image') {
              return (
                <div key={index} className="mb-6">
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="rounded-md w-full object-cover"
                    width={1000}
                    height={500}
                  />
                </div>
              );
            } else if (block.type === 'quote') {
              return (
                <blockquote key={index} className="text-sm italic border-l-4 pl-4 border-blue-600 mt-4 mb-4">
                  <p>{block.content}</p>
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* More Latest News Section */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-medium text-blue-700 mb-4">More Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {moreNews.map((item, index) => (
            <a href={`/latest-tech-news/${item.slug}`} key={index} className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4">
              <img
                src={item.image}
                alt={item.heading}
                className="rounded-md w-full object-cover mb-3"
                width={400}
                height={250}
              />
              <h3 className="text-md font-semibold text-gray-800 mb-1">{item.heading}</h3>
              <p className="text-xs text-gray-600">{item.subtitle}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default NewsDetailPage;
