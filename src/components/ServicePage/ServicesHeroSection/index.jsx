"use client";

import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Link from "next/link";

const ServicesHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-10 md:px-12 lg:px-24 shadow-sm border border-gray-100 min-h-[80vh] flex items-center">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 opacity-5 text-blue-100 text-[120px] hidden md:block pointer-events-none">
        <DesignServicesIcon fontSize="inherit" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full">
        {/* Text Content */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            Smart. Sleek. Scalable.
            <br />
            <span className="text-[#0284c7]">Digital Services for Growth.</span>
          </h1>
          <p className="text-gray-600 text-base mb-6 max-w-md">
            We blend creativity and strategy to build websites, campaigns, and brands that convert.
            From startups to scale-ups — we’ve got you covered.
          </p>

          <Link href="#services">
  <Button
    variant="contained"
    size="medium"
    endIcon={<ArrowForwardIcon />}
    sx={{
      borderRadius: "999px",
      textTransform: "none",
      fontWeight: 600,
      px: 3,
      py: 1,
      backgroundColor: "#0284c7",
      "&:hover": {
        backgroundColor: "#0369a1",
      },
    }}
  >
    Explore Services
  </Button>
</Link>

        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center">
          <img
            src="/services/servicesHero.svg"
            alt="Digital Services"
            className="w-2/3 max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesHeroSection;
