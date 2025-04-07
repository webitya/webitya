"use client";

import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

const InfluencerCTA = () => {
  return (
    <section
      className="relative py-16 md:py-20 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      }}
    >
      {/* Gradient Blobs */}
      <div className="absolute -top-10 -left-10 w-52 h-52 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-2xl opacity-20 animate-ping" />

      {/* Social Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-6 left-6 text-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <InstagramIcon style={{ fontSize: 100, filter: "blur(1px)" }} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-6 text-white/10"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <YouTubeIcon style={{ fontSize: 100, filter: "blur(1px)" }} />
        </motion.div>
        <motion.div
          className="absolute bottom-6 left-1/2 text-white/10"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <LinkedInIcon style={{ fontSize: 90, filter: "blur(1px)" }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
        >
          Ready to Collaborate With Top Influencers?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-base text-white/90 mb-6"
        >
          Whether it's a product launch or a brand campaign, our curated list of influencers helps amplify your message. Start your journey today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Link
            href="https://wa.me/917323839108?text=I%20want%20to%20book%20Influencer%20"
            passHref
          >
            <button className="px-6 py-3 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white text-sm font-medium rounded-full shadow-md transition hover:scale-105">
              Book an Influencer
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InfluencerCTA;
