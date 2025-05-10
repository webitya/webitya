"use client"

import { GameProvider } from "@/components/AllGame/india-vs-pakistan/context/GameContext"
import GameCanvas from "@/components/AllGame/india-vs-pakistan/GameCanvas"
import GameOverScreen from "@/components/AllGame/india-vs-pakistan/screens/GameOverScreen"
import StartScreen from "@/components/AllGame/india-vs-pakistan/screens/StartScreen"
import GameControls from "@/components/AllGame/india-vs-pakistan/ui/GameControls"
import GameHUD from "@/components/AllGame/india-vs-pakistan/ui/GameHUD"
import { useState } from "react"
// import GameCanvas from "@/components/game/GameCanvas"
// import { GameProvider } from "@/components/game/context/GameContext"
// import StartScreen from "@/components/game/screens/StartScreen"
// import GameOverScreen from "@/components/game/screens/GameOverScreen"
// import GameHUD from "@/components/game/ui/GameHUD"
// import GameControls from "@/components/game/ui/GameControls"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const handleStartGame = () => {
    setGameStarted(true)
    setGameOver(false)
  }

  const handleGameOver = (finalScore) => {
    setScore(finalScore)
    setGameOver(true)
  }

  const handleRestartGame = () => {
    setGameStarted(true)
    setGameOver(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden bg-gradient-to-b from-sky-400 to-sky-700">
      <GameProvider>
        {!gameStarted && <StartScreen onStartGame={handleStartGame} />}

        {gameStarted && !gameOver && (
          <>
            <GameHUD />
            <GameCanvas onGameOver={handleGameOver} />
            <GameControls />
          </>
        )}

        {gameOver && <GameOverScreen score={score} onRestart={handleRestartGame} />}
      </GameProvider>
    </main>
  )
}
