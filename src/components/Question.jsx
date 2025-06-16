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
    if (!showResult) {
      return selectedAnswer === option 
        ? 'bg-[#736ddf] text-white border-[#736ddf]' 
        : 'bg-white hover:bg-gray-50 border-gray-200';
    }
    
    // When showing result
    if (option === question.correctAnswer) {
      return 'bg-green-100 text-green-800 border-green-500';
    } else if (option === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-100 text-red-800 border-red-500';
    }
    return 'bg-white border-gray-200';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {timer !== undefined && timer > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#736ddf] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(timer / 30) * 100}%` }}
            ></div>
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">{timer} seconds left</p>
        </div>
      )}
      
      <h2 className="text-xl font-bold mb-6 text-gray-800">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-3 px-4 text-left border-2 rounded-xl transition-all duration-200 ${
              getOptionClass(option)
            }`}
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