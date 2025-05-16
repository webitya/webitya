"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { carsData } from "@/components/Cars/data/cars-data"
import InquiryForm from "@/components/Cars/cars/inquiry-form"
import { useToast } from "@/components/Cars/ui/use-toast"
import CarSpecsChart from "@/components/Cars/cars/car-specs-chart"
import Car360Viewer from "@/components/Cars/cars/car-360-viewer"
import ColorConfigurator from "@/components/Cars/cars/color-configurator"
import VIPConcierge from "@/components/Cars/cars/vip-concierge"
import CarComparisonTool from "@/components/Cars/cars/car-comparison-tool"

export default function CarDetailPageClient({ params }) {
  const [car, setCar] = useState(null)
  const [relatedCars, setRelatedCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  useEffect(() => {
    // Find the car by slug
    const foundCar = carsData.find((car) => car.slug === params.slug)
    setCar(foundCar)
    setActiveImage(0)

    // Find related cars (same brand, excluding current car)
    if (foundCar) {
      const related = carsData.filter((c) => c.brand === foundCar.brand && c.id !== foundCar.id).slice(0, 3)
      setRelatedCars(related)
    }

    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.slug])

  const handleInquirySubmit = (data) => {
    toast({
      title: "Inquiry Submitted",
      description: `Thank you for your interest in the ${car.brand} ${car.name}. Our team will contact you shortly.`,
      duration: 5000,
    })
    setShowInquiryForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6 text-gray-500"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        <h1 className="text-4xl font-bold mb-4 font-playfair">Car Not Found</h1>
        <p className="text-gray-400 mb-8">The car you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/cars"
          className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg"
        >
          Browse All Cars
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specifications" },
    { id: "gallery", label: "Gallery" },
    { id: "configure", label: "Configure" },
    { id: "compare", label: "Compare" },
    { id: "vip", label: "VIP Services" },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <Image
          src={car.gallery?.[activeImage] || car.image || "/placeholder.svg"}
          alt={`${car.brand} ${car.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="container mx-auto">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-sm text-sm mb-4">
                {car.year} • {car.brand}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">{car.name}</h1>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{car.power}</span>
                    <span className="text-xs text-gray-400">HP</span>
                  </div>
                  <div className="h-10 w-px bg-gray-700"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{car.acceleration}s</span>
                    <span className="text-xs text-gray-400">0-60 MPH</span>
                  </div>
                  <div className="h-10 w-px bg-gray-700"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{car.topSpeed}</span>
                    <span className="text-xs text-gray-400">TOP SPEED</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-sm text-gray-400">Starting at</span>
                  <span className="text-3xl font-bold ml-2">${car.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Gallery Navigation */}
      {car.gallery && car.gallery.length > 0 && (
        <div className="bg-zinc-900 py-4 border-b border-zinc-800 sticky top-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {car.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative min-w-[100px] h-16 rounded-sm overflow-hidden transition-all ${
                    activeImage === index ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-[calc(4rem+1px)] z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Main Details */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold font-playfair">Overview</h2>
                  <div className="h-px bg-zinc-800 flex-grow"></div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-8">{car.description}</p>

                {/* Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
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
                        className="text-white"
                      >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M9 17h6" />
                        <path d="M9 13h6" />
                      </svg>
                      <p className="text-gray-400 text-sm">Engine</p>
                    </div>
                    <p className="text-xl font-semibold">{car.engine}</p>
                  </div>
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
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
                        className="text-white"
                      >
                        <path d="M13 3v18" />
                        <rect width="8" height="8" x="8" y="13" rx="1" />
                        <path d="M18 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z" />
                      </svg>
                      <p className="text-gray-400 text-sm">Power</p>
                    </div>
                    <p className="text-xl font-semibold">{car.power} hp</p>
                  </div>
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
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
                        className="text-white"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <p className="text-gray-400 text-sm">0-60 mph</p>
                    </div>
                    <p className="text-xl font-semibold">{car.acceleration}s</p>
                  </div>
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
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
                        className="text-white"
                      >
                        <path d="M2 12h10" />
                        <path d="M9 4v16" />
                        <path d="m3 9 3 3-3 3" />
                        <circle cx="17" cy="12" r="3" />
                        <path d="M17 17a5 5 0 0 0 5-5" />
                        <path d="M17 7a5 5 0 0 1 5 5" />
                      </svg>
                      <p className="text-gray-400 text-sm">Top Speed</p>
                    </div>
                    <p className="text-xl font-semibold">{car.topSpeed} mph</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold font-playfair">Features</h2>
                    <div className="h-px bg-zinc-800 flex-grow"></div>
                  </div>
                  <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
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
                            className="text-white mr-3"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold font-playfair">Performance</h2>
                    <div className="h-px bg-zinc-800 flex-grow"></div>
                  </div>
                  <div className="bg-zinc-900 p-6 rounded-sm border border-zinc-800 shadow-lg">
                    <CarSpecsChart car={car} />
                  </div>
                </div>
              </div>

              {/* Pricing and CTA */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-sm border border-zinc-800 sticky top-32 shadow-lg"
                >
                  <div className="mb-6">
                    <p className="text-gray-400">Price</p>
                    <p className="text-3xl font-bold">${car.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-400 mt-1">Excluding taxes & delivery</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <button
                      className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      onClick={() => {
                        toast({
                          title: "Test Drive Scheduled",
                          description: "Our team will contact you shortly to confirm your test drive appointment.",
                          duration: 5000,
                        })
                      }}
                    >
                      Schedule a Test Drive
                    </button>
                    <button
                      className="w-full bg-transparent border border-white text-white py-3 rounded-sm hover:bg-white/10 transition font-semibold"
                      onClick={() => setShowInquiryForm(true)}
                    >
                      Inquire About This Car
                    </button>
                  </div>

                  <div className="border-t border-zinc-800 pt-6">
                    <p className="text-center text-gray-400 mb-4">Contact our sales team</p>
                    <a
                      href="tel:+919693245941"
                      className="flex items-center justify-center text-white hover:text-gray-300 transition"
                    >
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
                        className="mr-2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      +91 9693245941
                    </a>
                  </div>

                  {/* Finance Calculator */}
                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-semibold mb-4">Finance Calculator</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Down Payment</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            type="number"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2 pl-8 pr-3 text-white"
                            defaultValue={Math.round(car.price * 0.2)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Loan Term (months)</label>
                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2 px-3 text-white">
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60" selected>
                            60 months
                          </option>
                          <option value="72">72 months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Interest Rate (%)</label>
                        <input
                          type="number"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm py-2 px-3 text-white"
                          defaultValue="3.99"
                          step="0.01"
                        />
                      </div>
                      <div className="pt-4 border-t border-zinc-800">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Monthly Payment:</span>
                          <span className="font-semibold">
                            ${Math.round(((car.price * 0.8) / 60) * 1.1).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Cost:</span>
                          <span className="font-semibold">${Math.round(car.price * 1.1).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-sm border border-zinc-800 shadow-lg p-8">
                <h2 className="text-3xl font-bold font-playfair mb-8">Technical Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Engine & Performance */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">Engine & Performance</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Engine Type</td>
                          <td className="py-3 font-medium">{car.engine}</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Power</td>
                          <td className="py-3 font-medium">{car.power} hp</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Torque</td>
                          <td className="py-3 font-medium">{Math.round(car.power * 0.8)} lb-ft</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">0-60 mph</td>
                          <td className="py-3 font-medium">{car.acceleration} seconds</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Top Speed</td>
                          <td className="py-3 font-medium">{car.topSpeed} mph</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Transmission</td>
                          <td className="py-3 font-medium">8-Speed Automatic</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-400">Drive Type</td>
                          <td className="py-3 font-medium">All-Wheel Drive</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Dimensions & Weight */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">Dimensions & Weight</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Length</td>
                          <td className="py-3 font-medium">5,152 mm</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Width</td>
                          <td className="py-3 font-medium">2,011 mm</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Height</td>
                          <td className="py-3 font-medium">1,460 mm</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Wheelbase</td>
                          <td className="py-3 font-medium">3,165 mm</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Curb Weight</td>
                          <td className="py-3 font-medium">2,490 kg</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Cargo Volume</td>
                          <td className="py-3 font-medium">368 liters</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-400">Fuel Tank</td>
                          <td className="py-3 font-medium">82 liters</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Features & Technology */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">Features & Technology</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Infotainment</td>
                          <td className="py-3 font-medium">12.3" Touchscreen Display</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Sound System</td>
                          <td className="py-3 font-medium">18-Speaker Premium Audio</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Connectivity</td>
                          <td className="py-3 font-medium">Bluetooth, WiFi, USB-C</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Driver Assistance</td>
                          <td className="py-3 font-medium">Advanced Driver Assistance System</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Climate Control</td>
                          <td className="py-3 font-medium">4-Zone Automatic</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Seating</td>
                          <td className="py-3 font-medium">Heated & Ventilated, Massage</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-400">Interior Lighting</td>
                          <td className="py-3 font-medium">Customizable Ambient Lighting</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Warranty & Maintenance */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">Warranty & Maintenance</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Basic Warranty</td>
                          <td className="py-3 font-medium">4 Years / 80,000 km</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Powertrain Warranty</td>
                          <td className="py-3 font-medium">6 Years / 100,000 km</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Maintenance</td>
                          <td className="py-3 font-medium">3 Years Complimentary</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Roadside Assistance</td>
                          <td className="py-3 font-medium">4 Years Unlimited</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                          <td className="py-3 text-gray-400">Corrosion Protection</td>
                          <td className="py-3 font-medium">12 Years Unlimited</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-400">Battery Warranty</td>
                          <td className="py-3 font-medium">8 Years / 160,000 km</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold"
                  >
                    Request Full Specifications
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold font-playfair">Gallery</h2>
                <div className="h-px bg-zinc-800 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {car.gallery &&
                  car.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="relative h-64 overflow-hidden rounded-sm group cursor-pointer"
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${car.brand} ${car.name} - Gallery Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
              </div>

              <div className="mt-12">
                <Car360Viewer carName={`${car.brand} ${car.name}`} />
              </div>
            </motion.div>
          )}

          {activeTab === "configure" && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold font-playfair">Configure Your {car.name}</h2>
                <div className="h-px bg-zinc-800 flex-grow"></div>
              </div>

              <ColorConfigurator car={car} />
            </motion.div>
          )}

          {activeTab === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold font-playfair">Compare With Other Models</h2>
                <div className="h-px bg-zinc-800 flex-grow"></div>
              </div>

              <CarComparisonTool initialCars={[car]} />
            </motion.div>
          )}

          {activeTab === "vip" && (
            <motion.div
              key="vip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold font-playfair">VIP Experience</h2>
                <div className="h-px bg-zinc-800 flex-grow"></div>
              </div>

              <VIPConcierge />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold font-playfair">More {car.brand} Models</h2>
            <div className="h-px bg-zinc-800 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCars.map((relatedCar) => (
              <motion.div key={relatedCar.id} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={`/cars/${relatedCar.slug}`}>
                  <div className="bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 hover:border-zinc-700 transition duration-300 shadow-lg group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedCar.image || "/placeholder.svg"}
                        alt={relatedCar.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white">{relatedCar.name}</h3>
                          <p className="text-gray-400 text-sm">{relatedCar.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">${relatedCar.price.toLocaleString()}</p>
                          <p className="text-gray-400 text-xs">{relatedCar.year}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">View Details</span>
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
                            className="text-white group-hover:translate-x-1 transition-transform"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Inquiry Form Modal */}
      <AnimatePresence>
        {showInquiryForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-sm border border-zinc-800 p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-playfair">
                  Inquire About {car.brand} {car.name}
                </h3>
                <button onClick={() => setShowInquiryForm(false)} className="text-gray-400 hover:text-white">
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <InquiryForm car={car} onSubmit={handleInquirySubmit} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
