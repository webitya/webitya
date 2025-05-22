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
import Image from "next/image";

const services = [
  {
    title: "Website Designing",
    icon: <DesignServices className="service-icon" />,
    description: "Modern, responsive websites tailored to your brand and audience.",
    image: "/services/servicesListImages/website-designing.webp",
  },
  {
    title: "SEO Optimization",
    icon: <BarChart className="service-icon" />,
    description: "Boost your rankings on search engines and attract organic traffic.",
    image: "/services/servicesListImages/seo-optimization.webp",
  },
  {
    title: "Digital Marketing",
    icon: <Campaign className="service-icon" />,
    description: "Complete marketing campaigns including PPC, social, and strategy.",
    image: "/services/servicesListImages/digital-marketing.webp",
  },
  {
    title: "Website Security",
    icon: <Security className="service-icon" />,
    description: "We secure your website with the latest tools and SSL integrations.",
    image: "/services/servicesListImages/website-security.webp",
  },
  {
    title: "Online Training",
    icon: <School className="service-icon" />,
    description: "Learn SEO, design, and digital marketing through our online programs.",
    image: "/services/servicesListImages/online-training.webp",
  },
  {
    title: "Domain",
    icon: <Language className="service-icon" />,
    description: "One-stop solutions for domains and fast",
    image: "/services/servicesListImages/domain-hosting.webp",
  },
  {
    title: "Email Marketing",
    icon: <Email className="service-icon" />,
    description: "Email campaigns that engage your audience and boost conversions.",
    image: "/services/servicesListImages/email-marketing.webp",
  },
  {
    title: "Mobile Optimization",
    icon: <PhoneIphone className="service-icon" />,
    description: "Ensure your site looks and works great on all mobile devices.",
    image: "/services/servicesListImages/mobile-optimization.webp",
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
              <div className="cta-box flex justify-between !mt-3 items-center">
                <Link href="/contact-us" className="service-cta">
                  Contact Us →
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span></span>
                        <Link href="/">
                          <Image
                            src="/brand/logo1.png"
                            alt="Webitya Logo"
                            width={70}
                            height={20}
                            className="object-contain cursor-pointer"
                          />
                        </Link>
                      </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ServicesListSection;
