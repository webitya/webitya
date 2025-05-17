"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
  Calendar,
  Gauge,
  Zap,
  Fuel,
  Phone,
  Star,
  ChevronDown,
  Calculator,
  Rotate3D,
  Play,
  BarChart3,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Wrench,
  Settings,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  Copy,
} from "lucide-react"
import { bikesData } from "@/components/Bikes/data/bikes-data"
import { sponsoredBikes } from "@/components/Bikes//data/sponsored-data"
import { sendEnquiry } from "@/components/Bikes/lib/email-service"
import { toast } from "@/components/Bikes/components/ui/use-toast"
import { Toaster } from "@/components/Bikes/components/ui/toaster"

// Bank data for EMI calculator
const bankOptions = [
  {
    id: 1,
    name: "HDFC Bank",
    interestRate: 7.65,
    processingFee: 0.5,
    logo: "/placeholder.svg?height=40&width=120&text=HDFC",
  },
  {
    id: 2,
    name: "ICICI Bank",
    interestRate: 7.75,
    processingFee: 0.75,
    logo: "/placeholder.svg?height=40&width=120&text=ICICI",
  },
  {
    id: 3,
    name: "State Bank of India",
    interestRate: 7.5,
    processingFee: 0.5,
    logo: "/placeholder.svg?height=40&width=120&text=SBI",
  },
  {
    id: 4,
    name: "Axis Bank",
    interestRate: 8.0,
    processingFee: 0.6,
    logo: "/placeholder.svg?height=40&width=120&text=AXIS",
  },
  {
    id: 5,
    name: "Bajaj Finance",
    interestRate: 9.5,
    processingFee: 1.0,
    logo: "/placeholder.svg?height=40&width=120&text=BAJAJ",
  },
  {
    id: 6,
    name: "IDFC First Bank",
    interestRate: 8.25,
    processingFee: 0.5,
    logo: "/placeholder.svg?height=40&width=120&text=IDFC",
  },
]

// Sample competitor bikes for comparison
const competitorBikes = [
  {
    id: 101,
    name: "Yamaha MT-15",
    price: 165000,
    engineCC: 155,
    power: 18.5,
    torque: 13.9,
    mileage: 48,
    topSpeed: 132,
  },
  {
    id: 102,
    name: "Bajaj Dominar 250",
    price: 175000,
    engineCC: 248.8,
    power: 27,
    torque: 23.5,
    mileage: 35,
    topSpeed: 140,
  },
  {
    id: 103,
    name: "TVS Apache RTR 200 4V",
    price: 145000,
    engineCC: 197.75,
    power: 20.82,
    torque: 17.25,
    mileage: 40,
    topSpeed: 127,
  },
]

// Sample user reviews
const userReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/placeholder.svg?height=50&width=50&text=RS",
    rating: 4.5,
    date: "2023-10-15",
    title: "Great performance and comfort",
    review:
      "I've been riding this bike for 3 months now and I'm extremely satisfied with its performance. The engine is smooth and responsive, and the riding position is comfortable for long rides.",
    pros: ["Excellent power delivery", "Comfortable seat", "Good mileage", "Premium build quality"],
    cons: ["Service cost is a bit high", "Limited color options"],
    helpful: 24,
    unhelpful: 3,
    ownershipPeriod: "3 months",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=50&width=50&text=PP",
    rating: 5,
    date: "2023-09-22",
    title: "Best bike in this segment!",
    review:
      "After comparing multiple options, I chose this bike and couldn't be happier. The features, build quality, and performance are all top-notch. Highly recommended for anyone looking for a premium riding experience.",
    pros: ["Stunning looks", "Feature-rich", "Great handling", "Value for money"],
    cons: ["Could use better tires"],
    helpful: 18,
    unhelpful: 1,
    ownershipPeriod: "6 months",
    verified: true,
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=50&width=50&text=VS",
    rating: 3.5,
    date: "2023-11-05",
    title: "Good bike but has some issues",
    review:
      "The bike performs well overall, but I've faced some issues with the clutch. The service center experience was also not great. However, the riding experience and features are good for the price.",
    pros: ["Good looks", "Decent mileage", "Comfortable for city riding"],
    cons: ["Clutch issues", "Poor service experience", "Vibrations at high speed"],
    helpful: 12,
    unhelpful: 4,
    ownershipPeriod: "2 months",
    verified: true,
  },
]

// Sample maintenance cost data
const maintenanceCostData = [
  {
    period: "1st Service (1,000 km)",
    cost: 1200,
    items: ["Engine Oil Change", "Oil Filter", "General Inspection"],
  },
  {
    period: "2nd Service (5,000 km)",
    cost: 2500,
    items: ["Engine Oil Change", "Oil Filter", "Air Filter", "Brake Fluid Check", "Chain Adjustment"],
  },
  {
    period: "3rd Service (10,000 km)",
    cost: 4500,
    items: [
      "Engine Oil Change",
      "Oil Filter",
      "Air Filter",
      "Spark Plug",
      "Brake Fluid",
      "Coolant Check",
      "Chain Adjustment",
    ],
  },
  {
    period: "Major Service (15,000 km)",
    cost: 7500,
    items: [
      "Engine Oil Change",
      "Oil Filter",
      "Air Filter",
      "Spark Plug",
      "Brake Fluid",
      "Coolant Replacement",
      "Chain & Sprocket Inspection",
      "Valve Clearance Check",
    ],
  },
]

// Sample dealer locations
const dealerLocations = [
  {
    id: 1,
    name: "Webitya Motors - Central",
    address: "123 Main Street, Central District, City",
    phone: "+91 9876543210",
    rating: 4.7,
    distance: 2.5,
    services: ["Sales", "Service", "Spare Parts", "Test Ride"],
  },
  {
    id: 2,
    name: "Webitya Motors - North",
    address: "456 Park Avenue, Northern Suburb, City",
    phone: "+91 9876543211",
    rating: 4.5,
    distance: 5.8,
    services: ["Sales", "Service", "Spare Parts"],
  },
  {
    id: 3,
    name: "Webitya Motors - East",
    address: "789 East Road, Eastern District, City",
    phone: "+91 9876543212",
    rating: 4.8,
    distance: 7.2,
    services: ["Sales", "Service", "Spare Parts", "Test Ride", "Accessories"],
  },
]

// Sample customization options
const customizationOptions = [
  {
    category: "Performance",
    items: [
      {
        id: "p1",
        name: "Performance Exhaust",
        price: 15000,
        description: "Enhances sound and improves power output",
        image: "/placeholder.svg?height=100&width=100&text=Exhaust",
      },
      {
        id: "p2",
        name: "Power Commander",
        price: 22000,
        description: "Fuel injection mapping for optimal performance",
        image: "/placeholder.svg?height=100&width=100&text=Power+Commander",
      },
      {
        id: "p3",
        name: "K&N Air Filter",
        price: 5000,
        description: "Improved airflow for better performance",
        image: "/placeholder.svg?height=100&width=100&text=Air+Filter",
      },
    ],
  },
  {
    category: "Comfort & Convenience",
    items: [
      {
        id: "c1",
        name: "Comfort Seat",
        price: 8000,
        description: "Gel-based seat for enhanced comfort on long rides",
        image: "/placeholder.svg?height=100&width=100&text=Seat",
      },
      {
        id: "c2",
        name: "Heated Grips",
        price: 6000,
        description: "Keeps hands warm during cold weather rides",
        image: "/placeholder.svg?height=100&width=100&text=Grips",
      },
      {
        id: "c3",
        name: "Mobile Charger",
        price: 2500,
        description: "USB charging port for mobile devices",
        image: "/placeholder.svg?height=100&width=100&text=Charger",
      },
    ],
  },
  {
    category: "Protection",
    items: [
      {
        id: "pr1",
        name: "Engine Guard",
        price: 4500,
        description: "Protects engine in case of falls or crashes",
        image: "/placeholder.svg?height=100&width=100&text=Engine+Guard",
      },
      {
        id: "pr2",
        name: "Tank Pad",
        price: 1500,
        description: "Prevents scratches on fuel tank",
        image: "/placeholder.svg?height=100&width=100&text=Tank+Pad",
      },
      {
        id: "pr3",
        name: "Crash Bobbins",
        price: 3500,
        description: "Minimizes damage in case of a slide",
        image: "/placeholder.svg?height=100&width=100&text=Bobbins",
      },
    ],
  },
]

// Sample 360 view images
const view360Images = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=600&width=800&text=360°+View+${i + 1}`,
}))

export default function BikeDetailClientPage({ slug }) {
  const [bike, setBike] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showEmiCalculator, setShowEmiCalculator] = useState(false)
  const [showMaintenanceCalculator, setShowMaintenanceCalculator] = useState(false)
  const [showFuelCalculator, setShowFuelCalculator] = useState(false)
  const [showComparisonTable, setShowComparisonTable] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [show360View, setShow360View] = useState(false)
  const [currentAngle, setCurrentAngle] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const [activeReviewTab, setActiveReviewTab] = useState("all")
  const [selectedCustomizations, setSelectedCustomizations] = useState([])
  const [fuelParams, setFuelParams] = useState({
    distance: 100,
    fuelPrice: 100,
  })
  const [emiParams, setEmiParams] = useState({
    loanAmount: 0,
    downPayment: 0,
    interestRate: 7.65,
    tenure: 36,
    selectedBank: bankOptions[0],
  })
  const [emiResult, setEmiResult] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalAmount: 0,
    processingFee: 0,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const emiCalculatorRef = useRef(null)
  const maintenanceCalculatorRef = useRef(null)
  const fuelCalculatorRef = useRef(null)
  const comparisonTableRef = useRef(null)
  const customizationRef = useRef(null)
  const view360Ref = useRef(null)
  const headerRef = useRef(null)

  // Filter reviews based on active tab
  const filteredReviews = useMemo(() => {
    if (activeReviewTab === "all") return userReviews
    if (activeReviewTab === "positive") return userReviews.filter((review) => review.rating >= 4)
    if (activeReviewTab === "critical") return userReviews.filter((review) => review.rating < 4)
    return userReviews
  }, [activeReviewTab])

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!userReviews.length) return 0
    const sum = userReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / userReviews.length).toFixed(1)
  }, [userReviews])

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    userReviews.forEach((review) => {
      const rating = Math.floor(review.rating)
      distribution[rating] = (distribution[rating] || 0) + 1
    })
    return distribution
  }, [userReviews])

  // Calculate total customization cost
  const totalCustomizationCost = useMemo(() => {
    return selectedCustomizations.reduce((total, item) => total + item.price, 0)
  }, [selectedCustomizations])

  // Calculate fuel cost
  const fuelCost = useMemo(() => {
    if (!bike) return 0
    const fuelRequired = fuelParams.distance / bike.mileage
    return fuelRequired * fuelParams.fuelPrice
  }, [bike, fuelParams])

  useEffect(() => {
    const foundBike = bikesData.find((b) => b.slug === slug)
    if (foundBike) {
      setBike(foundBike)
      setSelectedColor(foundBike.colors[0] || null)
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in the ${foundBike.name}. Please provide more information.`,
      }))

      // Initialize EMI calculator with bike price
      const initialLoanAmount = Math.round(foundBike.price * 0.8) // 80% of bike price
      setEmiParams({
        ...emiParams,
        loanAmount: initialLoanAmount,
        downPayment: foundBike.price - initialLoanAmount,
      })
    }
  }, [slug])

  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY
        setIsHeaderSticky(scrollPosition > 300)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate EMI whenever parameters change
  useEffect(() => {
    if (bike) {
      calculateEmi()
    }
  }, [emiParams])

  // Scroll to section when opened
  useEffect(() => {
    if (showEmiCalculator && emiCalculatorRef.current) {
      emiCalculatorRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showEmiCalculator])

  useEffect(() => {
    if (showMaintenanceCalculator && maintenanceCalculatorRef.current) {
      maintenanceCalculatorRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showMaintenanceCalculator])

  useEffect(() => {
    if (showFuelCalculator && fuelCalculatorRef.current) {
      fuelCalculatorRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showFuelCalculator])

  useEffect(() => {
    if (showComparisonTable && comparisonTableRef.current) {
      comparisonTableRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showComparisonTable])

  useEffect(() => {
    if (showCustomization && customizationRef.current) {
      customizationRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [showCustomization])

  useEffect(() => {
    if (show360View && view360Ref.current) {
      view360Ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [show360View])

  // Handle 360 view mouse events
  const handle360MouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX)
  }

  const handle360MouseMove = (e) => {
    if (!isDragging) return
    const diff = e.pageX - startX
    if (Math.abs(diff) > 10) {
      // Change angle based on drag direction
      setCurrentAngle((prev) => {
        const newAngle = diff > 0 ? prev + 1 : prev - 1
        if (newAngle > 24) return 1
        if (newAngle < 1) return 24
        return newAngle
      })
      setStartX(e.pageX)
    }
  }

  const handle360MouseUp = () => {
    setIsDragging(false)
  }

  // Handle 360 view touch events
  const handle360TouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handle360TouchMove = (e) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startX
    if (Math.abs(diff) > 10) {
      // Change angle based on drag direction
      setCurrentAngle((prev) => {
        const newAngle = diff > 0 ? prev + 1 : prev - 1
        if (newAngle > 24) return 1
        if (newAngle < 1) return 24
        return newAngle
      })
      setStartX(e.touches[0].clientX)
    }
  }

  const handle360TouchEnd = () => {
    setIsDragging(false)
  }

  // Calculate EMI
  const calculateEmi = () => {
    const principal = emiParams.loanAmount
    const ratePerMonth = emiParams.interestRate / 12 / 100
    const tenure = emiParams.tenure

    // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenure)) / (Math.pow(1 + ratePerMonth, tenure) - 1)
    const totalAmount = emi * tenure
    const totalInterest = totalAmount - principal
    const processingFee = (principal * emiParams.selectedBank.processingFee) / 100

    setEmiResult({
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      processingFee: Math.round(processingFee),
    })
  }

  // Handle loan amount change
  const handleLoanAmountChange = (e) => {
    const newLoanAmount = Number.parseInt(e.target.value) || 0
    setEmiParams({
      ...emiParams,
      loanAmount: newLoanAmount,
      downPayment: bike.price - newLoanAmount,
    })
  }

  // Handle down payment change
  const handleDownPaymentChange = (e) => {
    const newDownPayment = Number.parseInt(e.target.value) || 0
    setEmiParams({
      ...emiParams,
      downPayment: newDownPayment,
      loanAmount: bike.price - newDownPayment,
    })
  }

  // Handle bank selection
  const handleBankSelection = (bank) => {
    setEmiParams({
      ...emiParams,
      selectedBank: bank,
      interestRate: bank.interestRate,
    })
  }

  // Handle customization selection
  const handleCustomizationToggle = (item) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some((i) => i.id === item.id)
      if (exists) {
        return prev.filter((i) => i.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

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
      await sendEnquiry({
        ...formData,
        subject: `Enquiry for ${bike.name}`,
        bikeName: bike.name,
      })

      toast({
        title: "Enquiry Submitted",
        description: "We've received your enquiry and will contact you soon.",
        variant: "success",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in the ${bike.name}. Please provide more information.`,
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle review helpfulness
  const handleReviewHelpful = (reviewId, isHelpful) => {
    // In a real app, this would send a request to the server
    toast({
      title: "Feedback Recorded",
      description: `Thank you for your feedback on this review.`,
    })
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

  // Related bikes (same category or brand)
  const relatedBikes = bikesData
    .filter((b) => (b.category === bike.category || b.brand === bike.brand) && b.id !== bike.id)
    .slice(0, 4)

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
    >
      <Toaster />

      {/* Sticky Header */}
      <div
        ref={headerRef}
        className={`${
          isHeaderSticky
            ? "fixed top-0 left-0 right-0 z-[9999] shadow-lg transform translate-y-0"
            : "transform -translate-y-full"
        } ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/bikes" className="text-sm font-medium flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
              <h2 className="text-lg font-bold truncate max-w-[200px] md:max-w-xs">{bike.name}</h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <span className="text-lg font-bold text-red-600">₹{bike.price.toLocaleString()}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-100 text-gray-700"}`}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <Link
                  href={`/bikes/${bike.slug}/test-ride`}
                  className={`hidden md:flex items-center px-4 py-2 rounded-lg font-medium ${
                    darkMode
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                  } transition-colors`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Test Ride
                </Link>

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  aria-label="Menu"
                >
                  {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-3 overflow-hidden"
              >
                <div className="py-2 space-y-2">
                  <Link
                    href={`/bikes/${bike.slug}/test-ride`}
                    className="flex items-center px-4 py-2 rounded-lg font-medium bg-red-600 text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Test Ride
                  </Link>
                  <a
                    href={`tel:+919693245941`}
                    className="flex items-center px-4 py-2 rounded-lg font-medium bg-white border border-red-600 text-red-600 dark:bg-gray-800"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Price Quote
                  </a>
                  <button
                    onClick={() => {
                      setShowEmiCalculator(true)
                      setShowMobileMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    EMI Calculator
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className={`text-sm transition-colors duration-200 ${
                    darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className={`mx-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>/</span>
                  <Link
                    href="/bikes"
                    className={`text-sm transition-colors duration-200 ${
                      darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    Bikes
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className={`mx-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>/</span>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{bike.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Quick Actions Bar */}
        <div
          className={`mb-6 p-4 rounded-xl ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-md border border-gray-100"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{bike.name}</h1>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShow360View(true)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                } transition-colors`}
              >
                <Rotate3D className="w-4 h-4 mr-1.5" />
                360° View
              </button>

              <button
                onClick={() => setShowComparisonTable(true)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                } transition-colors`}
              >
                <BarChart3 className="w-4 h-4 mr-1.5" />
                Compare
              </button>

              <button
                onClick={() => setShowCustomization(true)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                } transition-colors`}
              >
                <Settings className="w-4 h-4 mr-1.5" />
                Customize
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  } transition-colors`}
                >
                  <Share2 className="w-4 h-4 mr-1.5" />
                  Share
                </button>

                {/* Share Options Dropdown */}
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 ${
                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                      }`}
                    >
                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => {
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                window.location.href,
                              )}`,
                              "_blank",
                            )
                            setShowShareOptions(false)
                          }}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                          Facebook
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                window.location.href,
                              )}&text=${encodeURIComponent(`Check out the ${bike.name} - ${bike.tagline}`)}`,
                              "_blank",
                            )
                            setShowShareOptions(false)
                          }}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                          Twitter
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                window.location.href,
                              )}`,
                              "_blank",
                            )
                            setShowShareOptions(false)
                          }}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `mailto:?subject=${encodeURIComponent(
                                `Check out the ${bike.name}`,
                              )}&body=${encodeURIComponent(
                                `I thought you might be interested in the ${bike.name}. Check it out here: ${window.location.href}`,
                              )}`,
                              "_blank",
                            )
                            setShowShareOptions(false)
                          }}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <Mail className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                          Email
                        </button>
                        <hr className={darkMode ? "border-gray-700" : "border-gray-200"} />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            toast({
                              title: "Link Copied",
                              description: "Bike link copied to clipboard",
                            })
                            setShowShareOptions(false)
                          }}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-2/3">
            <div
              className={`rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              {/* Main Image or 360 View */}
              <div className="relative aspect-[16/9] bg-gray-50 dark:bg-gray-900">
                {show360View ? (
                  <div
                    ref={view360Ref}
                    className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    onMouseDown={handle360MouseDown}
                    onMouseMove={handle360MouseMove}
                    onMouseUp={handle360MouseUp}
                    onMouseLeave={handle360MouseUp}
                    onTouchStart={handle360TouchStart}
                    onTouchMove={handle360TouchMove}
                    onTouchEnd={handle360TouchEnd}
                  >
                    {view360Images.map((image, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          currentAngle === image.id ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={`${bike.name} - 360° View ${image.id}`}
                          fill
                          className="object-contain"
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    ))}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div
                        className={`px-4 py-2 rounded-full backdrop-blur-md ${
                          darkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-800"
                        }`}
                      >
                        <p className="text-sm font-medium">Drag to rotate</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShow360View(false)}
                      className={`absolute top-4 right-4 p-2 rounded-full ${
                        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                      } shadow-md`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    {bike.images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: selectedImage === idx ? 1 : 0,
                          zIndex: selectedImage === idx ? 10 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={image || "/placeholder.svg?height=600&width=800"}
                          alt={`${bike.name} - View ${idx + 1}`}
                          fill
                          className="object-contain"
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Special offer badge if applicable */}
                {!show360View && bike.onSale && (
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20"
                  >
                    {Math.round(((bike.oldPrice - bike.price) / bike.oldPrice) * 100)}% OFF
                  </motion.div>
                )}

                {/* Festival offer if applicable */}
                {!show360View && bike.festivalOffer && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-lg shadow-lg z-20"
                  >
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg">{bike.festivalOffer.name}</h3>
                      <p className="text-sm">{bike.festivalOffer.description}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-xs">Valid till: {bike.festivalOffer.validTill}</p>
                        <span className="text-xl font-bold">{bike.festivalOffer.discount}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Image Navigation */}
                {!show360View && bike.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? bike.images.length - 1 : prev - 1))}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md z-20 group ${
                        darkMode
                          ? "bg-gray-800/90 hover:bg-gray-700 text-white"
                          : "bg-white/90 hover:bg-white text-gray-700"
                      } transition-colors`}
                      aria-label="Previous image"
                    >
                      <ChevronLeft
                        className={`w-5 h-5 ${
                          darkMode ? "group-hover:text-white" : "group-hover:text-red-600"
                        } transition-colors`}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === bike.images.length - 1 ? 0 : prev + 1))}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md z-20 group ${
                        darkMode
                          ? "bg-gray-800/90 hover:bg-gray-700 text-white"
                          : "bg-white/90 hover:bg-white text-gray-700"
                      } transition-colors`}
                      aria-label="Next image"
                    >
                      <ChevronRight
                        className={`w-5 h-5 ${
                          darkMode ? "group-hover:text-white" : "group-hover:text-red-600"
                        } transition-colors`}
                      />
                    </button>
                  </>
                )}

                {/* 360 View Button */}
                {!show360View && (
                  <button
                    onClick={() => setShow360View(true)}
                    className={`absolute bottom-4 right-4 flex items-center px-3 py-1.5 rounded-full shadow-md z-20 ${
                      darkMode
                        ? "bg-gray-800/90 hover:bg-gray-700 text-white"
                        : "bg-white/90 hover:bg-white text-gray-700"
                    } transition-colors`}
                  >
                    <Rotate3D className="w-4 h-4 mr-1.5" />
                    <span className="text-sm font-medium">360° View</span>
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {!show360View && bike.images.length > 1 && (
                <div
                  className={`p-4 overflow-x-auto ${
                    darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-gray-50 border-t border-gray-100"
                  }`}
                >
                  <div className="flex gap-3">
                    {bike.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                          selectedImage === index
                            ? `ring-2 ${darkMode ? "ring-red-500" : "ring-red-500"} scale-105 shadow-md`
                            : `ring-1 ${
                                darkMode ? "ring-gray-600" : "ring-gray-200"
                              } hover:ring-red-300 opacity-70 hover:opacity-100`
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg?height=150&width=150"}
                          alt={`${bike.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-4 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === "overview"
                        ? `text-red-600 border-b-2 border-red-600`
                        : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-red-600"}`
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`px-6 py-4 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === "specifications"
                        ? `text-red-600 border-b-2 border-red-600`
                        : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-red-600"}`
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`px-6 py-4 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === "features"
                        ? `text-red-600 border-b-2 border-red-600`
                        : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-red-600"}`
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-4 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === "reviews"
                        ? `text-red-600 border-b-2 border-red-600`
                        : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-red-600"}`
                    }`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setActiveTab("dealers")}
                    className={`px-6 py-4 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === "dealers"
                        ? `text-red-600 border-b-2 border-red-600`
                        : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-red-600"}`
                    }`}
                  >
                    Dealers
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">About {bike.name}</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                        {bike.description}
                      </p>
                      {bike.longDescription &&
                        bike.longDescription.map((para, index) => (
                          <p
                            key={index}
                            className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
                          >
                            {para}
                          </p>
                        ))}
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold mb-4">Key Highlights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                          className={`p-4 rounded-lg border shadow-sm transition-transform hover:scale-105 duration-300 ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                darkMode ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600"
                              }`}
                            >
                              <Gauge className="w-6 h-6" />
                            </div>
                            <div>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Engine</p>
                              <p className="font-semibold">{bike.engineCC}cc</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`p-4 rounded-lg border shadow-sm transition-transform hover:scale-105 duration-300 ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                darkMode ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600"
                              }`}
                            >
                              <Zap className="w-6 h-6" />
                            </div>
                            <div>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Power</p>
                              <p className="font-semibold">{bike.power} bhp</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`p-4 rounded-lg border shadow-sm transition-transform hover:scale-105 duration-300 ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                darkMode ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600"
                              }`}
                            >
                              <Fuel className="w-6 h-6" />
                            </div>
                            <div>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Mileage</p>
                              <p className="font-semibold">{bike.mileage} kmpl</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`p-4 rounded-lg border shadow-sm transition-transform hover:scale-105 duration-300 ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                darkMode ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600"
                              }`}
                            >
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Year</p>
                              <p className="font-semibold">{bike.year}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Gallery */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold mb-4">Video Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className={`rounded-lg overflow-hidden border ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src="/placeholder.svg?height=300&width=500&text=Video+Thumbnail"
                              alt="Video Thumbnail"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                  darkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-red-600"
                                } backdrop-blur-sm`}
                              >
                                <Play className="w-8 h-8" />
                              </div>
                            </div>
                            <div
                              className={`absolute bottom-0 left-0 right-0 p-3 ${
                                darkMode ? "bg-gray-900/80" : "bg-black/60"
                              } backdrop-blur-sm`}
                            >
                              <p className="text-white font-medium">Official Review: {bike.name}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`rounded-lg overflow-hidden border ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src="/placeholder.svg?height=300&width=500&text=Video+Thumbnail"
                              alt="Video Thumbnail"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                  darkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-red-600"
                                } backdrop-blur-sm`}
                              >
                                <Play className="w-8 h-8" />
                              </div>
                            </div>
                            <div
                              className={`absolute bottom-0 left-0 right-0 p-3 ${
                                darkMode ? "bg-gray-900/80" : "bg-black/60"
                              } backdrop-blur-sm`}
                            >
                              <p className="text-white font-medium">Road Test: {bike.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Calculators */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center">
                            <Calculator className="w-4 h-4 mr-2 text-red-500" />
                            EMI Calculator
                          </h4>
                          <button
                            onClick={() => {
                              setShowEmiCalculator(true)
                              if (emiCalculatorRef.current) {
                                setTimeout(() => {
                                  emiCalculatorRef.current.scrollIntoView({ behavior: "smooth" })
                                }, 100)
                              }
                            }}
                            className={`text-sm font-medium ${
                              darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                            } transition-colors`}
                          >
                            Calculate
                          </button>
                        </div>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          EMI starting from ₹{emiResult.monthlyEmi.toLocaleString()}/month
                        </p>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center">
                            <Fuel className="w-4 h-4 mr-2 text-red-500" />
                            Fuel Cost
                          </h4>
                          <button
                            onClick={() => {
                              setShowFuelCalculator(true)
                              if (fuelCalculatorRef.current) {
                                setTimeout(() => {
                                  fuelCalculatorRef.current.scrollIntoView({ behavior: "smooth" })
                                }, 100)
                              }
                            }}
                            className={`text-sm font-medium ${
                              darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                            } transition-colors`}
                          >
                            Calculate
                          </button>
                        </div>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          ₹{Math.round(fuelCost).toLocaleString()} for {fuelParams.distance} km
                        </p>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center">
                            <Wrench className="w-4 h-4 mr-2 text-red-500" />
                            Maintenance
                          </h4>
                          <button
                            onClick={() => {
                              setShowMaintenanceCalculator(true)
                              if (maintenanceCalculatorRef.current) {
                                setTimeout(() => {
                                  maintenanceCalculatorRef.current.scrollIntoView({ behavior: "smooth" })
                                }, 100)
                              }
                            }}
                            className={`text-sm font-medium ${
                              darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                            } transition-colors`}
                          >
                            View Details
                          </button>
                        </div>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Yearly cost: ₹
                          {(maintenanceCostData.reduce((sum, item) => sum + item.cost, 0) / 2).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "specifications" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Gauge className="w-6 h-6 mr-2 text-red-600" />
                      Technical Specifications
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div
                        className={`p-5 rounded-xl border shadow-sm ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <h3
                          className={`font-semibold mb-4 pb-2 border-b flex items-center ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          <Zap className="w-5 h-5 mr-2 text-red-600" />
                          Engine & Performance
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Engine</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.engineCC}cc
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Max Power</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.power} bhp
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Max Torque</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.torque} Nm
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Top Speed</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.topSpeed} km/h
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Mileage</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.mileage} kmpl
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Transmission</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.transmission}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div
                        className={`p-5 rounded-xl border shadow-sm ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <h3
                          className={`font-semibold mb-4 pb-2 border-b flex items-center ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          <Gauge className="w-5 h-5 mr-2 text-red-600" />
                          Dimensions & Chassis
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Weight</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.weight} kg
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Seat Height</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.seatHeight} mm
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Ground Clearance</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.groundClearance} mm
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Fuel Capacity</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.fuelCapacity} L
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Front Brake</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.frontBrake}
                            </span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Rear Brake</span>
                            <span
                              className={`font-medium px-3 py-1.5 rounded-md shadow-sm border ${
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-100"
                              }`}
                            >
                              {bike.rearBrake}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mt-8" ref={comparisonTableRef}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                          Compare with Competitors
                        </h3>
                        <button
                          onClick={() => setShowComparisonTable(!showComparisonTable)}
                          className={`text-sm font-medium flex items-center ${
                            darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                          } transition-colors`}
                        >
                          {showComparisonTable ? "Hide" : "Show"} Comparison
                          <ChevronDown
                            className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                              showComparisonTable ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {showComparisonTable && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="overflow-x-auto">
                              <table
                                className={`w-full border-collapse ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                              >
                                <thead>
                                  <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                    <th
                                      className={`px-4 py-3 text-left font-semibold ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Specification
                                    </th>
                                    <th
                                      className={`px-4 py-3 text-left font-semibold ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      <span className="text-red-600">{bike.name}</span>
                                    </th>
                                    {competitorBikes.map((competitor) => (
                                      <th
                                        key={competitor.id}
                                        className={`px-4 py-3 text-left font-semibold ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        {competitor.name}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td
                                      className={`px-4 py-3 ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Price
                                    </td>
                                    <td
                                      className={`px-4 py-3 font-medium ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      ₹{bike.price.toLocaleString()}
                                    </td>
                                    {competitorBikes.map((competitor) => (
                                      <td
                                        key={competitor.id}
                                        className={`px-4 py-3 ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        ₹{competitor.price.toLocaleString()}
                                      </td>
                                    ))}
                                  </tr>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td
                                      className={`px-4 py-3 ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Engine
                                    </td>
                                    <td
                                      className={`px-4 py-3 font-medium ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      {bike.engineCC}cc
                                    </td>
                                    {competitorBikes.map((competitor) => (
                                      <td
                                        key={competitor.id}
                                        className={`px-4 py-3 ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        {competitor.engineCC}cc
                                      </td>
                                    ))}
                                  </tr>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td
                                      className={`px-4 py-3 ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Power
                                    </td>
                                    <td
                                      className={`px-4 py-3 font-medium ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      {bike.power} bhp
                                    </td>
                                    {competitorBikes.map((competitor) => (
                                      <td
                                        key={competitor.id}
                                        className={`px-4 py-3 ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        {competitor.power} bhp
                                      </td>
                                    ))}
                                  </tr>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td
                                      className={`px-4 py-3 ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Torque
                                    </td>
                                    <td
                                      className={`px-4 py-3 font-medium ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      {bike.torque} Nm
                                    </td>
                                    {competitorBikes.map((competitor) => (
                                      <td
                                        key={competitor.id}
                                        className={`px-4 py-3 ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        {competitor.torque} Nm
                                      </td>
                                    ))}
                                  </tr>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td
                                      className={`px-4 py-3 ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      Mileage
                                    </td>
                                    <td
                                      className={`px-4 py-3 font-medium ${
                                        darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                      }`}
                                    >
                                      {bike.mileage} kmpl
                                    </td>
                                    {competitorBikes.map((competitor) => (
                                      <td
                                        key={competitor.id}
                                        className={`px-4 py-3 ${
                                          darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                        }`}
                                      >
                                        {competitor.mileage} kmpl
                                      </td>
                                    ))}
                                  </tr>
                                  <tr
                                    className={`${
                                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                                    } transition-colors`}
                                  >
                                    <td className="px-4 py-3">Top Speed</td>
                                    <td className="px-4 py-3 font-medium">{bike.topSpeed} km/h</td>
                                    {competitorBikes.map((competitor) => (
                                      <td key={competitor.id} className="px-4 py-3">
                                        {competitor.topSpeed} km/h
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Check className="w-6 h-6 mr-2 text-red-600" />
                      Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bike.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div
                            className={`p-1.5 rounded-full ${
                              darkMode ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Customization Options */}
                    <div className="mt-8" ref={customizationRef}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-red-600" />
                          Customization Options
                        </h3>
                        <button
                          onClick={() => setShowCustomization(!showCustomization)}
                          className={`text-sm font-medium flex items-center ${
                            darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                          } transition-colors`}
                        >
                          {showCustomization ? "Hide" : "Show"} Options
                          <ChevronDown
                            className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                              showCustomization ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {showCustomization && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-6">
                              {customizationOptions.map((category) => (
                                <div key={category.category}>
                                  <h4
                                    className={`font-medium mb-3 pb-2 border-b ${
                                      darkMode ? "border-gray-700" : "border-gray-200"
                                    }`}
                                  >
                                    {category.category}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {category.items.map((item) => {
                                      const isSelected = selectedCustomizations.some((i) => i.id === item.id)
                                      return (
                                        <div
                                          key={item.id}
                                          onClick={() => handleCustomizationToggle(item)}
                                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                            isSelected
                                              ? darkMode
                                                ? "border-red-500 bg-red-900/20"
                                                : "border-red-500 bg-red-50"
                                              : darkMode
                                                ? "border-gray-600 hover:border-red-400 hover:bg-gray-700"
                                                : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                                          }`}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 relative rounded-md overflow-hidden">
                                              <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex justify-between items-start">
                                                <p className="font-medium">{item.name}</p>
                                                <div
                                                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                    isSelected ? "bg-red-600" : darkMode ? "bg-gray-600" : "bg-gray-200"
                                                  }`}
                                                >
                                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                              </div>
                                              <p
                                                className={`text-xs mt-1 ${
                                                  darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                              >
                                                {item.description}
                                              </p>
                                              <p className="text-sm font-bold text-red-600 mt-1">
                                                ₹{item.price.toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}

                              {selectedCustomizations.length > 0 && (
                                <div
                                  className={`p-4 rounded-lg border mt-4 ${
                                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">Selected Customizations</h4>
                                    <p className="font-bold text-red-600">
                                      Total: ₹{totalCustomizationCost.toLocaleString()}
                                    </p>
                                  </div>
                                  <ul className="space-y-2">
                                    {selectedCustomizations.map((item) => (
                                      <li key={item.id} className="flex justify-between items-center">
                                        <span>{item.name}</span>
                                        <span>₹{item.price.toLocaleString()}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="mt-4 flex justify-end">
                                    <button
                                      className={`px-4 py-2 rounded-lg font-medium ${
                                        darkMode
                                          ? "bg-red-600 hover:bg-red-700 text-white"
                                          : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                                      } transition-colors`}
                                    >
                                      Add to Enquiry
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 text-red-600" />
                        User Reviews
                      </h2>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          darkMode
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                        } transition-colors`}
                      >
                        Write a Review
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl font-bold">{averageRating}</span>
                          <div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= Math.round(averageRating)
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Based on {userReviews.length} reviews
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mt-4">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingDistribution[rating] || 0
                            const percentage = userReviews.length ? (count / userReviews.length) * 100 : 0
                            return (
                              <div key={rating} className="flex items-center gap-2">
                                <div className="flex items-center w-12">
                                  <span className="text-sm">{rating}</span>
                                  <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" />
                                </div>
                                <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-600">
                                  <div
                                    className="h-2 rounded-full bg-yellow-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs w-8 text-right">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <h3 className="font-medium mb-3">Most Mentioned</h3>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            Comfortable Seat (12)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            Good Mileage (10)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            Smooth Engine (8)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            Premium Build (7)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            Service Cost (5)
                          </span>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <h3 className="font-medium mb-3">Review Highlights</h3>
                        <div className="space-y-2">
                          <div
                            className={`p-2 rounded border ${
                              darkMode ? "border-green-700 bg-green-900/20" : "border-green-200 bg-green-50"
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <ThumbsUp className="w-3 h-3 text-green-600" />
                              <span className={`text-xs font-medium ${darkMode ? "text-green-400" : "text-green-700"}`}>
                                Pros
                              </span>
                            </div>
                            <p className="text-sm">Excellent power delivery and comfortable for long rides</p>
                          </div>
                          <div
                            className={`p-2 rounded border ${
                              darkMode ? "border-red-700 bg-red-900/20" : "border-red-200 bg-red-50"
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <ThumbsDown className="w-3 h-3 text-red-600" />
                              <span className={`text-xs font-medium ${darkMode ? "text-red-400" : "text-red-700"}`}>
                                Cons
                              </span>
                            </div>
                            <p className="text-sm">Service cost is high and limited color options</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Filter Tabs */}
                    <div className="mb-6">
                      <div className={`flex border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <button
                          onClick={() => setActiveReviewTab("all")}
                          className={`px-4 py-2 font-medium text-sm transition-colors ${
                            activeReviewTab === "all"
                              ? `text-red-600 border-b-2 border-red-600`
                              : `${darkMode ? "text-gray-400" : "text-gray-600"}`
                          }`}
                        >
                          All Reviews
                        </button>
                        <button
                          onClick={() => setActiveReviewTab("positive")}
                          className={`px-4 py-2 font-medium text-sm transition-colors ${
                            activeReviewTab === "positive"
                              ? `text-red-600 border-b-2 border-red-600`
                              : `${darkMode ? "text-gray-400" : "text-gray-600"}`
                          }`}
                        >
                          Positive
                        </button>
                        <button
                          onClick={() => setActiveReviewTab("critical")}
                          className={`px-4 py-2 font-medium text-sm transition-colors ${
                            activeReviewTab === "critical"
                              ? `text-red-600 border-b-2 border-red-600`
                              : `${darkMode ? "text-gray-400" : "text-gray-600"}`
                          }`}
                        >
                          Critical
                        </button>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-lg border ${
                              darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                                  <Image
                                    src={review.avatar || "/placeholder.svg"}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{review.name}</p>
                                    {review.verified && (
                                      <span
                                        className={`text-xs px-1.5 py-0.5 rounded ${
                                          darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                                        }`}
                                      >
                                        Verified Owner
                                      </span>
                                    )}
                                  </div>
                                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Ownership: {review.ownershipPeriod}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-bold">{review.rating}</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-4 h-4 ${
                                          star <= Math.floor(review.rating)
                                            ? "text-yellow-500 fill-yellow-500"
                                            : star <= review.rating
                                              ? "text-yellow-500 fill-yellow-500 opacity-50"
                                              : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className={`text-xs text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <h4 className="font-medium text-lg mb-2">{review.title}</h4>
                            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{review.review}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {review.pros.length > 0 && (
                                <div
                                  className={`p-3 rounded border ${
                                    darkMode ? "border-green-700 bg-green-900/20" : "border-green-200 bg-green-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-1 mb-2">
                                    <ThumbsUp className="w-4 h-4 text-green-600" />
                                    <span
                                      className={`text-sm font-medium ${
                                        darkMode ? "text-green-400" : "text-green-700"
                                      }`}
                                    >
                                      Pros
                                    </span>
                                  </div>
                                  <ul className="space-y-1">
                                    {review.pros.map((pro, index) => (
                                      <li key={index} className="flex items-start gap-2 text-sm">
                                        <Check
                                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                            darkMode ? "text-green-400" : "text-green-600"
                                          }`}
                                        />
                                        <span>{pro}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {review.cons.length > 0 && (
                                <div
                                  className={`p-3 rounded border ${
                                    darkMode ? "border-red-700 bg-red-900/20" : "border-red-200 bg-red-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-1 mb-2">
                                    <ThumbsDown className="w-4 h-4 text-red-600" />
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-red-400" : "text-red-700"}`}
                                    >
                                      Cons
                                    </span>
                                  </div>
                                  <ul className="space-y-1">
                                    {review.cons.map((con, index) => (
                                      <li key={index} className="flex items-start gap-2 text-sm">
                                        <X
                                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                            darkMode ? "text-red-400" : "text-red-600"
                                          }`}
                                        />
                                        <span>{con}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                              <div className="text-sm">
                                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                  Was this review helpful?
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleReviewHelpful(review.id, true)}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
                                    darkMode
                                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>Yes ({review.helpful})</span>
                                </button>
                                <button
                                  onClick={() => handleReviewHelpful(review.id, false)}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
                                    darkMode
                                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                  <span>No ({review.unhelpful})</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div
                          className={`p-8 rounded-lg border text-center ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          <p className="mb-4">No reviews found matching your criteria.</p>
                          <button
                            onClick={() => setActiveReviewTab("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              darkMode
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                            } transition-colors`}
                          >
                            View All Reviews
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "dealers" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-red-600" />
                      Nearby Dealers
                    </h2>

                    <div className="mb-6">
                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="location"
                              className={`block text-sm font-medium mb-1 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Your Location
                            </label>
                            <div className="flex">
                              <input
                                type="text"
                                id="location"
                                placeholder="Enter your city or pincode"
                                className={`flex-1 p-2 rounded-l-md border ${
                                  darkMode
                                    ? "bg-gray-800 border-gray-600 text-white"
                                    : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-red-500`}
                              />
                              <button
                                className={`px-4 py-2 rounded-r-md font-medium ${
                                  darkMode
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                                } transition-colors`}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="radius"
                              className={`block text-sm font-medium mb-1 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Radius
                            </label>
                            <select
                              id="radius"
                              className={`w-full p-2 rounded-md border ${
                                darkMode
                                  ? "bg-gray-800 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              } focus:outline-none focus:ring-2 focus:ring-red-500`}
                            >
                              <option value="5">5 km</option>
                              <option value="10">10 km</option>
                              <option value="25">25 km</option>
                              <option value="50">50 km</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dealerLocations.map((dealer) => (
                        <motion.div
                          key={dealer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg border ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-lg">{dealer.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{dealer.rating}</span>
                            </div>
                          </div>
                          <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{dealer.address}</p>
                          <p className="mb-3">
                            <a
                              href={`tel:${dealer.phone}`}
                              className={`font-medium ${
                                darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                              }`}
                            >
                              {dealer.phone}
                            </a>
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {dealer.services.map((service, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  darkMode ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {service}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {dealer.distance} km away
                            </span>
                            <div className="flex gap-2">
                              <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(dealer.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                  darkMode
                                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                }`}
                              >
                                Get Directions
                              </a>
                              <Link
                                href={`/bikes/${bike.slug}/test-ride?dealer=${dealer.id}`}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                  darkMode
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                                }`}
                              >
                                Book Test Ride
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div
                      className={`mt-6 p-4 rounded-lg border ${
                        darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <h3 className="font-bold mb-2">Can't find a dealer near you?</h3>
                      <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Contact us and we'll help you locate the nearest dealer for {bike.name}.
                      </p>
                      <div className="flex gap-3">
                        <a
                          href="tel:+919693245941"
                          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                            darkMode
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                          } transition-colors`}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Us
                        </a>
                        <button
                          onClick={() => {
                            const element = document.getElementById("enquiry-form")
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" })
                            }
                          }}
                          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                            darkMode
                              ? "bg-gray-600 hover:bg-gray-500 text-white"
                              : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                          } transition-colors`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email Us
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* EMI Calculator */}
            <div
              ref={emiCalculatorRef}
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <button
                  onClick={() => setShowEmiCalculator(!showEmiCalculator)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Calculator className={`w-6 h-6 mr-3 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                    <h2 className="text-xl font-bold">EMI Calculator</h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } transition-transform duration-300 ${showEmiCalculator ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <AnimatePresence>
                {showEmiCalculator && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Loan Details</h3>

                            <div className="space-y-4">
                              <div>
                                <label
                                  className={`block text-sm font-medium mb-1 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  Bike Price
                                </label>
                                <div
                                  className={`px-3 py-2 rounded-md border ${
                                    darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  ₹{bike.price.toLocaleString()}
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="downPayment"
                                  className={`block text-sm font-medium mb-1 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  Down Payment
                                </label>
                                <div className="relative">
                                  <span
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                                      darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                                  >
                                    ₹
                                  </span>
                                  <input
                                    type="number"
                                    id="downPayment"
                                    value={emiParams.downPayment}
                                    onChange={handleDownPaymentChange}
                                    className={`w-full pl-8 pr-4 py-2 border rounded-md ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="loanAmount"
                                  className={`block text-sm font-medium mb-1 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  Loan Amount
                                </label>
                                <div className="relative">
                                  <span
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                                      darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                                  >
                                    ₹
                                  </span>
                                  <input
                                    type="number"
                                    id="loanAmount"
                                    value={emiParams.loanAmount}
                                    onChange={handleLoanAmountChange}
                                    className={`w-full pl-8 pr-4 py-2 border rounded-md ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="interestRate"
                                  className={`block text-sm font-medium mb-1 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  Interest Rate (%)
                                </label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    id="interestRate"
                                    value={emiParams.interestRate}
                                    onChange={(e) =>
                                      setEmiParams({ ...emiParams, interestRate: Number(e.target.value) })
                                    }
                                    className={`w-full pr-8 py-2 border rounded-md ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300 text-gray-900"
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                  />
                                  <span
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                                      darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}
                                  >
                                    %
                                  </span>
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="tenure"
                                  className={`block text-sm font-medium mb-1 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  Loan Tenure (Months)
                                </label>
                                <select
                                  id="tenure"
                                  value={emiParams.tenure}
                                  onChange={(e) => setEmiParams({ ...emiParams, tenure: Number(e.target.value) })}
                                  className={`w-full p-2 border rounded-md ${
                                    darkMode
                                      ? "bg-gray-700 border-gray-600 text-white"
                                      : "bg-white border-gray-300 text-gray-900"
                                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                >
                                  {[12, 18, 24, 30, 36, 42, 48, 54, 60].map((month) => (
                                    <option key={month} value={month}>
                                      {month} Months
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Bank Options</h3>
                            <div className="space-y-3">
                              {bankOptions.map((bank) => (
                                <button
                                  key={bank.id}
                                  onClick={() => handleBankSelection(bank)}
                                  className={`w-full flex items-center justify-between p-3 rounded-md border transition-colors duration-200 ${
                                    emiParams.selectedBank.id === bank.id
                                      ? `ring-2 ring-red-500 ${darkMode ? "bg-red-900/20" : "bg-red-50"}`
                                      : darkMode
                                        ? "border-gray-600 hover:border-red-400 hover:bg-gray-700"
                                        : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="w-20 h-10 relative mr-3">
                                      <Image
                                        src={bank.logo || "/placeholder.svg"}
                                        alt={bank.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{bank.name}</p>
                                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        {bank.interestRate}% Interest
                                      </p>
                                    </div>
                                  </div>
                                  {emiParams.selectedBank.id === bank.id && <Check className="w-5 h-5 text-red-600" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-4">EMI Results</h3>
                            <div
                              className={`p-4 rounded-md border ${
                                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Monthly EMI:</span>
                                <span className="font-medium">₹{emiResult.monthlyEmi.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Total Interest:</span>
                                <span className="font-medium">₹{emiResult.totalInterest.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Processing Fee:</span>
                                <span className="font-medium">₹{emiResult.processingFee.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Total Amount:</span>
                                <span className="font-medium">₹{emiResult.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Maintenance Cost Calculator */}
            <div
              ref={maintenanceCalculatorRef}
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <button
                  onClick={() => setShowMaintenanceCalculator(!showMaintenanceCalculator)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Wrench className={`w-6 h-6 mr-3 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                    <h2 className="text-xl font-bold">Maintenance Cost</h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } transition-transform duration-300 ${showMaintenanceCalculator ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <AnimatePresence>
                {showMaintenanceCalculator && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className={`w-full border-collapse ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                          <thead>
                            <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                              <th
                                className={`px-4 py-3 text-left font-semibold ${
                                  darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                }`}
                              >
                                Service Period
                              </th>
                              <th
                                className={`px-4 py-3 text-left font-semibold ${
                                  darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                }`}
                              >
                                Cost (₹)
                              </th>
                              <th
                                className={`px-4 py-3 text-left font-semibold ${
                                  darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                }`}
                              >
                                Items Included
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {maintenanceCostData.map((service, index) => (
                              <tr
                                key={index}
                                className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"} transition-colors`}
                              >
                                <td
                                  className={`px-4 py-3 ${
                                    darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                  }`}
                                >
                                  {service.period}
                                </td>
                                <td
                                  className={`px-4 py-3 ${
                                    darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                  }`}
                                >
                                  {service.cost.toLocaleString()}
                                </td>
                                <td
                                  className={`px-4 py-3 ${
                                    darkMode ? "border-b border-gray-700" : "border-b border-gray-200"
                                  }`}
                                >
                                  <ul className="list-disc list-inside">
                                    {service.items.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                            <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                              <td className="px-4 py-3 font-semibold">Average Yearly Cost</td>
                              <td className="px-4 py-3 font-semibold">
                                ₹{(maintenanceCostData.reduce((sum, item) => sum + item.cost, 0) / 2).toLocaleString()}
                              </td>
                              <td className="px-4 py-3"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fuel Cost Calculator */}
            <div
              ref={fuelCalculatorRef}
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <button
                  onClick={() => setShowFuelCalculator(!showFuelCalculator)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Fuel className={`w-6 h-6 mr-3 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                    <h2 className="text-xl font-bold">Fuel Cost Calculator</h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } transition-transform duration-300 ${showFuelCalculator ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <AnimatePresence>
                {showFuelCalculator && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <label
                              htmlFor="distance"
                              className={`block text-sm font-medium mb-1 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Distance (km)
                            </label>
                            <input
                              type="number"
                              id="distance"
                              value={fuelParams.distance}
                              onChange={(e) => setFuelParams({ ...fuelParams, distance: Number(e.target.value) })}
                              className={`w-full p-2 border rounded-md ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              } focus:outline-none focus:ring-2 focus:ring-red-500`}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="fuelPrice"
                              className={`block text-sm font-medium mb-1 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Fuel Price (₹/L)
                            </label>
                            <input
                              type="number"
                              id="fuelPrice"
                              value={fuelParams.fuelPrice}
                              onChange={(e) => setFuelParams({ ...fuelParams, fuelPrice: Number(e.target.value) })}
                              className={`w-full p-2 border rounded-md ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              } focus:outline-none focus:ring-2 focus:ring-red-500`}
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Calculation</h3>
                          <div
                            className={`p-4 rounded-md border ${
                              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Bike Mileage:</span>
                              <span className="font-medium">{bike?.mileage} kmpl</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Fuel Required:</span>
                              <span className="font-medium">
                                {(fuelParams.distance / (bike?.mileage || 1)).toFixed(2)} L
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Total Fuel Cost:</span>
                              <span className="font-medium">₹{Math.round(fuelCost).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enquiry Form */}
            <div
              id="enquiry-form"
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <h2 className="text-xl font-bold">Enquire Now</h2>
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Fill out the form below to get more information about the {bike.name}.
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-2 border rounded-md ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-2 border rounded-md ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-2 border rounded-md ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 px-6 py-3 rounded-md font-medium ${
                      darkMode
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                    } transition-colors w-full`}
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Overview and Actions */}
          <div className="lg:w-1/3">
            <div
              className={`p-6 rounded-xl border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3">₹{bike.price.toLocaleString()}</h2>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Ex-Showroom Price, {bike.city}
                </p>
                {bike.onSale && (
                  <div className="mt-2">
                    <span className="text-green-600 font-medium">
                      {Math.round(((bike.oldPrice - bike.price) / bike.oldPrice) * 100)}% Off
                    </span>
                    <span className={`ml-2 text-sm line-through ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      ₹{bike.oldPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Select Color</h3>
                <div className="flex items-center gap-3">
                  {bike.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? `scale-110 ring-2 ${darkMode ? "ring-red-500" : "ring-red-500"}`
                          : darkMode
                            ? "border-gray-600 hover:border-red-400"
                            : "border-gray-200 hover:border-red-300"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Key Specs</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Engine</span>
                    <span className="font-medium">{bike.engineCC}cc</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Power</span>
                    <span className="font-medium">{bike.power} bhp</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Mileage</span>
                    <span className="font-medium">{bike.mileage} kmpl</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Top Speed</span>
                    <span className="font-medium">{bike.topSpeed} km/h</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link
                  href={`/bikes/${bike.slug}/test-ride`}
                  className={`flex items-center justify-center px-6 py-3 rounded-md font-medium ${
                    darkMode
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                  } transition-colors`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Test Ride
                </Link>
                <a
                  href={`tel:+919693245941`}
                  className={`flex items-center justify-center px-6 py-3 rounded-md font-medium ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                  } transition-colors`}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call for Price Quote
                </a>
              </div>
            </div>

            {/* Sponsored Bikes */}
            <div
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <h2 className="text-xl font-bold">Sponsored Bikes</h2>
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Check out these sponsored bikes that might interest you.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {sponsoredBikes.slice(0, 2).map((sponsoredBike) => (
                  <Link
                    key={sponsoredBike.id}
                    href={`/bikes/${sponsoredBike.slug}`}
                    className={`flex items-center p-3 rounded-md transition-colors duration-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-24 h-16 relative rounded-md overflow-hidden mr-3">
                      <Image
                        src={sponsoredBike.image || "/placeholder.svg"}
                        alt={sponsoredBike.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{sponsoredBike.name}</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ₹{sponsoredBike.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Bikes */}
            <div
              className={`mt-8 rounded-xl overflow-hidden border ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-lg"
              }`}
            >
              <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <h2 className="text-xl font-bold">Related Bikes</h2>
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  You might also like these bikes.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {relatedBikes.map((relatedBike) => (
                  <Link
                    key={relatedBike.id}
                    href={`/bikes/${relatedBike.slug}`}
                    className={`flex items-center p-3 rounded-md transition-colors duration-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-24 h-16 relative rounded-md overflow-hidden mr-3">
                      <Image
                        src={relatedBike.images[0] || "/placeholder.svg"}
                        alt={relatedBike.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{relatedBike.name}</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ₹{relatedBike.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
