export default function MiniMap({ playerPosition, enemies, allies, terrainElements }) {
  // Scale factor for mini-map
  const scale = 0.1

  return (
    <div className="w-32 h-32 bg-black bg-opacity-70 rounded-lg p-1 border border-gray-700">
      <div className="relative w-full h-full bg-amber-900 bg-opacity-50 rounded overflow-hidden">
        {/* Terrain elements */}
        {terrainElements.map((element) => (
          <div
            key={element.id}
            className={`absolute rounded-sm ${element.type === "building" ? "bg-gray-700" : "bg-green-800"}`}
            style={{
              left: `${element.x * scale}px`,
              top: `${element.y * scale}px`,
              width: element.type === "building" ? "6px" : "3px",
              height: element.type === "building" ? "6px" : "3px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Allies */}
        {allies.map((ally) => (
          <div
            key={ally.id}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
            style={{
              left: `${ally.x * scale}px`,
              top: `${ally.y * scale}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Enemies */}
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className="absolute w-2 h-2 bg-green-600 rounded-full"
            style={{
              left: `${enemy.x * scale}px`,
              top: `${enemy.y * scale}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Player */}
        <div
          className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
          style={{
            left: `${playerPosition.x * scale}px`,
            top: `${playerPosition.y * scale}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Border outline */}
        <div className="absolute inset-0 border border-gray-500 rounded pointer-events-none"></div>

        {/* Mini-map label */}
        <div className="absolute top-1 left-1 text-white text-xs font-bold opacity-70">RADAR</div>
      </div>
    </div>
  )
}
