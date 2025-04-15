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
    <section className="w-full py-20 bg-gradient-to-br from-[#e0f7fa] via-[#f0faff] to-[#e0f2fe]">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
        🕉️ Embark on a Sacred Journey – Char Dham Yatra
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {charDhamPackages.map((packageData, index) => (
          <CharDhamPackageCard key={index} packageData={packageData} />
        ))}
      </div>
    </section>
  );
};

const CharDhamPackageCard = ({ packageData }) => {
  const [index, setIndex] = useState(0);

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + packageData.images.length) % packageData.images.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % packageData.images.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 4000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image Carousel */}
      <div className="relative w-full h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={packageData.images[index]}
              alt={`Sacred View ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">
          <IconButton
            onClick={goToPrevious}
            className="!bg-white/80 text-black hover:bg-white"
            size="medium"
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10">
          <IconButton
            onClick={goToNext}
            className="!bg-white/80 text-black hover:bg-white"
            size="medium"
          >
            <ChevronRight />
          </IconButton>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {packageData.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                i === index ? "bg-white scale-125" : "bg-white/50"
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
        <p className="text-gray-600 mb-4 line-clamp-3">
          {packageData.description}
        </p>
        <Link href={packageData.link}>
          <button className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            🕉 Begin Your Divine Yatra →
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PackageCardHome;
