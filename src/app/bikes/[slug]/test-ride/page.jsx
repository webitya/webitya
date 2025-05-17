"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Check } from "lucide-react"
import { bikesData } from "@/components/Bikes/data/bikes-data"
import { sendTestRideBooking } from "@/components/Bikes/lib/email-service"
import { toast } from "@/components/Bikes/components/ui/use-toast"
import { Toaster } from "@/components/Bikes/components/ui/toaster"
import Footer from "@/components/FooterEl"

export default function TestRidePage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const [bike, setBike] = useState(null)
  const [loading, setLoading] = useState(false)
  const [availableDates, setAvailableDates] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })

  useEffect(() => {
    const foundBike = bikesData.find((b) => b.slug === slug)
    if (foundBike) {
      setBike(foundBike)

      // Generate available dates (next 14 days)
      const dates = []
      const today = new Date()
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        dates.push(date.toISOString().split("T")[0])
      }
      setAvailableDates(dates)

      // Set available time slots
      setAvailableTimeSlots([
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
      ])

      // Set page title
      document.title = `Book Test Ride - ${foundBike.name} | Webitya Bikes`
    }
  }, [slug])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendTestRideBooking({
        ...formData,
        bikeName: bike.name,
      })

      toast({
        title: "Test Ride Booked",
        description: "Your test ride has been scheduled. We'll contact you to confirm.",
        variant: "success",
      })

      // Redirect after successful booking
      setTimeout(() => {
        router.push(`/bikes/${slug}?booked=true`)
      }, 2000)
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your test ride. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // If bike not found
  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Bike not found</h1>
        <p className="mb-8">The bike you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/bikes"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Back to Bikes
        </Link>
      </div>
    )
  }

  return (
   <>
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster />
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-red-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/bikes" className="text-gray-700 hover:text-red-600 text-sm">
                    Bikes
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href={`/bikes/${slug}`} className="text-gray-700 hover:text-red-600 text-sm">
                    {bike.name}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 text-sm">Book Test Ride</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Book a Test Ride</h1>
              <p className="text-gray-600 mb-6">Experience the {bike.name} firsthand</p>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={bike.images[0] || "/placeholder.svg?height=300&width=400"}
                      alt={bike.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">{bike.name}</h2>
                    <p className="text-gray-600">{bike.tagline}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-lg font-bold text-red-600">₹{bike.price.toLocaleString()}</span>
                      {bike.oldPrice && (
                        <span className="ml-2 text-gray-500 line-through">₹{bike.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{bike.engineCC}cc Engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{bike.power} bhp Power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{bike.mileage} kmpl Mileage</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Your Phone"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                            required
                          >
                            <option value="">Select a date</option>
                            {availableDates.map((date) => (
                              <option key={date} value={date}>
                                {new Date(date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </option>
                            ))}
                          </select>
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                            required
                          >
                            <option value="">Select a time</option>
                            {availableTimeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Any specific requirements or questions..."
                      ></textarea>
                    </div>

                    <div className="flex items-center mt-6">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-red-600 hover:underline">
                          terms and conditions
                        </a>
                      </label>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Link
                        href={`/bikes/${slug}`}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors ${
                          loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? "Booking..." : "Book Test Ride"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">What to expect during your test ride</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Bring your valid driving license and wear appropriate riding gear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Our expert will explain all features and controls before the ride</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Test ride duration is approximately 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Our team will be available to answer all your questions after the ride</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  )
}
