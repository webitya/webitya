"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";

const HomeHero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("service_webitya", "template_y9g4vob", formData, "Iw_1wMHg3mqNItEUH")
      .then(() => {
        setFeedback({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", description: "" });
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Failed to send message." });
      });
  };

  return (
    <>
      {/* Top Banner */}
    

      {/* Hero Section */}
      <div className="md:min-h-screen flex flex-col md:flex-row items-center justify-between px-8 py-10 bg-gradient-to-r from-gray-200 to-gray-300 text-black">
        {/* Left Side: Hero Text */}
        <div className="text-center md:text-left md:w-2/3 md:pr-12 mt-8 md:mt-0">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Webitya Web Services
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Elevate your brand with{" "}
            <strong className="text-black">
              cutting-edge digital marketing solutions
            </strong>
            . From SEO to web development, we help businesses thrive online.
          </Typography>

          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2, backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
            >
              Get Started
            </Button>
            <Button variant="outlined">Our Services</Button>
          </Box>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Get in Touch
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Your Name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Your Email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                name="description"
                label="Describe your requirement"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
              >
                Submit Now
              </Button>
            </form>

            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mt: 2 }}>
                {feedback.message}
              </Alert>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
