"use client";

import { motion } from "framer-motion";

const AboutUsCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-16 text-center bg-[#f9fafb]">
      {/* Minimal Background Blobs (Optional – subtle effect) */}
      <motion.div className="absolute top-[-4rem] left-[-4rem] w-64 h-64 bg-[#e5e7eb] rounded-full blur-3xl opacity-10" />
      <motion.div className="absolute bottom-[-4rem] right-[-4rem] w-64 h-64 bg-[#cbd5e1] rounded-full blur-3xl opacity-10" />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-semibold text-gray-800"
      >
        Build Your Online Presence with <span className="text-gray-900">Webitya</span>
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto"
      >
        We craft responsive, user-friendly websites that reflect your brand and drive results.
      </motion.p>

      {/* CTA Button */}
      <div className="mt-8">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          href="https://wa.me/919693245941?text=Hello%20Webitya"
          className="bg-gray-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Get Started
        </motion.a>
      </div>
    </section>
  );
};

export default AboutUsCTA;
