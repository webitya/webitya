'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  'SEO', 'Marketing', 'Social Media', 'AI', 'Branding', 'Ecommerce'
];

const HomeBusinessSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Elevate Your Business <span className="text-blue-500">in Seconds</span>
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        WEBITYA helps you boost your online presence with top-tier SEO, Social Media, and Digital Marketing solutions.
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {categories.map((category, index) => (
          <span key={index} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full">
            {category}
          </span>
        ))}
      </div>
      
      <div className="relative flex justify-center mt-10">
        <div className="relative w-64 h-40 md:w-80 md:h-52 transform rotate-[-5deg] border-3 border-white rounded-lg overflow-hidden">
          <Image src="/Images/img1.jpeg" alt="Business Growth" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute top-10 left-20 w-64 h-40 md:w-80 md:h-52 transform rotate-[5deg] border-3 border-white rounded-lg overflow-hidden">
          <Image src="/Images/img2.jpeg" alt="Marketing Strategies" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute top-5 right-20 w-64 h-40 md:w-80 md:h-52 transform rotate-[-15deg] border-3 border-white rounded-lg overflow-hidden">
          <Image src="/Images/img3.jpeg" alt="SEO Optimization" layout="fill" objectFit="cover" />
        </div>
      </div>
      
      <div className="md:mt-14 mt-24">
        <Link href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-800">
          Get Started with WEBITYA →
        </Link>
      </div>
    </section>
  );
};

export default HomeBusinessSection;
