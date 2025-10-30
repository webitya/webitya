"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"

export default function DynamicHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "/contact-us" },
  ]

  return (
    <>
      <div className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <PhoneIcon fontSize="small" />
              <span>+91 XXXXXXXXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <LocationOnIcon fontSize="small" />
              <span>Ranchi, Jharkhand</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-100">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-100">
              LinkedIn
            </a>
            <a href="#" className="hover:text-blue-100">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                WEBITYA
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="tel:+91XXXXXXXXXX"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium text-sm"
              >
                <PhoneIcon fontSize="small" />
                Call Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+91XXXXXXXXXX"
                className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm"
              >
                Call Now
              </a>
            </motion.nav>
          )}
        </div>
      </header>
    </>
  )
}
