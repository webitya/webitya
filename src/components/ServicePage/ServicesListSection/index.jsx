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
    description:
      "Modern, responsive websites tailored to your brand and audience. We ensure every pixel serves a purpose and reflects your identity. Optimized for user experience and conversions.",
    image: "/services/servicesListImages/website-designing.webp",
  },
  {
    title: "SEO Optimization",
    icon: <BarChart className="service-icon" />,
    description:
      "Boost your rankings on search engines and attract organic traffic. We implement proven SEO strategies tailored to your niche. From technical SEO to content, we cover it all.",
    image: "/services/servicesListImages/seo-optimization.webp",
  },
  {
    title: "Digital Marketing",
    icon: <Campaign className="service-icon" />,
    description:
      "Complete marketing campaigns including PPC, social, and strategy. Drive leads through customized digital funnels. Measurable results that maximize your ad spend ROI.",
    image: "/services/servicesListImages/digital-marketing.webp",
  },
  {
    title: "Website Security",
    icon: <Security className="service-icon" />,
    description:
      "We secure your website with the latest tools and SSL integrations. Regular vulnerability scans and proactive threat prevention. Peace of mind with 24/7 monitoring support.",
    image: "/services/servicesListImages/website-security.webp",
  },
  {
    title: "Online Training",
    icon: <School className="service-icon" />,
    description:
      "Learn SEO, design, and digital marketing through our online programs. Expert-led modules with real-world assignments. Certification and support to help you grow.",
    image: "/services/servicesListImages/online-training.webp",
  },
  {
    title: "Domain",
    icon: <Language className="service-icon" />,
    description:
      "One-stop solutions for domains and fast hosting services. Get custom domain emails and DNS management. Launch your website quickly and professionally.",
    image: "/services/servicesListImages/domain-hosting.webp",
  },
  {
    title: "Email Marketing",
    icon: <Email className="service-icon" />,
    description:
      "Email campaigns that engage your audience and boost conversions. From design to delivery, we optimize every step. Build relationships with your subscribers effectively.",
    image: "/services/servicesListImages/email-marketing.webp",
  },
  {
    title: "Mobile Optimization",
    icon: <PhoneIphone className="service-icon" />,
    description:
      "Ensure your site looks and works great on all mobile devices. Responsive design and fast loading speed are our priorities. Deliver a seamless mobile user experience.",
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
