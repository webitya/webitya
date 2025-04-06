"use client";

import { Grid, Paper, Typography, Box } from "@mui/material";
import { DesignServices, BarChart, Campaign, Security, School, Language, Email, PhoneIphone } from "@mui/icons-material";

const services = [
  {
    title: "Website Designing",
    icon: <DesignServices fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Modern, responsive websites tailored to your brand and audience."
  },
  {
    title: "SEO Optimization",
    icon: <BarChart fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Boost your rankings on search engines and attract organic traffic."
  },
  {
    title: "Digital Marketing",
    icon: <Campaign fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Complete marketing campaigns including PPC, social, and strategy."
  },
  {
    title: "Website Security",
    icon: <Security fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "We secure your website with the latest tools and SSL integrations."
  },
  {
    title: "Online Training",
    icon: <School fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Learn SEO, design, and digital marketing through our online programs."
  },
  {
    title: "Domain & Hosting",
    icon: <Language fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "One-stop solutions for domains and fast, secure hosting plans."
  },
  {
    title: "Email Marketing",
    icon: <Email fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Email campaigns that engage your audience and boost conversions."
  },
  {
    title: "Mobile Optimization",
    icon: <PhoneIphone fontSize="large" sx={{ color: "#0284c7" }} />,
    description: "Ensure your site looks and works great on all mobile devices."
  }
];

const ServicesListSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-24 bg-white" id="list">
      <div className=" mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          What We Offer
        </h2>
        <p className="text-gray-600 text-lg">
          A full suite of services to grow your business digitally.
        </p>
      </div>

      <Grid className="flex justify-center" container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                  transform: "translateY(-4px)",
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                {service.icon}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ ml: 2, fontWeight: 600, color: "#0f172a" }}
                >
                  {service.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#475569" }}>
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ServicesListSection;
