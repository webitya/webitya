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
    image: "/students/priya.jpg",
  },
  {
    name: "Ravi Verma",
    feedback:
      "Recorded lectures + offline doubt support is a game changer. Loved the real-life examples and guidance.",
    course: "Graphic Design",
    image: "/students/ravi.jpg",
  },
  {
    name: "Simran Kaur",
    feedback:
      "This is one of the most practical and hands-on learning experiences I’ve had. Highly recommended!",
    course: "Meta Ads & Google Ads",
    image: "/students/simran.jpg",
  },
];

const CourseTestimonials = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 6000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What Our Students Say
      </h2>

      <div className="relative max-w-3xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {testimonials[index].name}
                </h4>
                <p className="text-xs text-blue-600">
                  {testimonials[index].course}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 relative pl-6">
              <FormatQuoteIcon className="absolute left-0 top-0 text-blue-400" fontSize="small" />
              {testimonials[index].feedback}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowBackIosNewIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowForwardIosIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseTestimonials;
