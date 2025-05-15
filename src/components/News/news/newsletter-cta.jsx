"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-xl p-6 md:p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isSubmitted ? (
        <>
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
            <Mail size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          <p className="text-white/60 text-xs mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-white/80">
            You've successfully subscribed to our newsletter. We'll keep you updated with the latest news.
          </p>
        </div>
      )}
    </motion.div>
  )
}
