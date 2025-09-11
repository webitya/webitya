"use client"

import { useState, useEffect } from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function AboutNavigation() {
  const [activeSection, setActiveSection] = useState("about")

  const navLinks = [
    { id: "about", label: "About Webitya" },
    { id: "vision-mission", label: "Vision & Mission" },
    { id: "team", label: "Meet the Team" },
    { id: "interns", label: "Our Interns" },
    { id: "cta", label: "Why Choose Us" },
  ]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))

  // Only render sidebar for large screens
  if (!isLargeScreen) return null

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 170,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 170,
          top: 80,
          height: "calc(100% - 80px)",
          boxSizing: "border-box",
          borderRight: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
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
              transition: "all 0.3s",
              "&.Mui-selected": {
                backgroundColor: "#e0f2fe",
                color: "#2563eb",
              },
              "&:hover": {
                backgroundColor: "#f1f5f9",
              },
            }}
          >
            <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
