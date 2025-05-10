"use client"

import { useGameContext } from "../context/GameContext"

export default function MobileControls() {
  const { setLauncherPosition } = useGameContext()

  const handleLeftMove = () => {
    setLauncherPosition((prev) => Math.max(prev - 5, 5))
  }

  const handleRightMove = () => {
    setLauncherPosition((prev) => Math.min(prev + 5, 95))
  }

  return (
    <div className="absolute bottom-[15vh] left-0 w-full flex justify-between px-6 z-40 md:hidden">
      <button
        className="w-16 h-16 rounded-full bg-gray-800 bg-opacity-30 flex items-center justify-center active:bg-opacity-50 focus:outline-none"
        onTouchStart={() => {
          const interval = setInterval(handleLeftMove, 100)
          return () => clearInterval(interval)
        }}
        onClick={handleLeftMove}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-white"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        className="w-16 h-16 rounded-full bg-gray-800 bg-opacity-30 flex items-center justify-center active:bg-opacity-50 focus:outline-none"
        onTouchStart={() => {
          const interval = setInterval(handleRightMove, 100)
          return () => clearInterval(interval)
        }}
        onClick={handleRightMove}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-white"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  )
}
