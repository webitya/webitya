"use client"

import { useState, useEffect, useRef } from "react"
import { useGameContext } from "./context/GameContext"
import Aircraft from "./elements/Aircraft"
import Helicopter from "./elements/Helicopter"
import MissileLauncher from "./elements/MissileLauncher"
import Missile from "./elements/Missile"
import Explosion from "./effects/Explosion"
import ParallaxBackground from "./effects/ParallaxBackground"
import { checkCollision } from "./utils/collision"

const ENEMY_TYPES = {
  AIRCRAFT: "aircraft",
  HELICOPTER: "helicopter",
}

export default function GameCanvas({ onGameOver }) {
  const {
    score,
    lives,
    level,
    isPaused,
    launcherPosition,
    setLauncherPosition,
    incrementScore,
    decrementLives,
    incrementLevel,
    isGameOver,
  } = useGameContext()

  const [enemies, setEnemies] = useState([])
  const [missiles, setMissiles] = useState([])
  const [explosions, setExplosions] = useState([])
  const gameAreaRef = useRef(null)
  const enemySpawnTimerRef = useRef(null)
  const gameLoopRef = useRef(null)

  // Game settings that scale with level
  const enemySpeed = 1 + level * 0.2
  const enemySpawnRate = Math.max(2000 - level * 200, 800)
  const maxEnemies = 5 + level

  // Initialize game
  useEffect(() => {
    if (!isPaused) {
      startGameLoop()
      startEnemySpawner()
    }

    return () => {
      clearInterval(enemySpawnTimerRef.current)
      cancelAnimationFrame(gameLoopRef.current)
    }
  }, [level, isPaused])

  // Check for game over
  useEffect(() => {
    if (isGameOver) {
      onGameOver(score)
    }
  }, [isGameOver, score, onGameOver])

  // Handle mouse/touch movement for launcher
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameAreaRef.current || isPaused) return

      const gameArea = gameAreaRef.current.getBoundingClientRect()
      const relativeX = e.clientX - gameArea.left
      const percentX = (relativeX / gameArea.width) * 100
      setLauncherPosition(Math.min(Math.max(percentX, 5), 95))
    }

    const handleTouchMove = (e) => {
      if (!gameAreaRef.current || !e.touches[0] || isPaused) return

      const gameArea = gameAreaRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const relativeX = touch.clientX - gameArea.left
      const percentX = (relativeX / gameArea.width) * 100
      setLauncherPosition(Math.min(Math.max(percentX, 5), 95))
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isPaused, setLauncherPosition])

  // Game loop
  const startGameLoop = () => {
    const updateGame = () => {
      if (isPaused) return

      // Update enemy positions
      setEnemies((prevEnemies) => {
        return prevEnemies
          .map((enemy) => {
            // Move enemy down
            const newY = enemy.y + enemySpeed * enemy.speed

            // Check if enemy has reached the bottom
            if (newY > 90) {
              decrementLives()
              return null
            }

            return { ...enemy, y: newY }
          })
          .filter(Boolean) // Remove null entries (enemies that reached bottom)
      })

      // Update missile positions
      setMissiles((prevMissiles) => {
        return prevMissiles
          .map((missile) => {
            // Move missile up
            const newY = missile.y - 2.5 - level * 0.1

            // Remove missile if it goes off screen
            if (newY < 0) {
              return null
            }

            return { ...missile, y: newY }
          })
          .filter(Boolean)
      })

      // Check for collisions
      checkCollisions()

      // Update explosions (remove after animation)
      setExplosions((prevExplosions) => {
        return prevExplosions
          .map((explosion) => {
            if (explosion.frame >= 15) {
              return null
            }
            return { ...explosion, frame: explosion.frame + 1 }
          })
          .filter(Boolean)
      })

      gameLoopRef.current = requestAnimationFrame(updateGame)
    }

    gameLoopRef.current = requestAnimationFrame(updateGame)
  }

  // Enemy spawner
  const startEnemySpawner = () => {
    enemySpawnTimerRef.current = setInterval(() => {
      if (enemies.length < maxEnemies && !isPaused) {
        const enemyType = Math.random() > 0.5 ? ENEMY_TYPES.AIRCRAFT : ENEMY_TYPES.HELICOPTER
        const newEnemy = {
          id: Date.now(),
          type: enemyType,
          x: Math.random() * 80 + 10, // Random position between 10% and 90%
          y: 0,
          direction: Math.random() > 0.5 ? "left" : "right",
          speed: enemySpeed * (0.8 + Math.random() * 0.4), // Random speed variation
          scale: 0.8 + Math.random() * 0.4, // Random size variation
        }

        setEnemies((prevEnemies) => [...prevEnemies, newEnemy])
      }

      // Check if we should level up (based on score)
      if (enemies.length === 0 && !isPaused) {
        incrementLevel()
      }
    }, enemySpawnRate)
  }

  // Fire missile
  const fireMissile = () => {
    if (isPaused) return

    const newMissile = {
      id: Date.now(),
      x: launcherPosition,
      y: 90,
    }

    setMissiles((prevMissiles) => [...prevMissiles, newMissile])
  }

  // Check for collisions between missiles and enemies
  const checkCollisions = () => {
    const hitEnemies = []
    const hitMissiles = []

    missiles.forEach((missile) => {
      enemies.forEach((enemy) => {
        if (checkCollision(missile, enemy)) {
          hitEnemies.push(enemy.id)
          hitMissiles.push(missile.id)

          // Create explosion
          setExplosions((prev) => [
            ...prev,
            {
              id: Date.now(),
              x: enemy.x,
              y: enemy.y,
              frame: 0,
              scale: enemy.scale || 1,
            },
          ])

          // Increment score
          incrementScore()
        }
      })
    })

    // Remove hit enemies and missiles
    if (hitEnemies.length > 0) {
      setEnemies((prev) => prev.filter((enemy) => !hitEnemies.includes(enemy.id)))
    }

    if (hitMissiles.length > 0) {
      setMissiles((prev) => prev.filter((missile) => !hitMissiles.includes(missile.id)))
    }
  }

  // Handle click/tap to fire
  const handleClick = () => {
    fireMissile()
  }

  return (
    <div ref={gameAreaRef} className="w-full h-[80vh] relative cursor-crosshair" onClick={handleClick}>
      {/* Parallax background */}
      <ParallaxBackground level={level} />

      {/* Render enemies */}
      {enemies.map((enemy) =>
        enemy.type === ENEMY_TYPES.AIRCRAFT ? (
          <Aircraft key={enemy.id} x={enemy.x} y={enemy.y} direction={enemy.direction} scale={enemy.scale || 1} />
        ) : (
          <Helicopter key={enemy.id} x={enemy.x} y={enemy.y} direction={enemy.direction} scale={enemy.scale || 1} />
        ),
      )}

      {/* Render missiles */}
      {missiles.map((missile) => (
        <Missile key={missile.id} x={missile.x} y={missile.y} />
      ))}

      {/* Render explosions */}
      {explosions.map((explosion) => (
        <Explosion
          key={explosion.id}
          x={explosion.x}
          y={explosion.y}
          frame={explosion.frame}
          scale={explosion.scale || 1}
        />
      ))}

      {/* Render missile launcher */}
      <MissileLauncher position={launcherPosition} />

      {/* Ground with terrain */}
      <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-green-800 to-green-600 z-10">
        <div className="absolute top-0 left-0 w-full h-4 bg-green-700 opacity-30"></div>

        {/* 3D terrain effect */}
        <div className="absolute top-0 left-0 w-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-green-700"
              style={{
                top: `${i * 1.2}px`,
                opacity: 0.1 + i * 0.05,
                transform: `perspective(500px) rotateX(60deg) translateZ(${i * 2}px)`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
