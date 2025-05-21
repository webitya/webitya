"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-10">
              <Image
                src="/placeholder.svg?height=40&width=128"
                alt="Webitya Logo"
                width={128}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Services
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Courses
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Contact
            </Link>
            <Link
              href="tel:+919693245941"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              +91 9693245941
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="tel:+919693245941"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300 inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                +91 9693245941
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
