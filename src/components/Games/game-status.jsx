export default function GameStatus({ score, difficulty }) {
  // Difficulty color
  const difficultyColor =
    difficulty === "easy" ? "text-green-500" : difficulty === "medium" ? "text-yellow-500" : "text-red-500"

  return (
    <div className="w-full flex justify-between items-center p-4 bg-black bg-opacity-70 rounded-lg shadow-md mb-4 border border-gray-700 text-white">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-500 mr-2 shadow-[0_0_10px_rgba(255,153,51,0.7)]"></div>
        <div className="flex flex-col">
          <span className="font-bold">INDIA</span>
          <span className="text-xs text-gray-300">DEFENDER</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-orange-500">{score}</div>
        <div className="text-xs text-gray-300">SCORE</div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`text-lg font-bold ${difficultyColor}`}>{difficulty.toUpperCase()}</div>
        <div className="text-xs text-gray-300">DIFFICULTY</div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-end mr-2">
          <span className="font-bold">PAKISTAN</span>
          <span className="text-xs text-gray-300">AGGRESSOR</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-700 to-white shadow-[0_0_10px_rgba(1,65,28,0.7)]"></div>
      </div>
    </div>
  )
}
