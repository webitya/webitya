"use client";

import { Box, Typography } from "@mui/material";
import {
  Search,
  Lightbulb,
  DesignServices,
  Build,
  CheckCircle,
  ArrowForwardIos,
  ArrowDownward,
} from "@mui/icons-material";
import "./serviceProcessSection.css";

const processSteps = [
  {
    title: "Understanding Your Needs",
    description: "We begin by learning about your goals, audience, and challenges to align our approach with your vision. Our team takes the time to understand your brand essence and business model. This ensures that every solution we craft is purposeful and result-driven.",
    icon: <Search fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Strategy & Planning",
    description: "We craft a tailored digital strategy based on research, insights, and your specific business objectives. Every plan is structured to maximize efficiency and ROI. Our roadmap gives you a clear picture of what’s next and why it matters.",
    icon: <Lightbulb fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Design & Development",
    description: "Our team creates visually engaging, fast, and responsive websites built to deliver results. We blend creativity with functionality to ensure an intuitive user experience. All designs are optimized for mobile, SEO, and performance from day one.",
    icon: <DesignServices fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Implementation",
    description: "We launch with full QA, SEO setup, and performance optimization to ensure everything runs smoothly. Our developers rigorously test every detail for functionality and consistency. Your digital solution goes live with precision and confidence.",
    icon: <Build fontSize="large" sx={{ color: "#2563eb" }} />,
  },
  {
    title: "Review & Delivery",
    description: "We finalize all assets, refine based on feedback, and deliver with full support and satisfaction guaranteed. Every detail is double-checked to match your expectations. We don’t just deliver — we deliver excellence.",
    icon: <CheckCircle fontSize="large" sx={{ color: "#2563eb" }} />,
  },
];



const ServiceProcessSection = () => {
  return (
    <section id="process" className="process-section">
      <div className="process-header">
        <h2 className="process-title">Our Process</h2>
        <p className="process-subtitle">
          Step-by-step execution to ensure transparency and effectiveness.
        </p>
      </div>

      <div className="process-journey-container">
        {processSteps.map((step, index) => (
          <div className="process-step" key={index}>
            <div className="process-card">
              <Box display="flex" alignItems="center" className="process-card-header">
                {step.icon}
                <Typography variant="h6" component="h3" className="process-card-title">
                  {step.title}
                </Typography>
              </Box>
              <Typography variant="body2" className="process-description">
                {step.description}
              </Typography>
            </div>
            {index !== processSteps.length - 1 && (
              <div className="journey-connector">
                <ArrowForwardIos className="arrow-horizontal" />
                <ArrowDownward className="arrow-vertical" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceProcessSection;
