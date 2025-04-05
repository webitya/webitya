"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";

import AboutHeroSection from "@/components/AboutUsPage/AboutUsHeroSection";
import TeamSection from "@/components/AboutUsPage/AboutTeamSection";
import AboutInternsSection from "@/components/AboutUsPage/AboutOurInterns";
import AboutUsCTA from "@/components/AboutUsPage/AboutUsCTA";
import AboutVisionMissionSection from "@/components/AboutUsPage/AboutVisionMission";

const drawerWidth = 200;

const About = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { id: "intro", label: "Key Takeaways" },
    { id: "content", label: "Our Process" },
    { id: "steps", label: "Why Choose Us" },
    { id: "benefits", label: "Multi-Stage Convincing Process" },
    { id: "positioning", label: "Our Delivery Models" },
    { id: "premium-advantage", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          if (top <= 150 && bottom >= 150) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer (only visible on large screens) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 80,
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <Toolbar />
        <List sx={{ pt: 2 }}>
          {navLinks.map(({ id, label }) => (
            <ListItemButton
              key={id}
              onClick={() => scrollToSection(id)}
              selected={activeSection === id}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                },
              }}
            >
              <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 4, ml: { lg: `${drawerWidth}px` } }}>
        <section id="hero">
          <AboutHeroSection />
        </section>
        <section id="hero1">
          <AboutVisionMissionSection />
        </section>
        <section id="intro">
          <TeamSection />
        </section>
        <section id="content">
          <AboutInternsSection />
        </section>
        <section id="steps">
          <AboutUsCTA />
        </section>
        <section id="benefits">
          <Typography variant="h5" gutterBottom>
            Aditya 1
          </Typography>
        </section>
        <section id="positioning">
          <Typography variant="h5" gutterBottom>
            Aditya 1
          </Typography>
        </section>
        <section id="premium-advantage">
          <Typography variant="h5" gutterBottom>
            Aditya 1
          </Typography>
        </section>
      </Box>
    </Box>
  );
};

export default About;
