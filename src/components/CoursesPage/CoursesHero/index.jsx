"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const slides = [
  {
    mobilePreview: "/courses/8m.webp",
    desktopPreview: "/courses/1.webp",
  },
  {
    mobilePreview: "/courses/7m.webp",
    desktopPreview: "/courses/2.webp",
  },
  {
    mobilePreview: "/courses/6m.webp",
    desktopPreview: "/courses/4.webp",
  },
];

const CoursesCarousel = () => {
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

  const goToPrevious = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setIndex((prev) => (prev + 1) % slides.length);

  const current = slides[index];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[220px] md:h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] overflow-hidden  shadow-md"
    >
      {/* Arrows */}
      <IconButton
        onClick={goToPrevious}
        className="!absolute left-4 top-1/2 !text-white  -translate-y-1/2 z-10 !bg-white/50 hover:bg-white shadow-md"
        size="large"
      >
        <ChevronLeft fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={goToNext}
        className="!absolute right-4 top-1/2 !text-white -translate-y-1/2 z-10 !bg-white/50 hover:bg-white shadow-md"
        size="large"
      >
        <ChevronRight fontSize="medium" />
      </IconButton>

      {/* Slide Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0.3, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={current.mobilePreview}
            alt={`Mobile Slide ${index}`}
            className="w-full h-full object-cover md:hidden"
          />
          <img
            src={current.desktopPreview}
            alt={`Desktop Slide ${index}`}
            className="w-full h-full object-cover hidden md:block"
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="absolute bottom-4 flex gap-3 z-10 px-2">
        {slides.map((slide, i) => (
          <button key={i} onClick={() => setIndex(i)} className="focus:outline-none">
            <img
              src={slide.desktopPreview}
              alt={`Preview ${i}`}
              className={`w-12 h-8 object-cover rounded-md transition-all duration-300 border-2 ${
                i === index ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"
              } hidden md:block`}
            />
            <img
              src={slide.mobilePreview}
              alt={`Preview ${i}`}
              className={`w-10 h-6 object-cover rounded-md transition-all duration-300 border-2 ${
                i === index ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"
              } md:hidden`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default CoursesCarousel;
