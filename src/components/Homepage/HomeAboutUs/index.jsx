"use client";

import Image from "next/image";
import Link from "next/link";

const HomeAboutUs = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 mx-auto text-center bg-[#f8fafc]">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Image */}
        <div className="relative w-full h-96">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          <Image
            src="/Images/img1.jpeg"
            alt="About Us"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-lg border border-[#e2e8f0]"
          />
        </div>

        {/* Right Side: Content */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-[#1e293b] leading-snug">
            Who <span className="text-[#2563eb]">We Are</span>
          </h2>

          <p className="text-[#475569] mt-5 leading-relaxed text-lg">
            At{" "}
            <span className="font-semibold text-[#1d4ed8]">WEBITYA</span>, we
            specialize in creating smart digital experiences that help
            businesses grow with confidence. Our team blends{" "}
            <span className="font-medium text-[#0f172a]">
              strategy, creativity, and data
            </span>{" "}
            to deliver impactful results in SEO, marketing, and design.
          </p>

          {/* Stats Section — 4 in a row on desktop, 2 in a row on mobile */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center flex flex-col justify-center hover:shadow-md transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#1d4ed8]">10+</h3>
              <p className="text-[#334155] text-sm font-medium mt-1">
                Years of Experience
              </p>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center flex flex-col justify-center hover:shadow-md transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#1d4ed8]">500+</h3>
              <p className="text-[#334155] text-sm font-medium mt-1">
                Happy Clients
              </p>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center flex flex-col justify-center hover:shadow-md transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#1d4ed8]">100%</h3>
              <p className="text-[#334155] text-sm font-medium mt-1">
                Certified Results
              </p>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center flex flex-col justify-center hover:shadow-md transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#1d4ed8]">24/7</h3>
              <p className="text-[#334155] text-sm font-medium mt-1">
                Support Availability
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <Link href="/about">
            <button
              className="mt-8 bg-[#1d4ed8] text-white px-8 py-3 rounded-lg text-lg font-semibold 
              shadow-md transition-all duration-300 cursor-pointer
              hover:bg-[#1e40af] hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Learn More →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUs;
