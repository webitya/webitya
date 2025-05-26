"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { PlayArrow, Code, Refresh, ContentCopy, Download, Fullscreen } from "@mui/icons-material"

export default function CodePlayground({ initialCode = "", title = "Code Playground" }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    try {
      // Create a safe execution environment
      const logs = []
      const mockConsole = {
        log: (...args) => logs.push(args.join(" ")),
        error: (...args) => logs.push(`❌ Error: ${args.join(" ")}`),
        warn: (...args) => logs.push(`⚠️ Warning: ${args.join(" ")}`),
      }

      // Execute the code with mock console
      const func = new Function("console", code)
      func(mockConsole)

      setOutput(logs.join("\n") || "✅ Code executed successfully!")
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`)
    }
    setIsRunning(false)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "code.js"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div
      className={`bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${isFullscreen ? "fixed inset-4 z-50" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code className="text-white" />
          </div>
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={copyCode}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Copy Code"
          >
            <ContentCopy className="text-sm" />
          </motion.button>
          <motion.button
            onClick={downloadCode}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Download Code"
          >
            <Download className="text-sm" />
          </motion.button>
          <motion.button
            onClick={resetCode}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Reset Code"
          >
            <Refresh className="text-sm" />
          </motion.button>
          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Toggle Fullscreen"
          >
            <Fullscreen className="text-sm" />
          </motion.button>
          <motion.button
            onClick={runCode}
            disabled={isRunning}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-600 transition-colors flex items-center gap-2 font-semibold"
            whileHover={!isRunning ? { scale: 1.05 } : {}}
            whileTap={!isRunning ? { scale: 0.95 } : {}}
          >
            <PlayArrow className="text-sm" />
            {isRunning ? "Running..." : "Run Code"}
          </motion.button>
        </div>
      </div>

      <div className={`grid lg:grid-cols-2 gap-0 ${isFullscreen ? "h-full" : ""}`}>
        <div className="bg-gray-900 relative">
          <div className="bg-gray-800 px-4 py-2 text-gray-400 text-sm border-b border-gray-700 flex items-center justify-between">
            <span>JavaScript Code</span>
            <span className="text-xs">Press Ctrl+Enter to run</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                runCode()
              }
            }}
            className={`w-full bg-gray-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none ${
              isFullscreen ? "h-full" : "h-80"
            }`}
            placeholder="// Write your JavaScript code here..."
            spellCheck={false}
          />
        </div>

        <div className="bg-gray-800 border-l border-gray-700">
          <div className="bg-gray-700 px-4 py-2 text-gray-300 text-sm flex items-center justify-between">
            <span>Output</span>
            <span className="text-xs">Console output will appear here</span>
          </div>
          <div className={`p-4 overflow-auto ${isFullscreen ? "h-full" : "h-80"}`}>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
              {output || "👋 Click 'Run Code' to see output..."}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
