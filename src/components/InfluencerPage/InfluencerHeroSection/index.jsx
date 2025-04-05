"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const InfluencerHeroSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-purple-100 via-rose-100 to-indigo-100 overflow-hidden px-6 md:px-20 py-20">
      {/* Blurry background blobs */}
      <motion.div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-[-80px] left-[-100px] animate-blob" />
      <motion.div className="absolute w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-[-100px] right-[-100px] animate-blob animation-delay-2000" />

      {/* Left Content */}
      <div className="text-center md:text-left max-w-xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-800"
        >
          Boost Your Brand with&nbsp;
          <span className="bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
            Influencer Power
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-slate-700 font-medium"
        >
          Find and book top influencers to promote your product and reach your target audience with authenticity.
        </motion.p>

        <motion.a
          href="#collection"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-10 px-8 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Browse Influencers
        </motion.a>
      </div>

      {/* Right Image - Founder */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="z-10 mb-12 md:mb-0"
      >
        <div className="relative w-[280px] h-[320px] md:w-[320px] md:h-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/founder.jpg" // ⬅️ Replace with actual image path (e.g. public/founder.jpg)
            alt="Founder of Webitya"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <p className="text-center mt-4 text-lg font-semibold text-slate-800">
          Aditya Kumar <br />
          <span className="text-sm text-slate-600">Founder & Visionary</span>
        </p>
      </motion.div>
    </section>
  );
};

export default InfluencerHeroSection;
