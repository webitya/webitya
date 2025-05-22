"use client";

import { useEffect, useState } from "react";
import { Typography, Avatar, Container, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeTestimonials.css";

const testimonials = [
  {
    name: "Ankita Verma",
    role: "Founder, Verma Boutique",
    feedback:
      "Webitya helped me take my boutique online with a stunning website and effective Instagram marketing. My sales doubled in 3 months!",
    image: "/testimonials/ankita.jpg",
    color: "#f97316", // orange
  },
  {
    name: "Rohit Singh",
    role: "CEO, SinghTech Solutions",
    feedback:
      "Their SEO strategies brought us to the first page of Google. The team is proactive, professional, and transparent.",
    image: "/testimonials/rohit.jpg",
    color: "#3b82f6", // blue
  },
  {
    name: "Pooja Sharma",
    role: "Freelance Makeup Artist",
    feedback:
      "Thanks to Webitya's digital training, I now manage my own Instagram every day for better search",
    image: "/testimonials/pooja.jpg",
    color: "#ec4899", // pink
  },
];

const HomeTestimonials = () => {
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
  className=" mx-auto"
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

export default HomeTestimonials;
