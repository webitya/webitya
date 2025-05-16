"use client"

import { useState } from "react"
import { useToast } from "@/components/Cars/ui/use-toast"

export default function InquiryForm({ car, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in the ${car.year} ${car.brand} ${car.name}. Please contact me with more information.`,
    preferredContact: "email",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS would be configured here in a real implementation
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Call the onSubmit callback
      onSubmit(formData)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in the ${car.year} ${car.brand} ${car.name}. Please contact me with more information.`,
        preferredContact: "email",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-300 mb-1">
          Preferred Contact Method
        </label>
        <select
          id="preferredContact"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="either">Either</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="consent"
          required
          className="w-4 h-4 text-white bg-zinc-800 border-zinc-700 focus:ring-white focus:ring-1"
        />
        <label htmlFor="consent" className="ml-2 text-sm text-gray-300">
          I consent to Webitya contacting me regarding this inquiry *
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  )
}
