"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/FooterEl";

// Service page sections
import ServicesCTA from "@/components/ServicePage/ServicesCTA";
import ServicesHeroSection from "@/components/ServicePage/ServicesHeroSection";
import ServicesListSection from "@/components/ServicePage/ServicesListSection";
import ServicesProcessSection from "@/components/ServicePage/ServicesProcessSection";
import ServicesTestimonials from "@/components/ServicePage/ServicesTestimonials";

// MUI
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServicesPage = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "hero", label: "Our Services" },
    { id: "list", label: "What We Offer" },
    { id: "process", label: "Our Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "cta", label: "Get Started" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className="flex bg-[#f8fafc] text-[#1f2937]">
      {/* Sidebar Navigation */}
      {isLargeScreen && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 160,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 160,
              top: 70,
              height: "calc(100% - 80px)",
              boxSizing: "border-box",
              borderRight: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              boxShadow: "1px 0 4px rgba(0,0,0,0.04)",
            },
          }}
        >
          <List sx={{ paddingY: 2 }}>
            {navLinks.map(({ id, label }) => (
              <ListItemButton
                key={id}
                onClick={() => scrollToSection(id)}
                selected={activeSection === id}
                sx={{
                  borderRadius: "1px",
                  marginY: 0.5,
                  transition: "all 0.3s ease",
                  paddingY: 1.3,
                  paddingX: 2,
                  "&.Mui-selected": {
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                    fontWeight: 600,
                  },
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <main className="w-full">
        <section id="hero">
          <ServicesHeroSection />
        </section>
        <section id="list">
          <ServicesListSection />
        </section>
        <section id="process">
          <ServicesProcessSection />
        </section>
        <section id="testimonials">
          <ServicesTestimonials />
        </section>
        <section id="cta">
          <ServicesCTA />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default ServicesPage;
