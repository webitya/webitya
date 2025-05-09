export default function GameControls() {
  return (
    <div className="mt-4 p-4 bg-black bg-opacity-70 rounded-lg shadow-md border border-gray-700 text-white">
      <h2 className="text-xl font-bold mb-2 text-orange-500">BATTLEFIELD CONTROLS</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-green-400 mb-2">MOVEMENT</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div></div>
            <div className="bg-gray-800 p-2 rounded text-center">W</div>
            <div></div>
            <div className="bg-gray-800 p-2 rounded text-center">A</div>
            <div className="bg-gray-800 p-2 rounded text-center">S</div>
            <div className="bg-gray-800 p-2 rounded text-center">D</div>
          </div>
          <p className="text-sm text-gray-300">or use Arrow Keys</p>
        </div>

        <div>
          <h3 className="font-semibold text-green-400 mb-2">COMBAT</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="bg-gray-800 p-2 rounded text-center w-24">SPACE</div>
              <span className="ml-2">Fire Weapon</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-800 p-2 rounded text-center w-24">SHIFT</div>
              <span className="ml-2">Launch Missile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <h3 className="font-semibold text-green-400 mb-2">MISSION BRIEFING</h3>
        <p className="text-sm">
          Pakistani forces have launched a surprise attack across the border. Their forces are more numerous and better
          equipped. Your mission is to defend the border and push back the enemy forces. Use terrain for cover and
          manage your ammunition wisely. Special missile weapons can take out multiple enemies at once - save them for
          when you're surrounded.
        </p>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4 text-xs text-gray-400">
        <p>TIP: Collect power-ups to replenish health, ammo, and special weapons.</p>
        <p>TIP: Buildings provide cover from enemy fire.</p>
        <p>TIP: Allied soldiers will help you fight the enemy.</p>
      </div>
    </div>
  )
}
