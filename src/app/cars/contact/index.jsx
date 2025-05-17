"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Replace these with your actual EmailJS service, template, and user IDs
      const result = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        },
        "YOUR_PUBLIC_KEY",
      )

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitError("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Contact Us" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to assist you with any inquiries about our luxury vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className="px-6 py-4 font-medium text-sm text-gray-400 hover:text-white hover:bg-zinc-800 whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="px-6 py-4 font-medium text-sm text-gray-400 hover:text-white hover:bg-zinc-800 whitespace-nowrap"
            >
              Cars
            </Link>
            <Link
              href="/about"
              className="px-6 py-4 font-medium text-sm text-gray-400 hover:text-white hover:bg-zinc-800 whitespace-nowrap"
            >
              About Us
            </Link>
            <Link href="/contact" className="px-6 py-4 font-medium text-sm text-white relative whitespace-nowrap">
              Contact
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold font-playfair">Get In Touch</h2>
              <div className="h-px bg-zinc-800 flex-grow"></div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-sm border border-zinc-800 shadow-lg">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-sm mb-6">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full bg-zinc-800 border ${
                          errors.name ? "border-red-500" : "border-zinc-700"
                        } rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white`}
                        placeholder="Your name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full bg-zinc-800 border ${
                          errors.email ? "border-red-500" : "border-zinc-700"
                        } rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white`}
                        placeholder="Your email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                        placeholder="Your phone number"
                        {...register("phone")}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className={`w-full bg-zinc-800 border ${
                          errors.subject ? "border-red-500" : "border-zinc-700"
                        } rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white`}
                        placeholder="Subject of your message"
                        {...register("subject", { required: "Subject is required" })}
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`w-full bg-zinc-800 border ${
                        errors.message ? "border-red-500" : "border-zinc-700"
                      } rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white`}
                      placeholder="Your message"
                      {...register("message", { required: "Message is required" })}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold font-playfair">Contact Information</h2>
              <div className="h-px bg-zinc-800 flex-grow"></div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-sm border border-zinc-800 shadow-lg mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Phone</h3>
                    <p className="text-gray-400">Feel free to call us during business hours</p>
                    <a
                      href="tel:+919693245941"
                      className="text-white hover:text-gray-300 font-semibold mt-2 inline-block"
                    >
                      +91 9693245941
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email</h3>
                    <p className="text-gray-400">We'll respond to your email promptly</p>
                    <a
                      href="mailto:cars.webitya@gmail.com"
                      className="text-white hover:text-gray-300 font-semibold mt-2 inline-block"
                    >
                      cars.webitya@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Location</h3>
                    <p className="text-gray-400">Visit our luxury showroom</p>
                    <p className="text-white font-semibold mt-2">
                      Webitya Luxury Cars
                      <br />
                      Ranchi, Jharkhand
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Business Hours</h3>
                    <p className="text-gray-400">We're available to serve you</p>
                    <div className="mt-2 space-y-1">
                      <p className="flex justify-between">
                        <span className="text-gray-400">Monday - Friday:</span>
                        <span className="text-white">9:00 AM - 7:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Saturday:</span>
                        <span className="text-white">10:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Sunday:</span>
                        <span className="text-white">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-zinc-900 rounded-sm border border-zinc-800 shadow-lg overflow-hidden">
              <div className="relative h-[400px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.91484915413!2d85.25292449999999!3d23.3432048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1652345678901!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-8">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="bg-zinc-900 border border-zinc-800 w-14 h-14 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-zinc-900 border border-zinc-800 w-14 h-14 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-zinc-900 border border-zinc-800 w-14 h-14 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-zinc-900 border border-zinc-800 w-14 h-14 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
