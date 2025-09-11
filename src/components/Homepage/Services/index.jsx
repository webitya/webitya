"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Tooltip,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  Language,
  Search,
  Groups,
  Campaign,
  DesignServices,
  School,
} from "@mui/icons-material";

const services = [
  {
    title: "Website Designing",
    description: "Custom, responsive websites tailored to your brand.",
    icon: <Language />,
    color: "#0ea5e9",
  },
  {
    title: "SEO Optimization",
    description: "Boost your site ranking and attract more traffic.",
    icon: <Search />,
    color: "#10b981",
  },
  {
    title: "Social Media Marketing",
    description: "Grow your brand on Instagram, Facebook, and more.",
    icon: <Groups />,
    color: "#facc15",
  },
  {
    title: "Google Ads & PPC",
    description: "Run profitable Google Ads with expert targeting.",
    icon: <Campaign />,
    color: "#f97316",
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and modern interface design solutions.",
    icon: <DesignServices />,
    color: "#6366f1",
  },
  {
    title: "Digital Marketing Course",
    description: "Learn SEO, Ads, Social Media & more with us.",
    icon: <School />,
    color: "#ec4899",
  },
];

const HomeServicesSection = () => {
  const theme = useTheme();

  return (
    <Box py={10} px={2} bgcolor="#fafafa">
     <Typography
  className="mb-6"
  variant="h4"
  fontWeight="bold"
  align="center"
  gutterBottom
>
  Our Services
</Typography>


      <Grid
        container
        spacing={2}
        maxWidth="lg"
        mx="auto"
        justifyContent="center"
      >
        {services.map((service, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Tooltip title={service.description} arrow>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                    transform: "translateY(-3px)",
                  },
                  cursor: "pointer",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: service.color,
                    width: 48,
                    height: 48,
                    margin: "0 auto 8px",
                  }}
                >
                  {service.icon}
                </Avatar>
                <Typography variant="body2" fontWeight="bold">
                  {service.title}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeServicesSection;
