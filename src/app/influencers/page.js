"use client";

import { useState, useEffect } from "react";
import InfluencerHeroSection from "@/components/InfluencerPage/InfluencerHeroSection";
import InfluencerVision from "@/components/InfluencerPage/InfluencerVisionMission";
import InfluencerList from "@/components/InfluencerPage/InfluencerCollection";
import InfluencerCTA from "@/components/InfluencerPage/InfluencerCTA";
import Footer from "@/components/FooterEl";

// MUI
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Influencers = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "hero", label: "Discover" },
    { id: "vision", label: "Why Influencers?" },
    { id: "collection", label: "Top Influencers" },
    { id: "cta", label: "Book Now" },
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
          if (rect.top <= 150 && rect.bottom >= 150) {
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
      {isLargeScreen && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 180,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 180,
              top: 80,
              height: "calc(100% - 80px)",
              borderRight: "none",
              background: "linear-gradient(to bottom, #fdf2f8, #f8fafc)",
              boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
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
                  borderRadius: 2,
                  marginY: 0.5,
                  mx: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#f0abfc",
                    color: "#581c87",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#fae8ff",
                  },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: activeSection === id ? "#581c87" : "#334155",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}

      <main className="w-full bg-gradient-to-br from-[#fdf4ff] via-[#f0f9ff] to-[#eef2ff] space-y-0">
        <section id="hero">
          <InfluencerHeroSection />
        </section>
        <section id="vision">
          <InfluencerVision />
        </section>
        <section id="collection">
          <InfluencerList />
        </section>
        <section id="cta">
          <InfluencerCTA />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Influencers;
