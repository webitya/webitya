"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FaQuoteLeft, FaFeatherAlt, FaBookOpen, FaImage, FaHeart, FaMoon, FaStar } from "react-icons/fa"
import { BsStars, BsFlower1, BsFlower2 } from "react-icons/bs"
import { articlesData } from "../../components/ShreeWrites/data/articles"
import { poetryData } from "../../components/ShreeWrites/data/poetry"
import { quotesData } from "../../components/ShreeWrites/data/quotes"
import { imagesData } from "../../components/ShreeWrites/data/images"
import ArticleCard from "../../components/ShreeWrites/components/ArticleCard"
import PoetryCard from "../../components/ShreeWrites/components/PoetryCard"
import QuoteCard from "../../components/ShreeWrites/components/QuoteCard"
import ImageGallery from "../../components/ShreeWrites/components/ImageGallery"
import Footer from "@/components/FooterEl"

export default function ShreeWritesPage() {
  const [activeTab, setActiveTab] = useState("articles")

  const tabs = [
    { id: "articles", label: "Articles", icon: FaBookOpen, color: "from-rose-300 to-pink-300" },
    { id: "poetry", label: "Poetry", icon: FaFeatherAlt, color: "from-lavender-300 to-purple-300" },
    { id: "quotes", label: "Quotes", icon: FaQuoteLeft, color: "from-sage-300 to-emerald-300" },
    { id: "gallery", label: "Gallery", icon: FaImage, color: "from-red-200 to-red-400" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
 <>
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-rose-50 to-lavender-50 relative overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-20 text-rose-200 opacity-40 z-0"
      >
        <BsFlower1 size={80} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-40 left-16 text-lavender-200 opacity-30 z-0"
      >
        <BsFlower2 size={60} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute bottom-32 right-32 text-sage-200 opacity-35 z-0"
      >
        <FaMoon size={50} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        className="absolute bottom-20 left-20 text-peach-200 opacity-40 z-0"
      >
        <FaStar size={40} />
      </motion.div>

      {/* Soft Particle Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-rose-200 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative py-24 px-4 text-center z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/30 via-lavender-100/30 to-sage-100/30 backdrop-blur-sm"></div>

        <motion.div
          className="relative z-20 max-w-5xl mx-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        >
          <motion.h1
            className="text-7xl md:text-9xl font-light bg-gradient-to-r from-rose-400 via-lavender-500 to-sage-500 bg-clip-text text-transparent mb-8 tracking-wide"
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={{ letterSpacing: "0.1em", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            Shree Writes
          </motion.h1>

          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-rose-300 to-lavender-300 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Where whispered thoughts become eternal verses, and every word carries the gentle weight of dreams
          </motion.p>

          <motion.div
            className="flex justify-center items-center mt-12 space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <BsStars className="text-rose-300" size={24} />
            </motion.div>
            <FaHeart className="text-coral-400 animate-pulse" size={20} />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <FaFeatherAlt className="text-lavender-400" size={22} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Navigation Tabs */}
<motion.div
  className="flex justify-center px-4 mb-16 relative z-10"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  <div className="bg-white/70 backdrop-blur-md rounded-full p-2 sm:p-3 shadow-2xl border border-white/40 shadow-rose-100/50 w-full max-w-screen-lg">
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-500 text-sm sm:text-base font-semibold ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-xl shadow-rose-200/50`
                : "text-slate-700 hover:text-slate-900 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon size={18} />
            <span className="tracking-wide drop-shadow-sm">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  </div>
</motion.div>



      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible">
          {activeTab === "articles" && (
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-rose-400 to-coral-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Thoughtful Articles
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articlesData.map((article, index) => (
                  <motion.div
                    key={article.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "poetry" && (
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-lavender-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Poetry Garden
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-10">
                {poetryData.map((poem, index) => (
                  <motion.div
                    key={poem.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, rotateY: 5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <PoetryCard poem={poem} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "quotes" && (
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-sage-400 to-emerald-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Whispered Wisdom
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quotesData.map((quote, index) => (
                  <motion.div
                    key={quote.id}
                    variants={itemVariants}
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <QuoteCard quote={quote} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-peach-400 to-coral-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Visual Poetry
              </motion.h2>
              <ImageGallery images={imagesData} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    <Footer/>
 </>
  )
}
