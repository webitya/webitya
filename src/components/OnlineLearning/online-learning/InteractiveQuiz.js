"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Quiz, Cancel, Refresh, EmojiEvents } from "@mui/icons-material"

export default function InteractiveQuiz({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }))
  }

  const handleSubmit = () => {
    // Calculate score (this would normally check against correct answers)
    const calculatedScore = Object.keys(answers).length
    setScore(calculatedScore)
    setShowResults(true)
    onComplete?.(calculatedScore)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const isPassed = percentage >= 70

    return (
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {isPassed ? (
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <EmojiEvents className="text-green-500 text-4xl" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cancel className="text-orange-500 text-4xl" />
              </div>
            )}
          </motion.div>

          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            {isPassed ? "Congratulations! 🎉" : "Keep Learning! 📚"}
          </h3>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {quiz.questions.length} questions ({percentage}%)
          </p>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={resetQuiz}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Refresh />
              Retake Quiz
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Quiz className="text-purple-600 text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-purple-800">Interactive Quiz</h3>
          <p className="text-gray-600">{quiz.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
              {index + 1}. {question}
            </h4>
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
              rows="4"
              placeholder="Type your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleAnswer(index, e.target.value)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {Object.keys(answers).length} of {quiz.questions.length} questions answered
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quiz.questions.length}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          whileHover={Object.keys(answers).length >= quiz.questions.length ? { scale: 1.05 } : {}}
          whileTap={Object.keys(answers).length >= quiz.questions.length ? { scale: 0.95 } : {}}
        >
          Submit Quiz
        </motion.button>
      </div>
    </motion.div>
  )
}
