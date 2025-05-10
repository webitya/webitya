"use client"

import { Shield, Heart, Star, Flag, Volume2, VolumeX, Pause, Play } from "lucide-react"
import { useGameContext } from "../context/GameContext"

export default function GameHUD() {
  const { score, lives, level, isPaused, isMuted, togglePause, toggleMute } = useGameContext()

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 bg-black bg-opacity-30 text-white backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="font-bold">{score}</span>
        </div>

        <div className="flex items-center gap-1">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="font-bold">{level}</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Flag className="w-5 h-5 text-green-400" />
        <span className="font-bold">INDIA</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(lives)].map((_, i) => (
            <Heart key={i} className="w-5 h-5 text-red-500" fill="red" />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={togglePause}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
