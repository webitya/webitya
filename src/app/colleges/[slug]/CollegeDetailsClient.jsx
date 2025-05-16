"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LocationOn,
  School,
  CalendarMonth,
  Star,
  StarBorder,
  Info,
  Book,
  Newspaper,
  YouTube,
  ArrowBack,
  Phone,
  Email,
  Language,
  Bookmark,
  BookmarkBorder,
  Share,
} from "@mui/icons-material"
import { colleges, sponsoredColleges } from "@/components/Colleges/data/collegesList"
import CampusGallery from "@/components/Colleges/colleges/CampusGallery"
import AdmissionSchedule from "@/components/Colleges//colleges/AdmissionSchedule"
import NewsUpdates from "@/components/Colleges//colleges/NewsUpdates"
import CoursesOffered from "@/components/Colleges//colleges/CoursesOffered"
import GoogleMap from "@/components/Colleges//colleges/GoogleMap"
import RelatedColleges from "@/components/Colleges//colleges/RelatedColleges"

export default function CollegeDetailsClient({ slug }) {
  const [college, setCollege] = useState(null)
  const [activeTab, setActiveTab] = useState("about")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Combine regular and sponsored colleges
    const allColleges = [...colleges, ...sponsoredColleges]

    // Find college by slug
    const foundCollege = allColleges.find((c) => c.slug === slug)
    setCollege(foundCollege)

    // Check if college is bookmarked
    if (foundCollege) {
      const bookmarkedColleges = JSON.parse(localStorage.getItem("bookmarkedColleges") || "[]")
      setIsBookmarked(bookmarkedColleges.includes(foundCollege.id))
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [slug])

  const toggleBookmark = () => {
    if (!college) return

    const bookmarkedColleges = JSON.parse(localStorage.getItem("bookmarkedColleges") || "[]")

    if (!isBookmarked) {
      bookmarkedColleges.push(college.id)
    } else {
      const index = bookmarkedColleges.indexOf(college.id)
      if (index > -1) {
        bookmarkedColleges.splice(index, 1)
      }
    }

    localStorage.setItem("bookmarkedColleges", JSON.stringify(bookmarkedColleges))
    setIsBookmarked(!isBookmarked)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college details...</p>
        </div>
      </div>
    )
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <School style={{ fontSize: 64 }} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">College not found</h2>
          <Link
            href="/colleges"
            className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Render stars for rating
  const renderRating = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="text-yellow-500" />)
      } else {
        stars.push(<StarBorder key={i} className="text-yellow-500" />)
      }
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with College Banner */}
      <section className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-r from-purple-900 to-indigo-800">
        <Image
          src={college.bannerImage || "/placeholder.svg?height=400&width=1200"}
          alt={college.name}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Link href="/colleges" className="inline-flex items-center text-white mb-4 hover:underline">
              <ArrowBack className="mr-1" /> Back to Colleges
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              {college.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center text-white gap-4 flex-wrap"
            >
              <div className="flex items-center">
                <LocationOn className="mr-1" />
                <span>
                  {college.city}, {college.state}
                </span>
              </div>
              <div className="flex items-center">
                <School className="mr-1" />
                <span>{college.type}</span>
              </div>
              <div className="flex items-center">
                <CalendarMonth className="mr-1" />
                <span>Est. {college.established}</span>
              </div>
              <div className="flex items-center">
                {renderRating(college.rating)}
                <span className="ml-1">({college.rating}/5)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* College Logo and Quick Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 relative rounded-lg overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0">
            <Image
              src={college.logo || "/placeholder.svg?height=128&width=128"}
              alt={`${college.name} logo`}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h2>
            <p className="text-gray-600 mb-4">{college.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {college.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={toggleBookmark}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
            >
              {isBookmarked ? <Bookmark className="mr-2" /> : <BookmarkBorder className="mr-2" />}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md inline-block text-center"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4 justify-between">
          {college.phone && (
            <a href={`tel:${college.phone}`} className="flex items-center text-gray-700 hover:text-purple-600">
              <Phone className="mr-2 text-purple-600" />
              <span>{college.phone}</span>
            </a>
          )}

          {college.email && (
            <a href={`mailto:${college.email}`} className="flex items-center text-gray-700 hover:text-purple-600">
              <Email className="mr-2 text-purple-600" />
              <span>{college.email}</span>
            </a>
          )}

          {college.website && (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-purple-600"
            >
              <Language className="mr-2 text-purple-600" />
              <span>{new URL(college.website).hostname}</span>
            </a>
          )}

          <button className="flex items-center text-gray-700 hover:text-purple-600">
            <Share className="mr-2 text-purple-600" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mt-8">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "about"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Info className="mr-1 text-sm" /> About
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "gallery"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Image width={16} height={16} src="/placeholder.svg" alt="" className="inline mr-1" /> Campus Gallery
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "courses"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Book className="mr-1 text-sm" /> Courses Offered
            </button>
            <button
              onClick={() => setActiveTab("admission")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "admission"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CalendarMonth className="mr-1 text-sm" /> Admission Schedule
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "news"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Newspaper className="mr-1 text-sm" /> News & Updates
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "videos"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <YouTube className="mr-1 text-sm" /> Videos
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "location"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LocationOn className="mr-1 text-sm" /> Location
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "about" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-4">
                    About {college.name}
                  </motion.h3>
                  <motion.div variants={itemVariants} className="prose max-w-none">
                    <p>{college.description}</p>

                    {college.history && (
                      <>
                        <h4 className="text-xl font-semibold mt-6 mb-3">History</h4>
                        <p>{college.history}</p>
                      </>
                    )}

                    {college.achievements && college.achievements.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold mt-6 mb-3">Achievements</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {college.achievements?.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {college.facilities && college.facilities.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold mt-6 mb-3">Facilities</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {college.facilities?.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "gallery" && <CampusGallery images={college.campusImages} />}

              {activeTab === "courses" && <CoursesOffered courses={college.courses} />}

              {activeTab === "admission" && <AdmissionSchedule schedule={college.admissionSchedule} />}

              {activeTab === "news" && <NewsUpdates news={college.news} />}

              {activeTab === "videos" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {college.videos?.map((video, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                        <div className="aspect-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-t-xl"
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-800">{video.title}</h4>
                          {video.description && <p className="mt-2 text-gray-600 text-sm">{video.description}</p>}
                        </div>
                      </div>
                    ))}

                    {(!college.videos || college.videos.length === 0) && (
                      <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                        <YouTube style={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No videos available</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <GoogleMap location={college.location} name={college.name} address={college.address} />
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <RelatedColleges currentCollegeId={college.id} state={college.state} type={college.type} />

            {/* Apply Now Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Interested in this college?</h3>
              <p className="text-gray-600 mb-4">
                Fill out our form and get more information about admissions, courses, and scholarships.
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md">
                Apply Now
              </button>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-gray-800">{college.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Established</span>
                  <span className="font-medium text-gray-800">{college.established}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium text-gray-800 flex items-center">
                    {college.rating}/5 <Star className="text-yellow-500 ml-1" style={{ width: 16, height: 16 }} />
                  </span>
                </li>
                {college.accreditation && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Accreditation</span>
                    <span className="font-medium text-gray-800">{college.accreditation}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-gray-600">Courses</span>
                  <span className="font-medium text-gray-800">{college.courses?.length || 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
