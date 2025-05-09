"use client"

import { useEffect, useRef } from "react"

export default function GameAudio({ muted, gameStarted, gameOver }) {
  const bgMusicRef = useRef(null)
  const battleSoundsRef = useRef(null)

  useEffect(() => {
    // Create audio elements
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio("/sounds/background_music.mp3")
      bgMusicRef.current.loop = true
      bgMusicRef.current.volume = 0.3
    }

    if (!battleSoundsRef.current) {
      battleSoundsRef.current = new Audio("/sounds/battle_ambience.mp3")
      battleSoundsRef.current.loop = true
      battleSoundsRef.current.volume = 0.2
    }

    // Play/pause based on game state
    if (gameStarted && !gameOver && !muted) {
      bgMusicRef.current.play().catch((e) => console.error("Audio play error:", e))
      battleSoundsRef.current.play().catch((e) => console.error("Audio play error:", e))
    } else {
      bgMusicRef.current.pause()
      battleSoundsRef.current.pause()
    }

    // Cleanup
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause()
        bgMusicRef.current.currentTime = 0
      }

      if (battleSoundsRef.current) {
        battleSoundsRef.current.pause()
        battleSoundsRef.current.currentTime = 0
      }
    }
  }, [gameStarted, gameOver, muted])

  // Update mute state
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = muted
    }

    if (battleSoundsRef.current) {
      battleSoundsRef.current.muted = muted
    }
  }, [muted])

  return null
}
