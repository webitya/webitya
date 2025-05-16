"use client"

import { useEffect, useRef } from "react"

export default function CarSpecsChart({ car }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Calculate relative values for visualization
    const powerPercentage = Math.min(car.power / 1500, 1) // Assuming 1500hp is max
    const accelerationPercentage = Math.min(1, 2.0 / car.acceleration) // Lower is better, 2.0s is considered excellent
    const topSpeedPercentage = Math.min(car.topSpeed / 300, 1) // Assuming 300mph is max

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#18181b"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#27272a"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = 50 + (i * (canvas.height - 100)) / 5
      ctx.beginPath()
      ctx.moveTo(50, y)
      ctx.lineTo(canvas.width - 50, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const barWidth = (canvas.width - 100) / 3
    for (let i = 0; i <= 3; i++) {
      const x = 50 + i * barWidth
      ctx.beginPath()
      ctx.moveTo(x, 50)
      ctx.lineTo(x, canvas.height - 50)
      ctx.stroke()
    }

    // Draw bars
    const metrics = [
      { label: "Power", value: `${car.power} hp`, percentage: powerPercentage, color: "rgba(255, 255, 255, 0.9)" },
      {
        label: "0-60 mph",
        value: `${car.acceleration}s`,
        percentage: accelerationPercentage,
        color: "rgba(255, 255, 255, 0.9)",
      },
      {
        label: "Top Speed",
        value: `${car.topSpeed} mph`,
        percentage: topSpeedPercentage,
        color: "rgba(255, 255, 255, 0.9)",
      },
    ]

    metrics.forEach((metric, index) => {
      const x = 50 + index * barWidth + barWidth / 4
      const barHeight = (canvas.height - 100) * metric.percentage
      const y = canvas.height - 50 - barHeight

      // Draw bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - 50)
      gradient.addColorStop(0, metric.color)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth / 2, barHeight)

      // Draw label
      ctx.fillStyle = "#ffffff"
      ctx.font = "14px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(metric.label, x + barWidth / 4, canvas.height - 30)

      // Draw value
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(metric.value, x + barWidth / 4, y - 10)
    })

    // Draw title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Performance Metrics", canvas.width / 2, 30)
  }, [car])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
