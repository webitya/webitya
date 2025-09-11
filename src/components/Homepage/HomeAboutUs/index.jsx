'use client';

import Image from 'next/image';
import Link from 'next/link';

const HomeAboutUs = () => {
  return (
    <section className="py-10 px-6 md:px-12 lg:px-20 mx-auto text-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Image */}
        <div className="relative w-full h-96">
          <div className="absolute inset-0 opacity-40 rounded-lg"></div>
          <Image 
            src="/Images/img1.jpeg" 
            alt="About Us" 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg shadow-xl border-4"
          />
        </div>

        {/* Right Side: Content */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Who <span className="text-blue-500">We Are</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            At <span className="font-semibold text-blue-600">WEBITYA</span>, we are passionate about crafting digital experiences that elevate businesses. 
            Our expertise lies in SEO, social media marketing, and web design, helping brands thrive in the online world.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md w-40">
              <h3 className="text-xl font-semibold text-blue-600">10+</h3>
              <p className="text-gray-700 dark:text-gray-400">Years of Experience</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md w-40">
              <h3 className="text-xl font-semibold text-blue-600">500+</h3>
              <p className="text-gray-700 dark:text-gray-400">Happy Clients</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md w-40">
              <h3 className="text-xl font-semibold text-blue-600">100%</h3>
              <p className="text-gray-700 dark:text-gray-400">Certified Clients</p>
            </div>
          </div>

          {/* Learn More Button with Link */}
          <Link href="/about">
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800">
              Learn More →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUs;
