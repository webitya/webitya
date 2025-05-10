"use client"

import { useEffect, useRef } from "react"

export default function GameAudio({ muted, gameStarted, gameOver }) {
  const bgMusicRef = useRef(null)
  const battleSoundsRef = useRef(null)
  const soundEffects = useRef({})

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

    // Preload common sound effects
    const effects = [
      "player_shoot",
      "enemy_shoot",
      "explosion_small",
      "explosion_large",
      "player_hit",
      "missile_launch",
      "powerup_collect",
    ]

    effects.forEach((effect) => {
      if (!soundEffects.current[effect]) {
        soundEffects.current[effect] = new Audio(`/sounds/${effect}.mp3`)
        soundEffects.current[effect].volume = effect.includes("explosion") ? 0.4 : 0.2
      }
    })

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

      // Clean up sound effects
      Object.values(soundEffects.current).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
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

    // Mute all sound effects
    Object.values(soundEffects.current).forEach((audio) => {
      audio.muted = muted
    })
  }, [muted])

  // Expose sound effects to window for game components to use
  useEffect(() => {
    window.playGameSound = (sound) => {
      if (muted) return

      if (soundEffects.current[sound]) {
        // Clone the audio to allow overlapping sounds
        const audioClone = soundEffects.current[sound].cloneNode()
        audioClone.volume = soundEffects.current[sound].volume
        audioClone.play().catch((e) => console.error("Sound play error:", e))

        // Auto cleanup
        audioClone.onended = () => {
          audioClone.remove()
        }
      } else {
        // Lazy load if not preloaded
        const audio = new Audio(`/sounds/${sound}.mp3`)
        audio.volume = sound.includes("explosion") ? 0.4 : 0.2
        audio.play().catch((e) => console.error("Sound play error:", e))
      }
    }

    return () => {
      window.playGameSound = null
    }
  }, [muted])

  return null
}
