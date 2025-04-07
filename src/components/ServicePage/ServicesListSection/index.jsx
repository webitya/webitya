"use client";

import "./servicesListPage.css";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  DesignServices,
  BarChart,
  Campaign,
  Security,
  School,
  Language,
  Email,
  PhoneIphone,
} from "@mui/icons-material";
import Link from "next/link";

const services = [
  {
    title: "Website Designing",
    icon: <DesignServices className="service-icon" />,
    description: "Modern, responsive websites tailored to your brand and audience.",
    image: "/aboutHero.webp",
  },
  {
    title: "SEO Optimization",
    icon: <BarChart className="service-icon" />,
    description: "Boost your rankings on search engines and attract organic traffic.",
    image: "/aboutHero.webp",
  },
  {
    title: "Digital Marketing",
    icon: <Campaign className="service-icon" />,
    description: "Complete marketing campaigns including PPC, social, and strategy.",
    image: "/aboutHero.webp",
  },
  {
    title: "Website Security",
    icon: <Security className="service-icon" />,
    description: "We secure your website with the latest tools and SSL integrations.",
    image: "/aboutHero.webp",
  },
  {
    title: "Online Training",
    icon: <School className="service-icon" />,
    description: "Learn SEO, design, and digital marketing through our online programs.",
    image: "/aboutHero.webp",
  },
  {
    title: "Domain & Hosting",
    icon: <Language className="service-icon" />,
    description: "One-stop solutions for domains and fast, secure hosting plans.",
    image: "/aboutHero.webp",
  },
  {
    title: "Email Marketing",
    icon: <Email className="service-icon" />,
    description: "Email campaigns that engage your audience and boost conversions.",
    image: "/aboutHero.webp",
  },
  {
    title: "Mobile Optimization",
    icon: <PhoneIphone className="service-icon" />,
    description: "Ensure your site looks and works great on all mobile devices.",
    image: "/aboutHero.webp",
  },
];

const ServicesListSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">
          A full suite of services to grow your business digitally.
        </p>
      </div>

      <Grid container spacing={4} className="services-grid">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Paper elevation={2} className="service-card">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <Box className="card-header">
                {service.icon}
                <Typography className="service-title">
                  {service.title}
                </Typography>
              </Box>
              <Typography className="service-description">
                {service.description}
              </Typography>
              <div className="cta-box">
                <Link href="/contact-us" className="service-cta">
                  Contact Us →
                </Link>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ServicesListSection;
