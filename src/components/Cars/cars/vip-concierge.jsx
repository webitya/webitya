"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function VIPConcierge() {
  const [activeTab, setActiveTab] = useState("services")

  const tabs = [
    { id: "services", label: "VIP Services" },
    { id: "events", label: "Exclusive Events" },
    { id: "membership", label: "Membership" },
  ]

  const services = [
    {
      title: "Personal Vehicle Consultant",
      description: "Your dedicated consultant will guide you through every step of your luxury vehicle journey.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Door-to-Door Test Drives",
      description: "Experience your chosen vehicle at your convenience with our premium test drive service.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.2-.9-1.9-1L9 6c-.9 0-1.7.5-2.2 1.3L5 10" />
          <path d="M9 17h6" />
          <path d="M12 17v-4" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      title: "Priority Maintenance",
      description: "Skip the queue with priority servicing and maintenance for your luxury vehicle.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: "Global Assistance",
      description: "24/7 concierge support and roadside assistance anywhere in the world.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ]

  const events = [
    {
      title: "Private Track Days",
      date: "June 15, 2023",
      location: "Buddh International Circuit, Delhi",
      image: "/placeholder.svg?height=200&width=300&text=Track+Day",
    },
    {
      title: "Luxury Lifestyle Exhibition",
      date: "August 22, 2023",
      location: "The Leela Palace, Mumbai",
      image: "/placeholder.svg?height=200&width=300&text=Exhibition",
    },
    {
      title: "Supercar Rally",
      date: "October 5-8, 2023",
      location: "Rajasthan Heritage Tour",
      image: "/placeholder.svg?height=200&width=300&text=Rally",
    },
  ]

  const memberships = [
    {
      title: "Silver",
      price: "₹50,000",
      period: "per year",
      features: ["Priority Servicing", "Quarterly Detail", "Exclusive Event Access", "24/7 Concierge"],
    },
    {
      title: "Gold",
      price: "₹125,000",
      period: "per year",
      features: [
        "All Silver Benefits",
        "Complimentary Loaner Vehicle",
        "Annual Track Day",
        "VIP Event Invitations",
        "Airport Transfer Service",
      ],
    },
    {
      title: "Platinum",
      price: "₹300,000",
      period: "per year",
      features: [
        "All Gold Benefits",
        "Dedicated Personal Consultant",
        "Global Roadside Assistance",
        "Unlimited Detail Services",
        "Private Driver Service",
        "Helicopter Transfer",
      ],
    },
  ]

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-sm border border-zinc-800 shadow-lg overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1200&text=VIP+Concierge"
          alt="VIP Concierge Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl font-bold font-playfair">VIP Concierge</h3>
          <p className="text-gray-300 mt-2">Exclusive services for our distinguished clientele</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm transition-colors relative ${
                activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-black/20 p-6 rounded-sm border border-zinc-700 hover:border-zinc-600 transition-colors"
                  >
                    <div className="text-white mb-4">{service.icon}</div>
                    <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">
                  Contact our VIP concierge team to learn more about our exclusive services
                </p>
                <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold">
                  Request Information
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-black/20 rounded-sm border border-zinc-700 overflow-hidden hover:border-zinc-600 transition-colors"
                  >
                    <div className="relative h-40">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold mb-2">{event.title}</h4>
                      <p className="text-gray-400 text-sm mb-1">{event.date}</p>
                      <p className="text-gray-400 text-sm">{event.location}</p>
                      <button className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-sm transition-colors text-sm">
                        Register Interest
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">
                  Our events are exclusively available to Webitya clients and members
                </p>
                <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold">
                  View All Events
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "membership" && (
            <motion.div
              key="membership"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {memberships.map((membership, index) => (
                  <div
                    key={index}
                    className={`bg-black/20 p-6 rounded-sm border ${
                      index === 1 ? "border-white ring-1 ring-white/30" : "border-zinc-700"
                    } hover:border-zinc-600 transition-colors relative`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1">
                        MOST POPULAR
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-2">{membership.title}</h4>
                    <div className="mb-4">
                      <span className="text-2xl font-bold">{membership.price}</span>
                      <span className="text-gray-400 text-sm"> {membership.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {membership.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white mt-0.5"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2 rounded-sm transition-colors ${
                        index === 1
                          ? "bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-200 hover:to-white"
                          : "bg-zinc-800 hover:bg-zinc-700 text-white"
                      }`}
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">
                  All memberships include access to our exclusive events and services
                </p>
                <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-sm hover:from-gray-200 hover:to-white transition-all duration-300 shadow-lg font-semibold">
                  Contact Membership Team
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
