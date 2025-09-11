"use client";

import { useEffect, useState } from "react";
import { Typography, Avatar, Container, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import "./ServicesTestimonials.css";

const testimonials = [
  {
    name: "Aarav Gupta",
    role: "Startup Founder",
    feedback:
      "Webitya helped us scale online with a stunning website and effective SEO. Our traffic has tripled since the launch.",
    image: "/avatars/aarav.jpg",
    color: "#3b82f6", // blue
  },
  {
    name: "Neha Sharma",
    role: "Digital Coach",
    feedback:
      "The team’s dedication to design and performance is unmatched. They delivered beyond expectations!",
    image: "/avatars/neha.jpg",
    color: "#10b981", // green
  },
  {
    name: "Rohan Mehta",
    role: "E-commerce Owner",
    feedback:
      "Excellent service, creative minds, and great communication. I highly recommend Webitya for any web project.",
    image: "/avatars/rohan.jpg",
    color: "#f59e0b", // amber
  },
];

const ServicesTestimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[current];

  return (
    <section
      className="relative py-24 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden testimonial-bg"
    >
      <div className="floating-shapes" />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: currentTestimonial.color }}
        >
          What Our Clients Say
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          Real feedback from our valued clients across industries.
        </Typography>

        <Box
          className="glass-box mt-10 px-6 py-10 rounded-2xl shadow-2xl text-center relative borderGlow"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderColor: currentTestimonial.color,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Avatar
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  mb: 2,
                  boxShadow: `0 0 0 4px ${currentTestimonial.color}55`,
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: currentTestimonial.color }}
              >
                {currentTestimonial.name}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
                gutterBottom
              >
                {currentTestimonial.role}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mx-auto"
                align="center"
              >
                "{currentTestimonial.feedback}"
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </section>
  );
};

export default ServicesTestimonials;
