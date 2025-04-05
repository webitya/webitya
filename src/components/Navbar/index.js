"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerEl from "../DrawerEl";

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact-us" },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <>
      {/* Sticky navbar with slide effect */}
      <Slide appear={false} direction="down" in={!trigger || isSticky}>
        <AppBar
          position="fixed"
          elevation={isSticky ? 4 : 0}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(6px)",
            color: "black",
            transition: "all 0.3s ease-in-out",
            boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.1)" : "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
            {/* Logo */}
            <Link href="/" passHref>
              <Typography
                variant="h6"
                fontWeight="bold"
                component="a"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  letterSpacing: 1,
                  "&:hover": {
                    color: "primary.main",
                    transition: "color 0.3s ease",
                  },
                }}
              >
                WEBITYA
              </Typography>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box display="flex" alignItems="center" gap={3}>
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.path} passHref>
                    <Button
                      component="a"
                      sx={{
                        color: "#007bff",
                        fontWeight: 500,
                        textTransform: "none",
                        "&:hover": { color: "black" },
                      }}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))}

                {/* CTA */}
                <Link href="/demo" passHref>
                  <Button
                    component="a"
                    variant="contained"
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      "&:hover": {
                        bgcolor: "#1a1a1a",
                      },
                    }}
                  >
                    +91 9693245941
                  </Button>
                </Link>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: "black" }}
                aria-label="menu"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Mobile Drawer (placed outside AppBar to avoid z-index issues) */}
      <DrawerEl isOpen={drawerOpen} toggleMenu={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
