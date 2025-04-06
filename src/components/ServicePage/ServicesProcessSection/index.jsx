"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Search,
  Lightbulb,
  DesignServices,
  Build,
  CheckCircle,
} from "@mui/icons-material";

const processSteps = [
  {
    title: "Understanding Your Needs",
    description: "We start with a deep dive into your business goals and challenges.",
    icon: <Search fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Strategy & Planning",
    description: "We build a custom digital strategy tailored to your objectives.",
    icon: <Lightbulb fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Design & Development",
    description: "Our team designs and develops optimized websites and campaigns.",
    icon: <DesignServices fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Implementation",
    description: "We launch your project with proper QA, SEO, and performance checks.",
    icon: <Build fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Review & Delivery",
    description: "We review all deliverables, make refinements, and ensure you're 100% satisfied.",
    icon: <CheckCircle fontSize="large" sx={{ color: "#2563eb" }} />,
  },
];

const ServiceProcessSection = () => {
  return (
    <section id="process" className="bg-[#f9fafb] py-20 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Our Process
        </h2>
        <p className="text-gray-600 text-lg">
          Step-by-step execution to ensure transparency and effectiveness.
        </p>
      </div>

      <Grid container spacing={4} justifyContent="center">
        {processSteps.map((step, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={index === 4 ? 12 : 6}
            sx={{
              display: "flex",
              justifyContent: index === 4 ? "center" : "flex-start",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 4,
                width: "100%",
                maxWidth: index === 4 ? { md: "66.66%" } : "100%", // Center the 5th card
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0",
                "&:hover": {
                  backgroundColor: "#f8fafc",
                  transform: "translateY(-6px)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                {step.icon}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ ml: 2, fontWeight: 600, color: "#0f172a" }}
                >
                  {step.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ServiceProcessSection;
