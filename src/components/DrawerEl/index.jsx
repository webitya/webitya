"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, BookOpen, Users } from "lucide-react";
import { School as SchoolIcon } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";

const DrawerEl = ({ isOpen, toggleMenu }) => {
  const pathname = usePathname();

  // Default navLinks and highlightLinks
  let navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact-us" },
  ];

  let highlightLinks = [
    {
      name: "Courses",
      path: "/courses",
      icon: <BookOpen size={18} />,
      bg: "#e3f2fd",
      hover: "#bbdefb",
      iconColor: "#1976d2",
    },
    {
      name: "Our Students",
      path: "/courses/all-students",
      icon: <SchoolIcon fontSize="small" />,
      bg: "#e3f2fd",
      hover: "#bbdefb",
      iconColor: "#1565c0",
    },
    {
      name: "Influencers",
      path: "/influencers",
      icon: <Users size={18} />,
      bg: "#ede7f6",
      hover: "#d1c4e9",
      iconColor: "#6a1b9a",
    },
  ];

    // menuLinks = [
    //   { name: "Home", path: "/zup-rides" },
    //   { name: "About", path: "/zup-rides/about" },
    //   { name: "Vehicles", path: "/zup-rides/vehicles" },
    //   { name: "Blogs", path: "/zup-rides/blogs" },
    //   { name: "Booking", path: "/zup-rides/booking" },
    //   { name: "Contact Us", path: "/zup-rides/contact" },
    // ];


  // Zup Rides
    if ((pathname.includes("/zup-rides"))) {
    navLinks = [
      { name: "Home", path: `/zup-rides` },
      { name: "About", path: `/zup-rides/about` },
      { name: "Vehicles", path: `/zup-rides/vehicles` },
      { name: "Blogs", path: `/zup-rides/blogs` },
      { name: "Contact Us", path: `/zup-rides/contact` },
    ];
    highlightLinks = [
      {
        name: "Courses",
        path: "/courses",
        icon: <BookOpen size={18} />,
        bg: "#e3f2fd",
        hover: "#bbdefb",
        iconColor: "#1976d2",
      },
      {
        name: "Influencers",
        path: "/influencers",
        icon: <Users size={18} />,
        bg: "#ede7f6",
        hover: "#d1c4e9",
        iconColor: "#6a1b9a",
      },
    ];
  }
  // 🟨 Dynamic Yatra route logic
  if ((pathname.includes("/tour&travells"))) {
    navLinks = [
      { name: "Pricing", path: `${pathname}#pricing` },
      { name: "Hotels", path: `${pathname}#hotels` },
      { name: "Cars", path: `${pathname}#cars` },
    ];
    highlightLinks = [
      {
        name: "Courses",
        path: "/courses",
        icon: <BookOpen size={18} />,
        bg: "#e3f2fd",
        hover: "#bbdefb",
        iconColor: "#1976d2",
      },
      {
        name: "Influencers",
        path: "/influencers",
        icon: <Users size={18} />,
        bg: "#ede7f6",
        hover: "#d1c4e9",
        iconColor: "#6a1b9a",
      },
    ];
  }
  // 🟨 Dynamic Latest Tech News logic
  if ((pathname.includes("/latest-tech-news"))) {
    navLinks = [
      { name: "Latest News", path: `/latest-tech-news` },
      { name: "Tech Trends", path: `/latest-tech-news/trends` },
      { name: "Gadgets", path: `/latest-tech-news/gadgets` },
      { name: "AI Updates", path: `/latest-tech-news/ai-updates` },
    ];
    highlightLinks = [
      {
        name: "Courses",
        path: "/courses",
        icon: <BookOpen size={18} />,
        bg: "#e3f2fd",
        hover: "#bbdefb",
        iconColor: "#1976d2",
      },
      {
        name: "Influencers",
        path: "/influencers",
        icon: <Users size={18} />,
        bg: "#ede7f6",
        hover: "#d1c4e9",
        iconColor: "#6a1b9a",
      },
    ];
  }
  // 🟩 Dynamic Cars route logic
  if (pathname.includes("/cars")) {
    navLinks = [
      { name: "Ford", path: "/cars/ford" },
      { name: "Jaguar", path: "/cars/jaguar" },
      { name: "Audi", path: "/cars/audi" },
    ];
    highlightLinks = [
      {
        name: "Courses",
        path: "/courses",
        icon: <BookOpen size={18} />,
        bg: "#e3f2fd",
        hover: "#bbdefb",
        iconColor: "#1976d2",
      },
      {
        name: "Influencers",
        path: "/influencers",
        icon: <Users size={18} />,
        bg: "#ede7f6",
        hover: "#d1c4e9",
        iconColor: "#6a1b9a",
      },
    ];
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => toggleMenu();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 w-2/3 sm:w-2/3 md:w-1/3 h-full bg-white shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-end items-center px-4 py-4 border-b border-gray-200">
              <button
                className="text-gray-800 hover:text-gray-900 transition"
                onClick={toggleMenu}
              >
                <X size={32} />
              </button>
            </div>

            {/* Drawer Content */}
            <Box sx={{ px: 2, py: 2, overflowY: "auto", flex: 1 }}>
              {/* Main Links */}
              <List>
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.path} passHref>
                    <ListItem
                      button
                      component="a"
                      onClick={toggleMenu}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <ListItemText
                        primary={link.name}
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      />
                    </ListItem>
                  </Link>
                ))}
              </List>

              {highlightLinks.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  {/* Highlighted Section */}
                  <List>
                    {highlightLinks.map((link) => (
                      <Link key={link.name} href={link.path} passHref>
                        <ListItem
                          button
                          component="a"
                          onClick={toggleMenu}
                          sx={{
                            backgroundColor: link.bg,
                            borderRadius: "8px",
                            mb: 1.2,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              backgroundColor: link.hover,
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 32,
                              color: link.iconColor,
                              mr: 1,
                            }}
                          >
                            {link.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={link.name}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: "0.95rem",
                              color: "#222",
                            }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </>
              )}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerEl;
