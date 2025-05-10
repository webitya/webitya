"use client"

import { Info, MousePointer, Smartphone } from "lucide-react"
import { useGameContext } from "../context/GameContext"
import MobileControls from "./MobileControls"

export default function GameControls() {
  const { isMobile } = useGameContext()

  return (
    <>
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center items-center z-50 bg-black bg-opacity-30 text-white backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span className="text-sm">
            {isMobile ? (
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" /> Tap to fire missiles
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <MousePointer className="w-3 h-3" /> Click to fire missiles
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Mobile-specific controls */}
      {isMobile && <MobileControls />}
    </>
  )
}
