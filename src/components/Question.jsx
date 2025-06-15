import React, { useState, useEffect } from 'react';

const Question = ({ 
  question, 
  onAnswerSelected, 
  showResult,
  timer 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Reset selectedAnswer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question.question]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer || showResult) return; // Prevent changing answer after selection or when showing result
    setSelectedAnswer(answer);
    onAnswerSelected(answer);
  };

  const getOptionClass = (option) => {
    if (!showResult || !selectedAnswer) return 'bg-white';
    
    if (option === question.correctAnswer) {
      return 'bg-green-200 border-green-500';
    } else if (option === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-200 border-red-500';
    }
    return 'bg-white';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg border border-blue-100">
      {timer !== undefined && timer > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(timer / 30) * 100}%` }}></div>
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">{timer} seconds left</p>
        </div>
      )}
      
      <h2 className="text-xl font-bold mb-6 text-blue-800">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-3 px-4 text-left border-2 rounded-md transition-colors ${
              getOptionClass(option)
            } ${
              selectedAnswer === option ? 'border-blue-500' : 'border-blue-200'
            } hover:bg-blue-50`}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult || selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question; 