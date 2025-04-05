"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Language,
  Search,
  Groups,
} from "@mui/icons-material";

const services = [
  {
    title: "Website Designing",
    description: "Custom, responsive websites tailored to your brand. We build stunning sites with smooth user experiences.",
    icon: <Language sx={{ fontSize: 40, color: "#000" }} />,
  },
  {
    title: "SEO Optimization",
    description: "Boost your website ranking with strategic SEO. We help you get found online and attract more traffic.",
    icon: <Search sx={{ fontSize: 40, color: "#000" }} />,
  },
  {
    title: "Social Media Marketing",
    description: "Grow your brand on social platforms. We create engaging content and targeted campaigns to build your audience.",
    icon: <Groups sx={{ fontSize: 40, color: "#000" }} />,
  },
];

const HomeServicesSection = () => {
  const theme = useTheme();

  return (
    <Box py={12} bgcolor="#F9FAFB">
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        Our Services
      </Typography>

      <Grid
        container
        spacing={4}
        maxWidth="lg"
        mx="auto"
        px={{ xs: 2, md: 4 }}
      >
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                {service.icon}
                <Typography variant="h6" fontWeight="bold">
                  {service.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeServicesSection;
