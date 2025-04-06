"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const slides = [
  {
    title: "Hi, I'm Aditya Kumar",
    subtitle: "React Developer & Digital Marketing Specialist",
    buttonText: "Explore My Work",
    buttonLink: "#projects",
    bg: "from-[#e0f2fe] to-[#c7d2fe]",
  },
  {
    title: "Crafting Beautiful UIs",
    subtitle: "I design responsive, high-performing web interfaces.",
    buttonText: "See My UI Projects",
    buttonLink: "#design",
    bg: "from-[#fdf2f8] to-[#e0e7ff]",
  },
  {
    title: "Boost Your Business Online",
    subtitle: "SEO, Social Media, and Performance Marketing that works.",
    buttonText: "Let’s Talk",
    buttonLink: "#contact",
    bg: "from-[#fefce8] to-[#d1fae5]",
  },
];

const PortfolioHeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className={`w-full md:h-[40vh] h-[40vh] flex items-center justify-center bg-gradient-to-br ${current.bg} transition-all duration-1000 ease-in-out`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-3xl"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 md:mb-4 mb-1">
            {current.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 md:mb-8 mb-2">
            {current.subtitle}
          </p>
          <Link href={current.buttonLink}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: "999px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#0284c7",
                "&:hover": {
                  backgroundColor: "#0369a1",
                },
              }}
            >
              {current.buttonText}
            </Button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default PortfolioHeroSection;
