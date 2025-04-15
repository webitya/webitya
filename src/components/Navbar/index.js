"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerEl from "../DrawerEl";

const Navbar = () => {
  const pathname = usePathname();
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

  // ✅ Dynamic styles and logo
  let logoSrc = "/brand/logo1.png";
  let bgColor = "rgba(255, 255, 255, 0.9)";
  let textColor = "black";
  let hoverTextColor = "black";
  let ctaBgColor = "black";
  let ctaTextColor = "white";
  let ctaHoverBgColor = "#1a1a1a";

  // ✅ Dynamic menuLinks
  let menuLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "Influencers", path: "/influencers" },
    { name: "Contact", path: "/contact-us" },
  ];

  if (pathname === "/cars") {
    logoSrc = "/brand/logo-cars.png";
    bgColor = "black";
    textColor = "white";
    hoverTextColor = "#00ff7f";
    ctaBgColor = "white";
    ctaTextColor = "black";
    ctaHoverBgColor = "#00ff7f";

    menuLinks = [
      { name: "Ford", path: "/cars/ford" },
      { name: "Jaguar", path: "/cars/jaguar" },
      { name: "Audi", path: "/cars/audi" },
    ];
  } else if (
    pathname === "/char-dham-yatra" ||
    pathname === "/tour&travells/char-dham-yatra"
  ) {
    logoSrc =
      "https://res.cloudinary.com/dxqthnbx7/image/upload/v1744691965/Copy_of_WEBITYA_3_tl6gr3.png";
    bgColor = "#f8e4c0";
    textColor = "black";
    hoverTextColor = "#d2691e";

    menuLinks = [
      { name: "Pricing", path: "/tour&travells/char-dham-yatra#pricing" },
      { name: "Hotels", path: "/tour&travells/char-dham-yatra#hotels" },
      { name: "Cars", path: "/tour&travells/char-dham-yatra#cars" },
    ];
  }

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger || isSticky}>
        <AppBar
          position="fixed"
          elevation={isSticky ? 4 : 0}
          sx={{
            bgcolor: bgColor,
            backdropFilter: "blur(6px)",
            color: textColor,
            transition: "all 0.3s ease-in-out",
            boxShadow: isSticky
              ? "0 2px 10px rgba(0,0,0,0.1)"
              : "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
            {/* Logo */}
            <Link href="/" passHref>
              <img src={logoSrc} alt="WEBITYA Logo" style={{ width: "160px" }} />
            </Link>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box display="flex" alignItems="center" gap={3}>
                {menuLinks.map((link) => (
                  <Link key={link.name} href={link.path} passHref>
                    <Button
                      component="a"
                      sx={{
                        color: textColor,
                        fontWeight: 500,
                        textTransform: "none",
                        transition: "color 0.2s ease-in-out",
                        "&:hover": { color: hoverTextColor },
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
                      bgcolor: ctaBgColor,
                      color: ctaTextColor,
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        bgcolor: ctaHoverBgColor,
                        color: "white",
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
                sx={{ color: textColor }}
                aria-label="menu"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Mobile Drawer */}
      <DrawerEl isOpen={drawerOpen} toggleMenu={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
