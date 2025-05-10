"use client"

import { useState, useEffect } from "react"

export default function ParallaxBackground({ level }) {
  const [offset1, setOffset1] = useState(0)
  const [offset2, setOffset2] = useState(0)
  const [offset3, setOffset3] = useState(0)

  // Animate parallax layers
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset1((prev) => (prev + 0.1) % 100)
      setOffset2((prev) => (prev + 0.2) % 100)
      setOffset3((prev) => (prev + 0.3) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Distant clouds - slowest moving */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='cloud' patternUnits='userSpaceOnUse' width='200' height='200'%3E%3Cpath d='M100 100 C130 70, 170 80, 180 100 C190 80, 210 80, 220 100 C240 80, 260 90, 280 100 C300 90, 310 100, 320 110 C340 100, 360 120, 380 110 C390 120, 400 110, 410 120 C420 100, 440 110, 450 120 C460 100, 480 110, 500 100 L500 200 L0 200 L0 100 C20 120, 40 110, 50 100 C60 120, 80 110, 90 100 Z' fill='white' fill-opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23cloud)'/%3E%3C/svg%3E\")",
          backgroundSize: "600px 200px",
          backgroundRepeat: "repeat-x",
          transform: `translateY(${offset1}px)`,
        }}
      ></div>

      {/* Mid-distance clouds - medium speed */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='cloud2' patternUnits='userSpaceOnUse' width='300' height='200'%3E%3Cpath d='M50 80 C70 60, 90 70, 100 80 C120 60, 140 70, 150 80 C170 60, 190 70, 200 80 C220 70, 240 80, 250 90 C270 80, 290 100, 300 90 C320 100, 340 90, 350 100 C370 80, 390 90, 400 100 L400 200 L0 200 L0 80 Z' fill='white' fill-opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23cloud2)'/%3E%3C/svg%3E\")",
          backgroundSize: "400px 150px",
          backgroundRepeat: "repeat-x",
          transform: `translateY(${offset2 * 1.5}px)`,
        }}
      ></div>

      {/* Close clouds - fastest moving */}
      <div
        className="absolute inset-0 z-2"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='cloud3' patternUnits='userSpaceOnUse' width='400' height='200'%3E%3Cpath d='M0 100 C20 80, 40 90, 50 100 C70 80, 90 90, 100 100 C120 80, 140 90, 150 100 C170 90, 190 100, 200 110 C220 90, 240 110, 250 100 C270 110, 290 100, 300 110 C320 90, 340 100, 350 110 L350 200 L0 200 L0 100 Z' fill='white' fill-opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23cloud3)'/%3E%3C/svg%3E\")",
          backgroundSize: "300px 100px",
          backgroundRepeat: "repeat-x",
          transform: `translateY(${offset3 * 2}px)`,
        }}
      ></div>

      {/* Dynamic sky color based on level */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom, 
            ${level > 5 ? "rgb(49, 46, 129)" : "rgb(56, 189, 248)"} 0%, 
            ${level > 5 ? "rgb(79, 70, 229)" : "rgb(14, 165, 233)"} 100%)`,
          opacity: level > 5 ? 0.7 : 0.3,
        }}
      ></div>
    </div>
  )
}
