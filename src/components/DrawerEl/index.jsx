"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const DrawerEl = ({ isOpen, toggleMenu }) => {
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        toggleMenu(); // Close the drawer on scroll
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]); // Removed toggleMenu from dependencies to avoid unnecessary re-renders

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="fixed top-0 right-0 w-2/3 md:w-1/3 h-full bg-gray-900 shadow-xl z-[9999] p-6 flex flex-col space-y-6"
    >
      {/* Close Button */}
      <button
        className="self-end text-white hover:text-gray-400 transition duration-200"
        onClick={toggleMenu}
      >
        <X size={32} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 mt-4">
        {[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white text-lg font-medium hover:text-gray-400 transition duration-200"
            onClick={toggleMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* CTA Button */}
      <Link
        href="/demo"
        className="text-black text-lg font-semibold bg-white px-5 py-3 rounded-lg text-center hover:bg-gray-300 transition duration-200"
        onClick={toggleMenu}
      >
        Get a Free Demo
      </Link>
    </motion.div>
  );
};

export default DrawerEl;
