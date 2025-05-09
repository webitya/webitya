"use client"

import { useState, useEffect, useRef } from "react"
import {
  IndianTank,
  PakistaniTank,
  IndianSoldier,
  PakistaniSoldier,
  Helicopter,
  Explosion,
  Bullet,
  Missile,
  Building,
  Tree,
} from "./game-sprites"
import MiniMap from "./mini-map"

export default function GameBoard({ setScore, setGameOver, difficulty, muted }) {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 400 })
  const [playerHealth, setPlayerHealth] = useState(100)
  const [playerAmmo, setPlayerAmmo] = useState(100)
  const [playerSpecialAmmo, setPlayerSpecialAmmo] = useState(5)
  const [enemies, setEnemies] = useState([])
  const [allies, setAllies] = useState([])
  const [projectiles, setProjectiles] = useState([])
  const [explosions, setExplosions] = useState([])
  const [particles, setParticles] = useState([])
  const [terrainElements, setTerrainElements] = useState([])
  const [powerUps, setPowerUps] = useState([])
  const [gameTime, setGameTime] = useState(0)
  const [score, setLocalScore] = useState(0)
  const [cameraShake, setCameraShake] = useState(0)
  const [lastShot, setLastShot] = useState(0)
  const [specialWeaponCooldown, setSpecialWeaponCooldown] = useState(0)
  const [messages, setMessages] = useState([])
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 })

  const gameLoopRef = useRef()
  const enemySpawnRef = useRef()
  const enemyShootRef = useRef()
  const allySpawnRef = useRef()
  const powerUpSpawnRef = useRef()
  const keysPressed = useRef(new Set())
  const boardRef = useRef()
  const canvasRef = useRef()

  // Difficulty settings
  const difficultySettings = {
    easy: {
      enemySpawnRate: 3000,
      enemyShootRate: 2000,
      enemyHealth: { tank: 80, soldier: 40, helicopter: 120 },
      enemyDamage: 5,
      allySpawnRate: 5000,
    },
    medium: {
      enemySpawnRate: 2000,
      enemyShootRate: 1500,
      enemyHealth: { tank: 100, soldier: 50, helicopter: 150 },
      enemyDamage: 10,
      allySpawnRate: 8000,
    },
    hard: {
      enemySpawnRate: 1500,
      enemyShootRate: 1000,
      enemyHealth: { tank: 120, soldier: 60, helicopter: 180 },
      enemyDamage: 15,
      allySpawnRate: 12000,
    },
  }

  const settings = difficultySettings[difficulty]

  // Sound effects
  const playSound = (sound) => {
    if (muted) return

    const audio = new Audio(`/sounds/${sound}.mp3`)
    audio.volume = sound.includes("explosion") ? 0.4 : 0.2
    audio.play().catch((e) => console.error("Audio play error:", e))
  }

  // Initialize game
  useEffect(() => {
    // Set up key listeners
    const handleKeyDown = (e) => {
      keysPressed.current.add(e.key)

      // Shoot on spacebar
      if (e.key === " " && Date.now() - lastShot > 300 && playerAmmo > 0) {
        shoot("india", "regular")
        setLastShot(Date.now())
        setPlayerAmmo((prev) => prev - 1)
      }

      // Special weapon on Shift
      if (e.key === "Shift" && specialWeaponCooldown === 0 && playerSpecialAmmo > 0) {
        shoot("india", "special")
        setSpecialWeaponCooldown(5000) // 5 second cooldown
        setPlayerSpecialAmmo((prev) => prev - 1)
        addMessage("Missile Launched!")
        playSound("missile_launch")
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Initialize terrain
    initializeTerrain()

    // Start game loop
    startGameLoop()

    // Start enemy spawning
    enemySpawnRef.current = setInterval(() => {
      spawnEnemy()
    }, settings.enemySpawnRate)

    // Start enemy shooting
    enemyShootRef.current = setInterval(() => {
      enemiesShoot()
    }, settings.enemyShootRate)

    // Start ally spawning
    allySpawnRef.current = setInterval(() => {
      spawnAlly()
    }, settings.allySpawnRate)

    // Start power-up spawning
    powerUpSpawnRef.current = setInterval(() => {
      spawnPowerUp()
    }, 15000)

    // Initialize canvas for particles
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      canvasRef.current.width = 800
      canvasRef.current.height = 600
    }

    // Add initial message
    addMessage("Defend the border!")

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      clearInterval(gameLoopRef.current)
      clearInterval(enemySpawnRef.current)
      clearInterval(enemyShootRef.current)
      clearInterval(allySpawnRef.current)
      clearInterval(powerUpSpawnRef.current)
    }
  }, [difficulty, muted])

  // Update score
  useEffect(() => {
    setScore(score)

    if (playerHealth <= 0) {
      setGameOver(true)
      playSound("game_over")
      clearInterval(gameLoopRef.current)
      clearInterval(enemySpawnRef.current)
      clearInterval(enemyShootRef.current)
      clearInterval(allySpawnRef.current)
      clearInterval(powerUpSpawnRef.current)
    }
  }, [score, playerHealth, setScore, setGameOver, muted])

  // Special weapon cooldown
  useEffect(() => {
    if (specialWeaponCooldown > 0) {
      const timer = setTimeout(() => {
        setSpecialWeaponCooldown((prev) => Math.max(0, prev - 100))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [specialWeaponCooldown])

  // Initialize terrain elements
  const initializeTerrain = () => {
    const newTerrain = []

    // Add some buildings
    for (let i = 0; i < 5; i++) {
      newTerrain.push({
        id: `building-${i}`,
        x: 200 + Math.random() * 400,
        y: 100 + Math.random() * 400,
        type: "building",
        variant: Math.floor(Math.random() * 3),
      })
    }

    // Add some trees
    for (let i = 0; i < 15; i++) {
      newTerrain.push({
        id: `tree-${i}`,
        x: 50 + Math.random() * 700,
        y: 50 + Math.random() * 500,
        type: "tree",
        variant: Math.floor(Math.random() * 2),
      })
    }

    setTerrainElements(newTerrain)
  }

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      // Update game time
      setGameTime((prev) => prev + 1)

      // Handle player movement
      handlePlayerMovement()

      // Move projectiles
      moveProjectiles()

      // Move enemies
      moveEnemies()

      // Move allies
      moveAllies()

      // Check collisions
      checkCollisions()

      // Update explosions
      updateExplosions()

      // Update particles
      updateParticles()

      // Update camera shake
      if (cameraShake > 0) {
        setCameraShake((prev) => prev - 1)
      }

      // Update special weapon cooldown
      if (specialWeaponCooldown > 0) {
        setSpecialWeaponCooldown((prev) => Math.max(0, prev - 16.67)) // 60fps = 16.67ms per frame
      }

      // Update messages
      setMessages((prev) => prev.filter((msg) => Date.now() - msg.time < 3000))

      // Occasionally replenish ammo
      if (gameTime % 300 === 0 && playerAmmo < 100) {
        setPlayerAmmo((prev) => Math.min(100, prev + 10))
        addMessage("Ammo Replenished!")
      }

      // Update viewport offset (camera follow)
      updateViewportOffset()
    }, 1000 / 60) // 60 FPS
  }

  const updateViewportOffset = () => {
    if (!boardRef.current) return

    // Calculate the center of the viewport
    const viewportWidth = boardRef.current.clientWidth
    const viewportHeight = boardRef.current.clientHeight

    // Target is player position
    const targetX = playerPosition.x - viewportWidth / 2
    const targetY = playerPosition.y - viewportHeight / 2

    // Smooth camera follow
    setViewportOffset((prev) => ({
      x: prev.x + (targetX - prev.x) * 0.05,
      y: prev.y + (targetY - prev.y) * 0.05,
    }))
  }

  const handlePlayerMovement = () => {
    setPlayerPosition((prev) => {
      let newX = prev.x
      let newY = prev.y
      const speed = 4

      if (keysPressed.current.has("ArrowLeft") || keysPressed.current.has("a")) {
        newX = Math.max(50, prev.x - speed)
      }
      if (keysPressed.current.has("ArrowRight") || keysPressed.current.has("d")) {
        newX = Math.min(750, prev.x + speed)
      }
      if (keysPressed.current.has("ArrowUp") || keysPressed.current.has("w")) {
        newY = Math.max(50, prev.y - speed)
      }
      if (keysPressed.current.has("ArrowDown") || keysPressed.current.has("s")) {
        newY = Math.min(550, prev.y + speed)
      }

      // Check collision with terrain
      const playerRadius = 25
      let canMove = true

      terrainElements.forEach((element) => {
        if (element.type === "building") {
          const buildingWidth = 60
          const buildingHeight = 60

          // Simple rectangular collision
          if (
            newX + playerRadius > element.x - buildingWidth / 2 &&
            newX - playerRadius < element.x + buildingWidth / 2 &&
            newY + playerRadius > element.y - buildingHeight / 2 &&
            newY - playerRadius < element.y + buildingHeight / 2
          ) {
            canMove = false
          }
        }
      })

      return canMove ? { x: newX, y: newY } : prev
    })
  }

  const spawnEnemy = () => {
    const enemyTypes = ["pakistaniTank", "pakistaniSoldier", "helicopter"]
    const weights = [0.4, 0.4, 0.2] // 40% tank, 40% soldier, 20% helicopter

    // Weighted random selection
    const random = Math.random()
    let typeIndex = 0
    let sum = weights[0]

    while (random > sum && typeIndex < weights.length - 1) {
      typeIndex++
      sum += weights[typeIndex]
    }

    const type = enemyTypes[typeIndex]

    // Health based on type and difficulty
    let health
    switch (type) {
      case "pakistaniTank":
        health = settings.enemyHealth.tank
        break
      case "pakistaniSoldier":
        health = settings.enemyHealth.soldier
        break
      case "helicopter":
        health = settings.enemyHealth.helicopter
        break
      default:
        health = 100
    }

    // Spawn position - from right, top or bottom
    let x, y
    const spawnSide = Math.floor(Math.random() * 3)

    switch (spawnSide) {
      case 0: // Right
        x = 800
        y = 100 + Math.random() * 400
        break
      case 1: // Top
        x = 100 + Math.random() * 600
        y = 0
        break
      case 2: // Bottom
        x = 100 + Math.random() * 600
        y = 600
        break
      default:
        x = 800
        y = 300
    }

    const newEnemy = {
      id: Date.now() + Math.random(),
      x,
      y,
      type,
      health,
      maxHealth: health,
      direction: "left",
      speed: type === "helicopter" ? 2 : type === "pakistaniSoldier" ? 1.5 : 1,
      lastShot: 0,
    }

    setEnemies((prev) => [...prev, newEnemy])

    if (type === "helicopter") {
      playSound("helicopter")
    }
  }

  const spawnAlly = () => {
    // Only spawn allies if there are fewer than 3
    if (allies.length >= 3) return

    const allyTypes = ["indianSoldier"]
    const type = allyTypes[Math.floor(Math.random() * allyTypes.length)]

    // Spawn from left side
    const newAlly = {
      id: Date.now() + Math.random(),
      x: 0,
      y: 300 + Math.random() * 200,
      type,
      health: 70,
      maxHealth: 70,
      direction: "right",
      speed: 1,
      lastShot: 0,
    }

    setAllies((prev) => [...prev, newAlly])
    addMessage("Reinforcements have arrived!")
  }

  const spawnPowerUp = () => {
    const powerUpTypes = ["health", "ammo", "special"]
    const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]

    const newPowerUp = {
      id: Date.now() + Math.random(),
      x: 100 + Math.random() * 600,
      y: 100 + Math.random() * 400,
      type,
      duration: 10000, // 10 seconds
    }

    setPowerUps((prev) => [...prev, newPowerUp])
    addMessage("Supply drop incoming!")
    playSound("powerup_spawn")
  }

  const moveEnemies = () => {
    setEnemies((prev) =>
      prev
        .map((enemy) => {
          // Different movement patterns based on enemy type
          let newX = enemy.x
          let newY = enemy.y
          let newDirection = enemy.direction

          // Calculate distance to player
          const dx = playerPosition.x - enemy.x
          const dy = playerPosition.y - enemy.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (enemy.type === "helicopter") {
            // Helicopters move more erratically and can go anywhere
            if (distance < 300) {
              // If close to player, circle around
              const angle = Math.atan2(dy, dx) + Math.PI / 2 // Perpendicular
              newX += Math.cos(angle) * enemy.speed
              newY += Math.sin(angle) * enemy.speed

              // Occasionally shoot if close
              if (Math.random() < 0.02 && Date.now() - enemy.lastShot > 1000) {
                shoot("pakistan", "regular", enemy)
                enemy.lastShot = Date.now()
              }
            } else {
              // Move toward player
              newX += (dx / distance) * enemy.speed
              newY += (dy / distance) * enemy.speed
            }

            // Update direction based on movement
            newDirection = dx > 0 ? "right" : "left"
          } else if (enemy.type === "pakistaniSoldier") {
            // Soldiers try to flank the player
            if (distance < 200) {
              // If close, move perpendicular to player
              const angle = Math.atan2(dy, dx) + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2)
              newX += Math.cos(angle) * enemy.speed
              newY += Math.sin(angle) * enemy.speed
            } else {
              // Move toward player
              newX += (dx / distance) * enemy.speed
              newY += (dy / distance) * enemy.speed
            }

            // Update direction
            newDirection = dx > 0 ? "right" : "left"
          } else {
            // Tanks move directly toward player
            if (distance > 50) {
              newX += (dx / distance) * enemy.speed
              newY += (dy / distance) * enemy.speed
            }

            // Update direction
            newDirection = dx > 0 ? "right" : "left"
          }

          // Check terrain collision
          let canMove = true
          terrainElements.forEach((element) => {
            if (element.type === "building") {
              const buildingWidth = 60
              const buildingHeight = 60
              const enemyRadius = enemy.type === "helicopter" ? 0 : 20 // Helicopters fly over buildings

              if (
                newX + enemyRadius > element.x - buildingWidth / 2 &&
                newX - enemyRadius < element.x + buildingWidth / 2 &&
                newY + enemyRadius > element.y - buildingHeight / 2 &&
                newY - enemyRadius < element.y + buildingHeight / 2
              ) {
                canMove = false
              }
            }
          })

          return {
            ...enemy,
            x: canMove ? newX : enemy.x,
            y: canMove ? newY : enemy.y,
            direction: newDirection,
          }
        })
        .filter((enemy) => enemy.x > -50 && enemy.x < 850 && enemy.y > -50 && enemy.y < 650 && enemy.health > 0),
    )
  }

  const moveAllies = () => {
    setAllies((prev) =>
      prev
        .map((ally) => {
          // Find closest enemy
          let closestEnemy = null
          let minDistance = Number.POSITIVE_INFINITY

          enemies.forEach((enemy) => {
            const dx = enemy.x - ally.x
            const dy = enemy.y - ally.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < minDistance) {
              minDistance = distance
              closestEnemy = enemy
            }
          })

          let newX = ally.x
          let newY = ally.y
          let newDirection = ally.direction

          if (closestEnemy && minDistance < 300) {
            // Move toward closest enemy
            const dx = closestEnemy.x - ally.x
            const dy = closestEnemy.y - ally.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            newX += (dx / distance) * ally.speed
            newY += (dy / distance) * ally.speed
            newDirection = dx > 0 ? "right" : "left"

            // Shoot at enemy if close enough
            if (minDistance < 200 && Math.random() < 0.01 && Date.now() - ally.lastShot > 2000) {
              shoot("india", "regular", ally)
              ally.lastShot = Date.now()
            }
          } else {
            // Patrol - move right
            newX += ally.speed
            newDirection = "right"
          }

          // Check terrain collision
          let canMove = true
          terrainElements.forEach((element) => {
            if (element.type === "building") {
              const buildingWidth = 60
              const buildingHeight = 60
              const allyRadius = 20

              if (
                newX + allyRadius > element.x - buildingWidth / 2 &&
                newX - allyRadius < element.x + buildingWidth / 2 &&
                newY + allyRadius > element.y - buildingHeight / 2 &&
                newY - allyRadius < element.y + buildingHeight / 2
              ) {
                canMove = false
              }
            }
          })

          return {
            ...ally,
            x: canMove ? newX : ally.x,
            y: canMove ? newY : ally.y,
            direction: newDirection,
          }
        })
        .filter((ally) => ally.x > -50 && ally.x < 850 && ally.y > -50 && ally.y < 650 && ally.health > 0),
    )
  }

  const shoot = (source, weaponType, shooter = null) => {
    const sourceX = shooter ? shooter.x : source === "india" ? playerPosition.x : 0
    const sourceY = shooter ? shooter.y : source === "india" ? playerPosition.y : 0

    if (weaponType === "special") {
      // Special weapon (missile)
      const newProjectile = {
        id: Date.now() + Math.random(),
        x: sourceX,
        y: sourceY,
        direction: source === "india" ? "right" : "left",
        source,
        type: "missile",
        target: source === "india" ? findClosestEnemy(sourceX, sourceY) : { x: playerPosition.x, y: playerPosition.y },
      }

      setProjectiles((prev) => [...prev, newProjectile])
    } else {
      // Regular weapon (bullet)
      const newProjectile = {
        id: Date.now() + Math.random(),
        x: sourceX,
        y: sourceY,
        direction: shooter ? shooter.direction : source === "india" ? "right" : "left",
        source,
        type: "bullet",
      }

      setProjectiles((prev) => [...prev, newProjectile])
      playSound(source === "india" ? "player_shoot" : "enemy_shoot")
    }
  }

  const findClosestEnemy = (x, y) => {
    let closestEnemy = null
    let minDistance = Number.POSITIVE_INFINITY

    enemies.forEach((enemy) => {
      const dx = enemy.x - x
      const dy = enemy.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < minDistance) {
        minDistance = distance
        closestEnemy = { x: enemy.x, y: enemy.y }
      }
    })

    return closestEnemy || { x: 800, y: 300 } // Default target if no enemies
  }

  const enemiesShoot = () => {
    // Only some enemies shoot
    setEnemies((prev) =>
      prev.map((enemy) => {
        // Check if enemy should shoot based on distance to player and random chance
        const dx = playerPosition.x - enemy.x
        const dy = playerPosition.y - enemy.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 300 && Math.random() < 0.3 && Date.now() - enemy.lastShot > 2000) {
          shoot("pakistan", "regular", enemy)
          return { ...enemy, lastShot: Date.now() }
        }

        return enemy
      }),
    )
  }

  const moveProjectiles = () => {
    setProjectiles((prev) =>
      prev
        .map((projectile) => {
          if (projectile.type === "missile") {
            // Guided missile movement
            const dx = projectile.target.x - projectile.x
            const dy = projectile.target.y - projectile.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // If very close to target, explode
            if (distance < 10) {
              createExplosion(projectile.x, projectile.y, "large")
              return null // Remove missile
            }

            // Move toward target
            const speed = 5
            return {
              ...projectile,
              x: projectile.x + (dx / distance) * speed,
              y: projectile.y + (dy / distance) * speed,
            }
          } else {
            // Regular bullet movement
            const speed = 10
            return {
              ...projectile,
              x: projectile.direction === "right" ? projectile.x + speed : projectile.x - speed,
            }
          }
        })
        .filter(Boolean) // Remove null entries (exploded missiles)
        .filter((projectile) => projectile.x > -20 && projectile.x < 820 && projectile.y > -20 && projectile.y < 620),
    )
  }

  const checkCollisions = () => {
    // Check projectile collisions
    projectiles.forEach((projectile) => {
      // Check collision with terrain
      terrainElements.forEach((element) => {
        if (element.type === "building") {
          const dx = projectile.x - element.x
          const dy = projectile.y - element.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 30) {
            // Hit building
            setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
            createExplosion(projectile.x, projectile.y, projectile.type === "missile" ? "large" : "small")
          }
        }
      })

      if (projectile.source === "india") {
        // Check if Indian projectile hit Pakistani units
        enemies.forEach((enemy) => {
          const dx = projectile.x - enemy.x
          const dy = projectile.y - enemy.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Different hit radius based on projectile type
          const hitRadius = projectile.type === "missile" ? 50 : 20

          if (distance < hitRadius) {
            // Hit!
            const damage = projectile.type === "missile" ? 100 : 25

            setEnemies((prev) =>
              prev.map((e) => (e.id === enemy.id ? { ...e, health: Math.max(0, e.health - damage) } : e)),
            )

            // Remove projectile if it's a bullet (missiles explode on impact)
            if (projectile.type !== "missile") {
              setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
            }

            // Create explosion
            createExplosion(enemy.x, enemy.y, projectile.type === "missile" ? "large" : "small")

            // Add score if enemy destroyed
            if (enemy.health <= damage) {
              let points
              switch (enemy.type) {
                case "pakistaniTank":
                  points = 100
                  break
                case "pakistaniSoldier":
                  points = 50
                  break
                case "helicopter":
                  points = 200
                  break
                default:
                  points = 50
              }

              setLocalScore((prev) => prev + points)
              addMessage(`+${points} points!`)
            }
          }
        })
      } else {
        // Check if Pakistani projectile hit Indian player or allies

        // Check player hit
        const dxPlayer = projectile.x - playerPosition.x
        const dyPlayer = projectile.y - playerPosition.y
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dyPlayer * dyPlayer)

        if (distancePlayer < 25) {
          // Player hit!
          setPlayerHealth((prev) => Math.max(0, prev - settings.enemyDamage))

          // Remove projectile
          setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))

          // Create explosion
          createExplosion(playerPosition.x, playerPosition.y, "small")

          // Camera shake
          setCameraShake(10)

          // Play hit sound
          playSound("player_hit")
        }

        // Check ally hits
        allies.forEach((ally) => {
          const dx = projectile.x - ally.x
          const dy = projectile.y - ally.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 20) {
            // Ally hit!
            setAllies((prev) => prev.map((a) => (a.id === ally.id ? { ...a, health: Math.max(0, a.health - 25) } : a)))

            // Remove projectile
            setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))

            // Create explosion
            createExplosion(ally.x, ally.y, "small")
          }
        })
      }
    })

    // Check power-up collisions with player
    powerUps.forEach((powerUp) => {
      const dx = powerUp.x - playerPosition.x
      const dy = powerUp.y - playerPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 30) {
        // Collect power-up
        setPowerUps((prev) => prev.filter((p) => p.id !== powerUp.id))

        // Apply power-up effect
        switch (powerUp.type) {
          case "health":
            setPlayerHealth((prev) => Math.min(100, prev + 30))
            addMessage("Health restored!")
            break
          case "ammo":
            setPlayerAmmo((prev) => Math.min(100, prev + 50))
            addMessage("Ammo replenished!")
            break
          case "special":
            setPlayerSpecialAmmo((prev) => Math.min(10, prev + 3))
            addMessage("Special weapon acquired!")
            break
        }

        // Play sound
        playSound("powerup_collect")
      }
    })
  }

  const createExplosion = (x, y, size) => {
    // Add explosion
    const newExplosion = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      frame: 0,
    }

    setExplosions((prev) => [...prev, newExplosion])

    // Add particles
    const particleCount = size === "large" ? 30 : 15
    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 3

      newParticles.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30 + Math.random() * 30,
        color: Math.random() > 0.6 ? "#ff4500" : "#ffcc00",
      })
    }

    setParticles((prev) => [...prev, ...newParticles])

    // Play sound
    playSound(size === "large" ? "explosion_large" : "explosion_small")

    // Camera shake
    setCameraShake(size === "large" ? 20 : 10)

    // Area damage for large explosions
    if (size === "large") {
      // Damage enemies in blast radius
      setEnemies((prev) =>
        prev.map((enemy) => {
          const dx = enemy.x - x
          const dy = enemy.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Calculate damage based on distance (more damage closer to center)
            const damage = Math.floor(100 * (1 - distance / 100))
            return { ...enemy, health: Math.max(0, enemy.health - damage) }
          }

          return enemy
        }),
      )
    }
  }

  const updateExplosions = () => {
    setExplosions((prev) =>
      prev
        .map((explosion) => ({
          ...explosion,
          frame: explosion.frame + 1,
        }))
        .filter((explosion) => explosion.frame < (explosion.size === "large" ? 15 : 10)),
    )
  }

  const updateParticles = () => {
    // Update particles in state
    setParticles((prev) =>
      prev
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
        }))
        .filter((particle) => particle.life > 0),
    )

    // Draw particles on canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 60
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }
  }

  const addMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, time: Date.now() }])
  }

  // Calculate camera shake offset
  const shakeX = cameraShake > 0 ? (Math.random() - 0.5) * cameraShake : 0
  const shakeY = cameraShake > 0 ? (Math.random() - 0.5) * cameraShake : 0

  // Calculate viewport transform with shake
  const viewportTransform = `translate(${-viewportOffset.x + shakeX}px, ${-viewportOffset.y + shakeY}px)`

  return (
    <div
      className="relative w-full h-[600px] border-2 border-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.7)]"
      ref={boardRef}
    >
      {/* Game world container with camera transform */}
      <div
        className="absolute inset-0 w-[2000px] h-[1500px] transition-transform duration-100 ease-out"
        style={{ transform: viewportTransform }}
      >
        {/* Terrain background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-800 opacity-70"></div>

        {/* Grid lines for depth perception */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Terrain elements */}
        {terrainElements.map((element) => (
          <div
            key={element.id}
            className="absolute transform-gpu"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: Math.floor(element.y),
            }}
          >
            {element.type === "building" ? <Building variant={element.variant} /> : <Tree variant={element.variant} />}
          </div>
        ))}

        {/* Power-ups */}
        {powerUps.map((powerUp) => (
          <div
            key={powerUp.id}
            className="absolute animate-bounce"
            style={{
              left: `${powerUp.x}px`,
              top: `${powerUp.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: Math.floor(powerUp.y),
            }}
          >
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  powerUp.type === "health" ? "bg-red-500" : powerUp.type === "ammo" ? "bg-yellow-500" : "bg-purple-500"
                } shadow-[0_0_10px_rgba(255,255,255,0.7)] animate-pulse`}
              >
                {powerUp.type === "health" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                )}
                {powerUp.type === "ammo" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 5L5 19"></path>
                    <path d="M5 5l14 14"></path>
                  </svg>
                )}
                {powerUp.type === "special" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )}
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold bg-black bg-opacity-50 px-2 rounded">
                {powerUp.type}
              </div>
            </div>
          </div>
        ))}

        {/* Player */}
        <div
          className="absolute transform-gpu transition-transform duration-100"
          style={{
            left: `${playerPosition.x}px`,
            top: `${playerPosition.y}px`,
            transform: "translate(-50%, -50%)",
            zIndex: Math.floor(playerPosition.y),
          }}
        >
          <div className="relative">
            <IndianTank />

            {/* Health bar */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${playerHealth}%`,
                  backgroundColor: playerHealth > 60 ? "#22c55e" : playerHealth > 30 ? "#eab308" : "#ef4444",
                }}
              ></div>
            </div>

            {/* Player name */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold bg-orange-600 px-2 py-0.5 rounded">
              INDIA
            </div>
          </div>
        </div>

        {/* Allies */}
        {allies.map((ally) => (
          <div
            key={ally.id}
            className="absolute transform-gpu"
            style={{
              left: `${ally.x}px`,
              top: `${ally.y}px`,
              transform: `translate(-50%, -50%) scaleX(${ally.direction === "left" ? 1 : -1})`,
              zIndex: Math.floor(ally.y),
            }}
          >
            <div className="relative">
              <IndianSoldier />

              {/* Health bar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${(ally.health / ally.maxHealth) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* Enemies */}
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className="absolute transform-gpu"
            style={{
              left: `${enemy.x}px`,
              top: `${enemy.y}px`,
              transform: `translate(-50%, -50%) scaleX(${enemy.direction === "left" ? 1 : -1})`,
              zIndex: Math.floor(enemy.y),
            }}
          >
            <div className="relative">
              {enemy.type === "pakistaniTank" ? (
                <PakistaniTank />
              ) : enemy.type === "helicopter" ? (
                <Helicopter />
              ) : (
                <PakistaniSoldier />
              )}

              {/* Health bar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
                ></div>
              </div>

              {/* Enemy name */}
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold bg-green-800 px-2 py-0.5 rounded">
                PAK
              </div>
            </div>
          </div>
        ))}

        {/* Projectiles */}
        {projectiles.map((projectile) => (
          <div
            key={projectile.id}
            className="absolute"
            style={{
              left: `${projectile.x}px`,
              top: `${projectile.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            {projectile.type === "missile" ? (
              <Missile color={projectile.source === "india" ? "orange" : "green"} />
            ) : (
              <Bullet color={projectile.source === "india" ? "orange" : "green"} />
            )}
          </div>
        ))}

        {/* Explosions */}
        {explosions.map((explosion) => (
          <div
            key={explosion.id}
            className="absolute"
            style={{
              left: `${explosion.x}px`,
              top: `${explosion.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 2000,
            }}
          >
            <Explosion frame={explosion.frame} size={explosion.size} />
          </div>
        ))}

        {/* Particles - rendered on canvas for better performance */}
        <canvas
          ref={canvasRef}
          width="800"
          height="600"
          className="absolute top-0 left-0 pointer-events-none z-[1500]"
          style={{
            width: "2000px",
            height: "1500px",
          }}
        />
      </div>

      {/* Fixed UI elements */}
      <div className="absolute top-4 left-4 z-[3000] flex flex-col space-y-2">
        {/* Ammo display */}
        <div className="bg-black bg-opacity-70 p-2 rounded-lg flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 5L5 19"></path>
            <path d="M5 5l14 14"></path>
          </svg>
          <div className="w-24 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: `${playerAmmo}%` }}></div>
          </div>
          <span className="text-white text-xs font-bold">{playerAmmo}</span>
        </div>

        {/* Special weapon display */}
        <div className="bg-black bg-opacity-70 p-2 rounded-lg flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <div className="flex space-x-1">
            {[...Array(playerSpecialAmmo)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-purple-500 rounded-full"></div>
            ))}
            {[...Array(10 - playerSpecialAmmo)].map((_, i) => (
              <div key={i + playerSpecialAmmo} className="w-4 h-4 bg-gray-700 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Special weapon cooldown */}
        {specialWeaponCooldown > 0 && (
          <div className="bg-black bg-opacity-70 p-2 rounded-lg">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-100 ease-linear"
                style={{ width: `${100 - (specialWeaponCooldown / 5000) * 100}%` }}
              ></div>
            </div>
            <div className="text-white text-xs text-center mt-1">{Math.ceil(specialWeaponCooldown / 1000)}s</div>
          </div>
        )}
      </div>

      {/* Mini-map */}
      <div className="absolute bottom-4 right-4 z-[3000]">
        <MiniMap playerPosition={playerPosition} enemies={enemies} allies={allies} terrainElements={terrainElements} />
      </div>

      {/* Game messages */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[3000] flex flex-col items-center space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-black bg-opacity-70 px-3 py-1 rounded-lg text-white font-bold"
            style={{
              opacity: 1 - (Date.now() - msg.time) / 3000,
              animation: "fadeInOut 3s ease-in-out",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 z-[3000] bg-black bg-opacity-70 p-2 rounded-lg text-white text-xs">
        <div>WASD/Arrows: Move</div>
        <div>SPACE: Shoot</div>
        <div>SHIFT: Missile ({playerSpecialAmmo})</div>
      </div>
    </div>
  )
}
