"use client";

import { motion } from "framer-motion";

const AboutUsCTA = () => {
  return (
    <section className="bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fc] to-[#eef1ff] py-20 px-6 md:px-16 text-center">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Build Your Online Presence with{" "}
          <span className="text-[#3587D7]">Webitya</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 mt-4 text-lg md:text-xl"
        >
          We craft responsive, modern websites and marketing strategies tailored
          to your brand to drive real business growth.
        </motion.p>

        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <a
            href="https://wa.me/917970409108?text=Hello%20Webitya"
            className="inline-block bg-[#3587D7] hover:bg-[#3587D7] text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
          >
            Get Started on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsCTA;
