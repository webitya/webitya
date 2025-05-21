"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaWordpress,
  FaShoppingCart,
  FaBlog,
  FaCheckCircle,
  FaLaptopCode,
  FaUserGraduate,
  FaRegFileAlt,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaPlay,
  FaQuoteLeft,
} from "react-icons/fa"
import { MdOutlineSpeed, MdSupportAgent } from "react-icons/md"
import CourseCard from "./components/CourseCard"
import SuccessModal from "./components/SuccessModal"
import VideoModal from "./components/VideoModal"

export default function WordPressCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: null })

  // WordPress theme colors
  const wpColors = {
    primary: "#0073aa",
    secondary: "#00a0d2",
    accent: "#826eb4",
    success: "#46b450",
    warning: "#ffb900",
    error: "#dc3232",
    gray: "#32373c",
    lightGray: "#f1f1f1",
    darkGray: "#23282d",
    white: "#ffffff",
  }

  const courses = [
    {
      id: 1,
      title: "Basic WordPress Course",
      description:
        "Perfect for beginners who want to learn WordPress from scratch. Master the fundamentals and build your first website.",
      price: 149,
      icon: <FaWordpress className="text-5xl text-[#0073aa]" />,
      features: [
        "WordPress installation and setup",
        "Theme customization",
        "Basic plugin management",
        "Content creation and management",
        "SEO fundamentals",
        "Website security basics",
        "Performance optimization",
      ],
      syllabus: "/wordpress-courses/syllabi/basic-wordpress-syllabus.pdf",
      driveFolderId: "1ABC123xyz_basic",
      color: wpColors.primary,
      duration: "4 weeks",
      lessons: 12,
      introVideo: "basic-wordpress-intro",
    },
    {
      id: 2,
      title: "Blogging WordPress Course",
      description:
        "Learn how to create and manage a successful blog using WordPress. Ideal for content creators and writers.",
      price: 149,
      icon: <FaBlog className="text-5xl text-[#00a0d2]" />,
      features: [
        "Blog setup and configuration",
        "Content strategy development",
        "SEO optimization for blogs",
        "Monetization strategies",
        "Growing your audience",
        "Email marketing integration",
        "Analytics and performance tracking",
      ],
      syllabus: "/wordpress-courses/syllabi/blogging-wordpress-syllabus.pdf",
      driveFolderId: "2DEF456xyz_blogging",
      color: wpColors.secondary,
      duration: "5 weeks",
      lessons: 15,
      introVideo: "blogging-wordpress-intro",
    },
    {
      id: 3,
      title: "E-commerce WordPress Course",
      description:
        "Transform your WordPress site into a powerful online store. Learn WooCommerce and e-commerce best practices.",
      price: 149,
      icon: <FaShoppingCart className="text-5xl text-[#826eb4]" />,
      features: [
        "WooCommerce setup and configuration",
        "Product management",
        "Payment gateway integration",
        "Order processing workflow",
        "E-commerce SEO strategies",
        "Customer management",
        "Store analytics and reporting",
      ],
      syllabus: "/wordpress-courses/syllabi/ecommerce-wordpress-syllabus.pdf",
      driveFolderId: "3GHI789xyz_ecommerce",
      color: wpColors.accent,
      duration: "6 weeks",
      lessons: 18,
      introVideo: "ecommerce-wordpress-intro",
    },
  ]

  const tutors = [
    {
      id: 1,
      name: "Aditya",
      role: "Digital Marketing Trainer",
      bio: "Aditya is a seasoned Digital Marketing expert with over 8 years of experience helping businesses grow their online presence. He specializes in SEO, content marketing, and social media strategies for WordPress websites.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "https://linkedin.com/in/aditya",
        twitter: "https://twitter.com/aditya",
      },
      expertise: ["SEO", "Content Marketing", "Social Media", "Analytics", "Email Marketing"],
      courses: ["Basic WordPress Course", "Blogging WordPress Course"],
    },
    {
      id: 2,
      name: "Sachin Kumar",
      role: "WordPress Developer",
      bio: "Sachin Kumar is a professional WordPress developer with 10+ years of experience building custom themes and plugins. He has worked with hundreds of clients to create powerful, scalable WordPress solutions.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "https://linkedin.com/in/sachinkumar",
        twitter: "https://twitter.com/sachinkumar",
      },
      expertise: [
        "WordPress Development",
        "WooCommerce",
        "Custom Themes",
        "Plugin Development",
        "Performance Optimization",
      ],
      courses: ["Basic WordPress Course", "E-commerce WordPress Course"],
    },
  ]

  const testimonialVideos = [
    {
      id: "testimonial-1",
      name: "Rahul Sharma",
      role: "Freelance Web Designer",
      thumbnail: "/placeholder.svg?height=180&width=320",
      videoId: "testimonial-video-1",
      quote: "The WordPress courses at Webitya completely transformed my freelance career. I'm now earning 3x more!",
    },
    {
      id: "testimonial-2",
      name: "Priya Patel",
      role: "E-commerce Store Owner",
      thumbnail: "/placeholder.svg?height=180&width=320",
      videoId: "testimonial-video-2",
      quote: "Thanks to the E-commerce WordPress course, I was able to launch my online store in just two weeks.",
    },
    {
      id: "testimonial-3",
      name: "Amit Singh",
      role: "Content Creator",
      thumbnail: "/placeholder.svg?height=180&width=320",
      videoId: "testimonial-video-3",
      quote: "The blogging course helped me optimize my website and increase my traffic by over 200%.",
    },
  ]

  const handlePaymentMethod = (course, method) => {
    setSelectedCourse(course)

    if (method === "whatsapp") {
      // Open WhatsApp with pre-filled message
      const message = `Hi, I'm interested in enrolling for the ${course.title} priced at ₹${course.price}. Please provide more details.`
      window.open(`https://wa.me/919693245941?text=${encodeURIComponent(message)}`, "_blank")
    } else if (method === "razorpay") {
      // Call the Razorpay API route
      initiateRazorpayPayment(course)
    }
  }

  const initiateRazorpayPayment = async (course) => {
    try {
      const response = await fetch("/wordpress-courses/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: course.price * 100, // Razorpay expects amount in paise
          currency: "INR",
          receipt: `receipt_${course.id}_${Date.now()}`,
          notes: {
            courseId: course.id,
            courseTitle: course.title,
            driveFolderId: course.driveFolderId,
          },
        }),
      })

      const data = await response.json()

      if (data.id) {
        // Load Razorpay script dynamically
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
          const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual key
            amount: course.price * 100,
            currency: "INR",
            name: "Webitya",
            description: `Payment for ${course.title}`,
            order_id: data.id,
            handler: (response) => {
              // Handle successful payment
              verifyPayment(response, course)
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            theme: {
              color: course.color,
            },
          }

          const paymentObject = new window.Razorpay(options)
          paymentObject.open()
        }
      }
    } catch (error) {
      console.error("Payment initiation failed:", error)
      alert("Payment initiation failed. Please try again.")
    }
  }

  const verifyPayment = async (paymentResponse, course) => {
    try {
      const response = await fetch("/wordpress-courses/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          course: course,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Set payment info for the success modal
        setPaymentInfo({
          courseTitle: course.title,
          orderId: paymentResponse.razorpay_order_id,
          paymentId: paymentResponse.razorpay_payment_id,
          driveFolderId: course.driveFolderId,
          driveUrl: `https://drive.google.com/drive/folders/${course.driveFolderId}`,
        })

        // Show success modal
        setShowSuccessModal(true)
      } else {
        alert("Payment verification failed. Please contact support.")
      }
    } catch (error) {
      console.error("Payment verification failed:", error)
      alert("Payment verification failed. Please contact support.")
    }
  }

  const handleDownloadSyllabus = (syllabusUrl, courseTitle) => {
    // In a real implementation, you would have actual PDF files
    // For now, we'll just show an alert
    alert(`Downloading syllabus for ${courseTitle}. In a real implementation, this would download the PDF.`)

    // If you have actual PDFs, you can use this:
    // const link = document.createElement('a')
    // link.href = syllabusUrl
    // link.download = `${courseTitle.replace(/\s+/g, '-').toLowerCase()}-syllabus.pdf`
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

  const openVideoModal = (videoId) => {
    setVideoModal({ isOpen: true, videoId })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoId: null })
  }

  return (
  <>
    <div className="min-h-screen bg-[#f1f1f1]">
      <main>
        {/* WordPress-themed Hero Section */}
        <section className="bg-gradient-to-r from-[#0073aa] to-[#00a0d2] text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <FaWordpress className="text-7xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Master WordPress with Webitya</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Professional WordPress courses at affordable prices. Learn to build, customize, and manage WordPress
                websites like a pro.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#courses"
                  className="bg-white text-[#0073aa] px-8 py-4 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300 shadow-lg"
                >
                  Explore Courses
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* WordPress-themed wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-12"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-[#f1f1f1]"
              ></path>
            </svg>
          </div>
        </section>

        {/* Course Intro Video Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Our WordPress Courses</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Watch our introduction video to learn more about our comprehensive WordPress courses and how they can
                help you achieve your goals.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => openVideoModal("course-intro-video")}
              >
                <img
                  src="/placeholder.svg?height=720&width=1280"
                  alt="WordPress Course Introduction"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition duration-300">
                  <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition duration-300">
                    <FaPlay className="text-[#0073aa] text-3xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">WordPress Courses Overview</h3>
                  <p className="text-white text-opacity-90">
                    Learn how our courses can transform your WordPress skills
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Stats */}
        <section className="py-16 bg-[#f1f1f1]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-[#0073aa] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaUserGraduate className="text-[#0073aa] text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
                <p className="text-gray-600">Students Enrolled</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-[#00a0d2] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaLaptopCode className="text-[#00a0d2] text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">45+</h3>
                <p className="text-gray-600">Total Lessons</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-[#826eb4] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MdOutlineSpeed className="text-[#826eb4] text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">15+</h3>
                <p className="text-gray-600">Hours of Content</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-[#46b450] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MdSupportAgent className="text-[#46b450] text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">24/7</h3>
                <p className="text-gray-600">Support Available</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet Our Tutors Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Expert Tutors</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Learn from industry professionals with years of experience in WordPress development and digital
                marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {tutors.map((tutor, index) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-[#f8f9fa] rounded-lg overflow-hidden shadow-md"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-full h-full object-cover md:h-full"
                        style={{ minHeight: "300px" }}
                      />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{tutor.name}</h3>
                      <p className="text-[#0073aa] font-medium mb-4">{tutor.role}</p>
                      <p className="text-gray-600 mb-4">{tutor.bio}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.expertise.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-[#0073aa] bg-opacity-10 text-[#0073aa] px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Courses:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {tutor.courses.map((course, idx) => (
                            <li key={idx}>{course}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex space-x-3">
                        <a
                          href={tutor.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#0073aa] transition duration-300"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a
                          href={tutor.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#0073aa] transition duration-300"
                        >
                          <FaTwitter className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-[#f1f1f1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn WordPress with Us?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our WordPress courses are designed to help you master the world's most popular CMS quickly and
                effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#0073aa]"
              >
                <div className="bg-[#0073aa] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaWordpress className="text-[#0073aa] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instruction</h3>
                <p className="text-gray-600">
                  Learn from industry professionals with years of WordPress experience and real-world project insights.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#00a0d2]"
              >
                <div className="bg-[#00a0d2] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaRegFileAlt className="text-[#00a0d2] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Practical Learning</h3>
                <p className="text-gray-600">
                  Hands-on projects and real-world applications to build your portfolio and apply your skills
                  immediately.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#826eb4]"
              >
                <div className="bg-[#826eb4] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-[#826eb4] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-gray-600">
                  Quality education at just ₹149 per course - accessible to everyone who wants to learn WordPress.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our WordPress Courses</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Choose the perfect WordPress course to match your goals and take your skills to the next level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  onPaymentSelect={handlePaymentMethod}
                  onDownloadSyllabus={handleDownloadSyllabus}
                  onWatchIntro={() => openVideoModal(course.introVideo)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="py-16 bg-[#f1f1f1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Success Stories</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Watch what our students have to say about their experience with our WordPress courses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonialVideos.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative cursor-pointer group" onClick={() => openVideoModal(testimonial.videoId)}>
                    <img
                      src={testimonial.thumbnail || "/placeholder.svg"}
                      alt={`${testimonial.name} Testimonial`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition duration-300">
                      <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition duration-300">
                        <FaPlay className="text-[#0073aa] text-lg ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <FaQuoteLeft className="text-[#0073aa] text-opacity-20 text-4xl mr-3 mt-1" />
                      <p className="text-gray-700 italic">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 bg-[#0073aa] text-white rounded-full flex items-center justify-center mr-3 font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our comprehensive WordPress courses cover everything you need to become proficient with WordPress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-[#0073aa] bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FaWordpress className="text-[#0073aa]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">WordPress Fundamentals</h3>
                    <p className="text-gray-600">
                      Learn the core concepts of WordPress, including the dashboard, posts, pages, media management, and
                      user roles.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-[#00a0d2] bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FaRegFileAlt className="text-[#00a0d2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Theme Customization</h3>
                    <p className="text-gray-600">
                      Master theme selection, customization, and learn how to modify themes to match your brand
                      identity.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-[#826eb4] bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FaShoppingCart className="text-[#826eb4]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">E-commerce Setup</h3>
                    <p className="text-gray-600">
                      Set up and configure WooCommerce to create a professional online store with secure payment
                      processing.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-[#46b450] bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FaBlog className="text-[#46b450]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Content Strategy</h3>
                    <p className="text-gray-600">
                      Develop effective content strategies for blogs and websites to engage your audience and drive
                      traffic.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#f1f1f1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our WordPress courses.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#0073aa]"
              >
                <h3 className="font-semibold text-lg mb-2">How do I access the course after purchase?</h3>
                <p className="text-gray-700">
                  After successful payment, you'll be redirected to our Google Drive folder where all course materials
                  are available. You'll also receive an email with the access link.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#00a0d2]"
              >
                <h3 className="font-semibold text-lg mb-2">How long do I have access to the course?</h3>
                <p className="text-gray-700">
                  You'll have lifetime access to the course materials in the Google Drive folder, including any future
                  updates we make to the content.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#826eb4]"
              >
                <h3 className="font-semibold text-lg mb-2">Do I need any prior experience to take these courses?</h3>
                <p className="text-gray-700">
                  No prior experience is needed for the Basic WordPress course. For the Blogging and E-commerce courses,
                  basic WordPress knowledge is helpful but not required.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] p-6 rounded-lg border-l-4 border-[#46b450]"
              >
                <h3 className="font-semibold text-lg mb-2">Can I download the course materials?</h3>
                <p className="text-gray-700">
                  Yes, all course materials in the Google Drive folder can be downloaded for offline viewing. This
                  includes videos, PDFs, and exercise files.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#0073aa] to-[#00a0d2] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <FaWordpress className="text-5xl" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Ready to Master WordPress?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their skills with our WordPress courses
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#courses"
                className="bg-white text-[#0073aa] px-8 py-4 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Enroll Now for Just ₹149
              </a>
            </motion.div>

            <div className="mt-8 flex justify-center space-x-6">
              <a href="https://wa.me/919693245941" className="text-white hover:text-gray-200 transition duration-300">
                <FaWhatsapp className="w-8 h-8" />
              </a>
              <a href="mailto:info@webitya.com" className="text-white hover:text-gray-200 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && paymentInfo && (
          <SuccessModal paymentInfo={paymentInfo} onClose={() => setShowSuccessModal(false)} />
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.isOpen && <VideoModal videoId={videoModal.videoId} onClose={closeVideoModal} />}
      </AnimatePresence>
    </div>
  
  </>
  )
}
