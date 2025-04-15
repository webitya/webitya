"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const slides = [
  {
    mobilePreview: "/courses/8m.webp",
    desktopPreview: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744689242/Copy_of_Copy_of_our_projects_osdsrk.webp",
  },
  {
    mobilePreview: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744688817/4_ghm8fe.webp",
    desktopPreview: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744688817/4_ghm8fe.webp",
  },
  {
    mobilePreview: "/courses/6m.webp",
    desktopPreview: "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744688816/3_yzwvhg.webp",
  },
];

const CharDhamCarousel = () => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setIndex(([prev]) => [(prev + 1) % slides.length, 1]);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  const paginate = (newDirection) => {
    setIndex(([prev]) => {
      const nextIndex = (prev + newDirection + slides.length) % slides.length;
      return [nextIndex, newDirection];
    });
  };

  const current = slides[index];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[220px] md:h-[60vh] flex items-center justify-center 
      bg-gradient-to-br from-[#f7c76d] to-[#fff2d5] overflow-hidden shadow-md"
    >
      <IconButton
        onClick={() => paginate(-1)}
        className="!absolute left-4 top-1/2 -translate-y-1/2 z-10 !bg-[#7b3e19]/70 hover:bg-[#7b3e19] !text-white"
        size="large"
      >
        <ChevronLeft fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={() => paginate(1)}
        className="!absolute right-4 top-1/2 -translate-y-1/2 z-10 !bg-[#7b3e19]/70 hover:bg-[#7b3e19] !text-white"
        size="large"
      >
        <ChevronRight fontSize="medium" />
      </IconButton>

      {/* Slide Image with slide transition */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute w-full h-full flex items-center justify-center"
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
          <button key={i} onClick={() => setIndex([i, i > index ? 1 : -1])} className="focus:outline-none">
            <img
              src={slide.desktopPreview}
              alt={`Preview ${i}`}
              className={`w-12 h-8 object-cover rounded-md transition-all duration-300 border-2 ${
                i === index
                  ? "border-[#ffffff] scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              } hidden md:block`}
            />
            <img
              src={slide.mobilePreview}
              alt={`Preview ${i}`}
              className={`w-10 h-6 object-cover rounded-md transition-all duration-300 border-2 ${
                i === index
                  ? "border-[#e0b94a] scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              } md:hidden`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default CharDhamCarousel;
