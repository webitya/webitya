"use client"

import { motion } from "framer-motion"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import BuildIcon from "@mui/icons-material/Build"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function DynamicProcessSteps() {
  const steps = [
    {
      icon: AssignmentIcon,
      title: "Discovery & Planning",
      description: "We analyze your business, goals, and competition to create a tailored strategy",
      details: ["Market research", "Competitor analysis", "Goal setting", "Strategy development"],
    },
    {
      icon: BuildIcon,
      title: "Implementation",
      description: "Our expert team executes the strategy with precision and attention to detail",
      details: ["Campaign setup", "Content creation", "Technical optimization", "Team coordination"],
    },
    {
      icon: AnalyticsIcon,
      title: "Monitoring & Optimization",
      description: "We continuously track performance and optimize for better results",
      details: ["Real-time tracking", "Performance analysis", "A/B testing", "Continuous improvement"],
    },
    {
      icon: TrendingUpIcon,
      title: "Growth & Scaling",
      description: "Once proven successful, we scale the strategy for maximum impact",
      details: ["Scale campaigns", "Expand reach", "Increase conversions", "Maximize ROI"],
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              OUR PROCESS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">How We Work</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A proven 4-step process that delivers consistent, measurable results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-blue-300 to-purple-300 transform translate-x-1/2"></div>
                )}

                <div className="relative bg-white p-5 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="text-blue-600 text-xl" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed">{step.description}</p>

                  <div className="space-y-1">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="text-green-500 text-xs" />
                        <span className="text-gray-700 text-xs font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
