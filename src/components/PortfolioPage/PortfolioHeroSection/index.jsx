"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const slides = [
  {
    mobilePreview: "/portfolio/bannerImage/7m.webp",
    desktopPreview: "/portfolio/bannerImage/1.webp",
  },
  {
    mobilePreview: "/portfolio/bannerImage/9m.webp",
    desktopPreview: "/portfolio/bannerImage/2.webp",
  },
  {
    mobilePreview: "/portfolio/bannerImage/5m.webp",
    desktopPreview: "/portfolio/bannerImage/3.webp",
  },
];

const PortfolioHeroSection = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const current = slides[index];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mt-13 w-full md:h-[55vh] h-[220px] flex items-center justify-center overflow-hidden transition-all duration-100 ease-in-out"
    >
      {/* Arrow Buttons */}
      <IconButton
        onClick={goToPrevious}
        className="!absolute left-4 top-1/2 !text-white -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md transition-all"
        size="large"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={goToNext}
        className="!absolute right-4 top-1/2 !text-white -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md transition-all"
        size="large"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      {/* Slide Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Mobile image */}
          <img
            src={current.mobilePreview}
            alt={`Mobile Banner ${index + 1}`}
            className="w-full h-full object-cover md:hidden"
          />
          {/* Desktop image */}
          <img
            src={current.desktopPreview}
            alt={`Desktop Banner ${index + 1}`}
            className="w-full h-full object-cover hidden md:block"
          />
        </motion.div>
      </AnimatePresence>

      {/* Preview Thumbnails */}
      <div className="absolute bottom-6 flex gap-4 z-10">
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="cursor-pointer"
          >
            {/* Mobile Preview */}
            <img
              src={slide.mobilePreview}
              alt={`Mobile Preview ${i + 1}`}
              className={`w-12 h-8 object-cover rounded-md md:hidden transition-transform duration-300 hover:scale-105 ${
                i === index ? "ring-2 ring-white" : "opacity-60"
              }`}
            />
            {/* Desktop Preview */}
            <img
              src={slide.desktopPreview}
              alt={`Desktop Preview ${i + 1}`}
              className={`w-12 h-8 object-cover rounded-md hidden md:block transition-transform duration-300 hover:scale-105 ${
                i === index ? "ring-2 ring-white" : "opacity-60"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioHeroSection;
