"use client"

import { Flag, Shield, Info } from "lucide-react"
import { useGameContext } from "../context/GameContext"

export default function StartScreen({ onStartGame }) {
  const { resetGame } = useGameContext()

  const handleStart = () => {
    resetGame()
    onStartGame()
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 z-50 text-white">
      <div className="max-w-md w-full p-8 flex flex-col items-center">
        <div className="mb-8 relative">
          <h1 className="text-5xl font-bold mb-2 text-center relative z-10">Air Defense Battle</h1>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0 opacity-20">
            <svg viewBox="0 0 200 100" width="200" height="100">
              <path d="M20,50 L180,50 M100,20 L100,80" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="100" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-orange-600 px-4 py-2 rounded-lg">
            <Flag className="w-6 h-6 text-white" />
            <span className="text-xl font-bold">INDIA</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
            <span className="text-xl font-bold">DEFENSE</span>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 p-6 rounded-lg mb-8 w-full backdrop-blur-sm border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-center">Mission Briefing</h2>
          <p className="mb-4">
            Pakistan's aircraft and helicopters have entered Indian airspace. As commander of India's air defense
            system, your mission is to protect our borders by shooting down all enemy aircraft.
          </p>
          <p>Use your missile launcher to target and destroy the intruders before they reach our territory.</p>
        </div>

        <button
          onClick={handleStart}
          className="relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors w-full mb-6 overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Start Mission
          </span>
          <span className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 100 100" width="100" height="100" className="absolute">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <path d="M30,50 L45,65 L70,35" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-center text-gray-300">
          <Info className="w-4 h-4" />
          <span>Move your mouse/finger to aim and click/tap to fire</span>
        </div>
      </div>
    </div>
  )
}
