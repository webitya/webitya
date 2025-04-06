"use client";

import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const ServicesHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 md:py-16 py-6 md:px-12 lg:px-24  shadow-sm border border-gray-100">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 opacity-10 text-blue-100 text-[160px] hidden md:block pointer-events-none">
        <DesignServicesIcon fontSize="inherit" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Our Premium <span className="text-[#0284c7]">Digital Services</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            We offer results-driven SEO, branding, marketing, and web solutions to boost your online visibility and convert clicks into customers.
          </p>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1.3,
              backgroundColor: "#0284c7", // cyan-600
              "&:hover": {
                backgroundColor: "#0369a1", // cyan-700
              },
            }}
          >
            Explore Services
          </Button>
        </div>

        {/* Image / Illustration */}
        <div className="w-full h-auto">
          <img
            src="/services/servicesHero.svg"
            alt="Digital services"
            className="w-full h-auto max-w-md mx-auto lg:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesHeroSection;
