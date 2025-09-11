"use client"
import { useState, useEffect } from "react"
import { FiPlay, FiVolume2, FiMaximize } from "react-icons/fi"

export default function VideoPlayer({ videoId, title, onProgress }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // YouTube embed URL with privacy-enhanced mode
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`

  useEffect(() => {
    // Load YouTube IFrame API
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
  }, [])

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Custom Controls Overlay (Optional) */}
      <div className="bg-gray-900 text-white p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>Private Video - Only for enrolled students</span>
          <div className="flex items-center space-x-4">
            <FiPlay className="w-4 h-4" />
            <FiVolume2 className="w-4 h-4" />
            <FiMaximize className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
