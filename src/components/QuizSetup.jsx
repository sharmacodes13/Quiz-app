import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

const QuizSetup = ({ onStart, initialCategory }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [enableTimer, setEnableTimer] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  useEffect(() => {
    // If no category is selected and no initial category, redirect to home
    if (!selectedCategory && !initialCategory) {
      navigate('/');
    }
  }, [selectedCategory, initialCategory, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedDifficulty) return;

    onStart({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      enableTimer,
      timePerQuestion,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#736ddf] mb-8">Quiz Setup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#736ddf] focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <p className="mt-2 text-sm text-gray-600">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            )}
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Difficulty Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#736ddf] focus:border-transparent"
              required
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Timer Settings */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableTimer"
                checked={enableTimer}
                onChange={(e) => setEnableTimer(e.target.checked)}
                className="h-4 w-4 text-[#736ddf] focus:ring-[#736ddf] border-gray-300 rounded"
              />
              <label htmlFor="enableTimer" className="ml-2 block text-sm text-gray-700">
                Enable Timer
              </label>
            </div>

            {enableTimer && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Time per Question (seconds)
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  value={timePerQuestion}
                  onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#736ddf] focus:border-transparent"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#736ddf] text-white py-3 px-4 rounded-xl hover:bg-[#5f5ac4] focus:outline-none focus:ring-2 focus:ring-[#736ddf] focus:ring-offset-2 transition-colors font-medium"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizSetup; 