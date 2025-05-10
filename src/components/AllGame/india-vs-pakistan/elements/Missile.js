"use client"

import { useState, useEffect } from "react"

export default function Missile({ x, y }) {
  const [trailIntensity, setTrailIntensity] = useState(1)

  // Animate missile trail
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailIntensity((prev) => 0.7 + Math.random() * 0.3)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute w-2 h-8 transform -translate-x-1/2 z-25"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transition: "top 0.1s linear",
        filter: "drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.2))",
      }}
    >
      {/* Custom SVG for missile with enhanced 3D effect */}
      <svg viewBox="0 0 10 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Missile body with gradient */}
        <rect x="3" y="10" width="4" height="25" fill="url(#missileBodyGradient)" stroke="#4a5568" strokeWidth="1" />

        {/* Missile head with gradient */}
        <path d="M 3,10 L 5,0 L 7,10 Z" fill="url(#missileHeadGradient)" stroke="#c53030" strokeWidth="1" />

        {/* Fins with 3D effect */}
        <path d="M 3,35 L 0,40 L 3,35" fill="#718096" stroke="#4a5568" strokeWidth="1" />
        <path d="M 7,35 L 10,40 L 7,35" fill="#718096" stroke="#4a5568" strokeWidth="1" />
        <path d="M 1,38 L 3,35" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
        <path d="M 9,38 L 7,35" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />

        {/* Exhaust with dynamic effect */}
        <rect x="3" y="35" width="4" height="5" fill="url(#exhaustGradient)" stroke="#ed8936" strokeWidth="1" />

        {/* Define gradients */}
        <defs>
          <linearGradient id="missileBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="50%" stopColor="#a0aec0" />
            <stop offset="100%" stopColor="#718096" />
          </linearGradient>

          <linearGradient id="missileHeadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fc8181" />
            <stop offset="100%" stopColor="#e53e3e" />
          </linearGradient>

          <linearGradient id="exhaustGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6ad55" />
            <stop offset="100%" stopColor="#ed8936" />
          </linearGradient>
        </defs>
      </svg>

      {/* Missile trail effect with dynamic intensity */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-8">
        <div
          className="w-full h-full bg-gradient-to-t from-transparent via-yellow-400 to-orange-500 rounded-full"
          style={{
            opacity: 0.7 * trailIntensity,
            height: `${8 * trailIntensity}px`,
          }}
        ></div>
      </div>
    </div>
  )
}
