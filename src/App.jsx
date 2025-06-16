import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import QuizSetup from './components/QuizSetup'
import Quiz from './components/Quiz'
import LandingPage from './components/LandingPage'
import { Analytics } from '@vercel/analytics/react'

// Separate component to handle routing logic
const QuizRoutes = () => {
  const [quizConfig, setQuizConfig] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
    navigate('/')
  }

  return (
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
            <QuizSetup 
              onStart={handleQuizStart}
              initialCategory={new URLSearchParams(location.search).get('category')}
            />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#f0efff] via-[#e8e7ff] to-[#e0dfff]">
        <Analytics />
        <QuizRoutes />
      </div>
    </Router>
  )
}

export default App 