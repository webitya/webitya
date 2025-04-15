"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import charDhamPackages from "../PackageCardHomeData/packagecardhomedata";

const PackageCardHome = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#e0f7fa] via-[#f0faff] to-[#e0f2fe]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center text-gray-800 mb-16 tracking-tight"
      >
        🕉️ Embark on a Sacred Journey –{" "}
        <span className="text-indigo-600">Char Dham Yatra</span>
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {charDhamPackages.map((packageData, index) => (
          <CharDhamPackageCard key={index} packageData={packageData} />
        ))}
      </div>
    </section>
  );
};

const CharDhamPackageCard = ({ packageData }) => {
  const [[index, direction], setIndex] = useState([0, 0]);

  const goToPrevious = () => {
    setIndex(([prevIndex]) => [
      (prevIndex - 1 + packageData.images.length) % packageData.images.length,
      -1,
    ]);
  };

  const goToNext = () => {
    setIndex(([prevIndex]) => [
      (prevIndex + 1) % packageData.images.length,
      1,
    ]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/30 relative"
    >
      {/* Discount Label */}
      {packageData.discountLabel && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="absolute top-4 left-4 bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg z-20 animate-pulse"
        >
          {packageData.discountLabel}
        </motion.div>
      )}

      {/* Image Carousel */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={packageData.images[index]}
              alt={`Sacred View ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <IconButton
            onClick={goToPrevious}
            className="!bg-white/80 text-black hover:bg-white"
            size="small"
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <IconButton
            onClick={goToNext}
            className="!bg-white/80 text-black hover:bg-white"
            size="small"
          >
            <ChevronRight />
          </IconButton>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {packageData.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                i === index ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Package Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          🕉 {packageData.title}
        </h3>
        <p className="text-gray-700 mb-3 line-clamp-3 leading-relaxed">
          {packageData.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-bold text-indigo-700">
            ₹{packageData.discountedPrice.toLocaleString()}
          </span>
          <span className="text-sm line-through text-gray-500">
            ₹{packageData.price.toLocaleString()}
          </span>
        </div>

        <Link href={`${packageData.slug}`}>
  <button className="inline-block px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow hover:shadow-md hover:brightness-105 transition-all duration-300">
    🛕 Begin Your Divine Yatra →
  </button>
</Link>
      </div>
    </motion.div>
  );
};

export default PackageCardHome;
