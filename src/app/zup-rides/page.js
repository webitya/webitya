import Link from "next/link"
import Image from "next/image"
import {
  TwoWheeler,
  DirectionsCar,
  AccessTime,
  CalendarMonth,
  Weekend,
  DateRange,
  ArrowForward,
  DirectionsBike,
  ElectricBike,
  Speed,
  LocalGasStation,
} from "@mui/icons-material"
import { getPopularVehicles } from "../../components/ZupRides/data/vehicles"

export default function ZupRides() {
  const popularVehicles = getPopularVehicles(3)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Zup Rides</h1>
              <p className="text-xl md:text-2xl mb-8">Affordable bike and scooty rentals for your convenience</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/zup-rides/vehicles"
                  className="bg-white text-purple-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300"
                >
                  Explore Vehicles
                </Link>
                <Link
                  href="#pricing"
                  className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-purple-700 transition duration-300"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2">
              <div className="relative h-64 md:h-80">
                <Image
                  src="/placeholder.svg?height=320&width=480"
                  alt="Zup Rides Motorcycles"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Vehicles Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our most popular bikes and scooters for your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image src={vehicle.mainImage || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {vehicle.type.toLowerCase().includes("electric") ? (
                    <ElectricBike className="text-purple-600 mr-2" />
                  ) : vehicle.type.toLowerCase().includes("scooter") ? (
                    <DirectionsBike className="text-purple-600 mr-2" />
                  ) : (
                    <TwoWheeler className="text-purple-600 mr-2" />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">{vehicle.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  {vehicle.type} | {vehicle.brand}
                </p>
                <p className="text-gray-600 mb-4">{vehicle.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                    <Speed className="text-gray-500 w-4 h-4 mr-1" />
                    <span>{vehicle.specifications.mileage}</span>
                  </div>
                  {vehicle.specifications.engine ? (
                    <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                      <LocalGasStation className="text-gray-500 w-4 h-4 mr-1" />
                      <span>{vehicle.specifications.engine.split(",")[0]}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                      <ElectricBike className="text-gray-500 w-4 h-4 mr-1" />
                      <span>Electric</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-purple-700 font-bold">From ₹{vehicle.pricing.hourly}/hour</div>
                  <div className="flex gap-2">
                    <Link
                      href={`/zup-rides/vehicles/${vehicle.id}`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/zup-rides/vehicles"
            className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
          >
            View All Vehicles <ArrowForward className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Pricing Options</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose the rental duration that suits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hourly Pricing */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <AccessTime className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Hourly</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-purple-700">₹99 - ₹299</span>
                  <span className="text-gray-600">/hour</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Flexible pickup & drop</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Helmet included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Fuel included</span>
                  </li>
                </ul>
                <Link
                  href="/zup-rides/vehicles"
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Daily Pricing */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <CalendarMonth className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Daily</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-purple-700">₹499 - ₹1499</span>
                  <span className="text-gray-600">/day</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">24-hour rental</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Helmet included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Fuel included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Roadside assistance</span>
                  </li>
                </ul>
                <Link
                  href="/zup-rides/vehicles"
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Weekly Pricing */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-purple-600">
              <div className="bg-purple-600 text-white text-center py-2 font-medium">POPULAR CHOICE</div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Weekend className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Weekly</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-purple-700">₹2,499 - ₹7,499</span>
                  <span className="text-gray-600">/week</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">7-day rental</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Helmet included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Fuel included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Roadside assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">15% discount on rate</span>
                  </li>
                </ul>
                <Link
                  href="/zup-rides/vehicles"
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Monthly Pricing */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <DateRange className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Monthly</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-purple-700">₹7,999 - ₹22,999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">30-day rental</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Helmet included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Fuel included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Roadside assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">25% discount on rate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Free maintenance</span>
                  </li>
                </ul>
                <Link
                  href="/zup-rides/vehicles"
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Rentals Coming Soon */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Car Rentals</h2>
              <div className="inline-block bg-yellow-500 text-black font-bold px-4 py-1 rounded-full mb-6">
                Coming Soon
              </div>
              <p className="text-gray-300 mb-6">
                We're expanding our fleet to include premium cars for your travel needs. Stay tuned for exciting offers
                and a wide range of vehicles.
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                Get Notified
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Car Rental Coming Soon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <DirectionsCar className="text-white text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Browse our collection of bikes and scooters and find your perfect ride today.
              </p>
              <Link
                href="/zup-rides/vehicles"
                className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300"
              >
                Explore All Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
