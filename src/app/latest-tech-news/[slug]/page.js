import LatestTechNewsData from '../../../components/LatestTechNews/Data/LatestTechNewsData';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Footer from '@/components/FooterEl';

// ✅ SEO metadata generator
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

// ✅ Page component
const NewsDetailPage = ({ params }) => {
  const news = LatestTechNewsData.find((item) => item.slug === params.slug);

  if (!news) return notFound();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* News Header */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">{news.heading}</h1>
        <p className="text-lg text-gray-600 mb-6">{news.subtitle}</p>

        {/* Header Image */}
        <Image
          src={news.image}
          alt={news.heading}
          width={1000}
          height={500}
          className="rounded-xl w-full object-cover mb-8"
        />

        {/* Article Body */}
        <div className="space-y-6 text-gray-800 leading-relaxed">
          {news.articleBody.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index}>{block.content}</p>;
            } else if (block.type === 'image') {
              return (
                <div key={index} className="mb-8">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1000}
                    height={500}
                    className="rounded-xl w-full object-cover"
                  />
                </div>
              );
            } else if (block.type === 'quote') {
              return (
                <blockquote key={index} className="text-xl italic border-l-4 pl-4 border-gray-300 mt-4 mb-6">
                  <p>{block.content}</p>
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default NewsDetailPage;