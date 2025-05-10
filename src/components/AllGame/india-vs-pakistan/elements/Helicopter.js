"use client"

import { useState, useEffect } from "react"

export default function Helicopter({ x, y, direction, scale = 1 }) {
  const [position, setPosition] = useState(x)
  const [altitude, setAltitude] = useState(y)
  const [rotorAngle, setRotorAngle] = useState(0)

  // Add slight horizontal and vertical movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (direction === "left") {
        setPosition((prev) => Math.max(prev - 0.3, 5))
      } else {
        setPosition((prev) => Math.min(prev + 0.3, 95))
      }

      // Add hovering effect
      setAltitude((prev) => {
        const variation = Math.sin(Date.now() / 500) * 0.2
        return y + variation
      })
    }, 50)

    // Animate rotor
    const rotorInterval = setInterval(() => {
      setRotorAngle((prev) => (prev + 30) % 360)
    }, 50)

    return () => {
      clearInterval(moveInterval)
      clearInterval(rotorInterval)
    }
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
      {/* Custom SVG for helicopter with enhanced 3D effect */}
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="w-20 h-10">
        {/* Shadow for 3D effect */}
        <ellipse cx="60" cy="55" rx="30" ry="5" fill="rgba(0,0,0,0.2)" />

        {/* Main body with gradient for 3D effect */}
        <path
          d="M 30,40 L 80,40 L 90,30 L 80,20 L 30,20 L 20,30 Z"
          fill="url(#helicopterGradient)"
          stroke="#2d3748"
          strokeWidth="2"
        />

        {/* Tail boom */}
        <path d="M 80,30 L 110,30 L 110,25 L 80,25 Z" fill="url(#tailGradient)" stroke="#4a5568" strokeWidth="1" />

        {/* Tail rotor */}
        <g transform={`rotate(${rotorAngle * 2}, 110, 27.5)`}>
          <line x1="110" y1="20" x2="110" y2="35" stroke="#2d3748" strokeWidth="1" />
          <line
            x1="110"
            y1="20"
            x2="110"
            y2="35"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.5"
            transform="rotate(45, 110, 27.5)"
          />
        </g>

        {/* Main rotor */}
        <g transform={`rotate(${rotorAngle}, 50, 20)`}>
          <line x1="10" y1="20" x2="90" y2="20" stroke="#2d3748" strokeWidth="2" />
          <line
            x1="10"
            y1="20"
            x2="90"
            y2="20"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            transform="rotate(90, 50, 20)"
          />
        </g>

        {/* Landing skids with 3D effect */}
        <path d="M 30,40 L 30,45 L 70,45 L 70,40" fill="none" stroke="#2d3748" strokeWidth="2" />
        <path d="M 30,45 L 70,45" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

        {/* Cockpit with glass reflection */}
        <path d="M 30,30 L 20,30 L 30,20 L 40,20 L 40,30 Z" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
        <path d="M 25,25 L 35,22" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />

        {/* Pakistan flag colors */}
        <rect x="70" y="25" width="10" height="10" fill="#01411C" />
        <circle cx="75" cy="30" r="3" fill="#fff" />

        {/* Highlights for 3D effect */}
        <path d="M 30,25 L 80,25" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />

        {/* Define gradients */}
        <defs>
          <linearGradient id="helicopterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="50%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>

          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="100%" stopColor="#4a5568" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
