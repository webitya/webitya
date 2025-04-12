"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowBack,
  Send,
  PhotoLibrary,
  MonetizationOn,
  Download,
} from "@mui/icons-material";
import Footer from "@/components/FooterEl";
import InfluencerVideosSection from "../InfluencerVideosSection"; // 👈 NEW

const InfluencerDetailClient = ({ influencer }) => {
  useEffect(() => {
    return () => {
      document.querySelectorAll("video").forEach((video) => video.pause());
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-white via-[#f9fafb] to-[#f3f4f6]"
      >
        {/* Main Card */}
        <div className="mx-auto backdrop-blur-lg bg-white/80 border border-gray-200/70 p-4 md:p-10  shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 py-5 pb-12 items-center">
          {/* Image Section */}
          <div className="relative w-full md:min-h-96 min-h-80  overflow-hidden rounded-2xl group shadow-md">
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
            <h1 className="md:text-4xl text-4xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
              {influencer.name}
            </h1>

            <span className="inline-block bg-gradient-to-r from-pink-100 to-red-100 text-pink-600 font-semibold px-4 py-1 rounded-full text-sm mb-5">
              {influencer.category}
            </span>

            <div className="space-y-1.5 text-sm text-slate-700 leading-relaxed">
              <p>
                <span className="font-semibold text-slate-900">Followers:</span>{" "}
                {influencer.followers}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Age:</span>{" "}
                {influencer.age}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Height:</span>{" "}
                {influencer.height}
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  Starting Price:
                </span>{" "}
                {influencer.startingPrice}
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  location:
                </span>{" "}
                {influencer.location}
              </p>
            </div>

            <p className="text-slate-600 mt-3 mb-3 leading-relaxed text-[15.5px]">
              {influencer.description ||
                "This influencer is perfect for brand deals, content promotion, and more!"}
            </p>

            {/* Price Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden text-sm mb-6">
              <div className="flex items-center justify-between gap-2 bg-gray-100 px-4 py-2 border-b border-gray-200">
                <span className="flex items-center gap-2 bg-gray-100 border-gray-200">
                  <MonetizationOn className="text-yellow-500" />
                  <h3 className="font-semibold text-slate-800">
                    Services & Pricing
                  </h3>
                </span>

                {/* Powered by Webitya - Positioned at bottom right */}
                <div className=" flex items-center justify-end gap-2 text-xs text-slate-500">
                  <span>Powered by</span>
                  <Link href="/">
                    <Image
                      src="/brand/logo1.png"
                      alt="Webitya Logo"
                      width={70}
                      height={20}
                      className="object-contain cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
              <table className="w-full text-left">
                <tbody>
                  {Object.entries(influencer.workingFields || {}).map(
                    ([field, price]) => (
                      <tr key={field} className="border-t border-gray-100">
                        <td className="px-4 py-2 capitalize text-slate-700">
                          {field.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td className="px-4 py-2 text-slate-900 font-medium">
                          {price}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
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
                href="/influencers#collection"
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition"
              >
                <ArrowBack fontSize="small" /> Back to List
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Custom Video Player Section */}
        {influencer.demoVideos?.length > 0 && (
          <InfluencerVideosSection videos={influencer.demoVideos} />
        )}

        {/* Gallery */}
        {influencer.gallery?.length > 0 && (
          <div className="my-10">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <PhotoLibrary className="text-pink-500" />
              <h2 className="text-3xl font-bold text-slate-800">Gallery</h2>
            </div>
            <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {influencer.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm group"
                >
                  {/* Image */}
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                  {/* Branding + Download icon */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>Powered by</span>
                      <Link href="/">
                        <Image
                          src="/brand/logo1.png"
                          alt="Webitya Logo"
                          width={70}
                          height={20}
                          className="object-contain cursor-pointer"
                        />
                      </Link>
                    </div>
                    <a
                      href={img}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-pink-500 transition"
                    >
                      <Download fontSize="small" />
                    </a>
                  </div>
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
