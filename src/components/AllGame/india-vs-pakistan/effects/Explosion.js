"use client"

export default function Explosion({ x, y, frame, scale = 1 }) {
  // Calculate size based on frame (grows then shrinks)
  const size = frame < 8 ? frame * 5 + 20 : (15 - frame) * 5 + 20

  // Calculate opacity (fades out towards the end)
  const opacity = frame < 10 ? 1 : (15 - frame) / 5

  // Calculate rotation for dynamic effect
  const rotation = frame * 10

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-40"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size * scale}px`,
        height: `${size * scale}px`,
        opacity,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Custom SVG for explosion with enhanced 3D effect */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer glow */}
        <circle cx="50" cy="50" r="48" fill="rgba(255, 165, 0, 0.3)" />

        {/* Outer explosion */}
        <circle cx="50" cy="50" r="45" fill="url(#outerExplosionGradient)" />

        {/* Middle explosion */}
        <circle cx="50" cy="50" r="35" fill="url(#middleExplosionGradient)" />

        {/* Inner explosion */}
        <circle cx="50" cy="50" r="25" fill="url(#innerExplosionGradient)" />

        {/* Explosion rays with dynamic length based on frame */}
        <g stroke="#e53e3e" strokeWidth="4">
          <line x1="20" y1="20" x2={10 - frame} y2={10 - frame} />
          <line x1="80" y1="20" x2={90 + frame} y2={10 - frame} />
          <line x1="20" y1="80" x2={10 - frame} y2={90 + frame} />
          <line x1="80" y1="80" x2={90 + frame} y2={90 + frame} />
          <line x1="50" y1="10" x2="50" y2={0 - frame} />
          <line x1="50" y1="90" x2="50" y2={100 + frame} />
          <line x1="10" y1="50" x2={0 - frame} y2="50" />
          <line x1="90" y1="50" x2={100 + frame} y2="50" />
        </g>

        {/* Debris particles with dynamic positions */}
        <circle cx={30 + frame * 2} cy={30 - frame} r="3" fill="#718096" />
        <circle cx={70 - frame} cy={40 + frame * 1.5} r="2" fill="#718096" />
        <circle cx={60 + frame * 1.2} cy={70 + frame} r="4" fill="#718096" />
        <circle cx={25 - frame * 1.5} cy={65 - frame * 0.8} r="3" fill="#718096" />

        {/* Define gradients */}
        <defs>
          <radialGradient id="outerExplosionGradient">
            <stop offset="0%" stopColor="#ed8936" />
            <stop offset="100%" stopColor="#ed8936" stopOpacity="0.7" />
          </radialGradient>

          <radialGradient id="middleExplosionGradient">
            <stop offset="0%" stopColor="#f6ad55" />
            <stop offset="100%" stopColor="#ed8936" />
          </radialGradient>

          <radialGradient id="innerExplosionGradient">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#f6ad55" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
