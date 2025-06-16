import React, { useState, useEffect } from 'react';

const QuizResult = ({
  score,
  totalQuestions,
  onRestart,
  userAnswers,
  questions
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Calculate score and percentage when component mounts or when score changes
  useEffect(() => {
    // Use the score from props directly
    setCalculatedScore(score);
    setPercentage(Math.round((score / totalQuestions) * 100));
  }, [score, totalQuestions]);

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "Excellent! You're a quiz master! 🏆";
    } else if (percentage >= 60) {
      return "Good job! You know your stuff! 🌟";
    } else if (percentage >= 40) {
      return "Not bad! Room for improvement. 📚";
    } else {
      return "Keep learning and try again! 💪";
    }
  };

  const getResultColor = () => {
    if (percentage >= 80) {
      return "text-green-600";
    } else if (percentage >= 60) {
      return "text-[#736ddf]";
    } else if (percentage >= 40) {
      return "text-yellow-600";
    } else {
      return "text-red-600";
    }
  };

  const getAnswerColor = (questionIndex, answer) => {
    const isCorrect = answer === questions[questionIndex].correctAnswer;
    const isUserAnswer = answer === userAnswers[questionIndex]?.userAnswer;
    
    if (isCorrect) {
      return "text-green-600 font-medium";
    } else if (isUserAnswer) {
      return "text-red-600 font-medium";
    }
    return "text-gray-700";
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#736ddf]">Quiz Completed! 🎉</h2>
      
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-[#736ddf]/10 rounded-full mb-4">
          <p className="text-5xl font-bold mb-2">
            <span className={getResultColor()}>{calculatedScore}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{totalQuestions}</span>
          </p>
        </div>
        <p className="text-2xl font-medium text-gray-700 mb-2">{percentage}%</p>
        <p className="text-xl font-medium text-[#736ddf]">{getResultMessage()}</p>
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-[#736ddf] text-white font-medium rounded-xl hover:bg-[#5f5ac4] transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart Quiz
        </button>
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-6 py-3 bg-[#736ddf]/10 text-[#736ddf] font-medium rounded-xl hover:bg-[#736ddf]/20 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </button>
      </div>
      
      {showAnswers && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-xl font-bold mb-4 text-[#736ddf]">Question Review</h3>
          
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="border-b pb-4">
                <p className="font-medium text-lg mb-2">
                  <span className="text-[#736ddf]">Q{qIndex + 1}:</span> {question.question}
                </p>
                <ul className="ml-6 space-y-2">
                  {question.options.map((option, oIndex) => (
                    <li 
                      key={oIndex} 
                      className={`flex items-center ${getAnswerColor(qIndex, option)}`}
                    >
                      <span className="mr-2">
                        {option === question.correctAnswer ? "✓" : 
                         option === userAnswers[qIndex]?.userAnswer ? "✗" : "○"}
                      </span>
                      {option}
                      {option === question.correctAnswer && 
                       <span className="ml-2 text-sm text-green-600">(Correct)</span>}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm">
                  <span className="text-gray-600">Your answer:</span>{" "}
                  <span className={userAnswers[qIndex]?.isCorrect ? "text-green-600" : "text-red-600"}>
                    {userAnswers[qIndex]?.userAnswer || "No answer"}
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