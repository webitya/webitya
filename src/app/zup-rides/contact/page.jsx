import Image from "next/image"
import { Call, Email, LocationOn, WhatsApp, Facebook, Instagram, Twitter } from "@mui/icons-material"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">Have questions or need assistance? We're here to help!</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Call className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Our team is available to assist you</p>
            <a href="tel:+919693245941" className="text-purple-600 font-medium hover:underline">
              +91 9693245941
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Email className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">Send us your queries anytime</p>
            <a href="mailto:info@webitya.com" className="text-purple-600 font-medium hover:underline">
              info@webitya.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LocationOn className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">Come to our office location</p>
            <p className="text-purple-600 font-medium">Webitya Office, India</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Rental Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Social Media */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-64 mb-8">
              <div className="relative w-full h-full">
                <Image src="/placeholder.svg?height=256&width=512" alt="Map Location" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="bg-white px-4 py-2 rounded-lg shadow-md">Map Placeholder</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <WhatsApp className="text-green-600" />
                </div>
                <span className="font-medium">WhatsApp</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Facebook className="text-blue-600" />
                </div>
                <span className="font-medium">Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Instagram className="text-pink-600" />
                </div>
                <span className="font-medium">Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Twitter className="text-blue-400" />
                </div>
                <span className="font-medium">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">What documents do I need to rent a bike?</h3>
              <p className="text-gray-600">
                You'll need a valid driver's license, a government-issued ID proof, and a security deposit. For
                international customers, a passport and international driving permit are required.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you provide helmets with rentals?</h3>
              <p className="text-gray-600">
                Yes, we provide DOT-certified helmets with all our rentals at no extra cost. We prioritize safety and
                ensure all our helmets are sanitized between uses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">What happens if the bike breaks down?</h3>
              <p className="text-gray-600">
                We offer 24/7 roadside assistance. In case of a breakdown, simply call our emergency number, and we'll
                arrange for assistance or a replacement vehicle as soon as possible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I extend my rental period?</h3>
              <p className="text-gray-600">
                Yes, you can extend your rental period subject to availability. Please inform us at least 24 hours
                before your scheduled return time to ensure seamless extension.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">What is your cancellation policy?</h3>
              <p className="text-gray-600">
                Cancellations made 48 hours before the scheduled pickup time receive a full refund. Cancellations within
                24-48 hours receive a 50% refund, while those within 24 hours are non-refundable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you offer pickup and drop-off services?</h3>
              <p className="text-gray-600">
                Yes, we offer pickup and drop-off services within city limits for a nominal fee. Please book this
                service in advance to ensure availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
