"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle,
  HelpCircle,
  FileText,
  Clock,
  Youtube,
  Code,
  BookOpen,
  Star,
  Lightbulb,
} from "lucide-react"

// Static course data
const coursesData = {
  html: {
    id: "html",
    title: "HTML Fundamentals",
    color: "from-orange-500 to-red-500",
    lectures: [
      {
        id: "html-1",
        title: "Introduction to HTML",
        subtitle: "Learn the basics of HTML structure and syntax",
        duration: "15 min",
        youtubeUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        hasQuiz: true,
        hasProject: false,
        objectives: [
          "Understand what HTML is and its role in web development",
          "Learn about HTML document structure",
          "Master basic HTML tags and elements",
          "Create your first HTML document",
        ],
        topics: [
          {
            title: "What is HTML?",
            description: "Understanding HTML as the foundation of web pages",
            timeRange: "0:00 - 3:00",
            keyPoints: [
              "HTML stands for HyperText Markup Language",
              "It's the standard markup language for web pages",
              "HTML describes the structure of web content",
            ],
          },
          {
            title: "HTML Document Structure",
            description: "Learning the basic structure of an HTML document",
            timeRange: "3:00 - 8:00",
            keyPoints: ["DOCTYPE declaration", "HTML root element", "Head and body sections", "Meta tags and title"],
          },
          {
            title: "Basic HTML Tags",
            description: "Introduction to common HTML elements",
            timeRange: "8:00 - 15:00",
            keyPoints: [
              "Headings (h1-h6)",
              "Paragraphs and text formatting",
              "Links and images",
              "Lists and containers",
            ],
          },
        ],
        quiz: {
          description: "Test your understanding of HTML basics",
          questions: [
            "What does HTML stand for?",
            "What is the purpose of the DOCTYPE declaration?",
            "Name three basic HTML tags and their purposes.",
          ],
        },
        challenge: {
          description: "Create a simple HTML page with a heading, paragraph, and list",
          requirements: [
            "Include a proper DOCTYPE declaration",
            "Add a title to your page",
            "Create at least one heading",
            "Add a paragraph of text",
            "Include an unordered list with 3 items",
          ],
        },
      },
      {
        id: "html-2",
        title: "HTML Elements and Attributes",
        subtitle: "Deep dive into HTML elements and their attributes",
        duration: "20 min",
        youtubeUrl: "https://www.youtube.com/watch?v=salY_Sm6mv4",
        hasQuiz: true,
        hasProject: true,
        objectives: [
          "Master HTML attributes and their usage",
          "Learn about semantic HTML elements",
          "Understand accessibility best practices",
          "Create structured HTML documents",
        ],
        topics: [
          {
            title: "HTML Attributes",
            description: "Understanding how to use attributes to enhance HTML elements",
            timeRange: "0:00 - 7:00",
            keyPoints: [
              "What are attributes and how to use them",
              "Common attributes like id, class, and style",
              "Boolean attributes",
              "Custom data attributes",
            ],
          },
          {
            title: "Semantic HTML",
            description: "Using meaningful HTML elements for better structure",
            timeRange: "7:00 - 15:00",
            keyPoints: [
              "Header, nav, main, and footer elements",
              "Article and section elements",
              "Aside and figure elements",
              "Benefits of semantic markup",
            ],
          },
          {
            title: "Accessibility Basics",
            description: "Making your HTML accessible to all users",
            timeRange: "15:00 - 20:00",
            keyPoints: [
              "Alt text for images",
              "Proper heading hierarchy",
              "ARIA labels and roles",
              "Keyboard navigation considerations",
            ],
          },
        ],
        quiz: {
          description: "Test your knowledge of HTML elements and attributes",
          questions: [
            "What is the difference between an id and a class attribute?",
            "Name three semantic HTML5 elements and their purposes.",
            "Why is alt text important for images?",
          ],
        },
        challenge: {
          description: "Build a semantic HTML page structure for a blog post",
          requirements: [
            "Use semantic HTML5 elements",
            "Include proper heading hierarchy",
            "Add alt text to images",
            "Use appropriate attributes",
            "Ensure keyboard accessibility",
          ],
        },
      },
    ],
  },
  javascript: {
    id: "javascript",
    title: "JavaScript Essentials",
    color: "from-yellow-500 to-orange-500",
    lectures: [
      {
        id: "js-1",
        title: "JavaScript Basics",
        subtitle: "Introduction to JavaScript programming",
        duration: "25 min",
        youtubeUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        hasQuiz: true,
        hasProject: true,
        objectives: [
          "Understand JavaScript syntax and basic concepts",
          "Learn about variables and data types",
          "Master basic operators and expressions",
          "Write your first JavaScript programs",
        ],
        topics: [
          {
            title: "Variables and Data Types",
            description: "Understanding how to store and work with data",
            timeRange: "0:00 - 10:00",
            keyPoints: [
              "var, let, and const keywords",
              "Primitive data types",
              "Objects and arrays",
              "Type conversion",
            ],
          },
          {
            title: "Operators and Expressions",
            description: "Working with different types of operators",
            timeRange: "10:00 - 18:00",
            keyPoints: ["Arithmetic operators", "Comparison operators", "Logical operators", "Assignment operators"],
          },
          {
            title: "Control Flow",
            description: "Making decisions and repeating actions",
            timeRange: "18:00 - 25:00",
            keyPoints: ["If/else statements", "Switch statements", "For and while loops", "Break and continue"],
          },
        ],
        quiz: {
          description: "Test your JavaScript fundamentals",
          questions: [
            "What's the difference between let and const?",
            "Name the primitive data types in JavaScript.",
            "How do you create a for loop?",
          ],
        },
        challenge: {
          description: "Create a simple calculator using JavaScript",
          requirements: [
            "Use variables to store numbers",
            "Implement basic arithmetic operations",
            "Use conditional statements",
            "Display results to the console",
            "Handle edge cases",
          ],
        },
      },
    ],
  },
}

// Code Playground Component
function CodePlayground({ title, initialCode }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")

  const runCode = () => {
    try {
      // Simple code execution simulation
      const result = eval(code)
      setOutput(result ? String(result) : "Code executed successfully!")
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-white text-sm font-medium">{title}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="bg-gray-900">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none"
            placeholder="Write your code here..."
          />
        </div>
        <div className="bg-gray-800 border-l border-gray-700">
          <div className="p-4">
            <button
              onClick={runCode}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors mb-4"
            >
              Run Code
            </button>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm min-h-[200px]">
              {output || "Output will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LecturePage({ params }) {
  const [course, setCourse] = useState(null)
  const [lecture, setLecture] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [lectureIndex, setLectureIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [completedTopics, setCompletedTopics] = useState(new Set())
  const [completedLectures, setCompletedLectures] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadLecture() {
      try {
        // Handle both sync and async params
        const resolvedParams = await Promise.resolve(params)

        // Default to first course and lecture if params are missing
        const courseParam = resolvedParams?.course || "html"
        const lectureParam = resolvedParams?.lecture || "lecture-1"

        console.log("Loading with params:", { courseParam, lectureParam })

        const foundCourse = coursesData[courseParam]
        if (!foundCourse) {
          setError(`Course "${courseParam}" not found`)
          return
        }

        // Extract lecture number from parameter
        const lectureNum = Number.parseInt(lectureParam.replace("lecture-", "")) || 1
        const lectureIdx = lectureNum - 1

        if (!foundCourse.lectures || !foundCourse.lectures[lectureIdx]) {
          setError(`Lecture ${lectureNum} not found in course "${courseParam}"`)
          return
        }

        setCourse(foundCourse)
        setLecture(foundCourse.lectures[lectureIdx])
        setCourseId(courseParam)
        setLectureIndex(lectureIdx)

        // Load completed lectures from localStorage
        try {
          const saved = localStorage.getItem(`completed-lectures-${courseParam}`)
          if (saved) {
            setCompletedLectures(JSON.parse(saved))
          }
        } catch (storageError) {
          console.warn("Could not load from localStorage:", storageError)
        }
      } catch (error) {
        console.error("Error loading lecture:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadLecture()
  }, [params])

  const toggleTopicComplete = (topicIndex) => {
    const newCompleted = new Set(completedTopics)
    if (newCompleted.has(topicIndex)) {
      newCompleted.delete(topicIndex)
    } else {
      newCompleted.add(topicIndex)
    }
    setCompletedTopics(newCompleted)
  }

  const markLectureComplete = () => {
    if (lecture && !completedLectures.includes(lecture.id)) {
      const newCompleted = [...completedLectures, lecture.id]
      setCompletedLectures(newCompleted)
      try {
        localStorage.setItem(`completed-lectures-${courseId}`, JSON.stringify(newCompleted))
      } catch (storageError) {
        console.warn("Could not save to localStorage:", storageError)
      }
    }
  }

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return ""
    try {
      const videoId = url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    } catch {
      return ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lecture...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lecture Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/online-learning"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  if (!course || !lecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-gray-500 text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Content Not Available</h1>
          <p className="text-gray-600 mb-6">The requested lecture content is not available.</p>
          <Link
            href="/online-learning"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const nextLecture = course.lectures[lectureIndex + 1]
  const prevLecture = course.lectures[lectureIndex - 1]
  const progress = lecture.topics ? Math.round((completedTopics.size / lecture.topics.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.section
        className={`bg-gradient-to-r ${course.color || "from-blue-500 to-purple-500"} text-white py-12 relative overflow-hidden`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/online-learning/${courseId}`}
              className="inline-flex items-center gap-2 hover:underline group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Course</span>
            </Link>
            <div className="text-sm opacity-90">
              Lecture {lectureIndex + 1} of {course.lectures.length}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold mb-4">{lecture.title}</h1>
                <p className="text-xl opacity-90 mb-6">{lecture.subtitle}</p>

                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{lecture.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                    <Youtube className="w-4 h-4 text-red-300" />
                    <span>Video Lecture</span>
                  </div>
                  {lecture.hasQuiz && (
                    <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                      <HelpCircle className="w-4 h-4" />
                      <span>Quiz</span>
                    </div>
                  )}
                  {lecture.hasProject && (
                    <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                      <FileText className="w-4 h-4" />
                      <span>Project</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Topics Completed</span>
                  <span>
                    {completedTopics.size}/{lecture.topics ? lecture.topics.length : 0}
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm opacity-90">{progress}% Complete</p>

              {progress === 100 && (
                <motion.button
                  onClick={markLectureComplete}
                  className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mark as Complete ✓
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Video Section */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="aspect-video bg-gray-900 relative">
                  {lecture.youtubeUrl ? (
                    <iframe
                      src={getYouTubeEmbedUrl(lecture.youtubeUrl)}
                      className="w-full h-full"
                      allowFullScreen
                      title={lecture.title}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <Play className="w-16 h-16 mb-4 opacity-50 mx-auto" />
                        <p className="text-lg">Video will be available soon</p>
                        <p className="text-sm opacity-75 mt-2">This lecture covers: {lecture.subtitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6 overflow-x-auto">
                    {[
                      { id: "overview", label: "Overview", icon: BookOpen },
                      { id: "topics", label: "Topics", icon: Lightbulb },
                      { id: "quiz", label: "Quiz", icon: HelpCircle },
                      { id: "challenge", label: "Challenge", icon: FileText },
                      { id: "playground", label: "Code", icon: Code },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${
                          activeTab === id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Learning Objectives</h3>
                        <div className="space-y-3">
                          {lecture.objectives &&
                            lecture.objectives.map((objective, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{objective}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Topics Tab */}
                  {activeTab === "topics" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <h3 className="text-2xl font-bold mb-6">Lecture Topics</h3>
                      {lecture.topics &&
                        lecture.topics.map((topic, index) => (
                          <motion.div
                            key={index}
                            className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                              completedTopics.has(index)
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                    {topic.timeRange}
                                  </span>
                                  <h4 className="text-lg font-semibold text-gray-800">{topic.title}</h4>
                                </div>
                                <p className="text-gray-600 mb-4">{topic.description}</p>
                              </div>
                              <button
                                onClick={() => toggleTopicComplete(index)}
                                className={`ml-4 p-2 rounded-full transition-colors ${
                                  completedTopics.has(index)
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                }`}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium text-gray-700">Key Points:</h5>
                              <ul className="space-y-1">
                                {topic.keyPoints &&
                                  topic.keyPoints.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                      {point}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  )}

                  {/* Quiz Tab */}
                  {activeTab === "quiz" && lecture.quiz && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-4">Knowledge Check</h3>
                      <p className="text-gray-600 mb-6">{lecture.quiz.description}</p>
                      <div className="space-y-4">
                        {lecture.quiz.questions &&
                          lecture.quiz.questions.map((question, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                              <h4 className="font-semibold mb-3">
                                Question {index + 1}: {question}
                              </h4>
                              <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows={3}
                                placeholder="Type your answer here..."
                              />
                            </div>
                          ))}
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Submit Quiz
                      </button>
                    </motion.div>
                  )}

                  {/* Challenge Tab */}
                  {activeTab === "challenge" && lecture.challenge && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-4">Hands-on Challenge</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="font-semibold text-yellow-800 mb-3">Challenge Description</h4>
                        <p className="text-yellow-700 mb-4">{lecture.challenge.description}</p>
                        <h5 className="font-semibold text-yellow-800 mb-3">Requirements:</h5>
                        <ul className="space-y-2">
                          {lecture.challenge.requirements &&
                            lecture.challenge.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2 text-yellow-700">
                                <CheckCircle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Submit Your Solution</h4>
                        <textarea
                          className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                          rows={6}
                          placeholder="Paste your code or describe your solution here..."
                        />
                        <div className="flex gap-3 mt-4">
                          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                            Submit Solution
                          </button>
                          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Get Hint
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Code Playground Tab */}
                  {activeTab === "playground" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h3 className="text-2xl font-bold mb-6">Interactive Code Playground</h3>
                      <CodePlayground
                        title={`${lecture.title} - Practice`}
                        initialCode={`// Practice what you learned in ${lecture.title}
// Try writing some code based on the lecture content

console.log("Welcome to ${lecture.title}!");

// Example: Create HTML elements
const heading = document.createElement('h1');
heading.textContent = 'Hello World!';
console.log(heading.outerHTML);

// Your code here...`}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Navigation */}
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {prevLecture ? (
                  <Link href={`/online-learning/${courseId}/lecture-${lectureIndex}`}>
                    <motion.div
                      className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02, x: -5 }}
                    >
                      <ArrowLeft className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">Previous</div>
                        <div className="font-medium">{prevLecture.title}</div>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextLecture ? (
                  <Link href={`/online-learning/${courseId}/lecture-${lectureIndex + 2}`}>
                    <motion.div
                      className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Next</div>
                        <div className="font-medium">{nextLecture.title}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  </Link>
                ) : (
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl font-semibold">
                      🎉 Course Complete!
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="sticky top-6"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">Course Navigation</h3>

                  <div className="space-y-3">
                    {course.lectures.map((courseLecture, index) => (
                      <Link key={index} href={`/online-learning/${courseId}/lecture-${index + 1}`}>
                        <motion.div
                          className={`p-3 rounded-lg transition-all ${
                            index === lectureIndex
                              ? "bg-blue-100 border-2 border-blue-300"
                              : "hover:bg-gray-50 border-2 border-transparent"
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === lectureIndex ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{courseLecture.title}</div>
                              <div className="text-xs text-gray-500">{courseLecture.duration}</div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
