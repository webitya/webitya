"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const DrawerEl = ({ isOpen, toggleMenu }) => {
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        toggleMenu();
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="fixed top-0 right-0 w-2/3 md:w-1/3 h-full bg-white shadow-xl z-[9999] p-0 flex flex-col"
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          className="text-black hover:text-gray-500 transition duration-200"
          onClick={toggleMenu}
        >
          <X size={32} />
        </button>
      </div>

      {/* Drawer Content with MUI List */}
      <Box sx={{ px: 2 }}>
        <List>
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link key={link.name} href={link.path} passHref>
              <ListItem
                button
                component="a"
                onClick={toggleMenu}
              >
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
          ))}

          <Divider sx={{ my: 1 }} />

          <Link href="/appointment" passHref>
            <ListItem
              button
              component="a"
              onClick={toggleMenu}
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: 1,
                mt: 1,
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              <ListItemText
                primary="Book Appointment"
                primaryTypographyProps={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              />
            </ListItem>
          </Link>
        </List>
      </Box>
    </motion.div>
  );
};

export default DrawerEl;
