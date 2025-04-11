"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowBack, Send, VideoLibrary, PhotoLibrary } from "@mui/icons-material";
import Footer from "@/components/FooterEl";

const InfluencerDetailClient = ({ influencer }) => {
  return (
   <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-white via-[#f9fafb] to-[#f3f4f6] px-2 py-4 md:px-16 md:py-10"
    >
      {/* Main Card */}
      <div className="mx-auto backdrop-blur-lg bg-white/80 border border-gray-200/70 md:p-8 p-2 rounded-xl md:rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="relative w-full h-96 overflow-hidden rounded-2xl group shadow-md">
          <Image
            src={influencer.image}
            alt={influencer.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-5xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
            {influencer.name}
          </h1>
          <span className="inline-block bg-gradient-to-r from-pink-100 to-red-100 text-pink-600 font-semibold px-4 py-1 rounded-full text-sm mb-5">
            {influencer.category}
          </span>

          <div className="space-y-2 text-slate-700 text-base">
            <p>
              <strong className="text-slate-900">Followers:</strong>{" "}
              {influencer.followers}
            </p>
            <p>
              <strong className="text-slate-900">Age:</strong> {influencer.age}
            </p>
            <p>
              <strong className="text-slate-900">Height:</strong>{" "}
              {influencer.height}
            </p>
          </div>

          <p className="text-slate-600 mt-6 mb-8 leading-relaxed text-[15.5px]">
            {influencer.description ||
              "This influencer is perfect for brand deals, content promotion, and more!"}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={influencer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-300 text-sm font-medium"
            >
              <Send fontSize="small" /> Book Now
            </a>

            <Link
              href="/influencers"
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              <ArrowBack fontSize="small" /> Back to List
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Videos Section */}
      {influencer.demoVideos?.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <VideoLibrary className="text-red-500" />
            <h2 className="text-3xl font-bold text-slate-800">Demo Videos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {influencer.demoVideos.map((video, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-2xl shadow-md bg-white"
              >
                <video
                  src={video}
                  controls
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {influencer.gallery?.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <PhotoLibrary className="text-pink-500" />
            <h2 className="text-3xl font-bold text-slate-800">Gallery</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {influencer.gallery.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm group"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
    <Footer/>
   </>
  );
};

export default InfluencerDetailClient;
