"use client"
import { motion } from "framer-motion"
import { PlayCircle, Code, School, Quiz, Assignment, YouTube, Verified, Speed } from "@mui/icons-material"

const features = [
  {
    icon: <YouTube className="text-3xl" />,
    title: "YouTube Integration",
    description: "Direct links to video tutorials for visual learning with synchronized content",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <Code className="text-3xl" />,
    title: "Hands-on Projects",
    description: "Build real projects while learning concepts with step-by-step guidance",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Quiz className="text-3xl" />,
    title: "Interactive Quizzes",
    description: "Test your knowledge with engaging quizzes and instant feedback",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <School className="text-3xl" />,
    title: "Skill India Aligned",
    description: "Courses aligned with government skill programs and industry standards",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Assignment className="text-3xl" />,
    title: "Portfolio Projects",
    description: "Build impressive portfolio projects that showcase your skills to employers",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <Verified className="text-3xl" />,
    title: "Certification",
    description: "Earn certificates upon completion to validate your learning achievements",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: <Speed className="text-3xl" />,
    title: "Self-Paced Learning",
    description: "Learn at your own pace with lifetime access to course materials",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: <PlayCircle className="text-3xl" />,
    title: "Live Coding Sessions",
    description: "Watch live coding demonstrations and follow along with real examples",
    color: "bg-cyan-100 text-cyan-600",
  },
]

export default function FeaturesSection() {
  return (
    <motion.section
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Webitya Learning?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most comprehensive and engaging web development education platform designed specifically for
            Indian learners.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
