import LatestTechNewsData from '../../../components/LatestTechNews/Data/LatestTechNewsData';
import { notFound } from 'next/navigation';
import Footer from '@/components/FooterEl';

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

const NewsDetailPage = ({ params }) => {
  const news = LatestTechNewsData.find((item) => item.slug === params.slug);
  if (!news) return notFound();

  const moreNews = LatestTechNewsData
    .filter((item) => item.slug !== params.slug)
    .slice(0, 6);

  return (
    <>
      {/* Hero Banner */}
      <div className="w-full bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">{news.heading}</h1>
          <p className="text-base sm:text-lg text-gray-300">{news.subtitle}</p>
          <div className="mt-4 text-sm text-gray-400">By <span className="font-medium text-white">Editorial Team</span> · {news.date || "May 2025"}</div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-[16/9] overflow-hidden w-full max-w-5xl mx-auto mt-6 rounded-xl">
        <img
          src={news.image}
          alt={news.heading}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-12 text-gray-900">
        <div className="prose prose-lg sm:prose-xl max-w-none">
          {news.articleBody.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index}>{block.content}</p>;
            } else if (block.type === 'image') {
              return (
                <figure key={index} className="my-10">
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="rounded-xl shadow-md w-full object-cover"
                  />
                  <figcaption className="text-center text-sm text-gray-500 mt-2">{block.alt}</figcaption>
                </figure>
              );
            } else if (block.type === 'quote') {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-blue-600 pl-6 italic text-gray-700 bg-blue-50 py-4 px-6 rounded-md"
                >
                  “{block.content}”
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Section Divider */}
      <div className="border-t border-gray-200 my-16" />

      {/* More News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More in Tech News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {moreNews.map((item, index) => (
            <a
              href={`/latest-tech-news/${item.slug}`}
              key={index}
              className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Tech
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 mb-1">
                  {item.heading}
                </h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewsDetailPage;
