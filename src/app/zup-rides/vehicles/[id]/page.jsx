"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  ArrowBack,
  TwoWheeler,
  ElectricBike,
  DirectionsBike,
  Speed,
  LocalGasStation,
  ColorLens,
  Check,
  Star,
  AccessTime,
  CalendarMonth,
  Weekend,
  DateRange,
  Info,
  ShoppingCart,
} from "@mui/icons-material"
import { getVehicleById, getPopularVehicles } from "../../../../components/ZupRides/data/vehicles"
import Footer from "@/components/FooterEl"

export default function VehicleDetailsPage({ params }) {
  const { id } = params
  const searchParams = useSearchParams()
  const showBookingForm = searchParams.get("book") === "true"

  const vehicle = getVehicleById(id)
  const relatedVehicles = getPopularVehicles(3)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(vehicle?.colors[0] || "")
  const [selectedPlan, setSelectedPlan] = useState("daily")
  const [activeTab, setActiveTab] = useState("specifications")
  const [showBooking, setShowBooking] = useState(showBookingForm)

  useEffect(() => {
    // Scroll to booking form if book=true in URL
    if (showBookingForm) {
      const bookingElement = document.getElementById("booking-section")
      if (bookingElement) {
        setTimeout(() => {
          bookingElement.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    }
  }, [showBookingForm])

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <Link href="/zup-rides/vehicles" className="text-purple-600 hover:underline">
            Back to vehicles
          </Link>
        </div>
      </div>
    )
  }

  const allImages = [vehicle.mainImage, ...vehicle.images]

  const getVehicleIcon = (type) => {
    const lowerType = type.toLowerCase()
    if (lowerType.includes("electric")) return <ElectricBike className="text-purple-600" />
    if (lowerType.includes("scooter")) return <DirectionsBike className="text-purple-600" />
    return <TwoWheeler className="text-purple-600" />
  }

  const getPlanIcon = (plan) => {
    switch (plan) {
      case "hourly":
        return <AccessTime />
      case "daily":
        return <CalendarMonth />
      case "weekly":
        return <Weekend />
      case "monthly":
        return <DateRange />
      default:
        return <AccessTime />
    }
  }

  return (
  <>
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/zup-rides" className="hover:text-purple-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/zup-rides/vehicles" className="hover:text-purple-600">
              Vehicles
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{vehicle.name}</span>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/zup-rides/vehicles" className="inline-flex items-center text-purple-600 hover:underline mb-6">
          <ArrowBack className="w-4 h-4 mr-1" /> Back to vehicles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-4">
              <Image
                src={allImages[selectedImage] || "/placeholder.svg"}
                alt={vehicle.name}
                fill
                className="object-cover"
                priority
              />
              {!vehicle.availability && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Not Available
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-purple-600" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <div className="flex items-center mb-2">
              {getVehicleIcon(vehicle.type)}
              <h1 className="text-3xl font-bold text-gray-900 ml-2">{vehicle.name}</h1>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">{vehicle.type}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 mx-2">{vehicle.brand}</span>
              <div className="flex items-center text-yellow-400 ml-2">
                <Star />
                <span className="text-gray-700 ml-1">{vehicle.popularityScore.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{vehicle.description}</p>

            {/* Key Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {vehicle.specifications.engine && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <LocalGasStation className="w-5 h-5 mr-1" />
                    <span className="text-sm">Engine</span>
                  </div>
                  <div className="text-gray-900 font-medium">{vehicle.specifications.engine.split(",")[0]}</div>
                </div>
              )}
              {vehicle.specifications.motor && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <ElectricBike className="w-5 h-5 mr-1" />
                    <span className="text-sm">Motor</span>
                  </div>
                  <div className="text-gray-900 font-medium">{vehicle.specifications.motor}</div>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Speed className="w-5 h-5 mr-1" />
                  <span className="text-sm">Mileage</span>
                </div>
                <div className="text-gray-900 font-medium">{vehicle.specifications.mileage}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <TwoWheeler className="w-5 h-5 mr-1" />
                  <span className="text-sm">Top Speed</span>
                </div>
                <div className="text-gray-900 font-medium">{vehicle.specifications.topSpeed}</div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <ColorLens className="text-purple-600 mr-2" /> Available Colors
              </h3>
              <div className="flex flex-wrap gap-3">
                {vehicle.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-full border ${
                      selectedColor === color
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {selectedColor === color && <Check className="w-4 h-4 mr-1" />}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Rental Plans</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(vehicle.pricing).map(([plan, price]) => (
                  <button
                    key={plan}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-3 rounded-lg border text-center ${
                      selectedPlan === plan
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex justify-center mb-1">{getPlanIcon(plan)}</div>
                    <div className="font-medium capitalize">{plan}</div>
                    <div className="text-lg font-bold">₹{price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* <button
                onClick={() => setShowBooking(true)}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300 flex items-center justify-center"
              >
                <ShoppingCart className="mr-2" /> Book Now
              </button> */}
                       <Link
                href={`/zup-rides/booking?vehicleId=${vehicle.id}&plan=daily`}
                className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition duration-300 text-sm"
              >
                 <ShoppingCart className="mr-2" />  Book Now
              </Link>
              <Link
                href="/zup-rides/contact"
                className="flex-1 bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition duration-300 flex items-center justify-center"
              >
                <Info className="mr-2" /> Request Info
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "specifications"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "features"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("terms")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "terms"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Rental Terms
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div key={key} className="py-2 border-b border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "terms" && (
              <div className="prose max-w-none">
                <h3>Rental Terms and Conditions</h3>
                <p>
                  Please review our rental terms and conditions before booking. By proceeding with the booking, you
                  agree to comply with these terms.
                </p>

                <h4>Requirements</h4>
                <ul>
                  <li>Valid driver's license</li>
                  <li>Minimum age: 18 years</li>
                  <li>Security deposit: ₹{vehicle.pricing.daily * 2} (refundable)</li>
                  <li>Valid ID proof</li>
                </ul>

                <h4>Rental Includes</h4>
                <ul>
                  <li>Helmet for rider</li>
                  <li>Basic insurance</li>
                  <li>24/7 roadside assistance</li>
                  <li>Regular maintenance</li>
                </ul>

                <h4>Cancellation Policy</h4>
                <ul>
                  <li>More than 48 hours before pickup: Full refund</li>
                  <li>24-48 hours before pickup: 50% refund</li>
                  <li>Less than 24 hours before pickup: No refund</li>
                </ul>

                <h4>Usage Restrictions</h4>
                <ul>
                  <li>No off-road use (except for adventure bikes)</li>
                  <li>No racing or stunts</li>
                  <li>No overloading beyond capacity</li>
                  <li>No commercial use without prior permission</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        {showBooking && (
          <div id="booking-section" className="mt-16 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Book Your Ride</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="pickup-date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="return-date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="rental-plan" className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Plan
                </label>
                <select
                  id="rental-plan"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="hourly">Hourly - ₹{vehicle.pricing.hourly}/hour</option>
                  <option value="daily">Daily - ₹{vehicle.pricing.daily}/day</option>
                  <option value="weekly">Weekly - ₹{vehicle.pricing.weekly}/week</option>
                  <option value="monthly">Monthly - ₹{vehicle.pricing.monthly}/month</option>
                </select>
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color Preference
                </label>
                <select
                  id="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  {vehicle.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
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
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Any special requirements or questions?"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("terms")}
                      className="text-purple-600 hover:underline"
                    >
                      rental terms and conditions
                    </button>
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Related Vehicles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVehicles
              .filter((relatedVehicle) => relatedVehicle.id !== vehicle.id)
              .slice(0, 3)
              .map((relatedVehicle) => (
                <Link
                  key={relatedVehicle.id}
                  href={`/zup-rides/vehicles/${relatedVehicle.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedVehicle.mainImage || "/placeholder.svg"}
                      alt={relatedVehicle.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {getVehicleIcon(relatedVehicle.type)}
                      <h3 className="text-xl font-semibold text-gray-900 ml-2 group-hover:text-purple-600 transition-colors duration-300">
                        {relatedVehicle.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {relatedVehicle.type} | {relatedVehicle.brand}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-purple-700 font-bold">₹{relatedVehicle.pricing.daily}/day</div>
                      <span className="text-purple-600 group-hover:underline">View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  )
}
