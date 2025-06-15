import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuizSetup from './components/QuizSetup'
import Quiz from './components/Quiz'
import LandingPage from './components/LandingPage'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const [quizConfig, setQuizConfig] = useState(null)
  const [showResults, setShowResults] = useState(false)

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
    <Router>
      <Analytics />
      <div className="min-h-screen bg-gradient-to-b from-[#f0efff] via-[#e8e7ff] to-[#e0dfff]">
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
    </Router>
  )
}

export default App 