"use client";

import { motion } from "framer-motion";

const InfluencerVision = () => {
  return (
    <section
      id="vision"
      className="relative bg-white py-24 px-6 md:px-20 text-center overflow-hidden"
    >
      {/* Decorative gradient circle */}
      <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6"
      >
        Why Influencer Marketing?
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium"
      >
        In today’s digital age, people trust people—not ads. Influencer marketing lets your brand connect with real audiences through the voices they already follow and admire.
      </motion.p>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Authentic Reach",
            description:
              "Tap into audiences that influencers have built through trust and relatable content.",
            color: "from-pink-400 to-pink-600",
          },
          {
            title: "Boost Engagement",
            description:
              "Get higher likes, shares, and comments with content that feels natural—not forced.",
            color: "from-indigo-400 to-indigo-600",
          },
          {
            title: "Faster Conversions",
            description:
              "Influencers drive action. From brand awareness to sales, they accelerate results.",
            color: "from-purple-400 to-purple-600",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            className={`bg-gradient-to-br ${item.color} text-white p-8 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300`}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm md:text-base font-medium opacity-90">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InfluencerVision;
