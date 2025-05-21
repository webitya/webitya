"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaWordpress, FaArrowRight, FaPlay, FaShoppingCart, FaCheck } from "react-icons/fa"
import { HiOutlineSparkles } from "react-icons/hi"
import CourseCard from "./components/CourseCard"
import VideoModal from "./components/VideoModal"
// import TestimonialCarousel from "./components/TestimonialCarousel"
import TutorSection from "./components/TutorSection"
import PaymentModal from "./components/PaymentModal"
import { courses } from "./data/courses"
import { testimonials } from "./data/testimonials"
import { tutors } from "./data/tutors"
import TestimonialSection from "./components/TestimonialSlider"
import Footer from "@/components/FooterEl"

export default function WordPressCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoType, setVideoType] = useState("intro") // 'intro' or 'demo'
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleOpenVideo = (course, type) => {
    setSelectedCourse(course)
    setVideoType(type)
    setShowVideoModal(true)
  }

  const handleBuyCourse = (course) => {
    setSelectedCourse(course)
    setShowPaymentModal(true)
  }

  const handleDownloadSyllabus = (syllabusUrl) => {
    window.open(syllabusUrl, "_blank")
  }

  return (
     <>
         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Sticky Header */}
      {/* <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaWordpress className="text-[#21759b] text-2xl mr-2" />
            <span className="font-semibold text-gray-900">WordPress Courses</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#courses" className="text-gray-600 hover:text-[#21759b] transition-colors duration-200">
              Courses
            </a>
            <a href="#tutors" className="text-gray-600 hover:text-[#21759b] transition-colors duration-200">
              Tutors
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#21759b] transition-colors duration-200">
              Testimonials
            </a>
            <button
              onClick={() => handleBuyCourse(courses[0])}
              className="bg-[#21759b] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1d6586] transition-colors duration-200 flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="py-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#21759b]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-[#21759b]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-6">
                <HiOutlineSparkles className="mr-1" /> Premium WordPress Education
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master WordPress with Expert Guidance
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Comprehensive courses to help you build stunning websites, blogs, and online stores with the world's
                most popular CMS.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#courses"
                  className="px-6 py-3 bg-[#21759b] text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Courses
                  <FaArrowRight className="ml-2 text-sm" />
                </motion.a>
                <motion.a
                  href="#preview"
                  className="px-6 py-3 bg-white text-[#21759b] font-medium rounded-full border border-[#21759b]/20 shadow-sm hover:shadow-md hover:border-[#21759b]/40 transition-all duration-200 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenVideo(courses[0], "demo")}
                >
                  <FaPlay className="mr-2 text-sm" />
                  Watch Preview
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/10 rounded-2xl blur-lg"></div>
                <div className="relative bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#21759b]/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-[#21759b]/10 rounded-full blur-xl"></div>
                  
                  <img
                    src="/wordpress-courses/images/hero-image.jpg"
                    alt="WordPress Course"
                    className="w-full h-auto rounded-lg shadow-md mb-6"
                  />
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">WordPress Mastery</h3>
                      <p className="text-[#21759b]">3 Premium Courses</p>
                    </div>
                    <div className="bg-[#21759b]/10 px-3 py-1 rounded-full">
                      <span className="text-[#21759b] font-semibold">₹149 each</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {["Lifetime Access", "Certificate Included", "Expert Support"].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-4">
              <HiOutlineSparkles className="mr-1" /> PREMIUM COURSES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your WordPress Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect course to start your WordPress journey. All courses include lifetime access and
              certificate of completion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onPlayIntro={() => handleOpenVideo(course, "intro")}
                onPlayDemo={() => handleOpenVideo(course, "demo")}
                onBuy={() => handleBuyCourse(course)}
                onDownloadSyllabus={() => handleDownloadSyllabus(course.syllabusUrl)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-4">
              <HiOutlineSparkles className="mr-1" /> PREMIUM BENEFITS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Courses</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our WordPress courses are designed to provide you with the skills and knowledge you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👨‍🏫",
                title: "Expert Instruction",
                description:
                  "Learn from industry professionals with years of WordPress development experience and real-world insights.",
              },
              {
                icon: "💻",
                title: "Practical Projects",
                description:
                  "Build real-world websites and applications that you can add to your portfolio and showcase to clients.",
              },
              {
                icon: "🔄",
                title: "Lifetime Access",
                description:
                  "Purchase once and access forever. Our courses include lifetime access to all materials and updates.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-4">
              <HiOutlineSparkles className="mr-1" /> STUDENT TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have transformed their skills with our WordPress courses.
            </p>
          </div>

          <TestimonialSection testimonials={testimonials} />
        </div>
      </section>

      {/* Tutors Section */}
      <section id="tutors" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-4">
              <HiOutlineSparkles className="mr-1" /> EXPERT INSTRUCTORS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Your Tutors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from experienced WordPress professionals who are passionate about teaching.
            </p>
          </div>

          <TutorSection tutors={tutors} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21759b]/10 text-[#21759b] text-sm font-medium mb-4">
              <HiOutlineSparkles className="mr-1" /> FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our WordPress courses.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long do I have access to the course?",
                answer:
                  "You have lifetime access to all course materials once purchased. You can revisit the content anytime you need.",
              },
              {
                question: "Do I need any prior experience with WordPress?",
                answer:
                  "No prior experience is needed for our Basic WordPress Course. For the Blogging and E-commerce courses, basic WordPress knowledge is helpful but not required.",
              },
              {
                question: "How do I get support if I have questions?",
                answer:
                  "We provide support through WhatsApp and email. Our tutors are available to answer your questions during business hours.",
              },
              {
                question: "Will I receive a certificate after completing the course?",
                answer: "Yes, you will receive a certificate of completion after finishing all course modules.",
              },
              {
                question: "Can I pay in installments?",
                answer: "Currently, we only offer one-time payment options through PhonePe or WhatsApp UPI.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 relative group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/10 to-[#21759b]/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden shadow-sm">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <span className="ml-6 flex-shrink-0 text-[#21759b] transition-transform duration-300 group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#21759b] to-[#1d6586]"></div>
          <div className="absolute inset-0 bg-[url('/wordpress-courses/images/wp-pattern.png')] bg-repeat opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-lg"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 shadow-xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Master WordPress?</h2>
                  <p className="text-xl text-white/90 mb-8">
                    Start your WordPress journey today and build the skills you need to create amazing websites.
                  </p>
                  <motion.button
                    onClick={() => handleBuyCourse(courses[0])}
                    className="px-8 py-4 bg-white text-[#21759b] font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaShoppingCart className="mr-2" />
                    Get Started Now
                  </motion.button>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                  <h3 className="text-white text-xl font-semibold mb-4">Bundle Offer</h3>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex justify-between items-center">
                        <span className="text-white/90">{course.title}</span>
                        <span className="text-white font-medium">₹149</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <span className="text-white font-semibold">Bundle Price</span>
                      <div className="text-right">
                        <span className="text-white/70 text-sm line-through block">₹447</span>
                        <span className="text-white text-xl font-bold">₹399</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleBuyCourse(courses[0])}
                      className="w-full py-3 bg-white text-[#21759b] font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Buy Bundle & Save
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && selectedCourse && (
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoUrl={videoType === "intro" ? selectedCourse.introVideoUrl : selectedCourse.demoVideoUrl}
          title={`${videoType === "intro" ? "Introduction to" : "Demo of"} ${selectedCourse.title}`}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedCourse && (
        <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} course={selectedCourse} />
      )}
    </div>
    <Footer/>
     </>
  )
}
