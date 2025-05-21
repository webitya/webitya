"use client"

import { motion } from "framer-motion"
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa"

export default function TutorSection({ tutors }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {tutors.map((tutor, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#21759b]/20 to-[#21759b]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img
                src={tutor.image || "/placeholder.svg?height=300&width=300"}
                alt={tutor.name}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-l"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
                <p className="text-white/90">{tutor.title}</p>
              </div>
            </div>

            <div className="md:w-3/5 p-6">
              <div className="hidden md:block">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-[#21759b] font-medium mb-4">{tutor.title}</p>
              </div>

              <p className="text-gray-600 mb-4">{tutor.bio}</p>

              <div className="flex space-x-3">
                {tutor.linkedin && (
                  <a
                    href={tutor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21759b]/10 p-2 rounded-full text-[#21759b] hover:bg-[#21759b]/20 transition-colors duration-200"
                    aria-label={`${tutor.name}'s LinkedIn profile`}
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                )}

                {tutor.twitter && (
                  <a
                    href={tutor.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21759b]/10 p-2 rounded-full text-[#21759b] hover:bg-[#21759b]/20 transition-colors duration-200"
                    aria-label={`${tutor.name}'s Twitter profile`}
                  >
                    <FaTwitter className="text-lg" />
                  </a>
                )}

                {tutor.website && (
                  <a
                    href={tutor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#21759b]/10 p-2 rounded-full text-[#21759b] hover:bg-[#21759b]/20 transition-colors duration-200"
                    aria-label={`${tutor.name}'s website`}
                  >
                    <FaGlobe className="text-lg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
