"use client";

import Link from "next/link";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CourseCTA = () => {
  return (
    <section className="w-full">
      <div className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 md:p-12 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-4">
          <SchoolIcon fontSize="medium" />
          Ready to Level Up Your Skills?
        </h2>

        {/* Description */}
        <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-8">
          Our offline + recorded courses are designed to make you job-ready with hands-on mentorship. Start today!
        </p>

        {/* CTA Button */}
        <Link href="https://wa.me/917970409108?text=Hi%20I'm%20interested%20in%20your%20courses!">
          <button className="flex items-center gap-2 mx-auto bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold px-6 py-3 rounded-full text-sm transition">
            Enroll Now
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CourseCTA;
