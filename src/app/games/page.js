"use client"

import GameAudio from "@/components/Games/game-audio"
import GameBoard from "@/components/Games/game-board"
import GameControls from "@/components/Games/game-controls"
import GameStatus from "@/components/Games/game-status"
import { useState } from "react"
// import GameBoard from "@/components/game-board"
// import GameControls from "@/components/game-controls"
// import GameStatus from "@/components/game-status"
// import GameAudio from "@/components/game-audio"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState("medium")
  const [muted, setMuted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-black overflow-hidden">
      {/* Background war scene */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
      </div>

      <GameAudio muted={muted} gameStarted={gameStarted} gameOver={gameOver} />

      <div className="z-10 w-full max-w-6xl items-center justify-center font-mono text-sm flex flex-col relative">
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          BATTLEFIELD: INDO-PAK
        </h1>

        {!gameStarted && !gameOver && (
          <div className="flex flex-col items-center justify-center p-8 bg-black bg-opacity-70 rounded-lg shadow-[0_0_15px_rgba(255,153,51,0.5)] border border-orange-500 w-full max-w-2xl">
            <div className="flex justify-between w-full mb-8">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">INDIA</span>
                </div>
              </div>
              <div className="text-red-600 text-6xl font-bold flex items-center">VS</div>
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-white rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">PAKISTAN</span>
                </div>
              </div>
            </div>

            <p className="mb-6 text-center text-gray-300 text-lg">
              Defend India against the more powerful Pakistani forces. The enemy has superior firepower and numbers. Use
              strategy and tactical positioning to survive and turn the tide of war!
            </p>

            <div className="mb-6 w-full">
              <h3 className="text-white mb-2 text-center">Select Difficulty</h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setDifficulty("easy")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficulty === "easy" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficulty("medium")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficulty === "medium" ? "bg-yellow-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setDifficulty("hard")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficulty === "hard" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xl font-bold rounded-md hover:from-orange-700 hover:to-orange-600 transition-colors shadow-[0_0_10px_rgba(255,153,51,0.7)] transform hover:scale-105 transition-transform"
            >
              START BATTLE
            </button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <>
            <GameStatus score={score} difficulty={difficulty} />
            <GameBoard setScore={setScore} setGameOver={setGameOver} difficulty={difficulty} muted={muted} />
            <GameControls />
          </>
        )}

        {gameOver && (
          <div className="flex flex-col items-center justify-center p-8 bg-black bg-opacity-70 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.5)] border border-red-500 w-full max-w-2xl">
            <h2 className="text-4xl font-bold mb-4 text-red-500">MISSION FAILED</h2>
            <p className="mb-6 text-2xl text-white">
              Your final score: <span className="text-orange-500 font-bold">{score}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 w-full mb-6">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-md hover:from-orange-700 hover:to-orange-600 transition-colors shadow-[0_0_10px_rgba(255,153,51,0.7)]"
              >
                RETRY MISSION
              </button>
              <button
                onClick={() => {
                  setGameStarted(false)
                  setGameOver(false)
                }}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-md hover:from-gray-800 hover:to-gray-700 transition-colors"
              >
                BACK TO MENU
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
