"use client"

import { useState } from "react"

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Stay Updated</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get the latest insights on AI, Web Development, and Digital Marketing delivered straight to your inbox.
                Join thousands of developers and marketers.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="mb-12">
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-lg"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 whitespace-nowrap"
                  >
                    {isSubscribing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl max-w-lg mx-auto">
                  <p className="text-green-800 font-medium">Successfully subscribed!</p>
                  <p className="text-green-700 text-sm">Check your email for confirmation.</p>
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl max-w-lg mx-auto">
                  <p className="text-red-800 font-medium">Subscription failed</p>
                  <p className="text-red-700 text-sm">Please try again later.</p>
                </div>
              )}
            </div>

            {/* Enhanced Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Insights</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Curated content every week with the latest trends and tutorials
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Content</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn from industry experts and stay ahead of the curve
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Spam</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quality over quantity. Unsubscribe anytime with one click
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>8,500+ Subscribers</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
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
