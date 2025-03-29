"use client";
import { useState, useEffect } from "react";
import AboutHeroSection from "@/components/AboutUsPage/AboutUsHeroSection";
import TeamSection from "@/components/AboutUsPage/AboutTeamSection";
import AboutInternsSection from "@/components/AboutUsPage/AboutOurInterns";
import AboutUsCTA from "@/components/AboutUsPage/AboutUsCTA";
import AboutVisionMissionSection from "@/components/AboutUsPage/AboutVisionMission";

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
  }, [navLinks]);

  return (
    <div className="flex">
      {/* Sidebar - Visible only on large screens */}
      <aside className="hidden lg:block fixed top-20 left-0 h-full w-40 bg-white border-r border-gray-200">
        <ul className="space-y-3 py-6 px-4">
          {navLinks.map(({ id, label }) => (
            <li
              key={id}
              className={`cursor-pointer text-sm font-medium p-2 rounded-md transition-all ${
                activeSection === id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:ml-40 p-6">
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
