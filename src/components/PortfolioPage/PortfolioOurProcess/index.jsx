"use client";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography, Box } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { motion } from "framer-motion";

const processSteps = [
  {
    title: "Discovery & Research",
    description: "We understand your brand, goals, and audience to craft the best strategy.",
    icon: <LightbulbIcon fontSize="medium" />,
  },
  {
    title: "Design & Development",
    description: "We create sleek, fast websites and marketing campaigns that convert.",
    icon: <DesignServicesIcon fontSize="medium" />,
  },
  {
    title: "Testing & Feedback",
    description: "We refine everything based on real feedback and make improvements.",
    icon: <WorkOutlineIcon fontSize="medium" />,
  },
  {
    title: "Launch & Growth",
    description: "We launch with confidence and continuously monitor to help you grow.",
    icon: <RocketLaunchIcon fontSize="medium" />,
  },
];

const OurProcessSection = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 px-6 md:px-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Creative Process</h2>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">
          A vibrant journey from concept to success, tailored uniquely for your brand.
        </p>
      </div>

      <Timeline position="alternate">
        {processSteps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                  color: "white",
                  boxShadow: "0 0 0 3px white",
                  animation: "pulse 2s infinite ease-in-out",
                }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {step.icon}
                </motion.div>
              </TimelineDot>
              {index < processSteps.length - 1 && <TimelineConnector sx={{ backgroundColor: "#c7d2fe" }} />}
            </TimelineSeparator>

            <TimelineContent>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.75)",
                    borderRadius: "20px",
                    p: 3,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                    borderLeft: "4px solid #6366f1",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" className="font-semibold text-gray-800 mb-1">
                    {step.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {step.description}
                  </Typography>
                </Box>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 3px white, 0 0 0 8px rgba(99, 102, 241, 0.3);
          }
          50% {
            box-shadow: 0 0 0 3px white, 0 0 0 12px rgba(99, 102, 241, 0.1);
          }
        }
      `}</style>
    </section>
  );
};

export default OurProcessSection;
