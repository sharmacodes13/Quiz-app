import React, { useState, useEffect } from 'react';
import Question from './Question';
// @ts-ignore
import QuizResult from './QuizResult';
import quizQuestions from '../data/quizQuestions';

interface QuizProps {
  enableTimer?: boolean;
  timePerQuestion?: number;
}

const Quiz: React.FC<QuizProps> = ({ 
  enableTimer = false, 
  timePerQuestion = 30 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(enableTimer ? timePerQuestion : 0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Reset timer when moving to a new question
  useEffect(() => {
    if (!enableTimer || quizCompleted) return;
    
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
  }, [currentQuestionIndex, enableTimer, quizCompleted, timePerQuestion]);

  const handleAnswerSelected = (selectedAnswer: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update the score if the answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Save user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    
    // Show the result for 1.5 seconds before moving to the next question
    setShowResult(true);
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setUserAnswers([]);
    if (enableTimer) setTimer(timePerQuestion);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">React Quiz App</h1>
      
      {!quizCompleted ? (
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-lg font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
            <div className="text-lg font-medium text-blue-600">
              Score: {score}
            </div>
          </div>
          
          <Question
            question={quizQuestions[currentQuestionIndex]}
            onAnswerSelected={handleAnswerSelected}
            showResult={showResult}
            timer={enableTimer ? timer : undefined}
          />
        </div>
      ) : (
        <QuizResult
          score={score}
          totalQuestions={quizQuestions.length}
          onRestart={handleRestartQuiz}
          userAnswers={userAnswers}
          questions={quizQuestions}
        />
      )}
    </div>
  );
};

export default Quiz; 