"use client"

import { Trophy, RotateCcw, Share2 } from "lucide-react"

export default function GameOverScreen({ score, onRestart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 text-white">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl flex flex-col items-center max-w-md w-full border border-gray-700">
        <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl font-bold mb-2">Mission Complete</h2>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-4xl font-bold">{score}</span>
          <span className="text-xl text-gray-300">Points</span>
        </div>

        <div className="w-full bg-gray-700 h-px mb-6"></div>

        <p className="text-center mb-8 text-gray-300">
          You defended India's airspace valiantly! The nation salutes your service.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Air Defense Battle",
                  text: `I scored ${score} points defending India's airspace! Can you beat my score?`,
                  url: window.location.href,
                })
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Score
          </button>
        </div>

        <div className="w-full bg-black bg-opacity-30 p-4 rounded-lg">
          <h3 className="text-center font-bold mb-2">Mission Statistics</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">Enemies Shot Down</span>
              <span className="font-bold">{Math.floor(score / 10)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm">Accuracy</span>
              <span className="font-bold">{Math.floor(70 + Math.random() * 30)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
