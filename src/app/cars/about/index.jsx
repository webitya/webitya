import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Luxury Car Dealership",
  description: "Learn about our premium car dealership, our history, mission and team.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Our Showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">About Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering exceptional automotive experiences since 2010
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
            <Link href="/about" className="px-6 py-4 font-medium text-sm text-white relative whitespace-nowrap">
              About Us
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-4 font-medium text-sm text-gray-400 hover:text-white hover:bg-zinc-800 whitespace-nowrap"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-playfair">Our Story</h2>
            <div className="h-px bg-zinc-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded in 2010, Webitya Luxury Cars began with a simple vision: to provide discerning clients with
                access to the world's most exceptional automobiles. What started as a boutique dealership in Ranchi has
                grown into one of India's premier luxury car destinations.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our journey has been defined by an unwavering commitment to excellence, personalized service, and a deep
                passion for automotive artistry. We don't just sell cars – we curate experiences that celebrate the
                pinnacle of engineering, design, and performance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we represent the most prestigious automotive brands and offer a comprehensive suite of services
                designed to exceed the expectations of luxury car enthusiasts and collectors alike.
              </p>
            </div>
            <div className="relative h-[400px] rounded-sm overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Our Dealership History"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20 bg-gradient-to-br from-zinc-900 to-zinc-800 p-10 rounded-sm border border-zinc-800 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-playfair">Our Mission</h2>
            <div className="h-px bg-zinc-700 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-sm border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center">
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
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Excellence</h3>
              </div>
              <p className="text-gray-300">
                We are committed to excellence in every aspect of our business, from the vehicles we select to the
                service we provide.
              </p>
            </div>

            <div className="bg-black/30 p-6 rounded-sm border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Trust</h3>
              </div>
              <p className="text-gray-300">
                We build lasting relationships based on trust, transparency, and a genuine desire to match our clients
                with their perfect vehicle.
              </p>
            </div>

            <div className="bg-black/30 p-6 rounded-sm border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center">
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
                    <path d="M12 2v4" />
                    <path d="m6.41 6.41 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="m6.41 17.59 2.83-2.83" />
                    <path d="M12 18v4" />
                    <path d="m17.59 17.59-2.83-2.83" />
                    <path d="M18 12h4" />
                    <path d="m17.59 6.41-2.83 2.83" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
              </div>
              <p className="text-gray-300">
                We embrace innovation and continuously evolve our services to meet the changing needs of our discerning
                clientele.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-playfair">Our Team</h2>
            <div className="h-px bg-zinc-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                position: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Priya Sharma",
                position: "Sales Director",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Vikram Singh",
                position: "Head of Service",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Ananya Patel",
                position: "Client Relations",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <div key={index} className="bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 group">
                <div className="relative h-64 overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-playfair">Why Choose Us</h2>
            <div className="h-px bg-zinc-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white text-black w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
                  <p className="text-gray-300">
                    Every vehicle in our inventory is hand-selected for its exceptional quality, performance, and
                    desirability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white text-black w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                  <p className="text-gray-300">
                    Our staff consists of passionate automotive experts with deep knowledge of luxury and performance
                    vehicles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white text-black w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Comprehensive Services</h3>
                  <p className="text-gray-300">
                    From acquisition to maintenance, we offer end-to-end services to ensure an exceptional ownership
                    experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white text-black w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Personalized Experience</h3>
                  <p className="text-gray-300">
                    We tailor our approach to meet your specific needs, preferences, and aspirations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-sm border border-zinc-800 shadow-lg">
          <h2 className="text-3xl font-bold font-playfair mb-6">Ready to Experience Luxury?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Visit our showroom in Ranchi or contact us to schedule a personalized consultation with our team of
            automotive experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cars"
              className="bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold"
            >
              Explore Our Collection
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-sm hover:bg-white/10 transition font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
