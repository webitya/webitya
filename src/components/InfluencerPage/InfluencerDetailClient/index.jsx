"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowBack,
  Send,
  VideoLibrary,
  PhotoLibrary,
  MonetizationOn,
} from "@mui/icons-material";
import Footer from "@/components/FooterEl";

const InfluencerDetailClient = ({ influencer }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-white via-[#f9fafb] to-[#f3f4f6] px-4 md:px-16 py-6 md:py-12"
      >
        {/* Main Card */}
        <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/80 border border-gray-200/70 p-4 md:p-10 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
              <p><strong className="text-slate-900">Followers:</strong> {influencer.followers}</p>
              <p><strong className="text-slate-900">Age:</strong> {influencer.age}</p>
              <p><strong className="text-slate-900">Height:</strong> {influencer.height}</p>
              <p><strong className="text-slate-900">Starting Price:</strong> {influencer.startingPrice}</p>
            </div>

            <p className="text-slate-600 mt-6 mb-8 leading-relaxed text-[15.5px]">
              {influencer.description ||
                "This influencer is perfect for brand deals, content promotion, and more!"}
            </p>

            {/* Price Breakdown Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden text-sm mb-6">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 border-b border-gray-200">
                <MonetizationOn className="text-yellow-500" />
                <h3 className="font-semibold text-slate-800">Services & Pricing</h3>
              </div>
              <table className="w-full text-left">
                <tbody>
                  {Object.entries(influencer.workingFields || {}).map(
                    ([field, price]) => (
                      <tr key={field} className="border-t border-gray-100">
                        <td className="px-4 py-2 capitalize text-slate-700">
                          {field.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td className="px-4 py-2 text-slate-900 font-medium">{price}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

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

        {/* Demo Videos */}
        {influencer.demoVideos?.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <VideoLibrary className="text-red-500" />
              <h2 className="text-3xl font-bold text-slate-800">Demo Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {influencer.demoVideos.map((video, index) => {
                const videoRef = useRef(null);
                const [isPlaying, setIsPlaying] = useState(false);

                const handleVideoClick = () => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                      setIsPlaying(true);
                    } else {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                  }
                };

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative group overflow-hidden rounded-2xl shadow-xl w-full aspect-[9/16] bg-black"
                  >
                    <video
                      ref={videoRef}
                      src={video}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: "9 / 16" }}
                    />

                    {/* Play Button */}
                    {!isPlaying && (
                      <button
                        onClick={handleVideoClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 transition"
                      >
                        <div className="bg-white/90 p-4 rounded-full shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-6 h-6 text-red-500"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.79 5.093a.5.5 0 0 1 .71-.093l4 3a.5.5 0 0 1 0 .8l-4 3A.5.5 0 0 1 6 11.5v-6a.5.5 0 0 1 .79-.407z" />
                          </svg>
                        </div>
                      </button>
                    )}

                    {/* Pause Button */}
                    {isPlaying && (
                      <button
                        onClick={handleVideoClick}
                        className="absolute bottom-4 right-4 bg-white/80 text-slate-700 px-2 py-1 rounded-full text-xs shadow-md z-10"
                      >
                        Pause
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery */}
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

      <Footer />
    </>
  );
};

export default InfluencerDetailClient;
