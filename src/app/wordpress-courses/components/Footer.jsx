import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-10">
                <Image
                  src="/placeholder.svg?height=40&width=128"
                  alt="Webitya Logo"
                  width={128}
                  height={40}
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Boost your digital presence with result-driven marketing strategies and bespoke web development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919693245941" className="text-gray-400 hover:text-white transition duration-300">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white transition duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Basic WordPress Course
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Blogging WordPress Course
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                  E-commerce WordPress Course
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition duration-300">
                  All Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <p>Email: info@webitya.com</p>
              </li>
              <li>
                <p>Phone: +91 9693245941</p>
              </li>
              <li>
                <p>Address: Webitya Web Services, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Webitya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
