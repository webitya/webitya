"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ name: "", phone: "", email: "", requirement: "" });
        setModalVisible(true);
      } else {
        alert("Error sending message. Try again later.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 mt-13">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500">
          Let’s Connect
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-3 text-[15px] leading-relaxed">
          Have questions or a project in mind? Fill out the form, and our team
          will get in touch with you shortly.
        </p>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-8 h-full">
          <h2 className="text-2xl font-semibold text-slate-800 mb-8">
            Contact Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Email</p>
                <a
                  href="mailto:webitya@gmail.com"
                  className="text-blue-700 text-sm hover:underline"
                >
                  webitya@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Phone</p>
                <a
                  href="tel:+917970409108"
                  className="text-blue-700 text-sm hover:underline"
                >
                  +91 7970409108
                </a>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Phone className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Phone</p>
                <a
                  href="tel:+917368899030"
                  className="text-blue-700 text-sm hover:underline"
                >
                  +91 7368899030
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Address</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Ganga Nagar, Harmu, Ranchi,<br /> Near Naman Vidya School
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Send Us a Message
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <textarea
            name="requirement"
            placeholder="Your Message"
            rows="4"
            value={formData.requirement}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-md font-semibold text-white text-sm bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-blue-700 transition-all cursor-pointer shadow-md"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-sm mx-auto border border-gray-100">
            <h3 className="text-lg font-semibold text-green-600">
              Thank You!
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              We’ve received your message and will get back to you soon.
            </p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
