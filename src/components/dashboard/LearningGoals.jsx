"use client"
import { useState } from "react"
import { FiTarget, FiPlus, FiCheck, FiX } from "react-icons/fi"

export default function LearningGoals({ goals, onUpdateGoals }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: Date.now(),
        title: newGoal.trim(),
        completed: false,
        createdAt: new Date(),
      }
      onUpdateGoals([...goals, goal])
      setNewGoal("")
      setShowAddForm(false)
    }
  }

  const handleToggleGoal = (goalId) => {
    const updatedGoals = goals.map((goal) => (goal.id === goalId ? { ...goal, completed: !goal.completed } : goal))
    onUpdateGoals(updatedGoals)
  }

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId)
    onUpdateGoals(updatedGoals)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Learning Goals</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          Add Goal
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter your learning goal..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
          />
          <div className="flex justify-end space-x-2 mt-3">
            <button onClick={() => setShowAddForm(false)} className="px-3 py-1 text-gray-600 hover:text-gray-700">
              Cancel
            </button>
            <button onClick={handleAddGoal} className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add
            </button>
          </div>
        </div>
      )}

      {goals && goals.length > 0 ? (
        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                goal.completed ? "bg-green-50 border-green-200" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleGoal(goal.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    goal.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {goal.completed && <FiCheck className="w-3 h-3" />}
                </button>
                <span className={`${goal.completed ? "text-green-700 line-through" : "text-gray-900"}`}>
                  {goal.title}
                </span>
              </div>
              <button onClick={() => handleDeleteGoal(goal.id)} className="text-gray-400 hover:text-red-500">
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiTarget className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No learning goals set yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add goals to track your progress!</p>
        </div>
      )}
    </div>
  )
}
