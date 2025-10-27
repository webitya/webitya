"use client";

import Head from "next/head";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_webitya",
        "template_y9g4vob",
        formData,
        "Iw_1wMHg3mqNItEUH"
      );
      setFormData({ name: "", phone: "", email: "", requirement: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
    } finally {
      setIsLoading(false);
      setModalVisible(true); // Open modal in both success or failure
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Webitya</title>
        <meta
          name="description"
          content="Get in touch with Webitya for any inquiries or support."
        />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text mb-2">
            Let's Talk
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Have questions? Fill the form or reach out directly—we’re here to
            help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left Side - Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-start">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Reach Us</h2>

            <div className="flex items-start gap-3 mb-5">
              <Mail className="text-purple-600 mt-1" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a
                  href="mailto:webitya@gmail.com"
                  className="text-blue-600 text-sm hover:underline"
                >
                  webitya@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-5">
              <Phone className="text-purple-600 mt-1" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <a
                  href="tel:+917970409108"
                  className="text-blue-600 text-sm hover:underline"
                >
                  +91 7970409108
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <Phone className="text-purple-600 mt-1" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <a
                  href="tel:+917368899030"
                  className="text-blue-600 text-sm hover:underline"
                >
                  +91 7368899030
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-purple-600 mt-1" />
              <div>
                <p className="text-sm font-semibold">Address</p>
                <p className="text-sm text-gray-700">
                  Ganga Nagar, Harmu, Ranchi, Near Naman Vidya School
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 h-full space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Send Us a Message
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <textarea
              name="requirement"
              placeholder="Your Requirement or Message"
              value={formData.requirement}
              onChange={handleChange}
              rows="4"
              className="w-full p-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>

      {/* Glassmorphism Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/20">
          <div className="bg-white/80 border border-white/40 backdrop-blur-xl shadow-xl rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              We will contact you soon.
            </p>
            <button
              onClick={() => setModalVisible(false)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md text-sm hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
