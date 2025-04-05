"use client";

import { useState, useEffect } from "react";
import AboutHeroSection from "@/components/AboutUsPage/AboutUsHeroSection";
import TeamSection from "@/components/AboutUsPage/AboutTeamSection";
import AboutInternsSection from "@/components/AboutUsPage/AboutOurInterns";
import AboutUsCTA from "@/components/AboutUsPage/AboutUsCTA";
import AboutVisionMissionSection from "@/components/AboutUsPage/AboutVisionMission";

// MUI components
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const About = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { id: "about", label: "About webitya" },
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
  }, []);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className="flex">
      {/* Sidebar using MUI Drawer - only shown on large screens */}
      {isLargeScreen && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 200,
              top: 80,
              boxSizing: "border-box",
              borderRight: "1px solid #e5e7eb", // Tailwind's border-gray-200
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
                  borderRadius: 1,
                  marginY: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "#e0f2fe", // Tailwind's blue-50
                    color: "#2563eb", // Tailwind's blue-600
                  },
                  "&:hover": {
                    backgroundColor: "#f9fafb", // Tailwind's gray-50
                  },
                }}
              >
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <main className="w-full lg:ml-[200px] p-6">
        <section id="about">
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
      </main>
    </div>
  );
};

export default About;
