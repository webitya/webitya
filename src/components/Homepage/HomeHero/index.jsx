"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const logos = [
  { src: "/next.svg", alt: "Logo 1" },
  { src: "/next.svg", alt: "Logo 2" },
  { src: "/next.svg", alt: "Logo 3" },
  { src: "/next.svg", alt: "Logo 4" },
];

const HomeHero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_webitya",
        "template_y9g4vob",
        formData,
        "Iw_1wMHg3mqNItEUH"
      );
      setFormData({ name: "", email: "", description: "" });
      setOpenModal(true);
    } catch (error) {
      // alert("Something went wrong. Please try again.");
      setOpenModal(true)
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="md:min-h-screen flex flex-col md:flex-row items-center justify-between md:px-6 px-4 md:py-6 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-black">
        {/* Left Side */}
        <div className="text-center md:text-left md:w-2/3 md:pr-12">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Webitya Web Services
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "primary.main",
              fontWeight: "medium",
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 1,
            }}
          >
            Digital Marketing Trainer & Consultant
          </Typography>

          <Typography variant="body1" color="textSecondary" paragraph>
            Elevate your brand with{" "}
            <strong className="text-black">
              cutting-edge digital marketing solutions
            </strong>
            . From SEO to web development, we help businesses thrive online.
          </Typography>

          {/* Logos Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "start",
              },
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
              py: 2,
            }}

            
          >
            {logos.map((logo, index) => (
              <Box
                key={index}
                component="img"
                src={logo.src}
                alt={logo.alt}
                sx={{
                  height: 10,
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Call to Action Buttons */}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mr: 2,
                backgroundColor: "#000",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Get Started
            </Button>
            <Button variant="outlined">Our Services</Button>
          </Box>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Get in Touch
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                size="small"
                margin="dense"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                size="small"
                margin="dense"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                name="description"
                label="Requirement"
                fullWidth
                multiline
                rows={3}
                size="small"
                margin="dense"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="medium"
                sx={{
                  mt: 2,
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Submit Now
              </Button>
            </form>
          </Paper>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <Typography>We’ll contact you soon. 😊</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeHero;
