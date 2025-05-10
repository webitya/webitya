"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  IndianTank,
  PakistaniTank,
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
  // Game state
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 })
  const [playerHealth, setPlayerHealth] = useState(100)
  const [playerAmmo, setPlayerAmmo] = useState(100)
  const [playerSpecialAmmo, setPlayerSpecialAmmo] = useState(5)
  const [playerDirection, setPlayerDirection] = useState("right")
  const [enemies, setEnemies] = useState([])
  const [projectiles, setProjectiles] = useState([])
  const [explosions, setExplosions] = useState([])
  const [terrainElements, setTerrainElements] = useState([])
  const [powerUps, setPowerUps] = useState([])
  const [score, setLocalScore] = useState(0)
  const [cameraShake, setCameraShake] = useState(0)
  const [lastShot, setLastShot] = useState(0)
  const [specialWeaponCooldown, setSpecialWeaponCooldown] = useState(0)
  const [messages, setMessages] = useState([])
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 })
  const [kills, setKills] = useState(0)
  const [killStreak, setKillStreak] = useState(0)
  const [lastKillTime, setLastKillTime] = useState(0)
  const [showKillFeed, setShowKillFeed] = useState(false)
  const [killFeedMessage, setKillFeedMessage] = useState("")
  const [worldDimensions, setWorldDimensions] = useState({ width: 4000, height: 2000 })
  const [gameTime, setGameTime] = useState(0)
  const [isFiring, setIsFiring] = useState(false)
  const [isLaunchingMissile, setIsLaunchingMissile] = useState(false)
  const [muzzleFlash, setMuzzleFlash] = useState(false)

  // Refs
  const gameLoopRef = useRef(null)
  const enemySpawnRef = useRef(null)
  const enemyShootRef = useRef(null)
  const powerUpSpawnRef = useRef(null)
  const keysPressed = useRef(new Set())
  const boardRef = useRef(null)
  const canvasRef = useRef(null)
  const gameAreaRef = useRef(null)
  const lastFrameTimeRef = useRef(0)
  const playerRef = useRef(null)
  const enemiesRef = useRef([])
  const projectilesRef = useRef([])
  const terrainElementsRef = useRef([])
  const powerUpsRef = useRef([])

  // Sync refs with state for performance
  useEffect(() => {
    enemiesRef.current = enemies
  }, [enemies])

  useEffect(() => {
    projectilesRef.current = projectiles
  }, [projectiles])

  useEffect(() => {
    terrainElementsRef.current = terrainElements
  }, [terrainElements])

  useEffect(() => {
    powerUpsRef.current = powerUps
  }, [powerUps])

  // Difficulty settings
  const difficultySettings = {
    easy: {
      enemySpawnRate: 3000,
      enemyShootRate: 2000,
      enemyHealth: { tank: 40, soldier: 20, helicopter: 60 },
      enemyDamage: 5,
    },
    medium: {
      enemySpawnRate: 2000,
      enemyShootRate: 1500,
      enemyHealth: { tank: 60, soldier: 30, helicopter: 80 },
      enemyDamage: 10,
    },
    hard: {
      enemySpawnRate: 1500,
      enemyShootRate: 1000,
      enemyHealth: { tank: 80, soldier: 40, helicopter: 100 },
      enemyDamage: 15,
    },
  }

  const settings = difficultySettings[difficulty]

  // Sound effects
  const playSound = useCallback(
    (sound) => {
      if (muted) return
      if (window.playGameSound) {
        window.playGameSound(sound)
      }
    },
    [muted],
  )

  // Initialize game dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (gameAreaRef.current) {
        const width = Math.max(window.innerWidth * 3, 4000)
        const height = Math.max(window.innerHeight * 3, 2000)
        setWorldDimensions({ width, height })

        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth
          canvasRef.current.height = window.innerHeight - 200
        }
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Initialize game
  useEffect(() => {
    // Set up key listeners
    const handleKeyDown = (e) => {
      keysPressed.current.add(e.key.toLowerCase())

      // Shoot on F key or Space
      if ((e.key === " " || e.key.toLowerCase() === "f") && Date.now() - lastShot > 300 && playerAmmo > 0) {
        shoot("india", "regular")
        setLastShot(Date.now())
        setPlayerAmmo((prev) => prev - 1)
        setIsFiring(true)
        setMuzzleFlash(true)
        setTimeout(() => setMuzzleFlash(false), 100)
      }

      // Special weapon on M key or Shift
      if ((e.key === "Shift" || e.key.toLowerCase() === "m") && specialWeaponCooldown === 0 && playerSpecialAmmo > 0) {
        shoot("india", "special")
        setSpecialWeaponCooldown(5000) // 5 second cooldown
        setPlayerSpecialAmmo((prev) => prev - 1)
        addMessage("Missile Launched!")
        playSound("missile_launch")
        setIsLaunchingMissile(true)
        setTimeout(() => setIsLaunchingMissile(false), 500)
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current.delete(e.key.toLowerCase())

      if (e.key === " " || e.key.toLowerCase() === "f") {
        setIsFiring(false)
      }

      if (e.key === "Shift" || e.key.toLowerCase() === "m") {
        setIsLaunchingMissile(false)
      }
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

    // Start power-up spawning
    powerUpSpawnRef.current = setInterval(() => {
      spawnPowerUp()
    }, 15000)

    // Add initial message
    addMessage("Defend the border!")

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      clearInterval(gameLoopRef.current)
      clearInterval(enemySpawnRef.current)
      clearInterval(enemyShootRef.current)
      clearInterval(powerUpSpawnRef.current)
    }
  }, [
    difficulty,
    muted,
    playerAmmo,
    lastShot,
    specialWeaponCooldown,
    playerSpecialAmmo,
    playSound,
    settings.enemyShootRate,
    settings.enemySpawnRate,
  ])

  // Update score
  useEffect(() => {
    setScore(score)

    if (playerHealth <= 0) {
      setGameOver(true)
      playSound("game_over")
      clearInterval(gameLoopRef.current)
      clearInterval(enemySpawnRef.current)
      clearInterval(enemyShootRef.current)
      clearInterval(powerUpSpawnRef.current)
    }
  }, [score, playerHealth, setScore, setGameOver, playSound])

  // Special weapon cooldown
  useEffect(() => {
    if (specialWeaponCooldown > 0) {
      const timer = setTimeout(() => {
        setSpecialWeaponCooldown((prev) => Math.max(0, prev - 100))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [specialWeaponCooldown])

  // Kill streak timer
  useEffect(() => {
    if (Date.now() - lastKillTime > 5000 && killStreak > 0) {
      setKillStreak(0)
    }

    const timer = setTimeout(() => {
      if (Date.now() - lastKillTime > 5000 && killStreak > 0) {
        setKillStreak(0)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [lastKillTime, killStreak])

  // Kill feed display
  useEffect(() => {
    if (showKillFeed) {
      const timer = setTimeout(() => {
        setShowKillFeed(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showKillFeed])

  // Initialize terrain elements
  const initializeTerrain = () => {
    const newTerrain = []
    const { width, height } = worldDimensions

    // Add some buildings
    for (let i = 0; i < 20; i++) {
      newTerrain.push({
        id: `building-${i}`,
        x: 200 + Math.random() * (width - 400),
        y: 100 + Math.random() * (height - 200),
        type: "building",
        variant: Math.floor(Math.random() * 3),
        width: 60,
        height: 60,
      })
    }

    // Add some trees
    for (let i = 0; i < 40; i++) {
      newTerrain.push({
        id: `tree-${i}`,
        x: 50 + Math.random() * (width - 100),
        y: 50 + Math.random() * (height - 100),
        type: "tree",
        variant: Math.floor(Math.random() * 2),
        width: 30,
        height: 50,
      })
    }

    setTerrainElements(newTerrain)
    terrainElementsRef.current = newTerrain
  }

  const startGameLoop = () => {
    // Use requestAnimationFrame for smoother animation
    const gameLoop = (timestamp) => {
      // Calculate delta time for smooth animation
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp
      }
      const deltaTime = timestamp - lastFrameTimeRef.current
      lastFrameTimeRef.current = timestamp

      // Update game time (roughly 60 ticks per second)
      if (deltaTime > 0) {
        setGameTime((prev) => prev + deltaTime / 16.67)
      }

      // Handle player movement
      handlePlayerMovement(deltaTime)

      // Move projectiles
      moveProjectiles(deltaTime)

      // Move enemies
      moveEnemies(deltaTime)

      // Check collisions
      checkCollisions()

      // Update explosions
      updateExplosions()

      // Update camera shake
      if (cameraShake > 0) {
        setCameraShake((prev) => Math.max(0, prev - deltaTime / 16.67))
      }

      // Update special weapon cooldown
      if (specialWeaponCooldown > 0) {
        setSpecialWeaponCooldown((prev) => Math.max(0, prev - deltaTime))
      }

      // Update messages
      setMessages((prev) => prev.filter((msg) => Date.now() - msg.time < 3000))

      // Occasionally replenish ammo
      if (Math.floor(gameTime / 300) > Math.floor((gameTime - deltaTime / 16.67) / 300) && playerAmmo < 100) {
        setPlayerAmmo((prev) => Math.min(100, prev + 10))
        addMessage("Ammo Replenished!")
      }

      // Update viewport offset (camera follow)
      updateViewportOffset()

      // Continue the game loop
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    // Start the game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop)
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
      x: prev.x + (targetX - prev.x) * 0.1,
      y: prev.y + (targetY - prev.y) * 0.1,
    }))
  }

  const handlePlayerMovement = (deltaTime) => {
    const speed = 5 * (deltaTime / 16.67) // Base speed adjusted for frame rate

    setPlayerPosition((prev) => {
      let newX = prev.x
      let newY = prev.y
      let newDirection = playerDirection

      if (keysPressed.current.has("arrowleft") || keysPressed.current.has("a")) {
        newX = Math.max(50, prev.x - speed)
        newDirection = "left"
      }
      if (keysPressed.current.has("arrowright") || keysPressed.current.has("d")) {
        newX = Math.min(worldDimensions.width - 50, prev.x + speed)
        newDirection = "right"
      }
      if (keysPressed.current.has("arrowup") || keysPressed.current.has("w")) {
        newY = Math.max(50, prev.y - speed)
      }
      if (keysPressed.current.has("arrowdown") || keysPressed.current.has("s")) {
        newY = Math.min(worldDimensions.height - 50, prev.y + speed)
      }

      // Check collision with terrain
      const playerRadius = 25
      let canMove = true

      terrainElementsRef.current.forEach((element) => {
        if (element.type === "building") {
          const buildingWidth = element.width || 60
          const buildingHeight = element.height || 60

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

      // Update player direction
      if (newDirection !== playerDirection) {
        setPlayerDirection(newDirection)
      }

      // Auto-fire if holding F or Space
      if (
        (keysPressed.current.has("f") || keysPressed.current.has(" ")) &&
        Date.now() - lastShot > 300 &&
        playerAmmo > 0
      ) {
        shoot("india", "regular")
        setLastShot(Date.now())
        setPlayerAmmo((prev) => prev - 1)
        setMuzzleFlash(true)
        setTimeout(() => setMuzzleFlash(false), 100)
      }

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
    const { width, height } = worldDimensions

    switch (spawnSide) {
      case 0: // Right
        x = width - 100
        y = 100 + Math.random() * (height - 200)
        break
      case 1: // Top
        x = 100 + Math.random() * (width - 200)
        y = 50
        break
      case 2: // Bottom
        x = 100 + Math.random() * (width - 200)
        y = height - 50
        break
      default:
        x = width - 100
        y = height / 2
    }

    // Don't spawn too close to player
    const dx = x - playerPosition.x
    const dy = y - playerPosition.y
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy)

    if (distanceToPlayer < 300) {
      // Too close to player, try again
      setTimeout(spawnEnemy, 500)
      return
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
      width: type === "helicopter" ? 40 : 30,
      height: type === "helicopter" ? 20 : 30,
    }

    setEnemies((prev) => [...prev, newEnemy])
    enemiesRef.current = [...enemiesRef.current, newEnemy]

    if (type === "helicopter") {
      playSound("helicopter")
    }
  }

  const spawnPowerUp = () => {
    const powerUpTypes = ["health", "ammo", "special"]
    const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
    const { width, height } = worldDimensions

    // Spawn near player for better gameplay
    const angle = Math.random() * Math.PI * 2
    const distance = 300 + Math.random() * 300
    const x = Math.max(50, Math.min(width - 50, playerPosition.x + Math.cos(angle) * distance))
    const y = Math.max(50, Math.min(height - 50, playerPosition.y + Math.sin(angle) * distance))

    const newPowerUp = {
      id: Date.now() + Math.random(),
      x,
      y,
      type,
      duration: 10000, // 10 seconds
      width: 10,
      height: 10,
    }

    setPowerUps((prev) => [...prev, newPowerUp])
    powerUpsRef.current = [...powerUpsRef.current, newPowerUp]
    addMessage("Supply drop incoming!")
    playSound("powerup_spawn")
  }

  const moveEnemies = (deltaTime) => {
    const speedMultiplier = deltaTime / 16.67 // Adjust speed based on frame rate

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
              newX += Math.cos(angle) * enemy.speed * speedMultiplier
              newY += Math.sin(angle) * enemy.speed * speedMultiplier

              // Occasionally shoot if close
              if (Math.random() < 0.02 && Date.now() - enemy.lastShot > 1000) {
                shoot("pakistan", "regular", enemy)
                enemy.lastShot = Date.now()
              }
            } else {
              // Move toward player
              newX += (dx / distance) * enemy.speed * speedMultiplier
              newY += (dy / distance) * enemy.speed * speedMultiplier
            }

            // Update direction based on movement
            newDirection = dx > 0 ? "right" : "left"
          } else if (enemy.type === "pakistaniSoldier") {
            // Soldiers try to flank the player
            if (distance < 200) {
              // If close, move perpendicular to player
              const angle = Math.atan2(dy, dx) + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2)
              newX += Math.cos(angle) * enemy.speed * speedMultiplier
              newY += Math.sin(angle) * enemy.speed * speedMultiplier
            } else {
              // Move toward player
              newX += (dx / distance) * enemy.speed * speedMultiplier
              newY += (dy / distance) * enemy.speed * speedMultiplier
            }

            // Update direction
            newDirection = dx > 0 ? "right" : "left"
          } else {
            // Tanks move directly toward player
            if (distance > 50) {
              newX += (dx / distance) * enemy.speed * speedMultiplier
              newY += (dy / distance) * enemy.speed * speedMultiplier
            }

            // Update direction
            newDirection = dx > 0 ? "right" : "left"
          }

          // Check terrain collision
          let canMove = true
          terrainElementsRef.current.forEach((element) => {
            if (element.type === "building") {
              const buildingWidth = element.width || 60
              const buildingHeight = element.height || 60
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
        .filter((enemy) => {
          const { width, height } = worldDimensions
          return enemy.x > -50 && enemy.x < width + 50 && enemy.y > -50 && enemy.y < height + 50 && enemy.health > 0
        }),
    )
  }

  const shoot = (source, weaponType, shooter = null) => {
    const sourceX = shooter ? shooter.x : source === "india" ? playerPosition.x : 0
    const sourceY = shooter ? shooter.y : source === "india" ? playerPosition.y : 0

    if (weaponType === "special") {
      // Special weapon (missile)
      const target =
        source === "india" ? findClosestEnemy(sourceX, sourceY) : { x: playerPosition.x, y: playerPosition.y }

      if (!target) return // No target found

      const newProjectile = {
        id: Date.now() + Math.random(),
        x: sourceX,
        y: sourceY,
        direction: source === "india" ? playerDirection : "left",
        source,
        type: "missile",
        target,
        speed: 4,
        damage: 150,
        width: 16,
        height: 6,
      }

      setProjectiles((prev) => [...prev, newProjectile])
      projectilesRef.current = [...projectilesRef.current, newProjectile]
    } else {
      // Regular weapon (bullet)
      let direction = shooter ? shooter.direction : source === "india" ? playerDirection : "left"

      // If no shooter (player), determine direction based on closest enemy
      if (!shooter && source === "india") {
        const target = findClosestEnemy(sourceX, sourceY)
        if (target) {
          direction = target.x > sourceX ? "right" : "left"
        }
      }

      const newProjectile = {
        id: Date.now() + Math.random(),
        x: sourceX,
        y: sourceY,
        direction,
        source,
        type: "bullet",
        targetX: shooter ? null : source === "india" ? findClosestEnemy(sourceX, sourceY)?.x : playerPosition.x,
        targetY: shooter ? null : source === "india" ? findClosestEnemy(sourceX, sourceY)?.y : playerPosition.y,
        speed: 10,
        damage: 25,
        width: 10,
        height: 4,
      }

      setProjectiles((prev) => [...prev, newProjectile])
      projectilesRef.current = [...projectilesRef.current, newProjectile]
      playSound(source === "india" ? "player_shoot" : "enemy_shoot")
    }
  }

  const findClosestEnemy = (x, y) => {
    let closestEnemy = null
    let minDistance = Number.POSITIVE_INFINITY

    enemiesRef.current.forEach((enemy) => {
      const dx = enemy.x - x
      const dy = enemy.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < minDistance) {
        minDistance = distance
        closestEnemy = { x: enemy.x, y: enemy.y, id: enemy.id }
      }
    })

    return closestEnemy
  }

  const enemiesShoot = () => {
    // Only some enemies shoot
    setEnemies((prev) =>
      prev.map((enemy) => {
        // Check if enemy should shoot based on distance to player and random chance
        const dx = playerPosition.x - enemy.x
        const dy = playerPosition.y - enemy.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 400 && Math.random() < 0.3 && Date.now() - enemy.lastShot > 2000) {
          shoot("pakistan", "regular", enemy)
          return { ...enemy, lastShot: Date.now() }
        }

        return enemy
      }),
    )
  }

  const moveProjectiles = (deltaTime) => {
    const speedMultiplier = deltaTime / 16.67 // Adjust speed based on frame rate

    setProjectiles((prev) =>
      prev
        .map((projectile) => {
          if (projectile.type === "missile") {
            // Guided missile movement
            if (!projectile.target) return null // No target, remove missile

            const dx = projectile.target.x - projectile.x
            const dy = projectile.target.y - projectile.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // If very close to target, explode
            if (distance < 10) {
              createExplosion(projectile.x, projectile.y, "large")
              return null // Remove missile
            }

            // Move toward target
            return {
              ...projectile,
              x: projectile.x + (dx / distance) * projectile.speed * speedMultiplier,
              y: projectile.y + (dy / distance) * projectile.speed * speedMultiplier,
            }
          } else {
            // Regular bullet movement
            if (projectile.targetX && projectile.targetY) {
              // Targeted bullet (player's bullet)
              const dx = projectile.targetX - projectile.x
              const dy = projectile.targetY - projectile.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              // If bullet is very far from target, just move in straight line
              if (distance > 500) {
                return {
                  ...projectile,
                  x:
                    projectile.direction === "right"
                      ? projectile.x + projectile.speed * speedMultiplier
                      : projectile.x - projectile.speed * speedMultiplier,
                }
              }

              // Otherwise, slightly home in on target
              return {
                ...projectile,
                x: projectile.x + (dx / distance) * projectile.speed * speedMultiplier * 0.9,
                y: projectile.y + (dy / distance) * projectile.speed * speedMultiplier * 0.3,
              }
            } else {
              // Regular straight bullet
              return {
                ...projectile,
                x:
                  projectile.direction === "right"
                    ? projectile.x + projectile.speed * speedMultiplier
                    : projectile.x - projectile.speed * speedMultiplier,
              }
            }
          }
        })
        .filter(Boolean) // Remove null entries (exploded missiles)
        .filter((projectile) => {
          const { width, height } = worldDimensions
          return projectile.x > -50 && projectile.x < width + 50 && projectile.y > -50 && projectile.y < height + 50
        }),
    )
  }

  const checkCollisions = () => {
    // Check projectile collisions
    projectilesRef.current.forEach((projectile) => {
      // Check collision with terrain
      terrainElementsRef.current.forEach((element) => {
        if (element.type === "building") {
          const dx = projectile.x - element.x
          const dy = projectile.y - element.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 30) {
            // Hit building
            setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
            projectilesRef.current = projectilesRef.current.filter((p) => p.id !== projectile.id)
            createExplosion(projectile.x, projectile.y, projectile.type === "missile" ? "large" : "small")
          }
        }
      })

      if (projectile.source === "india") {
        // Check if Indian projectile hit Pakistani units
        enemiesRef.current.forEach((enemy) => {
          const dx = projectile.x - enemy.x
          const dy = projectile.y - enemy.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Different hit radius based on projectile type
          const hitRadius = projectile.type === "missile" ? 80 : 20

          if (distance < hitRadius) {
            // Hit!
            const damage = projectile.damage || (projectile.type === "missile" ? 150 : 25)

            // Check if this hit will destroy the enemy
            const willDestroy = enemy.health <= damage

            setEnemies((prev) =>
              prev.map((e) => (e.id === enemy.id ? { ...e, health: Math.max(0, e.health - damage) } : e)),
            )

            // Remove projectile if it's a bullet (missiles explode on impact)
            if (projectile.type !== "missile") {
              setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
              projectilesRef.current = projectilesRef.current.filter((p) => p.id !== projectile.id)
            }

            // Create explosion
            createExplosion(enemy.x, enemy.y, projectile.type === "missile" ? "large" : "small")

            // Add score and handle kill if enemy destroyed
            if (willDestroy) {
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
              setKills((prev) => prev + 1)

              // Update kill streak
              setLastKillTime(Date.now())
              setKillStreak((prev) => prev + 1)

              // Show kill feed
              let killType = ""
              switch (enemy.type) {
                case "pakistaniTank":
                  killType = "Pakistani Tank"
                  break
                case "pakistaniSoldier":
                  killType = "Pakistani Soldier"
                  break
                case "helicopter":
                  killType = "Pakistani Helicopter"
                  break
              }

              const weaponType = projectile.type === "missile" ? "Missile" : "Bullet"
              setKillFeedMessage(`Destroyed ${killType} with ${weaponType}! +${points}`)
              setShowKillFeed(true)

              // Show streak message if applicable
              if (killStreak >= 3) {
                addMessage(`KILL STREAK: ${killStreak}!`)
                if (killStreak === 3) playSound("kill_streak_3")
                if (killStreak === 5) playSound("kill_streak_5")
                if (killStreak === 10) playSound("kill_streak_10")
              }
            }
          }
        })
      } else {
        // Check if Pakistani projectile hit Indian player
        const dxPlayer = projectile.x - playerPosition.x
        const dyPlayer = projectile.y - playerPosition.y
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dyPlayer * dyPlayer)

        if (distancePlayer < 25) {
          // Player hit!
          setPlayerHealth((prev) => Math.max(0, prev - settings.enemyDamage))

          // Remove projectile
          setProjectiles((prev) => prev.filter((p) => p.id !== projectile.id))
          projectilesRef.current = projectilesRef.current.filter((p) => p.id !== projectile.id)

          // Create explosion
          createExplosion(playerPosition.x, playerPosition.y, "small")

          // Camera shake
          setCameraShake(10)

          // Play hit sound
          playSound("player_hit")
        }
      }
    })

    // Check power-up collisions with player
    powerUpsRef.current.forEach((powerUp) => {
      const dx = powerUp.x - playerPosition.x
      const dy = powerUp.y - playerPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 30) {
        // Collect power-up
        setPowerUps((prev) => prev.filter((p) => p.id !== powerUp.id))
        powerUpsRef.current = powerUpsRef.current.filter((p) => p.id !== powerUp.id)

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

    // Check direct collision between player and enemies
    enemiesRef.current.forEach((enemy) => {
      const dx = enemy.x - playerPosition.x
      const dy = enemy.y - playerPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 40) {
        // Direct collision damage
        setPlayerHealth((prev) => Math.max(0, prev - 1)) // Continuous small damage

        // Visual feedback
        if (Math.floor(gameTime) % 30 === 0) {
          // Every half second
          createExplosion(
            playerPosition.x + (Math.random() - 0.5) * 20,
            playerPosition.y + (Math.random() - 0.5) * 20,
            "small",
          )
        }
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

          if (distance < 150) {
            // Calculate damage based on distance (more damage closer to center)
            const damage = Math.floor(150 * (1 - distance / 150))

            // Check if this will destroy the enemy
            const willDestroy = enemy.health <= damage

            // If it will destroy, handle the kill
            if (willDestroy) {
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
              setKills((prev) => prev + 1)

              // Update kill streak
              setLastKillTime(Date.now())
              setKillStreak((prev) => prev + 1)

              // Show kill feed for missile area damage
              let killType = ""
              switch (enemy.type) {
                case "pakistaniTank":
                  killType = "Pakistani Tank"
                  break
                case "pakistaniSoldier":
                  killType = "Pakistani Soldier"
                  break
                case "helicopter":
                  killType = "Pakistani Helicopter"
                  break
              }

              setKillFeedMessage(`Destroyed ${killType} with Missile Blast! +${points}`)
              setShowKillFeed(true)
            }

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
      className="relative w-screen h-[calc(100vh-200px)] border-2 border-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.7)]"
      ref={boardRef}
    >
      {/* Game world container with camera transform */}
      <div
        className="absolute inset-0"
        style={{
          width: `${worldDimensions.width}px`,
          height: `${worldDimensions.height}px`,
          transform: viewportTransform,
          transition: "transform 100ms ease-out",
        }}
        ref={gameAreaRef}
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
            transform: `translate(-50%, -50%) scaleX(${playerDirection === "left" ? -1 : 1})`,
            zIndex: Math.floor(playerPosition.y),
          }}
          ref={playerRef}
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

            {/* Muzzle flash */}
            {muzzleFlash && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="w-6 h-6 bg-yellow-500 rounded-full blur-sm animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

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

        {/* Kill counter */}
        <div className="bg-black bg-opacity-70 p-2 rounded-lg mt-4">
          <div className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h20M12 2v20"></path>
            </svg>
            <span className="text-white text-xs font-bold ml-2">KILLS: {kills}</span>
          </div>
          {killStreak >= 3 && (
            <div className="text-red-500 text-xs font-bold mt-1 animate-pulse">STREAK: {killStreak}</div>
          )}
        </div>
      </div>

      {/* Mini-map */}
      <div className="absolute bottom-4 right-4 z-[3000]">
        <MiniMap
          playerPosition={playerPosition}
          enemies={enemies}
          terrainElements={terrainElements}
          worldWidth={worldDimensions.width}
          worldHeight={worldDimensions.height}
        />
      </div>

      {/* Game messages */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[3000] flex flex-col items-center space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-black bg-opacity-70 px-3 py-1 rounded-lg text-white font-bold animate-fadeInOut"
            style={{
              opacity: 1 - (Date.now() - msg.time) / 3000,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Kill feed */}
      {showKillFeed && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-[3000]">
          <div className="bg-red-900 bg-opacity-80 px-4 py-2 rounded-lg text-white font-bold text-lg shadow-lg border border-red-500 animate-bounce">
            {killFeedMessage}
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 z-[3000] bg-black bg-opacity-70 p-2 rounded-lg text-white text-xs">
        <div>WASD/Arrows: Move</div>
        <div>F/SPACE: Shoot ({playerAmmo})</div>
        <div>M/SHIFT: Missile ({playerSpecialAmmo})</div>
      </div>

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-[1500]"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
