import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import QuizSetup from './components/QuizSetup'
import Quiz from './components/Quiz'
import LandingPage from './components/LandingPage'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const [quizConfig, setQuizConfig] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if there's a category in the URL
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    
    if (category && !quizConfig) {
      // If there's a category in the URL and no quiz config, show the quiz setup
      setQuizConfig({ category })
    }
  }, [location.search, quizConfig])

  const handleQuizStart = (config) => {
    setQuizConfig(config)
    setShowResults(false)
  }

  const handleQuizEnd = () => {
    setShowResults(true)
  }

  const handleRestart = () => {
    setQuizConfig(null)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0efff] via-[#e8e7ff] to-[#e0dfff]">
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/quiz"
          element={
            quizConfig ? (
              <Quiz
                enableTimer={quizConfig.enableTimer}
                timePerQuestion={quizConfig.timePerQuestion}
                category={quizConfig.category}
                difficulty={quizConfig.difficulty}
                onQuizEnd={handleQuizEnd}
                onRestart={handleRestart}
              />
            ) : (
              <QuizSetup onStart={handleQuizStart} />
            )
          }
        />
      </Routes>
    </div>
  )
}

// Wrap App with Router and useLocation
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
)

export default AppWithRouter 