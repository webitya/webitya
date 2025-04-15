"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Amit Sharma",
    location: "Delhi",
    review:
      "The Char Dham Yatra was a life-changing experience for me. The services provided, from the transport to the accommodations, were flawless. I felt spiritually connected every step of the journey. Highly recommended!",
    image: "/team.webp",
  },
  {
    name: "Priya Gupta",
    location: "Mumbai",
    review:
      "My family and I had an unforgettable experience on the Char Dham Yatra. The tour guides were knowledgeable, the meals were delicious, and the entire trip was seamless. Thank you for making this pilgrimage so memorable.",
    image: "/team.webp",
  },
  {
    name: "Ravi Kumar",
    location: "Bangalore",
    review:
      "As a first-timer, I was nervous about the journey, but everything was perfectly organized. The accommodations were great, and I felt well-supported throughout. It was truly a spiritual journey, and I will cherish it forever.",
    image: "/team.webp",
  },
  {
    name: "Seema Patel",
    location: "Ahmedabad",
    review:
      "A deeply spiritual and peaceful journey. The staff took care of every little detail, allowing me to focus on my spiritual experience. The Char Dham Yatra is a must-do for anyone looking for peace of mind and soul.",
    image: "/team.webp",
  },
];

const CharDhamTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-[#f7fbff] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          What Our Pilgrims Say
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear directly from our travelers about their life-changing Char Dham
          Yatra experience.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full max-w-3xl mx-auto"
        >
          {/* Testimonial Content */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-center mb-6">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 object-cover rounded-full border-4 border-blue-500"
              />
            </div>

            <blockquote className="text-lg text-gray-600 italic mb-6">
              "{testimonials[currentIndex].review}"
            </blockquote>

            <h4 className="text-xl font-semibold text-gray-800">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-sm text-gray-500">{testimonials[currentIndex].location}</p>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
              <button
                onClick={prevTestimonial}
                className="text-2xl text-gray-600 hover:text-blue-500"
              >
                &#8249;
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
              <button
                onClick={nextTestimonial}
                className="text-2xl text-gray-600 hover:text-blue-500"
              >
                &#8250;
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CharDhamTestimonials;
