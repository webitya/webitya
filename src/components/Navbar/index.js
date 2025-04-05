"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConstructionIcon from "@mui/icons-material/Construction";
import DrawerEl from "../DrawerEl";

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
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
      {/* Under Construction Banner (Optional) */}
      {/* 
      <Box sx={{ bgcolor: "black", color: "white", py: 1, textAlign: "center" }}>
        <ConstructionIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        This Website is Under Construction – Stay tuned for updates!
      </Box> 
      */}

      {/* Navbar with Slide animation */}
      <Slide appear={false} direction="down" in={!trigger || isSticky}>
        <AppBar
          position="fixed"
          elevation={isSticky ? 4 : 0}
          sx={{
            bgcolor: "white",
            color: "black",
            transition: "all 0.3s ease-in-out",
            boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
            {/* Logo */}
            <Link href="/" passHref>
              <Typography
                variant="h6"
                fontWeight="bold"
                component="a"
                sx={{ color: "black", textDecoration: "none" }}
              >
                WEBITYA
              </Typography>
            </Link>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box display="flex" alignItems="center" gap={3}>
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.path} passHref>
                    <Button
                      component="a"
                      sx={{
                        color: "#007bff",
                        "&:hover": { color: "black" },
                      }}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))}
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
                      "&:hover": {
                        bgcolor: "#1a1a1a",
                      },
                    }}
                  >
                    Book Appointment
                  </Button>
                </Link>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>

          {/* Drawer for mobile */}
          <DrawerEl isOpen={drawerOpen} toggleMenu={() => setDrawerOpen(false)} />
        </AppBar>
      </Slide>
    </>
  );
};

export default Navbar;
