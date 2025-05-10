const vehicles = [
  {
    id: "sport-bike-1",
    name: "Pulsar NS200",
    type: "Sport Bike",
    brand: "Bajaj",
    shortDescription: "Powerful sport bike for thrilling rides",
    description:
      "The Pulsar NS200 is a performance-oriented motorcycle designed for riders who crave speed and agility. With its aggressive styling and powerful engine, it delivers an exhilarating riding experience while maintaining good fuel efficiency for daily commutes.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 199,
      daily: 999,
      weekly: 4999,
      monthly: 14999,
    },
    specifications: {
      engine: "199.5 cc, Single Cylinder, 4 Stroke",
      power: "24.5 PS @ 9750 rpm",
      torque: "18.5 Nm @ 8000 rpm",
      mileage: "35-40 kmpl",
      topSpeed: "136 km/h",
      weight: "156 kg",
      fuelCapacity: "12 liters",
      brakes: "Disc (Front & Rear)",
      suspension: "Telescopic Fork (Front), Monoshock (Rear)",
      tires: "Tubeless",
    },
    colors: ["Racing Red", "Graphite Black", "Mirage White"],
    features: [
      "Digital Console",
      "LED Tail Lamp",
      "Dual Channel ABS",
      "Perimeter Frame",
      "Clip-On Handlebars",
      "Backlit Switches",
    ],
    availability: true,
    popularityScore: 9.2,
    category: "sport",
    priceCategory: "premium",
  },
  {
    id: "cruiser-bike-1",
    name: "Royal Enfield Classic 350",
    type: "Cruiser Bike",
    brand: "Royal Enfield",
    shortDescription: "Iconic cruiser for comfortable long rides",
    description:
      "The Royal Enfield Classic 350 combines timeless styling with modern engineering to deliver a unique riding experience. Its comfortable ergonomics and torquey engine make it perfect for long journeys, while its iconic thump and heritage appeal make every ride special.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 249,
      daily: 1199,
      weekly: 5999,
      monthly: 17999,
    },
    specifications: {
      engine: "349.34 cc, Single Cylinder, 4 Stroke",
      power: "20.2 PS @ 6100 rpm",
      torque: "27 Nm @ 4000 rpm",
      mileage: "30-35 kmpl",
      topSpeed: "120 km/h",
      weight: "195 kg",
      fuelCapacity: "13 liters",
      brakes: "Disc (Front), Drum (Rear)",
      suspension: "Telescopic Fork (Front), Twin Shocks (Rear)",
      tires: "Tube Type",
    },
    colors: ["Stealth Black", "Signals Sage Green", "Chrome Bronze", "Gunmetal Grey"],
    features: [
      "Halogen Headlamp",
      "Analog Instrument Cluster",
      "Electric Start",
      "Single Channel ABS",
      "Spoke Wheels",
      "Dual Seat",
    ],
    availability: true,
    popularityScore: 9.5,
    category: "cruiser",
    priceCategory: "premium",
  },
  {
    id: "adventure-bike-1",
    name: "Himalayan",
    type: "Adventure Bike",
    brand: "Royal Enfield",
    shortDescription: "Versatile adventure tourer for all terrains",
    description:
      "The Royal Enfield Himalayan is purpose-built for adventure, capable of tackling various terrains with ease. Its long-travel suspension, high ground clearance, and torquey engine make it ideal for both on and off-road exploration, while its comfortable ergonomics reduce fatigue on long journeys.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 279,
      daily: 1299,
      weekly: 6499,
      monthly: 19999,
    },
    specifications: {
      engine: "411 cc, Single Cylinder, 4 Stroke",
      power: "24.3 PS @ 6500 rpm",
      torque: "32 Nm @ 4250 rpm",
      mileage: "30 kmpl",
      topSpeed: "130 km/h",
      weight: "199 kg",
      fuelCapacity: "15 liters",
      brakes: "Disc (Front & Rear)",
      suspension: "Telescopic Fork (Front), Monoshock (Rear)",
      tires: "Tube Type",
    },
    colors: ["Granite Black", "Sleet Grey", "Lake Blue", "Gravel Grey", "Pine Green"],
    features: [
      "Tripper Navigation",
      "Digital-Analog Instrument Cluster",
      "Dual Channel ABS",
      "Hazard Switch",
      "Windscreen",
      "Luggage Mounting Points",
    ],
    availability: true,
    popularityScore: 9.0,
    category: "adventure",
    priceCategory: "premium",
  },
  {
    id: "commuter-bike-1",
    name: "Splendor Plus",
    type: "Commuter Bike",
    brand: "Hero",
    shortDescription: "Reliable and fuel-efficient daily commuter",
    description:
      "The Hero Splendor Plus is India's most popular motorcycle, known for its exceptional reliability and fuel efficiency. Its simple design, comfortable seating, and low maintenance costs make it the perfect choice for daily commuting in urban and rural areas alike.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 99,
      daily: 499,
      weekly: 2499,
      monthly: 7999,
    },
    specifications: {
      engine: "97.2 cc, Single Cylinder, 4 Stroke",
      power: "8.02 PS @ 8000 rpm",
      torque: "8.05 Nm @ 6000 rpm",
      mileage: "60-70 kmpl",
      topSpeed: "90 km/h",
      weight: "112 kg",
      fuelCapacity: "9.8 liters",
      brakes: "Drum (Front & Rear)",
      suspension:
        "Telescopic Hydraulic Shock Absorbers (Front), Swing Arm with Adjustable Hydraulic Shock Absorbers (Rear)",
      tires: "Tube Type",
    },
    colors: ["Black with Purple", "Black with Silver", "Heavy Grey", "Candy Blazing Red"],
    features: [
      "i3S Technology (Idle Stop-Start System)",
      "Analog Instrument Cluster",
      "Electric Start",
      "Tubeless Tires",
      "Alloy Wheels",
      "Integrated Braking System",
    ],
    availability: true,
    popularityScore: 8.5,
    category: "commuter",
    priceCategory: "budget",
  },
  {
    id: "electric-scooter-1",
    name: "Ather 450X",
    type: "Electric Scooter",
    brand: "Ather",
    shortDescription: "Premium electric scooter with smart features",
    description:
      "The Ather 450X is a high-performance electric scooter that combines cutting-edge technology with sleek design. Its powerful motor delivers quick acceleration, while its smart features like touchscreen dashboard, navigation, and smartphone connectivity provide a futuristic riding experience with zero emissions.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 149,
      daily: 799,
      weekly: 3999,
      monthly: 11999,
    },
    specifications: {
      motor: "6 kW (Peak Power)",
      battery: "2.9 kWh Lithium-ion",
      range: "85-115 km per charge",
      topSpeed: "90 km/h",
      acceleration: "0-40 km/h in 3.3 seconds",
      weight: "108 kg",
      chargingTime: "4-5 hours (0-100%)",
      brakes: "Disc (Front & Rear)",
      suspension: "Telescopic Fork (Front), Monoshock (Rear)",
      tires: "Tubeless",
    },
    colors: ["Space Grey", "Mint Green", "White"],
    features: [
      "7-inch Touchscreen Dashboard",
      "GPS Navigation",
      "Bluetooth Connectivity",
      "Multiple Riding Modes",
      "Reverse Assist",
      "Remote Monitoring via App",
      "OTA Updates",
    ],
    availability: true,
    popularityScore: 9.3,
    category: "scooter",
    priceCategory: "premium",
    isElectric: true,
  },
  {
    id: "scooter-1",
    name: "Activa 6G",
    type: "Scooter",
    brand: "Honda",
    shortDescription: "India's most popular and reliable scooter",
    description:
      "The Honda Activa 6G continues the legacy of India's most trusted scooter. Known for its reliability, comfort, and efficiency, it's perfect for navigating busy city streets. With its easy handling, ample storage space, and fuel-efficient engine, it remains the top choice for riders of all ages.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 99,
      daily: 499,
      weekly: 2499,
      monthly: 7999,
    },
    specifications: {
      engine: "109.51 cc, Single Cylinder, 4 Stroke",
      power: "7.79 PS @ 8000 rpm",
      torque: "8.79 Nm @ 5250 rpm",
      mileage: "50-55 kmpl",
      topSpeed: "85 km/h",
      weight: "107 kg",
      fuelCapacity: "5.3 liters",
      brakes: "Drum (Front & Rear)",
      suspension: "Telescopic (Front), Spring Loaded Hydraulic (Rear)",
      tires: "Tubeless",
    },
    colors: ["Pearl Precious White", "Matte Axis Grey", "Glitter Blue", "Black"],
    features: [
      "LED Headlamp",
      "Analog Instrument Cluster",
      "External Fuel Filler Cap",
      "ACG Silent Start System",
      "Integrated Dual Function Switch",
      "18L Underseat Storage",
    ],
    availability: true,
    popularityScore: 9.0,
    category: "scooter",
    priceCategory: "budget",
  },
  {
    id: "sport-bike-2",
    name: "KTM Duke 390",
    type: "Sport Bike",
    brand: "KTM",
    shortDescription: "High-performance naked street fighter",
    description:
      "The KTM Duke 390 is a high-performance naked motorcycle that delivers an exhilarating riding experience. With its aggressive design, powerful engine, and premium components, it offers exceptional handling and acceleration. The lightweight chassis and advanced electronics make it a favorite among enthusiasts looking for a thrilling ride.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 299,
      daily: 1499,
      weekly: 7499,
      monthly: 22999,
    },
    specifications: {
      engine: "373.2 cc, Single Cylinder, 4 Stroke",
      power: "43 PS @ 9000 rpm",
      torque: "37 Nm @ 7000 rpm",
      mileage: "25-30 kmpl",
      topSpeed: "160 km/h",
      weight: "163 kg",
      fuelCapacity: "13.4 liters",
      brakes: "Disc (Front & Rear) with ABS",
      suspension: "WP APEX Inverted Fork (Front), WP APEX Monoshock (Rear)",
      tires: "Tubeless",
    },
    colors: ["Electronic Orange", "Ceramic White"],
    features: [
      "TFT Color Display",
      "LED Headlamp & Tail Lamp",
      "Ride-by-Wire Throttle",
      "Dual Channel ABS",
      "Supermoto Mode",
      "Smartphone Connectivity",
      "Quickshifter+",
    ],
    availability: true,
    popularityScore: 9.4,
    category: "sport",
    priceCategory: "premium",
  },
  {
    id: "scooter-2",
    name: "Access 125",
    type: "Scooter",
    brand: "Suzuki",
    shortDescription: "Premium 125cc scooter with elegant styling",
    description:
      "The Suzuki Access 125 combines style, comfort, and performance in a premium package. Its powerful and fuel-efficient engine provides smooth acceleration, while the comfortable seating and practical features make daily commuting a pleasure. With its elegant design and reliable performance, it's a popular choice in the 125cc scooter segment.",
    mainImage: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      hourly: 119,
      daily: 599,
      weekly: 2999,
      monthly: 8999,
    },
    specifications: {
      engine: "124 cc, Single Cylinder, 4 Stroke",
      power: "8.7 PS @ 6750 rpm",
      torque: "10 Nm @ 5500 rpm",
      mileage: "45-50 kmpl",
      topSpeed: "95 km/h",
      weight: "104 kg",
      fuelCapacity: "5 liters",
      brakes: "Disc/Drum (Front), Drum (Rear)",
      suspension: "Telescopic (Front), Swing Arm (Rear)",
      tires: "Tubeless",
    },
    colors: ["Pearl Mirage White", "Metallic Matte Black", "Metallic Sonic Silver", "Pearl Deep Blue"],
    features: [
      "LED Headlamp",
      "Digital Meter",
      "External Fuel Filler Cap",
      "One-push Easy Start System",
      "Front Pocket",
      "21L Underseat Storage",
      "USB Charging Socket",
    ],
    availability: true,
    popularityScore: 8.8,
    category: "scooter",
    priceCategory: "mid-range",
  },
]

export function getAllVehicles() {
  return vehicles
}

export function getVehicleById(id) {
  return vehicles.find((vehicle) => vehicle.id === id)
}

export function getVehiclesByType(type) {
  return vehicles.filter((vehicle) => vehicle.type.toLowerCase() === type.toLowerCase())
}

export function getVehiclesByBrand(brand) {
  return vehicles.filter((vehicle) => vehicle.brand.toLowerCase() === brand.toLowerCase())
}

export function getVehiclesByPriceRange(min, max) {
  return vehicles.filter((vehicle) => {
    const dailyPrice = vehicle.pricing.daily
    return dailyPrice >= min && dailyPrice <= max
  })
}

export function getVehiclesByCategory(category) {
  return vehicles.filter((vehicle) => vehicle.category === category)
}

export function getVehiclesByPriceCategory(category) {
  return vehicles.filter((vehicle) => vehicle.priceCategory === category)
}

export function getAvailableVehicles() {
  return vehicles.filter((vehicle) => vehicle.availability === true)
}

export function getPopularVehicles(limit = 4) {
  return [...vehicles].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, limit)
}

export function getAllVehicleTypes() {
  return [...new Set(vehicles.map((vehicle) => vehicle.type))]
}

export function getAllVehicleBrands() {
  return [...new Set(vehicles.map((vehicle) => vehicle.brand))]
}

export function getAllVehicleCategories() {
  return [...new Set(vehicles.map((vehicle) => vehicle.category))]
}

export function getAllPriceCategories() {
  return [...new Set(vehicles.map((vehicle) => vehicle.priceCategory))]
}

export function getMinMaxPrices() {
  const prices = vehicles.map((vehicle) => vehicle.pricing.daily)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export function searchVehicles(query) {
  const searchTerm = query.toLowerCase()
  return vehicles.filter((vehicle) => {
    return (
      vehicle.name.toLowerCase().includes(searchTerm) ||
      vehicle.type.toLowerCase().includes(searchTerm) ||
      vehicle.brand.toLowerCase().includes(searchTerm) ||
      vehicle.description.toLowerCase().includes(searchTerm)
    )
  })
}
