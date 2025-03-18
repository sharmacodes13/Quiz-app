import React, { useState, useEffect } from 'react';
import { Question as QuestionType } from '../data/quizQuestions';

interface QuestionProps {
  question: QuestionType;
  onAnswerSelected: (selectedAnswer: string) => void;
  showResult: boolean;
  timer?: number;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  onAnswerSelected, 
  showResult,
  timer 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // Reset selectedAnswer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question.id]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer after selection
    setSelectedAnswer(answer);
    onAnswerSelected(answer);
  };

  const getOptionClass = (option: string) => {
    if (!showResult || !selectedAnswer) return 'bg-white';
    
    if (option === question.correctAnswer) {
      return 'bg-green-200 border-green-500';
    } else if (option === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-200 border-red-500';
    }
    return 'bg-white';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {timer !== undefined && timer > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(timer / 30) * 100}%` }}></div>
          </div>
          <p className="text-right text-sm mt-1 text-gray-600">{timer} seconds left</p>
        </div>
      )}
      
      <h2 className="text-xl font-bold mb-6 text-gray-800">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-3 px-4 text-left border-2 rounded-md transition-colors ${
              getOptionClass(option)
            } ${
              selectedAnswer === option ? 'border-blue-500' : 'border-gray-300'
            } hover:bg-gray-50`}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question; 