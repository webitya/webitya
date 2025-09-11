"use client"
import { useState } from "react"
import { Zap, BookOpen, ShieldCheck, Mail, Clock } from "lucide-react" // Importing Lucide icons

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubscribing(true)
    setStatus("")
    try {
      const response = await fetch("/api/blogNewsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.success) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <section className="w-full bg-white border-t border-gray-200">
      <div className="w-full bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {" "}
          {/* Reduced py */}
          <div className="text-center">
            {/* Header */}
            <div className="mb-8">
              {" "}
              {/* Reduced mb */}
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>{" "}
              {/* Reduced font size, mb */}
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {" "}
                {/* Reduced font size */}
                Get the latest insights on AI, Web Development, and Digital Marketing delivered straight to your inbox.
                Join thousands of developers and marketers.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="mb-8">
              {" "}
              {/* Reduced mb */}
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  {" "}
                  {/* Reduced gap */}
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-3.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-base" /* Reduced padding, font size, border radius */
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 whitespace-nowrap text-base" /* Reduced padding, font size, border radius */
                  >
                    {isSubscribing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{" "}
                        {/* Reduced size */}
                        Subscribing...
                      </div>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                </div>
              </form>
              {/* Status Messages */}
              {status === "success" && (
                <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg max-w-lg mx-auto text-sm">
                  {" "}
                  {/* Reduced mt, padding, border radius, font size */}
                  <p className="text-green-800 font-medium">Successfully subscribed!</p>
                  <p className="text-green-700">Check your email for confirmation.</p>
                </div>
              )}
              {status === "error" && (
                <div className="mt-5 p-3 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto text-sm">
                  {" "}
                  {/* Reduced mt, padding, border radius, font size */}
                  <p className="text-red-800 font-medium">Subscription failed</p>
                  <p className="text-red-700">Please try again later.</p>
                </div>
              )}
            </div>

            {/* Enhanced Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {" "}
              {/* Reduced gap */}
              <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                {" "}
                {/* Reduced padding, border radius */}
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {" "}
                  {/* Reduced size, border radius, mb */}
                  <Zap className="w-5 h-5 text-blue-600" /> {/* Lucide icon */}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">Weekly Insights</h3>{" "}
                {/* Reduced font size, mb */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  Curated content every week with the latest trends and tutorials
                </p>
              </div>
              <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                {" "}
                {/* Reduced padding, border radius */}
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {" "}
                  {/* Reduced size, border radius, mb */}
                  <BookOpen className="w-5 h-5 text-green-600" /> {/* Lucide icon */}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">Expert Content</h3>{" "}
                {/* Reduced font size, mb */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn from industry experts and stay ahead of the curve
                </p>
              </div>
              <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                {" "}
                {/* Reduced padding, border radius */}
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {" "}
                  {/* Reduced size, border radius, mb */}
                  <ShieldCheck className="w-5 h-5 text-purple-600" /> {/* Lucide icon */}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">No Spam</h3> {/* Reduced font size, mb */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quality over quantity. Unsubscribe anytime with one click
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              {" "}
              {/* Reduced mt, pt */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
                {" "}
                {/* Reduced gap */}
                <div className="flex items-center gap-1.5">
                  {" "}
                  {/* Reduced gap */}
                  <ShieldCheck className="w-4 h-4 text-green-500" /> {/* Lucide icon */}
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {" "}
                  {/* Reduced gap */}
                  <Mail className="w-4 h-4 text-blue-500" /> {/* Lucide icon */}
                  <span>8,500+ Subscribers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {" "}
                  {/* Reduced gap */}
                  <Clock className="w-4 h-4 text-purple-500" /> {/* Lucide icon */}
                  <span>Weekly Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
