"use client";

import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Link from "next/link";
import "./ServicesHeroSection.css"; // Import animation styles

const ServicesHeroSection = () => {
  return (
    <section className="relative overflow-hidden animated-gradient px-6 py-6 md:py-20 md:px-16 lg:px-28 shadow-sm min-h-[85vh] flex items-center">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 opacity-5 text-[#3f51b5] text-[200px] hidden md:block pointer-events-none z-0 slow-spin">
        <DesignServicesIcon fontSize="inherit" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 w-full">
        {/* Left Content */}
        <div className="text-center lg:text-left fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Design the Future. Code the Dream.
            <br />
            <span className="bg-gradient-to-r from-[#3f51b5] via-[#2196f3] to-[#00bcd4] bg-clip-text text-transparent font-extrabold">
              Let’s Build What’s Next.
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Transform your brand into a powerful digital experience. From innovative websites to data-driven marketing, we help future-ready businesses rise above the noise.
          </p>

          <Link href="#services">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              className="rounded-full normal-case font-semibold px-6 py-3 text-base bg-[#3f51b5] hover:bg-[#303f9f] shadow-md"
            >
              Explore Our Services
            </Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end fade-in">
          <img
            src="/services/servicesHero.svg"
            alt="Digital Services Illustration"
            className="w-[80%] max-w-sm drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesHeroSection;
