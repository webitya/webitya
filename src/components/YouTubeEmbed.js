"use client"

import { useState } from "react"
import Image from "next/image" // Using Next.js Image component for optimization
import { PlayCircle } from "lucide-react" // Lucide icon for play button

export default function YouTubeEmbed({ url, title }) {
  const [showVideo, setShowVideo] = useState(false)

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getVideoId(url)

  if (!videoId) {
    // Optionally, return a placeholder or an error message if videoId is invalid
    return (
      <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden shadow-lg">
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    )
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` // High-quality thumbnail

  return (
    <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg group">
      {!showVideo ? (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setShowVideo(true)}>
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={`Thumbnail for ${title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            priority // Prioritize loading the thumbnail
            onError={(e) => {
              // Fallback to a lower quality thumbnail if maxresdefault fails
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="sr-only">Play video: {title}</span>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} // Autoplay when clicked
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy" // Defer loading until needed
        />
      )}
    </div>
  )
}
