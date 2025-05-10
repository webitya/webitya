"use client"

import { createContext, useContext, useState } from "react"
import { useIsMobile } from "../hooks/use-mobile"


const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [level, setLevel] = useState(1)
  const [enemyCount, setEnemyCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [launcherPosition, setLauncherPosition] = useState(50)
  const isMobile = useIsMobile()

  const resetGame = () => {
    setScore(0)
    setLives(5)
    setLevel(1)
    setEnemyCount(0)
    setIsPaused(false)
  }

  const incrementScore = (points = 10) => {
    setScore((prev) => prev + points)
    setEnemyCount((prev) => prev + 1)

    // Level up every 10 enemies
    if ((enemyCount + 1) % 10 === 0) {
      setLevel((prev) => prev + 1)
    }
  }

  const decrementLives = () => {
    setLives((prev) => Math.max(prev - 1, 0))
  }

  const incrementLevel = () => {
    setLevel((prev) => prev + 1)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const value = {
    score,
    lives,
    level,
    enemyCount,
    isPaused,
    isMuted,
    isMobile,
    launcherPosition,
    setLauncherPosition,
    resetGame,
    incrementScore,
    decrementLives,
    incrementLevel,
    togglePause,
    toggleMute,
    isGameOver: lives <= 0,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
