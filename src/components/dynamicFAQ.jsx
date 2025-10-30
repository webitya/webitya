"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

export default function DynamicFAQ({ keyword }) {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: `What makes your ${keyword.service} services different?`,
      answer: `Our ${keyword.service} services are tailored specifically for businesses in ${keyword.location}, ${keyword.state}. We combine industry best practices with local market insights to deliver exceptional results. Our team has 10+ years of experience and a proven track record of 300% average ROI growth.`,
    },
    {
      question: `How long does it take to see results?`,
      answer: `Most clients start seeing measurable improvements within 4-6 weeks. We provide detailed monthly reports so you can track progress every step of the way. Our data-driven approach ensures continuous optimization for better results.`,
    },
    {
      question: `What is your pricing model?`,
      answer: `We offer flexible pricing models tailored to your budget and goals. Whether you prefer monthly retainers, project-based pricing, or performance-based models, we have options that work for you. Contact us for a free consultation and custom quote.`,
    },
    {
      question: `Do you provide ongoing support?`,
      answer: `We provide 24/7 support to all our clients. You'll have a dedicated account manager who understands your business and is always available to help. We also provide monthly strategy sessions to optimize your campaigns.`,
    },
    {
      question: `Can you work with businesses of all sizes?`,
      answer: `Yes! We work with startups, small businesses, and large enterprises. Our services are scalable and can be customized to fit any business size or budget. From local businesses to national brands, we have the expertise.`,
    },
    {
      question: `How do you measure success?`,
      answer: `We measure success through clear KPIs aligned with your business goals. This might include website traffic, leads generated, conversion rates, or revenue growth. We provide transparent reporting and regular updates on all metrics.`,
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpOutlineIcon className="text-blue-600 text-xl" />
            <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              FREQUENTLY ASKED
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">Common Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our services
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
              >
                <span className="text-base font-bold text-gray-900 text-left group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-3"
                >
                  <ExpandMoreIcon className="text-blue-600 text-xl" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-white border-t-2 border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed text-sm font-medium">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
