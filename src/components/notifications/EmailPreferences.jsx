"use client"

import { useState, useEffect } from "react"
import { FiMail, FiBell, FiTrendingUp, FiShoppingBag, FiSave } from "react-icons/fi"
import { FaBullhorn } from "react-icons/fa"

export default function EmailPreferences() {
  const [preferences, setPreferences] = useState({
    loginNotifications: true,
    courseUpdates: true,
    progressReports: true,
    announcements: true,
    marketing: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/notifications/preferences", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (error) {
      console.error("Error fetching preferences:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/notifications/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      })

      if (response.ok) {
        setMessage("Preferences saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        throw new Error("Failed to save preferences")
      }
    } catch (error) {
      setMessage("Error saving preferences. Please try again.")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const preferenceItems = [
    {
      key: "loginNotifications",
      title: "Login Notifications",
      description: "Get notified when someone logs into your account",
      icon: FiBell,
    },
    {
      key: "courseUpdates",
      title: "Course Updates",
      description: "Receive updates about your enrolled courses",
      icon: FiMail,
    },
    {
      key: "progressReports",
      title: "Progress Reports",
      description: "Weekly summaries of your learning progress",
      icon: FiTrendingUp,
    },
    {
      key: "announcements",
      title: "Announcements",
      description: "Important updates and news from Webitya LMS",
      icon: FaBullhorn, // Fixed here
    },
    {
      key: "marketing",
      title: "Marketing Emails",
      description: "Promotional offers and new course announcements",
      icon: FiShoppingBag,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Email Preferences</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.includes("Error")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-4">
        {preferenceItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Icon className="w-5 h-5 text-gray-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  preferences[item.key] ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    preferences[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Some notifications like security alerts and purchase confirmations cannot be disabled
          for your account safety.
        </p>
      </div>
    </div>
  )
}
