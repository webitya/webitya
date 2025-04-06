"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const InfluencerCTA = () => {
  return (
    <section
      id="cta"
      className="relative py-20 bg-gradient-to-br from-[#1e3a8a] via-[#3730a3] to-[#111827] text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/cta-bg.svg')] opacity-10 bg-cover bg-center pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
        >
          Ready to Collaborate With Top Influencers?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Whether it's a product launch or a brand campaign, our curated list of influencers can help you amplify your message. Get in touch and start your influencer journey today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="https://wa.me/917323839108?text=I%20want%20to%20book%20Influencer%20" passHref>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-lg font-semibold rounded-2xl shadow-2xl transition duration-300 hover:scale-105">
              Book an Influencer
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InfluencerCTA;
