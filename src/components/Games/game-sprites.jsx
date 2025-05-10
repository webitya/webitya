"use client"

export function IndianTank() {
  return (
    <div className="relative w-60 h-30 transform-gpu" style={{ transform: "scale(1.2)" }}>
      {/* Tank shadow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black opacity-30 rounded-full blur-sm"></div>

      {/* Tank body */}
      <svg width="60" height="30" viewBox="0 0 60 30" className="drop-shadow-lg">
        {/* Tracks */}
        <rect x="0" y="22" width="60" height="5" fill="#333" rx="1" />
        <circle cx="10" cy="25" r="5" fill="#444" />
        <circle cx="20" cy="25" r="5" fill="#444" />
        <circle cx="30" cy="25" r="5" fill="#444" />
        <circle cx="40" cy="25" r="5" fill="#444" />
        <circle cx="50" cy="25" r="5" fill="#444" />

        {/* Tank body with 3D effect */}
        <rect x="5" y="15" width="50" height="7" fill="#FF9933" rx="1" />
        <rect x="10" y="20" width="40" height="5" fill="#FF9933" rx="2" />
        <rect x="7" y="17" width="46" height="3" fill="#e67300" rx="1" />

        {/* Turret with 3D effect */}
        <rect x="20" y="5" width="20" height="10" fill="#FF9933" rx="1" />
        <rect x="22" y="7" width="16" height="6" fill="#e67300" rx="1" />

        {/* Gun barrel */}
        <rect x="25" y="0" width="10" height="5" fill="#138808" rx="1" />

        {/* Indian emblem */}
        <circle cx="30" cy="15" r="3" fill="#000080" />
        <circle cx="30" cy="15" r="1.5" fill="#ffffff" />

        {/* Highlights for 3D effect */}
        <rect x="5" y="15" width="50" height="1" fill="#ffcc80" rx="0.5" />
        <rect x="20" y="5" width="20" height="1" fill="#ffcc80" rx="0.5" />
      </svg>

      {/* Muzzle flash animation (only shows when firing) */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 flash-animation"
        style={{
          animationIterationCount: 0,
        }}
      >
        <div className="w-6 h-6 bg-yellow-500 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}

export function PakistaniTank() {
  return (
    <div className="relative w-60 h-30 transform-gpu" style={{ transform: "scale(1.2)" }}>
      {/* Tank shadow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black opacity-30 rounded-full blur-sm"></div>

      {/* Tank body */}
      <svg width="60" height="30" viewBox="0 0 60 30" className="drop-shadow-lg">
        {/* Tracks */}
        <rect x="0" y="22" width="60" height="5" fill="#333" rx="1" />
        <circle cx="10" cy="25" r="5" fill="#444" />
        <circle cx="20" cy="25" r="5" fill="#444" />
        <circle cx="30" cy="25" r="5" fill="#444" />
        <circle cx="40" cy="25" r="5" fill="#444" />
        <circle cx="50" cy="25" r="5" fill="#444" />

        {/* Tank body with 3D effect */}
        <rect x="5" y="15" width="50" height="7" fill="#01411C" rx="1" />
        <rect x="10" y="20" width="40" height="5" fill="#01411C" rx="2" />
        <rect x="7" y="17" width="46" height="3" fill="#013315" rx="1" />

        {/* Turret with 3D effect */}
        <rect x="20" y="5" width="20" height="10" fill="#01411C" rx="1" />
        <rect x="22" y="7" width="16" height="6" fill="#013315" rx="1" />

        {/* Gun barrel */}
        <rect x="25" y="0" width="10" height="5" fill="#01411C" rx="1" />

        {/* Pakistani emblem */}
        <circle cx="30" cy="15" r="3" fill="#fff" />
        <circle cx="30" cy="15" r="1.5" fill="#01411C" />

        {/* Highlights for 3D effect */}
        <rect x="5" y="15" width="50" height="1" fill="#026b2f" rx="0.5" />
        <rect x="20" y="5" width="20" height="1" fill="#026b2f" rx="0.5" />
      </svg>

      {/* Muzzle flash animation (only shows when firing) */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 flash-animation"
        style={{
          animationIterationCount: 0,
        }}
      >
        <div className="w-6 h-6 bg-yellow-500 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}

export function PakistaniSoldier() {
  return (
    <div className="relative transform-gpu" style={{ transform: "scale(1.2)" }}>
      {/* Soldier shadow */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-black opacity-30 rounded-full blur-sm"></div>

      <svg width="20" height="30" viewBox="0 0 20 30" className="drop-shadow-md">
        {/* Helmet */}
        <path d="M5,5 Q10,-2 15,5 L15,8 Q10,10 5,8 Z" fill="#01411C" />

        {/* Face */}
        <circle cx="10" cy="7" r="4" fill="#F3C19D" />

        {/* Body with 3D effect */}
        <rect x="5" y="10" width="10" height="15" fill="#01411C" rx="2" />
        <rect x="6" y="12" width="8" height="11" fill="#013315" rx="1" />

        {/* Belt */}
        <rect x="3" y="12" width="14" height="2" fill="#fff" />

        {/* Arms */}
        <rect x="2" y="11" width="3" height="8" fill="#F3C19D" rx="1.5" />
        <rect x="15" y="11" width="3" height="8" fill="#F3C19D" rx="1.5" />

        {/* Legs */}
        <rect x="5" y="25" width="3" height="5" fill="#01411C" />
        <rect x="12" y="25" width="3" height="5" fill="#01411C" />

        {/* Boots */}
        <rect x="4" y="28" width="5" height="2" fill="#333" rx="1" />
        <rect x="11" y="28" width="5" height="2" fill="#333" rx="1" />

        {/* Gun */}
        <rect x="18" y="14" width="6" height="2" fill="#333" />
      </svg>

      {/* Rifle muzzle flash */}
      <div
        className="absolute top-[14px] left-[24px] opacity-0 flash-animation"
        style={{
          animationIterationCount: 0,
        }}
      >
        <div className="w-3 h-3 bg-yellow-500 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}

export function Helicopter() {
  return (
    <div className="relative transform-gpu" style={{ transform: "scale(1.5)" }}>
      {/* Helicopter shadow */}
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-30 h-6 bg-black opacity-20 rounded-full blur-md"></div>

      <svg width="40" height="20" viewBox="0 0 40 20" className="drop-shadow-lg">
        {/* Main body */}
        <ellipse cx="20" cy="12" rx="15" ry="6" fill="#01411C" />
        <ellipse cx="20" cy="10" rx="12" ry="5" fill="#013315" />

        {/* Cockpit */}
        <path d="M30,10 Q35,12 30,14 L25,14 Q23,12 25,10 Z" fill="#88CCFF" />

        {/* Tail boom */}
        <rect x="5" y="10" width="10" height="2" fill="#01411C" />
        <rect x="0" y="9" width="5" height="4" fill="#01411C" />

        {/* Main rotor */}
        <rect x="18" y="4" width="4" height="2" fill="#333" />
        <rect x="0" y="4" width="40" height="1" fill="#666" className="animate-rotor" />

        {/* Tail rotor */}
        <rect x="0" y="7" width="1" height="8" fill="#666" className="animate-tail-rotor" />

        {/* Landing skids */}
        <path d="M10,18 L10,16 L30,16 L30,18" stroke="#666" strokeWidth="1" fill="none" />

        {/* Pakistani emblem */}
        <circle cx="20" cy="12" r="2" fill="#fff" />
        <circle cx="20" cy="12" r="1" fill="#01411C" />
      </svg>

      {/* Rotor blur effect */}
      <div className="absolute top-[4px] left-1/2 transform -translate-x-1/2 w-30 h-1 bg-gray-400 rounded-full blur-sm animate-pulse"></div>

      {/* Muzzle flash */}
      <div
        className="absolute top-[12px] left-[35px] opacity-0 flash-animation"
        style={{
          animationIterationCount: 0,
        }}
      >
        <div className="w-4 h-4 bg-yellow-500 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}

export function Bullet({ color = "orange" }) {
  return (
    <div className="relative">
      <svg width="10" height="4" viewBox="0 0 10 4">
        <rect x="0" y="0" width="10" height="4" fill={color} rx="2" />
      </svg>
      {/* Bullet trail */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-1 bg-yellow-500 opacity-50 blur-sm"></div>
    </div>
  )
}

export function Missile({ color = "orange" }) {
  return (
    <div className="relative">
      <svg width="16" height="6" viewBox="0 0 16 6">
        <rect x="2" y="0" width="14" height="6" fill={color} rx="3" />
        <polygon points="0,3 4,0 4,6" fill={color} />
      </svg>
      {/* Missile trail */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-20 h-3 bg-gradient-to-l from-transparent via-yellow-500 to-red-500 opacity-70 blur-sm"></div>
    </div>
  )
}

export function Explosion({ frame = 0, size = "small" }) {
  const baseSize = size === "large" ? 60 : 30
  const actualSize = baseSize + frame * (size === "large" ? 10 : 5)
  const opacity = 1 - frame / (size === "large" ? 15 : 10)

  return (
    <div className="relative" style={{ width: actualSize, height: actualSize }}>
      {/* Main explosion */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
        style={{
          opacity: opacity,
          transform: `scale(${1 - frame * 0.05})`,
          boxShadow: `0 0 ${actualSize / 2}px ${actualSize / 4}px rgba(255, 165, 0, ${opacity * 0.5})`,
        }}
      ></div>

      {/* Inner explosion */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          top: "25%",
          left: "25%",
          width: "50%",
          height: "50%",
          opacity: opacity * 1.5,
          boxShadow: `0 0 ${actualSize / 4}px ${actualSize / 8}px rgba(255, 255, 255, ${opacity})`,
        }}
      ></div>

      {/* Shockwave */}
      <div
        className="absolute inset-0 rounded-full border-2 border-orange-500"
        style={{
          transform: `scale(${1 + frame * 0.1})`,
          opacity: opacity * 0.3,
        }}
      ></div>
    </div>
  )
}

export function Building({ variant = 0 }) {
  // Different building styles
  const buildings = [
    // Variant 0: Simple house
    <svg key="building-0" width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-md">
      <rect x="10" y="20" width="40" height="40" fill="#8B4513" />
      <polygon points="5,20 30,0 55,20" fill="#A52A2A" />
      <rect x="20" y="40" width="10" height="20" fill="#4B2D0C" /> {/* Door */}
      <rect x="40" y="30" width="8" height="8" fill="#87CEEB" /> {/* Window */}
      <rect x="15" y="30" width="8" height="8" fill="#87CEEB" /> {/* Window */}
    </svg>,

    // Variant 1: Tall building
    <svg key="building-1" width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-md">
      <rect x="10" y="10" width="40" height="70" fill="#808080" />
      <rect x="15" y="15" width="30" height="65" fill="#A9A9A9" />
      {/* Windows */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`window-${row}-${col}`} x={15 + col * 10} y={20 + row * 12} width="8" height="8" fill="#4682B4" />
        )),
      )}
      <rect x="25" y="65" width="10" height="15" fill="#696969" /> {/* Door */}
    </svg>,

    // Variant 2: Bunker
    <svg key="building-2" width="70" height="40" viewBox="0 0 70 40" className="drop-shadow-md">
      <rect x="5" y="15" width="60" height="25" fill="#556B2F" rx="5" />
      <rect x="10" y="20" width="50" height="20" fill="#3D4C22" rx="3" />
      <rect x="30" y="25" width="10" height="15" fill="#2F3A1A" /> {/* Door */}
      <rect x="15" y="25" width="8" height="5" fill="#2F3A1A" /> {/* Window */}
      <rect x="47" y="25" width="8" height="5" fill="#2F3A1A" /> {/* Window */}
      <rect x="20" y="10" width="30" height="5" fill="#556B2F" /> {/* Top */}
      <circle cx="35" cy="12" r="3" fill="#2F3A1A" /> {/* Antenna base */}
      <rect x="34" y="2" width="2" height="10" fill="#2F3A1A" /> {/* Antenna */}
    </svg>,
  ]

  return (
    <div className="relative">
      {buildings[variant]}
      {/* Building shadow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-5 bg-black opacity-20 rounded-full blur-sm"></div>
    </div>
  )
}

export function Tree({ variant = 0 }) {
  // Different tree styles
  const trees = [
    // Variant 0: Pine tree
    <svg key="tree-0" width="30" height="50" viewBox="0 0 30 50" className="drop-shadow-sm">
      <polygon points="15,0 5,15 10,15 0,30 15,30 5,45 25,45 15,30 30,30 20,15 25,15" fill="#006400" />
      <rect x="13" y="45" width="4" height="5" fill="#8B4513" />
    </svg>,

    // Variant 1: Deciduous tree
    <svg key="tree-1" width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-sm">
      <circle cx="20" cy="20" r="15" fill="#228B22" />
      <rect x="18" y="30" width="4" height="20" fill="#8B4513" />
    </svg>,
  ]

  return (
    <div className="relative">
      {trees[variant]}
      {/* Tree shadow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-black opacity-20 rounded-full blur-sm"></div>
    </div>
  )
}

export function Terrain() {
  return (
    <div className="absolute inset-0">
      {/* Base terrain */}
      <div className="absolute inset-0 bg-amber-800"></div>

      {/* Terrain details */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
    </div>
  )
}
