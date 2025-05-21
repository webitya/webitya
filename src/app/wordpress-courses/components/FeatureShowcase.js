"use client"

import { motion } from "framer-motion"
import { FaVideo, FaFileDownload, FaUserGraduate, FaLaptopCode, FaHeadset, FaCertificate } from "react-icons/fa"

export default function FeatureShowcase() {
  const features = [
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: "HD Video Lessons",
      description: "Crystal clear video tutorials with professional narration and step-by-step guidance",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaFileDownload className="text-white text-2xl" />,
      title: "Downloadable Resources",
      description: "Get access to premium templates, plugins, and course materials to accelerate your learning",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <FaUserGraduate className="text-white text-2xl" />,
      title: "Expert Instruction",
      description: "Learn from industry professionals with years of WordPress development experience",
      color: "from-[#21759b] to-teal-500",
    },
    {
      icon: <FaLaptopCode className="text-white text-2xl" />,
      title: "Practical Projects",
      description: "Build real-world websites and applications that you can add to your portfolio",
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: <FaHeadset className="text-white text-2xl" />,
      title: "Premium Support",
      description: "Get your questions answered quickly with our dedicated support team",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <FaCertificate className="text-white text-2xl" />,
      title: "Certification",
      description: "Receive a professional certificate upon course completion to showcase your skills",
      color: "from-emerald-500 to-green-500",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="p-8">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
