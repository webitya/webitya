"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PortfolioCTA = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-purple-100 py-20 px-6 md:px-24 text-center relative overflow-hidden">
      {/* Decorative blurred circles for depth */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-blue-300 rounded-full opacity-30 blur-3xl z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-purple-300 rounded-full opacity-30 blur-3xl z-0 animate-pulse-slow"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Take Your Brand to the Next Level?
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Let’s work together to build a high-performing website and marketing
          strategy tailored to your business goals.
        </p>
        <Link href="/contact-us" passHref>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            size="large"
            className="!rounded-full !px-8 !py-3 !text-base !font-semibold hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PortfolioCTA;
