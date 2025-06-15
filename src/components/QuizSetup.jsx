import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

const QuizSetup = ({ onStart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [enableTimer, setEnableTimer] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  useEffect(() => {
    // If no category is selected and no category in URL, redirect to home
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-blue-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Quiz Setup</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup; 