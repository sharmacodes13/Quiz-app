import React, { useState, useEffect } from 'react';
import Question from './Question';
import QuizResult from './QuizResult';
import { generateQuestions } from '../services/geminiService';

const Quiz = ({ 
  enableTimer = false, 
  timePerQuestion = 30,
  category,
  difficulty,
  onQuizEnd,
  onRestart
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(enableTimer ? timePerQuestion : 0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logging for state changes
  useEffect(() => {
    console.log('State changed:', {
      currentQuestionIndex,
      totalQuestions: questions.length,
      quizCompleted,
      showResult,
      score,
      userAnswers
    });
  }, [currentQuestionIndex, quizCompleted, showResult, score, userAnswers, questions.length]);

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const generatedQuestions = await generateQuestions(category, difficulty);
        setQuestions(generatedQuestions);
      } catch (err) {
        console.error('Error in Quiz component:', err);
        setError(err.message || 'Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  // Reset timer when moving to a new question
  useEffect(() => {
    if (!enableTimer || quizCompleted || loading) return;
    
    setTimer(timePerQuestion);
    
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          handleNextQuestion();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex, enableTimer, quizCompleted, timePerQuestion, loading]);

  const handleAnswerSelected = (selectedAnswer) => {
    console.log('Answer selected:', selectedAnswer);
    console.log('Current question:', questions[currentQuestionIndex]);
    console.log('Correct answer:', questions[currentQuestionIndex].correctAnswer);
    console.log('Is last question:', currentQuestionIndex === questions.length - 1);

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      userAnswer: selectedAnswer,
      correctAnswer: questions[currentQuestionIndex].correctAnswer,
      isCorrect
    };
    setUserAnswers(newUserAnswers);

    // Show result immediately after answer selection
    setShowResult(true);

    // Wait for 1.5 seconds before moving to next question or ending quiz
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        console.log('Last question completed');
        setQuizCompleted(true);
        console.log('Quiz completed, calling onQuizEnd');
        onQuizEnd();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    console.log('Moving to next question...');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    console.log('Restarting quiz...');
    if (onRestart) {
      onRestart();
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
      setQuizCompleted(false);
      setUserAnswers([]);
      if (enableTimer) setTimer(timePerQuestion);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Generating Questions</h3>
          <p className="text-gray-600 mb-4">Please wait while we prepare your quiz...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            This may take a few seconds as we're creating unique questions for you.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-lg font-medium">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If quiz is completed, show the result page
  if (quizCompleted) {
    console.log('Rendering QuizResult component...');
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-sm">
          <span className="text-blue-600">Quiz</span> Master
        </h1>
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestartQuiz}
          userAnswers={userAnswers}
          questions={questions}
        />
      </div>
    );
  }

  // Show the current question
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-sm">
        <span className="text-blue-600">Quiz</span> Master
      </h1>
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-lg font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-lg font-medium text-blue-600">
            Score: {score}
          </div>
        </div>
        
        <Question
          question={questions[currentQuestionIndex]}
          onAnswerSelected={handleAnswerSelected}
          showResult={showResult}
          timer={enableTimer ? timer : undefined}
        />
      </div>
    </div>
  );
};

export default Quiz; 