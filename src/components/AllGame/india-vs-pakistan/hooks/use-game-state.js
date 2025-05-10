"use client"

import { useState } from "react"

export function useGameState() {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [gameOver, setGameOver] = useState(false)
  const [enemyCount, setEnemyCount] = useState(0)
  const [level, setLevel] = useState(1)

  const resetGame = () => {
    setScore(0)
    setLives(5)
    setGameOver(false)
    setEnemyCount(0)
    setLevel(1)
  }

  const incrementScore = () => {
    setScore((prev) => prev + 10)
    setEnemyCount((prev) => prev + 1)

    // Level up every 10 enemies
    if ((enemyCount + 1) % 10 === 0) {
      setLevel((prev) => prev + 1)
    }
  }

  const decrementLives = () => {
    setLives((prev) => {
      const newLives = prev - 1
      if (newLives <= 0) {
        setGameOver(true)
      }
      return newLives
    })
  }

  const incrementLevel = () => {
    setLevel((prev) => prev + 1)
  }

  return {
    score,
    lives,
    gameOver,
    enemyCount,
    level,
    resetGame,
    incrementScore,
    decrementLives,
    setGameOver,
    incrementLevel,
  }
}
