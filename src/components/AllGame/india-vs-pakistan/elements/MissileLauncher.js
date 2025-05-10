"use client"

import { useState, useEffect } from "react"

export default function MissileLauncher({ position }) {
  const [launchReady, setLaunchReady] = useState(true)

  // Animation for launcher readiness
  useEffect(() => {
    const interval = setInterval(() => {
      setLaunchReady((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute bottom-[10vh] transform -translate-x-1/2 z-30"
      style={{
        left: `${position}%`,
        transition: "left 0.1s ease-out",
        filter: "drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.3))",
      }}
    >
      {/* Custom SVG for missile launcher with enhanced 3D effect */}
      <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="w-12 h-16">
        {/* Base with 3D effect */}
        <rect
          x="15"
          y="60"
          width="30"
          height="20"
          fill="url(#launcherBaseGradient)"
          stroke="#2d3748"
          strokeWidth="2"
          rx="2"
        />
        {/* Launcher tube with 3D effect */}
        <rect
          x="20"
          y="30"
          width="20"
          height="30"
          fill="url(#launcherTubeGradient)"
          stroke="#4a5568"
          strokeWidth="2"
          rx="1"
        />
        {/* Radar dish with 3D effect */}
        <ellipse
          cx="30"
          cy="25"
          rx="15"
          ry="5"
          fill="url(#radarGradient)"
          stroke="#718096"
          strokeWidth="1"
          transform="rotate(-30, 30, 25)"
        />
        {/* Radar scanning animation */}
        <path
          d="M 30,25 L 45,20"
          stroke={launchReady ? "#38b2ac" : "#f56565"}
          strokeWidth="1"
          opacity="0.8"
          transform={`rotate(${(Date.now() / 50) % 360}, 30, 25)`}
        />
        {/* Indian flag colors */}
        <rect x="25" y="65" width="10" height="3" fill="#FF9933" /> {/* Saffron */}
        <rect x="25" y="68" width="10" height="3" fill="#FFFFFF" /> {/* White */}
        <rect x="25" y="71" width="10" height="3" fill="#138808" /> {/* Green */}
        <circle cx="30" cy="69.5" r="1" fill="#000080" /> {/* Navy blue Ashoka Chakra */}
        {/* Launcher status light */}
        <circle cx="15" cy="65" r="2" fill={launchReady ? "#38b2ac" : "#f56565"} opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Define gradients */}
        <defs>
          <linearGradient id="launcherBaseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="50%" stopColor="#718096" />
            <stop offset="100%" stopColor="#4a5568" />
          </linearGradient>

          <linearGradient id="launcherTubeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="50%" stopColor="#a0aec0" />
            <stop offset="100%" stopColor="#718096" />
          </linearGradient>

          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e0" />
            <stop offset="100%" stopColor="#a0aec0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
