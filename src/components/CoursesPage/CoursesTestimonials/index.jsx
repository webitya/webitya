"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonials = [
  {
    name: "Priya Sharma",
    feedback:
      "The course structure is excellent and the support from mentors is unmatched. I cracked my first digital marketing job within a month!",
    course: "Complete Digital Marketing",
    image:"/team.webp",
  },
  {
    name: "Ravi Verma",
    feedback:
      "Recorded lectures + offline doubt support is a game changer. Loved the real-life examples and guidance.",
    course: "Graphic Design",
    image: "/team.webp",
  },
  {
    name: "Simran Kaur",
    feedback:
      "This is one of the most practical and hands-on learning experiences I’ve had. Highly recommended!",
    course: "Meta Ads & Google Ads",
    image: "/team.webp",
  },
];

const CourseTestimonials = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
        What Our Students Say
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white rounded-3xl p-8 shadow-xl sm:p-10"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1 text-center sm:text-left">
                <FormatQuoteIcon className="text-blue-400 mb-2" />
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  “{testimonials[index].feedback}”
                </p>
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    {testimonials[index].name}
                  </h4>
                  <p className="text-sm text-blue-600">
                    {testimonials[index].course}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 hidden sm:block">
          <button
            onClick={prevSlide}
            className="bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowBackIosNewIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden sm:block">
          <button
            onClick={nextSlide}
            className="bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowForwardIosIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3.5 h-3.5 rounded-full cursor-pointer transition ${
              i === index ? "bg-blue-600 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseTestimonials;
