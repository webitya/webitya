"use client";

import Footer from "@/components/FooterEl";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
   <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-xl w-full text-center shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 mb-4"
        >
          Website Under Maintenance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-6"
        >
          We're currently working on some improvements. Thank you for your patience!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            For any queries, feel free to contact us:
          </p>
          <a
            href="tel:+919693245941"
            className="text-lg font-medium text-white underline hover:text-blue-400 transition"
          >
            +91 9693245941
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition backdrop-blur-md"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
     
    </div>
    <Footer/>
   </>
  );
}
