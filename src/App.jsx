import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import LandingPage from './components/LandingPage';

function App() {
  const [quizConfig, setQuizConfig] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleQuizStart = (config) => {
    setQuizConfig(config);
    setShowResults(false);
  };

  const handleQuizEnd = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setQuizConfig(null);
    setShowResults(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/quiz-setup"
            element={
              !quizConfig ? (
                <QuizSetup onStart={handleQuizStart} />
              ) : (
                <Navigate to="/quiz" replace />
              )
            }
          />
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
                <Navigate to="/quiz-setup" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 