"use client";

import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import AboutHeroSection from "@/components/AboutUsPage/AboutUsHeroSection";
import TeamSection from "@/components/AboutUsPage/AboutTeamSection";
import AboutInternsSection from "@/components/AboutUsPage/AboutOurInterns";
import AboutUsCTA from "@/components/AboutUsPage/AboutUsCTA";
import AboutVisionMissionSection from "@/components/AboutUsPage/AboutVisionMission";
import ContactHero from "@/components/ContactUs/ContactHero";

const About = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
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
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar Drawer for small screens */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            paddingTop: "5rem",
          },
        }}
      >
        <List>
          {navLinks.map(({ id, label }) => (
            <ListItemButton
              key={id}
              onClick={() => scrollToSection(id)}
              selected={activeSection === id}
              sx={{
                borderRadius: 1,
                marginY: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "#e0f2fe",
                  color: "#2563eb",
                },
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Static Sidebar for large screens */}
      <aside className="hidden lg:block fixed top-20 left-0 h-full w-40 bg-white border-r border-gray-200 z-40">
        <ul className="space-y-3 py-6 px-4">
          {navLinks.map(({ id, label }) => (
            <li
              key={id}
              className={`cursor-pointer text-sm font-medium p-2 rounded-md transition-all ${
                activeSection === id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="transition-all duration-300 ease-in-out w-full lg:ml-40 p-6">
        <section id="hero">
          <ContactHero />
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
          <h1>Aditya 1</h1>
        </section>
        <section id="positioning">
          <h1>Aditya 1</h1>
        </section>
        <section id="premium-advantage">
          <h1>Aditya 1</h1>
        </section>
      </main>
    </>
  );
};

export default About;
