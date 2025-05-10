import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  DirectionsBike,
  EmojiEvents,
  Groups,
  LocalOffer,
  Security,
  SupportAgent,
  ThumbUp,
} from "@mui/icons-material"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zup Rides</h1>
              <p className="text-xl mb-6">Making transportation accessible, affordable, and enjoyable for everyone</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/zup-rides"
                  className="bg-white text-purple-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300"
                >
                  Explore Our Rides
                </Link>
                <Link
                  href="/zup-rides/contact"
                  className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-purple-700 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2">
              <div className="relative h-64 md:h-80">
                <Image
                  src="/placeholder.svg?height=320&width=480"
                  alt="Zup Rides Team"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=384&width=576" alt="Our Journey" fill className="object-cover" />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Zup Rides was born from a simple observation: urban transportation needed to be more flexible,
                affordable, and environmentally friendly. Founded in 2020 as a division of Webitya, we started with a
                small fleet of 10 scooters serving local college students.
              </p>
              <p>
                What began as a modest operation quickly grew as we recognized the demand for reliable short-term
                two-wheeler rentals. Today, we're proud to offer a diverse fleet of motorcycles and scooters to serve
                various needs—from hourly rentals for quick errands to monthly options for visitors and temporary
                residents.
              </p>
              <p>
                Our mission remains consistent: to provide safe, affordable, and convenient transportation options while
                reducing traffic congestion and environmental impact in our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Zup Rides</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best rental experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Security className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">
                All our vehicles undergo rigorous safety checks and regular maintenance to ensure they're in perfect
                condition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <LocalOffer className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Transparent pricing with no hidden fees. Our flexible plans cater to different budgets and requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <DirectionsBike className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Vehicles</h3>
              <p className="text-gray-600">
                From economical scooters to premium motorcycles, our diverse fleet meets various riding preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <SupportAgent className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is available round the clock to assist with any queries or emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbUp className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We go above and beyond to ensure our customers have the best experience possible with every rental.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmojiEvents className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in every aspect of our service, from vehicle quality to customer interactions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Groups className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We're committed to making a positive impact in the communities we serve through sustainable transportation
              options.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
              </div>
              <p className="text-gray-600 mb-4">
                "I've been renting from Zup Rides for my daily commute for the past 3 months. The bikes are always in
                excellent condition, and the monthly plan saves me a lot of money compared to other transportation
                options."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Rahul Sharma</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
              </div>
              <p className="text-gray-600 mb-4">
                "The hourly rental option is perfect for quick errands around the city. The booking process is seamless,
                and their customer service is exceptional. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
                <CheckCircle />
              </div>
              <p className="text-gray-600 mb-4">
                "As a college student, Zup Rides has been a game-changer for me. Affordable, convenient, and their
                weekly plans fit perfectly with my budget. The bikes are always clean and well-maintained."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Zup Rides?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who've discovered the convenience and affordability of our rental
              services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/zup-rides"
                className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300"
              >
                Explore Our Rides
              </Link>
              <Link
                href="/zup-rides/contact"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-purple-700 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
