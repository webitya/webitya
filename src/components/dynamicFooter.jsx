"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"

export default function DynamicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              WEBITYA
            </h3>
            <p className="text-gray-400">Your trusted partner for digital marketing and web development solutions.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Web Design
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-blue-400">
                <FacebookIcon />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-pink-400">
                <InstagramIcon />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-blue-400">
                <LinkedInIcon />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="hover:text-blue-400">
                <TwitterIcon />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} WEBITYA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
