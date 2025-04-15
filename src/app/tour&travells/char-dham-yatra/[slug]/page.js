"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import DiscountIcon from "@mui/icons-material/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ArticleIcon from "@mui/icons-material/Article";
import charDhamPackagesDyData from "../../../../components/CharDhamYatra/CharDhamDyPackageData/chardhamdypackagedata";
import { notFound } from "next/navigation";
import Footer from "@/components/FooterEl";

const CharDhamPackagePage = ({ params }) => {
  const { slug } = params;
  const packageData = charDhamPackagesDyData.find((pkg) => pkg.slug === slug);
  const [current, setCurrent] = useState(0);

  if (!packageData) return notFound();

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % packageData.images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + packageData.images.length) % packageData.images.length);
  };

  return (
    <>
      <div className="min-h-screen px-4 py-10 bg-[#F9F6F1] font-[Inter]">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#5C5470] hover:text-[#443d55] transition text-sm font-medium"
          >
            <ArrowBackIosNewIcon fontSize="small" />
            <span>Back</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#5C5470] mb-10 text-center flex items-center justify-center gap-2">
          <ArticleIcon className="text-[#D4A373]" />
          {packageData.title}
        </h1>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-14">
          {/* Image Carousel */}
          <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={packageData.images[current]}
                src={packageData.images[current]}
                alt={`Image ${current + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="absolute w-full h-full object-cover rounded-2xl"
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#5C5470]/60 text-white rounded-full p-2 hover:bg-[#5C5470]/80"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#5C5470]/60 text-white rounded-full p-2 hover:bg-[#5C5470]/80"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>

          {/* Package Info */}
          <div>
            <p className="text-lg text-[#44403C] mb-4 leading-relaxed">{packageData.description}</p>

            <div className="mb-5 space-y-1">
              <div className="flex items-center text-2xl font-semibold text-[#5C5470] gap-2">
                <PriceCheckIcon className="text-[#D4A373]" />
                ₹{packageData.discountedPrice.toLocaleString()}
              </div>
              <div className="text-gray-400 line-through ml-8">
                ₹{packageData.price.toLocaleString()}
              </div>
              {packageData.discountLabel && (
                <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 bg-[#D4A373] text-white rounded-full text-sm font-medium ml-1 shadow">
                  <DiscountIcon fontSize="small" />
                  {packageData.discountLabel}
                </div>
              )}
            </div>

            {/* Facilities */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#5C5470] mb-3 flex items-center gap-2">
                <CheckCircleIcon className="text-[#8AC4D0]" />
                Facilities Included:
              </h3>
              <ul className="space-y-2">
                {packageData.facilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#44403C]">
                    <CheckCircleIcon className="text-[#D4A373] mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={packageData.bookNowUrl}
                className="flex items-center justify-center gap-2 bg-[#5C5470] text-white px-6 py-2 rounded-xl font-semibold text-center hover:bg-[#443d55] transition duration-200 shadow-sm"
              >
                <BookOnlineIcon />
                Book Now
              </a>
              <a
                href={packageData.enquiryNowUrl}
                className="flex items-center justify-center gap-2 bg-[#8AC4D0] text-white px-6 py-2 rounded-xl font-semibold text-center hover:bg-[#76b3c0] transition duration-200 shadow-sm"
              >
                <QuestionAnswerIcon />
                Enquiry Now
              </a>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border border-[#eee]">
          <h2 className="text-2xl font-bold text-[#5C5470] mb-4 flex items-center gap-2">
            <ArticleIcon className="text-[#D4A373]" />
            {packageData.blogTitle}
          </h2>
          <p className="text-[#555] leading-relaxed text-justify">
            {packageData.blogDescription}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CharDhamPackagePage;
