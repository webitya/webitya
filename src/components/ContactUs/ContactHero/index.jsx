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
    <main className="max-w-6xl mx-auto px-4 py-16 mt-13">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
          Let’s Connect
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have questions or want to collaborate? Fill out the form and we’ll get in touch soon.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Contact Information
          </h2>

          {/* Email */}
          <div className="flex items-start gap-3 mb-5">
            <Mail className="text-indigo-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-slate-700">Email</p>
              <a
                href="mailto:webitya@gmail.com"
                className="text-indigo-600 text-sm hover:underline"
              >
                webitya@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 mb-5">
            <Phone className="text-indigo-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-slate-700">Phone</p>
              <div className="flex flex-col text-sm text-indigo-600">
                <a href="tel:+917970409108" className="hover:underline">
                  +91 7970409108
                </a>
                <a href="tel:+917368899030" className="hover:underline">
                  +91 7368899030
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="text-indigo-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-slate-700">Address</p>
              <p className="text-sm text-gray-600">
                Ganga Nagar, Harmu, Ranchi, Near Naman Vidya School
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Send Us a Message
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          />

          <textarea
            name="requirement"
            placeholder="Your Message"
            rows="4"
            value={formData.requirement}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md text-sm font-medium text-white transition 
              ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-green-600">
              Thank You!
            </h3>
            <p className="text-gray-700 mt-2 text-sm">
              We’ve received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
