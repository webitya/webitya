"use client"

import { useState, useEffect } from "react"

export default function Aircraft({ x, y, direction, scale = 1 }) {
  const [position, setPosition] = useState(x)
  const [altitude, setAltitude] = useState(y)

  // Add slight horizontal and vertical movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === "left") {
        setPosition((prev) => Math.max(prev - 0.2, 5))
      } else {
        setPosition((prev) => Math.min(prev + 0.2, 95))
      }

      // Add slight altitude variation
      setAltitude((prev) => {
        const variation = (Math.random() - 0.5) * 0.1
        return y + variation
      })
    }, 50)

    return () => clearInterval(interval)
  }, [direction, y])

  return (
    <div
      className="absolute transform -translate-x-1/2 z-20"
      style={{
        left: `${position}%`,
        top: `${altitude}%`,
        transform: `translateX(-50%) ${direction === "left" ? "scaleX(-1)" : ""} scale(${scale})`,
        transition: "top 0.1s linear, left 0.1s linear",
        filter: "drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.3))",
      }}
    >
      {/* Custom SVG for fighter jet with enhanced 3D effect */}
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="w-16 h-8">
        {/* Shadow for 3D effect */}
        <ellipse cx="60" cy="55" rx="40" ry="5" fill="rgba(0,0,0,0.2)" />

        {/* Main body with gradient for 3D effect */}
        <path
          d="M 20,30 L 100,30 L 110,20 L 100,10 L 20,10 L 10,20 Z"
          fill="url(#aircraftGradient)"
          stroke="#2d3748"
          strokeWidth="2"
        />

        {/* Wings with gradient */}
        <path d="M 40,30 L 20,50 L 60,50 L 80,30" fill="url(#wingGradient)" stroke="#4a5568" strokeWidth="2" />
        <path d="M 40,10 L 20,0 L 60,0 L 80,10" fill="url(#wingGradient)" stroke="#4a5568" strokeWidth="2" />

        {/* Tail */}
        <path
          d="M 100,30 L 90,40 L 110,40 L 120,30 L 110,20 L 90,20 Z"
          fill="url(#tailGradient)"
          stroke="#4a5568"
          strokeWidth="2"
        />

        {/* Cockpit with glass reflection */}
        <ellipse cx="30" cy="20" rx="10" ry="5" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
        <ellipse cx="28" cy="19" rx="7" ry="3" fill="#d1e3f6" opacity="0.6" />

        {/* Pakistan flag colors */}
        <rect x="90" y="15" width="10" height="10" fill="#01411C" />
        <circle cx="95" cy="20" r="3" fill="#fff" />

        {/* Highlights for 3D effect */}
        <path d="M 20,15 L 90,15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />

        {/* Define gradients */}
        <defs>
          <linearGradient id="aircraftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="50%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>

          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a0aec0" />
            <stop offset="100%" stopColor="#718096" />
          </linearGradient>

          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="100%" stopColor="#4a5568" />
          </linearGradient>
        </defs>
      </svg>

      {/* Jet engine effect */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-6 h-2">
        <div className="w-full h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-transparent rounded-l-full animate-pulse"></div>
      </div>
    </div>
  )
}
