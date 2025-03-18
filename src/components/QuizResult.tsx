import React, { useState } from 'react';
import { Question } from '../data/quizQuestions';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userAnswers: string[];
  questions: Question[];
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRestart,
  userAnswers,
  questions
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "Excellent! You're a quiz master!";
    } else if (percentage >= 60) {
      return "Good job! You know your stuff!";
    } else if (percentage >= 40) {
      return "Not bad! Room for improvement.";
    } else {
      return "Keep learning and try again!";
    }
  };

  const getResultColor = () => {
    if (percentage >= 80) {
      return "text-green-600";
    } else if (percentage >= 60) {
      return "text-blue-600";
    } else if (percentage >= 40) {
      return "text-yellow-600";
    } else {
      return "text-red-600";
    }
  };

  const getAnswerColor = (questionIndex: number, answer: string) => {
    const isCorrect = answer === questions[questionIndex].correctAnswer;
    const isUserAnswer = answer === userAnswers[questionIndex];
    
    if (isCorrect) {
      return "text-green-600 font-medium";
    } else if (isUserAnswer) {
      return "text-red-600 font-medium";
    }
    return "text-gray-700";
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Quiz Completed!</h2>
      
      <div className="text-center mb-6">
        <p className="text-4xl font-bold mb-2">
          <span className={getResultColor()}>{score}</span> / {totalQuestions}
        </p>
        <p className="text-lg text-gray-600 mb-2">Your Score: {percentage}%</p>
        <p className="text-xl font-medium">{getResultMessage()}</p>
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Restart Quiz
        </button>
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </button>
      </div>
      
      {showAnswers && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Question Review</h3>
          
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="border-b pb-4">
                <p className="font-medium text-lg mb-2">{qIndex + 1}. {question.question}</p>
                <ul className="ml-6 list-disc space-y-1">
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex} className={getAnswerColor(qIndex, option)}>
                      {option} {option === question.correctAnswer && "(Correct)"}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm">
                  <span className="text-gray-600">Your answer:</span>{" "}
                  <span className={userAnswers[qIndex] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                    {userAnswers[qIndex] || "No answer"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResult; 