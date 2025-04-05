"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./HomeHero.css";
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
  Slide,
} from "@mui/material";

const logos = [
  { src: "/logos/logo1.svg", alt: "Logo 1" },
  { src: "/logos/logo2.svg", alt: "Logo 2" },
  { src: "/logos/logo3.svg", alt: "Logo 3" },
  { src: "/logos/logo4.svg", alt: "Logo 4" },
  { src: "/logos/logo5.svg", alt: "Logo 5" },
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
      console.error("Failed to send:", error);
      setOpenModal(true);
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-white via-neutral-100 to-white
 text-black">
        <div className="bubble-wrapper pointer-events-none">
  {/* Bubbles */}
  {[...Array(20)].map((_, i) => (
    <div
      key={`bubble-${i}`}
      className="bubble"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        bottom: `-${Math.random() * 100}px`,
      }}
    />
  ))}

  {/* Squares */}
  {[...Array(25)].map((_, i) => (
    <div
      key={`square-${i}`}
      className="square"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${6 + Math.random() * 6}s`,
        animationDelay: `${Math.random() * 5}s`,
        bottom: `-${Math.random() * 100}px`,
      }}
    />
  ))}

  {/* Triangles */}
  {[...Array(15)].map((_, i) => (
    <div
      key={`triangle-${i}`}
      className="triangle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 4}s`,
        bottom: `-${Math.random() * 100}px`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  ))}
  {/* Hexagons */}
{[...Array(30)].map((_, i) => (
  <div
    key={`hexagon-${i}`}
    className="hexagon"
    style={{
      left: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 4}s`,
      bottom: `-${Math.random() * 100}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  />
))}
{/* Stars */}
{[...Array(20)].map((_, i) => (
  <div
    key={`star-${i}`}
    className="star"
    style={{
      left: `${Math.random() * 100}%`,
      animationDuration: `${5 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      bottom: `-${Math.random() * 100}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  />
))}

{/* Diamonds */}
{[...Array(22)].map((_, i) => (
  <div
    key={`diamond-${i}`}
    className="diamond"
    style={{
      left: `${Math.random() * 100}%`,
      animationDuration: `${6 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      bottom: `-${Math.random() * 100}px`,
      transform: `rotate(${Math.random() * 45}deg)`,
    }}
  />
))}

</div>


        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-10 min-h-screen">
          {/* Left: Text */}
          <div className="md:w-2/3 text-center md:text-left space-y-4">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Webitya Web Services 🚀
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Digital Marketing Trainer & Consultant
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Boost your digital presence with{" "}
              <strong className="text-black">
                result-driven marketing strategies
              </strong>{" "}
              and bespoke web development. We help startups and businesses
              thrive online.
            </Typography>

            {/* Logos */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
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
                    height: 40,
                    objectFit: "contain",
                    filter: "grayscale(100%)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      filter: "grayscale(0%)",
                      transform: "scale(1.08)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* CTA */}
            <Box mt={3}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mr: 2,
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                Let’s Talk
              </Button>
              <Button variant="outlined" size="large">
                Explore Services
              </Button>
            </Box>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/3 mt-10 md:mt-0">
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Drop Your Query ✉️
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  size="small"
                  margin="dense"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="email"
                  label="Email Address"
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
                  label="How can we help?"
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
                  sx={{
                    mt: 2,
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#222" },
                  }}
                >
                  Submit Now
                </Button>
              </form>
            </Paper>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={openModal}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle>🎉 Thank You!</DialogTitle>
        <DialogContent>
          <Typography>Your message has been sent. We'll reach out shortly.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeHero;
