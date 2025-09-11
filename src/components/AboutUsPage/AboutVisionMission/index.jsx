"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const MotionBox = motion(Box);

const VisionMissionSection = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const timelineItems = [
    {
      title: "Vision",
      icon: <EmojiObjectsIcon sx={{ fontSize: 24, color: "white" }} />,
      color: "#2563eb",
      content: `Our vision is to inspire and empower businesses to evolve digitally through meaningful innovation. We aim to become a trusted force that bridges imagination and impact — building sustainable, scalable digital ecosystems that are human-centered and future-ready.`,
    },
    {
      title: "Mission",
      icon: <RocketLaunchIcon sx={{ fontSize: 24, color: "white" }} />,
      color: "#16a34a",
      content: `Our mission is to architect intelligent, result-driven digital experiences. We work closely with brands to unlock their full potential — blending creativity, marketing strategy, and technology to fuel long-term growth, elevate visibility, and create digital products that truly connect.`,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        bgcolor: "#f9fafb",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={6}
        color="text.primary"
      >
        Vision & Mission
      </Typography>

      <Box
        sx={{
          position: "relative",
          mx: "auto",
          maxWidth: "850px",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "3px",
            background: "linear-gradient(to bottom, #3b82f6, #22c55e)",
            transform: "translateX(-50%)",
          },
        }}
      >
        {timelineItems.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : isLeft ? "row" : "row-reverse",
                alignItems: "center",
                mb: 5,
                position: "relative",
              }}
            >
              {/* Icon Bubble */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                  },
                  zIndex: 2,
                }}
              >
                {item.icon}
              </Box>

              {/* Content Box */}
              <Box
                sx={{
                  flex: 1,
                  ml: isMobile ? 0 : isLeft ? 3 : 0,
                  mr: isMobile ? 0 : isLeft ? 0 : 3,
                  mt: isMobile ? 2 : 0,
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={0.5}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize="0.95rem"
                  color="text.secondary"
                >
                  {item.content}
                </Typography>
              </Box>
            </MotionBox>
          );
        })}
      </Box>
    </Box>
  );
};

export default VisionMissionSection;
