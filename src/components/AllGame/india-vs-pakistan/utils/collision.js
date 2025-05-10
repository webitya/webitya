// Enhanced collision detection between missile and enemy
export function checkCollision(missile, enemy) {
  // Convert percentage positions to a common scale
  const missileX = missile.x
  const missileY = missile.y
  const enemyX = enemy.x
  const enemyY = enemy.y

  // Define hitbox sizes (in percentage of screen)
  // Scale hitbox based on enemy scale if available
  const enemyScale = enemy.scale || 1
  const missileWidth = 2
  const missileHeight = 8
  const enemyWidth = 10 * enemyScale
  const enemyHeight = 5 * enemyScale

  // Check for overlap with improved accuracy
  // Use a slightly smaller hitbox for more precise collisions
  const hitboxReduction = 0.8
  return (
    Math.abs(missileX - enemyX) < (missileWidth + enemyWidth * hitboxReduction) / 2 &&
    Math.abs(missileY - enemyY) < (missileHeight + enemyHeight * hitboxReduction) / 2
  )
}
